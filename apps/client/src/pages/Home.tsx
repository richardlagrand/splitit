import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="ml-5">
        <h1 className="text-3xl font-bold underline py-10">Home</h1>
        <Link to="Payments">Payments</Link>
        <br />
        <Link to="Payouts">Payouts</Link>
        <br />
        <Link to="Register">Register</Link>
        <br />
        <Link to="Login">Login</Link>
        <br />
        <Link to="Dashboard">Dashboard</Link>
      </div>
    </>
  );
}
export default Home;
