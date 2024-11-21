"use client";
import { useState } from "react";
import AddPaymentForm from "@/components/forms/addPaymentForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

const AddPayment: React.FC = () => {
  const [baseURL, setBaseURL] = useState("http://localhost:8080");
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();

  const handlePayment = async (data: any) => {
    const { first_name, last_name, email, description, amount, tags } = data;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      first_name,
      last_name,
      email,
      description,
      amount,
      tags,
    });

    var requestOptionsPost: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${baseURL}/api/payments`,
        requestOptionsPost
      );

      if (response.status === 201) {
        const result = await response.json();
        console.log("Response JSON:", result);
        const url = result.url;
        return (
          <>
            <div className="h-screen flex items-center justify-center text-5xl flex-col">
              <h1>Payment link created</h1>
              <p>${url}</p>
              <Link to={url}>
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
            </div>
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Your payment link is created</AlertTitle>
              <AlertDescription>${url}</AlertDescription>
            </Alert>
          </>
        );
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
      <div className="container mx-auto mt-0 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add payment</h1>
        <p className="text-center mt-2 font-light text-sm">
          {" "}
          Enter the details of the tenant you want to bill.
        </p>
        <AddPaymentForm onSubmit={handlePayment} />
      </div>
    </>
  );
};

export default AddPayment;
