import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface OrderSuccessProps {
  placingOrder?: boolean;
  orderSucceded?: boolean;
  onClose: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({
  orderSucceded,
  placingOrder,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the component is mounted
    setMounted(true);

    const timeout = setTimeout(() => {
      onClose(); // Close the component after some time
    }, 5000); // Adjust the time as needed

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-primary z-50 ${
        mounted ? "animate-fade-in" : ""
      }`}
    >
      <div className="text-center animate-bounce">
        {/* Add your celebration animation styles here */}
        <div className="relative">
          <h1 className="text-4xl font-bold text-white mb-4">
            {orderSucceded
              ? "Order placed successfully"
              : placingOrder
              ? "Placing your order"
              : "Could'nt place your order"}
          </h1>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className={`absolute w-2 h-2 rounded-full`}
                style={{
                  backgroundColor: getRandomColor(),
                  animation: `confetti-${index} 3s ease-out infinite`,
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) rotate(${
                    Math.random() * 360
                  }deg) translate(${Math.random() * 200 - 100}px, ${
                    Math.random() * 200 - 100
                  }px)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {orderSucceded && (
        <div className="grid gap-40 text-center">
          <p className="text-lg text-white animate-bounce">
            Thank you for your order.
          </p>
          <Link to="/account/orders" className="text-white underline">
            View your orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;

// Function to generate random color
const getRandomColor = () => {
  const colors = [
    "#f44336",
    "#9c27b0",
    "#3f51b5",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#ffeb3b",
    "#ff9800",
    "#795548",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
