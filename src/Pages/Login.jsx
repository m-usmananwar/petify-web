import React, { useRef, useState } from "react";
import { login } from "../store/authSlice.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useLoading from "../hooks/useLoading.jsx";
import { useToast } from "../context/ToasterContext.jsx";

const Login = () => {
  const [error, setError] = useState("");
  const { loading, setLoading } = useLoading();

  const { showToast } = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email.current.value || !password.current.value) {
      setError("Please enter valid details");
      return;
    }

    try {
      const actionResult = await dispatch(
        login({ email: email.current.value, password: password.current.value })
      );

      if (login.fulfilled.match(actionResult)) {
        showToast("User authenticated successfully");
        navigate("/marketplace");
      } else {
        setError(actionResult.payload || "Login failed please try again");
      }
    } catch (error) {
      console.log(error);
      setError("Login failed please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLoginSubmit}
        className="p-6 rounded-sm text-white bg-gray-200 bg-custom-gray w-2/6"
      >
        <h1 className="text-center mb-4 text-3xl font-bold font-noto">Login</h1>
        <input
          ref={email}
          type="text"
          className="block border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-full"
          placeholder="Email"
        />
        <input
          ref={password}
          type="password"
          className="block border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-full"
          placeholder="Password"
        />
        {error && (
          <p className="text-red-600">
            {typeof error === "object" ? error.message : error}
          </p>
        )}
        <button
          disabled={loading}
          className="w-full text-white py-2 my-3 px-4 bg-amber-900 cursor-pointer rounded"
        >
          {loading ? "Trying..." : "Login"}
        </button>
        <p className="mt-2 text-center">
          Don't have an account?
          <span className="cursor-pointer font-bold font-noto">
            {<Link to="/register">Register</Link>}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
