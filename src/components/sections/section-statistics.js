import { useTheme } from "@/context/themeContext";

import substituteIcon from "../../../public/icons/player/substitute-icon.png";
import shotIcon from "../../../public/icons/player/shot-icon.png";
import goalIcon from "../../../public/icons/player/goals-icon.png";
import passesIcon from "../../../public/icons/player/passes-icon.png";
import tackleIcon from "../../../public/icons/player/tackle-icon.png";
import cardsIcon from "../../../public/icons/player/cards-icon.png";
import cardsRedIcon from "../../../public/icons/player/cards-red-icon.png";
import cardsYellowIcon from "../../../public/icons/player/cards-yellow-icon.png";
import penaltyIcon from "../../../public/icons/player/penalty-icon.png";
import foulsIcon from "../../../public/icons/player/fouls-icon.png";
import duelsIcon from "../../../public/icons/player/duels-icon.png";
import dribblesIcon from "../../../public/icons/player/dribbles-icon.png";
import substituteDarkIcon from "../../../public/icons/player/substitute-dark-icon.png";
import shotDarkIcon from "../../../public/icons/player/shot-dark-icon.png";
import goalDarkIcon from "../../../public/icons/player/goals-dark-icon.png";
import passesDarkIcon from "../../../public/icons/player/passes-dark-icon.png";
import tackleDarkIcon from "../../../public/icons/player/tackle-dark-icon.png";
import cardsDarkIcon from "../../../public/icons/player/cards-dark-icon.png";
import cardsRedDarkIcon from "../../../public/icons/player/cards-dark-red-icon.png";
import cardsYellowDarkIcon from "../../../public/icons/player/cards-dark-yellow-icon.png";
import penaltyDarkIcon from "../../../public/icons/player/penalty-dark-icon.png";
import foulsDarkIcon from "../../../public/icons/player/fouls-dark-icon.png";
import duelsDarkIcon from "../../../public/icons/player/duels-dark-icon.png";
import dribblesDarkIcon from "../../../public/icons/player/dribbles-dark-icon.png";

import CardStatisticPlayer from "@/components/cards/card-statistic-player";
import ChartStacked from "@/components/charts/chart-stacked";
import ChartDoughnut from "@/components/charts/chart-doughnut";

export default function SectionStatistics({ playerData }) {
  const { theme } = useTheme();

  const goalsDataGoalKeeper = [
    {
      name: "Conceded",
      value: playerData?.statistics?.[0]?.goals?.conceded ?? 0,
      color: "#780000",
    },
    {
      name: "Saves",
      value: playerData?.statistics?.[0]?.goals?.saves ?? 0,
      color: "#df817a",
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
      color: "#df817a",
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
      color: "#df817a",
    },
  ];

  const dribblesData = [
    {
      name: "Success",
      value: playerData?.statistics?.[0]?.dribbles?.success ?? "-",
      color: "#780000",
    },
    {
      name: "Failed",
      value:
        (playerData?.statistics?.[0]?.dribbles?.attempts ?? "-") -
        (playerData?.statistics?.[0]?.dribbles?.success ?? "-"),
      color: "#df817a",
    },
  ];

  return (
    <section className="bg-whitesmokeColor dark:bg-codgreyColor text-mirageOpa50Color dark:text-romanceOpa50Color rounded-lg p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Penalty Card */}
        <CardStatisticPlayer
          contentCardIcon={
            theme === "light" ? penaltyIcon.src : penaltyDarkIcon.src
          }
          contentCardAlt="penaltyIcon"
          contentCardTitle="Penalty"
        >
          <>
            {playerData?.statistics?.[0]?.games?.position === "Goalkeeper" ? (
              <>
                <div className="flex flex-row space-x-2 items-baseline">
                  <p className="text-3xl font-bold dark:text-romanceColor text-mirageColor">
                    {playerData?.statistics?.[0]?.penalty?.saved ?? "-"}
                  </p>
                  <p className="text-base font-bold">Saved</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row space-x-6">
                  <div className="flex flex-row space-x-2 items-baseline">
                    <p className="text-3xl font-bold dark:text-romanceColor text-mirageColor">
                      {playerData?.statistics?.[0]?.penalty?.scored ?? "-"}
                    </p>
                    <p className="text-base font-bold">Scored</p>
                  </div>
                  <div className="flex flex-row space-x-2 items-baseline">
                    <p className="text-3xl font-bold dark:text-romanceColor text-mirageColor">
                      {playerData?.statistics?.[0]?.penalty?.missed ?? "-"}
                    </p>
                    <p className="text-base font-bold">Missed</p>
                  </div>
                </div>
              </>
            )}
          </>
        </CardStatisticPlayer>

        {/* Fouls Card */}
        <CardStatisticPlayer
          contentCardIcon={
            theme === "light" ? foulsIcon.src : foulsDarkIcon.src
          }
          contentCardAlt="foulsIcon"
          contentCardTitle="Fouls"
        >
          <>
            <p className="text-3xl font-bold dark:text-romanceColor text-mirageColor">
              {playerData?.statistics?.[0]?.fouls?.committed ?? "-"}
            </p>
          </>
        </CardStatisticPlayer>

        {/* Shots Card */}
        <CardStatisticPlayer
          contentCardIcon={theme === "light" ? shotIcon.src : shotDarkIcon.src}
          contentCardAlt="shotIcon"
          contentCardTitle="Shots"
        >
          <>
            <div className="flex flex-col lg:flex-row items-baseline space-x-2">
              <p className=" text-3xl font-bold dark:text-romanceColor text-mirageColor">
                {(() => {
                  const total = playerData?.statistics?.[0]?.shots?.total ?? 0;
                  const onTarget = playerData?.statistics?.[0]?.shots?.on ?? 0;
                  if (total > 0) {
                    const percentage = ((onTarget / total) * 100).toFixed(1);
                    return `${percentage}%`;
                  }
                  return "-";
                })()}
              </p>
              <p className="text-base font-bold">
                Total shot&nbsp;
                <span className="text-mirageColor dark:text-romanceColor">
                  {playerData?.statistics?.[0]?.shots?.total ?? "-"}
                </span>
                &nbsp;|&nbsp; Shot on target&nbsp;
                <span className="text-mirageColor dark:text-romanceColor">
                  {playerData?.statistics?.[0]?.shots?.on ?? "-"}
                </span>
              </p>
            </div>
          </>
        </CardStatisticPlayer>

        {/* Passes Card */}
        <CardStatisticPlayer
          contentCardIcon={
            theme === "light" ? passesIcon.src : passesDarkIcon.src
          }
          contentCardAlt="passesIcon"
          contentCardTitle="Passes"
        >
          <>
            <div className="flex flex-col lg:flex-row items-baseline space-x-2">
              <p className=" text-3xl font-bold dark:text-romanceColor text-mirageColor">
                {playerData?.statistics?.[0]?.passes?.total ?? "-"}
              </p>
              <p className="text-base font-bold">
                Key passes&nbsp;
                <span className="text-mirageColor dark:text-romanceColor">
                  {playerData?.statistics?.[0]?.passes?.key ?? "-"}
                </span>
                &nbsp;|&nbsp; Accuracy pass&nbsp;
                <span className="text-mirageColor dark:text-romanceColor">
                  {playerData?.statistics?.[0]?.passes?.accuracy ?? "-"}
                </span>
              </p>
            </div>
          </>
        </CardStatisticPlayer>

        {/* Tackles Card */}
        <CardStatisticPlayer
          contentCardIcon={
            theme === "light" ? tackleIcon.src : tackleDarkIcon.src
          }
          contentCardAlt="tackleIcon"
          contentCardTitle="Tackle"
        >
          <>
            <div className="flex flex-col lg:flex-row items-baseline space-x-2">
              <p className=" text-3xl font-bold dark:text-romanceColor text-mirageColor">
                {playerData?.statistics?.[0]?.tackles?.total ?? "-"}
              </p>
              <p className="text-base font-bold">
                Block&nbsp;
                <span className="text-mirageColor dark:text-romanceColor">
                  {playerData?.statistics?.[0]?.tackles?.blocks ?? "-"}
                </span>
                &nbsp;|&nbsp; Interceptions&nbsp;
                <span className="text-mirageColor dark:text-romanceColor">
                  {playerData?.statistics?.[0]?.tackles?.interceptions ?? "-"}
                </span>
              </p>
            </div>
          </>
        </CardStatisticPlayer>

        {/* Cards Card */}
        <CardStatisticPlayer
          contentCardIcon={
            theme === "light" ? cardsIcon.src : cardsDarkIcon.src
          }
          contentCardAlt="cardsIcon"
          contentCardTitle="Cards"
        >
          <>
            <div className="flex flex-row space-x-2">
              <div className="text-3xl font-bold flex flex-row space-x-6 dark:text-romanceColor text-mirageColor">
                <div className="flex flex-row space-x-2 items-baseline">
                  <img
                    src={
                      theme === "light"
                        ? cardsRedIcon.src
                        : cardsRedDarkIcon.src
                    }
                    alt="cardsRedIconAlt"
                    className="w-4 h-auto"
                  />
                  <span>{playerData?.statistics?.[0]?.cards?.red ?? "-"}</span>
                </div>
                <div className="flex flex-row space-x-2 items-baseline">
                  <img
                    src={
                      theme === "light"
                        ? cardsYellowIcon.src
                        : cardsYellowDarkIcon.src
                    }
                    alt="cardsRedYellowAlt"
                    className="w-4 h-auto"
                  />
                  <span>
                    {playerData?.statistics?.[0]?.cards?.yellow ?? "-"}
                  </span>
                </div>
              </div>
            </div>
          </>
        </CardStatisticPlayer>

        {/* Substitutes Card */}
        <article className="col-span-0 sm:col-span-2 md:col-span-3">
          <CardStatisticPlayer
            contentCardIcon={
              theme === "light" ? substituteIcon.src : substituteDarkIcon.src
            }
            contentCardAlt="substituteIcon"
            contentCardTitle="Substitutes"
          >
            <>
              <div className="flex flex-row space-x-2 items-baseline">
                <p className="text-3xl font-bold dark:text-romanceColor text-mirageColor">
                  {(() => {
                    const subIn =
                      playerData?.statistics?.[0]?.substitutes?.in ?? 0;
                    const subOut =
                      playerData?.statistics?.[0]?.substitutes?.out ?? 0;
                    const subBench =
                      playerData?.statistics?.[0]?.substitutes?.bench ?? 0;

                    const subTotal = subIn + subOut + subBench;
                    return subTotal !== 0 ? subTotal : "-";
                  })()}
                </p>
                <p className="text-base font-bold">Total</p>
              </div>
              <ChartStacked
                SubstitutesInData={
                  playerData?.statistics?.[0]?.substitutes?.in ?? "-"
                }
                SubstitutesOutData={
                  playerData?.statistics?.[0]?.substitutes?.out ?? "-"
                }
                SubstitutesBenchData={
                  playerData?.statistics?.[0]?.substitutes?.bench ?? "-"
                }
              />
            </>
          </CardStatisticPlayer>
        </article>

        {/* Goals Card */}
        <CardStatisticPlayer
          contentCardIcon={theme === "light" ? goalIcon.src : goalDarkIcon.src}
          contentCardAlt="goalIcon"
          contentCardTitle="Goals"
        >
          <>
            {playerData?.statistics?.[0]?.games?.position === "Goalkeeper" ? (
              <ChartDoughnut
                contentCardType="goals"
                contentCardData={goalsDataGoalKeeper}
              />
            ) : (
              <ChartDoughnut
                contentCardType="goals"
                contentCardData={goalsDataNotGoalKeeper}
              />
            )}
          </>
        </CardStatisticPlayer>

        {/* Duels Card */}
        <CardStatisticPlayer
          contentCardIcon={
            theme === "light" ? duelsIcon.src : duelsDarkIcon.src
          }
          contentCardAlt="duelsIcon"
          contentCardTitle="Duels"
        >
          <>
            <ChartDoughnut
              contentCardType="duels"
              contentCardData={duelsData}
            />
          </>
        </CardStatisticPlayer>

        {/* Dribbles Card */}
        <CardStatisticPlayer
          contentCardIcon={
            theme === "light" ? dribblesIcon.src : dribblesDarkIcon.src
          }
          contentCardAlt="dribblesIcon"
          contentCardTitle="Dribbles"
        >
          <>
            <ChartDoughnut
              contentCardType="dribbles"
              contentCardData={dribblesData}
            />
          </>
        </CardStatisticPlayer>
      </div>
    </section>
  );
}
