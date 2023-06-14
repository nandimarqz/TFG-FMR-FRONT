import { useState, useEffect } from 'react';
import axios from '../utils/AxiosInstance';
import './css/Card.css';
import userscsv from '../data/Profesores.csv'


const baseURL = 'https:/tfg-fmr.alwaysdata.net/back/public';

export default function UploadUseFileCard() {
    const token = sessionStorage.getItem('user_token');
    const [csv, setCsv] = useState('');
    const [badData, setBadData] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);

    useEffect(()=>{

        

    },[csv])

    function handleChange(event){
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('csv_file', file);
        setCsv(formData);
    }

    function uploadFile(){
        if(csv !== ''){
        axios({
            method: 'POST',
            url: "/back/public/api/uploadUserCSV",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token,
            },
            data:csv,
        }).then(response => {
            setBadData(false);
            setFileUploaded(true);
        }).catch(error => {

        });
        }else{
            setBadData(true);
        }
    }

    return (
      
          <div className="card mt-5 mx-auto" style={{ width: '50rem' }}>
            <div className="card-header text-white">
                <h4 className="card-title">Carga de Profesores CSV </h4>
            </div>
            <p className='text-center mt-2 fw-bold'>CSV de ejemplo.............<a href={userscsv} download="Profesores.csv">Profesores.csv</a></p>
                <div className="card-body text-center me-3 ms-3">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                    <input type="file" className="form-control" id="inputGroupFile01" onChange={handleChange} />
                </div>
                    {badData === true &&
                        <p className='text-danger'>No se ha seleccionado ningun fichero</p>
                    }
                    {fileUploaded === true &&
                        <p className='text-success'>Se han cargado los profesores satisfactoriamente</p>
                    }
                    <button className="btn btn-primary mx-auto mt-2  " style={{width: '10rem'}} onClick={uploadFile}>Cargar</button>
                </div>
            </div>

    );
}

