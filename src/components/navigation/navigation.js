"use client";

import { useRouter, usePathname } from "next/navigation";
import home from "../../../public/icons/home.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="py-4 px-36 mx-auto max-w-screen-xl container">
      <ul className="flex flex-wrap justify-between	text-sm font-medium text-center text-gray-500">
        <li className="me-2">
          <a
            onClick={() => handleNavigation("/")}
            className={`inline-block p-4 rounded-lg cursor-pointer ${
              pathname === "/"
                ? "bg-orange-500 text-white"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex h-4 ">
              <img src={home.src} alt="home" className="pr-2" />
              <span>Home</span>
            </div>
          </a>
        </li>
        <li className="me-2">
          <a
            onClick={() => handleNavigation("/test")}
            className={`inline-block p-4 rounded-lg cursor-pointer ${
              pathname === "/test"
                ? "bg-orange-500 text-white"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex h-4 ">
              <img src={home.src} alt="home" className="pr-2" />
              <span>About</span>
            </div>
          </a>
        </li>
        <li className="me-2">
          <a
            onClick={() => handleNavigation("/upcoming")}
            className={`inline-block p-4 rounded-lg cursor-pointer ${
              pathname === "/upcoming"
                ? "bg-orange-500 text-white"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex h-4 ">
              <img src={home.src} alt="home" className="pr-2" />
              <span> Upcoming matches</span>
            </div>
          </a>
        </li>
        <li className="me-2">
          <a
            onClick={() => handleNavigation("/matches")}
            className={`inline-block p-4 rounded-lg cursor-pointer ${
              pathname === "/matches"
                ? "bg-orange-500 text-white"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex h-4 ">
              <img src={home.src} alt="home" className="pr-2" />
              <span> Match results</span>
            </div>
          </a>
        </li>
        <li className="me-2">
          <a
            onClick={() => handleNavigation("/player")}
            className={`inline-block p-4 rounded-lg cursor-pointer ${
              pathname === "/player"
                ? "bg-orange-500 text-white"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex h-4 ">
              <img src={home.src} alt="home" className="pr-2" />
              <span>Player</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
