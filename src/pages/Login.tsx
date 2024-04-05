import Banner from "../components/decorations/Banner";
import LoginForm from "../components/forms/login/LoginForm";

function Login() {
    return (
        <div className="grid">
            <Banner title="Login" description="Bienvenid@" />
            <LoginForm />
        </div>
    );
}

export default Login;
