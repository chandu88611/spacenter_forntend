"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Static imports
import restaurants from "../public/data/restaurants.json";
import spas from "../public/data/spacenters.json";

// Dynamically import leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

// MapMarker component
const MapMarker = ({ selectedType }) => {
  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const leaflet = require("leaflet");
      setL(leaflet);
      setMapReady(true);
    }

    // Load locations based on selectedType
    if (selectedType === "restaurant") {
      const restaurantData = restaurants.map((r) => ({
        ...r,
        type: "restaurant",
      }));
      setLocations(restaurantData);
    } else if (selectedType === "beauty-spa") {
      const spaData = spas.map((s) => ({
        ...s,
        type: "beauty-spa",
      }));
      setLocations(spaData);
    } else {
      setLocations([]); // no data to show if unknown type
    }
  }, [selectedType]);

  const getCustomIcon = (type) =>
    L?.icon({
      iconUrl:
        type === "restaurant"
          ? "/images/icon/restaurant.png"
          : "/images/icon/spa.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -35],
    });

  if (!mapReady || !L || locations.length === 0) return null;

  return (
    <MapContainer
      center={[12.9718, 77.5946]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full"
      style={{ minHeight: "100vh", width: "100%" }} // Ensure full height
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
      />

      {locations.map((loc, idx) => {
        if (
          !Array.isArray(loc.position) ||
          loc.position.length !== 2 ||
          typeof loc.position[0] !== "number" ||
          typeof loc.position[1] !== "number"
        ) {
          console.warn("Invalid position:", loc);
          return null;
        }

        return (
          <Marker
            key={idx}
            position={loc.position}
            icon={getCustomIcon(loc.type)}
          >
            <Tooltip direction="top" offset={[0, -10]}>
              {loc.name}
            </Tooltip>
            <Popup>
              <div className="p-2 rounded-md shadow bg-white w-[180px] space-y-1">
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  className="rounded w-full h-20 object-cover mb-1"
                />
                <h3 className="font-semibold text-sm text-gray-800">
                  {loc.name}
                </h3>
                <p className="text-xs text-gray-600">{loc.address}</p>
                <p className="text-xs text-gray-500 italic">
                  ⭐ {loc.rating} ({loc.reviewCount} reviews)
                </p>
                <p className="text-xs text-green-600 font-medium">
                  {loc.status} – until {loc.openUntil}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapMarker;
