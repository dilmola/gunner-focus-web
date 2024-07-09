import { createContext, useState, useEffect, useContext } from "react";
import fetchUpcoming from "@/utils/getFixtures";

const ResultsDataContext = createContext();

export const ResultsDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResultsData = async () => {
    try {
      const response = await fetchUpcoming();
      if (Array.isArray(response)) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const recentResults = response.filter((item) => {
          const fixtureDate = new Date(item?.fixture?.date);
          return fixtureDate <= today;
        });

        recentResults.sort((a, b) => {
          const aDate = new Date(a?.fixture?.date);
          const bDate = new Date(b?.fixture?.date);
          return bDate - aDate;
        });

        const matchData = recentResults.map((item) => ({
          awayTeam: item?.teams?.away?.name || "N/A",
          homeTeam: item?.teams?.home?.name || "N/A",
          awayLogo: item?.teams?.away?.logo || "",
          homeLogo: item?.teams?.home?.logo || "",
          awayGoals: item?.goals?.away || 0,
          homeGoals: item?.goals?.home || 0,
          fixtureDate: item?.fixture?.date,
          statusMatch: item?.fixture?.status?.long,
          nameOfMatch: item?.league?.name,

          teamHomeResult: item?.teams?.home?.winner,
          teamAwayResult: item?.teams?.away?.winner,
        }));

        setData(matchData);
        localStorage.setItem("resultsData", JSON.stringify(matchData));
        localStorage.setItem("resultsLastFetch", Date.now().toString());
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLastFetchTime = () => {
      const lastFetch = parseInt(localStorage.getItem("resultsLastFetch"), 10);
      const fetchInterval = 12 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchResultsData();
      } else {
        const storedData = localStorage.getItem("resultsData");
        if (storedData) {
          setData(JSON.parse(storedData));
        }
        setLoading(false);
      }
    };

    checkLastFetchTime();
  }, []);

  return (
    <ResultsDataContext.Provider value={{ data, loading, error }}>
      {children}
    </ResultsDataContext.Provider>
  );
};

export const useData = () => useContext(ResultsDataContext);
