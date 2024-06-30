"use client";

import { UpcomingsDataProvider } from "./upcomingContext";
import { ResultsDataProvider } from "./resultContext";
import { PlayerProvider } from "./playerContext";
import { TeamProvider } from "./teamContext";

export const CombinedDataProvider = ({ children }) => {
  return (
    <TeamProvider>
      <PlayerProvider>
        <UpcomingsDataProvider>
          <ResultsDataProvider>{children}</ResultsDataProvider>
        </UpcomingsDataProvider>
      </PlayerProvider>
    </TeamProvider>
  );
};
