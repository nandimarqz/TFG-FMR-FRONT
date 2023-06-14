import { useState, useEffect } from 'react';
import axios from '../utils/AxiosInstance';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useParams } from 'react-router-dom';
import ExportToPDF from './ExportToPDF';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import './css/Card.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BeatLoader } from 'react-spinners';

const baseURL = 'https:/tfg-fmr.alwaysdata.net/back/public';

export default function ReviewStudentsTable() {
    const reviewParams = useParams();
    const token = sessionStorage.getItem('user_token');
    const [reviews, setReviews] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('unity_name');
    const [editReviews, setEditReviews] = useState([]);
    const [edit , setEdit]= useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(sessionStorage.getItem('userRole') === 'DIRECTIVO'){
            axios({
                method: 'GET',
                url: "/back/public/api/reviews",
                params: {
                    "subject_name":reviewParams.subject,
                    "unity_name":reviewParams.unity,
                    "review_type":reviewParams.stage
                },
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
           
                    setReviews(response.data.data)
                    response.data.data.forEach((review) => {
                      setEditReviews((prevReviewValue) => {
                        const updatedValue = {...prevReviewValue,
                          [review.review_id]: {
                            review_id:review.review_id,
                            review_type: review.review_type,
                            status: review.status,
                            observation: review.observation == null ?'':review.observation,
                            user_id: review.user_id,
                            unity_name: review.unity_name,
                            subject_name: review.subject_name,
                            student_id: review.student_id
                          }
                        }
                        return updatedValue
                        });
                  });
                  setLoading(false);
              
              }).catch(error=>{
                    
              });
        }else{
            axios({
                method: 'GET',
                url:"/back/public/api/reviews/students/",
                params: {
                    "user_id":sessionStorage.getItem('user_id'),
                    "subject_name":reviewParams.subject,
                    "unity_name":reviewParams.unity,
                    "review_type":reviewParams.stage
                },
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
           
                    setReviews(response.data.data)
                    response.data.data.forEach((review) => {
                      setEditReviews((prevReviewValue) => {
                        const updatedValue = {...prevReviewValue,
                          [review.review_id]: {
                            review_id:review.review_id,
                            review_type: review.review_type,
                            status: review.status,
                            observation: review.observation == null ?'':review.observation,
                            user_id: review.user_id,
                            unity_name: review.unity_name,
                            subject_name: review.subject_name,
                            student_id: review.student_id
                          }
                        }
                        return updatedValue
                        });
                        setLoading(false);
                  });
              
              }).catch(error=>{
                    
              });
        }
         
    },[edit])

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
                return reviews
            }else{
                return stableSort(reviews, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                )
            }
        },[order, orderBy, page, rowsPerPage, reviews]
      );

      function updateReviews(){

        axios({
          method: 'PUT',
          url: '/back/public/api/update/reviews',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
          },withCredentials:true.valueOf,
          data:{
              reviews: editReviews,
          },
        }).then(response =>{
            setEdit(false);
        }).catch(error=>{
          
        });

      }


    return (
      
        <div className='container-fluid my-4'>
        <h4>Asignatura: {reviewParams.subject}</h4>
        <h4>Curso: {reviewParams.unity}</h4>
        <h4>Etapa: {reviewParams.stage}</h4>
        <ExportToPDF data={reviews} tableName={"Revision Alumnos"} subject={reviewParams.subject} unity={reviewParams.unity} stage={reviewParams.stage}/>
        {edit === false &&
        <input type='button' onClick={()=>setEdit(true)}  className="btn me-1 " value={'Editar'}/>
        }
        {edit === true &&
        <input type='button' onClick={()=>setEdit(false)}  className="btn me-1 " value={'Cancelar edición'}/>
        }
        {loading ?(
        <div className="spinner mx-auto text-center" >
          <BeatLoader color="#000000" loading={true} />
        </div>
       ):
        <TableContainer component={Paper} sx={{marginTop:1}}>
        <Table aria-label="simple table" className='mb-3'>
        <TableHead sx={{ backgroundColor: '#007932' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} onClick={()=>setOrderBy('name')} align="center">Alumno</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} onClick={()=>setOrderBy('status')} align="center">Estado</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} onClick={()=>setOrderBy('observation')} align="center">Observación</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {visibleRows.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                {edit === false &&
                <>
                  <TableCell align="start" sx={{ width: 'fit-content' }}>{row.name + ", " + row.surnames}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.observation}</TableCell>
                </>
                }
                {edit === true &&
                <>
                  <TableCell align="start" sx={{ width: 'fit-content' }}>{row.name + ", " + row.surnames}</TableCell>
                  <TableCell align="start" sx={{ width: 'fit-content' }}>
                    <FormControl className='container-fluid' sx={{ width: "20rem" }}>
                      <InputLabel color='success' id="demo-simple-select-helper-label">Estado</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Estado"
                        color='success'
                        key={row.review_id}
                        value={editReviews[row.review_id].status}
                        name='status'
                        onChange={(event) => {
                          setEditReviews((prevValues) => ({
                            ...prevValues,
                            [row.review_id]: {
                              ...prevValues[row.review_id],
                              status: event.target.value
                            }
                          }
                          ))
                        }}
                      >
                        <MenuItem value={'BIEN'}>BIEN</MenuItem>
                        <MenuItem value={'REGULAR'}>REGULAR</MenuItem>
                        <MenuItem value={'MAL'}>MAL</MenuItem>
                        <MenuItem defaultChecked value={'NO REVISADO'}>NO REVISADO</MenuItem>

                      </Select>
                    </FormControl>
                    </TableCell>
                  <TableCell align="center"><textarea className="form-control col"
                      onChange={(event) => {
                        setEditReviews((prevValues) => {
                          const updatedValue = {
                          ...prevValues,
                          [row.review_id]: {
                            ...prevValues[row.review_id],
                            observation: event.target.value
                          }
                        }
                        return updatedValue
                      })
                      }}
                    placeholder="Observación sobre el libro" id="floatingTextarea">{editReviews[row.review_id].observation}</textarea></TableCell>
                </>
                }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25,{ label: 'Todos', value: -1 }]}
                component="div"
                count={reviews.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={"Filas por página"}
            /> 
        </TableContainer>
        }
        {edit === true &&
        <div className='text-center mt-3'>
          <input type='button' onClick={updateReviews}  className="btn me-1 " value={'Actualizar revisión '}/>
        </div>
        }
    </div>
    );
}

