"use client";
import React, { useState } from "react";

const Card = ({
  children,
  
  title,
  bgColor,
  textColor,
  hoverColor,
  handleClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
        className="rounded-lg h-[14.5rem] overflow-y-auto"
        style={{ color: textColor, backgroundColor: bgColor, ...hoverStyles }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-4 py-4 h-[12.5rem]">
          <div className="flex flex-col items-center">
            <div className="font-bold uppercase mb-8">{title}</div>
          </div>
          {children}
        </div>
        <div className="absolute px-4 font-semibold" style={seeMoreStyles}>
          <span>See more</span>
        </div>
      </div>
    </>
  );
};

export default Card;
