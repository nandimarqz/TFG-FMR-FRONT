import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Card.css';
import { useNavigate } from "react-router-dom";

const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';

export default function CardCreateIncidence() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [badData, setBadData] = useState(false);
    const token = sessionStorage.getItem('user_token');

    useEffect(()=>{

      
      },[badData])

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleDescriptionChange = (event)=>{
        setDescription(event.target.value)
    }

    const createIncidence = () =>{

        if(selectedOption === '' || description === ''){
            setBadData(true);
        }else{

            setBadData(false);

            axios({
                method: 'POST',
                url: "/back/public/api/incidences",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + token,
                },
                data:{
                    "description":description,
                    "user_id":sessionStorage.getItem('user_id'),
                    "type":selectedOption
                },
            }).then(response =>{
                    navigate('/incidence/view/' + response.data.data.id)
              }).catch(error=>{
                    
              });
        }

    }

    return (
        <div className='mt-5 container-fluid'>
            <div className="card mt-5 mx-auto" style={{ width: '50rem' }}>
            <div className="card-header text-white">
                <h4 className="card-title">Alta incidencia</h4>
            </div>
                <div className="card-body text-center me-3 ms-3">
                    <div className='row mb-3 mt-4'>
                        <label className='col-3 form-label text-start fw-bold'>Tipo de incidencia:</label>
                        <div className="form-check form-check-inline col-3">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="TIC" checked={selectedOption === 'TIC'} onChange={handleChange}  />
                            <label className="form-check-label pe-5 fw-bold" htmlFor="inlineRadio2">Incidencia TIC</label>
                        </div>
                        <div className="form-check form-check-inline col-3">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="NO TIC" checked={selectedOption === 'NO TIC'} onChange={handleChange}  />
                            <label className="form-check-label fw-bold" htmlFor="inlineRadio1">Incidencia NO TIC</label>
                        </div>
                    </div>
                    <div className="row my-1">
                        <label className="col-3 form-label text-start fw-bold" >Descripción: </label>
                        <textarea className="form-control col" placeholder="No funciona windows en el aula de 2A" id="floatingTextarea" onChange={handleDescriptionChange}></textarea>
                    </div>
                    {badData === true &&
                        <>
                        <p className='text-danger'>No se han rellenado todos los campos</p>
                        </>
                    }
                    <button className="btn btn-primary mx-auto mt-2  " style={{width: '10rem'}} onClick={createIncidence}>Crear</button>
                </div>
            </div>
        </div>

    );
}

