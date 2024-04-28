// components/Orders.js

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { baseUrl } from "../../axios.config";
import Order from "../../types/Order.type";
import ListLoader from "../Loader/ListLoader";
import OrderItem from "../OrderItem";

interface OrdersProps {}
const Orders: React.FC<OrdersProps> = (props) => {
  const { userId } = useContext(UserContext);
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
      {orders.length > 0 && orders.map((order) => <OrderItem order={order} />)}
      {orders.length === 0 && <h2 className="text-xl">No orders yet</h2>}
    </div>
  );
};

export default Orders;
