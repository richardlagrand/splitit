import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="ml-5">
        <h1 className="text-3xl font-bold underline py-10">Home</h1>
        <Link to="payments">Payments</Link>
        <br />
        <Link to="payouts">Payouts</Link>
        <br />
        <Link to="register">Register</Link>
        <br />
        <Link to="login">Login</Link>
        <br />
        <Link to="dashboard">Dashboard</Link>
        <br />
        <Link to="registration/complete">Registration complete</Link>
        <br />
        <Link to="registration/incomplete">Registration incomplete</Link>
      </div>
    </>
  );
}
export default Home;
