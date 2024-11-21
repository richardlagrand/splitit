import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/components/UserContext";
import LoginForm from "@/components/forms/login-form";
import TopNavigation from "@/components/navigation/TopNavigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const Login: React.FC = () => {
  const { setUser } = useUser();
  const [baseURL, setBaseURL] = useState("http://localhost:8080");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    data.preventDefault();
    console.log("attempting to login");
    const { email, password } = data;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email,
      password,
    });

    var requestOptionsPost: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseURL}/api/login`, requestOptionsPost);

      if (response.status === 200) {
        const data = await response.json();
        console.log("Response JSON:", data);
        setUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login attempt failed", err);
      setError("An unexpected error occurred. Please try again later.");
      return (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Something has gone wrong</AlertTitle>
          <AlertDescription>($(error))</AlertDescription>
        </Alert>
      );
    }
    console.log("Form data:", data);
  };

  return (
    <>
      <TopNavigation />
      <div className="flex h-screen w-full items-center justify-center px-4">
        <LoginForm onCustomClick={handleLogin} />
      </div>
    </>
  );
};
export default Login;
