import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../helpers/apiClient.jsx";
import useLoading from "../hooks/useLoading.jsx";
import { useToast } from "../context/ToasterContext.jsx";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();
  const { showToast } = useToast();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const contactNo = useRef(null);
  const userName = useRef(null);
  const image = useRef(null);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName.current.value ||
      !lastName.current.value ||
      !contactNo.current.value ||
      !userName.current.value ||
      !email.current.value ||
      !password.current.value ||
      !image.current.files[0]
    ) {
      setError("Please enter valid details");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName.current.value);
      formData.append("lastName", lastName.current.value);
      formData.append("contactNo", contactNo.current.value);
      formData.append("userName", userName.current.value);
      formData.append("email", email.current.value);
      formData.append("password", password.current.value);
      formData.append("image", image.current.files[0]);

      const response = await apiClient.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const verificationId = response?.data?.verificationId;
      const successMessage = response?.data?.message;
      showToast(successMessage);
      if (verificationId) navigate(`/verify/${verificationId}`);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      showToast(errorMessage, "error");
      setError("Registration failed please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegisterSubmit}
        className="p-6 rounded-sm text-white bg-gray-200 bg-custom-gray w-2/6"
      >
        <h1 className="text-center mb-4 text-3xl font-bold font-noto">
          Register
        </h1>

        <div className="flex gap-4">
          <input
            ref={firstName}
            type="text"
            className="border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-1/2"
            placeholder="First Name"
          />
          <input
            ref={lastName}
            type="text"
            className="border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-1/2"
            placeholder="Last Name"
          />
        </div>

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
        <input
          ref={contactNo}
          type="text"
          className="block border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-full"
          placeholder="Contact Number"
        />
        <input
          ref={userName}
          type="text"
          className="block border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-full"
          placeholder="Username"
        />
        <input
          ref={image}
          type="file"
          className="block border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-full"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full text-white py-2 my-3 px-4 bg-amber-900 cursor-pointer rounded"
        >
          {loading ? "Trying..." : "Register"}
        </button>
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <span className="cursor-pointer font-bold font-noto">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
