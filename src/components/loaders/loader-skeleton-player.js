import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "@/context/themeContext";

const LoaderSkeletonPlayer = () => {
  const { theme } = useTheme();

  const baseColor = theme === "light" ? "#F6F6F633" : "#393E4166";
  const highlightColor = theme === "light" ? "#e0e0e0" : "#444";

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <div className="space-y-6">
        <Skeleton height={200} />
        <Skeleton height={600} />
      </div>
    </SkeletonTheme>
  );
};

export default LoaderSkeletonPlayer;
