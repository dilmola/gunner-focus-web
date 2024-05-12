"use client";
import Match from "@/components/match/match";
import Ranked from "@/components/table/ranked/rankedTable";
import Team from "@/components/table/team/teamTable";

export default function Home() {
  return (
    <div>
      <Match />
      <Ranked />
      <Team />
    </div>
  );
}
