"use client";
import React, { useEffect, useState } from "react";
import Card from "../card";
import fetchUpcoming from "../../../utils/getFixtures";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { useData } from "../../../context/resultContext";
import { useTheme } from "../../../context/themeContext";

const ResultsCard = ({}) => {
  console.log("execute of cardresult");
  const { data, setData } = useData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme(); // Get current theme from the context

  const router = useRouter();

  const handleClick = () => {
    router.push("/matches");
  };

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const response = await fetchUpcoming();
        if (Array.isArray(response)) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const recentResults = response.filter((item) => {
            const fixtureDate = new Date(item?.fixture?.date);
            return fixtureDate <= today;
          });

          recentResults.sort((a, b) => {
            const aDate = new Date(a?.fixture?.date);
            const bDate = new Date(b?.fixture?.date);
            return bDate - aDate;
          });

          const matchData = recentResults.map((item) => ({
            awayTeam: item?.teams?.away?.name || "N/A",
            homeTeam: item?.teams?.home?.name || "N/A",
            awayLogo: item?.teams?.away?.logo || "",
            homeLogo: item?.teams?.home?.logo || "",
            awayGoals: item?.goals?.away || 0,
            homeGoals: item?.goals?.home || 0,
            fixtureDate: item?.fixture?.date,
            statusMatch: item?.fixture?.status?.long,
            nameOfMatch: item?.league?.name,

            teamHomeResult: item?.teams?.home?.winner,
            teamAwayResult: item?.teams?.away?.winner,
          }));

          setData(matchData);
          localStorage.setItem("resultsData", JSON.stringify(matchData));
          localStorage.setItem("resultsLastFetch", Date.now().toString());
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    const checkLastFetchTime = () => {
      const lastFetch = parseInt(localStorage.getItem("resultsLastFetch"), 10);
      const fetchInterval = 12 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchResultsData();
      } else {
        const storedData = localStorage.getItem("resultsData");
        if (storedData) {
          setData(JSON.parse(storedData));
        }
        setLoading(false);
      }
    };

    checkLastFetchTime();
  }, []);

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
        <div className="bg-amaranthColor text-romanceColor p-4 rounded-lg border border-amaranthColor mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const bgColor = theme === "light" ? "#F0F0F0" : "#2D3133";
  const hoverColor = theme === "light" ? "#F7F7F7" : "#575A5C";
  const textColor = theme === "light" ? "#393e41" : "#F5F4F1";

  return (
    <Card
      title="Match Results"
      bgColor={bgColor}
      hoverColor={hoverColor}
      textColor={textColor}
      handleClick={handleClick}
      handleClickCondition={true}
      hoverCondition={true}
    >
      <div className="grid grid-flow-row gap-3">
        {data.slice(0, 2).map((result, index) => (
          <div
            key={index}
            className="justify-between grid grid-flow-col place-items-center"
          >
            {result.homeTeam !== "Arsenal" && (
              <>
                <div className="grid grid-flow-col px-8">
                  <div className="mr-4">
                    <img
                      src={result.homeLogo}
                      alt={result.homeTeam}
                      className="h-12"
                    />
                  </div>
                  <h3 className="flex items-center text-center font-semibold">
                    {result.homeTeam}
                  </h3>
                </div>
                <div className="px-8">
                  <div className="grid grid-flow-col rounded-lg bg-gainsboroColor dark:bg-fiordColor items-center text-center p-2">
                    <h4 className="text-4xl font-bold">{result.homeGoals}</h4>
                    <span className="mx-2 text-4xl font-bold">-</span>
                    <h4 className="text-4xl font-bold">{result.awayGoals}</h4>
                  </div>
                </div>
              </>
            )}
            {result.awayTeam !== "Arsenal" && (
              <>
                <div className="grid grid-flow-col px-8">
                  <div className="mr-4">
                    <img
                      src={result.awayLogo}
                      alt={result.awayTeam}
                      className="h-12"
                    />
                  </div>
                  <h3 className="flex items-center text-center font-semibold">
                    {result.awayTeam}
                  </h3>
                </div>
                <div className="px-8">
                  <div className="grid grid-flow-col rounded-lg bg-gainsboroColor dark:bg-fiordColor items-center text-center p-2">
                    <h4 className="text-4xl font-bold">{result.awayGoals}</h4>
                    <span className="mx-2 text-4xl font-bold">-</span>
                    <h4 className="text-4xl font-bold">{result.homeGoals}</h4>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ResultsCard;
