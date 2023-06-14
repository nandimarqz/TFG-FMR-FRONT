    import { useState, useEffect } from 'react';
    import axios from '../utils/AxiosInstance';
    import './css/Card.css';
    import { useNavigate } from "react-router-dom";
    import { useTheme } from '@emotion/react';
    import InputLabel from '@mui/material/InputLabel';
    import MenuItem from '@mui/material/MenuItem';
    import FormControl from '@mui/material/FormControl';
    import Select from '@mui/material/Select';

    const baseURL = 'https:/tfg-fmr.alwaysdata.net/back/public';

    export default function SelectUnitySubject({unities, token, onUnityChange,onSubjectChange, index}){

        const [subjects, setSubjects] = useState([]);
        const [unity, setUnity] = useState('');
        const [subject, setSubject] = useState('');

        useEffect(()=>{
            
            if(unity !== ""){
                
                  axios({
                    method: 'GET',
                    url: "/back/public/api/"+unity+"/subjects" ,
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': 'Bearer ' + token,
                    },
                  }).then(response => {
                    setSubjects(response.data.data)
                }).catch(error => {
                });
            }
        }, [unity, token])

        function handleSubjectOnChange(event){

            setSubject(event.target.value);

        }

        function handleUnityOnChange(event){
            setUnity(event.target.value)
            onUnityChange(event.target.value, index);
        }

        function handleSubjectOnChange(event){
            setSubject(event.target.value)
            onSubjectChange(event.target.value, index);
        }
        return(
            <div className='mb-3'>
                <div className="form-group row text-start">
                    <label className="col-form-label ps-2 p-0 mb-1 col-3 fw-bold ">Curso:</label>
                    <FormControl className='me-5 col'>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Curso</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Curso"
                            color='success'
                            value={unity}
                            onChange={handleUnityOnChange}
                        >
                            {unities.map((row) => (
                                <MenuItem key={row.id} value={row.name}>{row.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="form-group mt-1 row text-start">
                    <label className="col-form-label ps-2 p-0 mb-1 col-3 fw-bold ">Asignatura:</label>
                    <FormControl className='me-5 col'>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Asignatura</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            color='success'
                            label="Asignatura"
                            onChange={handleSubjectOnChange}
                        >
                            {subjects.map((row) => (
                                <MenuItem key={row.id} value={row.name}>{row.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            
        )
    }