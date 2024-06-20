"use client";

import { useParams } from "next/navigation";

import { useTeams } from "../../../../context/teamContext";

export default function PlayerPage() {
  const { id } = useParams();
  const { playerData } = useTeams();
  const player =
    playerData?.player?.id === parseInt(id) ? playerData.player : null;

  console.log("Player id:", id);
  console.log("Player Data:", playerData);
  console.log("Player ID from playerData:", playerData?.player?.id);
  console.log("Player:", player);

  return (
    <main className="h-screen p-8">
      <div>Player ID: {id}</div>
      <div className="grid grid-cols-3 gap-4">
        {player ? (
          <div className="border p-4 rounded">
            <div>ID: {player.id}</div>
            <div>Name: {player.name}</div>
            <div>Firstname: {player.firstname}</div>
            <div>Lastname: {player.lastname}</div>
            <div>Age: {player.age}</div>
            <div>Birth Date: {player.birth.date}</div>
            <div>Birth Place: {player.birth.place}</div>
            <div>Nationality: {player.nationality}</div>
            <div>Height: {player.height}</div>
            <div>Weight: {player.weight}</div>
            {/* Add more details as needed */}
          </div>
        ) : (
          <p>No player data available for ID: {id}</p>
        )}
      </div>
    </main>
  );
}
