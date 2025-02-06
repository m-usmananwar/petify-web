import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import appBgImg from "/assets/bg-squirrel.jpg";

const Public = () => {
  const authUser = useSelector((store) => store.auth.auth);
  const authToken = useSelector((store) => store.auth.token);

  const navigate = useNavigate();
  useEffect(() => {
    if (authUser && authToken) {
      navigate("/marketplace");
    }
  }, [authUser, authToken]);

  return (
    <>
      <img
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        alt="fixed-bg"
        src={appBgImg}
      />
      <Outlet />
    </>
  );
};

export default Public;
