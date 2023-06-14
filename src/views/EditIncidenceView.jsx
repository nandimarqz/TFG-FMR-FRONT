import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import EditIncidenceCard from "../components/EditIncidenceCard";


export default function EditIncidenceView() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('user_token');
    const userRole = sessionStorage.getItem('userRole');
    useEffect(()=>{
    
        if(!token){

            navigate('/log-in')

        }

        if(  userRole !== 'DIRECTIVO' && userRole !== 'COORDINADOR TIC'){

            navigate('/')

        }

    },);

    return (
        <div>
            <NavBar/>
            <EditIncidenceCard/>
        </div>
    );
}