import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import UploadSubjectCourseCard from "../components/UploadSubjectCourseCard";


export default function UploadSubjectCourseView() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('user_token');
    const userRole = sessionStorage.getItem('userRole');
    useEffect(()=>{
    
        if(!token){

            navigate('/log-in')

        }

        if(  userRole !== 'DIRECTIVO'){

            navigate('/')

        }

    },);

    return (
        <div>
            <NavBar/>
            <UploadSubjectCourseCard/>
        </div>
    );
} 