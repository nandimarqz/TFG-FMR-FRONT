    import { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate } from "react-router-dom";
    import { useTheme } from '@emotion/react';
    import SelectUnitySubject from './SelectUnitySubject';
    import './css/Card.css';

  const baseURL = 'https://tfg-fmr.alwaysdata.net/back/public';

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
        },
    };
    function getStyles(name, personName, theme) {
        return {
        fontWeight:
            personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
        };  
    }



    export default function CardCreateUser() {
        const navigate = useNavigate();
        const [data, setData] = useState({id:'', name:'', password:''});
        const [badData, setBadData] = useState(false);
        const [passwordNTS, setPasswordNTS] = useState(false);
        const token = sessionStorage.getItem('user_token');
        const theme = useTheme();
        const [unities, setUnities] = useState([]);
        const [selectedUnity, setSelectedUnity] = useState('');
        const [selectedSubject, setSelectedSubject] = useState('');
        const [courseSubject, setCourseSubject]= useState([]);
        const [counterSelectUnitySubject, setCounterSelectUnitySubject] = useState([{id:1}]);

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

        useEffect(()=>{


        },[selectedUnity, selectedSubject])
        function handleChange(event) {
            const name = event.target.name;  
            const value = event.target.value;

            const nuevosDatos = { ...data, [name]: value };

            setData(nuevosDatos);
        }

        const handleUnityChange = (unity, index) => {
            setSelectedUnity(unity);
            setCourseSubject((prevValue)=>({
                ...prevValue,[index]:{
                    ...prevValue[index],
                    unity:unity
                }
            }))
        };

        const handleSubjectChange = (subject, index) => {
            setSelectedSubject(subject);
            setCourseSubject((prevValue)=>({
                ...prevValue,[index]:{
                    ...prevValue[index],
                    subject:subject
                }
            }))
        };


        const handleOnclick = ()=>{

            setCounterSelectUnitySubject([...counterSelectUnitySubject, { id: counterSelectUnitySubject[counterSelectUnitySubject.length]+1 }]);

        }

        function createTeacher(){

            let taught = {}

            Object.keys(courseSubject).forEach(value =>{
                if (!taught[courseSubject[value].unity]) {
                    taught[courseSubject[value].unity] = [];
                  }
                taught[courseSubject[value].unity].push(courseSubject[value].subject);
            })


            if(data.id !== '' && data.name !== '' && data.password !== '' && data.c_password !== ''){

                if( data.password === data.c_password){
                    axios({
                        method: 'POST',
                        url: "/back/public/api/user/teacher",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Bearer ' + token,
                        },
                        params: {
                            id: data.id,
                            name: data.name,
                            email: data.id + "@ieshnosmachado.org",
                            password: data.password,
                            c_password: data.c_password,
                            taughts: taught
                        },
                    }).then(response => {
                        setBadData(false);
                        setData({ id: '', name: '', password: '' });
                        navigate('/users');
                    }).catch(error => {

                    });

                } else {

                    setPasswordNTS(true);

                }
            

            }else{

                setBadData(true);

            }
        

        }


        return (
            <div className='mt-5 container-fluid'>
                <div className="card mt-5 mx-auto" style={{ width: '50rem' }}>
                    <div className="card-header text-white">
                        <h4 className="card-title">Alta de Profesor</h4>
                    </div>
                    <div className="card-body text-center me-3 ms-3">
                        <div className="row my-1">
                            <label className="col-3 form-label text-start fw-bold">ID: </label>
                            <input name="id" onChange={handleChange} className="col form-control me-5" value={data.id} type="text" placeholder='Usuario Seneca' />
                        </div>
                        <div className="row my-1">
                            <label className="col-3 form-label text-start fw-bold">Nombre: </label>
                            <input name="name" onChange={handleChange} className="col form-control me-5" value={data.name} type="text" />
                        </div>
                        <div className="row my-1">
                            <label className="col-3 form-label text-start fw-bold" >Email: </label>
                            <input name="email" onChange={handleChange} className="col form-control me-5" value={data.id !== undefined?data.id + '@ieshnosmachado.org':''} type="text" readOnly={true} />
                        </div>
                        <div className="row my-1">
                            <label className="col-3 form-label text-start fw-bold" >DNI/Contraseña: </label>
                            <input name="password" onChange={handleChange} className="col form-control me-5" value={data.password} type="password"/>
                        </div>
                        <div className="row my-1">
                            <label className="col-3 form-label text-start fw-bold" >DNI/Confirmar contraseña: </label>
                            <input name="c_password" onChange={handleChange} className="col form-control me-5" value={data.c_password} type="password"/>
                        </div>

                        {counterSelectUnitySubject.map((value,index)=>(
                            <SelectUnitySubject index={index} unities={unities.length!==0?unities:[]} token={token} onUnityChange={handleUnityChange} onSubjectChange={handleSubjectChange}/>
                        ))}
                        <a className='row' onClick={handleOnclick}>Si quiere añadir un curso nuevo con otra asignatura clike aquí</a>
                        {badData === true &&
                            <>
                            <p className='text-danger'>No se han rellenado todos los campos</p>
                            </>
                        }
                        {passwordNTS === true &&
                            <>
                            <p className='text-danger'>La contraseña y la contraseña de confirmación no son las mismas</p>
                            </>
                        }
                        <button className="btn btn-primary mx-auto mt-2  " style={{width: '10rem'}} onClick={createTeacher}>Crear</button>
                    </div>
                </div>
            </div>

        );
    }

