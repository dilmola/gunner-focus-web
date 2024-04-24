"use client";
import Arsenal from "../../../public/img/arsenal.png";

const Card = ({
  title,
  bgColor,
  textColor,
  team1,
  team2,
  teams = [],
  scores = [],
  date,
  time,
}) => {
  return (
    <div className="w-[48%]" style={{ color: textColor }}>
      <div
        className={`rounded-lg h-[14rem]`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="px-6 py-4">
          <div className="font-bold mb-8 uppercase">{title}</div>
          {scores.length > 0 ? (
            <div className="grid grid-flow-row gap-4">
              {scores.map((scorePair, index) => (
                <div key={index} className="grid grid-flow-col">
                  <div>
                    <img
                      src={Arsenal.src}
                      alt={teams[index]}
                      className="h-12"
                    />
                  </div>
                  <h3 className="flex items-center text-center">
                    {teams[index]}
                  </h3>
                  <div className="grid grid-flow-col rounded-lg bg-[#FFFFFF] items-center text-center">
                    {scorePair.map((score, idx) => (
                      <>
                        <p
                          key={`score-${idx}`}
                          className={`text-4xl font-bold ${
                            idx === 1 ? "text-gray-600" : ""
                          }`}
                        >
                          {score}
                        </p>
                        {idx === 0 && (
                          <p className="text-4xl font-bold text-gray-600">-</p>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-flow-col gap-4 place-items-center">
              <div>
                <img src={Arsenal.src} alt={team1} className="h-20" />
                <h3 className="text-center">{team1}</h3>
              </div>
              <div className="flex flex-col	">
                <p className="text-center py-2">{date}</p>
                <p className="text-center py-2">VS</p>
                <p className="text-center py-2">{time}</p>
              </div>
              <div>
                <img src={Arsenal.src} alt={team2} className="h-20" />
                <h3 className="text-center">{team2}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
