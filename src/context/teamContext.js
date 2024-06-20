// teamContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";

const TeamsContext = createContext();

export const useTeams = () => useContext(TeamsContext);

export const TeamsProvider = ({ children }) => {
  const { id } = useParams();

  const [playerData, setPlayerData] = useState(null);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem(`playerData_${id}`);
        if (storedData) {
          setPlayerData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchData();
  }, [id]); // Trigger fetch whenever id changes

  return (
    <TeamsContext.Provider value={{ playerData, setPlayerData }}>
      {children}
    </TeamsContext.Provider>
  );
};

