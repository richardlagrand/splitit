// routes.js
import Home from "./pages/Home";
import NotFound from "./pages/NotFound.tsx";
import Payments from "./pages/Payments.tsx";
import Payouts from "./pages/Payouts.tsx";
import Account from "./pages/Account.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Register from "./pages/Register.tsx";
import Registration from "./pages/Registration.tsx";
import Complete from "./pages/Complete.tsx";
import Incomplete from "./pages/Incomplete.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "payouts",
        element: <Payouts />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "registration",
    element: <Registration />,
    errorElement: <NotFound />,
    children: [
      {
        path: "complete",
        element: <Complete />,
      },
      {
        path: "incomplete",
        element: <Incomplete />,
      },
    ],
  },
];

export default routes;
