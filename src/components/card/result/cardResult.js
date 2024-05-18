"use client";
import React, { useEffect, useState } from "react";
import Card from "../card";
import fetchUpcoming from "../../../utils/getFixtures";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

const ResultsCard = ({}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

          const topResults = recentResults.slice(0, 2);
          const matchData = topResults.map((item) => ({
            awayTeam: item?.teams?.away?.name || "N/A",
            homeTeam: item?.teams?.home?.name || "N/A",
            awayLogo: item?.teams?.away?.logo || "",
            homeLogo: item?.teams?.home?.logo || "",
            awayGoals: item?.goals?.away || 0,
            homeGoals: item?.goals?.home || 0,
            fixtureDate: item?.fixture?.date,
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
        <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <Card
      title="Match Results"
      bgColor="#F6F6F6"
      hoverColor="#f9f9f9"
      textColor="#000000"
      MatchResultArray={data}
      handleClick={handleClick}
    />
  );
};

export default ResultsCard;
