"use client";
import React from "react";
import Card from "../card";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { useData } from "../../../context/resultContext";
import { useTheme } from "../../../context/themeContext";
import Image from "next/image";
import NomatchDark from "../../../../public/img/nomatch-dark-img.png";
import NomatchLight from "../../../../public/img/nomatch-light-img.png";

const CardResult = ({}) => {
  const { data, loading, error } = useData();
  const { theme } = useTheme();
  const router = useRouter();

  const handleClick = () => {
    router.push("/matches");
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
        <Skeleton height={228} />
      </SkeletonTheme>
    );
  }

  if (error) {
    return (
      <div>
        <h3 className="flex items-center text-center uppercase font-semibold">
          Error
        </h3>
        <div className="bg-amaranthColor text-romanceColor p-4 rounded-lg border border-amaranthColor mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const bgColor = theme === "light" ? "#F0F0F0" : "#2D3133";
  const hoverColor = theme === "light" ? "#F6F6F6CC" : "#393E4180";
  const textColor = theme === "light" ? "#393e41" : "#F5F4F1";
  const noMatch = theme === "light" ? NomatchLight.src : NomatchDark.src;

  return (
    <Card
      title="Match Results"
      bgColor={bgColor}
      hoverColor={hoverColor}
      textColor={textColor}
      handleClick={handleClick}
      handleClickCondition={true}
      hoverCondition={true}
    >
      {data && data.length > 0 ? (
        <div className="grid grid-flow-row gap-3">
          {data.slice(0, 2).map((result, index) => (
            <div
              key={index}
              className="justify-between grid grid-flow-col place-items-center"
            >
              {!result.homeTeam.includes("Arsenal") && (
                <>
                  <div className="grid grid-flow-col px-0 lg:px-8">
                    <div className="mr-4 w-12">
                      <Image
                        src={result.homeLogo}
                        alt={result.homeTeam}
                        width={48}
                        height={48}
                      />
                    </div>
                    <h3 className="flex items-center text-center font-semibold">
                      {result.homeTeam}
                    </h3>
                  </div>
                  <div className="px-0 lg:px-8">
                    <div className="grid grid-flow-col rounded-lg bg-gainsboroColor dark:bg-montanaColor items-center text-center p-2">
                      <h4 className="text-4xl font-bold">{result.homeGoals}</h4>
                      <span className="mx-2 text-4xl font-bold">-</span>
                      <h4 className="text-4xl font-bold">{result.awayGoals}</h4>
                    </div>
                  </div>
                </>
              )}
              {!result.awayTeam.includes("Arsenal") && (
                <>
                  <div className="grid grid-flow-col px-0 lg:px-8">
                    <div className="mr-4 w-12">
                      <Image
                        src={result.awayLogo}
                        alt={result.awayTeam}
                        width={48}
                        height={48}
                      />
                    </div>
                    <h3 className="flex items-center text-center font-semibold">
                      {result.awayTeam}
                    </h3>
                  </div>
                  <div className="px-0 lg:px-8">
                    <div className="grid grid-flow-col rounded-lg bg-gainsboroColor dark:bg-montanaColor items-center text-center p-2">
                      <h4 className="text-4xl font-bold">{result.awayGoals}</h4>
                      <span className="mx-2 text-4xl font-bold">-</span>
                      <h4 className="text-4xl font-bold">{result.homeGoals}</h4>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="opacity-85 h-24 w-24 flex items-center justify-center">
            <Image src={noMatch} alt="noMatch" width={76} height={60} />
          </div>
          <p className="font-bold">There are no match results</p>
        </div>
      )}
    </Card>
  );
};

export default CardResult;
