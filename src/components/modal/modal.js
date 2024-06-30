"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { usePlayer } from "../../context/playerContext";
import moreIcon from "../../../public/icons/more-icon.png";
import slugify from "../../utils/slugify";
import flags from "../../libs/nationalFlags";
import jerseyNumbers from "../../libs/jerseyNumbers";
import preferredFoot from "../../libs/preferredFoot";

const Modal = ({ onClose, selectedRowData }) => {
  const modalRef = useRef();
  const { playerData, checkLastFetchTime, loading, error } = usePlayer();

  const router = useRouter();

  const handleClick = () => {
    const playerId = playerData?.player?.id;
    const playerName = playerData?.player?.name || "unknown-player";
    const slug = slugify(playerName);

    console.log("Navigating to player:", playerId, slug);
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
      <div className="p-8 rounded z-50 px-36 py-4 mx-auto max-w-screen-xl container">
        <div ref={modalRef} className="bg-whitesmokeColor rounded-lg p-5">
          <div>
            {loading ? (
              <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-black rounded-full spin"></div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="mt-4">
                <section className="text-sm font-bold space-y-4 text-slate-700/50">
                  <header className="grid grid-cols-2 border-b-2 border-opacity-20 border-gray-600 pb-4">
                    <div className="flex flex-row gap-2">
                      <img
                        src={playerData?.player?.photo}
                        alt={playerData?.player?.photo}
                        className="h-20 rounded mr-6 bg-[#D9D9D9]"
                      />
                      <div className="flex flex-col font-semibold text-black col-span-2">
                        <h2 className="text-2xl text-black">
                          {playerData?.player?.name ?? "-"}
                        </h2>
                        <p className="text-gray-600">
                          {playerData?.statistics?.[0]?.games?.position ?? "-"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gainsboroColor rounded grid-flow-col justify-center content-center">
                      <div className="grid grid-cols-3 gap-2 px-4">
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
                      </div>
                    </div>
                  </header>
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <p>First name</p>
                      <p className="text-gray-700">
                        {playerData?.player?.firstname ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Last name</p>
                      <p className="text-gray-700">
                        {playerData?.player?.lastname ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Age</p>
                      <p className="text-gray-700">
                        {playerData?.player?.age ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Weight</p>
                      <p className="text-gray-700">
                        {playerData?.player?.weight ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Height</p>
                      <p className="text-gray-700">
                        {playerData?.player?.height ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p>Preferred foot</p>
                      <p className="text-gray-700">
                        {preferredFoot[playerData?.player?.id] ?? "-"}
                      </p>
                    </div>
                    <div>
                      <h3>Appearances</h3>
                      <p className="text-gray-700">
                        {playerData?.statistics?.[0]?.games?.appearances ?? "-"}
                      </p>
                    </div>
                    <div>
                      <h3>Minutes</h3>
                      <p className="text-gray-700">
                        {playerData?.statistics?.[0]?.games?.minutes ?? "-"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 space-x-4">
                    <div className="bg-gainsboroColor p-4 rounded col-span-2">
                      <h3>Birthday</h3>
                      <div className="grid grid-cols-3">
                        <div>
                          <p>Date</p>
                          <p className="text-gray-700">
                            {playerData?.player?.birth?.date ?? "-"}
                          </p>
                        </div>
                        <div>
                          <p>Place</p>
                          <p className="text-gray-700">
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
                    <div className="grid place-items-end">
                      <button
                        class="flex flex-row space-x-4 items-center bg-mirageColor text-romanceColor rounded px-4 py-2 transition-transform duration-200 ease-in-out hover:[#6A7276] hover:scale-90"
                        onClick={handleClick}
                      >
                        <a>More Details</a>
                        <img
                          src={moreIcon.src}
                          alt="moreIcon"
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
