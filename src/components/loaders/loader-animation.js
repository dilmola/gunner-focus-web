"use client";
import FootballLoader from "../../../public/animation/loader_animation.gif";

const LoaderAnimation = () => {
  return (
    <div className="h-screen bg-red-500 relative">
      <div className="bg-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="h-72 lg:h-4/5">
          <img
            src={FootballLoader.src}
            alt="FootballLoader"
            layout="fill"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoaderAnimation;
