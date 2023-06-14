import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import CardCreateIncidence from "../components/CardCreateIncidence";
import IncidenceDeatil from "../components/IncidenceDetail";


export default function IncidenceDetailView() {
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
            <IncidenceDeatil/>
        </div>
    );
} 