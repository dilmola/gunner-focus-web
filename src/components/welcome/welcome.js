"use client";
import React, { useState, useEffect } from "react";

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const welcomeClosed = localStorage.getItem("welcomeClosed");
    const closeTimestamp = localStorage.getItem("closeTimestamp");

    if (welcomeClosed === "true" && closeTimestamp) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - closeTimestamp;

      if (timeDifference < 24 * 60 * 60 * 1000) {
        setIsVisible(false);
      } else {
        localStorage.removeItem("welcomeClosed");
        localStorage.removeItem("closeTimestamp");
      }
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    const currentTime = new Date().getTime();
    localStorage.setItem("welcomeClosed", "true");
    localStorage.setItem("closeTimestamp", currentTime.toString());
  };

  return (
    isVisible && (
      <div className="relative mb-20 rounded-lg sm:p-4 p-2">
        <p className="text-5xl sm:text-7xl font-semibold text-justify mt-8">
          Welcome to <span className="text-amaranthColor">Gunner Focus</span>,
          hub for Arsenal fans.
        </p>
        <button
          className="absolute top-0 right-0 mt-2 mr-1 text-2xl font-bold"
          onClick={handleClose}
        >
          X
        </button>
      </div>
    )
  );
};

export default Welcome;
