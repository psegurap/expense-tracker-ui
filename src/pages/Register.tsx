import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../features/auth/RegisterForm";

export default function Register() {
    return (
        <AuthLayout title="Set up your account">
            <RegisterForm />
        </AuthLayout>
    );
}
