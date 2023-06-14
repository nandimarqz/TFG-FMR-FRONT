import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import open from '../img/open_in_new_FILL0_wght400_GRAD0_opsz48.png'
import '../components/css/home.css'
import { getTaughtCSV } from "../components/NavBar";
import { getEnrolleds } from "../components/NavBar";
import { getReviews } from "../components/NavBar";


export default function HomeView() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('user_token');

    useEffect(()=>{
    
        if(!token){

            navigate('/log-in')

        }

    },);

    return (
        <div>
            <NavBar/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col p-0 card ms-3 mt-5 me-5" style={{ width: '50rem' }}>
                        <div className="card-header text-white w-100">
                            <h4 className="card-title">Incidencias</h4>
                        </div>
                        <div className="card-body text-start me-3 ms-3">
                            {sessionStorage.getItem('userRole') === 'DIRECTIVO' && (
                                <div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/incidence')}>
                                        <h6 className='fw-bold me-2 '>Gestionar incidencias</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/incidence/view')}>
                                        <h6 className='fw-bold me-2 '>Ver Incidencias</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            )
                            }
                            {sessionStorage.getItem('userRole') === 'PROFESOR' && (
                                <div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/incidence')}>
                                        <h6 className='fw-bold me-2 '>Ver mis incidencias</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/incidence/view')}>
                                        <h6 className='fw-bold me-2 '>Ver Incidencia</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            )
                            }
                            {sessionStorage.getItem('userRole') === 'COORDINADOR TIC' && (
                                <div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/incidence')}>
                                        <h6 className='fw-bold me-2 '>Gestionar incidencias TIC</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/incidence/view')}>
                                        <h6 className='fw-bold me-2 '>Ver Incidencias</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                    {(sessionStorage.getItem('userRole') === 'PROFESOR' || sessionStorage.getItem('userRole') === 'DIRECTIVO') && ( 
                    <div className="col me-3 p-0 card ms-5 mt-5" style={{ width: '50rem' }}>
                        <div className="card-header text-white">
                            <h4 className="card-title">Revisión de libros</h4>
                        </div>
                        <div className="card-body text-start me-3 ms-3">
                            {sessionStorage.getItem('userRole') === 'DIRECTIVO' && (
                                <div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/review/student/table/')}>
                                        <h6 className='fw-bold me-2 '>Ver revisiones en una etapa y estado</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/reviews/table')}>
                                        <h6 className='fw-bold me-2 '>Tabla de revisiones</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            )
                            }
                            {sessionStorage.getItem('userRole') === 'PROFESOR' && (
                                <div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/review')}>
                                        <h6 className='fw-bold me-2 '>Revisar Libros</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/reviews/table')}>
                                        <h6 className='fw-bold me-2 '>Tabla de revisiones</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            )
                            }

                        </div>
                    </div>
                    )}
                </div>
                {sessionStorage.getItem('userRole') === 'DIRECTIVO' && (
                    <div>
                        <div className="row">
                            <div className="col p-0 card ms-3 mt-5 me-5" style={{ width: '50rem' }}>
                                <div className="card-header text-white w-100">
                                    <h4 className="card-title">Usuarios</h4>
                                </div>
                                <div className="card-body text-start me-3 ms-3">
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/users')}>
                                        <h6 className='fw-bold me-2 '>Lista de usuarios</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/edit/user')}>
                                        <h6 className='fw-bold me-2 '>Editar usuarios</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/user/create')}>
                                        <h6 className='fw-bold me-2 '>Dar de alta un profesor</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col me-3 p-0 card ms-5 mt-5" style={{ width: '50rem' }}>
                                <div className="card-header text-white">
                                    <h4 className="card-title">Alumnos</h4>
                                </div>
                                <div className="card-body text-start me-3 ms-3">
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/create/student')}>
                                        <h6 className='fw-bold me-2 '>Alta alumno</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-0 card ms-3 mt-5 me-5" style={{ width: '50rem' }}>
                                <div className="card-header text-white w-100">
                                    <h4 className="card-title">Carga CSV</h4>
                                </div>
                                <div className="card-body text-start me-3 ms-3">
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/upload/users')}>
                                        <h6 className='fw-bold me-2 '>Carga de profesores</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/upload/student')}>
                                        <h6 className='fw-bold me-2 '>Carga de alumnos</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={() => navigate('/upload/subjects-course')}>
                                        <h6 className='fw-bold me-2 '>Carga de asignaturas y curso</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col me-3 p-0 card ms-5 mb-3 mt-5" style={{ width: '50rem' }}>
                                <div className="card-header text-white">
                                    <h4 className="card-title">Exportar CSV</h4>
                                </div>
                                <div className="card-body text-start me-3 ms-3">
                                    <div className="my-1 d-flex align-items-center" onClick={getTaughtCSV}>
                                        <h6 className='fw-bold me-2 '>Exportar Imparte</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={getEnrolleds}>
                                        <h6 className='fw-bold me-2 '>Exportar Matriculado</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                    <div className="my-1 d-flex align-items-center" onClick={getReviews}>
                                        <h6 className='fw-bold me-2 '>Exportar Revisiones</h6><img src={open} className="mb-1" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
}   