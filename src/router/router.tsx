import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { Signin } from "../pages/signup-page/signin";
import { Table } from "../pages/table/table";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { authMe } from "../features/auth/auth";
import { NotFound } from "../pages/not-found/not-found";

const publicRoutes = [
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/*",
    element: <NotFound />,
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
    

    return isAuth === false ? <Navigate to="/sign-in" /> : <Outlet />
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