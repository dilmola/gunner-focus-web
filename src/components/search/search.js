import search from "../../../public/icons/search.png";

const Search = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="relative flex">
        <input
          type="text"
          className="flex-grow border px-12 py-2 bg-[#fafafa] focus:outline-none border-gray-300 rounded-lg"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src={search.src} alt="search" className="h-4" />
        </div>
      </div>
    </div>
  );
};

export default Search;
