"use client";
import Match from "@/components/match/match";
import Ranked from "@/components/table/ranked/rankedTable";
import Team from "@/components/table/team/teamTable";
import useLoading from "@/components/loader/useLoading"; // Adjust the import path based on your project structure
import LoaderAnimation from "@/components/loader/loader";

export default function Home() {
  const isLoading = useLoading();

  return (
    <div>
      <Match />
      <Ranked />
      <Team />
    </div>
  );
}
