import search from "../../../public/icons/search.png";

const Search = ({ query, setQuery }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mx-auto bg-romanceColor dark:bg-mirageColor rounded-lg borderSizePrimary overflow-hidden	">
      <div className="w-full">
        <div className="relative flex">
          <input
            type="text"
            className="flex-grow px-12 py-2 bg-transparent focus:outline-none h-fit text-lg	rounded-lg"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
          />
          <div className="absolute inset-y-0 right-0 p-3 flex items-center pointer-events-none bg-amaranthColor">
            <img src={search.src} alt="search" className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
