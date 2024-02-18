// CheckoutPage.tsx
import React, { useState } from "react";

const CheckoutPage: React.FC = () => {
  const cartItems = [
    { id: 1, name: "Sample Product 1", price: 49.99, quantity: 2 },
    { id: 2, name: "Sample Product 2", price: 29.99, quantity: 1 },
    // Add more items as needed
  ];

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    companyName: "",
    streetAddress: "",
    apartmentFloor: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [paymentMode, setPaymentMode] = useState("bank");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePaymentModeChange = (mode: string) => {
    setPaymentMode(mode);
  };

  const handlePlaceOrder = () => {
    // Place order logic
    // This is just a placeholder, you should implement your order placement logic here
    console.log("Placing order:", { billingDetails, paymentMode, cartItems });
  };

  // Calculate cart total
  const calculateCartTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="flex p-8">
      {/* Billing Details Form */}
      <div className="flex-1 mr-8">
        <h1 className="text-3xl font-semibold mb-6">Billing Details</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={billingDetails.name}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-sm font-semibold mb-2"
            >
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={billingDetails.companyName}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="streetAddress"
              className="block text-sm font-semibold mb-2"
            >
              Street Address:
            </label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={billingDetails.streetAddress}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="apartmentFloor"
              className="block text-sm font-semibold mb-2"
            >
              Apartment Floor:
            </label>
            <input
              type="text"
              id="apartmentFloor"
              name="apartmentFloor"
              value={billingDetails.apartmentFloor}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="townCity"
              className="block text-sm font-semibold mb-2"
            >
              Town/City:
            </label>
            <input
              type="text"
              id="townCity"
              name="townCity"
              value={billingDetails.townCity}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold mb-2"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={billingDetails.phoneNumber}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="emailAddress"
              className="block text-sm font-semibold mb-2"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={billingDetails.emailAddress}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          {/* Include other billing details fields similarly */}
          {/* ... */}
        </form>
      </div>

      {/* Cart Summary */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">Cart Summary</h1>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <td className="py-2">Product</td>
              <td className="py-2">Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4">{item.name}</td>
                <td className="py-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-4">
          <p className="text-lg font-semibold">
            Cart Total: ${calculateCartTotal()}
          </p>
        </div>

        {/* Payment Mode Selection */}
        <div className="mb-4">
          <p className="text-lg font-semibold">Payment Mode:</p>
          <label className="flex items-center">
            <input
              type="radio"
              value="bank"
              checked={paymentMode === "bank"}
              onChange={() => handlePaymentModeChange("bank")}
              className="mr-2"
            />
            Bank Transfer
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="cod"
              checked={paymentMode === "cod"}
              onChange={() => handlePaymentModeChange("cod")}
              className="mr-2"
            />
            Cash on Delivery
          </label>

          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
