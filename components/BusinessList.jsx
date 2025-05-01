// import { useState } from "react";
// import { Star, MessageSquare } from "lucide-react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import restaurants from "../public/data/restaurants.json";

// export default function RestaurantList(businessData) {
//   console.log(businessData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const restaurantsPerPage = 5;
//   const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);
//   const [restaurant, setRestaurant] = useState(
//     restaurants.map((r) => ({ ...r, showFullReview: false }))
//   );
//   const indexOfLast = currentPage * restaurantsPerPage;
//   const indexOfFirst = indexOfLast - restaurantsPerPage;
//   const currentRestaurants = restaurant.slice(indexOfFirst, indexOfLast);

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     // Scroll to top of list or section (optional)
//     const section = document.getElementById("business-section");
//     section?.scrollIntoView({ behavior: "smooth" });
//   };

//   const toggleReadMore = (index) => {
//     setRestaurant((prev) =>
//       prev.map((r, i) =>
//         i === index ? { ...r, showFullReview: !r.showFullReview } : r
//       )
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {currentRestaurants.map((rest, index) => {
//         const realIndex = (currentPage - 1) * restaurantsPerPage + index;
//         return (
//           <div
//             id="business-section"
//             key={realIndex}
//             className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
//           >
//             <div className="w-full md:w-1/2 h-40 md:h-60 overflow-hidden rounded-xl">
//               <img
//                 src={rest.imageUrl}
//                 alt={rest.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Right Details */}
//             <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
//               <div>
//                 <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
//                   {rest.name}
//                 </h3>
//                 <div className="flex items-center mb-2">
//                   {[1, 2, 3, 4, 5].map((star, i) => (
//                     <Star
//                       key={i}
//                       className={`w-3 h-3 md:w-4 md:h-4 mr-1 ${
//                         i < Math.round(rest.rating)
//                           ? "text-yellow-500"
//                           : "text-gray-300"
//                       }`}
//                     />
//                   ))}
//                   <span className="text-xs md:text-sm font-semibold text-gray-700">
//                     {rest.rating}{" "}
//                     <span className="text-gray-500">
//                       ({rest.reviewCount} reviews)
//                     </span>
//                   </span>
//                 </div>
//                 <p
//                   className={`text-xs md:text-sm mb-2 ${
//                     rest.status === "Open" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {rest.status === "Open"
//                     ? `Open until ${rest.openUntil}`
//                     : `Closed - Opens at ${rest.opensAt}`}
//                 </p>

//                 {/* Review Section */}
//                 <div className="flex items-start gap-3 mb-3">
//                   <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-gray-500 mt-1 flex-shrink-0" />
//                   <div>
//                     <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
//                       "
//                       {rest.review.length > 100 && !rest.showFullReview
//                         ? `${rest.review.slice(0, 100)}...`
//                         : rest.review}
//                       "
//                       {rest.review.length > 100 && (
//                         <span
//                           onClick={() => toggleReadMore(index)}
//                           className="text-gray-500 cursor-pointer hover:underline text-xs md:text-sm ml-1"
//                         >
//                           {rest.showFullReview ? "Show less" : "Read more"}
//                         </span>
//                       )}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Dishes Section */}
//                 <div className="flex flex-wrap gap-2">
//                   {rest.dishes.map((dish, i) => (
//                     <span
//                       key={i}
//                       className="px-2 py-1 md:py-2 text-xs md:text-sm rounded-full border border-gray-300 text-black cursor-pointer hover:bg-gray-200 hover:text-gray-900 hover:scale-y-105 transition-all duration-200 ease-in-out inline-block"
//                     >
//                       {dish}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}

//       {/* Pagination */}
//       <div className="flex justify-center items-center space-x-1 mt-6">
//         {/* Prev button */}
//         <div
//           onClick={handlePrev}
//           className={`flex items-center justify-center w-8 h-8 cursor-pointer transition ${
//             currentPage === 1
//               ? "text-gray-400 cursor-not-allowed"
//               : "hover:underline text-gray-700"
//           }`}
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </div>

//         {/* Numbered buttons */}
//         {[...Array(totalPages)].map((_, i) => (
//           <div
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             className={`w-8 h-8 text-xs md:text-sm flex items-center justify-center cursor-pointer transition ${
//               currentPage === i + 1
//                 ? "bg-blue-600 text-white rounded-md"
//                 : "text-gray-700 hover:underline"
//             }`}
//           >
//             {i + 1}
//           </div>
//         ))}

//         {/* Next button */}
//         <div
//           onClick={handleNext}
//           className={`flex items-center justify-center w-8 h-8 cursor-pointer transition ${
//             currentPage === totalPages
//               ? "text-gray-400 cursor-not-allowed"
//               : "hover:underline text-gray-700"
//           }`}
//         >
//           <ChevronRight className="w-4 h-4" />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { getOperatingStatus } from "@/utils/getOperatingStatus";

export default function BusinessList({ businessData }) {
  const businesses = businessData?.data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const businessPerPage = 5;
  const totalPages = Math.ceil(businesses.length / businessPerPage);
  const [business, setBusiness] = useState(
    businesses.map((r) => ({ ...r, showFullReview: false }))
  );
  const indexOfLast = currentPage * businessPerPage;
  const indexOfFirst = indexOfLast - businessPerPage;
  const currentBusiness = businesses.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const section = document.getElementById("business-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleReadMore = (index) => {
    setBusiness((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, showFullReview: !r.showFullReview } : r
      )
    );
  };
  console.log(currentBusiness);
  return (
    <div className="space-y-6">
      {currentBusiness.map((list, index) => {
        const realIndex = (currentPage - 1) * businessPerPage + index;
        const rating = parseFloat(list.averageRating || 0);
        const reviewCount = list.reviewCount || 0;
        const services = Array.isArray(list.services)
          ? list.services.map((s) => s.replace(/[\[\]"]+/g, "").trim())
          : [];
        const { status, message } = getOperatingStatus(
          list.operatingHours?.timings || {}
        );

        return (
          <div
            id="business-section"
            key={realIndex}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="w-full md:w-1/2 h-40 md:h-60 overflow-hidden rounded-xl">
              <img
                crossOrigin="anonymous"
                src={`http://localhost:5000${
                  list.galleries?.[0]?.photoUrl || "/images/default.jpg"
                }`}
                alt={list.imageAltText || list.businessName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                  {list.businessName}
                </h3>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 mr-1 ${
                        i < Math.round(rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs md:text-sm font-semibold text-gray-700">
                    {rating}{" "}
                    <span className="text-gray-500">
                      ({reviewCount} reviews)
                    </span>
                  </span>
                </div>
                {/* <p className="text-xs md:text-sm mb-2 text-green-600">
                  {list.operatingHours?.timings?.statusText ||
                    "Operating hours info coming soon"}
                </p> */}
                <p
                  className={`text-xs md:text-sm mb-2 ${
                    status === "Open" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
                {/* Review/Overview Section */}
                <div className="flex items-start gap-3 mb-3">
                  <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      "
                      {list.overview?.length > 100 && !list.showFullReview
                        ? `${list.overview.slice(0, 100)}...`
                        : list.overview || "No description provided."}
                      "
                      {list.overview?.length > 100 && (
                        <span
                          onClick={() => toggleReadMore(index)}
                          className="text-gray-500 cursor-pointer hover:underline text-xs md:text-sm ml-1"
                        >
                          {list.showFullReview ? "Show less" : "Read more"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {/* Services instead of Dishes */}
                <div className="flex flex-wrap gap-2">
                  {services.map((service, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 md:py-2 text-xs md:text-sm rounded-full border border-gray-300 text-black cursor-pointer hover:bg-gray-200 hover:text-gray-900 hover:scale-y-105 transition-all duration-200 ease-in-out inline-block"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-1 mt-6">
        <div
          onClick={handlePrev}
          className={`flex items-center justify-center w-8 h-8 cursor-pointer transition ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:underline text-gray-700"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </div>

        {[...Array(totalPages)].map((_, i) => (
          <div
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`w-8 h-8 text-xs md:text-sm flex items-center justify-center cursor-pointer transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-white rounded-md"
                : "text-gray-700 hover:underline"
            }`}
          >
            {i + 1}
          </div>
        ))}

        <div
          onClick={handleNext}
          className={`flex items-center justify-center w-8 h-8 cursor-pointer transition ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:underline text-gray-700"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
