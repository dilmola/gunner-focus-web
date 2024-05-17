"use client";
import FootballLoader from "../../../public/animation/loader_animation.gif";

const LoaderAnimation = () => {
  return (
    <div className="h-screen bg-red-500 relative">
      <div className=" bg-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src={FootballLoader.src}
          alt="FootballLoader"
          className="h-2/4 mx-auto"
        />
      </div>
    </div>
  );
};

export default LoaderAnimation;
