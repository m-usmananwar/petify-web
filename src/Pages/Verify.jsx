import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { verify } from "../store/authSlice.jsx";
import { useDispatch } from "react-redux";
import useLoading from "../hooks/useLoading.jsx";

const Verify = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, setLoading } = useLoading();

  const { verificationId } = useParams();

  const verificationCode = useRef(null);

  const handleVerifySubmit = async (e) => {
    e.preventDefault();

    if (!verificationCode.current.value) {
      setError("Please enter valid details");
      return;
    }
    setLoading(true);
    try {
      const actionResult = await dispatch(
        verify({
          verificationId: verificationId,
          verificationCode: verificationCode.current.value,
        })
      );

      if (verify.fulfilled.match(actionResult)) {
        navigate("/marketplace");
      } else {
        setError(
          actionResult.payload || "Verification failed please try again"
        );
      }
    } catch (error) {
      setError("Verification failed please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleVerifySubmit}
        className="p-6 rounded-sm text-white bg-gray-200 bg-custom-gray w-2/6"
      >
        <h1 className="text-center mb-4 text-3xl font-bold font-noto">
          Verify
        </h1>
        <input
          ref={verificationCode}
          type="number"
          className="block border-2 rounded-sm border-gray-100 placeholder-gray-100 focus:outline-gray-100 p-2 my-3 w-full"
          placeholder="Verification Code"
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
          {loading ? "Trying..." : "Verify"}
        </button>
        <p className="mt-2 text-center">
          Already have an account?
          <span className="cursor-pointer font-bold font-noto">
            {<Link to="/login">Login</Link>}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Verify;
