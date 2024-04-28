import { Outlet, Link, Routes, Route, useMatch } from "react-router-dom";
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
        </div>
      </div>
      <div className="content w-full p-20 py-10 shadow-lg">
        <Routes>
          <Route path="/" element={<MyAccount />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="sell-product" element={<ProductForm />} />
          <Route
            path="sell-existing-product"
            element={<SellExistingProduct />}
          />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
