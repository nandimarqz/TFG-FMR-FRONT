import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { BeatLoader } from 'react-spinners';

const baseURL = 'https:/tfg-fmr.alwaysdata.net/back/public';

export default function TableAllStudentReview() {
    const token = sessionStorage.getItem('user_token');
    const [reviews, setReviews] = useState([]);
    const [status, setStatus] = useState('');
    const [stage, setStage] = useState('');
    const [loading, setLoading] = useState(true);
    const [badData, setBadData] = useState(false);
    

    useEffect(()=>{

      
       

    },[])

    const getStudentReviewsInAStatusAtAStage = () => {
        if(stage === '' || status === ''){

          setBadData(true);

        }else{

            if (sessionStorage.getItem('userRole') === 'DIRECTIVO') {
                axios({
                    method: 'GET',
                    url: "/back/public/api/allUsersReviews",
                    params: {
                        "status": status,
                        "review_type": stage
                    },
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + token,
                    },
                }).then(response => {
    
                    setReviews(response.data.data);
                    setLoading(false);
                    setBadData(false);
                }).catch(error => {
    
                });
            }
    
        }
       
    }

    const statusHandleChange = (event) =>{

        setStatus(event.target.value);

    }
    const stageHandleChange = (event) =>{

        setStage(event.target.value);   

    }

    return (
        
      

        <div className=' w-75 mx-auto mb-4'>
            <form className="container-fluid mb-3 mt-3">
                <div className="form-group row mt-4 text-lg-start">
                    <label className="col-form-label mb-1 p-0 fw-bold ">Etapa:</label>
                    <FormControl className=''>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Etapa</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Etapa"
                            color='success'
                            value={stage}
                            onChange={stageHandleChange}
                        >
                            <MenuItem value={'ENTREGA'}>ENTREGA</MenuItem>
                            <MenuItem value={'EVALUACION 1'}>EVALUACION 1</MenuItem>
                            <MenuItem value={'EVALUACION 2'}>EVALUACION 2</MenuItem>
                            <MenuItem value={'RECOGIDA'}>RECOGIDA</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <div className="form-group row mt-4 text-lg-start mb-4">
                    <label className="col-form-label mb-1 p-0 fw-bold ">Estado:</label>
                    <FormControl className=''>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Estado</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            color='success'
                            label="Estado"
                            value={status}
                            onChange={statusHandleChange}
                        >
                            <MenuItem value={'BIEN'}>BIEN</MenuItem>
                            <MenuItem value={'REGULAR'}>REGULAR</MenuItem>
                            <MenuItem value={'MAL'}>MAL</MenuItem>
                            <MenuItem defaultChecked value={'NO REVISADO'}>NO REVISADO</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="col-lg text-center mt-3 mb-4">
                    {badData === true &&
                        <p className='text-danger'>Seleccione una etapa y un estado</p>
                    }
                    <input className="btn btn-primary" type="button" defaultValue="Ver Revisiones" style={{ width: '15rem' }} onClick={getStudentReviewsInAStatusAtAStage}/>
                </div>
                {(reviews.length !== 0 || !loading) ?(
                <TableContainer component={Paper} sx={{marginTop:1}}>
                <Table aria-label="simple table" className='mb-3'>
                    <TableHead sx={{ backgroundColor: '#007932' }}>
                        <TableRow key={"header"}>
                            <TableCell key={"Curso"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Unidad</TableCell>
                            <TableCell key={"Asignatura"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Materia</TableCell>
                            <TableCell key={"Etapa"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Nombre</TableCell>
                            <TableCell key={"Observacion"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Observación</TableCell>
                            <TableCell key={"Profesor"} sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Profesor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell key={row.id} align="center">{row.unity_name}</TableCell>
                                <TableCell key={row.id} align="center">{row.subject_name}</TableCell>
                                <TableCell align="center" sx={{ width: 'fit-content' }}>{row.name + ", " + row.surnames}</TableCell>
                                <TableCell key={row.id} align="center">{row.observation}</TableCell>
                                <TableCell key={row.id} align="center">{row.user_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                ):
                <div className="spinner mx-auto text-center" >
                    <BeatLoader color="#000000" loading={true} />
                </div>
            }
        </form>
    </div>
    );
}