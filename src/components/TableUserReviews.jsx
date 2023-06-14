import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fab } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import ExportToPDF from './ExportToPDF';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { BeatLoader } from 'react-spinners';

const baseURL = 'https:/tfg-fmr.alwaysdata.net/back/public';

export default function TableUserReviews() {
    const token = sessionStorage.getItem('user_token');
    const [reviews, setReviews] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('unity_name');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (sessionStorage.getItem('userRole') === 'DIRECTIVO') {

            axios({
                method: 'GET',
                url: "/back/public/api/allReviews/",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token,
                },
            }).then(response => {
                setReviews(response.data.data)
                setLoading(false);
            }).catch(error => {

            });

        } else {

              axios({
                method: 'GET',
                url: "/back/public/api/review/" + sessionStorage.getItem('user_id'),
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response => {

                    setReviews(response.data.data)
                    setLoading(false);
                }).catch(error => {


                });
        }



    }, [])

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
        () => {
            if (rowsPerPage === -1) {
                return reviews
            } else {
                return stableSort(reviews, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                )
            }
        }, [order, orderBy, page, rowsPerPage, reviews]
    );

    return (

        <div className='container-fluid my-4'>
            <ExportToPDF data={reviews} tableName={"Revisiones"} />
            {loading ?(
                <div className="spinner mx-auto text-center" >
                <BeatLoader color="#000000" loading={true} />
                </div>
            ):
            <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                <Table aria-label="simple table" className='mb-3'>
                    <TableHead sx={{ backgroundColor: '#007932' }}>
                        <TableRow key={"header"}>
                            <TableCell key={"Curso"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} onClick={() => setOrderBy('unity_name')} align="center">Curso</TableCell>
                            <TableCell key={"Asignatura"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} onClick={() => setOrderBy('subject_name')} align="center">Asignatura</TableCell>
                            <TableCell key={"Etapa"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} onClick={() => setOrderBy('review_type')} align="center">Etapa</TableCell>
                            {sessionStorage.getItem('userRole') === 'DIRECTIVO' &&
                                <TableCell key={"Profesor"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} onClick={() => setOrderBy('name')} align="center">Profesor</TableCell>
                            }
                            <TableCell key={"Ver Revisión"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Ver Revisión</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell key={row.id} align="center">{row.unity_name}</TableCell>
                                <TableCell key={row.id} align="center">{row.subject_name}</TableCell>
                                <TableCell key={row.id} align="center">{row.review_type}</TableCell>
                                {sessionStorage.getItem('userRole') === 'DIRECTIVO' &&
                                    <TableCell key={row.id} align="center">{row.name}</TableCell>
                                }
                                <TableCell key={row.id} align="center"><Link to={`/reviews/users/table/${row.subject_name}/${sessionStorage.getItem('user_id')}/${row.review_type}/${row.unity_name}`}><Fab sx={{ backgroundColor: '#368f3f' }} aria-label="edit" ><DescriptionIcon sx={{ color: 'white' }} /></Fab></Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
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
        </div>
    );
}

