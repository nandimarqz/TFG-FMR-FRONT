import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState,useEffect  } from "react";
import axios from 'axios';
import { Fab } from '@mui/material';
import { EditRounded } from '@mui/icons-material';
import TablePagination from '@mui/material/TablePagination';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ExportToPDF from './ExportToPDF';
import { BeatLoader } from 'react-spinners';

const baseURL = 'https:/tfg-fmr.alwaysdata.net/back/public';

export default function UserTable(){

    const [users, setUsers] = useState([]);
    const role = sessionStorage.getItem('userRole');
    const token = sessionStorage.getItem('user_token');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      async function getEmployees(){

          axios({
            method: 'GET',
            url: '/back/public/api/users',
            params: {
              user_id: sessionStorage.getItem('user_id'),
            },
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + token,
            },
          }).then(response =>{
       
                setUsers(response.data.data)
                setLoading(false);
          
          }).catch(error=>{
                
          });

      }

      getEmployees()
      
    },[])

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const visibleRows = useMemo(
      () =>{
          if(rowsPerPage === -1){
              return users
          }else{
              return stableSort(users, getComparator(order, orderBy)).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
              )
          }
      },[order, orderBy, page, rowsPerPage, users]
    );

    return (
      <div className='container-fluid'>
       <ExportToPDF data={users} tableName={"Usuarios"}/>
       {loading ?(
        <div className="spinner mx-auto text-center" >
          <BeatLoader color="#000000" loading={true} />
        </div>
       ):
        <TableContainer component={Paper} sx={{marginTop:1}}>
          <Table sx={{ minWidth: 650}} aria-label="simple table">
            <TableHead sx={{backgroundColor:'#007932'}}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textDecoration:'underline',color:'#ffff' }} onClick={()=>setOrderBy('id')}  align="center">Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textDecoration:'underline',color:'#ffff'  }} onClick={()=>setOrderBy('name')}  align="center">Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textDecoration:'underline',color:'#ffff'  }} onClick={()=>setOrderBy('email')}  align="center">Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textDecoration:'underline',color:'#ffff'  }} align="center">Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                 
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  {(role === 'DIRECTIVO') ?
                  <TableCell align="center"><Link to={`/edit/user/${row.id}`}><Fab sx={{backgroundColor:'#368f3f'}} aria-label="edit" ><EditRounded sx={{color:'white'}}/></Fab></Link></TableCell>
                  : null}
                </TableRow>
              ))}
            </TableBody> 
          </Table>
          <TablePagination
                rowsPerPageOptions={[5, 10, 25,{ label: 'Todos', value: -1 }]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"Filas por página"}
            /> 
        </TableContainer>
        }
      </div>
      );
}