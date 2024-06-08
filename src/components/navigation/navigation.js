"use client";

import { useRouter, usePathname } from "next/navigation";
import home from "../../../public/icons/home.png";
import club from "../../../public/icons/club.png";
import upcoming from "../../../public/icons/upcoming.png";
import result from "../../../public/icons/result.png";
import player from "../../../public/icons/player.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="py-4 px-20 mx-auto max-w-screen-xl container mb-10">
      <ul className="flex flex-wrap justify-between	text-sm font-medium text-center text-gray-500 border-b-2 border-opacity-20	border-gray-600">
        <li>
          <a
            onClick={() => handleNavigation("/")}
            className={`inline-block p-2 pb-4 rounded-t-lg cursor-pointer ${
              pathname === "/"
                ? "font-semibold text-black border-b-2 border-[#E63946]"
                : "hover:text-black hover:border-black hover:border-b-2"
            }`}
          >
            <div className="flex h-4 ">
              <img src={home.src} alt="home" className="pr-2" />
              <span>Home</span>
            </div>
          </a>
        </li>
        <li>
          <a
            onClick={() => handleNavigation("/club")}
            className={`inline-block p-2 pb-4 rounded-t-lg cursor-pointer ${
              pathname === "/club"
                ? "font-semibold text-black border-b-2 border-[#E63946]"
                : "hover:text-black hover:border-black hover:border-b-2"
            }`}
          >
            <div className="flex h-4 ">
              <img src={club.src} alt="club" className="pr-2" />
              <span>Club</span>
            </div>
          </a>
        </li>
        <li>
          <a
            onClick={() => handleNavigation("/upcoming")}
            className={`inline-block p-2 pb-4 rounded-t-lg cursor-pointer ${
              pathname === "/upcoming"
                ? "font-semibold text-black border-b-2 border-[#E63946]"
                : "hover:text-black hover:border-black hover:border-b-2"
            }`}
          >
            <div className="flex h-4 ">
              <img src={upcoming.src} alt="upcoming" className="pr-2" />
              <span> Upcoming matches</span>
            </div>
          </a>
        </li>
        <li>
          <a
            onClick={() => handleNavigation("/matches")}
            className={`inline-block p-2 pb-4 rounded-t-lg cursor-pointer ${
              pathname === "/matches"
                ? "font-semibold text-black border-b-2 border-[#E63946]"
                : "hover:text-black hover:border-black hover:border-b-2"
            }`}
          >
            <div className="flex h-4 ">
              <img src={result.src} alt="result" className="pr-2" />
              <span>Match results</span>
            </div>
          </a>
        </li>
        <li>
          <a
            onClick={() => handleNavigation("/player")}
            className={`inline-block p-2 pb-4 rounded-t-lg cursor-pointer ${
              pathname === "/player"
                ? "font-semibold text-black border-b-2 border-[#E63946]"
                : "hover:text-black hover:border-black hover:border-b-2"
            }`}
          >
            <div className="flex h-4 ">
              <img src={player.src} alt="player" className="pr-2" />
              <span>Player</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
