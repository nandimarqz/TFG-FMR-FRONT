import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/AxiosInstance';
import './css/Card.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";

const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';
export default function EditIncidenceCard() {
    const editParams = useParams();
    const token = sessionStorage.getItem('user_token');
    const [datos, setDatos] = useState({id:editParams.incidenceId != null?editParams.incidenceId :0, date:'', description:'', status:'', observation:'', type:''});
    const [datosAnteriores, setDatosAnteriores] = useState(editParams);
    const [isEditOn, setIsEditOn] = useState(false);
    const [edicionEnBD, setEdicionEnBD] = useState(false);
    const [borrandoEnBD, setBorrandoEnBD] = useState(false);
    const [idIncidence, setIdIncidence] = useState(0);
    const navigate = useNavigate();


    useEffect(()=>{

        if(editParams.incidenceId !== undefined ){

            axios({
                method: 'GET',
                url: '/back/public/api/incidences/'+ editParams.incidenceId,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
                setDatos(response.data.data);
          }).catch(error=>{
                
                setDatos({id:0, date:'', description:'', status:'', observation:'', type:''});
          });


        }
      

    },[])

    useEffect( () => {

        function updateBD(){

            let data = {
                observation: datos.observation !== null?datos.observation:"",
                status: datos.status,
            };
              axios({
                method: 'PUT',
                url: baseURL + '/api/incidences/'+ editParams.incidenceId,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
                data:data,
              }).then(response =>{
                setDatos(response.data.data);
                navigate('/incidence');
            }).catch(error=>{
                
            });

        }

        // Sualo actualizo cuando el esto así lo indique
        if(edicionEnBD === true){

            // Actualizar la BD
            updateBD();

            // Cambiamos el estado tras guardar
            setEdicionEnBD(false);
        }
    }, [edicionEnBD]);

    useEffect( () => {

        function deleteIncidence(){
            axios({
                method: 'DELETE',
                url: baseURL + '/api/incidences/'+ editParams.incidenceId,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
                       
                setDatos({id:0, name:'', email:''});
                navigate('/incidence');

          }).catch(error=>{
                
          });

        }

        // Sualo borro cuando el estado así lo indique
        if(borrandoEnBD === true){

            // Actualizar la BD
            deleteIncidence();

            // Cambiamos el estado tras guardar
            setBorrandoEnBD(false);
        }
    }, [borrandoEnBD]);


    // Cada cambio en el input se sincroniza con el estado
    function handleChange(event) {
        const name = event.target.name;  
        const value = event.target.value;

        // Desectructuracion con objetos para proporcionar un nuevo objeto
        // ...datos --> copia del objeto
        // [name]: value --> se cambia el valor de la propiedad definida por name
        const nuevosDatos = { ...datos, [name]: value };
        setDatos(nuevosDatos);
    }

    function activarEdicion() {
        setDatosAnteriores({ ...datos }); // Guardo datos antes de editar
        setIsEditOn(true);
    }

    function activarBorrado() {
        setBorrandoEnBD(true);
    }

    function editarDatos() {
        // Al guardar datos solo cambio el estado de edición
        // datos permanece sincronizado con los inputs
        setIsEditOn(false);

        // Lanzamos la actualización en BD cambiando la variable
        // de estado guardandoEnBD --> tras renderizar se activa useEffect
        setEdicionEnBD(true);
    }

    function cancelarEdicion() {
        // Restauramos los datosAnteriores
        setDatos({...datosAnteriores});
        setIsEditOn(false);
    }


    function getFormData(event){

        let idIncidenceValue = 0

        if(event.target.value !== ""){

            idIncidenceValue = event.target.value;

        }

        setIdIncidence(idIncidenceValue);
    }

    function getIncidenceById(){

        if(idIncidence !== "" && idIncidence !== null && idIncidence !== 0){

            axios({
                method: 'GET',
                url: baseURL + '/api/incidences/'+ idIncidence,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              })
              .then(response => {
                setDatos(response.data.data);
              })
              .catch(error => {
                axios.get(baseURL + '/sanctum/csrf-cookie', { withCredentials: true });
                getIncidenceById();
                setDatos({ id: 0, date: '', description: '', status: '', observation: '', type: '' });
              });

        }else{

            alert("Se ha insertado un id nulo en algun momento");

        }
      

        
    }

   

    return (
        <div className='my-3 mx-auto'>
        { Object.keys(editParams).length === 0 &&
            <>
            <form className="container-fluid w-75">
                <div className="form-group row text-lg-start">
                    <label className="col-sm-2 col-form-label fw-bold ">ID Incidencia:</label>
                    <div className="col-lg">
                    <input type="number" className="form-control" placeholder="idUsuario" onChange={getFormData}/>
                    </div>
                </div>
                <div className="col-lg text-lg-end mt-3">
                    <input className="btn btn-primary" type="button" defaultValue="Buscar" onClick={getIncidenceById} />
                </div>
            </form>
            </>

        }
       

            <div className="card mx-auto" style={{ width: '40rem' }}>
                <div className="card-header text-white">
                    <h5 className="card-title">Gestión Incidencia</h5>
                </div>
                <div className="card-body text-center">
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold">ID: </label>
                        <p className='col text-start'>{datos.id}</p>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold">Fecha: </label>
                        <p className='col text-start'>{datos.created_at}</p>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Descripción: </label>
                        <p className='col text-start'>{datos.description}</p>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Profesor: </label>
                        <p className='col text-start'>{datos.user_id}</p>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Estado: </label>
                        <FormControl className='col form-control me-5 w-100'>
                            <InputLabel color='success' id="demo-simple-select-helper-label">Estado</InputLabel>
                            <Select className=''
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Estado"
                                color='success'
                                name='status'
                                readOnly={!isEditOn}
                                value={datos.status}
                                onChange={handleChange}
                            >
                                    <MenuItem value={"PENDIENTE"}>Pendiente</MenuItem>   
                                    <MenuItem value={"EN PROCESO"}>En Proceso</MenuItem>   
                                    <MenuItem value={"RESUELTA"}>Resuelta</MenuItem>   
                            </Select>
                        </FormControl>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Tipo Incidencia: </label>
                        <p className='col text-start'>{datos.type}</p>
                    </div>
                    <div className="row my-1 mb-2">
                        <label className="col-3 form-label text-start fw-bold" >Observación: </label>
                        <textarea className="form-control col" name='observation' onChange={handleChange} value={datos.observation} placeholder="No funciona windows en el aula de 2A" id="floatingTextarea" readOnly={!isEditOn}></textarea>
                    </div>
                    {isEditOn === true &&
                        <>
                            <button onClick={editarDatos} className="btn btn-primary me-1 ">Actualizar</button>
                            <button onClick={cancelarEdicion} className="btn btn-danger ms-1">Cancelar</button>
                        </>
                    }

                    {isEditOn === false && 
                        <>
                            <button onClick={activarEdicion} className="btn btn-primary me-1 ms-1">Editar</button>
                            <button onClick={activarBorrado} className="btn btn-danger ms-1">Borrar</button>
                        </>
                    }
                </div>
            </div>
        </div>

    );
}

