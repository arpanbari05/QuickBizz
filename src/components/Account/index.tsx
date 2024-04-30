import React from "react";
import { useContext } from "react";
import {
  Outlet,
  Link,
  Routes,
  Route,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "../../App";
import NotFound from "../404";
import Chat from "../Chat";
import ProductForm from "../ProductForm";
import SellExistingProduct from "../SellExistingProduct";
import MyAccount from "./MyAccount";
import Orders from "./Orders";
import Wishlist from "./Wishlist";

const Account = () => {
  const isProfileActive = useMatch("/account/");
  const isOrdersActive = useMatch("/account/orders");
  const isWishlistActive = useMatch("/account/wishlist");
  const isSellProduct = useMatch("/account/sell-product");
  const isSellExistingProduct = useMatch("/account/sell-existing-product");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="account-page flex gap-24 px-16 py-10">
      <div className="sidebar flex flex-col gap-4">
        <h3 className="text-xl font-semibold w-max">Manage My Account</h3>
        <div className="flex flex-col gap-3 ml-7 text-gray-600">
          <Link
            to="/account/"
            className={isProfileActive ? "text-primary" : ""}
          >
            Profile
          </Link>
          <Link
            to="/account/orders"
            className={isOrdersActive ? "text-primary" : ""}
          >
            Orders
          </Link>
          <Link
            to="/account/wishlist"
            className={isWishlistActive ? "text-primary" : ""}
          >
            Wishlist
          </Link>
        </div>

        <h3 className="text-xl font-semibold w-max">Manage My Business</h3>
        <div className="flex flex-col gap-3 ml-7 text-gray-600 w-max">
          <Link
            to="/account/sell-product"
            className={isSellProduct ? "text-primary" : ""}
          >
            Create and Sell Product
          </Link>
          <Link
            to="/account/sell-existing-product"
            className={isSellExistingProduct ? "text-primary" : ""}
          >
            Sell Existing Product
          </Link>
          <Link
            to="/account/messages"
            className={isSellExistingProduct ? "text-primary" : ""}
          >
            Messages
          </Link>
        </div>

        <button
          className="bg-primary px-5 py-2 text-white rounded-sm hover:opacity-90 active:opacity-70 mt-16"
          onClick={() => {
            localStorage.removeItem("user");
            userContext.setUserId(null);
            navigate("/QuickBizz");
          }}
        >
          Log out
        </button>
      </div>
      <div className="content w-full p-20 py-10 shadow-lg">
        <Routes>
          {!userContext.userId && <Route path="*" element={<NotFound />} />}
          {userContext.userId && (
            <React.Fragment>
              <Route path="/" element={<MyAccount />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="sell-product" element={<ProductForm />} />
              <Route
                path="sell-existing-product"
                element={<SellExistingProduct />}
              />
              <Route
                path="messages"
                element={<Chat userId={userContext.userId} />}
              />
            </React.Fragment>
          )}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
