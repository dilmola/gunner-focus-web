"use client";
import styled from "styled-components";
import React, { useState } from "react";

const Card = ({
  title,
  bgColor,
  textColor,
  hoverColor,
  team1Logo,
  team2Logo,
  team1,
  team2,
  date,
  time,
  MatchResultArray,
  handleClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverStyles = isHovered
    ? { backgroundColor: hoverColor, cursor: "pointer" }
    : {};

  const seeMoreStyles = {
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.5s ease",
  };

  return (
    <>
      <div
        className="rounded-lg h-[14.5rem] overflow-y-auto"
        style={{ color: textColor, backgroundColor: bgColor, ...hoverStyles }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-4 py-4 h-[12.5rem]">
          <div className="flex flex-col items-center">
            <div className="font-bold uppercase mb-8">{title} </div>
          </div>
          {MatchResultArray ? (
            <div className="grid grid-flow-row gap-3">
              {MatchResultArray.map((result, index) => (
                <div
                  key={index}
                  className="justify-between grid grid-flow-col place-items-center"
                >
                  {result.homeTeam !== "Arsenal" && (
                    <>
                      <div className="grid grid-flow-col px-8">
                        <div className="mr-4">
                          <img
                            src={result.homeLogo}
                            alt={result.homeTeam}
                            className="h-12"
                          />
                        </div>
                        <h3 className="flex items-center text-center font-semibold">
                          {result.homeTeam}
                        </h3>
                      </div>
                      <div className="px-8">
                        <div className="grid grid-flow-col rounded-lg bg-[#e4e4e3] items-center text-center p-2">
                          <h4 className="text-4xl font-bold text-gray-600">
                            {result.homeGoals}
                          </h4>
                          <span className="mx-2 text-4xl font-bold text-gray-600">
                            -
                          </span>
                          <h4 className="text-4xl font-bold text-gray-600">
                            {result.awayGoals}
                          </h4>
                        </div>
                      </div>
                    </>
                  )}

                  {result.awayTeam !== "Arsenal" && (
                    <>
                      <div className="grid grid-flow-col px-8">
                        <div className="mr-4">
                          <img
                            src={result.awayLogo}
                            alt={result.awayTeam}
                            className="h-12"
                          />
                        </div>
                        <h3 className="flex items-center text-center font-semibold">
                          {result.awayTeam}
                        </h3>
                      </div>
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
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="grid grid-flow-col gap-4 place-items-center items-start mb-6">
                <div className="w-20">
                  <div className="flex justify-center mb-4">
                    <img src={team1Logo} alt={team1} className="h-14" />
                  </div>
                  <h3 className="text-center font-semibold">{team1}</h3>
                </div>
                <div className="flex flex-col	">
                  <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
                    {date}
                  </p>
                  <p className="text-center py-1">VS</p>
                  <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
                    {time}
                  </p>
                </div>
                <div className="w-20">
                  <div className="flex justify-center mb-4">
                    <img src={team2Logo} alt={team2} className="h-14" />
                  </div>
                  <h3 className="text-center font-semibold">{team2}</h3>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute px-4 font-semibold	" style={seeMoreStyles}>
          <span>See more</span>
        </div>
      </div>
    </>
  );
};

export default Card;
