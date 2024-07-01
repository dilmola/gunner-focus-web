"use client";

import LightIcon from "../../../../public/icons/light-icon.png";
import DarkIcon from "../../../../public/icons/dark-icon.png";
import { useTheme } from "../../../context/themeContext"; // Adjust path as necessary

const ThemeToggle = ({ className, onClick }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (event) => {
    event.preventDefault();
    toggleTheme();
    onClick && onClick(); // Call parent's onClick if provided
  };

  return (
    <button onClick={handleToggle} className={`flex items-center ${className}`}>
      <img
        src={theme === "light" ? LightIcon.src : DarkIcon.src} // Show dark icon in light mode and vice versa
        alt="Theme Toggle"
        className="h-4"
      />
    </button>
  );
};

export default ThemeToggle;
