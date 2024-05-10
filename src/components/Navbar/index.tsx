// Navbar.tsx

import React, { useContext } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useUser from "../../customHooks/useUser";
import { UserContext } from "../../App";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const { user } = useUser(userId);

  const handleSignup = () => {
    navigate("/signup", { replace: true });
  };

  const handleHome = () => {
    navigate("/QuickBizz", { replace: true });
  };

  const handleContact = () => {
    navigate("/contact", { replace: true });
  };

  const handleAbout = () => {
    navigate("/about", { replace: true });
  };

  const handleShowSearchPanel = () => {
    navigate("/search");
  };

  let routes = [
    {
      title: "Home",
      onClick: handleHome,
    },
    {
      title: "About",
      onClick: handleAbout,
    },
    {
      title: "Contact",
      onClick: handleContact,
    },
  ];

  const userRoutes: any = [];

  const nonUserRoutes = [{ title: "Signup", onClick: handleSignup }];

  if (userId) {
    routes = routes.concat(userRoutes);
  } else {
    routes = routes.concat(nonUserRoutes);
  }

  return (
    <div>
      <div className="discount bg-black text-white text-center p-7">
        <button
          className="ml-5 underline mr-2"
          onClick={() => {
            window.scrollBy({ top: 550, behavior: "smooth" });
          }}
        >
          Skip
        </button>
        <p className="d-inline-block mb-0 text-sm">to main content</p>
      </div>

      <nav className="navbar">
        <div className="logo">QuickBizz</div>
        <div className="nav-buttons">
          {routes.map((route) => (
            <button className="nav-button" onClick={route.onClick}>
              {route.title}
            </button>
          ))}
        </div>
        <button
          className="bg-gray-200 text-gray-700 py-2 w-80 px-5 text-sm rounded-full hover:outline-1 hover:outline-gray-300 active:opacity-70"
          onClick={handleShowSearchPanel}
        >
          Search products
        </button>
        {user && userId && (
          <button
            className="flex gap-3 items-center ml-7 p-1 hover:bg-gray-100 active:opacity-70 rounded-lg"
            onClick={() => navigate("/account", { replace: true })}
          >
            <div className="rounded-full w-10 h-10 bg-gray-200 text-gray-600 flex items-center justify-center">
              <FaUser size={20} />
            </div>
            <div className="text-md">{user.first_name}</div>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
