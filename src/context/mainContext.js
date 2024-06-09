import { UpcomingsDataProvider } from "./upcomingContext";
import { ResultsDataProvider } from "./resultContext";

export const CombinedDataProvider = ({ children }) => {
  return (
    <UpcomingsDataProvider>
      <ResultsDataProvider>
        {children}
      </ResultsDataProvider>
    </UpcomingsDataProvider>
  );
};