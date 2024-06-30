"use client";

import React, { useState, useEffect } from "react";
import Card from "../card";
import "react-loading-skeleton/dist/skeleton.css";
import { useData } from "../../../context/upcomingContext";
import Search from "../../filterBar/search-with-filter";
import FilterButton from "../../button/buttonFilter";
import ExpandButtonTable from "../../button/buttonExpandTable";
import NoFoundImg from "../../../../public/img/notFound.png";

const UpcomingCardDetails = ({}) => {
  const { data } = useData();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState("");

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

  return (
    <>
      <div className="flex justify-between items-center mx-auto w-full bg-romanceColor rounded-lg mb-12 borderSizePrimary">
        <div className="w-full">
          <Search query={query} setQuery={setQuery} />
        </div>
        <div className="px-2">
          <FilterButton setFilter={setFilter} />
        </div>
      </div>
      {Object.keys(filteredData).length === 0 ? (
        <>
          <div class="min-h-screen flex flex-col items-center justify-center">
            <img src={NoFoundImg.src} alt={NoFoundImg} className="h-40" />
            <p className="text-center text-black font-semibold text-lg py-10">
              No upcoming match found
            </p>
          </div>
        </>
      ) : (
        <>
          {Object.entries(filteredData).map(([monthYear, results]) => (
            <div className="mb-12" key={monthYear}>
              <h3 className="mb-2 font-medium text-lg">{monthYear}</h3>
              <div className="grid grid-cols-2 gap-5">
                {results.map((result, index) => (
                  <Card
                    key={index}
                    title=""
                    bgColor="#F6F6F6"
                    hoverColor="#f9f9f9"
                    textColor="#000000"
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
                        <div className="px-8">
                          <div className="grid grid-flow-col rounded-lg bg-[#e4e4e3] items-center text-center p-2">
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
                        <div className="flex flex-col	space-y-2">
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
          <ExpandButtonTable
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
          />
        </>
      )}
      ;
    </>
  );
};

export default UpcomingCardDetails;
