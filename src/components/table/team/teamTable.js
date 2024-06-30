"use client";

import React, { useEffect, useState } from "react";
import CustomTable from "../table";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ExpandButtonTable from "../../button/buttonExpandTable";
import Search from "../../filterBar/search-with-filter";
import seemoreArrow from "../../../../public/icons/seemore_arrow.png";
import { useTeam } from "../../../context/teamContext";

const TeamTablePage = () => {
  const { data, loading, error } = useTeam();
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);

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

  const getColumnsFromTeam = () => [
    { key: "photo", label: "Player" },
    { key: "position", label: "Position" },
  ];

  const tableData = filteredData;

  const handleMouseEnter = (rowIndex) => {
    setHoveredRowIndex(rowIndex);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(-1);
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
        <div className="mb-20">
          <div className="flex mb-4 items-center">
            <h2 className="font-semibold">Team</h2>
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
          <h2 className="font-semibold">Team</h2>
        </div>
        <div className="bg-amaranthColor text-mirageColor p-4 rounded-lg border border-amaranthColor mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex mb-4 items-center justify-between">
        <h2 className="font-semibold">Team</h2>
      </div>
      <div className="bg-whitesmokeColor rounded-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mx-auto w-full bg-romanceColor rounded-lg borderSizePrimary">
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
                    className="p-4 font-semibold"
                    onMouseEnter={() => handleMouseEnter(rowIndex)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {col.key === "photo" && row.photo ? (
                      <div className="flex items-center">
                        <img
                          src={row.photo}
                          alt={row[col.key]}
                          className="w-8 h-8 rounded mr-6 bg-romanceColor"
                        />
                        <span className="text-sm">{row.player}</span>
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

export default TeamTablePage;
