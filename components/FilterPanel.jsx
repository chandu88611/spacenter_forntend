import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2"; // Very similar!

export default function FilterSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAllSuggested, setShowAllSuggested] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [categoryType, setCategoryType] = useState("spa");
  const [filterCount, setFilterCount] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const priceFilters = ["₹", "₹₹", "₹₹₹", "₹₹₹₹"];

  const suggestedOptions = [
    "Open Now",
    "Free Wi-Fi",
    "Good for Dinner",
    "Offers Takeout",
    "Outdoor seating",
    "By Appointment Only",
    "Offers Delivery",
    "Pet Friendly",
    "Outdoor Seating",
    "Accepts Credit Cards",
    "Offers Military Discount",
    "Parking Available",
    "Wheelchair Accessible",
  ];

  const spaCategories = [
    "Massage",
    "Facials",
    "Aromatherapy",
    "Hot Stone Massage",
    "Body Wraps",
    "Sauna",
    "Reflexology",
    "Hydrotherapy",
    "Manicure & Pedicure",
    "Waxing",
  ];

  const restaurantCategories = [
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Japanese",
    "American",
    "Thai",
    "Mediterranean",
    "French",
    "Vegan",
  ];

  const handleToggle = () => setIsSidebarOpen(!isSidebarOpen);

  const handleFilterChange = () => setFilterCount(filterCount + 1);

  const handlePriceInput = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
    setFilterCount(filterCount + 1);
  };

  return (
    <div className="relative">
      <div className="flex space-x-2 mb-4 text-xs">
        {/* All button */}
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-1 px-4 py-2 rounded-full text-black border border-gray-300 cursor-pointer hover:bg-gray-200 hover:shadow-sm transition"
        >
          <HiAdjustmentsHorizontal className="w-4 h-4" />
          <span>All</span>
        </div>

        {/* Price with dropdown */}
        {/* <div className="flex items-center gap-1 px-4 py-2 rounded-full text-black border border-gray-300 cursor-pointer hover:bg-gray-200 hover:shadow-sm transition">
          <span>Price</span>
          <FiChevronDown className="w-3.5 h-3.5" />
        </div> */}

        {/* Suggested Chips */}
        {suggestedOptions.slice(0, 5).map((option, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-full text-black border border-gray-300 cursor-pointer hover:bg-gray-200 hover:shadow-sm transition whitespace-nowrap"
          >
            {option}
          </div>
        ))}
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="w-72 bg-white p-4 flex flex-col h-full justify-between overflow-y-auto relative z-50">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-2 right-2 text-black"
            >
              <FiX className="w-4 h-4" />
            </button>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">{filterCount} Filters</p>
                <button
                  onClick={() => setFilterCount(0)}
                  className="text-sm text-blue-600"
                >
                  Clear
                </button>
              </div>
              {/* INR Price */}
              {/* Symbol	Meaning
                ₹	Below ₹300 per person
                ₹₹	₹300 - ₹700 per person
                ₹₹₹	₹700 - ₹1500 per person
                ₹₹₹₹	₹1500+ per person */}
              <div className="flex border border-gray-300 rounded-full overflow-hidden w-fit">
                {["₹", "₹₹", "₹₹₹", "₹₹₹₹"].map((price, idx) => (
                  <div
                    key={idx}
                    className={`
        flex items-center justify-center px-2 py-2 text-black bg-white cursor-pointer
        ${idx === 0 ? "rounded-l-full" : ""}
        ${idx === 3 ? "rounded-r-full" : ""}
        ${idx !== 0 && idx !== 3 ? "border-l border-gray-300" : ""}
        hover:bg-gray-200 transition
      `}
                    style={{ lineHeight: "1", whiteSpace: "nowrap" }}
                  >
                    {price}
                  </div>
                ))}
              </div>

              {/* Suggested */}
              <div>
                <p className="font-semibold mb-2">Suggested</p>
                {(showAllSuggested
                  ? suggestedOptions
                  : suggestedOptions.slice(0, 5)
                ).map((item, i) => (
                  <div key={i} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      onChange={handleFilterChange}
                      className="mb-2"
                    />
                    <label className="ml-2 mb-2">{item}</label>
                  </div>
                ))}
                {suggestedOptions.length > 5 && (
                  <button
                    onClick={() => setShowAllSuggested(!showAllSuggested)}
                    className="text-blue-600 text-sm mt-1"
                  >
                    {showAllSuggested ? "See Less" : "See All"}
                  </button>
                )}
              </div>
              {/* Categories */}
              <div>
                <p className="font-semibold mb-2">Categories</p>
                <div className="flex space-x-2 gap-2 mb-2">
                  <button
                    onClick={() => setCategoryType("restaurant")}
                    className={`px-2 py-1 rounded ${
                      categoryType === "restaurant"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Restaurant
                  </button>
                  <button
                    onClick={() => setCategoryType("spa")}
                    className={`px-2 py-1 rounded ${
                      categoryType === "spa"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Spa
                  </button>
                </div>
                {(showAllCategories
                  ? categoryType === "restaurant"
                    ? restaurantCategories
                    : spaCategories
                  : categoryType === "restaurant"
                  ? restaurantCategories.slice(0, 5)
                  : spaCategories.slice(0, 5)
                ).map((cat, i) => (
                  <div key={i} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      onChange={handleFilterChange}
                      className="mb-2"
                    />
                    <label className="mb-2 ml-2">{cat}</label>
                  </div>
                ))}
                {(restaurantCategories.length > 5 ||
                  spaCategories.length > 5) && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-blue-600 text-sm mt-1"
                  >
                    {showAllCategories ? "See Less" : "See All"}
                  </button>
                )}
              </div>
              {/* Distance */}
              <div>
                <p className="font-semibold mb-2">Distance</p>
                {[
                  "Bird's-eye View",
                  "Driving (5 mi.)",
                  "Biking (2 mi.)",
                  "Walking (1 mi.)",
                  "Within 4 blocks",
                ].map((d, i) => (
                  <div key={i} className="flex items-center mb-1">
                    <input
                      type="radio"
                      name="distance"
                      onChange={handleFilterChange}
                      className="mb-2"
                    />
                    <label className="mb-2 ml-2">{d}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 border-t pt-4 mt-4 bg-white sticky bottom-0">
              <button
                onClick={handleToggle}
                className="w-1/2 py-2 border rounded mr-2"
              >
                Cancel
              </button>
              <button className="w-1/2 py-2 bg-blue-600 text-white rounded">
                Apply Filters
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={handleToggle}></div>
        </div>
      )}
    </div>
  );
}
