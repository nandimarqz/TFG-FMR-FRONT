import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import CardCreateIncidence from "../components/CardCreateIncidence";
import CreateReview from "../components/CreateReview";
import UserTable from "../components/UserTable";


export default function CreateReviewView() {
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
            <CreateReview/>
        </div>
    );
}  