"use client";

import React, { useEffect, useState } from "react";
import CustomTable from "./table";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ExpandButtonTable from "../buttons/button-expand-table";
import SearchWithFilter from "../searches/search-with-filter";
import Image from "next/image";
import SeemoreIcon from "../../../public/icons/seemore-icon.png";
import SeemoreDarkIcon from "../../../public/icons/seemore-dark-icon.png";
import { useTeam } from "../../context/teamContext";
import { useTheme } from "../../context/themeContext";

const TableTeam = () => {
  const { data, loading, error } = useTeam();
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
  const { theme } = useTheme();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleExpandClick = () => {
    toggleExpand();
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
      <div className="bg-whitesmokeColor rounded-lg dark:bg-codgreyColor">
        <div className="sm:p-4 p-2">
          <div className="flex justify-between items-center mx-auto w-full bg-romanceColor dark:bg-mirageColor rounded-lg borderSizePrimary dark:borderSizePrimaryDark">
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
            columns={getColumnsFromTeam()}
            isExpanded={isExpanded}
            clickableColumns={true}
          >
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onMouseEnter={() => handleMouseEnter(rowIndex)}
                onMouseLeave={handleMouseLeave}
              >
                {getColumnsFromTeam().map((col) => (
                  <td
                    key={col.key}
                    className="px-2 py-4 md:px-3 lg:px-4 font-semibold"
                  >
                    {col.key === "photo" && row.photo ? (
                      <div className="flex items-center">
                        <Image
                          src={row.photo}
                          alt={row[col.key]}
                          width={32} 
                          height={32}
                          className="w-8 h-8 rounded mr-6 bg-romanceColor"
                        />
                        <span className="text-sm">{row.player}</span>
                      </div>
                    ) : col.key === "position" ? (
                      <div className="flex justify-between">
                        <div className="pr-4">{row.position}</div>
                        <div>
                          <Image
                            src={
                              theme === "light" ? SeemoreIcon : SeemoreDarkIcon
                            }
                            alt="SeemoreIcon"
                            width={12} 
                            height={12} 
                            className="h-3"
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

export default TableTeam;
