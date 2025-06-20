"use client";

import React, { useState, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import { useGetAllCategoriesQuery } from "@/redux/services/businessApi";
import { getIconComponent } from "@/utils/getReacticons";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const CategoriesList = () => {
  const [showMore, setShowMore] = useState(false);

  const { data, isLoading } = useGetAllCategoriesQuery({
    page: 1,
    limit: 100,
    search: "",
  });

  const [categoriesWithIcons, setCategoriesWithIcons] = useState([]);

  useEffect(() => {
    if (!data?.data) return;

    const updated = data.data.map((category) => {
      const Icon = getIconComponent(category.iconName || "");
      return {
        name: category.name,
        link: `/listing/${category.name}`,
        Icon,
      };
    });

    setCategoriesWithIcons(updated);
  }, [data]);

  const handleShowMore = () => setShowMore(!showMore);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-6xl p-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-black">Categories</h2>
        </div>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categoriesWithIcons.slice(0, 7).map((category, index) => (
                <div key={index} className="text-center w-full min-w-0">
                  <a href={category.link} className="block h-full">
                    <div className="border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center text-gray-900 transition-all hover:shadow-lg active:bg-gray-200 w-full h-full min-h-[140px]">
                      <div className="text-3xl mb-2 text-amber-500">
                        <category.Icon />
                      </div>
                      <span className="font-semibold break-words">
                        {category.name}
                      </span>
                    </div>
                  </a>
                </div>
              ))}

              <div
                onClick={handleShowMore}
                className="text-center w-full min-w-0"
              >
                <div
                  className={`cursor-pointer border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-lg ${
                    showMore ? "bg-gray-200" : ""
                  } w-full h-full min-h-[140px]`}
                >
                  <div className="text-3xl mb-2 text-gray-500">
                    <FiMoreHorizontal />
                  </div>
                  <span className="font-semibold text-black break-words">
                    More
                  </span>
                </div>
              </div>
            </div>

            {showMore && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 md:gap-y-16 gap-y-4">
                {categoriesWithIcons.slice(7).map((category, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                    className="flex flex-col space-y-2 text-left"
                  >
                    <a
                      href={category.link}
                      className="block !text-gray-500 hover:!text-gray-700 hover:!underline"
                    >
                      <div className="flex items-center">
                        <div className="text-2xl text-amber-500 mr-3">
                          <category.Icon />
                        </div>
                        <span className="font-semibold break-words">
                          {category.name}
                        </span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
