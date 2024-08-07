import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../../context/themeContext";

import Home from "../../../public/icons/nav/home-icon.png";
import Upcoming from "../../../public/icons/nav/upcoming-icon.png";
import Result from "../../../public/icons/nav/result-icon.png";
import Player from "../../../public/icons/nav/player-icon.png";
import HomeDark from "../../../public/icons/nav/home-dark-icon.png";
import UpcomingDark from "../../../public/icons/nav/upcoming-dark-icon.png";
import ResultDark from "../../../public/icons/nav/result-dark-icon.png";
import PlayerDark from "../../../public/icons/nav/player-dark-icon.png";

const NavigationTop = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  const linkClass = (path, exact = true) =>
    `inline-block p-2 pb-2 rounded-t-lg cursor-pointer ${
      exact
        ? pathname === path
          ? "font-semibold text-mirageColor border-b-2 border-mirageColor dark:text-romanceColor dark:border-romanceColor"
          : "hover:text-mirageColor hover:border-mirageColor dark:hover:text-romanceColor dark:hover:border-romanceColor hover:border-b-2"
        : pathname.startsWith(path)
        ? "font-semibold text-mirageColor border-b-2 border-mirageColor dark:text-romanceColor dark:border-romanceColor"
        : "hover:text-mirageColor hover:border-mirageColor dark:hover:text-romanceColor dark:hover:border-romanceColor hover:border-b-2"
    }`;

  return (
    <div className="hidden sm:block py-4 px-20 mx-auto max-w-screen-xl container mb-10">
      <ul className="dark:bg-codgreyColor bg-whitesmokeColor px-6 rounded-lg shadow-sm py-2 hidden sm:flex sm:justify-between text-sm font-medium text-center text-mirageOpa50Color dark:text-romanceOpa50Color  border-mirageOpa01Color dark:border-romanceOpa01Color">
        <li>
          <Link href="/" className={linkClass("/")}>
            <div className="flex items-center justify-center">
              <img
                src={theme === "light" ? Home.src : HomeDark.src}
                alt="home"
                className="pr-2 w-6 h-6 object-contain"
              />
              <span className="whitespace-nowrap">Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/upcoming" className={linkClass("/upcoming")}>
            <div className="flex items-center justify-center">
              <img
                src={theme === "light" ? Upcoming.src : UpcomingDark.src}
                alt="upcoming"
                className="pr-2 w-6 h-6 object-contain"
              />
              <span>Upcoming matches</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/matches" className={linkClass("/matches")}>
            <div className="flex items-center justify-center">
              <img
                src={theme === "light" ? Result.src : ResultDark.src}
                alt="result"
                className="pr-2 w-6 h-6 object-contain"
              />
              <span>Matches result</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/player" className={linkClass("/player", false)}>
            <div className="flex items-center justify-center">
              <img
                src={theme === "light" ? Player.src : PlayerDark.src}
                alt="player"
                className="pr-2 w-6 h-6 object-contain"
              />
              <span>Player</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationTop;
