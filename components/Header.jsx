
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FiChevronDown, FiMenu, FiSearch } from "react-icons/fi";
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
  useGetAllBusinessesQuery,
} from "../redux/services/businessApi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import CitiesDialog from "./CitiesDialog";
import Image from "next/image";
import debounce from "lodash.debounce";
import { getBackendUrl } from "@/utils/getBackendUrl";
import { getIconComponent } from "@/utils/getReacticons";

const LocationDetails = styled(Box)(({ theme }) => ({
  "&>button": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
    "&>p": {
      marginLeft: "5px",
    },
  },
}));

const Navbar = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dropdownRef = useRef(null);
  const { data: categoryData } = useGetAllCategoriesQuery();
  const { data: citiesData } = useGetAllCitiesQuery();
  const [openCity, setOpenCity] = useState(false);
  const [cityLocation, setCityLocation] = useState("");

  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  const initialLocation = searchParams.get("location") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [suggestions, setSuggestions] = useState([]);

  const debouncedSearch = useCallback(
    debounce((val) => {
      setSearchQuery(val);
    }, 300),
    []
  );

  const { data: businessData } = useGetAllBusinessesQuery({
    search: searchQuery,
    location: locationQuery || cityLocation,
  });

  useEffect(() => {
    console.log(businessData)
    if (Array.isArray(businessData?.data?.data)) {
      setSuggestions(businessData?.data?.data?.slice(0, 4));
    }
  }, [businessData]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/listing?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(
        locationQuery || cityLocation
      )}`
    );
  };

  const handleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleClickOpenCity = () => {
    setOpenCity(true);
  };

  const handleClose = () => {
    setOpenDropdown(null);
  };

  const isActive = (link) => {
    return router.pathname === link || router.pathname?.startsWith(link + "/");
  };

  const menuItems = [
    { name: "Home", link: "/" },
   {
      name: "Services",
      submenu:
        categoryData?.data?.map((category) => {
          const Icon = getIconComponent(category.iconName || "");
          return {
            name: category.name,
            icon: Icon,
            link: `/listing/${category.name}`,
          };
        }) || [],
    },
    // { name: "About", link: "/about" },
    // { name: "Blog", link: "/blog" },
  ];
useEffect(() => {
  const handleRouteChange = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  // Listen to changes
  router.events?.on("routeChangeComplete", handleRouteChange);

  return () => {
    router.events?.off("routeChangeComplete", handleRouteChange);
  };
}, []);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#1e245e] via-[#1e245e] to-[#1e245e] text-white shadow-lg">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Yelp Clone</div>

        <div className="hidden lg:flex space-x-6" ref={dropdownRef}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleDropdown(index)}
              onMouseLeave={handleClose}
            >
              {item.submenu ? (
                <>
                  <button className="flex items-center gap-1 text-white font-medium">
                    {item.name}
                    <FiChevronDown className={openDropdown === index ? "rotate-180" : ""} />
                  </button>
                  {openDropdown === index && (
                    <div className="absolute left-0 top-full bg-white text-gray-800 shadow-lg rounded-lg p-2 w-56 z-50">
                      {item.submenu.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.link}
                          className=" px-2 py-2 text-sm hover:bg-gray-100 flex gap-2"
                        >
                            <span className="text-xl text-amber-500 ">{<sub.icon/>}</span>
                         <span className="!text-black">{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.link} className="text-white font-medium">
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex w-1/3 relative">
          <form onSubmit={handleSearch} className="flex w-full bg-gray-100 rounded-md overflow-hidden">
            <div className="flex items-center w-[90%] border-r border-gray-200">
              <input
                type="text"
                placeholder="Find a business or service..."
                className="w-full px-3 py-2 text-gray-700 placeholder:text-sm focus:outline-none"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
            {/* <div className="flex items-center w-[55%]">
              <input
                type="text"
                placeholder={cityLocation}
                className="w-full px-3 py-2 text-gray-700 placeholder:text-sm focus:outline-none"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
              <TbCurrentLocation size={18} className="text-blue-500 mr-4" />
            </div> */}

            <button type="submit" className="px-3 bg-blue-600 text-white w-[10%]">
              <FiSearch size={18} />
            </button>
          </form>

          {(searchQuery.length > 1  ) && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 bg-white text-black w-full rounded-xl shadow-xl z-50 overflow-hidden border border-gray-200">
    {suggestions?.map((business) => (
      <Link
        key={business._id}
         href={`/business/${business?.city}/${business?.businessName}/${business?.zip}/${business?.id}`}
        // href={`/business/${business.slug}`}
        className="flex items-center px-4 py-3 hover:bg-gray-50 transition duration-150 gap-4"
      >
        <img
          src={`${getBackendUrl()}${business?.galleries?.[0]?.photoUrl || "/default.jpg"}`}
          alt={business.businessName}
         
          className="rounded-lg object-cover flex-shrink-0 border h-18 w-18 border-gray-200"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800 text-sm">{business.businessName}</p>
          <p className="text-xs text-gray-500">{business.city}</p>
          {business.rating && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-500 text-sm">⭐</span>
              <span className="ml-1 text-xs font-medium text-gray-600">
                {business.rating.toFixed(1)} / 5
              </span>
            </div>
          )}
        </div>
      </Link>
    ))}
  </div>
          )}
        </div>

        <LocationDetails>
          <button className="px-3 bg-blue-600 text-white" onClick={handleClickOpenCity}>
            <IoLocationSharp size={18} />
            <Typography>{cityLocation}</Typography>
          </button>
        </LocationDetails>

        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <IconButton onClick={() => setOpenDrawer(true)} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Box sx={{ width: 280, background: "#023fa0", color: "white", height: "100%" }}>
              <Box display="flex" justifyContent="flex-end" p={2}>
                <IconButton onClick={() => setOpenDrawer(false)} sx={{ color: "white" }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                {/* <ListItem button component={Link} href="#">
                  <ListItemIcon sx={{ color: "white" }}>
                    <AccountCircle />
                  </ListItemIcon>
                
                </ListItem> */}
                <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />


     {menuItems.map((item, index) => (
  <Box key={index}>
    {item.submenu ? (
      <>
        <ListItem
          button
          onClick={() => handleDropdown(index)}
          sx={{ px: 3, color: "white" }}
        >
          <ListItemText primary={item.name} />
          {openDropdown === index ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openDropdown === index} timeout="auto" unmountOnExit>
          <Box
            sx={{
              maxHeight: 200, // Adjust as needed
              overflowY: "auto",
              pr: 1,
            }}
          >
            <List component="div" disablePadding>
              {item.submenu.map((subItem, subIndex) => (
                <ListItem
                  key={subIndex}
                  button
                  component={Link}
                  href={subItem.link}
                  onClick={() => {
                    setOpenDrawer(false);
                    setOpenDropdown(null);
                  }}
                  sx={{
                    pl: 4,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <span className="text-xl text-amber-400">{<subItem.icon/>}</span>
                  <ListItemText primary={subItem.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Collapse>
      </>
    ) : (
      <ListItem
        button
        component={Link}
        href={item.link}
        onClick={() => {
          setOpenDrawer(false);
          setOpenDropdown(null);
        }}
        sx={{ px: 3, color: "white" }}
      >
        <ListItemText primary={item.name} />
      </ListItem>
    )}
  </Box>
))}

              </List>
              <Box p={2} display="flex" justifyContent="center" gap={2}>
                <IconButton href="https://facebook.com" target="_blank" sx={{ color: "white" }}>
                  <Facebook />
                </IconButton>
                <IconButton href="https://twitter.com" target="_blank" sx={{ color: "white" }}>
                  <Twitter />
                </IconButton>
                <IconButton href="https://instagram.com" target="_blank" sx={{ color: "white" }}>
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
        categories={citiesData?.data || []}
        setCityLocation={setCityLocation}
        handleSearch={() => handleSearch({ preventDefault: () => {} })}
              cityLocation={cityLocation}
      />
    </nav>
  );
};

export default Navbar;




