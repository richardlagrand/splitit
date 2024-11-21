// routes.js
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Payments from "./pages/Payments.tsx";
import Payouts from "./pages/Payouts.tsx";
import Login from "./pages/login.tsx";
import Signup from "./pages/Signup.tsx";
import Register from "./pages/Register.tsx";
import Registration from "./pages/Registration.tsx";
import Complete from "./pages/complete.tsx";
import Incomplete from "./pages/incomplete.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AddPayment from "./pages/AddPayment.tsx";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
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
        path: "add-payment",
        element: <AddPayment />,
      },
    ],
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
