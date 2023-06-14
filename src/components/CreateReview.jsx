import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/AxiosInstance';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './css/Card.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';
export default function CreateReview() {
    const token = sessionStorage.getItem('user_token');
    const [selectedCourseSubject, setSelectedCourseSubject] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [userCourseSubject, setUserCourseSubject] = useState([]);
    const [students, setStudents] = useState([]);
    const [startReview,setStartReview] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [badData, setBadData] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        axios({
            method: 'GET',
            url: "/back/public/api/taughts/" + sessionStorage.getItem('user_id'),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + token,
            },
          }).then(response => {
                setUserCourseSubject(response.data.data)
            }).catch(error => {

            });

    }, []);

    useEffect(() => {


        function getStudents() {
            let course = selectedCourseSubject.split('-')[0];
            
            axios({
                method: 'GET',
                url: "/back/public/api/" + course,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response => {
                    setStudents(response.data.data);
                    response.data.data.forEach((student) => {
                        setReviews((prevReviewValue) => ({
                            ...prevReviewValue,
                            [student.id]: {
                              review_type: selectedType,
                              status: 'NO REVISADO',
                              observation: '',
                              user_id: sessionStorage.getItem('user_id'),
                              unity_name: selectedCourseSubject.split('-')[0],
                              subject_name: selectedCourseSubject.split('-')[1],
                              student_id: student.id
                            }
                          }));
                    });
                    setBadData(false);
                    
                }).catch(error => {

                });
                
        }

        if (startReview) {
            getStudents();
        }
    }, [startReview]);

    useEffect(() => {

    }, [selectedCourseSubject, selectedType]);

    useEffect(()=>{
    
    },[reviews])

    const handleSubjectCourseChange = (event) => {
        setSelectedCourseSubject(event.target.value);
    };
    const handleReviewType = (event) => {
        setSelectedType(event.target.value);
    };

    function startReviews(){

        if(selectedCourseSubject !== '' && selectedType !== ''){
            setStartReview(true);
        }else{
            setBadData(true);
        }

    }

    function cancelReview(){

        setStartReview(false);

    }

    function sendReview(){

        axios({
            method: 'POST',
            url: "/back/public/api/review",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
            },
            data:{
                "reviews":Object.values(reviews)
            },
        }).then(response =>{
            navigate(`/reviews/table`);
        }).catch(error=>{
            window.alert('Se está creando una revision ya creada');
        });

        setStartReview(false);

    }

    

    return (
        <div className=' w-75 mx-auto mb-4' id='createReview'>
            <form className="container-fluid mb-3 mt-3">
                <div className="form-group row text-lg-start">
                    <label className="col-form-label p-0 mb-1 fw-bold ">Curso-Asignatura:</label>
                    <FormControl className=''>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Curso-Asignatura</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            color='success'
                            label="Curso-Asignatura"
                            value={selectedCourseSubject}
                            onChange={handleSubjectCourseChange}
                            disabled={startReview}
                        >
                            {userCourseSubject.map((row) => (
                                <MenuItem key={row.id} value={row.unity_name + "-" + row.subject_name}>{row.unity_name + "-" + row.subject_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <div className="form-group row mt-4 text-lg-start">
                    <label className="col-form-label mb-1 p-0 fw-bold ">Etapa:</label>
                    <FormControl className=''>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Etapa</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            color='success'
                            label="Etapa"
                            value={selectedType}
                            onChange={handleReviewType}
                            disabled={startReview}
                        >
                            <MenuItem value={'ENTREGA'}>ENTREGA</MenuItem>
                            <MenuItem value={'EVALUACION 1'}>EVALUACION 1</MenuItem>
                            <MenuItem value={'EVALUACION 2'}>EVALUACION 2</MenuItem>
                            <MenuItem value={'RECOGIDA'}>RECOGIDA</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <div className="col-lg text-center mt-3">
                    {badData === true &&
                        <p className='text-danger'>Selecciona una Asignatura y una Etapa</p>
                    }
                    <input className="btn btn-primary" type="button" defaultValue="Comenzar Revisión" style={{ width: '15rem' }} onClick={startReviews} disabled={startReview}/>
                </div>
            </form>
            {startReview === true &&
            <div className='text-center'>
                <Table aria-label="simple table" className='mb-3'>
                <TableHead sx={{ backgroundColor: '#007932' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Estudiante</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Estado</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textDecoration: 'underline', color: '#ffff' }} align="center">Observación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>{row.name +", "+ row.surnames}</TableCell>
                                <TableCell align="center">
                                    <FormControl className='container-fluid' sx={{width:"20rem"}}>
                                        <InputLabel color='success' id="demo-simple-select-helper-label">Estado</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            color='success'
                                            label="Estado"
                                            key={row.id}
                                            value={reviews[row.id].status}
                                            name='status'
                                            onChange={(event) => {
                                                setReviews((prevValues) => ({
                                                    ...prevValues,
                                                    [row.id]: {
                                                        ...prevValues[row.id],
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
                                <TableCell align="center">
                                    <textarea className="form-control col"
                                        onChange={(event) => {
                                            setReviews((prevValues) => {
                                                const updatedValue = {
                                                    ...prevValues,
                                                    [row.id]: {
                                                        ...prevValues[row.id],
                                                        observation: event.target.value
                                                    }
                                                };
                                                return updatedValue;
                                            });
                                        }}
                                        placeholder="Observación sobre el libro" id="floatingTextarea"></textarea>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <button onClick={sendReview}  className="btn btn-primary me-1 " style={{ width: '15rem' }}>Enviar</button>
                <button onClick={cancelReview} className="btn btn-danger ms-1" style={{ width: '15rem' }}>Cancelar</button>
            </div>
            }
        </div>

    );
}

