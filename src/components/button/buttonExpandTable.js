import MoreIcon from "../../../public/icons/more-icon.png";
import MoreDarkIcon from "../../../public/icons/more-dark-icon.png";
import LessIcon from "../../../public/icons/less-icon.png";
import LessDarkIcon from "../../../public/icons/less-dark-icon.png";

import { useTheme } from "../../context/themeContext";

const ButtonExpandTable = ({ isExpanded, toggleExpand, iconBlack }) => {
  const { theme } = useTheme();

  return (
    <button onClick={toggleExpand} className="px-1 h-full">
      {isExpanded ? (
        <img
          src={theme === "light" && iconBlack ? LessDarkIcon.src : LessIcon.src}
          alt="logo"
          className="h-2"
        />
      ) : (
        <img
          src={theme === "light" && iconBlack ? MoreDarkIcon.src : MoreIcon.src}
          alt="logo"
          className="h-2"
        />
      )}
    </button>
  );
};
export default ButtonExpandTable;
