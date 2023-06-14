import React, { useState } from 'react';
import Button from '@mui/material/Button';
import logoTransparente from '../img/escudo_transparent.png'
import { MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import axios from '../utils/AxiosInstance';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField/TextField';

const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole] = useState('');
  const navigate = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [invalidRole, setInvalidRole] = useState(false);

  useEffect(()=>{

    async function getCsrfCookie(){

      // await fetch(baseURL + '/sanctum/csrf-cookie', {
      //   method: 'GET',
      //   credentials: 'include'
      // })

    axios.get('/back/public/sanctum/csrf-cookie',{withCredentials:true})
    
    }
    getCsrfCookie();
  },[invalidCredentials, invalidRole])

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    axios.post('/back/public/api/login', {
      email: email,
      password: password,
      role:role
    },{withCredentials:true},{
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',

      }
    }).then(response =>{

      sessionStorage.setItem('user_token', response.data.data.token)
      sessionStorage.setItem('user_id',response.data.data.user_id )
      sessionStorage.setItem('userRole',response.data.data.userRole )
      setInvalidCredentials(false);
      setInvalidRole(false);
      navigate('/');

    }).catch(error=>{

      
      if(error.response.data.message === 'Unauthorized'){
        setInvalidCredentials(true);
        setInvalidRole(false);
      }else if(error.response.data.message === 'erroneous role'){
        setInvalidRole(true);
        setInvalidCredentials(false);
      }
      

    });

  };


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 row '>
      <div className='col-3 shadow rounded p-3 text-center mb-5' id='div-login'>
      
        <img src={logoTransparente}  alt='img instituto' width={200} height={200}/>

        <form  noValidate autoComplete="off" onSubmit={handleSubmit} className='row'>

          Email:<TextField id="email" value={email} onChange={handleEmailChange} className='ps-0' />

          Password:<TextField id="password" type="password" value={password} onChange={handlePasswordChange} className='ps-0' />

          Rol: <Select value={role} color='success' onChange={handleSelectChange}>
            <MenuItem value={"PROFESOR"}>Profesor</MenuItem>
            <MenuItem value={"COORDINADOR TIC"}>Coordinador TIC</MenuItem>
            <MenuItem value={"DIRECTIVO"}>Directivo</MenuItem>
          </Select>
          {invalidCredentials === true &&
            <>
              <p className='text-danger'>Las credenciales son inválidas</p>
            </>
          }
          {invalidRole === true &&
            <>
              <p className='text-danger'>El rol introducido es erróneo</p>
            </>
          }
          <Button variant="contained" sx={{backgroundColor:'#368f3f !important'}} type="submit" className='mt-3'>
            Iniciar Sesión
          </Button>

        </form>
      </div>
    </div>
  );
}

export default LoginForm;