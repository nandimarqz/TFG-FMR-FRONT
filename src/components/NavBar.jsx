import logoTransparente from '../img/escudo_transparent.png'
import './css/NavBar.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';

const token = sessionStorage.getItem('user_token');

export function getTaughtCSV(){

  axios({
    method: 'GET',
    url: '/back/public/api/export/taughts',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token,
      responseType: 'blob'
    },
  }).then(response =>{


        const url = URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Imparte.csv';
        a.click();
        URL.revokeObjectURL(url);

  }).catch(error=>{
        

  });

}

export function getReviews(){

  axios({
    method: 'GET',
    url: '/back/public/api/export/reviews',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token,
      responseType: 'blob'
    },
  }).then(response =>{


        const url = URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Revisiones.csv';
        a.click();
        URL.revokeObjectURL(url);

  }).catch(error=>{
        

  });

}
export function getEnrolleds(){

  axios({
    method: 'GET',
    url: '/back/public/api/export/enrolleds',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token,
      responseType: 'blob'
    },
  }).then(response =>{


        const url = URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Matriculados.csv';
        a.click();
        URL.revokeObjectURL(url);

  }).catch(error=>{
        

  });

}

const baseURL = 'https:/tfg-fmr.alwaysdata.net/back/public';

export default function NavBar() {
  const navigate = useNavigate();
  const [roles,setRoles] = useState([]);


  useEffect(()=>{

    async function getUserRoles(){

      axios({
        method: 'GET',
        url: '/back/public/api/user/roles/'+sessionStorage.getItem('user_id'),
        params: {
          user_id: sessionStorage.getItem('user_id'),
        },
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token,
        },
      }).then(response =>{
       
        setRoles(response.data.data)
  
      }).catch(error=>{
                

      });    
    }
    getUserRoles();
  },[])

  const handleLogOut = (event) => {
    sessionStorage.removeItem('user_token')
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('userRole')

    navigate('/log-in')
  };

  function changeRole (role) {
    
    sessionStorage.setItem('userRole', role)

  }

  function getTaughtCSV(){

    axios({
      method: 'GET',
      url: '/back/public/api/export/taughts',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token,
        responseType: 'blob'
      },
    }).then(response =>{
 

          const url = URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Imparte.csv';
          a.click();
          URL.revokeObjectURL(url);

    }).catch(error=>{
          

    });

  }

  function getReviews(){

    axios({
      method: 'GET',
      url: '/back/public/api/export/reviews',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token,
        responseType: 'blob'
      },
    }).then(response =>{
 

          const url = URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Revisiones.csv';
          a.click();
          URL.revokeObjectURL(url);

    }).catch(error=>{
          

    });

  }
  function getEnrolleds(){

    axios({
      method: 'GET',
      url: '/back/public/api/export/enrolleds',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token,
        responseType: 'blob'
      },
    }).then(response =>{
 

          const url = URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Matriculados.csv';
          a.click();
          URL.revokeObjectURL(url);

    }).catch(error=>{
          

    });

  }

  async function endCourse(){
   
    if( window.confirm('Esta operación es destructiva. ¿Está seguro de realizarla? Se descargarán los listados generados este curso')){
      if (window.confirm('Esta acción es irreversible. ¿Está completamente seguro?')) {

       getEnrolleds();
       setTimeout(()=> getTaughtCSV(),500);
       setTimeout(()=>  getReviews(),1000);
       setTimeout(()=> {
        axios({
          method: 'GET',
          url: '/back/public/api/clear',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
          },
        }).then(response =>{
            window.alert('Se ha iniciado el nuevo curso')
        }).catch(error=>{
              
    
        });
       },1500);
      }
    
    }

  }

  return (

    <div id="nav">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <img className="navbar-brand img-thumbnail" width="50px" height="50px" src={logoTransparente} alt="IES Hermanos Machado Logo" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" id="home" href="/">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="fi fi-sr-users" /> Incidencias
                </a>
                <ul className="dropdown-menu">
                  {sessionStorage.getItem('userRole') === 'PROFESOR' &&
                    <>
                      <li><a className="dropdown-item" href="/incidence">Ver mis incidencias</a></li>
                      {/* <li><a className="dropdown-item" href="/incidence/create">Alta de Incidencia</a></li> */}
                    </>
                  }
                  {sessionStorage.getItem('userRole') === 'DIRECTIVO' &&
                    <>
                      <li><a className="dropdown-item" href="/incidence">Gestionar incidencias</a></li>
                    </>
                  }
                  {sessionStorage.getItem('userRole') === 'COORDINADOR TIC' &&
                    <>
                      <li><a className="dropdown-item" href="/incidence">Gestionar incidencias TIC</a></li>
                    </>
                  }
                  <li><a className="dropdown-item" href="/incidence/view">Ver incidencia</a></li>
                </ul>
              </li>
              {(sessionStorage.getItem('userRole') === 'PROFESOR' || sessionStorage.getItem('userRole') === 'DIRECTIVO') &&
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Revision de libros
                  </a>
                  <ul className="dropdown-menu">
                    {sessionStorage.getItem('userRole') === 'PROFESOR' &&
                      <li><a className="dropdown-item" href="/review">Revisar Libros</a></li>
                    }
                    {sessionStorage.getItem('userRole') === 'DIRECTIVO' &&
                      <li><a className="dropdown-item" href="/review/student/table/">Ver revisiones en una etapa y estado</a></li>
                    }
                    <li><a className="dropdown-item" href="/reviews/table">Tabla de Revisiones</a></li>
                  </ul>
                </li>
              }
              {sessionStorage.getItem('userRole') === 'DIRECTIVO' &&
                    <>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Usuarios
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/users">Lista de usuarios</a></li>
                        <li><a className="dropdown-item" href="/edit/user">Editar usuarios</a></li>
                        <li><a className="dropdown-item" href="/user/create">Dar de alta profesor</a></li>
                      </ul>
                    </li>
                    <li className="nav-item ">
                      <a className="nav-link" aria-current="page" id="home" href="/create/student" >Alta Alumno</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Carga CSV
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/upload/users">Carga de Profesores</a></li>
                        <li><a className="dropdown-item" href="/upload/student">Carga de Alumnos</a></li>
                        <li><a className="dropdown-item" href="/upload/subjects-course">Carga de Asignaturas y Cursos</a></li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Exportar CSV
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={getTaughtCSV}  href="#">Exportar Imparte</a></li>
                        <li><a className="dropdown-item" onClick={getEnrolleds}  href="#">Exportar Matriculado</a></li>
                        <li><a className="dropdown-item" onClick={getReviews} href="#">Exportar Revisiones</a></li>
                      </ul>
                    </li>
                    </>
                  }

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cambiar Perfil
                </a>
                <ul className="dropdown-menu">
                {roles.map((role) => (
                  role.name !== sessionStorage.getItem('userRole') ? (
                  <li key={role.id}><a className="dropdown-item" key={role.name}  onClick={()=>changeRole(role.name)} href='/'>{role.name}</a></li>
                  ) : null
                  ))}
                </ul>
              </li>
              <li className="nav-item ">
                <a className="nav-link" aria-current="page" id="home" href="/changePassword">Cambiar contraseña</a>
              </li>
              {sessionStorage.getItem('userRole') === 'DIRECTIVO' &&
              <li className="nav-item ">
                <a className="nav-link" aria-current="page" id="home" href="#" onClick={endCourse}>Finalizar Curso</a>
              </li>
              }
            </ul>
            <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link" aria-current="page" id="home" href="/" onClick={handleLogOut}><LogoutIcon sx={{color:'#ffff'}}></LogoutIcon>Cerrar Sesión</a>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  )

}