"use client";
import Arsenal from "../../../../public/img/arsenal.png";

const CardUpcoming = () => {
  return (
    <div className="w-[48%] text-white">
      <div className="rounded-lg bg-[#E63946] h-[14rem]">
        <div className="px-6 py-4">
          <div className="font-bold mb-8 uppercase">upcoming</div>
          <div className="grid grid-flow-col gap-4 place-items-center">
            <div>
              <img src={Arsenal.src} alt="Arsenal" className="h-20" />
              <h3 className="text-center">Arsenal</h3>
            </div>
            <div>
              <h2 className="text-center">10.4.2024</h2>
              <h3 className="text-center">VS</h3>
              <h4 className="text-center">03:00</h4>
            </div>
            <div>
              <img src={Arsenal.src} alt="Arsenal" className="h-20" />
              <h3 className="text-center">Arsenal</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUpcoming;
