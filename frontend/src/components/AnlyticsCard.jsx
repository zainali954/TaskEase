import React from "react";
import PropTypes from "prop-types";

const AnlyticsCard = ({
  backgroundColor,
  icon: Icon,
  mainColor,
  title,
  quantity,
}) => {
  return (
    <div
      style={{
        backgroundColor,
        borderColor: mainColor,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
      className="relative overflow-hidden rounded-2xl p-4"
    >
      {/* Icon Badge */}
      <div
        style={{ backgroundColor: mainColor }}
        className="p-2 rounded-lg w-fit mb-4"
      >
        {Icon && <Icon size={24} color="#000000" variant="stroke" />}
      </div>

      {/* Title */}
      <h4 className="text-lg font-medium mb-2 relative z-10">{title}</h4>

      {/* Quantity */}
      <h5 className="text-5xl font-bold relative z-10">{quantity}</h5>

      {/* Large Icon */}
      {Icon && (
        <Icon
          className="absolute -right-3 -bottom-3  pointer-events-none"
          size={120}
          color={mainColor}
          variant="stroke"
        />
      )}
    </div>
  );
};


export default AnlyticsCard;
