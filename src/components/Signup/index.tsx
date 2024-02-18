import React from "react";
import { useNavigate } from "react-router-dom";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-12 pl-0 flex gap-8">
      <div className="bg-gray-200 flex-grow"></div>
      {/* <div className="bg-gray-100 flex items-center justify-center h-screen"> */}
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Email/Phone Input */}
        <div className="mb-4">
          <label
            htmlFor="emailPhone"
            className="block text-sm font-medium text-gray-600"
          >
            Email or Phone Number
          </label>
          <input
            type="text"
            id="emailPhone"
            name="emailPhone"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Create Account Button */}
        <button className="bg-blue-500 text-white p-2 rounded-md w-full">
          Create Account
        </button>

        <div className="mt-4 flex items-center justify-between">
          <hr className="border-t w-full" />
          <span className="text-sm text-gray-500 mx-2">or</span>
          <hr className="border-t w-full" />
        </div>

        {/* Signup with Google Button */}
        <button className="bg-red-500 text-white p-2 rounded-md w-full mt-4">
          Signup with Google
        </button>

        {/* Already have an account? Login */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button onClick={handleLogin} className="text-blue-500">
            Login
          </button>
        </p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SignupForm;
