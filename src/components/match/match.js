"use client";
import CardResult from "@/components/card/result/cardResult";
import CardUpcoming from "@/components/card/upcoming/cardUpcoming";

const match = () => {
  return (
    <div className="mt-10">
      <h1>Matches</h1>
      <div className="flex justify-between mb-20">
        <CardUpcoming />
        <CardResult />
      </div>
    </div>
  );
};

export default match;
