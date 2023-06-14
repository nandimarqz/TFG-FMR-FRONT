import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ReviewStudentsTable from "../components/ReviewStudentsTable";


export default function ReviewStudentView() {
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
            <ReviewStudentsTable/>
        </div>
    );
}  