import Banner from "../components/decorations/Banner";
import RegisterForm from "../components/forms/register/RegisterForm";

function Register() {
    return (
        <div className="grid">
            <Banner
                title="Register"
                description="Registrate y encuentra el trabajo de tus sueños"
            />
            <RegisterForm />
        </div>
    );
}

export default Register;
