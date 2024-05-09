"use client";

import React, { useEffect, useState } from "react";
import fetchStandings from "../../../app/utils/getStandings";
import CustomTable from "../table";
import Arsenal from "../../../../public/img/arsenal.png";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SPECIFIC_TEAM_ID = "Arsenal";

const RankedTablePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamRank, setTeamRank] = useState(null);

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await fetchStandings();
        if (response && Array.isArray(response)) {
          const formattedData = formatData(response);

          const specificTeam = formattedData.find(
            (team) => team.team === SPECIFIC_TEAM_ID
          );

          if (specificTeam) {
            setTeamRank(specificTeam.pos);
          }

          localStorage.setItem("standingsData", JSON.stringify(formattedData));
          localStorage.setItem("standingsLastFetch", Date.now());
          setData(formattedData);
        } else {
          throw new Error("Data is not in expected format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    const checkLastFetchTime = () => {
      const lastFetch = parseInt(
        localStorage.getItem("standingsLastFetch"),
        10
      );
      const fetchInterval = 12 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchStandingsData();
      } else {
        const storedData = localStorage.getItem("standingsData");
        if (storedData) {
          setData(JSON.parse(storedData));
          const specificTeam = JSON.parse(storedData).find(
            (team) => team.team === SPECIFIC_TEAM_ID
          );
          if (specificTeam) {
            setTeamRank(specificTeam.pos);
          }
        }
        setLoading(false);
      }
    };

    checkLastFetchTime();
  }, []);

  if (loading) {
    return (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
        <div className="mb-20">
          <div className="flex mb-4 items-center">
            <h2 className="uppercase font-semibold leading-4">Ranked</h2>
          </div>
          <div className="mb-4">
            <Skeleton height={100} />
          </div>
          <div className="mb-6">
            <Skeleton height={300} className="rounded-md" />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex mb-4 items-center">
          <h2 className="uppercase font-semibold leading-4">Ranked</h2>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20">
      <div className="flex mb-4 items-center">
        <h2 className="uppercase font-semibold leading-4">Ranked</h2>
      </div>
      <div className="rounded-lg overflow-hidden bg-[#F2F2F2] h-20 flex justify-between mb-2 p-8">
        <div className="flex">
          <div className="flex items-center text-center md:px-3.5">
            <img src={Arsenal.src} alt="Arsenal" className="h-12" />
          </div>
          <h3 className="flex items-center text-center px-12 uppercase font-semibold">
            Arsenal
          </h3>
        </div>
        <div className="flex">
          <h3 className="flex items-center text-center uppercase px-8 font-semibold">
            Current Ranked
          </h3>
          <h3 className="flex items-center text-center text-4xl font-semibold">
            #{teamRank ?? "?"}
          </h3>
        </div>
      </div>
      <div>
        <CustomTable data={data} columns={getColumns()} />
      </div>
    </div>
  );
};

const getColumns = () => [
  { key: "pos", label: "POS" },
  { key: "logo" },
  { key: "team", label: "Team" },
  { key: "matchPlay", label: "MP" },
  { key: "win", label: "W" },
  { key: "draw", label: "D" },
  { key: "lose", label: "L" },
  { key: "goalFor", label: "GF" },
  { key: "goalAgainst", label: "GA" },
  { key: "goalDifferent", label: "GD" },
  { key: "points", label: "Points" },
  { key: "lastFive", label: "Last 5" },
];

const formatData = (standings) => {
  if (!Array.isArray(standings)) {
    throw new Error("Expected standings to be an array");
  }

  return standings.map((teamStanding) => {
    const allMatches = teamStanding?.all;

    if (!allMatches) {
      throw new Error("Unexpected data structure: 'all' property is missing");
    }

    return {
      pos: teamStanding.rank,
      logo: teamStanding?.team?.logo ?? "Unknown",
      team: teamStanding?.team?.name ?? "Unknown",
      matchPlay: allMatches?.played ?? 0,
      win: allMatches?.win ?? 0,
      draw: allMatches?.draw ?? 0,
      lose: allMatches?.lose ?? 0,
      goalFor: allMatches?.goals?.for ?? 0,
      goalAgainst: allMatches?.goals?.against ?? 0,
      goalDifferent: teamStanding?.goalsDiff ?? 0,
      points: teamStanding?.points ?? 0,
      lastFive: teamStanding?.form ?? "-----",
    };
  });
};

export default RankedTablePage;
