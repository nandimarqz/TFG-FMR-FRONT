import LoginForm from "../components/LoginForm";
import '../components/css/Login.css'

export default function LoginView() {
    return (
        <div className='container-fluid' id="login-root">
            <LoginForm/>
        </div>
    );
}