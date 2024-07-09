"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { usePlayer } from "../../context/playerContext";
import { useTheme } from "../../context/themeContext";

import DetailIcon from "../../../public/icons/detail-icon.png";
import DetailDarkIcon from "../../../public/icons/detail-dark-icon.png";

import slugify from "../../utils/slugify";
import flags from "../../libs/nationalFlags";
import jerseyNumbers from "../../libs/jerseyNumbers";
import preferredFoot from "../../libs/preferredFoot";

const Modal = ({ onClose, selectedRowData }) => {
  const modalRef = useRef();
  const { playerData, checkLastFetchTime, loading, error } = usePlayer();
  const { theme } = useTheme();

  const router = useRouter();

  const handleClick = () => {
    const playerId = playerData?.player?.id;
    const playerName = playerData?.player?.name || "unknown-player";
    const slug = slugify(playerName);

    router.push(`/player/${playerId}/${slug}`);
  };

  useEffect(() => {
    if (selectedRowData?.idPlayer) {
      checkLastFetchTime(selectedRowData.idPlayer);
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedRowData, checkLastFetchTime, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-gray-500 opacity-65"></div>
      <div className="p-8 rounded z-50 px-2 sm:px-4 md:px-32 py-4 mx-auto max-w-screen-xl container">
        <div
          ref={modalRef}
          className="bg-whitesmokeColor dark:bg-codgreyColor rounded-lg p-2 sm:p-4"
        >
          <div>
            {loading ? (
              <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-black rounded-full spin"></div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div>
                <section className="text-sm font-bold space-y-4 text-mirageOpa50Color dark:text-romanceOpa50Color">
                  <header className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 border-b-2 border-opacity-20 border-gray-600 pb-4 space-y-8 sm:space-y-4 lg:space-y-0">
                    <div className="flex justify-between sm:justify-normal sm:flex-row gap-2">
                      <img
                        src={playerData?.player?.photo}
                        alt={playerData?.player?.photo}
                        className="object-contain h-12 w-12 sm:h-20 sm:w-20 rounded mr-6 bg-[#D9D9D9]"
                      />
                      <div className="flex flex-col font-semibold text-black col-span-2">
                        <h2 className="text-2xl text-mirageColor dark:text-romanceColor">
                          {playerData?.player?.name ?? "-"}
                        </h2>
                        <p className="text-mirageColor dark:text-romanceColor">
                          {playerData?.statistics?.[0]?.games?.position ?? "-"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gainsboroColor dark:bg-montanaColor rounded grid-flow-col justify-center content-center">
                      <div className="grid grid-cols-3 gap-2 px-4">
                        <div className="flex flex-col space-y-4">
                          <p>Captain</p>
                          <p className="font-semibold text-lg text-mirageColor dark:text-romanceColor">
                            {playerData?.statistics?.[0]?.games?.captain
                              ? "Yes"
                              : "-"}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-4">
                          <p>Shirt number</p>
                          <p className="font-semibold text-lg text-mirageColor dark:text-romanceColor">
                            #{jerseyNumbers[playerData?.player?.id] ?? "-"}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-4">
                          <p>Nationality</p>
                          <div className="flex font-semibold text-lg space-x-2 text-mirageColor dark:text-romanceColor">
                            <img
                              src={flags[playerData?.player?.nationality]?.src}
                              alt={playerData?.player?.nationality}
                              className="h-6 rounded"
                            />
                            <p>{playerData?.player?.nationality}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <p>First name</p>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {playerData?.player?.firstname ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Last name</p>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {playerData?.player?.lastname ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Age</p>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {playerData?.player?.age ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Weight</p>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {playerData?.player?.weight ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Height</p>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {playerData?.player?.height ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Preferred foot</p>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {preferredFoot[playerData?.player?.id] ?? "-"}
                      </p>
                    </div>
                    <div>
                      <h3>Appearances</h3>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {playerData?.statistics?.[0]?.games?.appearances ?? "-"}
                      </p>
                    </div>
                    <div>
                      <h3>Minutes</h3>
                      <p className="text-mirageColor dark:text-romanceColor">
                        {playerData?.statistics?.[0]?.games?.minutes ?? "-"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grids-cols-1 sm:grid-cols-3 space-y-2 sm:space-x-4">
                    <div className="hidden bg-gainsboroColor p-4 rounded col-span-2 dark:bg-montanaColor sm:flex flex-col space-y-4">
                      <h3>Birthday</h3>
                      <div className="grid grid-cols-3">
                        <div>
                          <p>Date</p>
                          <p className="text-mirageColor dark:text-romanceColor">
                            {playerData?.player?.birth?.date ?? "-"}
                          </p>
                        </div>
                        <div>
                          <p>Place</p>
                          <p className="text-mirageColor dark:text-romanceColor">
                            {playerData?.player?.birth?.place ?? "-"}
                          </p>
                        </div>
                        <div>
                          <p>Country</p>
                          <div className="flex flex-row space-x-4">
                            <img
                              src={
                                flags[playerData?.player?.birth?.country]?.src
                              }
                              alt={playerData?.player?.birth?.country}
                              className="h-6 rounded"
                            />
                            <p>{playerData?.player?.birth?.country ?? "-"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid place-items-start sm:place-items-end">
                      <button
                        class="flex flex-row space-x-4 items-center bg-mirageColor dark:bg-romanceColor dark:text-mirageColor text-romanceColor rounded px-4 py-2 transition-transform duration-200 ease-in-out hover:[#6A7276] hover:scale-90"
                        onClick={handleClick}
                      >
                        <a>More Details</a>
                        <img
                          src={
                            theme === "light"
                              ? DetailIcon.src
                              : DetailDarkIcon.src
                          }
                          alt="DetailIcon"
                          className="h-2"
                        />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
