// routes.js
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Payments from "./pages/Payments.tsx";
import Payouts from "./pages/Payouts.tsx";
import Account from "./pages/Account.tsx";
import Login from "./pages/login.tsx";
import Signup from "./pages/Signup.tsx";
import Register from "./pages/Register.tsx";
import Registration from "./pages/Registration.tsx";
import Complete from "./pages/complete.tsx";
import Incomplete from "./pages/incomplete.tsx";
import Dashboard from "./pages/dashboard.tsx";

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
  },
  {
    path: "registration/complete",
    element: <Complete />,
    errorElement: <NotFound />,
  },
  {
    path: "registration/incomplete",
    element: <Incomplete />,
  },
];

export default routes;
