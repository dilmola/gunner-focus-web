import React, { createContext, useContext, useState, useEffect } from "react";
import fetchTeams from "../utils/getTeams";

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetchTeams();
        if (response && Array.isArray(response)) {
          const formattedData = formatData(response);
          localStorage.setItem("teamsData", JSON.stringify(formattedData));
          localStorage.setItem("teamsLastFetch", Date.now());
          setData(formattedData);
        } else {
          throw new Error("Data is not in expected format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    const checkLastFetchTime = () => {
      const lastFetch = parseInt(localStorage.getItem("teamsLastFetch"), 10);
      const fetchInterval = 12 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchTeamData();
      } else {
        const storedData = localStorage.getItem("teamsData");
        if (storedData) {
          setData(JSON.parse(storedData));
        }
        setLoading(false);
      }
    };

    checkLastFetchTime();
  }, []);

  const formatData = (team) => {
    return team.map((teamsPlayers) => {
      return {
        idPlayer: teamsPlayers?.id ?? 0,
        photo: teamsPlayers?.photo ?? 0,
        player: teamsPlayers?.name ?? 0,
        position: teamsPlayers?.position ?? 0,
      };
    });
  };

  return (
    <TeamContext.Provider value={{ data, setData, loading, error }}>
      {children}
    </TeamContext.Provider>
  );
};
