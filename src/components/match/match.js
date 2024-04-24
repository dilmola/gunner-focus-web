"use client";
import ResultsCard from "@/components/card/result/cardResult";
import UpcomingCard from "@/components/card/upcoming/cardUpcoming";
import Matches from "../../../public/icons/matches.png";

const match = () => {
  return (
    <div className="mt-10">
      <div className="flex mb-4 items-center">
        <div className="flex p-1 rounded bg-[#D9D9D9] mr-2">
          <img src={Matches.src} alt="Logo" className="h-6" />
        </div>
        <h2 className="uppercase font-semibold leading-4">Matches</h2>
      </div>
      <div className="flex justify-between mb-20">
        <UpcomingCard />
        <ResultsCard />
      </div>
    </div>
  );
};

export default match;
