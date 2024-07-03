"use client";

import { useState, useEffect, useRef } from "react";
import SortIcon from "../../../public/icons/sort-icon.png";
import SortDarkIcon from "../../../public/icons/sort-dark-icon.png";
import { useTheme } from "../../context/themeContext";

const FilterButton = ({ setFilter, nameMatch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { theme } = useTheme();

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
    setFilter(filter.data); // Assuming filter is an object with a 'data' property
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="bg-romanceColor dark:bg-mirageColor py-2 font-semibold hover:bg-romanceColor focus:bg-romanceColor dark:hover:bg-mirageColor dark:focus:bg-mirageColor focus:outline-none "
        onClick={toggleDropdown}
      >
        <img
          src={theme === "light" ? SortIcon.src : SortDarkIcon.src}
          alt="SortIcon"
          className="h-3"
        />
      </button>
      {showDropdown && (
        <div className="absolute top-full right-0 xl:left-0 w-max bg-romanceColor dark:bg-mirageColor rounded shadow-lg">
          <div className="p-2">
            {nameMatch.map((filterOption) => (
              <button
                key={filterOption.data}
                className={`block px-4 py-2 text-left w-full ${
                  filterOption.data === "Clear" ? "font-bold" : ""
                } bg-romanceColor dark:bg-mirageColor hover:bg-whitesmokeColor focus:bg-whitesmokeColor dark:hover:bg-montanaColor dark:focus:bg-montanaColor`}
                onClick={() => handleFilterChange(filterOption)}
              >
                {filterOption.data}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
