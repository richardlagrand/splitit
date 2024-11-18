"use client";
import { useState } from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import TopNavigation from "@/components/navigation/topnavigation";
import { redirect } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const Register: React.FC = () => {
  const [baseURL, setBaseURL] = useState("http://localhost:5173");
  const handleRegister = (data: any) => {
    // Handle form submission logic here (e.g., API call)
    data.preventDefault();
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

    fetch(`${baseURL}/api/users`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          redirect("../Complete");
        }
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          console.error("error", result.error);
          return (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Something has gone wrong</AlertTitle>
              <AlertDescription>($(result.error))</AlertDescription>
            </Alert>
          );
        }
      })
      .catch((error) => {
        console.error("error", error);
        return (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Something has gone wrong</AlertTitle>
            <AlertDescription>($(error))</AlertDescription>
          </Alert>
        );
      });
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
