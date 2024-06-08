import More from "../../../public/icons/more.png";
import Less from "../../../public/icons/less.png";

const ButtonExpandTable = ({ isExpanded, toggleExpand }) => {
  return (
    <button onClick={toggleExpand} className="px-4 py-2 h-full rounded">
      {isExpanded ? (
        <img src={Less.src} alt="Less" className="h-3" />
      ) : (
        <img src={More.src} alt="More" className="h-3" />
      )}
    </button>
  );
};
export default ButtonExpandTable;
