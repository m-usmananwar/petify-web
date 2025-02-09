import { createBrowserRouter } from "react-router-dom";
import Public from "../Pages/Public.jsx";
import Landing from "../Pages/Landing.jsx";
import Protected from "../Pages/Protected.jsx";
import Marketplace from "../Pages/Marketplace.jsx";
import Profile from "../Pages/Profile.jsx";
import Login from "../Pages/Login.jsx";
import MainLayout from "../Pages/MainLayout.jsx";
import ErrorElement from "../Pages/ErrorElement.jsx";
import Register from "../Pages/Register.jsx";
import Verify from "../Pages/Verify.jsx";
import AuctionDetail from "../Pages/AuctionDetail.jsx";

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
            path: "/register",
            element: <Register />,
          },
          {
            path: "/verify/:verificationId",
            element: <Verify />,
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
          {
            path: "/auction/:id",
            element: <AuctionDetail />,
          },
        ],
      },
    ],
    // errorElement: <ErrorElement />,
  },
]);

export default appRouter;
