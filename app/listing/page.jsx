"use client";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ChevronDown, Filter } from "lucide-react";
import React, { Suspense, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import MapMarker from "@/components/BusinessMap";
import FilterPanel from "@/components/FilterPanel";
import BusinessList from "@/components/BusinessList";
import { useSearchParams } from 'next/navigation';
import { useGetAllBusinessesQuery } from "@/redux/services/businessApi";

// Move the main component logic to a separate component that can be wrapped in Suspense
function ListingContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const locationParam = searchParams.get('location') || 'Bangalore, KA';
  
  const locationQuery = typeof locationParam === 'string' 
    ? locationParam 
    : locationParam?.city 
      ? `${locationParam.city}, ${locationParam.state || ''}`.trim()
      : 'Bangalore, KA';

  const [sort, setSort] = useState("Recommended");
  const [filters, setFilters] = useState({});
  
  const type = searchParams.get('type') || 'Restaurants';
  const category = type;

  const { data: businessData, isLoading, error } = useGetAllBusinessesQuery({
    search: searchQuery,
    location: locationQuery,
    sort,
    ...filters
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-700">
          Error loading businesses
        </h3>
        <p className="text-gray-500 mt-2">
          {error.message || "Please try again later"}
        </p>
      </div>
    );
  }
  return (
    <div className=" h-[calc(100vh-100px)] mt-[100px] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 bg-white px-4 md:px-0">
      <div className="h-full overflow-y-auto pl-0 md:pl-12 md:pr-6 py-6 space-y-6 scrollbar-hidden">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-1 mb-1 text-sm md:text-base">
          <span className="font-semibold text-gray-800 cursor-pointer">
            {searchQuery ? `Search: ${searchQuery}` : category}
          </span>
          {locationQuery && (
            <>
              <ChevronRightIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
              <span className="font-medium text-gray-500 cursor-pointer">
                {locationQuery}
              </span>
            </>
          )}
        </div>

        {/* Heading and Sort */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <h3 className="text-sm md:text-xs font-semibold text-gray-900">
            Best {type} near {locationQuery}
          </h3>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <span className="text-sm text-gray-700">Sort:</span>
            <div className="relative">
              <button
                onClick={() => setSort(sort === "open" ? "" : "open")}
                aria-haspopup="listbox"
                aria-expanded={sort === "open" ? "true" : "false"}
                role="button"
                className="flex items-center gap-1 text-sm text-gray-800 hover:text-black"
              >
                <span className="font-bold">{"Recommended"}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {sort === "open" && (
                <div className="absolute left-0 mt-2 bg-white shadow-xl rounded-xl py-2 z-20 min-w-[150px]">
                  {["Recommended", "Highest Rated", "Most Viewed"].map(
                    (option) => (
                      <div
                        key={option}
                        role="option"
                        onClick={() => {
                          setSort(option);
                        }}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-left items-center space-x-2 py-2">
          <MdOutlineRestaurantMenu className="text-lg" />
          <h5 className="text-sm font-semibold text-gray-800">
            Takeout options
          </h5>
          <span className="text-xs font-semibold text-gray-700">Sponsored</span>
          <button className="group relative">
            <FiInfo className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
            <div className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap z-10 shadow-lg">
              This is a sponsored listing
            </div>
          </button>
        </div>

        <FilterPanel />

        {/* Listings */}
        <div className="flex-1 overflow-y-auto">
          <BusinessList 
            businessData={businessData} 
            searchQuery={searchQuery}
            locationQuery={locationQuery}
            sortOption={sort}
          />
        </div>
      </div>

      {/* Right Column (Map) */}
      <div className="h-full sticky top-[100px] hidden lg:block">
        <div className="h-full w-full min-h-[400px] overflow-hidden border rounded">
          <MapMarker businesses={businessData?.data || []} />
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-[calc(100vh-100px)]">Loading search parameters...</div>}>
      <ListingContent />
    </Suspense>
  );
}

export default Page;