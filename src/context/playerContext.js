import React, { createContext, useContext, useState, useCallback } from "react";
import fetchPlayer from "../utils/getPlayer";

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlayerData = useCallback(async (playerId, seasonYear = "2024") => {
    try {
      setLoading(true);
      const player = await fetchPlayer(playerId, seasonYear);
      localStorage.setItem(
        `playerData_${playerId}_${seasonYear}`,
        JSON.stringify(player)
      );
      localStorage.setItem(
        `playersLastFetch_${playerId}_${seasonYear}`,
        Date.now().toString()
      );
      setPlayerData(player);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const checkLastFetchTime = useCallback(
    (playerId, seasonYear = "2024") => {
      const lastFetch = parseInt(
        localStorage.getItem(`playersLastFetch_${playerId}_${seasonYear}`),
        10
      );
      const fetchInterval = 12 * 60 * 60 * 1000; // 12 hours
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchPlayerData(playerId, seasonYear);
      } else {
        const storedData = localStorage.getItem(
          `playerData_${playerId}_${seasonYear}`
        );
        if (storedData) {
          setPlayerData(JSON.parse(storedData));
        }
      }
    },
    [fetchPlayerData]
  );

  return (
    <PlayerContext.Provider
      value={{
        playerData,
        loading,
        error,
        checkLastFetchTime,
        setPlayerData,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
