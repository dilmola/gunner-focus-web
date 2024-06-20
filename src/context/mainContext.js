"use client";

import { UpcomingsDataProvider } from "./upcomingContext";
import { ResultsDataProvider } from "./resultContext";
import { TeamsProvider } from "./teamContext";

export const CombinedDataProvider = ({ children }) => {
  return (
    <TeamsProvider>
      <UpcomingsDataProvider>
        <ResultsDataProvider>{children}</ResultsDataProvider>
      </UpcomingsDataProvider>
    </TeamsProvider>
  );
};
