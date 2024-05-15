const Search = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="relative flex">
        <input
          type="text"
          className="flex-grow border px-12 py-2 rounded-l bg-[#F2F2F2] focus:outline-none border-gray-300 rounded-sm"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4a7 7 0 017 7 7 7 0 01-1.293 4.293l5.414 5.414a1 1 0 01-1.414 1.414l-5.414-5.414A7 7 0 1111 4zm0 2a5 5 0 100 10 5 5 0 000-10z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Search;
