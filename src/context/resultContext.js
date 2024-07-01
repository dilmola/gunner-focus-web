import { createContext, useState, useEffect, useContext } from "react";

const ResultsDataContext = createContext();

export const ResultsDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("resultsData");
      return storedData ? JSON.parse(storedData) : [];
    } else {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resultsData", JSON.stringify(data));
    }
  }, [data]);
  return (
    <ResultsDataContext.Provider value={{ data, setData }}>
      {children}
    </ResultsDataContext.Provider>
  );
};

export const useData = () => useContext(ResultsDataContext);
