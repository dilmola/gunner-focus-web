/*import Card from "../card";

const ResultsCard = () => {
  return (
    <Card
      title="Results Match:"
      bgColor="#F6F6F6"
      textColor="#000000"
      teams={["Arsenal", "Chelsea"]}
      scores={[
        [2, 2],
        [1, 3],
      ]}
    />
  );
};

export default ResultsCard;*/
"use client";
import React, { useEffect, useState } from "react";
import Card from "../card";
import fetchUpcoming from "../../../app/utils/getFixtures";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ResultsCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const response = await fetchUpcoming(); // Fetching data
        if (Array.isArray(response)) {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Start of today

          // Filter matches with dates before or on today
          const recentResults = response.filter((item) => {
            const fixtureDate = new Date(item?.fixture?.date);
            return fixtureDate <= today; // Include only events today or earlier
          });

          // Sort by date in descending order to get the most recent first
          recentResults.sort((a, b) => {
            const aDate = new Date(a?.fixture?.date);
            const bDate = new Date(b?.fixture?.date);
            return bDate - aDate; // Sort in descending order
          });

          // Get the first three most recent matches
          const topResults = recentResults.slice(0, 2); // Slice the first three results
          const matchData = topResults.map((item) => ({
            awayTeam: item?.teams?.away?.name || "N/A",
            homeTeam: item?.teams?.home?.name || "N/A",
            awayLogo: item?.teams?.away?.logo || "",
            homeLogo: item?.teams?.home?.logo || "",
            awayGoals: item?.goals?.away || 0,
            homeGoals: item?.goals?.home || 0,
            fixtureDate: item?.fixture?.date,
          }));

          setData(matchData); // Store the data
          localStorage.setItem("resultsData", JSON.stringify(matchData));
          localStorage.setItem("resultsLastFetch", Date.now().toString());
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    const checkLastFetchTime = () => {
      const lastFetch = parseInt(
        localStorage.getItem("resultsLastFetch"),
        10
      );
      const fetchInterval = 12 * 60 * 60 * 1000; // 12 hours
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchResultsData(); // Fetch if last fetch was too long ago
      } else {
        const storedData = localStorage.getItem("resultsData");
        if (storedData) {
          setData(JSON.parse(storedData)); // Load existing data from local storage
        }
        setLoading(false); // Data is loaded, set loading to false
      }
    };

    checkLastFetchTime(); // Check if we need to fetch new data when the component is mounted
  }, []); // Ensure it runs once when the component is mounted

  if (loading) {
    return (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
        <Skeleton height={228} />
      </SkeletonTheme>
    );
  }

  if (error) {
    return (
      <div>
        <h3 className="flex items-center text-center uppercase font-semibold">
          Error
        </h3>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  // Pass the match data to the Card component
  return (
    <Card
      title="Match Results"
      bgColor="#F6F6F6"
      textColor="#000000"
      MatchResultArray={data} // Pass the array of match results
    />
  );
};

export default ResultsCard;
