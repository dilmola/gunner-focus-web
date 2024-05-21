"use client";

import { useState, useEffect, useRef } from "react";
import fetchPlayer from "../../utils/getPlayer";

const Modal = ({ onClose, selectedRowData }) => {
  const modalRef = useRef();
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [selectedRowData, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-gray-500 opacity-65"></div>
      <div className="p-8 rounded z-50 px-36 py-4 mx-auto max-w-screen-xl container">
        <div ref={modalRef} className="bg-[#E63946] rounded-lg p-5">
          <div>
            {loading ? (
              <div className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-black rounded-full spin"></div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="mt-4">
                <div>ID: {playerData?.player?.id}</div>
                <div>
                  firstname:{" "}
                  {playerData?.player?.firstname ?? "Age not available"}
                </div>
                <div>
                  lastname:{" "}
                  {playerData?.player?.lastname ?? "Age not available"}
                </div>
                <div>
                  name: {playerData?.player?.name ?? "Age not available"}
                </div>
                <div>
                  nationality:{" "}
                  {playerData?.player?.nationality ?? "Age not available"}
                </div>
                <div>
                  weight: {playerData?.player?.weight ?? "Age not available"}
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
