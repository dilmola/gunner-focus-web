"use client";
import Card from "../card";
import React, { useEffect, useState } from "react";
import fetchUpcoming from "../../../utils/getFixtures";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import noGames from "../../../../public/img/NoGames.png";
import { useData } from "../../../context/upcomingContext";

const UpcomingCard = ({}) => {
  const { data, setData } = useData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleClick = () => {
    router.push("/upcoming");
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
            return fixtureDate >= today;
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
            nameOfMatch: item?.league?.name,

            teamHomeResult: item?.teams?.home?.winner,
            teamAwayResult: item?.teams?.away?.winner,
          }));

          setData(matchData);
          localStorage.setItem("upcomingsData", JSON.stringify(matchData));
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
        fetchResultsData();
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
        <div className="bg-romanceColor text-amaranthColor p-4 rounded-lg border border-amaranthColor mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <Card
      title="Upcoming Match:"
      bgColor="#E63946"
      hoverColor="#e84c58"
      textColor="#F5F4F1"
      handleClick={handleClick}
      handleClickCondition={true}
      hoverCondition={true}
    >
      <>
        {data && data.length > 0 ? (
          <div className="grid grid-flow-row gap-3">
            {data.slice(0, 1).map((result, index) => (
              <div key={index}>
                <div className="grid grid-flow-col gap-4 place-items-center items-start mb-6">
                  <div className="w-20">
                    <div className="flex justify-center mb-4">
                      <img
                        src={result.awayLogo}
                        alt={result.awayLogo}
                        className="h-14"
                      />
                    </div>
                    <h3 className="text-center font-semibold">
                      {result.awayTeam}
                    </h3>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-center py-1 rounded-lg bg-mirageColor items-center px-2">
                      {(() => {
                        const dateObj = new Date(result.fixtureDate);
                        return dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
                      })()}
                    </p>
                    <p className="text-center py-1">VS</p>
                    <p className="text-center py-1 rounded-lg bg-mirageColor ">
                      {(() => {
                        const dateObj = new Date(result.fixtureDate);
                        const optionsTime = {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "Asia/Kuala_Lumpur",
                        };
                        return dateObj.toLocaleTimeString("en-US", optionsTime); // HH:MM AM/PM
                      })()}
                    </p>
                  </div>
                  <div className="w-20">
                    <div className="flex justify-center mb-4">
                      <img
                        src={result.homeLogo}
                        alt={result.homeLogo}
                        className="h-14"
                      />
                    </div>
                    <h3 className="text-center font-semibold">
                      {result.homeTeam}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="opacity-85">
              <img src={noGames.src} alt="noGames" className="h-20" />
            </div>
            <p className="font-bold">There are no upcoming match</p>
          </div>
        )}
      </>
    </Card>
  );
};

export default UpcomingCard;
