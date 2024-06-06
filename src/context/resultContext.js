import { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("resultsData");
      return storedData ? JSON.parse(storedData) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    // Save data to local storage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("resultsData", JSON.stringify(data));
    }
  }, [data]);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
