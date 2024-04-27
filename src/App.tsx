import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/404";
import ProductPage from "./components/Product";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/Checkout";
import About from "./components/About";
import CategoryProducts from "./components/CategoryProducts";
import WishlistedProducts from "./components/Account/Wishlist";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import Landing from "./components/Landing/Landing";
import SearchPanel from "./components/SearchPanel";
import Account from "./components/Account";
import Contact from "./components/Contact";

function App() {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <PageWrapper>
            <Signup />
          </PageWrapper>
        }
      />
      <Route
        path="/login"
        element={
          <PageWrapper>
            <Login />
          </PageWrapper>
        }
      />
      <Route
        path="/"
        element={
          <PageWrapper>
            <Landing />
          </PageWrapper>
        }
      />
      <Route
        path="/QuickBizz"
        element={
          <PageWrapper>
            <Landing />
          </PageWrapper>
        }
      />
      <Route
        path="/product/:id"
        element={
          <PageWrapper>
            <ProductPage />
          </PageWrapper>
        }
      />
      <Route
        path="/cart"
        element={
          <PageWrapper>
            <CartPage />
          </PageWrapper>
        }
      />
      <Route
        path="/checkout"
        element={
          <PageWrapper>
            <CheckoutPage />
          </PageWrapper>
        }
      />
      <Route
        path="/about"
        element={
          <PageWrapper>
            <About />
          </PageWrapper>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PageWrapper>
            <WishlistedProducts />
          </PageWrapper>
        }
      />
      <Route
        path="/category/:id"
        element={
          <PageWrapper>
            <CategoryProducts />
          </PageWrapper>
        }
      />
      <Route
        path="/search"
        element={
          <PageWrapper hideNavbar>
            <SearchPanel />
          </PageWrapper>
        }
      />
      <Route
        path="/account/*"
        element={
          <PageWrapper>
            <Account />
          </PageWrapper>
        }
      />
      <Route
        path="/contact"
        element={
          <PageWrapper>
            <Contact />
          </PageWrapper>
        }
      />
      {/* If user is not logged in, redirect to login page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
