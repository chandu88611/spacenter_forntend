import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import spaCenters from "../public/data/spacenters.json";

export default function SpaCenterList() {
  const [currentPage, setCurrentPage] = useState(1);
  const centersPerPage = 5;
  const totalPages = Math.ceil(spaCenters.length / centersPerPage);

  const [spaCenter, setSpaCenter] = useState(
    spaCenters.map((r) => ({ ...r, showFullReview: false }))
  );

  const indexOfLast = currentPage * centersPerPage;
  const indexOfFirst = indexOfLast - centersPerPage;
  const currentCenters = spaCenter.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleReadMore = (index) => {
    setSpaCenter((prev) =>
      prev.map((r, i) =>
        i === index ? { ...r, showFullReview: !r.showFullReview } : r
      )
    );
  };

  return (
    <div className="space-y-6">
      {currentCenters.map((center, index) => (
        <div
          key={index}
          className="flex bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
        >
          {/* Left Image */}
          <div className="w-full md:w-1/2 h-40 md:h-60 overflow-hidden rounded-xl">
            <img
              src={center.imageUrl}
              alt={center.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Details */}
          <div className="w-3/4 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {center.name}
              </h3>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 mr-1 ${
                      i < Math.round(center.rating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-700 ml-1">
                  {center.rating} ({center.reviewCount} reviews)
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                {center.status === "Open" ? (
                  <span className="text-green-600 font-semibold">Open</span>
                ) : (
                  <span className="text-red-500 font-semibold">Closed</span>
                )}{" "}
                {center.status === "Open"
                  ? ` - Closes at ${center.openUntil}`
                  : ` - Opens at ${center.opensAt}`}
              </p>

              <p className="text-gray-700 text-sm">
                {center.showFullReview
                  ? center.review
                  : `${center.review.slice(0, 120)}...`}
                {center.review.length > 120 && (
                  <span
                    onClick={() => toggleReadMore(index)}
                    className="text-gray-500 cursor-pointer hover:underline text-xs ml-1"
                  >
                    {center.showFullReview ? "Read Less" : "Read More"}
                  </span>
                )}
              </p>

              <div className="flex flex-wrap gap-2">
                {center.services.map((service, i) => (
                  <span
                    key={i}
                    className="px-2 py-2 text-xs rounded-full border border-gray-300 text-black cursor-pointer hover:bg-gray-200 hover:text-gray-900 hover:scale-y-105 transition-all duration-200 ease-in-out inline-block"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-1 mt-6">
        <div
          onClick={handlePrev}
          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
            currentPage === 1
              ? "text-gray-400 pointer-events-none"
              : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </div>

        {[...Array(totalPages)].map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer ${
              currentPage === i + 1
                ? "bg-blue-600 text-white rounded-md"
                : "hover:underline text-gray-700"
            }`}
          >
            {i + 1}
          </div>
        ))}

        <div
          onClick={handleNext}
          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
            currentPage === totalPages
              ? "text-gray-400 pointer-events-none"
              : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
