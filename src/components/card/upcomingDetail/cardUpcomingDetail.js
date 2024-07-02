"use client";

import React, { useState, useEffect } from "react";
import Card from "../card";
import "react-loading-skeleton/dist/skeleton.css";
import { useData } from "../../../context/upcomingContext";
import Search from "../../filterBar/search-with-filter";
import FilterButton from "../../button/buttonFilter";
import ExpandButtonTable from "../../button/buttonExpandTable";
import NoFoundImg from "../../../../public/img/notFound-img.png";
import NoFoundDarkImg from "../../../../public/img/notFound-dark-img.png";
import { useTheme } from "../../../context/themeContext";

const UpcomingCardDetails = ({}) => {
  const { data } = useData();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState("");
  const { theme } = useTheme();

  const groupDataByMonth = (data) => {
    const groupedData = {};

    data.forEach((result) => {
      const fixtureDate = new Date(result.fixtureDate);
      const month = fixtureDate.toLocaleString("en-MY", { month: "long" });
      const year = fixtureDate.getFullYear();
      const monthYear = `${month} ${year}`;

      const matchDate = result?.fixtureDate
        ? new Date(result.fixtureDate)
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, ".")
        : "N/A";

      if (!groupedData[monthYear]) {
        groupedData[monthYear] = [];
      }

      groupedData[monthYear].push({
        ...result,
        matchDate: matchDate,
      });
    });

    return groupedData;
  };

  const sortByMonthYear = (data) => {
    return Object.keys(data)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});
  };
  const groupedData = sortByMonthYear(groupDataByMonth(data));
  const latestTwoMonths = Object.keys(groupedData).slice(0, 2);

  const filterData = (query, data, filter) => {
    let filtered = {};

    if (query) {
      const queryLower = query.toLowerCase();
      filtered = Object.entries(data).reduce((acc, [monthYear, results]) => {
        const filteredResults = results.filter(
          (result) =>
            result.awayTeam.toLowerCase().includes(queryLower) ||
            result.homeTeam.toLowerCase().includes(queryLower) ||
            result.matchDate.includes(query) ||
            result.nameOfMatch.toLowerCase().includes(queryLower)
        );

        if (filteredResults.length) {
          acc[monthYear] = filteredResults;
        }
        return acc;
      }, {});
    } else {
      filtered = data;
    }

    if (filter) {
      filtered = Object.entries(filtered).reduce(
        (acc, [monthYear, results]) => {
          const filteredResults = results.filter((result) => {
            switch (filter) {
              case "By Premier League":
                return result.nameOfMatch.toLowerCase() === "premier league";
              case "By UEFA Champions League":
                return (
                  result.nameOfMatch.toLowerCase() === "uefa champions league"
                );
              case "By FA Cup":
                return result.nameOfMatch.toLowerCase() === "fa cup";
              case "By Emirates Cup":
                return result.nameOfMatch.toLowerCase() === "emirates cup";
              case "By Friendlies Clubs":
                return result.nameOfMatch.toLowerCase() === "friendlies clubs";
              case "By League Cup":
                return result.nameOfMatch.toLowerCase() === "league cup";
              case "Clear":
                return true;
              default:
                return true;
            }
          });

          if (filteredResults.length) {
            acc[monthYear] = filteredResults;
          }
          return acc;
        },
        {}
      );
    }

    return filtered;
  };

  const nameMatch = [
    {
      data: "By Premier League",
    },
    {
      data: "By UEFA Champions League",
    },
    {
      data: "By FA Cup",
    },
    {
      data: "By Emirates Cup",
    },
    {
      data: "By Friendlies Clubs",
    },
    {
      data: "By League Cup",
    },
    {
      data: "Clear",
    },
  ];

  useEffect(() => {
    const dataToFilter = isExpanded
      ? groupedData
      : latestTwoMonths.reduce((acc, monthYear) => {
          acc[monthYear] = groupedData[monthYear];
          return acc;
        }, {});

    setFilteredData(filterData(query, dataToFilter, filter));
  }, [query, data, isExpanded, filter]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleExpandClick = () => {
    toggleExpand();
  };

  const bgColor = theme === "light" ? "#F0F0F0" : "#2D3133";
  const hoverColor = theme === "light" ? "#F7F7F7" : "#575A5C";
  const textColor = theme === "light" ? "#393e41" : "#F5F4F1";

  return (
    <>
      <div className="flex justify-between items-center mx-auto w-full bg-romanceColor dark:bg-mirageColor rounded-lg mb-12 borderSizePrimary">
        <div className="w-full">
          <Search query={query} setQuery={setQuery} />
        </div>
        <div className="px-2">
          <FilterButton setFilter={setFilter} nameMatch={nameMatch} />
        </div>
      </div>
      {Object.keys(filteredData).length === 0 ? (
        <>
          <div class="min-h-screen flex flex-col items-center justify-center opacity-50">
            <img
              src={theme === "light" ? NoFoundImg.src : NoFoundDarkImg.src}
              alt="NoFoundImg"
              className="h-40"
            />
            <p className="text-center font-semibold text-lg py-10">
              No upcoming match found
            </p>
          </div>
        </>
      ) : (
        <>
          {Object.entries(filteredData).map(([monthYear, results]) => (
            <div className="mb-12" key={monthYear}>
              <h3 className="mb-2 font-medium text-lg">{monthYear}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                {results.map((result, index) => (
                  <Card
                    key={index}
                    title=""
                    bgColor={bgColor}
                    hoverColor={hoverColor}
                    textColor={textColor}
                    handleClickCondition={false}
                    hoverCondition={false}
                  >
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
                      <div className="flex flex-col	space-y-6">
                        <p className="text-center items-center px-2 font-bold ">
                          {result.matchDate}
                        </p>
                        <p className="text-center py-1">VS</p>
                        <p className="text-center py-1 rounded-lg bg-gainsboroColor dark:bg-fiordColor">
                          {(() => {
                            const dateObj = new Date(result.fixtureDate);
                            const optionsTime = {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                              timeZone: "Asia/Kuala_Lumpur",
                            };
                            return dateObj.toLocaleTimeString(
                              "en-US",
                              optionsTime
                            );
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
                  </Card>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-start ">
            <div
              className="bg-amaranthColor rounded p-2 cursor-pointer"
              onClick={handleExpandClick}
            >
              <ExpandButtonTable
                iconBlack={false}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpcomingCardDetails;
