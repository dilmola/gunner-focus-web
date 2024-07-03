import { useTheme } from "../../context/themeContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Home from "../../../public/icons/nav/home-icon.png";
import Upcoming from "../../../public/icons/nav/upcoming-icon.png";
import Result from "../../../public/icons/nav/result-icon.png";
import Player from "../../../public/icons/nav/player-icon.png";
import HomeDark from "../../../public/icons/nav/home-dark-icon.png";
import UpcomingDark from "../../../public/icons/nav/upcoming-dark-icon.png";
import ResultDark from "../../../public/icons/nav/result-dark-icon.png";
import PlayerDark from "../../../public/icons/nav/player-dark-icon.png";
import LightIcon from "../../../public/icons/light-sidebar-icon.png";
import DarkIcon from "../../../public/icons/dark-sidebar-icon.png";

const Sidebar = ({ isOpen, toggleSidebar, handleToggle }) => {
  const { theme } = useTheme();
  const pathname = usePathname();

  const linkClass = (path, exact = true) =>
    `inline-block p-1 rounded-t-lg cursor-pointer ${
      exact
        ? pathname === path
          ? "font-semibold text-mirageColor border-b-2 border-mirageColor dark:text-romanceColor dark:border-romanceColor"
          : "hover:text-mirageColor hover:border-mirageColor dark:hover:text-romanceColor dark:hover:border-romanceColor hover:border-b-2"
        : pathname.startsWith(path)
        ? "font-semibold text-mirageColor border-b-2 border-mirageColor dark:text-romanceColor dark:border-romanceColor"
        : "hover:text-mirageColor hover:border-mirageColor dark:hover:text-romanceColor dark:hover:border-romanceColor hover:border-b-2"
    }`;

  return (
    <div
      className={`fixed inset-y-0 right-0 w-1/2 max-w-sm bg-romanceColor dark:bg-codgreyColor transition-transform transform ${
        isOpen ? "translate-x-0 shadow-left" : "translate-x-full"
      } sm:hidden z-50`}
      style={{ boxShadow: isOpen ? "-4px 0 6px rgba(0, 0, 0, 0.1)" : "none" }}
    >
        <button
          onClick={toggleSidebar}
          className="p-2 text-mirageColor dark:text-romanceColor"
        >
          ✕ 
        </button>
      <ul className="text-sm font-medium text-left px-2 text-mirageOpa50Color dark:text-romanceOpa50Color">
        <li className="my-4">
          <Link href="/" className={linkClass("/")} onClick={toggleSidebar}>
            <div className="flex items-center">
              <img
                src={theme === "light" ? Home.src : HomeDark.src}
                alt="home"
                className="pr-2 h-2"
              />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li className="my-4">
          <Link
            href="/upcoming"
            className={linkClass("/upcoming")}
            onClick={toggleSidebar}
          >
            <div className="flex items-center">
              <img
                src={theme === "light" ? Upcoming.src : UpcomingDark.src}
                alt="upcoming"
                className="pr-2 h-2"
              />
              <span>Upcoming matches</span>
            </div>
          </Link>
        </li>
        <li className="my-4">
          <Link
            href="/matches"
            className={linkClass("/matches")}
            onClick={toggleSidebar}
          >
            <div className="flex items-center">
              <img
                src={theme === "light" ? Result.src : ResultDark.src}
                alt="result"
                className="pr-2 h-2"
              />
              <span>Matches result</span>
            </div>
          </Link>
        </li>
        <li className="my-4">
          <Link
            href="/player"
            className={linkClass("/player", false)}
            onClick={toggleSidebar}
          >
            <div className="flex items-center">
              <img
                src={theme === "light" ? Player.src : PlayerDark.src}
                alt="player"
                className="pr-2 h-2"
              />
              <span>Player</span>
            </div>
          </Link>
        </li>
        <div className="border-t-2 mirageOpa01Color dark:romanceOpa01Color"></div>
        <li className="my-4">
          <div className="inline-block p-1 rounded-t-lg cursor-pointer">
            <button className="flex items-center" onClick={handleToggle}>
              <img
                src={theme === "light" ? LightIcon.src : DarkIcon.src}
                alt="Theme Toggle"
                className="pr-2 h-2"
              />
              <span>Mode</span>
            </button>
          </div>
        </li>
        <li className="my-4">
          <div className="inline-block p-1 rounded-t-lg cursor-pointer">
            <a
              className=""
              href="https://buymeacoffee.com/aidilmaula"
              target="_blank"
            >
              <span>Buy me a coffee</span>
            </a>
          </div>
        </li>
        <li className="my-4">
          <div className="inline-block p-1 rounded-t-lg cursor-pointer">
            <a
              className=""
              href="https://github.com/dilmola/arsenal-website"
              target="_blank"
            >
              <span>Github</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
