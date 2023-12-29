import React from "react";

const OrderItemTile = ({ orderItemList }) => {
  return (
    <React.Fragment>
      {orderItemList.map((orderItem) => {
        return (
          <div className="orderitem-tile" key={orderItem.orderItemId}>
            <div className="item-img">
              <img src={orderItem.product.image} alt="Item-Image" />
            </div>
            <div className="order-item-info">
              <div className="order-item-id">
                Item Id: {orderItem.orderItemId}
              </div>
              <div className="order-item-name">{orderItem.product.name}</div>
              <div className="order-item-quantity">
                Qty: {orderItem.quantity}
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default OrderItemTile;
