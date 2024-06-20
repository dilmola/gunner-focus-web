"use client";

import React, { useEffect, useState } from "react";
import fetchTeams from "../../../utils/getTeams";
import CustomTable from "../table";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ExpandButtonTable from "../../button/buttonExpandTable";
import Search from "../../filterBar/search";
import seemoreArrow from "../../../../public/icons/seemore_arrow.png";

const TeamTablePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(-1); // State for hovered row index

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const filterData = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter(
      (teamplayer) =>
        teamplayer.player.toLowerCase().includes(lowerCaseQuery) ||
        teamplayer.position.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData(query);
  }, [query, data]);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await fetchTeams();
        if (response && Array.isArray(response)) {
          const formattedData = formatData(response);

          localStorage.setItem("teamsData", JSON.stringify(formattedData));
          localStorage.setItem("teamsLastFetch", Date.now());
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

  const tableData = filteredData;

  const handleMouseEnter = (rowIndex) => {
    setHoveredRowIndex(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(-1); // Reset when leaving the row
  };
  
  if (loading) {
    return (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
        <div className="mb-20">
          <div className="flex mb-4 items-center">
            <h2 className="uppercase font-semibold">Team</h2>
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
          <h2 className="uppercase font-semibold">Team</h2>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex mb-4 items-center justify-between">
        <h2 className="uppercase font-semibold">Team</h2>
      </div>
      <div className="bg-[#F2F2F2] rounded-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mx-auto w-full bg-[#F2F2F2] rounded-lg borderSizePrimary">
            <div className="w-full">
              <Search query={query} setQuery={setQuery} />
            </div>
            <div className="px-2">
              <ExpandButtonTable
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
              />
            </div>
          </div>
        </div>
        <div>
          <CustomTable
            data={tableData}
            columns={getColumnsFromTeam()}
            isExpanded={isExpanded}
            clickableColumns={true}
          >
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {getColumnsFromTeam().map((col) => (
                  <td
                    key={col.key}
                    className="p-4 text-gray-800 font-semibold"
                    onMouseEnter={() => handleMouseEnter(rowIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {col.key === "photo" && row.photo ? (
                      <div className="flex items-center">
                        <img
                          src={row.photo}
                          alt={row[col.key]}
                          className="w-8 h-8 rounded mr-6 bg-[#D9D9D9]"
                        />
                        <span className="text-sm text-gray-800">
                          {row.player}
                        </span>
                      </div>
                    ) : col.key === "position" ? (
                      <div className="flex justify-between">
                        <div className="pr-4">{row.position}</div>
                        <div>
                          <img
                            src={seemoreArrow.src}
                            alt={seemoreArrow}
                            className="h-4"
                            style={{
                              opacity: hoveredRowIndex === rowIndex ? 1 : 0,
                              transition: "opacity 0.3s ease",
                            }}
                          />
                        </div>
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

const getColumnsFromTeam = () => [
  { key: "photo", label: "Player" },
  { key: "position", label: "Position" },
];

const formatData = (team) => {
  if (!Array.isArray(team)) {
    throw new Error("Expected team to be an array");
  }

  return team.map((teamsPlayers) => {
    return {
      idPlayer: teamsPlayers?.id ?? 0,
      photo: teamsPlayers?.photo ?? 0,
      player: teamsPlayers?.name ?? 0,
      position: teamsPlayers?.position ?? 0,
    };
  });
};

export default TeamTablePage;
