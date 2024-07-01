"use client";

import { UpcomingsDataProvider } from "./upcomingContext";
import { ResultsDataProvider } from "./resultContext";
import { PlayerProvider } from "./playerContext";
import { TeamProvider } from "./teamContext";
import { ThemeProvider } from "./themeContext";

export const CombinedDataProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <TeamProvider>
        <PlayerProvider>
          <UpcomingsDataProvider>
            <ResultsDataProvider>{children}</ResultsDataProvider>
          </UpcomingsDataProvider>
        </PlayerProvider>
      </TeamProvider>
    </ThemeProvider>
  );
};
