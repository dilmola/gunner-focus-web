"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTeam } from "@/context/teamContext";
import { usePlayer } from "@/context/playerContext";
import SectionPlayer from "@/components/sections/section-player";
import SectionStatistics from "@/components/sections/section-statistics";
import NavigationYear from "@/components/navigations/navigation-year";
import SearchWithList from "@/components/searches/search-with-list";
import slugify from "@/utils/slugify";
import PlayerPageSkeleton from "@/components/loaders/loader-skeleton-player";

export default function PlayerPage() {
  const [query, setQuery] = useState("");
  const [seasonYear, setSeasonYear] = useState("2024");
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const { playerData, checkLastFetchTime, loading, error } = usePlayer();
  const { data } = useTeam();
  const { id } = useParams();
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setSelectedPlayerId(id);
      checkLastFetchTime(id, seasonYear);
    }
  }, [id, seasonYear, checkLastFetchTime]);

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

  const playerDataExist =
    playerData?.player?.id === parseInt(id) ? playerData : null;

  return (
    <main className="min-h-screen flex flex-col">
      <h2 className="font-semibold mb-4">Player</h2>
      <div className="relative mb-12 flex-1 h-full" ref={searchRef}>
        <SearchWithList
          query={query}
          setQuery={setQuery}
          filteredData={filteredData}
          handlePlayerClick={handlePlayerClick}
          heightViewportValue={"max-h-screen"}
        />
      </div>
      <section className="mb-12">
        <div>
          {error ? (
            <p>Error: {error}</p>
          ) : loading ? (
            <PlayerPageSkeleton /> 
          ) : playerDataExist ? (
            <Suspense fallback={<PlayerPageSkeleton />}>
              <div className="space-y-16">
                <SectionPlayer playerData={playerData} />
                <section className="space-y-4 text-mirageOpa50Color dark:text-romanceOpa50Color">
                  <NavigationYear
                    handleSeasonClick={handleSeasonClick}
                    seasonYear={seasonYear}
                  />
                  <SectionStatistics playerData={playerData} />
                </section>
              </div>
            </Suspense>
          ) : (
            <p>No player data available for ID: {id}</p>
          )}
        </div>
      </section>
    </main>
  );
}
