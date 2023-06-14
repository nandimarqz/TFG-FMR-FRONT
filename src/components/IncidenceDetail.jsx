import { useState, useEffect } from 'react';
import axios from '../utils/AxiosInstance';
import { useParams } from 'react-router-dom';
import './css/Card.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';

export default function IncidenceDeatil() {
    const incidenceParams = useParams();
    const [incidenceData, setIncidenceData] = useState({id:incidenceParams.incidenceId != null?incidenceParams.incidenceId :0, date:'', description:'', status:'', observation:'', type:''});
    const token = sessionStorage.getItem('user_token');
    const [incidences, setIncidences] = useState([]); 
    const [incidenceId, setIncidenceId] = useState(0);
    const [badData, setBadData] = useState(false);

    useEffect(()=>{

        if(incidenceParams.incidenceId !== undefined ){
            
            axios({
                method: 'GET',
                url: baseURL + '/api/incidences/' + incidenceParams.incidenceId,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
                setIncidenceData(response.data.data);
          }).catch(error=>{
                
               
          });

        }else{

            if(sessionStorage.getItem('userRole') === 'DIRECTIVO'){

                axios({
                    method: 'GET',
                    url: baseURL + '/api/incidences',
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': 'Bearer ' + token,
                    },
                  }).then(response =>{
               
    
                        setIncidences(response.data.data)
                  
                  }).catch(error=>{
                        
    
                  });

            }else if(sessionStorage.getItem('userRole') === 'COORDINADOR TIC'){
                axios({
                  method: 'GET',
                  url: baseURL + '/api/tic/incidences',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token,
                  },
                }).then(response =>{
             
    
                      setIncidences(response.data.data)
                
                }).catch(error=>{
                      
    
                });
                  
              }else{

                axios({
                    method: 'GET',
                    url: baseURL + '/api/user/incidences',
                    params: {
                      user_id: sessionStorage.getItem('user_id'),
                    },
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': 'Bearer ' + token,
                    },
                  }).then(response =>{
               
    
                        setIncidences(response.data.data)
                  
                  }).catch(error=>{
                        
    
                  });

              }

        }
      

    },[badData])

    function getSelectData(event){

        let incidenceIdValue = 0

        if(event.target.value !== ""){

            incidenceIdValue = event.target.value;

        }

        setIncidenceId(incidenceIdValue);
    }

    function getIncidenceById(){

        if(incidenceId !== "" && incidenceId !== null && incidenceId !== 0){
              axios({
                method: 'GET',
                url: baseURL + '/api/incidences/'+ incidenceId,
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Bearer ' + token,
                },
              }).then(response =>{
                       
                if(sessionStorage.getItem('userRole') === "PROFESOR"){
                    if(response.data.data.user_id === sessionStorage.getItem('user_id')){
                        setIncidenceData(response.data.data);
                        setBadData(false);
                    }else{
    
                        alert("La incidencia que se intenta obtener no pertenece al usuario")
                        setIncidenceData({id:0, date:'', description:'', status:'', observation:'', type:''});
                    }
                }else if(sessionStorage.getItem('userRole') === "COORDINADOR TIC"){
                    if(response.data.data.type === "TIC" ){
                        setIncidenceData(response.data.data);
                        setBadData(false);
                    }else{
    
                        alert("Este usuario solo puede ver incidencias TIC")
                        setIncidenceData({id:0, date:'', description:'', status:'', observation:'', type:''});
                    }
                }else{
                    setIncidenceData(response.data.data);
                    setBadData(false);
                }
                
                
          }).catch(error=>{
                
                setIncidenceData({id:0, date:'', description:'', status:'', observation:'', type:''});
          });

        }else{

           setBadData(true);

        }
      

        
    }

    return (
        <div className='my-3 mx-auto'>
             { Object.keys(incidenceParams).length === 0 &&
            <>
            <form className="container-fluid w-75">
                    <FormControl className='form-group w-100 '>
                        <InputLabel color='success' id="demo-simple-select-helper-label">Incidencia</InputLabel>
                        <Select className=''
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            color='success'
                            label="Incidencia"
                            value={incidenceId}
                            onChange={getSelectData}
                        >
                            {incidences.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.id + "-" + row.description+ "-" + row.status+ "-" + row.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {badData === true &&
                        <p className='text-danger'>Seleccione una incidencia</p>
                    }
                <div className="col-lg text-lg-end mt-3">
                    <input className="btn btn-primary" type="button" defaultValue="Buscar" onClick={getIncidenceById}/>
                </div>
            </form>
            </>
        }
            <div className="card mt-5 mx-auto" style={{ width: '50rem' }}>
            <div className="card-header text-white">
                <h4 className="card-title">Incidencia {incidenceData.id}</h4>
            </div>
                <div className="card-body text-start me-3 ms-3">
                    <div className="row my-1">
                        <h6 className='text-decoration-underline'>ID</h6>
                        <p>{incidenceData.id}</p>
                    </div>
                    <div className="row my-1">
                        <h6 className='text-decoration-underline'>Fecha</h6>
                        <p>{incidenceData.created_at}</p>
                    </div>
                    <div className="row my-1">
                        <h6 className='text-decoration-underline'>Profesor</h6>
                        <p>{incidenceData.user_id}</p>
                    </div>
                    <div className="row my-1">
                        <h6 className='text-decoration-underline'>Descripción</h6>
                        <p>{incidenceData.description}</p>
                    </div>
                    <div className="row my-1">
                        <h6 className='text-decoration-underline'>Estado</h6>
                        <p>{incidenceData.status}</p>
                    </div>
                    <div className="row my-1">
                        <h6 className='text-decoration-underline'>Tipo Incidencia</h6>
                        <p>{incidenceData.type}</p>
                    </div>
                    <div className="row my-1">
                        <h6 className='text-decoration-underline'>Observación</h6>
                        <p>{incidenceData.observation}</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

