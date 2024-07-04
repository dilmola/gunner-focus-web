import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "@/context/themeContext";

const PlayerPageSkeleton = () => {
  const { theme } = useTheme();

  const baseColor = theme === "light" ? "#F6F6F61A" : "#393E411A";
  const highlightColor = theme === "light" ? "#F6F6F61A" : "#393E411A";

  return (
    <SkeletonTheme color={baseColor} highlightColor={highlightColor}>
      <div className="space-y-6">
        <Skeleton height={200} />
        <Skeleton height={600} />
      </div>
    </SkeletonTheme>
  );
};

export default PlayerPageSkeleton;
