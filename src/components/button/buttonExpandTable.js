import React from "react";
import Less from "../../../public/icons/less.png";
import More from "../../../public/icons/more.png";

const ButtonExpandTable = ({ isExpanded, toggleExpand }) => {
  return (
    <button
      onClick={toggleExpand}
      className="mt-2 px-4 py-2 bg-[#E63946] rounded"
    >
      <img
        src={isExpanded ? Less.src : More.src}
        alt={isExpanded ? "Collapse Table" : "Expand Table"}
        className="h-1" // Optional: set image size
      />
    </button>
  );
};
export default ButtonExpandTable;
