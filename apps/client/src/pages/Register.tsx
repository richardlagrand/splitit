"use client";
import { useState } from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import TopNavigation from "@/components/navigation/topnavigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [baseURL, setBaseURL] = useState("http://localhost:8080");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (data: any) => {
    const { username, email, password, confirmPassword } = data;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseURL}/api/users`, requestOptions);

      if (response.status === 201) {
        const result = await response.json();
        console.log("Response JSON:", result);
        const url = result.accountLink;
        window.location.href = url;
        return;
        // return navigate(url); //redirect to the stripe accountlink
      } else {
        const result = await response.json();
        if (result.error) {
          setError(result.error);
          return (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Something has gone wrong</AlertTitle>
              <AlertDescription>($(result.error))</AlertDescription>
            </Alert>
          );
        }
      }
    } catch (err) {
      console.error("Network error", err);
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
      <div className="ml-5">
        <TopNavigation />
      </div>
      <div className="container mx-auto mt-8 p-4 max-w-lg bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </>
  );
};

export default Register;
