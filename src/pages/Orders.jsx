import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import OrderItemTile from "../components/OrderItemTile";
import OrderTile from "../components/OrderTile";
import "../styles/Orders.css";

const Orders = () => {
  const myState = useSelector((state) => state.updateUser);
  const ALL_ORDERS_URL = `/order/${myState}/getOrders`;
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const orderHistory = () => {
      axios
        .get(ALL_ORDERS_URL, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          // console.log(res.data);
          setAllOrders(res.data);
          // console.log(res.data);
        });
    };
    orderHistory();
  }, []);

  return (
    <div className="orderpage">
      <OrderTile allOrders={allOrders} />
    </div>
  );
};

export default Orders;
