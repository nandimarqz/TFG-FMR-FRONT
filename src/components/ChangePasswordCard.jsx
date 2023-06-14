import { useState, useEffect } from 'react';
import axios from '../utils/AxiosInstance';
import { useNavigate } from "react-router-dom";

const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';

export default function ChangePasswordCard() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [badData, setBadData] = useState(false);
    const [passwordNTS, setPasswordNTS] = useState(false);
    const [samePassword, setSamePassword] = useState(false);
    const [badCurrentPassword, setBadCurrentPassword] = useState(false);
    const token = sessionStorage.getItem('user_token');
    const id = sessionStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(()=>{

      
      },[badData,passwordNTS,samePassword])
      
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const changePassword = () =>{

        if(currentPassword !== '' && password !== '' && confirmPassword !== ''  ){

            if(password === confirmPassword){

                if(password !== currentPassword){

                    axios({
                        method: 'PUT',
                        url:"/back/public/api/change-password",
                        headers: {
                          'Accept': 'application/json, text/plain, */*',
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': 'Bearer ' + token,
                        },
                        data:{
                            "currentPassword":currentPassword,
                            "user_id":id,
                            "password":password
                        },
                      }).then(response =>{
                            setBadCurrentPassword(false);
                            setSamePassword(false);
                            setBadData(false);
                            setPasswordNTS(false);
                            navigate('/')
                      }).catch(error=>{
                            
                            if(error.response.data.message === 'Bad current password'){

                                setBadCurrentPassword(true);
                                setSamePassword(false);
                                setBadData(false);
                                setPasswordNTS(false);
                            }
                      });

                }else{

                    setSamePassword(true);
                    setBadData(false);
                    setPasswordNTS(false);
                    setBadCurrentPassword(false);
                }


            }else{

                setPasswordNTS(true);
                setBadData(false);
                setBadCurrentPassword(false);
                setSamePassword(false);
            }

        }else{

            setBadData(true);
            setBadCurrentPassword(false);
            setSamePassword(false);
            setPasswordNTS(false);

        }


    }

    return (
        <div className='mt-5 container-fluid'>
            <div className="card mt-5 mx-auto" style={{ width: '50rem' }}>
                <div className="card-header text-white">
                 <h4 className="card-title fw-bold">Cambiar contraseña</h4>
                </div>
                <div className="card-body text-center me-3 ms-3">
                    <div className='row mb-3 mt-4'>
                    <div className="row my-1">
                        <label className="col-4 form-label text-start fw-bold">Constraseña actual: </label>
                        <input name="nombre" className="col form-control" type="password" onChange={handleCurrentPasswordChange} />
                    </div>
                    <div className="row my-1">
                        <label className="col-4 form-label text-start fw-bold" >Nueva contraseña: </label>
                        <input name="apellido1"  className="col form-control" type="password" onChange={handlePasswordChange}/>
                    </div>
                    <div className="row my-1">
                        <label className="col-4 form-label text-start fw-bold" >Confirmar contraseña: </label>
                        <input name="apellido2" className="col form-control" type="password" onChange={handleConfirmPasswordChange}/>
                    </div>
                    </div>
                    {badData === true &&
                        <>
                        <p className='text-danger'>No se han rellenado todos los campos</p>
                        </>
                    }
                    {passwordNTS === true &&
                        <>
                        <p className='text-danger'>La nueva contraseña y la contraseña de confirmación no son las mismas</p>
                        </>
                    }
                    {samePassword === true &&
                        <>
                        <p className='text-danger'>La contraseña nueva no puede ser igual a la actual</p>
                        </>
                    }

                    {badCurrentPassword === true &&
                        <>
                        <p className='text-danger'>La contraseña actual no es correcta</p>
                        </>
                    }
                    <button className="btn btn-primary mx-auto mt-2" style={{width: '10rem'}} onClick={changePassword} >Cambiar</button>
                </div>
            </div>
        </div>

    );
}

