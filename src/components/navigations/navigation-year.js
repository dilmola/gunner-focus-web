const NavigationYear = ({ handleSeasonClick, seasonYear }) => {
  return (
    <nav className="flex flex-wrap justify-between">
      <div className="space-x-2 sm:space-x-4 text-sm font-bold">
        {["2022", "2023", "2024"].map((year) => (
          <button
            key={year}
            className={`px-2 sm:px-4 py-2 rounded-lg ${
              seasonYear === year
                ? "bg-amaranthColor text-romanceColor"
                : "dark:text-romanceOpa50Color dark:bg-romanceOpa01Color text-mirageOpa50Color bg-mirageOpa01Color"
            }`}
            onClick={() => handleSeasonClick(year)}
          >
            {year} / {parseInt(year) + 1}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationYear;
