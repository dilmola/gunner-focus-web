"use client";
import Card from "../card";
import React, { useEffect, useState } from "react";
import fetchUpcoming from "../../../utils/getFixtures";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

const UpcomingCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleClick = () => {
    router.push("/upcoming");
  };

  useEffect(() => {
    const fetchUpcomingData = async () => {
      try {
        const response = await fetchUpcoming();

        if (Array.isArray(response)) {
          const today = new Date().setHours(0, 0, 0, 0);

          const upcomingMatches = response.filter((item) => {
            const fixtureDate = new Date(item?.fixture?.date);
            return fixtureDate >= today;
          });

          upcomingMatches.sort((a, b) => {
            const aDate = new Date(a?.fixture?.date);
            const bDate = new Date(b?.fixture?.date);
            return aDate - bDate;
          });

          const firstMatch = upcomingMatches[0] || null;

          setData(firstMatch);
          localStorage.setItem("upcomingsData", JSON.stringify(firstMatch));
          localStorage.setItem("upcomingsLastFetch", Date.now().toString());
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
      const lastFetch = parseInt(
        localStorage.getItem("upcomingsLastFetch"),
        10
      );
      const fetchInterval = 12 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchUpcomingData();
      } else {
        const storedData = localStorage.getItem("upcomingsData");
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
        <div>
          <Skeleton height={228} />
        </div>
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

  const teamAwayLogo = data?.teams?.away?.logo || "N/A";
  const teamHomeLogo = data?.teams?.home?.logo || "N/A";
  const awayTeamName = data?.teams?.away?.name || "N/A";
  const homeTeamName = data?.teams?.home?.name || "N/A";
  const matchDate = data?.fixture?.date
    ? new Date(data?.fixture.date).toLocaleDateString("en-MY")
    : "N/A";
  const matchTime = data?.fixture?.date
    ? new Date(data?.fixture.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div>
      <Card
        title="Upcoming Match:"
        bgColor="#E63946"
        hoverColor="#e84c58"
        textColor="#FFFFFF"
        handleClick={handleClick}
        handleClickCondition={true}
        hoverCondition={true}
      >
        <>
          {data ? (
            <div className="grid grid-flow-col gap-4 place-items-center items-start mb-6">
              <div className="w-20">
                <div className="flex justify-center mb-4">
                  <img src={teamAwayLogo} alt={teamAwayLogo} className="h-14" />
                </div>
                <h3 className="text-center font-semibold">{awayTeamName}</h3>
              </div>
              <div className="flex flex-col	">
                <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
                  {matchDate}
                </p>
                <p className="text-center py-1">VS</p>
                <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
                  {matchTime}
                </p>
              </div>
              <div className="w-20">
                <div className="flex justify-center mb-4">
                  <img src={teamHomeLogo} alt={teamHomeLogo} className="h-14" />
                </div>
                <h3 className="text-center font-semibold">{homeTeamName}</h3>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl font-bold">No Games</p>
              </div>
            </div>
          )}
        </>
      </Card>
    </div>
  );
};

export default UpcomingCard;
