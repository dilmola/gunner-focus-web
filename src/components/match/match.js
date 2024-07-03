import CardUpcoming from "@/components/cards/cards-upcoming/card-upcoming";
import CardResult from "@/components/cards/cards-result/card-result";

const match = () => {
  return (
    <div>
      <div className="flex mb-4 items-center">
        <h2 className="font-semibold">Matches</h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mb-20">
        <div className="w-full sm:w-1/2 sm:pr-2 mb-4 sm:mb-0">
          <CardUpcoming />
        </div>
        <div className="w-full sm:w-1/2 sm:pl-2">
          <CardResult />
        </div>
      </div>
    </div>
  );
};

export default match;
