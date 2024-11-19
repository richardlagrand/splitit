import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Complete() {
  return (
    <>
      <div className="h-screen flex items-center justify-center text-5xl flex-col">
        <h1>Registration completed</h1>
        <Link to="../dashboard">
          <Button variant="outline">Go to Dashboard</Button>
        </Link>
      </div>
    </>
  );
}
export default Complete;
