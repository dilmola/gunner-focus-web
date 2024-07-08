import LightIcon from "../../../../public/icons/light-icon.png";
import DarkIcon from "../../../../public/icons/dark-icon.png";
import { useTheme } from "../../../context/themeContext";

const ThemeToggle = ({ className, onClick }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (event) => {
    event.preventDefault();
    toggleTheme();
    onClick && onClick(); 
  };

  return (
    <button onClick={handleToggle} className={`flex items-center ${className}`}>
      <img
        src={theme === "light" ? LightIcon.src : DarkIcon.src}
        alt="Theme Toggle"
        className="h-4"
      />
    </button>
  );
};

export default ThemeToggle;