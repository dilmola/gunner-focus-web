"use client";
import Card from "../card";
import React, { useEffect, useState } from "react";
import fetchUpcoming from "../../../utils/getFixtures";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import noGames from "../../../../public/img/NoGames.png";
import { useData } from "../../../context/upcomingContext";

// const UpcomingCard = ({}) => {
//   const { data, setData } = useData();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const router = useRouter();

//   const handleClick = () => {
//     router.push("/upcoming");
//   };

//   useEffect(() => {
//     const fetchUpcomingData = async () => {
//       try {
//         const response = await fetchUpcoming();

//         if (Array.isArray(response)) {
//           const today = new Date().setHours(0, 0, 0, 0);

//           const upcomingMatches = response.filter((item) => {
//             const fixtureDate = new Date(item?.fixture?.date);
//             return fixtureDate <= today;
//           });

//           upcomingMatches.sort((a, b) => {
//             const aDate = new Date(a?.fixture?.date);
//             const bDate = new Date(b?.fixture?.date);
//             return aDate - bDate;
//           });

//           const firstMatch = upcomingMatches[0] || null;

//           setData(firstMatch);
//           localStorage.setItem("upcomingsData", JSON.stringify(firstMatch));
//           localStorage.setItem("upcomingsLastFetch", Date.now().toString());
//         } else {
//           throw new Error("Unexpected response format");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkLastFetchTime = () => {
//       const lastFetch = parseInt(
//         localStorage.getItem("upcomingsLastFetch"),
//         10
//       );
//       const fetchInterval = 12 * 60 * 60 * 1000;
//       const currentTime = Date.now();

//       if (!lastFetch || currentTime - lastFetch > fetchInterval) {
//         fetchUpcomingData();
//       } else {
//         const storedData = localStorage.getItem("upcomingsData");
//         if (storedData) {
//           setData(JSON.parse(storedData));
//         }
//         setLoading(false);
//       }
//     };

//     checkLastFetchTime();
//   }, []);

//   if (loading) {
//     return (
//       <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
//         <div>
//           <Skeleton height={228} />
//         </div>
//       </SkeletonTheme>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <h3 className="flex items-center text-center uppercase font-semibold">
//           Error
//         </h3>
//         <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-20">
//           <strong>Error:</strong> {error}
//         </div>
//       </div>
//     );
//   }

//   const teamAwayLogo = data?.teams?.away?.logo || "N/A";
//   const teamHomeLogo = data?.teams?.home?.logo || "N/A";
//   const awayTeamName = data?.teams?.away?.name || "N/A";
//   const homeTeamName = data?.teams?.home?.name || "N/A";
//   const matchDate = data?.fixture?.date
//     ? new Date(data?.fixture.date).toLocaleDateString("en-MY")
//     : "N/A";
//   const matchTime = data?.fixture?.date
//     ? new Date(data?.fixture.date).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "N/A";

//   return (
//     <div>
//       <Card
//         title="Upcoming Match:"
//         bgColor="#E63946"
//         hoverColor="#e84c58"
//         textColor="#FFFFFF"
//         handleClick={handleClick}
//         handleClickCondition={true}
//         hoverCondition={true}
//       >
//         <>
//           {data ? (
//             <div className="grid grid-flow-col gap-4 place-items-center items-start mb-6">
//               <div className="w-20">
//                 <div className="flex justify-center mb-4">
//                   <img src={teamAwayLogo} alt={teamAwayLogo} className="h-14" />
//                 </div>
//                 <h3 className="text-center font-semibold">{awayTeamName}</h3>
//               </div>
//               <div className="flex flex-col	">
//                 <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
//                   {matchDate}
//                 </p>
//                 <p className="text-center py-1">VS</p>
//                 <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
//                   {matchTime}
//                 </p>
//               </div>
//               <div className="w-20">
//                 <div className="flex justify-center mb-4">
//                   <img src={teamHomeLogo} alt={teamHomeLogo} className="h-14" />
//                 </div>
//                 <h3 className="text-center font-semibold">{homeTeamName}</h3>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center">
//               <div className="opacity-85">
//                 <img src={noGames.src} alt="noGames" className="h-20" />
//               </div>
//               <p className="font-bold">There are no upcoming match</p>
//             </div>
//           )}
//         </>
//       </Card>
//     </div>
//   );
// };

// export default UpcomingCard;

// const teamAwayLogo = data?.teams?.away?.logo || "N/A";
// const teamHomeLogo = data?.teams?.home?.logo || "N/A";
// const awayTeamName = data?.teams?.away?.name || "N/A";
// const homeTeamName = data?.teams?.home?.name || "N/A";
// const matchDate = data?.fixture?.date
//   ? new Date(data?.fixture.date).toLocaleDateString("en-MY")
//   : "N/A";
// const matchTime = data?.fixture?.date
//   ? new Date(data?.fixture.date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   : "N/A";

//   return (
//     <Card
//       title="Match Results"
//       bgColor="#F6F6F6"
//       hoverColor="#f9f9f9"
//       textColor="#000000"
//       handleClick={handleClick}
//       handleClickCondition={true}
//       hoverCondition={true}
//     >
//       <div className="grid grid-flow-row gap-3">
//         {data.slice(0, 2).map((result, index) => (
//           <div
//             key={index}
//             className="justify-between grid grid-flow-col place-items-center"
//           >
//             {result.homeTeam !== "Arsenal" && (
//               <>
//                 <div className="grid grid-flow-col px-8">
//                   <div className="mr-4">
//                     <img
//                       src={result.homeLogo}
//                       alt={result.homeTeam}
//                       className="h-12"
//                     />
//                   </div>
//                   <h3 className="flex items-center text-center font-semibold">
//                     {result.homeTeam}
//                   </h3>
//                 </div>
//                 <div className="px-8">
//                   <div className="grid grid-flow-col rounded-lg bg-[#e4e4e3] items-center text-center p-2">
//                     <h4 className="text-4xl font-bold text-gray-600">
//                       {result.homeGoals}
//                     </h4>
//                     <span className="mx-2 text-4xl font-bold text-gray-600">
//                       -
//                     </span>
//                     <h4 className="text-4xl font-bold text-gray-600">
//                       {result.awayGoals}
//                     </h4>
//                   </div>
//                 </div>
//               </>
//             )}

//             {result.awayTeam !== "Arsenal" && (
//               <>
//                 <div className="grid grid-flow-col px-8">
//                   <div className="mr-4">
//                     <img
//                       src={result.awayLogo}
//                       alt={result.awayTeam}
//                       className="h-12"
//                     />
//                   </div>
//                   <h3 className="flex items-center text-center font-semibold">
//                     {result.awayTeam}
//                   </h3>
//                 </div>
//                 <div className="px-8">
//                   <div className="grid grid-flow-col rounded-lg bg-[#e4e4e3] items-center text-center p-2">
//                     <h4 className="text-4xl font-bold text-gray-600">
//                       {result.awayGoals}
//                     </h4>
//                     <span className="mx-2 text-4xl font-bold text-gray-600">
//                       -
//                     </span>
//                     <h4 className="text-4xl font-bold text-gray-600">
//                       {result.homeGoals}
//                     </h4>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </Card>
//   );

const UpcomingCard = ({}) => {
  const { data, setData } = useData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleClick = () => {
    router.push("/upcoming");
  };

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const response = await fetchUpcoming();
        if (Array.isArray(response)) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const recentResults = response.filter((item) => {
            const fixtureDate = new Date(item?.fixture?.date);
            return fixtureDate >= today;
          });

          recentResults.sort((a, b) => {
            const aDate = new Date(a?.fixture?.date);
            const bDate = new Date(b?.fixture?.date);
            return bDate - aDate;
          });

          const matchData = recentResults.map((item) => ({
            awayTeam: item?.teams?.away?.name || "N/A",
            homeTeam: item?.teams?.home?.name || "N/A",
            awayLogo: item?.teams?.away?.logo || "",
            homeLogo: item?.teams?.home?.logo || "",
            awayGoals: item?.goals?.away || 0,
            homeGoals: item?.goals?.home || 0,
            fixtureDate: item?.fixture?.date,
            nameOfMatch: item?.league?.name,

            teamHomeResult: item?.teams?.home?.winner,
            teamAwayResult: item?.teams?.away?.winner,
          }));

          setData(matchData);
          localStorage.setItem("upcomingsData", JSON.stringify(matchData));
          localStorage.setItem("upcomingsLastFetch", Date.now().toString());
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    const checkLastFetchTime = () => {
      const lastFetch = parseInt(
        localStorage.getItem("upcomingsLastFetch"),
        10
      );
      const fetchInterval = 12 * 60 * 60 * 1000;
      const currentTime = Date.now();

      if (!lastFetch || currentTime - lastFetch > fetchInterval) {
        fetchResultsData();
      } else {
        const storedData = localStorage.getItem("upcomingsData");
        if (storedData) {
          setData(JSON.parse(storedData));
        }
        setLoading(false);
      }
    };

    checkLastFetchTime();
  }, []);

  if (loading) {
    return (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#888">
        <Skeleton height={228} />
      </SkeletonTheme>
    );
  }

  if (error) {
    return (
      <div>
        <h3 className="flex items-center text-center uppercase font-semibold">
          Error
        </h3>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200 mb-20">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <Card
      title="Upcoming Match:"
      bgColor="#E63946"
      hoverColor="#e84c58"
      textColor="#FFFFFF"
      handleClick={handleClick}
      handleClickCondition={true}
      hoverCondition={true}
    >
      <>
        {data && data.length > 0 ? (
          <div className="grid grid-flow-row gap-3">
            {data.slice(0, 1).map((result, index) => (
              <div key={index}>
                <div className="grid grid-flow-col gap-4 place-items-center items-start mb-6">
                  <div className="w-20">
                    <div className="flex justify-center mb-4">
                      <img
                        src={result.awayLogo}
                        alt={result.awayLogo}
                        className="h-14"
                      />
                    </div>
                    <h3 className="text-center font-semibold">
                      {result.awayTeam}
                    </h3>
                  </div>
                  <div className="flex flex-col	">
                    <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
                      {result.fixtureDate}
                    </p>
                    <p className="text-center py-1">VS</p>
                    <p className="text-center py-1 rounded-lg bg-[#e84c58] items-center px-2">
                      {result.fixtureDate}
                    </p>
                  </div>
                  <div className="w-20">
                    <div className="flex justify-center mb-4">
                      <img
                        src={result.homeLogo}
                        alt={result.homeLogo}
                        className="h-14"
                      />
                    </div>
                    <h3 className="text-center font-semibold">
                      {result.homeTeam}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="opacity-85">
              <img src={noGames.src} alt="noGames" className="h-20" />
            </div>
            <p className="font-bold">There are no upcoming match</p>
          </div>
        )}
      </>
    </Card>
  );
};

export default UpcomingCard;
