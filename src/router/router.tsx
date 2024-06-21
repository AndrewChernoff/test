import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Signin } from "../pages/signin-page/signin";
import { Signup } from "../pages/signup-page/signup";
import { Table } from "../pages/table/table";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { authMe } from "../features/auth/auth";

const publicRoutes = [
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Table />,
  },
];

const PrivateRoute = () => {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')
  const isAuth = !!token;

    useEffect(() => {
      dispatch(authMe())
    }, [dispatch])
    

    return isAuth === false ? <Navigate to="/sign-up" /> : <Outlet />
}

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: privateRoutes,
  },
  ...publicRoutes
]);


export const Router = () => {
    return <RouterProvider router={router} />
}