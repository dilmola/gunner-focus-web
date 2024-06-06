"use client";

import Sort from "../../../public/icons/sort.png";
import React, { useState, useEffect, useRef } from "react";

const FilterButton = ({ setFilter }) => {
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

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-[#F2F2F2] rounded p-2 text-black font-semibold ml-2 flex border-[0.01rem] border-gray-300 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
        onClick={toggleDropdown}
      >
        <img src={Sort.src} alt="sort" className="h-4 px-1" />
        <div className="px-2 text-black uppercase">Filter</div>
      </button>
      {showDropdown && (
        <div className="absolute top-full left-0 w-max bg-white border border-gray-300 rounded shadow-lg ml-2">
          <div className="p-2">
            {[
              "By Win",
              "By Draw",
              "By Lost",
              "By Premier League",
              "By UEFA Champions League",
              "By FA Cup",
              "By Emirates Cup",
              "By Friendlies Clubs",
              "By League Cup",
            ].map((filterOption) => (
              <button
                key={filterOption}
                className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                onClick={() => handleFilterChange(filterOption)}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
