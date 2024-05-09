"use client";

import React, { useEffect, useState } from "react";
import fetchTeams from "../../../app/utils/getTeams";
import CustomTable from "../table";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TeamTablePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await fetchTeams();
        if (response && Array.isArray(response)) {
          const formattedData = formatData(response);

          localStorage.setItem("teamsData", JSON.stringify(formattedData));
          localStorage.setItem("teamsLastFetch", Date.now());
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
      const lastFetch = parseInt(localStorage.getItem("teamsLastFetch"), 10);
      const fetchInterval = 12 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchTeamsData();
      } else {
        const storedData = localStorage.getItem("teamsData");
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
        <div className="mb-20">
          <div className="flex mb-4 items-center">
            <h2 className="uppercase font-semibold leading-4">Team</h2>
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
          <h2 className="uppercase font-semibold leading-4">Team</h2>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex mb-4 items-center">
        <h2 className="uppercase font-semibold leading-4">Team</h2>
      </div>
      <CustomTable columns={getColumns()} data={data} />
    </div>
  );
};

const getColumns = () => [
  { key: "photo", label: "Player" },
  { key: "position", label: "Position" },
];

const formatData = (team) => {
  if (!Array.isArray(team)) {
    throw new Error("Expected team to be an array");
  }

  return team.map((teamsPlayers) => {
    return {
      photo: teamsPlayers?.photo ?? 0,
      player: teamsPlayers?.name ?? 0,
      position: teamsPlayers?.position ?? 0,
    };
  });
};

export default TeamTablePage;
