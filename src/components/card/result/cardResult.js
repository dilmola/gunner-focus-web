"use client";
import Arsenal from "../../../../public/img/arsenal.png";

const CardResult = () => {
  return (
    <div className="w-[48%]">
      <div className="rounded-lg bg-[#F6F6F6] h-[14rem]">
        <div className="px-6 py-4">
          <div className="font-bold mb-8 uppercase">Results</div>
          <div className="grid grid-flow-row gap-4 ">
            <div className="grid grid-flow-col">
              <img src={Arsenal.src} alt="Arsenal" className="h-12" />
              <h3 className="flex items-center text-center">Arsenal</h3>
              <div class="grid grid-flow-col rounded-lg bg-[#FFFFFF] items-center text-center">
                <p class="text-4xl font-bold">2</p>
                <p class="text-4xl font-bold text-gray-600">-</p>
                <p class="text-4xl font-bold text-gray-600">1</p>
              </div>
            </div>
            <div className="grid grid-flow-col">
              <img src={Arsenal.src} alt="Arsenal" className="h-12" />
              <h3 className="flex items-center text-center	">Arsenal</h3>
              <div class="grid grid-flow-col rounded-lg bg-[#FFFFFF] items-center text-center">
                <p class="text-4xl font-bold">2</p>
                <p class="text-4xl font-bold text-gray-600">-</p>
                <p class="text-4xl font-bold text-gray-600">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResult;
