import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../../axios.config";
import Toast from "../Toast";
import SideImage from "../../assets/login-signup.png";
import { UserContext } from "../../App";

const SignupForm: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(baseUrl + "/login", {
        email_or_phone: emailOrPhone,
        password: password,
      });
      navigate("/QuickBizz");
      localStorage.setItem("user", res.data.user_id);
      userContext.setUserId(res.data.user_id);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="p-12 pl-0 flex gap-16">
      {/* <div className="bg-[#cce3e9] w-3/4"></div> */}
      <img src={SideImage} alt="side-image" className="w-[40%]" />
      {/* <div className="bg-gray-100 flex items-center justify-center h-screen"> */}
      <form className="bg-white p-8 px-16 rounded w-2/3">
        {error && (
          <Toast type="danger" message={error?.response?.data?.error} />
        )}
        <h2 className="text-2xl font-semibold text-gray-700">
          Login to QuickBizz
        </h2>
        <p className="mb-8">Enter the details below</p>

        {/* Name Input */}

        {/* Email/Phone Input */}
        <div className="mb-7">
          {emailOrPhone && (
            <label
              htmlFor="emailPhone"
              className="block text-sm font-medium text-gray-600"
            >
              Email or Phone number
            </label>
          )}
          <input
            type="text"
            id="emailPhone"
            name="emailPhone"
            placeholder="Email or Phone Number"
            className="mt-1 p-2 w-full border-b border-gray-700 focus:outline-none focus:border-primary"
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-7">
          {password && (
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
          )}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="mt-1 p-2 w-full border-b border-gray-700 focus:outline-none focus:border-primary"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Create Account Button */}
        <button
          type="button"
          className="bg-primary text-white p-2 rounded-sm w-full"
          onClick={handleSubmit}
        >
          Login
        </button>

        {/* Already have an account? Login */}
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="text-primary underline"
          >
            Sign up
          </button>
        </p>
      </form>
      {/* </div> */}
    </div>
  );
};

export default SignupForm;
