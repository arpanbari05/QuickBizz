import React from "react";
import { BsClock } from "react-icons/bs";
import Order from "../../types/Order.type";
import ImageWithFallback from "../ImageWithFallback";

interface Props {
  order: Order;
}

const OrderItem: React.FC<Props> = ({ order }) => {
  const {
    cart_items,
    total_price,
    order_date,
    status,
    billing_details,
    payment_mode,
  } = order;

  const fallbackImage =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <div className="p-4 border-b mb-5">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600 text-sm">Order ID: {order._id}</p>
          <p className="text-gray-600 text-sm">
            Order Date: {new Date(order_date).toLocaleDateString()}
          </p>
        </div>
        <div
          className={`flex items-center gap-1 ${
            order.status !== "delivered" ? "text-yellow-600" : "text-green-600"
          }`}
        >
          <BsClock size={15} />
          <p>{status !== "delivered" ? "Order in progress" : "Delivered"}</p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-semibold">Items Ordered</h4>
        {cart_items.map((item) => (
          <div key={item._id} className="flex items-center mb-2">
            <ImageWithFallback
              className="w-12 h-12 object-cover mr-4"
              src={item.image}
              alt={item.name}
              fallbackSrc={fallbackImage}
            />
            <div>
              <p className="text-gray-800">{item.name}</p>
              <p className="text-gray-600 font-bold">
                ${item.price.toFixed(2)}
              </p>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-semibold">Order Summary</h4>
        <p className="text-gray-600 text-md">
          Total Price:{" "}
          <span className="text-primary font-bold">
            ${total_price.toFixed(2)}
          </span>
        </p>
        <p className="text-gray-600">
          Payment Mode:{" "}
          <span className="uppercase font-bold">{payment_mode}</span>
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold">Billing Details</h4>
        <p className="text-gray-600">{billing_details.name}</p>
        <p className="text-gray-600">{billing_details.emailAddress}</p>
        <p className="text-gray-600">
          Address: {billing_details.streetAddress}, {billing_details.townCity}
        </p>
        <p className="text-gray-600">
          Phone: {billing_details.phoneNumber || "NA"}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
