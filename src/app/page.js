"use client";
import Welcome from "@/components/welcome/welcome";
import Match from "@/components/match/match";
import Ranked from "@/components/table/ranked/rankedTable";
import Team from "@/components/table/team/teamTable";

export default function Home() {
  return (
    <div>
      <Welcome/>
      <Match />
      <Ranked />
      <Team />
    </div>
  );
}
