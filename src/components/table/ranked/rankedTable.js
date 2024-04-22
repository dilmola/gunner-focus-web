"use client";

import CustomTable from "../Table";
import Arsenal from "../../../../public/img/arsenal.png";
const UserTablePage = () => {
  const userColumns = [
    { key: "pos", label: "POS" },
    { key: "team", label: "Team" },
    { key: "matchPlay", label: "MP" },
    { key: "win", label: "W" },
    { key: "draw", label: "D" },
    { key: "lose", label: "L" },
    { key: "goalFor", label: "GF" },
    { key: "goalAgainst", label: "GA" },
    { key: "goalDifferent", label: "GD" },
    { key: "points", label: "Points" },
    { key: "lastFive", label: "Last 5" },
  ];

  const userData = [
    {
      pos: 1,
      team: "Manchester United",
      matchPlay: 38,
      win: 28,
      draw: 6,
      lose: 4,
      goalFor: 89,
      goalAgainst: 30,
      goalDifferent: 59,
    },
    {
      pos: 2,
      team: "Chelsea",
      matchPlay: 38,
      win: 26,
      draw: 8,
      lose: 4,
      goalFor: 85,
      goalAgainst: 35,
      goalDifferent: 50,
    },
    {
      pos: 3,
      team: "Liverpool",
      matchPlay: 38,
      win: 25,
      draw: 9,
      lose: 4,
      goalFor: 80,
      goalAgainst: 40,
      goalDifferent: 40,
    },
    {
      pos: 4,
      team: "Manchester City",
      matchPlay: 38,
      win: 24,
      draw: 10,
      lose: 4,
      goalFor: 75,
      goalAgainst: 38,
      goalDifferent: 37,
    },
    {
      pos: 5,
      team: "Tottenham Hotspur",
      matchPlay: 38,
      win: 22,
      draw: 12,
      lose: 4,
      goalFor: 70,
      goalAgainst: 45,
      goalDifferent: 25,
    },
    {
      pos: 6,
      team: "Arsenal",
      matchPlay: 38,
      win: 20,
      draw: 10,
      lose: 8,
      goalFor: 68,
      goalAgainst: 50,
      goalDifferent: 18,
    },
  ];

  return (
    <div className="mb-20">
      <h2 className="uppercase">Ranked</h2>
      <div className="rounded-lg overflow-hidden bg-[#F2F2F2] h-20 flex justify-between mb-2">
        <div className="flex">
          <div className="flex items-center text-center px-8">
            <img src={Arsenal.src} alt="Arsenal" className="h-12" />
          </div>
          <h3 className="flex items-center text-center px-12 uppercase">
            Arsenal
          </h3>
        </div>
        <div className="flex">
          <h3 className="flex items-center text-center uppercase px-8">
            Current Ranked
          </h3>
          <h3 className="flex items-center text-center text-4xl font-semibold px-8">
            #1
          </h3>
        </div>
      </div>
      <CustomTable columns={userColumns} data={userData}/>
    </div>
  );
};

export default UserTablePage;
