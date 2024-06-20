"use client";

import { useState, useEffect, useRef } from "react";
import fetchPlayer from "../../utils/getPlayer";
import flags from "../../libs/nationalFlags";
import jerseyNumbers from "../../libs/jerseyNumbers";
import preferredFoot from "../../libs/preferredFoot";
import { useRouter } from "next/navigation";
import slugify from "../../utils/slugify";
import { useTeams } from "../../context/teamContext"; // Import context

const Modal = ({ onClose, selectedRowData }) => {
  const modalRef = useRef();
  const { playerData, setPlayerData } = useTeams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleClick = () => {
    const playerId = playerData?.player?.id;
    const playerName = playerData?.player?.name || "unknown-player";
    const slug = slugify(playerName);

    console.log("Navigating to player:", playerId, slug); // Log before navigation
    router.push(`/player/${playerId}/${slug}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playerId = selectedRowData?.idPlayer;
        const player = await fetchPlayer(playerId);

        localStorage.setItem(`playerData_${playerId}`, JSON.stringify(player));
        localStorage.setItem(
          `playersLastFetchandId_${playerId}`,
          Date.now().toString()
        );
        setPlayerData(player);

        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };

    const checkLastFetchTime = () => {
      const playerId = selectedRowData?.idPlayer;
      const lastFetch = parseInt(
        localStorage.getItem(`playersLastFetchandId_${playerId}`),
        10
      );
      const fetchInterval = 12 * 60 * 60 * 1000; // 12 hours
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchData();
      } else {
        const storedData = localStorage.getItem(`playerData_${playerId}`);
        if (storedData) {
          setPlayerData(JSON.parse(storedData));
        }
        setLoading(false);
      }
    };

    if (selectedRowData?.idPlayer) {
      checkLastFetchTime();
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
  }, [selectedRowData, onClose, setPlayerData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-gray-500 opacity-65"></div>
      <div className="p-8 rounded z-50 px-36 py-4 mx-auto max-w-screen-xl container">
        <div ref={modalRef} className="bg-[#fafafa] rounded-lg p-5">
          <div>
            {loading ? (
              <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-black rounded-full spin"></div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="mt-4">
                <div>ID: {playerData?.player?.id}</div>
                <div className="grid grid-rows-4">
                  <div className="p-4 grid grid-cols-2 border-b-2 border-gray-600">
                    <div className="">
                      <div className="grid grid-cols-3 space-x-4">
                        <img
                          src={playerData?.player?.photo}
                          alt={playerData?.player?.photo}
                          className="h-20 rounded mr-6 bg-[#D9D9D9]"
                        />
                        <div className="flex flex-col font-semibold text-black col-span-2">
                          <div className="text-2xl text-black">
                            {playerData?.player?.name ?? "Name not available"}
                          </div>
                          <div className="text-gray-600">
                            {playerData?.statistics?.[0]?.games?.position ??
                              "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-200 rounded grid-flow-col justify-center content-center ">
                      <div className="grid grid-cols-2 gap-4 px-4">
                        <div className="">
                          <p className="text-gray-600 ">Shirt number:</p>
                          <p className="font-semibold text-lg">
                            {jerseyNumbers[playerData?.player?.id] ?? "-"}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-gray-600">Nationality:</p>
                          <div className="flex flex-row space-x-4">
                            <div className="">
                              <img
                                src={
                                  flags[playerData?.player?.nationality]?.src
                                }
                                alt={playerData?.player?.nationality}
                                className="h-6 rounded"
                              />
                            </div>
                            <p className="font-semibold text-lg">
                              {playerData?.player?.nationality ?? "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-3 space-x-4">
                    <div>
                      <p className="text-gray-600">First name:</p>
                      <p className="font-semibold text-lg">
                        {playerData?.player?.firstname ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last name:</p>
                      <p className="font-semibold text-lg">
                        {playerData?.player?.lastname ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Age:</p>{" "}
                      <p className="font-semibold text-lg">
                        {playerData?.player?.age ?? "-"}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-3 space-x-4">
                    <div>
                      <p className="text-gray-600">Weight:</p>{" "}
                      <p className="font-semibold text-lg">
                        {playerData?.player?.weight ?? "-"}{" "}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Height:</p>{" "}
                      <p className="font-semibold text-lg">
                        {playerData?.player?.height ?? "-"}{" "}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Preferred foot:</p>
                      <p className="font-semibold text-lg">
                        {preferredFoot[playerData?.player?.id] ?? "-"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 space-x-4">
                    <div className="bg-gray-200 p-4 rounded col-span-2">
                      Birthday:
                      <div className="grid grid-cols-3">
                        <div className="">
                          <p className="text-gray-600">date:</p>
                          <p className="font-semibold text-lg">
                            {playerData?.player?.birth?.date ?? "-"}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-gray-600">place:</p>
                          <p className="font-semibold text-lg">
                            {playerData?.player?.birth?.place ?? "-"}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-gray-600">country:</p>
                          <div className="flex flex-row space-x-4">
                            <div className="">
                              <img
                                src={
                                  flags[playerData?.player?.birth?.country]?.src
                                }
                                alt={playerData?.player?.birth?.country}
                                className="h-6 rounded"
                              />
                            </div>
                            <p className="font-semibold text-lg">
                              {playerData?.player?.birth?.country ?? "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid place-items-end">
                      <button
                        className="bg-blue-500 text-white rounded px-4 py-2"
                        onClick={handleClick}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;