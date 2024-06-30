import search from "../../../public/icons/search.png";

const Search = ({ query, setQuery }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        className="flex-grow px-12 py-2 bg-transparent focus:outline-none h-fit text-lg	rounded-lg"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
      <div className="absolute inset-y-0 right-0 p-3 flex items-center pointer-events-none bg-[#E63946]">
        <img src={search.src} alt="search" className="h-4" />
      </div>
    </div>
  );
};

export default Search;
