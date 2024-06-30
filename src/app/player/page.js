"use client";

import { useState, useEffect, useRef } from "react";
import Search from "../../components/filterBar/search";
import { useTeam } from "../../context/teamContext";
import { usePlayer } from "../../context/playerContext";
import { useRouter } from "next/navigation";
import slugify from "../../utils/slugify";

export default function PlayerPage({ player }) {
  const { checkLastFetchTime } = usePlayer();
  const { data, loading, error } = useTeam();
  const [query, setQuery] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const searchRef = useRef(null);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className=""></div>
    </main>
  );
}
