import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import ChangePasswordCard from "../components/ChangePasswordCard";


export default function ChangePasswordView() {
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
            <ChangePasswordCard/>
        </div>
    );
} 