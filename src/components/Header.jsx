import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.jsx";

const Header = () => {
  const authUser = useSelector((store) => store.auth.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="sticky top-0 flex justify-between items-center px-2 py-4 shadow-sm shadow-white z-10">
      <div>
        <h1 className="text-4xl font-bold font-noto text-amber-600 cursor-pointer">
          <Link to="/"> PETIFY </Link>
        </h1>
      </div>
      <div>
        <ul className="flex space-x-10">
          {authUser ? (
            <>
              <li className="bg-amber-700 py-1 px-2 rounded-md cursor-pointer text-white">
                <Link to="/marketplace"> Marketplace </Link>
              </li>
              <li
                onClick={handleLogout}
                className="bg-amber-700 py-1 px-2 rounded-md cursor-pointer text-white"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="bg-amber-700 py-1 px-2 rounded-md cursor-pointer text-white">
                <Link to="/login">Login</Link>
              </li>
              <li className="bg-amber-700 py-1 px-2 rounded-md cursor-pointer text-white">
                Register
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
