// components/Orders.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../axios.config";
import Order from "../../types/Order.type";
import ListLoader from "../Loader/ListLoader";
import OrderItem from "../OrderItem";

interface OrdersProps {}
const Orders: React.FC<OrdersProps> = (props) => {
  const userId = localStorage.getItem("user");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        try {
          setLoader(true);
          const orders = (await axios.get(baseUrl + "/orders/" + userId)).data;
          setOrders(orders);
        } catch (e) {}
        setLoader(false);
      };
      fetch();
    }
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl text-primary mb-4">Orders</h2>
      {loader && <ListLoader />}
      {orders.map((order) => (
        <OrderItem order={order} />
      ))}
    </div>
  );
};

export default Orders;
