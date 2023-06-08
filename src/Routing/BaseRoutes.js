import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";
import Home from "../Pages/Home";

const Layout = () => {
  return (
    <>
      <Box sx={{ height: "10vh", width: "100%", position: "fixed" }}>
        <Navbar />
      </Box>
      <Box sx={{ height: "100vh", width: "100%", overflowY: "scroll" }}>
        <Outlet />
      </Box>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default function BaseRoutes() {
  return <RouterProvider router={router} />;
}
