"use client";
import Card from "../card";
import React, { useEffect, useState } from "react";
import fetchUpcoming from "../../../app/utils/getFixtures";
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

  if (data.length === 0) {
    return <div>No upcoming fixtures available</div>;
  }

  const team1Logo = data?.teams?.away?.logo || "N/A";
  const team2Logo = data?.teams?.home?.logo || "N/A";
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
        team1Logo={team1Logo}
        team2Logo={team2Logo}
        team1={awayTeamName}
        team2={homeTeamName}
        date={matchDate}
        time={matchTime}
        handleClick={handleClick}
      />
    </div>
  );
};

export default UpcomingCard;
