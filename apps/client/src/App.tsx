import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routes.tsx";

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
