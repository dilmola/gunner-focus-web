import search from "../../../public/icons/search/search.png";

const SearchWithList = ({
  query,
  setQuery,
  filteredData,
  handlePlayerClick,
  heightViewportValue,
}) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const maxHeightClass =
    heightViewportValue === "max-h-screen" ? "max-h-screen" : "max-h-full";

  return (
    <>
      <div className="flex justify-between items-center mx-auto bg-romanceColor dark:bg-mirageColor rounded-lg borderSizePrimary overflow-hidden">
        <div className="w-full">
          <div className="relative flex">
            <input
              type="text"
              className="flex-grow px-4 sm:px-12 py-2 bg-transparent focus:outline-none h-fit text-lg rounded-lg"
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
      {query ? (
        filteredData.length > 0 ? (
          <ul
            className={`bg-whitesmokeColor dark:bg-codgreyColor w-full absolute z-20 p-3 shadow-md rounded-md mt-2 overflow-y-auto ${maxHeightClass}`}
          >
            {filteredData.map((player) => (
              <li
                key={player.idPlayer}
                className="mb-2 cursor-pointer dark:hover:bg-mirageOpa50Color hover:bg-romanceOpa50Color"
                onClick={() => handlePlayerClick(player)}
              >
                <div className="flex items-center">
                  {player.photo && (
                    <img
                      src={player.photo}
                      alt={player.player}
                      className="w-10 h-10 rounded-md mr-4"
                    />
                  )}
                  <span className="font-semibold">{player.player}</span>
                  <span className="ml-2 text-gray-600">
                    ({player.position})
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-whitesmokeColor dark:bg-codgreyColor w-full absolute z-20 p-3 shadow-md rounded-md mt-2 text-center">
            No results found
          </div>
        )
      ) : null}
    </>
  );
};

export default SearchWithList;
