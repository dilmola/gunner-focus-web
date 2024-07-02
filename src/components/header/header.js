import { useState } from "react";

import Logo from "../../../public/logos/logo.png";
import LogoDark from "../../../public/logos/logo-dark.png";
import Github from "../../../public/icons/github_icon.png";
import BMAC from "../../../public/logos/bmac-logo.png";
import BMACDark from "../../../public/logos/bmac-dark-logo.png";

import Sidebar from "@/components/navigation/sidebar"; // Import the new Sidebar component
import { useTheme } from "../../context/themeContext";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/button/theme-toggle/theme-toggle";

const Header = ({ onClick }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    router.push("/");
  };
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleToggle = (event) => {
    event.preventDefault();
    toggleTheme();
    onClick && onClick(); // Call parent's onClick if provided
  };

  return (
    <div className="border-b-2 border-slate-950/20">
      <div className="py-4 px-4 sm:px-20 mx-auto max-w-screen-xl container">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleClick}
          >
            <img
              src={theme === "light" ? Logo.src : LogoDark.src}
              alt="logo"
              className="h-6 mr-2"
            />
          </div>
          <div className="flex justify-between">
            <a
              className="hidden sm:flex mr-4 bg-mirageColor hover:bg-[#464c50] dark:bg-romanceColor dark:hover:bg-[#FFFFFF] rounded py-2 px-4"
              href="https://buymeacoffee.com/aidilmaula"
              target="_blank"
            >
              <img
                src={theme === "light" ? BMAC.src : BMACDark.src}
                alt="logo"
                className="h-4"
              />
            </a>
            <a
              className="hidden sm:flex bg-amaranthColor hover:bg-[#EE4A57] font-bold py-2 px-4 rounded mr-4 items-center"
              href="https://github.com/dilmola/arsenal-website"
              target="_blank"
            >
              <img src={Github.src} alt="Github" className="h-5" />
            </a>
            <ThemeToggle className="hidden sm:flex bg-mirageColor dark:bg-romanceColor dark:hover:bg-[#FFFFFF] hover:bg-[#464c50] font-bold py-2 px-4 rounded items-center cursor-pointer" />
          </div>
          {/* Toggle button for sidebar */}
          <div className="sm:hidden flex justify-end">
            <button
              onClick={toggleSidebar}
              className="p-2 text-mirageColor dark:text-romanceColor"
            >
              ☰ {/* Replace this with an icon if desired */}
            </button>
          </div>

          {/* Sidebar */}
          <Sidebar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            handleToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
