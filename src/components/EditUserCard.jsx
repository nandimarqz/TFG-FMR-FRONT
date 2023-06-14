import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import './css/Card.css';

const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';

export default function EditUserCard() {
    const editParams = useParams();
    const token = sessionStorage.getItem('user_token');
    const [datos, setDatos] = useState({id:editParams.idUsuario, name:'', email:''});
    const [users,setUsers] = useState([]);
    const [datosAnteriores, setDatosAnteriores] = useState(editParams);
    const [isEditOn, setIsEditOn] = useState(false);
    const [edicionEnBD, setEdicionEnBD] = useState(false);
    const [borrandoEnBD, setBorrandoEnBD] = useState(false);
    const [idUsuario, setIdUsuario] = useState(0);
    const [directiveChecked, setDirectiveChecked]= useState(false);
    const [coordinatorChecked, setCoordinatorChecked]= useState(false);
    const [restoreChecked, setRestoreChecked]= useState(false);
    const [badData, setBadData] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{

        if(Object.keys(editParams).length !== 0 ){

            axios({
                method: 'GET',
                url: "/back/public/api/user/" + editParams.idUsuario,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
                       
               
                setDatos(response.data.data);
                setIdUsuario(editParams.idUsuario);
          }).catch(error=>{
                
               
                setDatos({id:0, name:'', email:''});
          });

        }else{

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
              
              }).catch(error=>{
                    
                    console.error(error)
              });

        }
      

    },[])

    useEffect( () => {

        function updateBD(){           
           axios({
            method: 'PUT',
            url:"/back/public/api/user/" + (editParams.idUsuario === undefined? idUsuario:editParams.idUsuario),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + token,
            },
            params:{
                id: editParams.idUsuario === undefined? idUsuario:editParams.idUsuario,
                name: datos.name,
                email: datos.email,
                directive: directiveChecked,
                coordinator: coordinatorChecked,
                restore: restoreChecked,
            },
          }).then(response =>{
                setDatos(response.data.data);
                navigate('/users');
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

        function deleteUser(){
            
            axios({
                method: 'DELETE',
                url: "/back/public/api/user/" + (editParams.idUsuario === undefined ? idUsuario : editParams.idUsuario),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token,
                },
            }).then(response => {

                setDatos({ id: 0, name: '', email: '' });
                navigate('/users');
            }).catch(error => {

               
            });

        }

        // Sualo borro cuando el estado así lo indique
        if(borrandoEnBD === true){

            // Actualizar la BD
            deleteUser();

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
        if(idUsuario !== "" && idUsuario !== null && idUsuario !== 0){
            setBorrandoEnBD(true);
            
        }else{
            setBadData(true);
        }
        
    }

    function editarDatos() {
        if(idUsuario !== "" && idUsuario !== null && idUsuario !== 0){
             // Al guardar datos solo cambio el estado de edición
        // datos permanece sincronizado con los inputs
        setIsEditOn(false);

        // Lanzamos la actualización en BD cambiando la variable
        // de estado guardandoEnBD --> tras renderizar se activa useEffect
        setEdicionEnBD(true);
        }else{
            setBadData(true);
        }
       
    }

    function cancelarEdicion() {
        // Restauramos los datosAnteriores
        setDatos({...datosAnteriores});
        setIsEditOn(false);
    }


    function getFormData(event){

        let idEmpleadoValue = 0

        if(event.target.value !== ""){

           idEmpleadoValue = event.target.value;

        }

        setIdUsuario(idEmpleadoValue);
    }

    function getDirectiveCheckboxData(event){

        setDirectiveChecked(event.target.checked);

    }
    function getRestoreCheckboxData(event){

        setRestoreChecked(event.target.checked);

    }
    function getCoordinatorCheckboxData(event){

        setCoordinatorChecked(event.target.checked);

    }

    function getUserById(){

        if(idUsuario !== "" && idUsuario !== null && idUsuario !== 0){

            
            axios({
                method: 'GET',
                url:"/back/public/api/user/" + idUsuario,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
                       
               setBadData(false);
                setDatos(response.data.data);
          }).catch(error=>{
                
               
                setDatos({id:0, name:'', email:''});
          });

        }else{

           setBadData(true);

        }
      

        
    }

   

    return (
        <div className='my-3 mx-auto'>
        { Object.keys(editParams).length === 0 &&
            <>
            <form className="container-fluid w-75 mb-3">
                <FormControl className='form-group w-100 '>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Usuarios</InputLabel>
                        <Select className=''
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            color='success'
                            label="Usuarios"
                            value={idUsuario}
                            onChange={getFormData}
                        >
                            {users.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.id + "-" + row.name}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
                <div className="col-lg text-lg-end mt-3">
                    {badData === true &&
                        <p className='text-danger'>Seleccione un usuario</p>
                    }
                    <input className="btn btn-primary" type="button" defaultValue="Buscar" onClick={getUserById} />
                </div>
            </form>
            </>

        }
       

            <div className="card mx-auto" style={{ width: '40rem' }}>
                <div className="card-header text-white">
                    <h5 className="card-title">Editar usuario</h5>
                </div>
                <div className="card-body text-center">
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold">ID: </label>
                        <input name="id" onChange={handleChange} className="col form-control me-5" type="text" value={(datos.id !=null)?datos.id:0} readOnly={true} />
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold">Nombre: </label>
                        <input name="name" onChange={handleChange} className="col form-control me-5" type="text" value={datos.name} readOnly={!isEditOn} />
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Email: </label>
                        <input name="email" onChange={handleChange} className="col form-control me-5" type="text" value={datos.email} readOnly={!isEditOn} />
                    </div>
                    
                  
                    {isEditOn === true &&
                        <>
                            <div className="row my-1">
                                <FormControlLabel color='success' control={<Checkbox className='text-start' checked={restoreChecked} color='success' onChange={getRestoreCheckboxData} inputProps={{ 'aria-label': 'controlled' }} />} label="Restablecer contraseña a DNI" />
                            </div>
                            <div className="row my-1">
                                <FormControlLabel color='success' control={<Checkbox className='text-start' checked={directiveChecked} color='success' onChange={getDirectiveCheckboxData} inputProps={{ 'aria-label': 'controlled' }} />} label="Dar rol de Directivo" />
                            </div>
                            <div className="row my-1">
                                <FormControlLabel color='success' control={<Checkbox className='text-start' checked={coordinatorChecked} color='success' onChange={getCoordinatorCheckboxData} inputProps={{ 'aria-label': 'controlled' }} />} label="Dar rol de Coordinador TIC" />
                            </div>
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

