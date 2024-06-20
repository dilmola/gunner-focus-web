"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import slugify from "../../utils/slugify";
import fetchPlayers from "../../utils/getPlayer";
import { useTeams } from "../../../src/context/teamContext"; // Import context
import Search from "../../components/filterBar/search";

export default function PlayerPage() {
  useEffect(() => {});

  return (
     <main className="min-h-screen">
     <h2 className="uppercase font-semibold mb-4">Player List</h2>
     <div>
      <Search/>
     </div>
   </main>
  );
}
