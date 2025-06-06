"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { getOperatingStatus } from "@/utils/getOperatingStatus";
import { getBackendUrl } from "@/utils/getBackendUrl";

export default function BusinessList({ 
  businessData, 
  searchQuery = '', 
  locationQuery = '',
  sortOption = 'Recommended'
}) {
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const businessPerPage = 5;
  console.log("buss ::: ",businessData)

  // Apply sorting and filtering
  useEffect(() => {
        let results = []
    if (!businessData?.data) return;
    if (businessData?.data && !businessData?.data?.data){
results = [...businessData?.data];
    }else{
results = [...businessData?.data?.data];
    }
    
    
    // Apply sorting
    switch(sortOption) {
      case "Highest Rated":
        results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case "Most Viewed":
        // Assuming you have a viewCount property
        results.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        break;
      default: // "Recommended"
        // Default sorting (could be based on your backend logic)
        break;
    }

    setFilteredBusinesses(results);
    setCurrentPage(1);
  }, [businessData, sortOption]);

  const totalPages = Math.ceil(filteredBusinesses.length / businessPerPage);
  const [businesses, setBusinesses] = useState(
    filteredBusinesses.map(b => ({ ...b, showFullReview: false }))
  );
  const indexOfLast = currentPage * businessPerPage;
  const indexOfFirst = indexOfLast - businessPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("business-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleReadMore = (index) => {
    setBusinesses(prev => prev.map((b, i) => 
      i === index ? { ...b, showFullReview: !b.showFullReview } : b
    ));
  };

  const decodeAndStripHtml = (htmlString) => {
    if (!htmlString) return "";
    const temp = document.createElement("div");
    temp.innerHTML = htmlString;
    let decoded = temp.textContent || temp.innerText || "";
    while (/<[^>]+>/.test(decoded)) {
      temp.innerHTML = decoded;
      decoded = temp.textContent || temp.innerText || "";
    }
    return decoded.trim();
  };

  if (!businessData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (filteredBusinesses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-700">
          {searchQuery || locationQuery 
            ? "No businesses match your search"
            : "No businesses available"}
        </h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(searchQuery || locationQuery) && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">
            Showing {filteredBusinesses.length} business{filteredBusinesses.length !== 1 ? 'es' : ''}
            {searchQuery && <> for "<span className="font-semibold">{searchQuery}</span>"</>}
            {locationQuery && <> in <span className="font-semibold">{locationQuery}</span></>}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Sorted by: {sortOption}
          </p>
        </div>
      )}

      {currentBusinesses.map((business, index) => {
        const businessUrl = `/business/${business.city}/${business.businessName}/${business.zip}/${business.id}`;
        const rating = parseFloat(business.averageRating || 0);
        const services = Array.isArray(business.services)
          ? business.services.map(s => s.name?.replace(/[\[\]"]+/g, "").trim()).filter(Boolean)
          : [];
        const { status, message } = getOperatingStatus(business.operatingHours?.timings || {});

        return (
          <Link href={businessUrl} key={business.id} passHref>
            <div className="cursor-pointer flex flex-col mb-4 md:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:ring-2 hover:ring-gray-200 transition duration-300">
              <div className="w-full md:w-1/2 h-40 md:h-60 overflow-hidden rounded-xl">
                <img
                  src={`${getBackendUrl()}${business.galleries?.[0]?.photoUrl || "/images/default.jpg"}`}
                  alt={business.imageAltText || business.businessName}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                    {business.businessName}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 mr-1 ${
                          i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs md:text-sm font-semibold text-gray-700">
                      {rating.toFixed(1)} <span className="text-gray-500">({business.reviewCount} reviews)</span>
                    </span>
                  </div>
                  <p className={`text-xs md:text-sm mb-2 ${status === "Open" ? "text-green-600" : "text-red-600"}`}>
                    {message}
                  </p>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                        {business.overview 
                          ? decodeAndStripHtml(business.overview).slice(0, 150) + (decodeAndStripHtml(business.overview).length > 150 ? "..." : "")
                          : "No description available"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {services.slice(0, 5).map((service, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full border border-gray-300 hover:bg-gray-100 transition-all">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="p-2 rounded disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`w-8 h-8 text-sm rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-2 rounded disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}