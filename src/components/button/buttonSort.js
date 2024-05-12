import Sort from "../../../public/icons/sort.png";
import React, { useState, useEffect, useRef } from "react";

const SortButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-[#F2F2F2] rounded p-3 text-black font-semibold ml-2 flex border-[0.01rem] border-gray-300 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
        onClick={toggleDropdown}
      >
        <img src={Sort.src} alt="sort" className="h-4 px-1" />
        <div className="px-2 text-black">SORT</div>
      </button>
      {showDropdown && (
        <div className="absolute top-full left-0 w-40 bg-white border border-gray-300 rounded shadow-lg ml-2">
          <div className="p-2">
            <div
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={toggleDropdown}
            >
              By Team
            </div>
            <div
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={toggleDropdown}
            >
              By Team
            </div>
            <div
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={toggleDropdown}
            >
              By Team
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
