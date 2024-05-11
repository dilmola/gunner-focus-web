import React from "react";

const ButtonExpandTable = ({ isExpanded, toggleExpand }) => {
  return (
    <button
      onClick={toggleExpand}
      className="mt-2 px-4 py-2 bg-[#E63946] rounded text-white font-semibold"
    >
      {isExpanded ? "Show Less" : "Show More"}
    </button>
  );
};
export default ButtonExpandTable;
