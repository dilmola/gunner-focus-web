import React, { useState } from "react";
import SearchIcon from "../../../public/icons/search.png";

const Search = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow border px-4 py-3 rounded-l bg-[#F2F2F2] focus:outline-none border-gray-300 rounded-sm"
          placeholder="Enter your search term"
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Search;
