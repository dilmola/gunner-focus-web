import Link from "next/link";
import { usePathname } from "next/navigation";
import home from "../../../public/icons/home.png";
import club from "../../../public/icons/club.png";
import upcoming from "../../../public/icons/upcoming.png";
import result from "../../../public/icons/result.png";
import player from "../../../public/icons/player.png";

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (path, exact = true) =>
    `inline-block p-2 pb-4 rounded-t-lg cursor-pointer ${
      exact
        ? pathname === path
          ? "font-semibold text-mirageColor border-b-2 border-mirageColor"
          : "hover:text-mirageColor hover:border-mirageColor hover:border-b-2"
        : pathname.startsWith(path)
        ? "font-semibold text-mirageColor border-b-2 border-mirageColor"
        : "hover:text-mirageColor hover:border-mirageColor hover:border-b-2"
    }`;

  return (
    <div className="py-4 px-20 mx-auto max-w-screen-xl container mb-10">
      <ul className="flex flex-wrap justify-between text-sm font-medium text-center text-gray-600 border-b-2 border-opacity-20 border-gray-600">
        <li>
          <Link href="/" className={linkClass("/")}>
            <div className="flex h-4">
              <img src={home.src} alt="home" className="pr-2" />
              <span>Home</span>
            </div>
          </Link>
        </li>
        {/* <li>
          <Link href="/club" className={linkClass("/club")}>
            <div className="flex h-4">
              <img src={club.src} alt="club" className="pr-2" />
              <span>Club</span>
            </div>
          </Link>
        </li> */}
        <li>
          <Link href="/upcoming" className={linkClass("/upcoming")}>
            <div className="flex h-4">
              <img src={upcoming.src} alt="upcoming" className="pr-2" />
              <span>Upcoming matches</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/matches" className={linkClass("/matches")}>
            <div className="flex h-4">
              <img src={result.src} alt="result" className="pr-2" />
              <span>Matches result</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/player" className={linkClass("/player", false)}>
            <div className="flex h-4">
              <img src={player.src} alt="player" className="pr-2" />
              <span>Player</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
