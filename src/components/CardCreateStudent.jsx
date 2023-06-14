import { useState, useEffect } from 'react';
import axios from '../utils/AxiosInstance';
import './css/Card.css';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const baseURL = 'http://localhost:8000';



export default function CardCreateStudent() {
    const navigate = useNavigate();
    const [data, setData] = useState({  "name": "","surnames": "","email": "","parent_email": "","NIF": "","unity": ""});
    const [badData, setBadData] = useState(false);
    const token = sessionStorage.getItem('user_token');
    const [unities, setUnities] = useState([]);
    const [selectedUnity, setSelectedUnity] = useState('');

    useEffect(()=>{

        axios({
            method: 'GET',
            url: "/back/public/api/unities/" ,
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + token,
            },
          }).then(response => {
                setUnities(response.data.data)
            }).catch(error => {

            });
    },[])

    function handleChange(event) {
        const name = event.target.name;  
        const value = event.target.value;

        const nuevosDatos = { ...data, [name]: value };

        setData(nuevosDatos);
    }

    function createStudent(){

        if(data.name !== "" && data.email !== ""&& data.NIF !== ""&& data.surnames !== ""&& data.unity !== ""&& data.parent_email !== ""){
            axios({
                method: 'POST',
                url:"/back/public/api/create/student",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token,
                },withCredentials:true,
                data: {
                    "name": data.name,
                    "surnames": data.surnames,
                    "email": data.email,
                    "parent_email": data.parent_email,
                    "NIF": data.NIF,
                    "unity": data.unity
                },
            }).then(response => {
                setBadData(false);
                window.alert('Se ha creado el alumno correctamente');
            }).catch(error => {
            });

        }else{
            setBadData(true);
        }

    }

    return (
        <div className='mt-5 container-fluid'>
            <div className="card mt-5 mx-auto" style={{ width: '50rem' }}>
                <div className="card-header text-white">
                    <h4 className="card-title">Alta de Estudiante</h4>
                </div>
                <div className="card-body text-center me-3 ms-3">
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold">Nombre: </label>
                        <input name="name" onChange={handleChange} className="col form-control me-5" value={data.name} type="text" />
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Apellidos: </label>
                        <input name="surnames" onChange={handleChange} className="col form-control me-5" value={data.surnames} type="text"/>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >DNI: </label>
                        <input name="NIF" onChange={handleChange} className="col form-control me-5" value={data.NIF} type="text"/>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Email: </label>
                        <input name="email" onChange={handleChange} className="col form-control me-5" value={data.email} type="email"/>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Email de los padres: </label>
                        <input name="parent_email" onChange={handleChange} className="col form-control me-5" value={data.parent_email} type="text"/>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Curso: </label>
                        <FormControl className='col form-control me-5'>
                            <InputLabel color='success' id="demo-simple-select-helper-label">Curso</InputLabel>
                            <Select className=''
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Curso"
                                name='unity'
                                color='success'
                                value={data.unity}
                                onChange={handleChange}
                            >
                                {unities.map((row) => (
                                    <MenuItem key={row.name} value={row.name}>{row.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {badData === true &&
                        <>
                        <p className='text-danger'>No se han rellenado todos los campos</p>
                        </>
                    }
                    <button className="btn btn-primary mx-auto mt-2  " style={{width: '10rem'}} onClick={createStudent}>Crear</button>
                </div>
            </div>
        </div>

    );
}

