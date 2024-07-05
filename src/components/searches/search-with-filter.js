import { useState, useEffect } from "react";

const SearchWithFilter = ({ query, setQuery }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const [placeholder, setPlaceholder] = useState("");
  const placeholderText = "Enter your search here...";
  const animationSpeed = 150;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholderText.slice(0, index++));

      if (index > placeholderText.length) {
        clearInterval(interval);
      }
    }, animationSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex">
      <input
        type="text"
        className="flex-grow px-4 sm:px-6 py-2 bg-transparent focus:outline-none h-fit text-lg	rounded-lg"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchWithFilter;
