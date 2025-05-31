"use client";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaFacebookF,
  FaTwitter,
  FaRss,
  FaYoutube,
  FaLinkedinIn,
  FaGooglePlusG,
  FaRegHeart,
  FaStar,
  FaExclamationCircle,
  FaPhoneAlt,
  FaHeart,
  FaEye,
  FaClock,
  FaMapMarkerAlt,
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaGlobe,
  FaPhone,
  FaUserGraduate,
  FaUsers,
  FaCalendarAlt,
  FaShareAlt,
  FaPrint,
  FaExclamationTriangle,
  FaUser,
  FaDirections,
  FaGoogle,
  FaDribbble,
  FaPinterest,
  FaSearch,
  FaChevronDown,
  FaPencilAlt,
  FaSpa,
  FaInstagram,
} from "react-icons/fa";
import { SlBriefcase, SlCalender } from "react-icons/sl";
import { CiHeart, CiShare2, CiUser } from "react-icons/ci";
import { LiaExclamationCircleSolid, LiaPrintSolid } from "react-icons/lia";
import { IoEyeOutline, IoLocationOutline } from "react-icons/io5";
import StarRating from "@/components/StarRatings";
import ProductSlider from "@/components/ProductSlider";
import MapMarker from "@/components/BusinessMap";
import { motion } from "framer-motion";
import Reviews from "@/components/Review";
import { notFound } from "next/navigation";
import { MdOutlineSpa } from "react-icons/md";
import {
  useGetBusinessByIdQuery,
  useGetAllBusinessesQuery,
} from "../../../redux/services/businessApi";
import { getBackendUrl } from "@/utils/getBackendUrl";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";

// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:5000/api/businesses");
//   const businesses = await res.json();

//   return businesses.map((business) => ({
//     id: business.id,
//   }));
// }

export default function Business({ params }) {
  const [city, businessName, zip, id] = params.slug;
  console.log("{ city, businessName, zip, id } :::: ", {
    city,
    businessName,
    zip,
    id,
  });

  const { data, isLoading, error } = useGetBusinessByIdQuery(id);
  const business = data?.data;
  const [activeTab, setActiveTab] = useState("contact");
  const keywords = ["Study", "Education", "Coaching", "University", "Classes"];
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 State for filtering

  const [selected, setSelected] = useState("Select Category");
  const categories = [
    "Technology",
    "Business",
    "Health",
    "Education",
    "Finance",
    "Travel",
    "Sports",
    "Food",
    "Entertainment",
    "Science",
    "Art",
    "Politics",
    "Music",
    "History",
    "Law",
  ];

  const dropdownRef = useRef(null); // Ref to track dropdown area
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category) => {
    setSelected(category);
    setIsOpen(false);
    setSearchTerm(""); // Reset search when selecting
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const raw = data?.data?.services || [];

  const cleanedServices = raw
    .map((item) => (typeof item === "string" ? item : item?.name))
    .filter(Boolean)
    .map((name) => name.replace(/[\[\]"]+/g, "").trim());

  function decodeAndStripHtml(htmlString) {
    const decoded = new DOMParser().parseFromString(htmlString, "text/html")
      .documentElement.textContent;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = decoded;
    return tempDiv.textContent || "";
  }
  console.log("business   :::: ", business);
  return (
    <>
      <div className="pattern-img">
        <div className="relative sptb-12 pattern2 bg-[#024588] bg-[url('/images/pattern.jpg')] bg-cover bg-blend-overlay">
          <div className="absolute inset-0 bg-[#04417f] opacity-80"></div>
          <div className="header-text1 mb-0">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-12 col-md-12 d-block mx-auto">
                  <div className="text-center mt-4 text-white">
                    <h1 className="mb-2 text-white font-semibold">
                      {data?.data?.businessName}
                    </h1>
                    <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-4">
                      <StarRating rating={4.5} />
                      <a
                        className="text-white text-sm md:text-base hover:underline"
                        href="javascript:void(0)"
                      >
                        {data?.data?.reviewCount} reviews
                      </a>
                    </div>
                    <ul className="flex flex-wrap justify-center sm:justify-center items-center gap-1 sm:gap-2 mb-4">
                      <li className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#001f3f]">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <FaFacebookF className="text-white text-sm sm:text-md" />
                        </a>
                      </li>
                      <li className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#001f3f]">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <FaXTwitter className="text-white text-sm sm:text-md" />
                        </a>
                      </li>
                      <li className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#001f3f]">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <FaInstagram className="text-white text-sm sm:text-md" />
                        </a>
                      </li>
                      <li className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#001f3f]">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <FaYoutube className="text-white text-sm sm:text-md" />
                        </a>
                      </li>
                      <li className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#001f3f]">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <FaLinkedinIn className="text-white text-sm sm:text-md" />
                        </a>
                      </li>
                      {/* <li className="w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#001f3f]">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <FaGooglePlusG className="text-white text-sm sm:text-md" />
                        </a>
                      </li> */}
                    </ul>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-2">
                      <a
                        href="#"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg !bg-sky-500 hover:!bg-sky-600 text-white text-xs sm:text-sm shadow-md transition w-fit"
                      >
                        <FaRegHeart className="text-white text-xs sm:text-sm" />
                        Add Wishlist
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="flex items-center gap-1 px-3 py-2 rounded-lg !bg-green-500 hover:!bg-green-600 text-white text-xs sm:text-sm shadow-md transition w-fit"
                      >
                        <FaStar className="text-white text-xs sm:text-sm" />
                        Write Review
                      </a>
                      {/* <a
                        href="javascript:void(0)"
                        className="flex items-center gap-1 px-3 py-2 rounded-lg !bg-red-500 hover:!bg-red-600 text-white text-xs sm:text-sm shadow-md transition w-fit"
                      >
                        <FaExclamationCircle className="text-white text-xs sm:text-sm" />
                        Report Abuse
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="details-absolute">
            <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-white text-xs sm:text-sm px-4 py-2">
              <a
                href="javascript:void(0)"
                className="flex items-start gap-2 text-white w-full sm:w-auto"
              >
                <span className="w-6 h-6 mt-1 flex items-center justify-center rounded-full bg-[#283653] shrink-0">
                  <IoLocationOutline className="text-white text-sm" />
                </span>
                <span className="leading-snug">
                  {data?.data?.address1}, {data?.data?.address2}
                  <br />
                  {data?.data?.city}, {data?.data?.country}
                </span>
              </a>

              <a
                href="javascript:void(0)"
                className="flex items-center gap-2 text-white w-full sm:w-auto"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#3b4c70] shrink-0">
                  <FaPhoneAlt className="text-white text-sm" />
                </span>
                <span>
                  <b>{data?.data?.phone}</b>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg mx-auto mt-2">
        <div className="container mx-auto">
          <div className="page-header">
            <h4 className="text-lg font-semibold text-gray-800">
              {business?.businessType}
            </h4>
            <nav className="mt-2">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <a href="javascript:void(0)" className="hover:text-blue-500">
                    Home
                  </a>
                </li>
                <li>/</li>
                <li className="text-blue-500 font-medium">Business</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="sptb">
        <div className="container">
          <div className="row">
            {/*Left Side column */}
            <div className="col-xl-8 col-lg-8 col-md-12">
              {/*Business Overview*/}
              <div className="relative bg-white shadow-lg rounded-lg overflow-hidden p-5">
                {/* Ribbon (Perfect Cross Alignment) */}
                <div className="absolute top-0 right-0 overflow-hidden w-24 h-24">
                  <div className="absolute top-2 right-[-36px] w-48 bg-red-600 text-white text-xs font-semibold text-center px-10 py-1 rotate-45 shadow-md">
                    Featured
                  </div>
                </div>
                {/* Card Body */}
                <div className="card-body">
                  <div className="item-det mb-4">
                    <a href="javascript:void(0)" className="text-dark">
                      <h3>{data?.data?.businessName}</h3>
                    </a>
                    <div className="d-md-flex mt-2">
                      <ul className="d-md-flex mb-0 flex-wrap text-gray-600 text-sm">
                        <li className="me-5 flex items-center gap-1">
                          <MdOutlineSpa className="text-gray-500 w-4 h-4" />
                          {data?.data?.businessType}
                        </li>
                        <li className="me-5 flex items-center gap-1">
                          <IoLocationOutline className="text-gray-500" />
                          {data?.data?.country}
                        </li>
                        <li className="me-5 flex items-center gap-1">
                          <SlCalender className="text-gray-500" />5 hours ago
                        </li>
                        <li className="me-5 flex items-center gap-1">
                          <IoEyeOutline className="text-gray-500" />
                          765
                        </li>
                        {/* Rating & Likes (Same Alignment) */}
                        <li className="me-5 flex items-center gap-1">
                          <StarRating rating={data?.data?.averageRating} />
                          {data?.data?.reviewCount}
                        </li>
                      </ul>

                      <div className="d-flex flex items-center gap-1">
                        <div className="me-2">
                          <FaHeart className="text-red-600" />
                        </div>
                        135
                      </div>
                    </div>
                  </div>
                  <ProductSlider
                    imageUrls={
                      business?.galleries?.length > 0
                        ? business.galleries.map(
                            (g) => `${getBackendUrl()}${g.photoUrl}`
                          )
                        : ["/images/default.jpg"]
                    }
                  />
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-4">
                {/* Card Header */}
                <div className="border-b border-gray-200 px-6 py-4 bg-white">
                  <h3 className="text-lg font-semibold text-dark-grey">
                    Overview
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6 text-gray-700">
                  {/* Description */}
                  <p className="text-black">{data?.data?.description}</p>
                  <p className="mt-4 text-black">
                    {decodeAndStripHtml(data?.data?.overview || "")}
                  </p>

                  {/* Business Details Section */}

                  <h4 className="text-lg font-semibold mt-6 mb-4 text-black">
                    Business Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                    {/* Company Name */}
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <FaBuilding className="text-gray-500 text-lg" />
                      </div>
                      <span className="text-black">
                        {data?.data?.businessName}
                      </span>
                    </div>

                    {/* Industry */}
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <FaUserGraduate className="text-gray-500 text-lg" />
                      </div>

                      <span className="text-black">
                        {data?.data?.businessType}
                      </span>
                    </div>

                    {/* Established Year */}
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <FaCalendarAlt className="text-gray-500 text-lg" />
                      </div>

                      <span className="text-black">
                        Established: {data?.data?.establishedYear}
                      </span>
                    </div>

                    {/* Employee Count */}
                    <div className="flex items-center space-x-3 ">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <FaUsers className="text-gray-500 text-lg" />
                      </div>

                      <span className="text-black">
                        Employees: {data?.data?.employeeCount}+
                      </span>
                    </div>
                  </div>

                  {/* Contact Info Section */}
                  <h4 className="text-lg font-semibold mt-6 mb-4 text-black">
                    Contact Info
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                    {/* Address */}
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <IoLocationOutline className="text-gray-500 text-lg" />
                      </div>
                      <a
                        href="#"
                        className="text-black hover:text-blue-600 transition duration-200"
                      >
                        {data?.data?.address1}, {data?.data?.address2},
                        <br />
                        {data?.data?.city},{data?.data?.country}{" "}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <FaEnvelope className="text-gray-500 text-lg" />
                      </div>
                      <a
                        href="mailto:spruko123@gmail.com"
                        className="text-black hover:text-blue-600 transition duration-200"
                      >
                        {data?.data?.email}
                      </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <FaPhoneAlt className="text-gray-500 text-lg" />
                      </div>
                      <a
                        href="tel:+123456789"
                        className="text-black hover:text-blue-600 transition duration-200"
                      >
                        {data?.data?.phone}
                      </a>
                    </div>

                    {/* Website */}
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                        <FaGlobe className="text-gray-500 text-lg" />
                      </div>
                      <a
                        href={data?.data?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-blue-600 transition duration-200"
                      >
                        {data?.data?.website
                          ? `www.${new URL(data.data.website).hostname.replace(
                              /^www\./,
                              ""
                            )}`
                          : ""}
                      </a>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mt-6 mb-4 text-black">
                    More Business Info
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                      <tbody>
                        <tr className="border-b">
                          <td className="font-medium py-2 px-4 bg-gray-100">
                            Established Year
                          </td>
                          <td className="py-2 px-4">
                            {data?.data?.establishedYear}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="font-medium py-2 px-4 bg-gray-100">
                            Services
                          </td>
                          <td className="py-2 px-4 flex flex-wrap gap-2">
                            {cleanedServices.map((service, idx) => (
                              <div
                                key={idx}
                                className="border border-gray-300 px-2 py-1 rounded-sm text-sm text-gray-800 hover:border-gray-500 hover:shadow-md transition duration-200 cursor-pointer"
                              >
                                {service}
                              </div>
                            ))}
                          </td>
                        </tr>

                        <tr className="border-b">
                          <td className="font-medium py-2 px-4 bg-gray-100">
                            Payment Methods
                          </td>
                          <td className="py-2 px-4">
                            VISA, Mastercard, Discover, American Express
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="font-medium py-2 px-4 bg-gray-100">
                            Fax
                          </td>
                          <td className="py-2 px-4">+25 485-9865-85</td>
                        </tr>
                        <tr className="border-b">
                          <td className="font-medium py-2 px-4 bg-gray-100">
                            Toll-Free
                          </td>
                          <td className="py-2 px-4">+25 485-9865-85</td>
                        </tr>
                        <tr>
                          <td className="font-medium py-2 px-4 bg-gray-100">
                            Certification
                          </td>
                          <td className="py-2 px-4">ISO Certified</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Business ID Section */}
                  <div className="mt-4 pt-4 pb-4 px-5 border-b border-gray-300">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>
                        Business ID: <strong>#8256358</strong>
                      </span>
                      <span>
                        Posted By{" "}
                        <strong className="text-black">Individual</strong> /
                        21st Dec 2019
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-300 bg-white p-4">
                  <div className="flex flex-wrap gap-1">
                    {/* Share Link */}
                    <a
                      href="#"
                      className="flex items-center space-x-1 !bg-[#42aedf] border !border-[#42aedf] text-white hover:!bg-[#0284c7] px-3 py-2 rounded-md shadow transition"
                    >
                      <CiShare2 className="text-lg" />
                      <span>Share Ad</span>
                    </a>

                    {/* Like Link */}
                    <a
                      href="#"
                      className="flex items-center space-x-1 !bg-[#ed477e] border !border-[#ed477e] text-white hover:!bg-[#c2185b] px-3 py-2 rounded-md shadow transition"
                    >
                      <CiHeart className="text-lg" />
                      <span>678</span>
                    </a>

                    {/* Print Link */}
                    <a
                      href="#"
                      className="flex items-center space-x-1 !bg-[#202588] border !border-[#202588] text-white hover:!bg-[#262549] px-3 py-2 rounded-md shadow transition"
                    >
                      <LiaPrintSolid className="text-lg" />
                      <span>Print</span>
                    </a>

                    {/* Report Link */}
                    <a
                      href="#"
                      className="flex items-center space-x-1 !bg-[#ef4444] border !border-[#ef4444] text-white hover:!bg-[#dc2626] px-3 py-2 rounded-md shadow transition"
                      data-bs-toggle="modal"
                      data-bs-target="#report"
                    >
                      <LiaExclamationCircleSolid className="text-lg" />
                      <span>Report Abuse</span>
                    </a>
                  </div>
                </div>
              </div>
              {/* <div className="max-w-5xl mx-auto p-4"> */}
              <div className="bg-white shadow-lg rounded-lg p-3 mb-1 overflow-hidden mt-4">
                <h3 className="mt-5 mb-4 text-xl font-semibold">
                  Related Posts
                </h3>
                <div className="flex gap-4 bg-white p-1">
                  {/* Card 1 */}
                  <div className="relative w-[350px] shrink-0 bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Ribbon */}
                    <div className="absolute top-14 -left-4 bg-gray-600 text-white text-xs px-4 py-1 z-10 transform -rotate-45 origin-top-left">
                      Featured
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-58 overflow-hidden">
                      <img
                        src="/images/products/sp9.jpg"
                        alt="img"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:brightness-50"
                      />
                      <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-md z-10">
                        Beauty & Spa
                      </div>
                    </div>
                    {/* Icons */}
                    <div className="absolute top-2 right-2 flex gap-2 z-10">
                      <button className="bg-black  bg-opacity-70 rounded-full p-1 shadow">
                        <CiHeart className="text-white" />
                      </button>
                      <button className="bg-black  bg-opacity-70 rounded-full p-1 shadow">
                        <FaPencilAlt className="text-white" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 mb-2">
                      <div className="text-gray-500 text-sm">
                        <StarRating />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 mt-2  flex items-center">
                        Goozer Beauty & Spa
                        <span className="inline-flex items-center justify-center ml-2 w-4 h-4 bg-green-500 text-white text-[10px] rounded-full">
                          ✓
                        </span>
                      </h4>
                      {/* Row and Column Alignment */}
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <IoLocationOutline className="mr-2" />
                          New York
                        </div>
                        <div className="flex items-center">
                          <SlCalender className="mr-2" />2 hours ago
                        </div>
                        <div className="flex items-center">
                          <CiUser className="mr-2" />
                          Clara Pixley
                        </div>
                        <div className="flex items-center">
                          <FaPhoneAlt className="mr-2" />
                          256-654-6859{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative w-[360px] shrink-0 bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Ribbon */}
                    <div className="absolute top-16 -left-4 bg-red-600 text-white text-xs px-4 py-1 z-10 transform -rotate-45 origin-top-left">
                      Negotiable
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-58 overflow-hidden">
                      <img
                        src="/images/products/restaurant-banner.jpg"
                        alt="img"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:brightness-50"
                      />
                      <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-md z-10">
                        Restaurant
                      </div>
                    </div>

                    {/* Icons */}
                    <div className="absolute top-2 right-2 flex gap-2 z-10">
                      <button className="bg-black  bg-opacity-70 rounded-full p-1 shadow">
                        <CiHeart className="text-white" />
                      </button>
                      <button className="bg-black  bg-opacity-70 rounded-full p-1 shadow">
                        <FaPencilAlt className="text-white" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="text-gray-500 text-sm">
                        <StarRating />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 mt-2 flex items-center">
                        Spicy Restaurant
                        <span className="inline-flex items-center justify-center ml-2 w-4 h-4 bg-green-500 text-white text-[10px] rounded-full">
                          ✓
                        </span>
                      </h4>
                      {/* Row and Column Alignment */}
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <IoLocationOutline className="mr-2" />
                          Los Angeles
                        </div>
                        <div className="flex items-center">
                          <SlCalender className="mr-2" />5 hours ago
                        </div>
                        <div className="flex items-center">
                          <CiUser className="mr-2" />
                          Sally Peake
                        </div>
                        <div className="flex items-center">
                          <FaPhoneAlt className="mr-2" />
                          567 987 608
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Reviews />
              <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                {/* Header */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Add a Review
                  </h3>
                </div>

                {/* Body */}
                <div>
                  <p className="text-gray-600 mb-2">
                    Add Your Rating for the Business
                  </p>
                  <StarRating />
                  <h4 className="text-lg font-medium text-gray-700 mb-2 mt-4">
                    Review
                  </h4>

                  {/* Form */}
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <input
                        type="text"
                        id="name1"
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition placeholder-gray-500"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition placeholder-gray-500"
                      />
                    </div>

                    {/* Textarea */}
                    <div>
                      <textarea
                        name="example-textarea-input"
                        rows={6}
                        placeholder="Write Review"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 transition placeholder-gray-500"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Profile Card */}
            <div className="col-xl-4 col-lg-4 col-md-12">
              <div className="max-w-1xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="text-white border-b border-gray-200 py-4 px-4 text-left">
                  <h3 className="text-xl font-semibold">Company User</h3>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center py-4 border-b border-gray-200">
                  <img
                    src="/assets/images/other/logo.png"
                    className="w-40 rounded-full shadow-md  object-cover"
                    alt="User"
                  />
                  {/* <GiPlagueDoctorProfile /> */}
                  <a
                    href="userprofile.html"
                    className="mt-3 text-lg font-semibold !text-gray-900"
                  >
                    Robert McLean
                  </a>
                  <span className="text-gray-500">
                    Member Since November 2008
                  </span>
                  <small className="text-gray-400">
                    Listing ID: <b>365241</b>
                  </small>
                </div>

                {/* Tabs Section */}
                <div className="border-b">
                  <div className="flex">
                    <button
                      className={`w-1/2 py-4 font-semibold text-left px-6 transition-all duration-300 ${
                        activeTab === "contact"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 hover:text-blue-600"
                      }`}
                      onClick={() => setActiveTab("contact")}
                    >
                      Contact
                    </button>
                    <button
                      className={`w-1/2 py-4 font-semibold text-left px-6 transition-all duration-300 ${
                        activeTab === "timings"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 hover:text-blue-600"
                      }`}
                      onClick={() => setActiveTab("timings")}
                    >
                      Timings
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === "contact" && (
                    <>
                      <div>
                        <h4 className="text-xl font-semibold mb-4">
                          Contact Info
                        </h4>
                        <div className="space-y-3 border-b border-gray-200 mb-4">
                          {/* Address */}
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-blue-500">
                              <FaMapMarkerAlt className="w-4 h-4" />
                            </div>
                            <p className="text-gray-700 text-sm">
                              123 Main Street, New York, USA
                            </p>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-blue-600">
                              <FaPhoneAlt className="w-4 h-4" />
                            </div>
                            <p className="text-gray-700 text-sm">
                              +1 234 567 890
                            </p>
                          </div>

                          {/* Email */}
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-blue-600">
                              <FaEnvelope className="w-4 h-4" />
                            </div>
                            <p className="text-gray-700 text-sm">
                              user@example.com
                            </p>
                          </div>

                          {/* Website */}
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-blue-600">
                              <FaGlobe className="w-4 h-4" />
                            </div>
                            <p className="text-gray-700 text-sm">
                              www.example.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {/* Chat Button */}
                        <a
                          href="javascript:void(0)"
                          className="bg-blue-500 text-blue-600 px-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-md hover:bg-blue-600 transition"
                        >
                          <FaEnvelope className="w-4 h-4" />
                          Chat
                        </a>

                        {/* Contact Me Button */}
                        <a
                          href="javascript:void(0)"
                          className="bg-gray-600 text-blue-600 px-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-md hover:bg-gray-700 transition"
                          data-bs-toggle="modal"
                          data-bs-target="#contact"
                        >
                          <FaUser className="w-4 h-4" />
                          Contact Me
                        </a>

                        {/* All Listings Button */}
                        <a
                          href="javascript:void(0)"
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-md hover:bg-gray-300 transition"
                        >
                          <FaEye className="w-4 h-4" />
                          All Listings
                        </a>
                      </div>
                    </>
                  )}

                  {/* {activeTab === "timings" && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4">
                        Business Hours
                      </h4>
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Day
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Opening Hours
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["Monday", "9:00 AM - 6:00 PM"],
                            ["Tuesday", "9:00 AM - 6:00 PM"],
                            ["Wednesday", "9:00 AM - 6:00 PM"],
                            ["Thursday", "9:00 AM - 6:00 PM"],
                            ["Friday", "9:00 AM - 6:00 PM"],
                            ["Saturday", "10:00 AM - 4:00 PM"],
                            ["Sunday", "Closed"],
                          ].map(([day, time]) => (
                            <tr key={day}>
                              <td className="border border-gray-300 px-4 py-2">
                                {day}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {time}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )} */}
                  {activeTab === "timings" &&
                    data?.data?.operatingHours?.timings && (
                      <div>
                        <h4 className="text-xl font-semibold mb-4">
                          Business Hours
                        </h4>
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 px-4 py-2 text-left">
                                Day
                              </th>
                              <th className="border border-gray-300 px-4 py-2 text-left">
                                Opening Hours
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(
                              data.data.operatingHours.timings
                            ).map(([day, { open, close }]) => {
                              const openTime = new Date(
                                open
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              });
                              const closeTime = new Date(
                                close
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              });

                              // Check if the current day is a holiday
                              const isHoliday = data?.data?.holiday?.some(
                                (holiday) =>
                                  holiday.name.toLowerCase() ===
                                    day.toLowerCase() && holiday.isClosed
                              );

                              return (
                                <tr key={day}>
                                  <td className="border border-gray-300 px-4 py-2 capitalize">
                                    {day}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    {isHoliday
                                      ? "Closed"
                                      : `${openTime} - ${closeTime}`}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                </div>
              </div>
              <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="text-white py-4 px-6 border-b mb-4 border-gray-200 text-left">
                  <h3 className="text-lg font-semibold">Business Location</h3>
                </div>
                {/* Map Section */}
                <div className="relative z-10 w-full h-56 bg-gray-200 overflow-hidden">
                  <MapMarker
                    selectedType={business?.businessType}
                    businessData={business}
                  />
                </div>

                {/* Address Section */}
                <div className="px-6 py-3">
                  <div className="space-y-3">
                    {/* Address */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 text-blue-500 rounded-full flex items-center justify-center">
                        <FaMapMarkerAlt className="w-4 h-4" />
                      </div>
                      <p className="text-gray-700">
                        {data?.data?.address1}, {data?.data?.address2}
                        <br />
                        {data?.data?.city}, {data?.data?.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="p-4 text-center">
                  <a
                    href={`https://www.google.com/maps?q=${business?.latitude},${business?.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 px-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-md hover:bg-blue-700 transition"
                  >
                    <FaDirections className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-4 overflow-hidden"
              >
                {/* Header Section */}
                <div className="text-white py-4 px-6 text-left border -b border-gray-200">
                  <h3 className="text-lg font-semibold">Keywords</h3>
                </div>

                {/* Body Section with Staggered Animation */}
                <div className="p-6">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.3 } },
                    }}
                    className="flex flex-wrap gap-2"
                  >
                    {keywords.map((tag, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-500 hover:text-white transition duration-300"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.5 },
                          },
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
              {/* <div className="max-w-lg mx-auto bg-white shadow-sm mt-4 rounded-lg overflow-hidden">
                {/* Header */}
              {/* <div className="text-white border-b border-gray-200 py-4 px-6 text-left">
                  <h3 className="text-lg font-semibold">Listing Owner</h3>
                </div> */}

              {/* Profile Section */}
              {/* <div className="flex flex-col items-center border-b border-gray-200 py-4">
                  <img
                    src="../assets/images/faces/female/13.jpg"
                    className="w-32 h-32 rounded-full  shadow-md"
                    alt="User"
                  />
                  <a
                    href="userprofile.html"
                    className="mt-3 text-lg font-semibold text-gray-900"
                  >
                    Lilly Jones
                  </a>
                  <span className="text-gray-500">Listing Owner</span> */}

              {/* Social Icons */}
              {/* <div className="flex gap-3 mt-4">
                    {[
                      FaFacebookF,
                      FaTwitter,
                      FaGoogle,
                      FaDribbble,
                      FaPinterest,
                    ].map((Icon, index) => (
                      <a
                        key={index}
                        href="javascript:void(0)"
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-md"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div> */}

              {/* Footer */}
              {/* <div className="py-4 flex justify-center gap-3">
                  <a
                    href="javascript:void(0)"
                    className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition text-sm shadow-md"
                  >
                    <FaPhone className="w-4 h-4" />
                    Contact Me
                  </a>

                  <a
                    href="javascript:void(0)"
                    className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition text-sm shadow-md"
                  >
                    <FaEye className="w-4 h-4" />
                    All Listings
                  </a>
                </div>
              </div> */}
              <div className="max-w-lg mx-auto bg-white shadow-sm mt-4 rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="py-3 px-6 text-left border-b border-gray-200">
                  <h3 className="text-lg font-semibold">
                    Details Shares Through
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-6 flex justify-center gap-3">
                  {[
                    {
                      icon: FaFacebookF,
                      bg: "!bg-blue-600",
                      hover: "hover:bg-blue-700",
                    },
                    {
                      icon: FaTwitter,
                      bg: "!bg-sky-500",
                      hover: "hover:bg-sky-600",
                    },
                    {
                      icon: FaGoogle,
                      bg: "!bg-red-500",
                      hover: "hover:bg-red-600",
                    },
                    {
                      icon: FaDribbble,
                      bg: "!bg-pink-500",
                      hover: "hover:bg-pink-600",
                    },
                    {
                      icon: FaPinterest,
                      bg: "!bg-red-600",
                      hover: "hover:bg-red-700",
                    },
                  ].map(({ icon: Icon, bg, hover }, index) => (
                    <a
                      key={index}
                      href="javascript:void(0)"
                      className={`w-6 h-6 flex items-center justify-center ${bg} ${hover} text-white rounded-full transition duration-300`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              {/* <div className="max-w-lg mx-auto bg-white shadow-sm mt-4 rounded-lg overflow-hidden"> */}
              {/* Card Header */}
              {/* <div className="bg-gray-100 px-5 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Search Listings
                  </h3>
                </div> */}

              {/* Card Body */}

              {/* <div className="max-w-lg mx-auto bg-white mt-4 rounded-lg overflow-visible p-5"> */}
              {/* Search Input */}
              {/* <div className="relative w-full max-w-xs" ref={dropdownRef}> */}
              {/* Search Input */}
              {/* <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-full px-4 py-2 border rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition">
                        <FaSearch className="w-5 h-5" />
                      </button>
                    </div> */}

              {/* Dropdown Button */}
              {/* <button
                      onClick={handleDropdownClick}
                      className="w-full flex items-center justify-between px-4 py-2 border rounded-full border-gray-300  bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition overflow-hidden"
                    >
                      <span>{selected}</span>
                      <FaChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button> */}

              {/* Dropdown List (with Search Bar) */}
              {/* {isOpen && ( */}
              {/* // <div className="absolute left-0 top-full w-full bg-white border border-gray-300 shadow-lg z-50 rounded-lg"> */}
              {/* 🔍 Search Input for Filtering */}
              {/* <div className="p-2 border-b">
                          <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          /> */}
              {/* </div> */}

              {/* Dropdown Items */}
              {/* <ul className="max-h-60 overflow-y-auto">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((category, index) => (
                              <li
                                key={index}
                                onMouseDown={() =>
                                  handleCategorySelect(category)
                                }
                                className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition"
                              >
                                {category}
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-2 text-gray-500">
                              No results found
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div> */}

              {/* Search Button (Now Always Visible) */}
              {/* <button className="px-4 py-2 bg-blue-500 mt-2 text-white rounded-full hover:bg-blue-600 transition">
                    Search
                  </button> */}
              {/* </div> */}
              {/* </div> */}
              <div className="max-w-lg mx-auto bg-white shadow-sm mt-4 rounded-lg overflow-hidden">
                <div className="py-3 px-3 text-left border-b border-gray-200">
                  <h3 className="text-lg font-semibold">
                    Recent Business Post
                  </h3>
                </div>
                <div className="flex mt-4 p-3">
                  {/* Added flex container */}
                  <div className="relative w-[350px] shrink-0 bg-white border rounded-lg overflow-hidden">
                    {/* Ribbon */}
                    <div className="absolute top-14 -left-4 bg-gray-600 text-white text-xs px-4 py-1 z-10 transform -rotate-45 origin-top-left">
                      Featured
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-58 overflow-hidden">
                      <img
                        src="/images/products/sp9.jpg"
                        alt="img"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:brightness-50"
                      />
                      <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-md z-10">
                        Beauty & Spa
                      </div>
                    </div>
                    {/* Icons */}
                    <div className="absolute top-2 right-2 flex gap-2 z-10">
                      <button className="bg-black  bg-opacity-70 rounded-full p-1 shadow">
                        <CiHeart className="text-white" />
                      </button>
                      <button className="bg-black  bg-opacity-70 rounded-full p-1 shadow">
                        <FaPencilAlt className="text-white" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 mb-2">
                      <div className="text-gray-500 text-sm">
                        <StarRating />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 mt-2  flex items-center">
                        Goozer Beauty & Spa
                        <span className="inline-flex items-center justify-center ml-2 w-4 h-4 bg-green-500 text-white text-[10px] rounded-full">
                          ✓
                        </span>
                      </h4>
                      {/* Row and Column Alignment */}
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <IoLocationOutline className="mr-2" />
                          New York
                        </div>
                        <div className="flex items-center">
                          <SlCalender className="mr-2" />2 hours ago
                        </div>
                        <div className="flex items-center">
                          <CiUser className="mr-2" />
                          Clara Pixley
                        </div>
                        <div className="flex items-center">
                          <FaPhoneAlt className="mr-2" />
                          256-654-6859
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
