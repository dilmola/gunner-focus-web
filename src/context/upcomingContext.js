import { createContext, useState, useEffect, useContext } from "react";

const UpcomingsDataContext = createContext();

export const UpcomingsDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("upcomingsData");
      return storedData ? JSON.parse(storedData) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("upcomingsData", JSON.stringify(data));
    }
  }, [data]);
  return (
    <UpcomingsDataContext.Provider value={{ data, setData }}>
      {children}
    </UpcomingsDataContext.Provider>
  );
};

export const useData = () => useContext(UpcomingsDataContext);