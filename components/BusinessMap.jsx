// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";

// // Static imports
// import restaurants from "../public/data/restaurants.json";
// import spas from "../public/data/spacenters.json";

// // Dynamically import leaflet components
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//   ssr: false,
// });
// const Tooltip = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Tooltip),
//   { ssr: false }
// );

// // MapMarker component
// const MapMarker = ({ selectedType, businessData }) => {

//   const [mapReady, setMapReady] = useState(false);
//   const [L, setL] = useState(null);
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const leaflet = require("leaflet");
//       setL(leaflet);
//       setMapReady(true);
//     }

//     // Load locations based on selectedType
//     if (selectedType === "restaurant") {
//       const restaurantData = restaurants.map((r) => ({
//         ...r,
//         type: "restaurant",
//       }));
//       setLocations(restaurantData);
//     } else if (selectedType === "beauty-spa") {
//       const spaData = spas.map((s) => ({
//         ...s,
//         type: "beauty-spa",
//       }));
//       setLocations(spaData);
//     } else {
//       setLocations([]); // no data to show if unknown type
//     }
//   }, [selectedType]);

//   const getCustomIcon = (type) =>
//     L?.icon({
//       iconUrl:
//         type === "restaurant"
//           ? "/images/icon/restaurant.png"
//           : "/images/icon/spa.png",
//       iconSize: [38, 38],
//       iconAnchor: [19, 38],
//       popupAnchor: [0, -35],
//     });

//   if (!mapReady || !L || locations.length === 0) return null;

//   return (
//     <MapContainer
//       center={[12.9718, 77.5946]}
//       zoom={13}
//       scrollWheelZoom={true}
//       className="w-full h-full"
//       style={{ minHeight: "100vh", width: "100%" }} // Ensure full height
//     >
//       <TileLayer
//         url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
//       />

//       {locations.map((loc, idx) => {
//         if (
//           !Array.isArray(loc.position) ||
//           loc.position.length !== 2 ||
//           typeof loc.position[0] !== "number" ||
//           typeof loc.position[1] !== "number"
//         ) {
//           console.warn("Invalid position:", loc);
//           return null;
//         }

//         return (
//           <Marker
//             key={idx}
//             position={loc.position}
//             icon={getCustomIcon(loc.type)}
//           >
//             <Tooltip direction="top" offset={[0, -10]}>
//               {loc.name}
//             </Tooltip>
//             <Popup>
//               <div className="p-2 rounded-md shadow bg-white w-[180px] space-y-1">
//                 <img
//                   src={loc.imageUrl}
//                   alt={loc.name}
//                   className="rounded w-full h-20 object-cover mb-1"
//                 />
//                 <h3 className="font-semibold text-sm text-gray-800">
//                   {loc.name}
//                 </h3>
//                 <p className="text-xs text-gray-600">{loc.address}</p>
//                 <p className="text-xs text-gray-500 italic">
//                   ⭐ {loc.rating} ({loc.reviewCount} reviews)
//                 </p>
//                 <p className="text-xs text-green-600 font-medium">
//                   {loc.status} – until {loc.openUntil}
//                 </p>
//               </div>
//             </Popup>
//           </Marker>
//         );
//       })}
//     </MapContainer>
//   );
// };

// export default MapMarker;

// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
// import { getOperatingStatus } from "@/utils/getOperatingStatus"; // Adjust path as needed

// // Dynamically import leaflet components
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//   ssr: false,
// });
// const Tooltip = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Tooltip),
//   { ssr: false }
// );

// const MapMarker = ({ selectedType, businessData = [] }) => {
//   const businesses = businessData?.data || [];

//   const [mapReady, setMapReady] = useState(false);
//   const [L, setL] = useState(null);
//   const [locations, setLocations] = useState([]);
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const leaflet = require("leaflet");
//       setL(leaflet);
//       setMapReady(true);
//     }

//     // Properly handle businessData object with .data array
//     if (Array.isArray(businessData?.data)) {
//       console.warn("businessData.data is not an array", businessData);

//       const cleanedData = businessData.data
//         .filter((item) => {
//           const lat = parseFloat(item.latitude);
//           const lon = parseFloat(item.longitude);
//           return (
//             !isNaN(lat) && !isNaN(lon) && typeof item.businessName === "string"
//           );
//         })
//         .map((item) => {
//           const { status, message } = getOperatingStatus(
//             item.timings || item.operatingHours?.timings || {}
//           );

//           return {
//             id: item.id,
//             name: item.businessName,
//             address: `${item.address1 || ""}, ${item.city || ""}`,
//             rating: item.averageRating || "N/A",
//             reviewCount: item.reviewCount || 0,
//             position: [parseFloat(item.latitude), parseFloat(item.longitude)],
//             imageUrl: `http://localhost:5000${
//               item.galleries?.[0]?.photoUrl || "/images/default-placeholder.jpg"
//             }`,
//             status,
//             openUntil: message,
//             type: item.businessType || selectedType,
//           };
//         });

//       setLocations(cleanedData);
//     }
//   }, [businessData, selectedType]);
//   console.log(locations);

//   const getCustomIcon = (type) =>
//     L?.icon({
//       iconUrl:
//         type === "restaurant"
//           ? "/images/icon/restaurant.png"
//           : "/images/icon/spa.png",
//       iconSize: [38, 38],
//       iconAnchor: [19, 38],
//       popupAnchor: [0, -35],
//     });

//   if (!mapReady || !L || locations.length === 0) return null;

//   const center = locations[0]?.position || [12.9718, 77.5946];

//   return (
//     <MapContainer
//       center={center}
//       zoom={13}
//       scrollWheelZoom={true}
//       className="w-full h-full"
//       style={{ minHeight: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
//       />

//       {locations.map((loc, idx) => (
//         <Marker
//           key={idx}
//           position={loc.position}
//           icon={getCustomIcon(loc.type)}
//         >
//           <Tooltip direction="top" offset={[0, -10]}>
//             {loc.name}
//           </Tooltip>
//           <Popup>
//             <div className="p-2 rounded-md shadow bg-white w-[180px] space-y-1">
//               <img
//                 src={loc.imageUrl}
//                 alt={loc.name}
//                 className="rounded w-full h-20 object-cover mb-1"
//               />
//               <h3 className="font-semibold text-sm text-gray-800">
//                 {loc.name}
//               </h3>
//               <p className="text-xs text-gray-600">{loc.address}</p>
//               <p className="text-xs text-gray-500 italic">
//                 ⭐ {loc.rating} ({loc.reviewCount} reviews)
//               </p>
//               <p className="text-xs text-green-600 font-medium">
//                 {loc.status} – until {loc.openUntil}
//               </p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapMarker;
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { getOperatingStatus } from "@/utils/getOperatingStatus"; // Adjust path as needed
import { getBackendUrl } from "@/utils/getBackendUrl";
import { FaPhoneAlt } from "react-icons/fa";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

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

const MapMarker = ({ selectedType, businessData = [] }) => {
  // Check if businessData is an array or a single object
  const isSingleBusiness =
    businessData && businessData.latitude && businessData.longitude;
  const businesses = isSingleBusiness
    ? [businessData]
    : businessData?.data || [];

  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState(null);
  const [locations, setLocations] = useState([]);

  // Effect to load leaflet only once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const leaflet = require("leaflet");
      setL(leaflet);
      setMapReady(true);
    }
  }, []); // run once on mount

  // Effect to process businesses when businessData or selectedType changes
  useEffect(() => {
    // Determine businesses inside effect (to avoid businesses as dep)
    const isSingleBusiness =
      businessData && businessData.latitude && businessData.longitude;
    const businesses = isSingleBusiness
      ? [businessData]
      : businessData?.data || [];

    const cleanedData = businesses
      .filter((item) => {
        const lat = parseFloat(item.latitude);
        const lon = parseFloat(item.longitude);
        return (
          !isNaN(lat) && !isNaN(lon) && typeof item.businessName === "string"
        );
      })
      .map((item) => {
        const { status, message } = getOperatingStatus(
          item.timings || item.operatingHours?.timings || {}
        );
        return {
          id: item.id,
          name: item.businessName,
          address: `${item.address1 || ""}, ${item.city || ""}`,
          phone: item.phone,
          rating: item.averageRating || "N/A",
          reviewCount: item.reviewCount || 0,
          position: [parseFloat(item.latitude), parseFloat(item.longitude)],
          imageUrl: `${getBackendUrl()}${
            item.galleries?.[0]?.photoUrl || "/images/default-placeholder.jpg"
          }`,
          status,
          openUntil: message,
          type: item.businessType || selectedType,
        };
      });

    // Only update locations if data changed (compare IDs)
    setLocations((prev) => {
      const prevIds = prev.map((loc) => loc.id).join(",");
      const newIds = cleanedData.map((loc) => loc.id).join(",");
      if (prevIds !== newIds) {
        return cleanedData;
      }
      return prev;
    });
  }, [businessData, selectedType]);

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

  const center = locations[0]?.position || [12.9718, 77.5946];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
      />

      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={loc.position}
          icon={getCustomIcon(loc.type)}
        >
          <Tooltip direction="top" offset={[0, -5]}>
            {loc.name}
          </Tooltip>
          <Popup>
            <Link
              href={`/business/${loc?.city}/${loc?.businessName}/${loc?.zip}/${loc?.id}`}
              passHref
            >
              <div className="p-3 rounded-lg shadow-lg bg-white w-72 space-y-2 cursor-pointer hover:scale-105 hover:ring-2 hover:ring-blue-300 transition-all duration-200">
                <img
                  crossOrigin="anonymous"
                  src={loc.imageUrl}
                  alt={loc.name}
                  className="rounded-md w-full h-32 object-cover"
                />
                <h3 className="font-semibold text-base text-gray-800">
                  {loc.name}
                </h3>
                <p className="text-sm text-gray-600">{loc.address}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneCall className="w-4 h-4 mr-2 text-gray-500" />
                  {loc.phone}
                </div>
                <p className="text-xs text-gray-500 italic">
                  ⭐ {loc.rating} ({loc.reviewCount} reviews)
                </p>
                <p className="text-xs text-green-600 font-medium">
                  {loc.status} – until {loc.openUntil}
                </p>
              </div>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapMarker;
