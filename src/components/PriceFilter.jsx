import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const PriceFilter = ({ price, setPrice }) => {
  const rangeSelector = (event, newValue) => {
    setPrice(newValue);
    console.log(newValue);
  };

  return (
    <React.Fragment>
      <label>Filter By Price:</label>

      <Slider
        value={price}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
        min={0}
        max={99000}
      />
    </React.Fragment>
  );
};

export default PriceFilter;
