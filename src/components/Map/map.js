"use client";
import { useEffect } from "react";
import mapStyles from "../Map/map.json"; 

function Map() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.55502196209543, lng: -0.10873241299370418 },
        zoom: 15,
        mapTypeControlOptions: {
          mapTypeIds: ["styled_map"], // Only display the styled map
        },
      });

      const styledMapType = new window.google.maps.StyledMapType(mapStyles);

      // Set the styled map to the map instance
      map.mapTypes.set("styled_map", styledMapType);
      map.setMapTypeId("styled_map");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "18rem" }}></div>;
}

export default Map;
