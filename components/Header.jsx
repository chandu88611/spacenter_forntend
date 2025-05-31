"use client";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandLess,
  ExpandMore,
  AccountCircle,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";

import { TbCurrentLocation } from "react-icons/tb";
import {
  useGetAllCategoriesQuery,
  useGetAllCitiesQuery,
} from "../redux/services/businessApi";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";

import { motion } from "framer-motion";
import CitiesDialog from "./CitiesDialog";

const LocationDetails = styled(Box)(({ theme }) => ({
  "&>button": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
    "&>p": {
      marginLeft: "5px",
    },
  },
  // [theme.breakpoints.down("md")]: {},
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null); // Reference for detecting outside clicks
  const { data: categoryData } = useGetAllCategoriesQuery();
  const { data: citiesData } = useGetAllCitiesQuery();
  const categories = categoryData?.data || [];
  const cities = citiesData?.data || [];
  const [openCity, setOpenCity] = useState(false);
  const [cityLocation, setCityLocation] = useState("Location");

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
    if (!open) setOpenDropdown(null);
  };

  const handleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
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

  const handleClickOpenCity = () => {
    console.log("ATTACK ", categories);
    setOpenCity(true);
  };
  const handleClose = () => {
    setOpenDropdown(null);
  };
  const isActive = (link) => {
    if (!link) return false;
    if (!router.pathname || typeof router.pathname !== "string") return false;
    return router.pathname === link || router.pathname.startsWith(link + "/");
  };
  console.log("CITIES ::: ", cities);
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
        <LocationDetails>
          <button
            className="px-3 bg-blue-600 text-white"
            onClick={() => handleClickOpenCity()}
          >
            <IoLocationSharp size={18} />
            <Typography>{cityLocation}</Typography>
          </button>
        </LocationDetails>
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          {/* Menu Icon */}
          <IconButton onClick={toggleDrawer(true)} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>

          {/* Drawer */}
          <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                width: 280,
                height: "100%",
                background:
                  "linear-gradient(to right, #0f336d, #073d80, #023fa0)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Top Close Button */}
              <Box display="flex" justifyContent="flex-end" p={2}>
                <IconButton
                  onClick={toggleDrawer(false)}
                  sx={{ color: "white" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Main Nav */}
              <Box flexGrow={1}>
                <List>
                  {/* Login / Signup */}
                  <ListItem button component={Link} href="#">
                    <ListItemIcon sx={{ color: "white" }}>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Login / Signup" />
                  </ListItem>

                  <Divider
                    sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }}
                  />

                  {/* Nav Links */}
                  {menuItems.map((item, index) => {
                    const parentActive =
                      isActive(item.link) ||
                      (item.submenu &&
                        item.submenu.some((si) => isActive(si.link)));

                    return (
                      <Box key={index}>
                        {item.submenu ? (
                          <>
                            <ListItem
                              button
                              onClick={() => handleDropdown(index)}
                              sx={{
                                px: 3,
                                color: parentActive
                                  ? "#e3f2fd"
                                  : "rgba(255,255,255,0.7)",
                                bgcolor: parentActive
                                  ? "rgba(255,255,255,0.1)"
                                  : "transparent",
                                fontWeight: parentActive ? "bold" : "normal",
                                "&:hover": {
                                  bgcolor: "rgba(255,255,255,0.15)",
                                },
                              }}
                            >
                              <ListItemText primary={item.name} />
                              {openDropdown === index ? (
                                <ExpandLess sx={{ color: "#e3f2fd" }} />
                              ) : (
                                <ExpandMore sx={{ color: "#e3f2fd" }} />
                              )}
                            </ListItem>

                            <Collapse
                              in={openDropdown === index}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List
                                component="div"
                                disablePadding
                                sx={{
                                  bgcolor: "white",
                                  borderLeft: "4px solid #0f336d",
                                }}
                              >
                                {item.submenu.map((subItem, subIndex) => (
                                  <ListItem
                                    key={subIndex}
                                    button
                                    component={Link}
                                    href={subItem.link}
                                    onClick={() => {
                                      toggleDrawer(false)();
                                      handleDropdown(null);
                                    }}
                                    sx={{
                                      pl: 4,
                                      bgcolor: isActive(subItem.link)
                                        ? "#e3f2fd"
                                        : "white",
                                      color: isActive(subItem.link)
                                        ? "#0f336d"
                                        : "gray",
                                      fontWeight: isActive(subItem.link)
                                        ? "bold"
                                        : "normal",
                                      "&:hover": { bgcolor: "#f5f5f5" },
                                    }}
                                  >
                                    <ListItemText primary={subItem.name} />
                                  </ListItem>
                                ))}
                              </List>
                            </Collapse>
                          </>
                        ) : (
                          <ListItem
                            button
                            component={Link}
                            href={item.link}
                            onClick={() => {
                              toggleDrawer(false)();
                              handleDropdown(null);
                            }}
                            sx={{
                              color: isActive(item.link)
                                ? "#e3f2fd"
                                : "rgba(255,255,255,0.7)",
                              bgcolor: isActive(item.link)
                                ? "rgba(255,255,255,0.1)"
                                : "transparent",
                              px: 3,
                              fontWeight: isActive(item.link)
                                ? "bold"
                                : "normal",
                              "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                            }}
                          >
                            <ListItemText primary={item.name} />
                          </ListItem>
                        )}
                      </Box>
                    );
                  })}
                </List>
              </Box>

              {/* Bottom Social Links */}
              <Box p={2} display="flex" justifyContent="center" gap={2}>
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="https://twitter.com"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  sx={{ color: "white" }}
                >
                  <Instagram />
                </IconButton>
              </Box>
            </Box>
          </Drawer>
        </Box>
      </div>
      <CitiesDialog
        open={openCity}
        setOpen={setOpenCity}
        categories={cities}
        setCityLocation={setCityLocation}
      />
    </nav>
  );
};

export default Navbar;
