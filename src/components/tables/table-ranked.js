"use client";

import React, { useEffect, useState } from "react";
import fetchStandings from "../../utils/getStandings";
import CustomTable from "@/components/tables/table";
import Image from "next/image";
import Arsenal from "../../../public/img/arsenal-img.png";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ExpandButtonTable from "../buttons/button-expand-table";
import SearchWithFilter from "../searches/search-with-filter";
import TeamsAbbreviation from "@/libs/teamsAbbreviation";

const SPECIFIC_TEAM_ID = 42;

const TableRanked = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamRank, setTeamRank] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    filterData(query);
  }, [query, data]);

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await fetchStandings();
        if (response && Array.isArray(response)) {
          const formattedData = formatData(response);
          const specificTeam = formattedData.find(
            (team) => team.teamId === SPECIFIC_TEAM_ID
          );

          if (specificTeam) {
            setTeamRank(specificTeam.pos);
          }

          localStorage.setItem("standingsData", JSON.stringify(formattedData));
          localStorage.setItem("standingsLastFetch", Date.now());
          setData(formattedData);
          setFilteredData(formattedData);
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
      const fetchInterval = 6 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchStandingsData();
      } else {
        const storedData = localStorage.getItem("standingsData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
          const specificTeam = parsedData.find(
            (team) => team.teamId === SPECIFIC_TEAM_ID
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

  const filterData = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter((team) =>
      Object.values(team).some((value) =>
        typeof value === "string"
          ? value.toLowerCase().includes(lowerCaseQuery)
          : false
      )
    );
    setFilteredData(filtered);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleExpandClick = () => {
    toggleExpand();
  };

  const tableData = filteredData;

  if (loading) {
    return (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
        <div className="mb-20">
          <div className="flex mb-4 items-center">
            <h2 className="font-semibold">Ranked</h2>
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
          <h2 className="font-semibold">Ranked</h2>
        </div>
        <div className="bg-amaranthColor text-mirageColor p-4 rounded-lg border border-amaranthColor mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20">
      <div className="flex mb-4 items-center justify-between">
        <h2 className="font-semibold">Ranked</h2>
      </div>
      <div className="bg-whitesmokeColor rounded-lg dark:bg-codgreyColor">
        <div className="sm:p-4 p-2">
          <div className="rounded-lg overflow-hidden bg-gainsboroColor dark:bg-montanaColor h-20 flex justify-between mb-6 p-2 sm:p-8">
            <div className="flex">
              <div className="flex items-center text-center">
                <div className="relative w-8 h-8 sm:w-8 sm:h-8 lg:w-12 lg:h-12">
                  <Image
                    src={Arsenal.src}
                    alt="Arsenal"
                    layout="fill"
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="flex items-center text-center px-2 sm:px-12 font-semibold text-xl md:text-2xl">
                Arsenal
              </h3>
            </div>

            <div className="flex">
              <h3 className="flex items-center text-center px-2 sm:px-8 font-semibold">
                Current Ranked
              </h3>
              <h3 className="flex items-center text-center text-2xl md:text-4xl font-semibold">
                #{teamRank ?? "?"}
              </h3>
            </div>
          </div>

          <div className="flex justify-between items-center mx-auto w-full bg-romanceColor dark:bg-mirageColor rounded-lg borderSizePrimary">
            <div className="w-full">
              <SearchWithFilter query={query} setQuery={setQuery} />
            </div>
            <div className="p-2 cursor-pointer" onClick={handleExpandClick}>
              <ExpandButtonTable
                iconBlack={true}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
              />
            </div>
          </div>
        </div>
        <div>
          <CustomTable
            data={tableData}
            columns={getColumnsFromRanked()}
            isExpanded={isExpanded}
            clickableColumns={false}
          >
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {getColumnsFromRanked().map((col) => (
                  <td
                    key={col.key}
                    className={`px-2 py-4 md:px-3 lg:px-4 font-semibold ${
                      ["lastFive", "goalFor", "goalAgainst"].includes(col.key)
                        ? "hidden sm:table-cell"
                        : ""
                    }`}
                  >
                    {col.key === "team" ? (
                      typeof row.team === "string" ? (
                        <div className="flex">
                          <span className="block lg:hidden">
                            {TeamsAbbreviation[row.team]}
                          </span>
                          <span className="hidden lg:block">{row.team}</span>
                        </div>
                      ) : null
                    ) : col.key === "lastFive" &&
                      typeof row.lastFive === "string" ? (
                      <div className="hidden sm:flex">
                        {row.lastFive.split("").map((result, index) => {
                          const color =
                            result === "W"
                              ? "bg-green-500"
                              : result === "D"
                              ? "bg-gray-500"
                              : result === "L"
                              ? "bg-red-500"
                              : "";
                          return (
                            <div
                              key={index}
                              className={`w-4 h-4 rounded-full ${color} mr-2`}
                            />
                          );
                        })}
                      </div>
                    ) : col.key === "logo" && row.logo ? (
                      <div className="flex relative items-center w-8 h-8">
                        <Image
                          src={row.logo}
                          alt={row[col.key]}
                          layout="fill"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </CustomTable>
        </div>
      </div>
    </div>
  );
};

const getColumnsFromRanked = () => [
  { key: "pos", label: "POS" },
  { key: "logo", label: "Team" },
  { key: "team" },
  { key: "matchPlay", label: "MP" },
  { key: "win", label: "W" },
  { key: "draw", label: "D" },
  { key: "lose", label: "L" },
  { key: "goalFor", label: "GF" },
  { key: "goalAgainst", label: "GA" },
  { key: "goalDifferent", label: "GD" },
  { key: "points", label: "PTS" },
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
      teamId: teamStanding?.team?.id ?? "Unknown",
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

export default TableRanked;
