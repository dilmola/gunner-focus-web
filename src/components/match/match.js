"use client";
import ResultsCard from "@/components/card/result/cardResult";
import UpcomingCard from "@/components/card/upcoming/cardUpcoming";

const match = () => {
  return (
    <div className="mt-10">
      <div className="flex mb-4 items-center">
        <h2 className="uppercase font-semibold leading-4">Matches</h2>
      </div>
      <div className="flex justify-between mb-20">
        <div className="w-1/2 pr-2">
          <UpcomingCard />
        </div>
        <div className="w-1/2 pl-2">
          <ResultsCard />
        </div>
      </div>
    </div>
  );
};

export default match;
