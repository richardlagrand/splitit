import { LoginForm } from "@/components/forms/login-form";
import TopNavigation from "@/components/navigation/topnavigation";
export function Login() {
  return (
    <>
      <TopNavigation />
      <div className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </div>
    </>
  );
}
export default Login;
