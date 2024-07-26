"use client";
import React, { useState } from "react";

const Card = ({
  children,
  title,
  bgColor,
  textColor,
  hoverColor,
  hoverCondition,
  handleClick,
  handleClickCondition,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (handleClickCondition) {
      handleClick();
    }
  };

  const handleMouseEnter = () => {
    if (hoverCondition) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverCondition) {
      setIsHovered(false);
    }
  };

  const hoverStyles = isHovered
    ? { backgroundColor: hoverColor, cursor: "pointer" }
    : {};

  const seeMoreStyles = {
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.5s ease",
  };

  return (
    <>
      <div
        className="rounded-lg h-[12.5rem] lg:h-[14.5rem] overflow-y-auto borderSizePrimary shadow-card-shadow"
        style={{ color: textColor, backgroundColor: bgColor, ...hoverStyles }}
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-4 py-4 h-[10.5rem] lg:h-[12.5rem]">{children}</div>
        <div className="absolute px-4 font-semibold" style={seeMoreStyles}>
          <span>See more</span>
        </div>
      </div>
    </>
  );
};

export default Card;
