import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { baseUrl } from "../../axios.config";
import Toast from "../Toast";

const SignupForm: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(baseUrl + "/login", {
        email_or_phone: emailOrPhone,
        password: password,
      });
      navigate("/QuickBizz");
      localStorage.setItem("user", res.data.user_id);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="p-12 pl-0 flex gap-8">
      <div className="bg-gray-200 flex-grow"></div>
      {/* <div className="bg-gray-100 flex items-center justify-center h-screen"> */}

      <div className="bg-white p-8 rounded shadow-md w-1/3">
        {error && (
          <Toast type="danger" message={error?.response?.data?.error} />
        )}
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

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
            onChange={(e) => setEmailOrPhone(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Create Account Button */}
        <button
          className="bg-blue-500 text-white p-2 rounded-md w-full"
          onClick={handleSubmit}
        >
          Login
        </button>

        {/* Already have an account? Login */}
        <p className="text-sm text-gray-600 mt-4">
          <a href="#" className="text-blue-500">
            Forget password?
          </a>
        </p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SignupForm;
