"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useTeam } from "../../../../context/teamContext";
import { usePlayer } from "../../../../context/playerContext";

import jerseyNumbers from "../../../../libs/jerseyNumbers";
import flags from "../../../../libs/nationalFlags";
import preferredFoot from "../../../../libs/preferredFoot";
import slugify from "../../../../utils/slugify";

import substituteIcon from "../../../../../public/icons/player/substitute-icon.png";
import shotIcon from "../../../../../public/icons/player/shot-icon.png";
import goalIcon from "../../../../../public/icons/player/goals-icon.png";
import passesIcon from "../../../../../public/icons/player/passes-icon.png";
import tackleIcon from "../../../../../public/icons/player/tackle-icon.png";
import cardsIcon from "../../../../../public/icons/player/cards-icon.png";
import cardsRedIcon from "../../../../../public/icons/player/cards-icon-red.png";
import cardsYellowIcon from "../../../../../public/icons/player/cards-icon-yellow.png";
import penaltyIcon from "../../../../../public/icons/player/penalty-icon.png";
import foulsIcon from "../../../../../public/icons/player/fouls-icon.png";
import duelsIcon from "../../../../../public/icons/player/duels-icon.png";
import dribblesIcon from "../../../../../public/icons/player/dribbles-icon.png";

import GamesPlayerCard from "../../../../components/card/games-player/games-player";
import StackedChart from "../../../../components/chart/stackedbar-chart";
import DoughnutChart from "../../../../components/chart/doughnut-chart";
import Search from "../../../../components/filterBar/search";

export default function PlayerPage() {
  const [query, setQuery] = useState("");
  const { data } = useTeam();
  const [seasonYear, setSeasonYear] = useState("2024"); // Default season
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const searchRef = useRef(null);
  const router = useRouter();
  const { id } = useParams();
  const { playerData, checkLastFetchTime, loading, error } = usePlayer();
  const playerDataExist =
    playerData?.player?.id === parseInt(id) ? playerData : null;

  const goalsDataGoalKeeper = [
    {
      name: "Conceded",
      value: playerData?.statistics?.[0]?.goals?.conceded ?? 0,
      color: "#780000",
    },
    {
      name: "Saves",
      value: playerData?.statistics?.[0]?.goals?.saves ?? 0,
      color: "#fdf0d5",
    },
  ];

  const goalsDataNotGoalKeeper = [
    {
      name: "Total",
      value: playerData?.statistics?.[0]?.goals?.total ?? 0,
      color: "#780000",
    },
    {
      name: "Assists",
      value: playerData?.statistics?.[0]?.goals?.assists ?? 0,
      color: "#fdf0d5",
    },
  ];

  const duelsData = [
    {
      name: "Won",
      value: playerData?.statistics?.[0]?.duels?.won ?? "-",
      color: "#780000",
    },
    {
      name: "Failed",
      value:
        (playerData?.statistics?.[0]?.duels?.total ?? 0) -
        (playerData?.statistics?.[0]?.duels?.won ?? 0),
      color: "#fdf0d5",
    },
  ];

  const dribblesData = [
    {
      name: "Success",
      value: playerData?.statistics?.[0]?.dribbles?.success ?? "-",
      color: "#780000",
    },
    {
      name: "Attempts",
      value:
        (playerData?.statistics?.[0]?.dribbles?.attempts ?? "-") -
        (playerData?.statistics?.[0]?.dribbles?.success ?? "-"),
      color: "#fdf0d5",
    },
  ];

  useEffect(() => {
    if (id) {
      setSelectedPlayerId(id);
      checkLastFetchTime(id, seasonYear);
    }
  }, [id, seasonYear, checkLastFetchTime]);

  const handleSeasonClick = (year) => {
    setSeasonYear(year);
    if (selectedPlayerId) {
      checkLastFetchTime(selectedPlayerId, year);
    }
  };

  const handlePlayerClick = (player) => {
    const playerId = player.idPlayer || "unknown-player-id";
    setSelectedPlayerId(playerId);
    const playerName = player.player || "unknown-player";
    const slug = slugify(playerName);

    router.push(`/player/${playerId}/${slug}`);
  };

  useEffect(() => {
    if (selectedPlayerId) {
      checkLastFetchTime(selectedPlayerId);
    }
  }, [selectedPlayerId, checkLastFetchTime]);

  useEffect(() => {
    if (data && query) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = data.filter((teamplayer) =>
        teamplayer.player.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [query, data]);

  return (
    <main className="min-h-screen">
      <h2 className="font-semibold mb-4">Player</h2>
      <div className="relative mb-12" ref={searchRef}>
        <Search query={query} setQuery={setQuery} />
        {query ? (
          filteredData.length > 0 ? (
            <ul className="bg-white w-full absolute z-20 p-3 shadow-md rounded-md borderSizePrimary mt-2">
              {filteredData.map((player) => (
                <li
                  key={player.idPlayer}
                  className="mb-2 cursor-pointer"
                  onClick={() => handlePlayerClick(player)}
                >
                  <div className="flex items-center">
                    {player.photo && (
                      <img
                        src={player.photo}
                        alt={player.player}
                        className="w-10 h-10 rounded-md mr-4"
                      />
                    )}
                    <span className="font-semibold">{player.player}</span>
                    <span className="ml-2 text-gray-600">
                      ({player.position})
                    </span>
                    <span className="ml-2 text-gray-600">
                      ({player.idPlayer})
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white w-full absolute z-20 p-3 shadow-md rounded-md borderSizePrimary mt-2 text-center text-gray-600">
              No results found
            </div>
          )
        ) : null}
      </div>
      <section className="mb-12">
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : playerDataExist ? (
            <div className="space-y-16">
              <section className="space-y-4">
                <section className="bg-red-600 w-full rounded-lg p-4 grid grid-cols-2 gap-36 content-center text-white">
                  <article className="flex flex-row gap-2">
                    <figure>
                      <img
                        src={playerData?.player.photo ?? "-"}
                        alt={playerData?.player.photo ?? "-"}
                        className="h-28 rounded mr-6 bg-[#D9D9D9]"
                      />
                    </figure>
                    <div>
                      <p className="text-2xl font-bold">
                        {playerData?.player?.name}
                      </p>
                      <p className="font-semibold text-sm">
                        {playerData?.statistics?.[0]?.games?.position ?? "-"}
                      </p>
                    </div>
                  </article>
                  <article className="grid grid-cols-3 gap-2 p-6 bg-[#F6F6F6] rounded-md text-sm  text-slate-700/60 font-bold">
                    <div className="flex flex-col space-y-4">
                      <p>Captain</p>
                      <p className="font-semibold text-lg text-gray-700">
                        {playerData?.statistics?.[0]?.games?.captain
                          ? "Yes"
                          : "-"}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <p>Shirt number</p>
                      <p className="font-semibold text-lg text-gray-700">
                        #{jerseyNumbers[playerData?.player?.id] ?? "-"}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <p>Nationality</p>
                      <div className="flex font-semibold text-lg space-x-2 text-gray-700">
                        <img
                          src={flags[playerData?.player?.nationality]?.src}
                          alt={playerData?.player?.nationality}
                          className="h-6 rounded"
                        />
                        <p>{playerData?.player?.nationality}</p>
                      </div>
                    </div>
                  </article>
                </section>
                <section className="bg-white rounded-lg p-4 grid grid-cols-3 gap-8 text-sm text-slate-700/50 font-bold">
                  <article>
                    <h3>First name</h3>
                    <p className="text-gray-700">
                      {playerData?.player?.firstname}
                    </p>
                  </article>
                  <article>
                    <h3>Last name</h3>
                    <p className="text-gray-700">
                      {playerData?.player?.lastname}
                    </p>
                  </article>
                  <article>
                    <h3>Age</h3>
                    <p className="text-gray-700">{playerData?.player?.age}</p>
                  </article>
                  <article>
                    <h3>Weight</h3>
                    <p className="text-gray-700">
                      {playerData?.player?.weight}
                    </p>
                  </article>
                  <article>
                    <h3>Height</h3>
                    <p className="text-gray-700">
                      {playerData?.player?.height}
                    </p>
                  </article>
                  <article>
                    <h3>Preferred foot</h3>
                    <p className="text-gray-700">
                      {preferredFoot[playerData?.player?.id] ?? "-"}
                    </p>
                  </article>
                  <article>
                    <h3>Appearences</h3>
                    <p className="text-gray-700">
                      {playerData?.statistics?.[0]?.games?.appearences ?? "-"}
                    </p>
                  </article>
                  <article>
                    <h3>Minutes</h3>
                    <p className="text-gray-700">
                      {playerData?.statistics?.[0]?.games?.minutes ?? "-"}
                    </p>
                  </article>
                  <article className="col-span-2 bg-[#eaeaea] p-4 rounded">
                    <h3>Birth</h3>
                    <div className="grid grid-cols-3">
                      <div>
                        <h4>Date</h4>
                        <p className="text-gray-700">
                          {playerData?.player?.birth?.date ?? "-"}
                        </p>
                      </div>
                      <div>
                        <h4>Place</h4>
                        <p className="text-gray-700">
                          {playerData?.player?.birth?.place ?? "-"}
                        </p>
                      </div>
                      <div>
                        <h4>Country</h4>
                        <div className="flex space-x-2">
                          <img
                            src={flags[playerData?.player?.birth?.country]?.src}
                            alt={playerData?.player?.birth?.country}
                            className="h-6 rounded"
                          />
                          <p className="text-gray-700">
                            {playerData?.player?.birth?.country ?? "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
              </section>
              <section className="space-y-4 text-slate-700/50">
                <nav className="flex flex-wrap justify-between">
                  <div className="space-x-4 text-sm font-bold">
                    {["2022", "2023", "2024"].map((year) => (
                      <button
                        key={year}
                        className={`px-4 py-2 rounded-lg text-white ${
                          seasonYear === year
                            ? "bg-amaranthColor"
                            : "bg-gray-300 hover:bg-mirageColor"
                        }`}
                        onClick={() => handleSeasonClick(year)}
                      >
                        {year} / {parseInt(year) + 1}
                      </button>
                    ))}
                  </div>
                  {/* <div>
                    <a className="rounded-md bg-white py-2 px-4">compare</a>
                  </div> */}
                </nav>
                <section className="bg-white rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <GamesPlayerCard
                      contentCardIcon={penaltyIcon.src}
                      contentCardAlt="penaltyIcon"
                      contentCardTitle="Penalty"
                    >
                      <>
                        {playerData?.statistics?.[0]?.games?.position ===
                        "Goalkeeper" ? (
                          <>
                            <div className="flex flex-row space-x-2 items-baseline">
                              <p className="text-3xl font-bold text-gray-700">
                                {playerData?.statistics?.[0]?.penalty?.saved ??
                                  "-"}
                              </p>
                              <p className="text-base font-bold">Saved</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-row space-x-6">
                              <div className="flex flex-row space-x-2 items-baseline">
                                <p className="text-3xl font-bold text-gray-700">
                                  {playerData?.statistics?.[0]?.penalty
                                    ?.scored ?? "-"}
                                </p>
                                <p className="text-base font-bold ">Scored</p>
                              </div>
                              <div className="flex flex-row space-x-2 items-baseline">
                                <p className="text-3xl font-bold text-gray-700">
                                  {playerData?.statistics?.[0]?.penalty
                                    ?.missed ?? "-"}
                                </p>
                                <p className="text-base font-bold">Missed</p>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    </GamesPlayerCard>
                    <GamesPlayerCard
                      contentCardIcon={foulsIcon.src}
                      contentCardAlt="foulsIcon"
                      contentCardTitle="Fouls"
                    >
                      <>
                        <p className="text-3xl font-bold text-gray-700">
                          {playerData?.statistics?.[0]?.fouls?.committed ?? "-"}
                        </p>
                      </>
                    </GamesPlayerCard>
                    <GamesPlayerCard
                      contentCardIcon={shotIcon.src}
                      contentCardAlt="shotIcon"
                      contentCardTitle="Shots"
                    >
                      <>
                        <div className="flex flex-row items-baseline space-x-2">
                          <p className=" text-3xl font-bold text-gray-700">
                            {(() => {
                              const total =
                                playerData?.statistics?.[0]?.shots?.total ?? 0;
                              const onTarget =
                                playerData?.statistics?.[0]?.shots?.on ?? 0;
                              if (total > 0) {
                                const percentage = (
                                  (onTarget / total) *
                                  100
                                ).toFixed(1);
                                return `${percentage}%`;
                              }
                              return "-";
                            })()}
                          </p>
                          <p className="text-base font-bold">
                            Total shot&nbsp;
                            <span className="text-black">
                              {playerData?.statistics?.[0]?.shots?.total ?? "-"}
                            </span>
                            &nbsp;|&nbsp; Shot on target&nbsp;
                            <span className="text-black">
                              {playerData?.statistics?.[0]?.shots?.on ?? "-"}
                            </span>
                          </p>
                        </div>
                      </>
                    </GamesPlayerCard>
                    <GamesPlayerCard
                      contentCardIcon={passesIcon.src}
                      contentCardAlt="passesIcon"
                      contentCardTitle="Passes"
                    >
                      <>
                        <div className="flex flex-row items-baseline space-x-2">
                          <p className=" text-3xl font-bold text-gray-700">
                            {playerData?.statistics?.[0]?.passes?.total ?? "-"}
                          </p>
                          <p className="text-base font-bold">
                            Key passes&nbsp;
                            <span className="text-black">
                              {playerData?.statistics?.[0]?.passes?.key ?? "-"}
                            </span>
                            &nbsp;|&nbsp; Accuracy pass&nbsp;
                            <span className="text-black">
                              {playerData?.statistics?.[0]?.passes?.accuracy ??
                                "-"}
                            </span>
                          </p>
                        </div>
                      </>
                    </GamesPlayerCard>
                    <GamesPlayerCard
                      contentCardIcon={tackleIcon.src}
                      contentCardAlt="tackleIcon"
                      contentCardTitle="Tackle"
                    >
                      <>
                        <div className="flex flex-row items-baseline space-x-2">
                          <p className=" text-3xl font-bold text-gray-700">
                            {playerData?.statistics?.[0]?.tackles?.total ?? "-"}
                          </p>
                          <p className="text-base font-bold">
                            Block&nbsp;
                            <span className="text-black">
                              {playerData?.statistics?.[0]?.tackles?.blocks ??
                                "-"}
                            </span>
                            &nbsp;|&nbsp; Interceptions&nbsp;
                            <span className="text-black">
                              {playerData?.statistics?.[0]?.tackles
                                ?.interceptions ?? "-"}
                            </span>
                          </p>
                        </div>
                      </>
                    </GamesPlayerCard>
                    <GamesPlayerCard
                      contentCardIcon={cardsIcon.src}
                      contentCardAlt="cardsIcon"
                      contentCardTitle="Cards"
                    >
                      <>
                        <div className="flex flex-row space-x-2">
                          <div className="text-3xl font-bold flex flex-row space-x-6 text-gray-700">
                            <div className="flex flex-row space-x-2 items-baseline">
                              <img
                                src={cardsRedIcon.src}
                                alt="cardsRedIconAlt"
                                className="w-4 h-auto"
                              />
                              <span>
                                {playerData?.statistics?.[0]?.cards?.red ?? "-"}
                              </span>
                            </div>
                            <div className="flex flex-row space-x-2 items-baseline">
                              <img
                                src={cardsYellowIcon.src}
                                alt="cardsRedYellowAlt"
                                className="w-4 h-auto"
                              />
                              <span>
                                {playerData?.statistics?.[0]?.cards?.yellow ??
                                  "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    </GamesPlayerCard>
                    <article className="col-span-3">
                      <GamesPlayerCard
                        contentCardIcon={substituteIcon.src}
                        contentCardAlt="substituteIcon"
                        contentCardTitle="Substitutes"
                      >
                        <>
                          <div className="flex flex-row space-x-2 items-baseline">
                            <p className="text-3xl font-bold text-gray-700">
                              {(() => {
                                const subIn =
                                  playerData?.statistics?.[0]?.substitutes
                                    ?.in ?? 0;
                                const subOut =
                                  playerData?.statistics?.[0]?.substitutes
                                    ?.out ?? 0;
                                const subBench =
                                  playerData?.statistics?.[0]?.substitutes
                                    ?.bench ?? 0;

                                const subTotal = subIn + subOut + subBench;
                                return subTotal !== 0 ? subTotal : "-";
                              })()}
                            </p>
                            <p className="text-base font-bold">Total</p>
                          </div>
                          <StackedChart
                            SubstitutesInData={
                              playerData?.statistics?.[0]?.substitutes?.in ??
                              "-"
                            }
                            SubstitutesOutData={
                              playerData?.statistics?.[0]?.substitutes?.out ??
                              "-"
                            }
                            SubstitutesBenchData={
                              playerData?.statistics?.[0]?.substitutes?.bench ??
                              "-"
                            }
                          />
                        </>
                      </GamesPlayerCard>
                    </article>
                    <GamesPlayerCard
                      contentCardIcon={goalIcon.src}
                      contentCardAlt="goalIcon"
                      contentCardTitle="goals"
                    >
                      <>
                        {playerData?.statistics?.[0]?.games?.position ===
                        "Goalkeeper" ? (
                          <DoughnutChart
                            contentCardType="goals"
                            contentCardData={goalsDataGoalKeeper}
                          />
                        ) : (
                          <DoughnutChart
                            contentCardType="goals"
                            contentCardData={goalsDataNotGoalKeeper}
                          />
                        )}
                      </>
                    </GamesPlayerCard>
                    <GamesPlayerCard
                      contentCardIcon={duelsIcon.src}
                      contentCardAlt="duelsIcon"
                      contentCardTitle="duels"
                    >
                      <>
                        <DoughnutChart
                          contentCardType="duels"
                          contentCardData={duelsData}
                        />
                      </>
                    </GamesPlayerCard>
                    <GamesPlayerCard
                      contentCardIcon={dribblesIcon.src}
                      contentCardAlt="dribblesIconcon"
                      contentCardTitle="dribbles"
                    >
                      <>
                        <DoughnutChart
                          contentCardType="dribbles"
                          contentCardData={dribblesData}
                        />
                      </>
                    </GamesPlayerCard>
                  </div>
                </section>
              </section>
            </div>
          ) : (
            <p>No player data available for ID: {id}</p>
          )}
        </div>
      </section>
    </main>
  );
}
