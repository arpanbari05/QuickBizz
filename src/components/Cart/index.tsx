// CartPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const cartItems = [
    { id: 1, name: "Sample Product 1", price: 49.99, quantity: 2 },
    { id: 2, name: "Sample Product 2", price: 29.99, quantity: 1 },
    // Add more items as needed
  ];

  const [couponCode, setCouponCode] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  const handleQuantityChange = (item: any, amount: number) => {
    // Update quantity logic
    // This is just a placeholder, you should update your state accordingly
    console.log(
      `Updating quantity for ${item.name} to ${item.quantity + amount}`
    );
  };

  const handleApplyCoupon = () => {
    // Apply coupon logic
    // This is just a placeholder, you should implement your coupon logic here
    console.log(`Applying coupon code: ${couponCode}`);
  };

  const handleProceedToCheckout = () => {
    // Proceed to checkout logic
    // This is just a placeholder, you should navigate to your checkout page or perform further actions
    console.log("Proceeding to checkout");
    navigate("/checkout");
  };

  const handleReturnToShop = () => {
    navigate("/");
  };

  // Calculate cart total
  const calculateCartTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setCartTotal(total);
  };

  // Calculate cart total on component mount and when cartItems change
  React.useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      {/* Cart Items Table */}
      <table className="w-full mb-6">
        <thead>
          <tr className="border-b">
            <td className="py-2">Product</td>
            <td className="py-2">Price</td>
            <td className="py-2">Quantity</td>
            <td className="py-2">Subtotal</td>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-4">{item.name}</td>
              <td className="py-4">${item.price.toFixed(2)}</td>
              <td className="py-4">
                <button
                  className="p-2 border rounded-l-md"
                  onClick={() => handleQuantityChange(item, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-4">{item.quantity}</span>
                <button
                  className="p-2 border rounded-r-md"
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </button>
              </td>
              <td className="py-4">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="flex justify-between mb-6">
        <button
          className="border border-black p-2 rounded-md"
          onClick={handleReturnToShop}
        >
          Return to Shop
        </button>
        <button className="border border-black p-2 rounded-md">
          Update Cart
        </button>
      </div>

      {/* Coupon Code and Cart Summary */}
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <label htmlFor="coupon" className="text-lg font-semibold mr-2">
            Apply Coupon Code:
          </label>
          <input
            type="text"
            id="coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            className="border border-black p-2 ml-2 rounded-md"
            onClick={handleApplyCoupon}
          >
            Apply
          </button>
        </div>

        {/* Cart Summary */}
        <div className="ml-4 flex flex-col gap-4 border p-4">
          <p className="text-lg font-semibold mb-1">Cart Total:</p>
          <p>Subtotal: ${cartTotal.toFixed(2)}</p>
          <p>Shipping Fee: $0.00</p>
          <p className="text-xl font-semibold">
            Total: ${(cartTotal + 0).toFixed(2)}
          </p>

          {/* Proceed to Checkout Button */}
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
