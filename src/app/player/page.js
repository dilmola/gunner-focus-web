"use client";

import { useState, useEffect, useRef } from "react";
import SearchWithList from "@/components/searches/search-with-list";
import { useTeam } from "@/context/teamContext";
import { usePlayer } from "@/context/playerContext";
import { useRouter } from "next/navigation";
import slugify from "@/utils/slugify";

export default function PlayerPage() {
  const { checkLastFetchTime } = usePlayer();
  const { data, loading, error } = useTeam();
  const [query, setQuery] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const searchRef = useRef(null);
  const router = useRouter();

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

  return (
    <main className="min-h-screen flex flex-col">
      <h2 className="font-semibold mb-4">Player</h2>
      <div className="relative mb-12 flex-1 h-full" ref={searchRef}>
        <SearchWithList
          query={query}
          setQuery={setQuery}
          filteredData={filteredData}
          handlePlayerClick={handlePlayerClick}
          heightViewportValue={"max-h-full"}
        />
      </div>
    </main>
  );
}
