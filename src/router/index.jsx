import { createBrowserRouter, Navigate } from "react-router-dom";
import Public from "../Pages/Public.jsx";
import Landing from "../Pages/Landing.jsx";
import Protected from "../Pages/Protected.jsx";
import Marketplace from "../Pages/Marketplace.jsx";
import Profile from "../Pages/Profile.jsx";
import Login from "../Pages/Login.jsx";
import MainLayout from "../Pages/MainLayout.jsx";
import NotFound from "../Pages/ErrorElement.jsx";

const appRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        element: <Public />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/verify",
            element: <Landing />,
          },
        ],
      },
      {
        element: <Protected />,
        children: [
          {
            path: "/marketplace",
            element: <Marketplace />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default appRouter;
