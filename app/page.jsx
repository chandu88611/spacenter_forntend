"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";

import { FiSearch, FiPlay, FiPause, FiHeart } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  useGetAllBusinessesQuery,
  useGetLatestBusinessesQuery,
} from "@/redux/services/businessApi";
import CategoriesSlider from "@/components/CategorySlider";
import CategoriesList from "@/components/CategoriesList";
import LatestListings from "@/components/LatestListings";

import RecentActivity from "@/components/RecentActivity";
import { FaRegFileAlt, FaRocket, FaSmile, FaUsers } from "react-icons/fa";

export default function Home() {
  const [txt, setTxt] = useState("");
  const toRotate = ["Runs in all Market"];
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setloading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetAllBusinessesQuery({ page, limit, search });

  const {
    data: latestBusinessesData,
    isLoading: isLatestLoading,
    isSuccess: isLatestSuccess,
    isError: isLatestError,
    error: latestError,
  } = useGetLatestBusinessesQuery();

  const [latestListings, setLatestListings] = useState([]);

  useEffect(() => {
    if (isLatestSuccess && latestBusinessesData?.data?.length > 0) {
      setLatestListings(latestBusinessesData.data);
    }
  }, [isLatestSuccess, latestBusinessesData]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const slides = [
    {
      image: "/images/hero/business1.jpg",
      title: "Top Restaurants Near You",
      searchText: "Seafood, Biryani, Fast Food",
    },
    {
      image: "/images/hero/business2.jpg",
      title: "Reliable Car Services",
      searchText: "Repair, Maintenance, Auto Parts",
    },
    {
      image: "/images/hero/business3.jpg",
      title: "Best Salons & Spas",
      searchText: "Haircuts, Facials, Massage",
    },
    {
      image: "/images/hero/business4.jpg",
      title: "Premium Gyms Nearby",
      searchText: "Yoga, Cardio, Strength",
    },
  ];

  const text = "uns in all Market";
  const period = 100;
  const [displayText, setDisplayText] = useState("R");
  const [textIndex, setTextIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideDuration = 10000; // 10 seconds per slide

  useEffect(() => {
    AOS.init({ duration: 1000, once: false }); // Initialize AOS

    if (!isPlaying) return;

    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 300);

    const slideInterval = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideInterval);
    };
  }, [currentSlide, isPlaying]);

  return (
    <>
      <section className="relative h-[90vh] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-start pt-56 md:pt-40 items-start text-left  text-white pl-12 md:pl-80 pr-10">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-white">
                {slide.title}
              </h1>
              <a
                href="/search"
                className="flex items-center gap-3 px-3 py-2 border border-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <FiSearch className="w-5 h-5 text-blue-600" />
                <span>{slide.searchText}</span>
              </a>
            </div>
          </div>
        ))}
        {/* Dots Progress Indicator (Left Side) */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-2 items-center sm:left-6 md:left-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative w-5 h-8 sm:w-6 sm:h-10 md:h-12 flex items-center justify-center"
            >
              {/* Background Dot (Tall & Slim) */}
              <div className="w-1.5 h-8 sm:w-2 sm:h-10 md:h-12 bg-gray-500 rounded-full relative overflow-hidden">
                {/* Progress Fill */}
                {index === currentSlide && (
                  <div
                    className="absolute left-0 top-0 w-full bg-white rounded-full transition-all"
                    style={{ height: `${progress}%` }}
                  />
                )}
              </div>
            </button>
          ))}

          {/* Play/Pause Button - Mobile & Desktop Responsive */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="mt-4 w-4 h-4 flex items-center justify-center text-white bg-gray-500  rounded-full transition hover:bg-gray-500 sm:w-8 sm:h-8 md:w-10 md:h-10"
          >
            {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
          </button>
        </div>
      </section>
      <CategoriesSlider />
      <section className="sptb bg-white ">
        <div className="container ">
          <div className="section-title center-block text-center">
            <h2>Latest Listings</h2>
            <p>
              Discover the latest business listings near you, including
              top-rated restaurants, relaxing beauty & spa centers, luxurious
              hotels & resorts, and trusted pet stores. Stay updated with new
              additions and explore services tailored to your needs.
            </p>
          </div>
          {/* <div
            id="myCarousel1"
            className="owl-carousel owl-carousel-icons2 owl-loaded owl-drag"
                  style={{ position: "relative", overflow: "hidden" }}

          > */}
          {!isLatestLoading && latestListings.length > 0 && (
            // <div className="owl-stage-outer">
            <LatestListings listings={latestListings} />
            // </div>
          )}
          {/* <RecentActivity /> */}
        </div>
      </section>
      <CategoriesList />
      <section>
        <div
          className="about-1 cover-image sptb"
          data-bs-image-src="../assets/images/banners/banner5.jpg"
          style={{
            background:
              'url("../assets/images/banners/banner5.jpg") center center',
            backgroundSize: "cover",
            backgroundColor: "#f4f4f4", // Replace with the desired color (e.g., light grey)
            padding: "50px 0",
          }}
        >
          <div className="content-text mb-0 text-light info">
            <div className="container">
              <div className="row text-center">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div
                    className="counter-status status mb-0"
                    style={{
                      backgroundColor: "#0f336d",
                      padding: "20px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      className="counter-icon text-white"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "3rem",
                      }}
                    >
                      <FaRegFileAlt />
                    </div>

                    <h6 style={{ color: "#fefefe" }}>Total Listings</h6>
                    <h2 className="counter mb-0 text-white">17,846</h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div
                    className="counter-status status mb-0"
                    style={{
                      backgroundColor: "#0f336d",
                      padding: "20px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      className="counter-icon text-white"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "3rem",
                      }}
                    >
                      <FaRocket />
                    </div>
                    <h6 style={{ color: "#fefefe" }}>Featured Listings</h6>
                    <h2 className="counter mb-0 text-white">5,463</h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div
                    className="counter-status status mb-0"
                    style={{
                      backgroundColor: "#0f336d",
                      padding: "20px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      className="counter-icon text-white"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "3rem",
                      }}
                    >
                      <FaUsers />
                    </div>
                    <h6 style={{ color: "#fefefe" }}>Our Clients</h6>
                    <h2 className="counter mb-0 text-white">7,569</h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div
                    className="counter-status status mb-0"
                    style={{
                      backgroundColor: "#0f336d",
                      padding: "20px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      className="counter-icon text-white"
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "3rem",
                      }}
                    >
                      <FaSmile />
                    </div>
                    <h6 style={{ color: "#fefefe" }}>Happy Customers</h6>
                    <h2 className="counter mb-0 text-white">7,253</h2>
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
