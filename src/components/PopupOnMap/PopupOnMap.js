// components/MapWithPopup.js

import { useState } from "react";

const MapWithPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  const handleMouseMove = (e) => {
    setPopupPosition({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  return (
    <div className="rounded-lg mb-11">
      <h2 className="font-semibold text-2xl">
        Where is <span className="text-red-500">Arsenal?</span>
      </h2>
      <div className="rounded-lg overflow-hidden">
        <div className="h-72 relative">
          <div
            className="flex items-center justify-center relative w-full h-full bg-gray-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <Map />
            {showPopup && (
              <div
                className="absolute bg-gray-200 text-black p-2 rounded shadow-lg"
                style={{
                  left: `${popupPosition.x}px`,
                  top: `${popupPosition.y}px`,
                }}
              >
                hello
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapWithPopup;

const Map = () => {
  // Placeholder for the actual map component
  return <div className="bg-blue-500 w-full h-full"></div>;
};
