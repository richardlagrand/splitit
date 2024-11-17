"use client";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/forms/RegisterForm";
import TopNavigation from "@/components/navigation/topnavigation";

const Register: React.FC = () => {
  const handleRegister = (data: any) => {
    // Handle form submission logic here (e.g., API call)
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
