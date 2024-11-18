import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <div>
        <h1>404</h1>
        <h2>Something went wrong</h2>
        <Link to="./">click here to go back to home</Link>
      </div>
    </>
  );
}
export default NotFound;
