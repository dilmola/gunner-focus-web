"use client";
import Match from "@/components/match/match";
import Ranked from "@/components/table/ranked/rankedTable";
import Team from "@/components/table/team/teamTable";

import Modal from "@/components/modal/modal";

export default function Home() {
  return (
    <div>
      <Modal />
      <Match />
      <Ranked />
      <Team />
    </div>
  );
}
