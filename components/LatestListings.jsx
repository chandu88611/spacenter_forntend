import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarRating from "@/components/StarRatings";
import { getBackendUrl } from "@/utils/getBackendUrl";
import { getOperatingStatus } from "@/utils/getOperatingStatus";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaPhoneAlt,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const LatestListings = ({ listings = [] }) => {
  if (!Array.isArray(listings)) return null;
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const formatTime = (timeStr) =>
    new Date(timeStr).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  console.log("GLARY    :::: ", listings);
  return (
    <div
      className="w-full relative overflow-visible"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute top-1/2 -translate-y-1/2 -left-6 z-20 p-0 bg-transparent border-0 cursor-pointer"
        aria-label="Previous slide"
      >
        <div
          className="bg-white shadow-lg hover:bg-gray-100
      border border-gray-300 rounded-full
      w-12 h-12 flex items-center justify-center
      transition-all duration-300 ease-in-out
      hover:scale-105"
        >
          <FaChevronLeft className="text-gray-700 text-lg" />
        </div>
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 -translate-y-1/2 -right-6 z-20 p-0 bg-transparent border-0 cursor-pointer"
        aria-label="Next slide"
      >
        <div
          className="bg-white shadow-lg hover:bg-gray-100
      border border-gray-300 rounded-full
      w-12 h-12 flex items-center justify-center
      transition-all duration-300 ease-in-out
      hover:scale-105"
        >
          <FaChevronRight className="text-gray-700 text-lg" />
        </div>
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay]}
        className="w-full h-[520px]"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        slidesPerView="auto"
        spaceBetween={6}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
          1280: { slidesPerView: 3, spaceBetween: 25 },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {listings.map((listing) => {
          const { operatingHours } = listing || {};
          const timings = operatingHours?.timings || {};
          const currentDay = new Date()
            .toLocaleDateString("en-US", {
              weekday: "long",
            })
            .toLowerCase();
          const today = timings?.[currentDay];

          const statusInfo = getOperatingStatus(timings);
          const isOpen = statusInfo.status === "Open";

          const fromTime = today?.open ? formatTime(today.open) : "N/A";
          const toTime = today?.close ? formatTime(today.close) : "N/A";

          const statusColor =
            statusInfo.status === "Open"
              ? "bg-green-100 text-green-800"
              : statusInfo.status === "Opening Soon"
              ? "bg-yellow-100 text-yellow-800"
              : statusInfo.status === "Closing Soon"
              ? "bg-orange-100 text-orange-800"
              : "bg-red-100 text-red-800";

          return (
            <SwiperSlide key={listing.id} className="flex justify-center">
              <div className="item w-full max-w-[500px] h-[600px] sm:h-[580px] flex flex-col items-center justify-center">
                <div className="card rounded-lg shadow-lg flex flex-col w-full h-full">
                  {/* Image Section */}
                  <div className="relative group h-[180px] sm:h-[160px] overflow-hidden rounded-t-lg w-full">
                    {/* city-businessName-zip-id */}
                    <a
                      href={`/business/${listing?.city}/${listing?.businessName}/${listing?.zip}/${listing?.id}`}
                      className="absolute-link"
                      aria-label={`View ${listing?.businessName} details`}
                    />
                    <img
                      crossOrigin="anonymous"
                      src={`${getBackendUrl()}${
                        listing.galleries?.[0]?.photoUrl ||
                        "/images/default.jpg"
                      }`}
                      alt={listing.imageAltText || listing.businessName}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                      {listing.businessType || "Spa"}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex flex-col flex-grow px-4 py-4 gap-2">
                    <a
                      href={`/business/${listing?.city}/${listing?.businessName}/${listing?.zip}/${listing?.id}`}
                      className="text-dark no-underline hover:underline w-full"
                      aria-label={`View ${listing?.businessName} details`}
                    >
                      <h4 className="text-lg font-semibold truncate">
                        {listing.businessName}
                      </h4>
                    </a>

                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <FaLocationDot />
                      {listing.city}, {listing.state}
                    </p>

                    <p className="text-sm flex items-center gap-2">
                      <FaPhoneAlt />
                      <a
                        href={`tel:${listing.phone}`}
                        className="hover:underline"
                      >
                        {listing.phone}
                      </a>
                    </p>

                    <div className="flex items-center gap-2 text-xs font-medium">
                      <FaClock />
                      <span>
                        {fromTime} - {toTime} •
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded ${statusColor}`}
                        title={`Business is currently ${statusInfo.status}`}
                      >
                        {statusInfo.status}
                      </span>
                    </div>

                    {/* Fixed-height description */}
                    <p className="text-sm text-gray-700 leading-snug line-clamp-3 min-h-[4.5rem]">
                      {listing.description}
                    </p>
                  </div>

                  {/* Rating Section */}
                  <div className="px-4 py-3 border-t flex items-center justify-between">
                    <StarRating rating={listing.averageRating} />
                    <span className="text-sm text-gray-500">
                      {listing.reviewCount} reviews
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LatestListings;
