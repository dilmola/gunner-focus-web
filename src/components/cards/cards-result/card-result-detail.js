"use client";

import React, { useState, useEffect } from "react";
import Card from "../card";
import "react-loading-skeleton/dist/skeleton.css";
import { useData } from "../../../context/resultContext";
import SearchWithFilter from "../../searches/search-with-filter";
import ButtonFilter from "../../buttons/button-filter";
import ExpandButtonTable from "../../buttons/button-expand-table";
import NoFoundImg from "../../../../public/img/notFound-img.png";
import NoFoundDarkImg from "../../../../public/img/notFound-dark-img.png";
import { useTheme } from "../../../context/themeContext";
import Image from "next/image";

const CardResultDetail = ({}) => {
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
      const month = fixtureDate.toLocaleString("en-US", { month: "long" });
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

  const groupedData = groupDataByMonth(data);
  const sortedMonths = Object.keys(groupedData).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const latestTwoMonths = sortedMonths.slice(0, 2);

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
              case "By Win":
                return (
                  (result.teamHomeResult === true &&
                    result.homeTeam.toLowerCase() === "arsenal") ||
                  (result.teamAwayResult === true &&
                    result.awayTeam.toLowerCase() === "arsenal")
                );
              case "By Draw":
                return (
                  (result.teamHomeResult === null &&
                    result.homeTeam.toLowerCase() === "arsenal") ||
                  (result.teamAwayResult === null &&
                    result.awayTeam.toLowerCase() === "arsenal")
                );
              case "By Lost":
                return (
                  (result.teamHomeResult === false &&
                    result.homeTeam.toLowerCase() === "arsenal") ||
                  (result.teamAwayResult === false &&
                    result.awayTeam.toLowerCase() === "arsenal")
                );
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
      data: "By Win",
    },
    {
      data: "By Draw",
    },
    {
      data: "By Lost",
    },
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
      data: "By League Cupp",
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
          <SearchWithFilter query={query} setQuery={setQuery} />
        </div>
        <div className="px-4">
          <ButtonFilter setFilter={setFilter} nameMatch={nameMatch} />
        </div>
      </div>
      {Object.keys(filteredData).length === 0 ? (
        <>
          <div className="min-h-screen flex flex-col items-center justify-center opacity-50">
            <Image
              src={theme === "light" ? NoFoundImg : NoFoundDarkImg}
              alt="NoFoundImg"
              width={160}
              height={120}
            />
            <p className="text-center font-semibold text-lg py-10">
              No match found
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
                    bgColor={bgColor}
                    hoverColor={hoverColor}
                    textColor={textColor}
                    handleClickCondition={false}
                    hoverCondition={false}
                  >
                    <div className="grid grid-flow-col gap-2 lg:gap-4 place-items-center items-start mt-4 lg:mt-6">
                      <div className="w-20">
                        <div className="flex justify-center mb-4">
                          <Image
                            src={result.awayLogo}
                            alt={result.awayLogo}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-center font-semibold">
                          {result.awayTeam}
                        </h3>
                      </div>
                      <div className="flex flex-col space-y-4 lg:space-y-6">
                        <p className="text-center items-center px-2 font-bold">
                          {result.matchDate}
                        </p>
                        <div className="px-2 lg:px-8">
                          <div className="grid grid-flow-col rounded-lg bg-gainsboroColor items-center text-center p-2">
                            <h4 className="text-4xl font-bold text-gray-600">
                              {result.awayGoals}
                            </h4>
                            <span className="mx-2 text-4xl font-bold text-gray-600">
                              -
                            </span>
                            <h4 className="text-4xl font-bold text-gray-600">
                              {result.homeGoals}
                            </h4>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="text-center font-bold">
                            {result.statusMatch}
                          </div>
                          <div className="text-center">
                            {result.nameOfMatch}
                          </div>
                        </div>
                      </div>
                      <div className="w-20">
                        <div className="flex justify-center mb-4">
                          <Image
                            src={result.homeLogo}
                            alt={result.homeLogo}
                            width={48}
                            height={48}
                            className="object-contain"
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

export default CardResultDetail;
