import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Protected = () => {
  const authUser = useSelector((store) => store.auth.auth);
  const authToken = useSelector((store) => store.auth.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser || !authToken) {
      navigate("/login");
    }
  }, [authToken, authUser]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Protected;
