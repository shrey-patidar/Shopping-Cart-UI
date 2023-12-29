import React from "react";
import { useState } from "react";
import OrderItemTile from "./OrderItemTile";

const OrderTile = ({ allOrders }) => {
  //   console.log(allOrders);
  //   allOrders.map((order) => {
  //     console.log(order.orderId);
  //     console.log(order.products);
  //   });
  return (
    <React.Fragment>
      {allOrders
        // .slice(0)
        .reverse()
        .map((order) => {
          return (
            <div className="order-tile-div" key={order.orderId}>
              <div className="order-id-div">Order Id : {order.orderId}</div>
              <div className="all-items-div">
                <OrderItemTile orderItemList={order.products} />
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default OrderTile;

// {allOrders.map((order) => {

//   })}
