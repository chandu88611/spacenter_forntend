"use client";
import { useState, useEffect, useRef } from "react";
import { Drawer } from "antd";
import {
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { TbCurrentLocation } from "react-icons/tb";
import { useGetAllCategoriesQuery } from "../redux/services/businessApi";

import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const dropdownRef = useRef(null); // Reference for detecting outside clicks
  const menuRef = useRef(null);
  const { data: categoryData } = useGetAllCategoriesQuery();
  const categories = categoryData?.data || [];

  console.log(categories);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    setOpenSubmenus({});
  };

  const handleDropdownToggle = (index) => {
    setExpanded(expanded === index ? null : index);
    setOpenSubmenus({}); // Reset submenus when switching main menu
  };

  const handleSubmenuToggle = (parentIndex, subIndex) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [`${parentIndex}-${subIndex}`]: !prev[`${parentIndex}-${subIndex}`],
    }));
  };

  const toggleSubmenu = (parentIndex, subIndex) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [`${parentIndex}-${subIndex}`]: !prev[`${parentIndex}-${subIndex}`],
    }));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "Home", link: "/" },
    {
      name: "Services",
      submenu: categories.map((category) => {
        const formattedName = category.name
          .replace("-", " & ") // Replace - with ' & '
          .split(" ") // Split into words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(" "); // Join back with space

        return {
          name: formattedName,
          link: `/listing/${category.name}`, // URL remains unchanged
        };
      }),
    },
    { name: "About", link: "/about" },
    { name: "Blog", link: "/blog" },
  ];

  const handleOpen = (index) => {
    setOpenDropdown(index);
  };

  const handleClose = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0f336d] via-[#073d80] to-[#023fa0] text-white shadow-lg backdrop-blur-sm border-b border-white/10 transition-all duration-300">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Yelp Clone</div>
        <div className="hidden lg:flex space-x-6" ref={dropdownRef}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleOpen(index)}
              onMouseLeave={handleClose}
            >
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleOpen(index)}
                    className="flex items-center gap-1 text-white font-medium hover:text-gray-300"
                  >
                    {item.name}
                    <FiChevronDown
                      className={openDropdown === index ? "rotate-180" : ""}
                    />
                  </button>
                  {openDropdown === index && (
                    <div className="absolute left-0 top-full bg-white text-gray-800 shadow-lg rounded-lg p-2 w-56 z-50">
                      {item.submenu.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.link}
                          onClick={handleClose}
                          className="block px-4 py-2 !text-gray-700 hover:!bg-gray-100 hover:text-black"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.link}
                  className="text-white font-medium hover:text-gray-300"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* <div className="hidden lg:flex space-x-6" ref={dropdownRef}>
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 text-white font-medium hover:text-gray-300"
                  >
                    {item.name}{" "}
                    <FiChevronDown
                      className={openDropdown === index ? "rotate-180" : ""}
                    />
                  </button>
                  {openDropdown === index && (
                    <div className="absolute left-0 top-full bg-white text-gray-800 shadow-lg rounded-lg p-2 w-56">
                      {item.submenu.map((sub, subIndex) => (
                        <div key={subIndex} className="relative">
                          {sub.submenu ? (
                            <>
                              <button
                                onClick={() => toggleSubmenu(index, subIndex)}
                                className="w-full flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                              >
                                {sub.name} <FiChevronRight />
                              </button>
                              {openSubmenus[`${index}-${subIndex}`] && (
                                <div className="absolute left-full top-0 bg-white text-gray-800 shadow-lg rounded-lg p-2 w-56">
                                  {sub.submenu.map((nested, nestedIndex) => (
                                    <Link
                                      key={nestedIndex}
                                      href={nested.link}
                                      className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                      {nested.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={sub.link}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              {sub.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.link}
                  className="text-white font-medium hover:text-gray-300"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div> */}

        {/* Search Input with Location Field (Hidden in Mobile) */}
        <div className="hidden lg:flex w-1/3">
          <div className="flex w-full bg-gray-100 rounded-md overflow-hidden">
            {/* Business Directory Search */}
            <div className="flex items-center w-[70%] border-r border-gray-200">
              <input
                type="text"
                placeholder="Find a business or service..."
                className="w-full px-3 py-2 text-gray-700 focus:outline-none border-none placeholder:text-sm"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center w-[55%]">
              <input
                type="text"
                placeholder="Bangalore, Karnataka"
                className="w-full px-3 py-2 text-gray-700 focus:outline-none border-none placeholder:text-sm"
              />
              <TbCurrentLocation size={18} className="text-blue-500 mr-4" />
            </div>

            {/* Search Button */}
            <button className="px-3 bg-blue-600 text-white">
              <FiSearch size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>
      {/* Mobile Drawer Menu */}
      {/* <Drawer
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        ref={dropdownRef}
        className="lg:hidden custom-drawer" // Custom class
        closeIcon={
          <FiX
            size={24}
            className="text-blue-600 absolute top-4 right-4 cursor-pointer"
          />
        }
      >
        <div ref={menuRef} className="flex flex-col space-y-4 p-4">
          {/* Login Section Before Navigation Items */}
      {/* <div className="flex items-center space-x-3 text-white">
            <FiUser size={20} />
            <Link href="#" className="text-blue-400 hover:text-blue-300">
              Login / Signup
            </Link>
          </div> */}

      {/* Navigation Items */}
      {/* {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <> */}
      {/* Main Dropdown Button */}
      {/* <button
                    className="font-medium text-blue-400 flex justify-between items-center w-full px-3 py-2 rounded-md hover:bg-gray-800 transition"
                    onClick={() => handleDropdownToggle(index)}
                  >
                    {item.name}
                    <FiChevronDown
                      className={`transform transition-transform ${
                        expanded === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown Content */}
      {/* {expanded === index && (
                    <div className="ml-4 flex flex-col">
                      {item.submenu.map((sub, subIndex) => (
                        <div key={subIndex} className="relative">
                          {sub.submenu ? (
                            <> */}
      {/* Submenu Button */}
      {/* <button
                                onClick={() =>
                                  handleSubmenuToggle(index, subIndex)
                                }
                                className="w-full flex justify-between items-center px-4 py-2 text-gray-300 hover:text-blue-400 transition border-b border-white/50 last:border-none"
                              >
                                {sub.name} <FiChevronRight />
                              </button> */}
      {/* Nested Submenu */}
      {/*  {openSubmenus[`${index}-${subIndex}`] && (
                                <div className="ml-6 flex flex-col space-y-2">
                                  {sub.submenu.map((nested, nestedIndex) => (
                                    <Link
                                      key={nestedIndex}
                                      href={nested.link || "#"}
                                      className="block text-gray-300 hover:text-blue-400 px-4 py-2 transition border-b border-white/50 last:border-none"
                                    >
                                      {nested.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={sub.link || "#"}
                              className="block text-gray-300 hover:text-blue-400 px-4 py-2 transition border-b border-white/50 last:border-none"
                            >
                              {sub.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.link}
                  className="text-blue-400 font-medium hover:text-blue-300 transition px-3 py-2"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Drawer> */}
      <Drawer
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        ref={dropdownRef}
        className="lg:hidden custom-drawer"
        closeIcon={
          <FiX
            size={24}
            className="text-blue-600 absolute top-4 right-4 cursor-pointer"
          />
        }
      >
        <div ref={menuRef} className="flex flex-col space-y-4 p-4">
          {/* Login Section */}
          <div className="flex items-center space-x-3 text-white">
            <FiUser size={20} />
            <Link href="#" className="text-white hover:text-blue-400">
              Login / Signup
            </Link>
          </div>

          {/* Navigation Items */}
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  {/* Main Dropdown Button */}
                  <button
                    className="text-white flex justify-between items-center w-full px-3 py-2 rounded-md hover:bg-gray-700 transition"
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  >
                    {item.name}
                    <FiChevronDown
                      className={`transition-transform ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  {openDropdown === index && (
                    <div className="ml-4 flex flex-col bg-white rounded-md shadow-md">
                      {item.submenu.map((sub, subIndex) => (
                        <div key={subIndex} className="relative">
                          {sub.submenu ? (
                            <>
                              {/* Submenu Button */}
                              <button
                                onClick={() => {
                                  setOpenDropdown(null); // Close dropdown
                                  setOpen(false); // Close drawer
                                }}
                                className="w-full flex justify-between items-center px-4 py-2 hover:text-blue-500 transition border-b border-gray-200"
                              >
                                {sub.name}
                                <FiChevronRight />
                              </button>

                              {/* Nested Submenu */}
                              {openSubmenus[`${index}-${subIndex}`] && (
                                <div className="ml-4 flex flex-col space-y-1 bg-white rounded-md shadow-md">
                                  {sub.submenu.map((nested, nestedIndex) => (
                                    <Link
                                      key={nestedIndex}
                                      href={nested.link || "#"}
                                      onClick={() => setOpen(false)} // ✅ close drawer when clicked
                                      className="block px-4 py-2 text-gray-600 hover:text-blue-600 border-b border-gray-200"
                                    >
                                      {nested.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <Link
                              href={sub.link || "#"}
                              onClick={() => setOpen(false)} // ✅ close drawer on direct submenu
                              className="block px-4 py-2 !text-gray-600 !hover:text-gray-300 border-b border-gray-200"
                            >
                              {sub.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.link}
                  className="text-white px-3 py-2 hover:text-blue-400"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
