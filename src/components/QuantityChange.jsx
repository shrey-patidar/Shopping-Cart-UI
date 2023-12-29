import React from "react";

const QuantityChange = ({ q }) => {
  return (
    <React.Fragment>
      <button type="button" onClick={dec}>
        -
      </button>
      <input type="text" value={item.quantity} onChange={changequantity} />
      <button type="button" onClick={inc}>
        +
      </button>
    </React.Fragment>
  );
};

export default QuantityChange;
