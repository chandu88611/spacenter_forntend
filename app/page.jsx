"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";

import { FiSearch, FiPlay, FiPause, FiHeart } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetAllBusinessesQuery } from "@/redux/services/businessApi";
import CategoriesSlider from "@/components/CategorySlider";
import CategoriesList from "@/components/CategoriesList";
import RecentActivity from "@/components/RecentActivity";

export default function Home() {
  const [txt, setTxt] = useState("");
  const toRotate = ["Runs in all Market"];
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setloading] = useState(false);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetAllBusinessesQuery({ page, limit, search });

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

      <section className="sptb bg-white">
        <div className="container">
          <div className="section-title center-block text-center">
            <h2>Latest Listings</h2>
            <p>
              Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur
              vehicula
            </p>
          </div>
          <div
            id="myCarousel1"
            className="owl-carousel owl-carousel-icons2 owl-loaded owl-drag"
          >
            <div className="owl-stage-outer">
              <Swiper
                modules={[Navigation, Autoplay]}
                //   navigation={{
                //     nextEl: ".swiper-button-next",
                //     prevEl: ".swiper-button-prev",
                //   }}
                className="owl-stage"
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={25}
                slidesPerView="auto"
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
              >
                <SwiperSlide
                  className="owl-item cloned "
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="power-ribbon power-ribbon-top-left text-warning">
                        <span className="bg-warning">
                          <i className="fa fa-bolt" />
                        </span>
                      </div>
                      <div className="item-card2-img">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="https://www.spruko.com/demo/bizdire/Bizdire/assets/images/products/products/ed6.jpg"
                          alt="img"
                          className="cover-image"
                        />
                        <div className="item-card2-icons">
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-l"
                          >
                            <i className="fa fa-cutlery" />
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-r"
                          >
                            <i className="fa fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="blog--category">Restaurant</div>
                      </div>
                      <div className="card-body pb-0">
                        <div className="item-card2">
                          <div className="item-card2-desc">
                            <div className="item-card2-text">
                              <a href="business.html" className="text-dark">
                                <h4 className="mb-0">Somik Restaurant</h4>
                              </a>
                            </div>
                            <div className="pt-3">
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-map-marker me-2" />
                                  Factdale, Canada
                                </p>
                              </a>
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-phone me-2" />
                                  +63 854-968-854
                                </p>
                              </a>
                              <p className="pb-0 pt-0 mb-2 mt-2">
                                <i className="fa fa-clock-o me-2" />
                                10am - 7pm
                                <a>
                                  <span className="badge badge-danger ms-2 fs-13">
                                    Closed
                                  </span>
                                </a>
                              </p>
                            </div>
                            <p className="">
                              Lorem ipsum dolor sit amet, quis int nostrum
                              exercitationem
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="item-card2-footer">
                          <div className="item-card2-footer-u">
                            <div className="d-flex">
                              <div className="d-inline-flex">
                                <div
                                  className="rating-star sm my-rating-5"
                                  data-rating={3}
                                >
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-345{fill:url(#345_SVGID_1_);}.svg-hovered-345{fill:url(#345_SVGID_2_);}.svg-active-345{fill:url(#345_SVGID_3_);}.svg-rated-345{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="345_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-345"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-345{fill:url(#345_SVGID_1_);}.svg-hovered-345{fill:url(#345_SVGID_2_);}.svg-active-345{fill:url(#345_SVGID_3_);}.svg-rated-345{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="345_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-345"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-345{fill:url(#345_SVGID_1_);}.svg-hovered-345{fill:url(#345_SVGID_2_);}.svg-active-345{fill:url(#345_SVGID_3_);}.svg-rated-345{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="345_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-345"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-345{fill:url(#345_SVGID_1_);}.svg-hovered-345{fill:url(#345_SVGID_2_);}.svg-active-345{fill:url(#345_SVGID_3_);}.svg-rated-345{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="345_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-empty-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-345"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-345{fill:url(#345_SVGID_1_);}.svg-hovered-345{fill:url(#345_SVGID_2_);}.svg-active-345{fill:url(#345_SVGID_3_);}.svg-rated-345{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="345_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="345_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-empty-345"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-345"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                </div>
                                (42 Reviews)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  className="owl-item animated "
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="power-ribbon power-ribbon-top-left text-warning">
                        <span className="bg-warning">
                          <i className="fa fa-bolt" />
                        </span>
                      </div>
                      <div className="item-card2-img">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="https://www.spruko.com/demo/bizdire/Bizdire/assets/images/products/products/ed6.jpg"
                          alt="img"
                          className="cover-image"
                        />
                        <div className="item-card2-icons">
                          <a
                            href="business.html"
                            className="item-card2-icons-l"
                          >
                            <i className="fa fa-cutlery" />
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-r"
                          >
                            <i className="fa fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="blog--category">Restaurant</div>
                      </div>
                      <div className="card-body pb-0">
                        <div className="item-card2">
                          <div className="item-card2-desc">
                            <div className="item-card2-text">
                              <a href="business.html" className="text-dark">
                                <h4 className="mb-0">Somik Restaurant</h4>
                              </a>
                            </div>
                            <div className="pt-3">
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-map-marker me-2" />
                                  Florida, USA
                                </p>
                              </a>
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-phone me-2" />
                                  +63 658-865-965
                                </p>
                              </a>
                              <p className="pb-0 pt-0 mb-2 mt-2">
                                <i className="fa fa-clock-o me-2" />
                                10am - 9pm
                                <a>
                                  <span className="badge badge-success ms-2 fs-13">
                                    Open Now
                                  </span>
                                </a>
                              </p>
                            </div>
                            <p className="">
                              Lorem ipsum dolor sit amet, quis int nostrum
                              exercitationem
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="item-card2-footer">
                          <div className="item-card2-footer-u">
                            <div className="d-flex">
                              <div className="d-inline-flex">
                                <div
                                  className="rating-star sm my-rating-5"
                                  data-rating={4}
                                >
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-26{fill:url(#26_SVGID_1_);}.svg-hovered-26{fill:url(#26_SVGID_2_);}.svg-active-26{fill:url(#26_SVGID_3_);}.svg-rated-26{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="26_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-26"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-26{fill:url(#26_SVGID_1_);}.svg-hovered-26{fill:url(#26_SVGID_2_);}.svg-active-26{fill:url(#26_SVGID_3_);}.svg-rated-26{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="26_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-26"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-26{fill:url(#26_SVGID_1_);}.svg-hovered-26{fill:url(#26_SVGID_2_);}.svg-active-26{fill:url(#26_SVGID_3_);}.svg-rated-26{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="26_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-26"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-26{fill:url(#26_SVGID_1_);}.svg-hovered-26{fill:url(#26_SVGID_2_);}.svg-active-26{fill:url(#26_SVGID_3_);}.svg-rated-26{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="26_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-26"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-26{fill:url(#26_SVGID_1_);}.svg-hovered-26{fill:url(#26_SVGID_2_);}.svg-active-26{fill:url(#26_SVGID_3_);}.svg-rated-26{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="26_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="26_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-empty-26"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-26"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                </div>
                                (25 Reviews)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  className="owl-item animated  "
                  style={{ width: "543.2px", marginRight: 25, left: 569 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="power-ribbon power-ribbon-top-left text-warning">
                        <span className="bg-warning">
                          <i className="fa fa-bolt" />
                        </span>
                      </div>
                      <div className="item-card2-img">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="https://www.spruko.com/demo/bizdire/Bizdire/assets/images/products/products/ed6.jpg"
                          alt="img"
                          className="cover-image"
                        />
                        <div className="item-card2-icons">
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-l"
                          >
                            <i className="fa fa-home" />
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-r"
                          >
                            <i className="fa fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="blog--category">Hotel</div>
                      </div>
                      <div className="card-body pb-0">
                        <div className="item-card2">
                          <div className="item-card2-desc">
                            <div className="item-card2-text">
                              <a href="business.html" className="text-dark">
                                <h4 className="mb-0">GilkonStar Hotel</h4>
                              </a>
                            </div>
                            <div className="pt-3">
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-map-marker me-2" />
                                  Hollowstead, USA
                                </p>
                              </a>
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-phone me-2" />
                                  +63 658-965-865
                                </p>
                              </a>
                              <p className="pb-0 pt-0 mb-2 mt-2">
                                <i className="fa fa-clock-o me-2" />
                                9am - 9pm
                                <a>
                                  <span className="badge badge-success ms-2 fs-13">
                                    Open Now
                                  </span>
                                </a>
                              </p>
                            </div>
                            <p className="">
                              Lorem ipsum dolor sit amet, quis int nostrum
                              exercitationem
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="item-card2-footer ">
                          <div className="item-card2-footer-u">
                            <div className="d-flex">
                              <div className="d-inline-flex">
                                <div
                                  className="rating-star sm my-rating-5"
                                  data-rating="4.5"
                                >
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-841{fill:url(#841_SVGID_1_);}.svg-hovered-841{fill:url(#841_SVGID_2_);}.svg-active-841{fill:url(#841_SVGID_3_);}.svg-rated-841{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="841_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-841"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-841{fill:url(#841_SVGID_1_);}.svg-hovered-841{fill:url(#841_SVGID_2_);}.svg-active-841{fill:url(#841_SVGID_3_);}.svg-rated-841{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="841_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-841"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-841{fill:url(#841_SVGID_1_);}.svg-hovered-841{fill:url(#841_SVGID_2_);}.svg-active-841{fill:url(#841_SVGID_3_);}.svg-rated-841{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="841_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-841"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-841{fill:url(#841_SVGID_1_);}.svg-hovered-841{fill:url(#841_SVGID_2_);}.svg-active-841{fill:url(#841_SVGID_3_);}.svg-rated-841{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="841_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-841"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-841{fill:url(#841_SVGID_1_);}.svg-hovered-841{fill:url(#841_SVGID_2_);}.svg-active-841{fill:url(#841_SVGID_3_);}.svg-rated-841{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="841_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="841_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-841"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-841"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                </div>
                                (27 Reviews)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  className="owl-item animated "
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card2-img">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="https://www.spruko.com/demo/bizdire/Bizdire/assets/images/products/products/ed6.jpg"
                          alt="img"
                          className="cover-image"
                        />
                        <div className="item-card2-icons">
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-l"
                          >
                            <i className="fa fa-home" />
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-r"
                          >
                            <i className="fa fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="blog--category">beauty &amp; Spa</div>
                      </div>
                      <div className="card-body pb-0">
                        <div className="item-card2">
                          <div className="item-card2-desc">
                            <div className="item-card2-text">
                              <a href="business.html" className="text-dark">
                                <h4 className="mb-0">Sear Beauty &amp; Spa</h4>
                              </a>
                            </div>
                            <div className="pt-3">
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-map-marker me-2" />
                                  Mannorstead, China
                                </p>
                              </a>
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-phone me-2" />
                                  +63 965-865-956
                                </p>
                              </a>
                              <p className="pb-0 pt-0 mb-2 mt-2">
                                <i className="fa fa-clock-o me-2" />
                                8am - 6pm
                                <a>
                                  <span className="badge badge-danger ms-2 fs-13">
                                    Closed
                                  </span>
                                </a>
                              </p>
                            </div>
                            <p className="">
                              Lorem ipsum dolor sit amet, quis int nostrum
                              exercitationem
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="item-card2-footer">
                          <div className="item-card2-footer-u">
                            <div className="d-flex">
                              <div className="d-inline-flex">
                                <div
                                  className="rating-star sm my-rating-5"
                                  data-rating="4.5"
                                >
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-86{fill:url(#86_SVGID_1_);}.svg-hovered-86{fill:url(#86_SVGID_2_);}.svg-active-86{fill:url(#86_SVGID_3_);}.svg-rated-86{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="86_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-86"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-86{fill:url(#86_SVGID_1_);}.svg-hovered-86{fill:url(#86_SVGID_2_);}.svg-active-86{fill:url(#86_SVGID_3_);}.svg-rated-86{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="86_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-86"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-86{fill:url(#86_SVGID_1_);}.svg-hovered-86{fill:url(#86_SVGID_2_);}.svg-active-86{fill:url(#86_SVGID_3_);}.svg-rated-86{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="86_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-86"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-86{fill:url(#86_SVGID_1_);}.svg-hovered-86{fill:url(#86_SVGID_2_);}.svg-active-86{fill:url(#86_SVGID_3_);}.svg-rated-86{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="86_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-86"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-86{fill:url(#86_SVGID_1_);}.svg-hovered-86{fill:url(#86_SVGID_2_);}.svg-active-86{fill:url(#86_SVGID_3_);}.svg-rated-86{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="86_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="86_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-86"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-86"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                </div>
                                (75 Reviews)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide
                  className="owl-item animated  "
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card2-img">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="https://www.spruko.com/demo/bizdire/Bizdire/assets/images/products/products/ed6.jpg"
                          alt="img"
                          className="cover-image"
                        />
                        <div className="item-card2-icons">
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-l"
                          >
                            <i className="fa fa-home" />
                          </a>
                          <a
                            href="javascript:void(0)"
                            className="item-card2-icons-r"
                          >
                            <i className="fa fa fa-heart-o" />
                          </a>
                        </div>
                        <div className="blog--category">automobiles</div>
                      </div>
                      <div className="card-body pb-0">
                        <div className="item-card2">
                          <div className="item-card2-desc">
                            <div className="item-card2-text">
                              <a href="business.html" className="text-dark">
                                <h4 className="mb-0">Seep Automobiles</h4>
                              </a>
                            </div>
                            <div className="pt-3">
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-map-marker me-2" />
                                  East Hardfolk, UK
                                </p>
                              </a>
                              <a href="mb-1">
                                <p className="pb-0 pt-0 mb-2 mt-2">
                                  <i className="fa fa-phone me-2" />
                                  +63 968-569-854
                                </p>
                              </a>
                              <p className="pb-0 pt-0 mb-2 mt-2">
                                <i className="fa fa-clock-o me-2" />
                                9am - 7pm
                                <a>
                                  <span className="badge badge-success ms-2 fs-13">
                                    Open Now
                                  </span>
                                </a>
                              </p>
                            </div>
                            <p className="">
                              Lorem ipsum dolor sit amet, quis int nostrum
                              exercitationem
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="item-card2-footer">
                          <div className="item-card2-footer-u">
                            <div className="d-flex">
                              <div className="d-inline-flex">
                                <div
                                  className="rating-star sm my-rating-5"
                                  data-rating="2.5"
                                >
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-567{fill:url(#567_SVGID_1_);}.svg-hovered-567{fill:url(#567_SVGID_2_);}.svg-active-567{fill:url(#567_SVGID_3_);}.svg-rated-567{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="567_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-567"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-567{fill:url(#567_SVGID_1_);}.svg-hovered-567{fill:url(#567_SVGID_2_);}.svg-active-567{fill:url(#567_SVGID_3_);}.svg-rated-567{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="567_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-active-567"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-567{fill:url(#567_SVGID_1_);}.svg-hovered-567{fill:url(#567_SVGID_2_);}.svg-active-567{fill:url(#567_SVGID_3_);}.svg-rated-567{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="567_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-active-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-567"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-567{fill:url(#567_SVGID_1_);}.svg-hovered-567{fill:url(#567_SVGID_2_);}.svg-active-567{fill:url(#567_SVGID_3_);}.svg-rated-567{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="567_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-empty-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-567"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className="jq-star"
                                    style={{ width: 35, height: 35 }}
                                  >
                                    <svg
                                      version={1.0}
                                      className="jq-star-svg"
                                      shapeRendering="geometricPrecision"
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="305px"
                                      height="305px"
                                      viewBox="60 -62 309 309"
                                      style={{
                                        enableBackground: "new 64 -59 305 305",
                                        strokeWidth: 0,
                                      }}
                                      xmlSpace="preserve"
                                    >
                                      <style
                                        type="text/css"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            ".svg-empty-567{fill:url(#567_SVGID_1_);}.svg-hovered-567{fill:url(#567_SVGID_2_);}.svg-active-567{fill:url(#567_SVGID_3_);}.svg-rated-567{fill:#f1c40f;}",
                                        }}
                                      />
                                      <linearGradient
                                        id="567_SVGID_1_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "lightgray" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_2_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="567_SVGID_3_"
                                        gradientUnits="userSpaceOnUse"
                                        x1={0}
                                        y1={-50}
                                        x2={0}
                                        y2={250}
                                      >
                                        <stop
                                          offset={0}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                        <stop
                                          offset={1}
                                          style={{ stopColor: "#f1c40f" }}
                                        />
                                      </linearGradient>
                                      <polygon
                                        data-side="center"
                                        className="svg-empty-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 "
                                        style={{
                                          fill: "transparent",
                                          stroke: "#83829c",
                                        }}
                                      />
                                      <polygon
                                        data-side="left"
                                        className="svg-empty-567"
                                        points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                      <polygon
                                        data-side="right"
                                        className="svg-empty-567"
                                        points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 "
                                        style={{ strokeOpacity: 0 }}
                                      />
                                    </svg>
                                  </div>
                                </div>
                                (14 Reviews)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="owl-nav">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
            <div className="owl-dots " />
          </div>
        </div>
      </section>
      {/* <RecentActivity /> */}
      <CategoriesList />
      {/* <section className="sptb bg-patterns bg-white">
        <div className="container">
          <div className="section-title center-block text-center">
            <h2>Featured Listings</h2>
            <p>
              Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur
              vehicula
            </p>
          </div>
          <div
            id="myCarousel2"
            className="owl-carousel owl-carousel-icons2 owl-loaded owl-drag"
          >
            {/* Wrapper for carousel items */}
      {/* <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(-3409px, 0px, 0px)",
                  transition: "all",
                  width: 6251,
                }}
              >
                <div
                  className="owl-item cloned"
                  style={{ width: "543.2px", marginRight: 25 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/v4.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          AutoMobile
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">Gittbo AutoMobiles</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 22 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                London
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                5 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                12 654 86596
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/male/18.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Wendy Peake
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-muted"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Wishlist"
                              aria-label="Add Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: "543.2px", marginRight: 25 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/f2.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          Restaurant
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">Chinese Restaurant</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 12 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                UK
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                1 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 675 65430
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/female/12.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Wendy Peake
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-pink"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Remove from Wishlist"
                              aria-label="Remove from Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned animated owl-animated-out fadeOutDown"
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="arrow-ribbon bg-primary">
                        Open at 5'o clock
                      </div>
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/j3.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          Beauty
                        </a>
                        <h4 className="mb-0">18% Off</h4>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text  d-flex">
                            <a href="business.html" className="text-dark">
                              <h4 className="">FrogeBeauty &amp; Spa</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 632 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                USA
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                22 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 675 65430
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/female/19.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Elizabeth
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="business.html"
                              className="text-muted"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Wishlist"
                              aria-label="Add Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item animated owl-animated-in fadeInDowm owl-animated-out fadeOutDown"
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="arrow-ribbon bg-success">Open</div>
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/b3.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          Beauty &amp; Spa
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">Golik Beauty &amp; Spa</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 12 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                Canada
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                1 hour ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 352 69855
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/female/17.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Victoria
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-pink"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Remove from Wishlist"
                              aria-label="Remove from Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item animated owl-animated-in fadeInDowm owl-animated-out fadeOutDown"
                  style={{ width: "543.2px", marginRight: 25, left: 569 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/h3.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          RealEstate
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">2Bk Deluxe Flat</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 9 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                USA
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                2 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 358 96584
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/male/17.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Christopher
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-muted"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Wishlist"
                              aria-label="Add Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item animated owl-animated-in fadeInDowm owl-animated-out fadeOutDown"
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/v4.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          AutoMobile
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">Gittbo AutoMobiles</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 22 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                London
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                5 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                12 654 86596
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/male/18.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Wendy Peake
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-muted"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Wishlist"
                              aria-label="Add Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item animated owl-animated-in fadeInDowm owl-animated-out fadeOutDown active"
                  style={{ width: "543.2px", marginRight: 25, left: 568 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/f2.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          Restaurant
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">Chinese Restaurant</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 12 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                UK
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                1 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 675 65430
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/female/12.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Wendy Peake
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-pink"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Remove from Wishlist"
                              aria-label="Remove from Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item animated owl-animated-in fadeInDowm"
                  style={{ width: "543.2px", marginRight: 25 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="arrow-ribbon bg-primary">
                        Open at 5'o clock
                      </div>
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/j3.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          Beauty
                        </a>
                        <h4 className="mb-0">18% Off</h4>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text  d-flex">
                            <a href="business.html" className="text-dark">
                              <h4 className="">FrogeBeauty &amp; Spa</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 632 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                USA
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                22 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 675 65430
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/female/19.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Elizabeth
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="business.html"
                              className="text-muted"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Wishlist"
                              aria-label="Add Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: "543.2px", marginRight: 25 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="arrow-ribbon bg-success">Open</div>
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/b3.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          Beauty &amp; Spa
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">Golik Beauty &amp; Spa</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 12 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                Canada
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                1 hour ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 352 69855
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/female/17.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Victoria
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-pink"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Remove from Wishlist"
                              aria-label="Remove from Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: "543.2px", marginRight: 25 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/h3.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          RealEstate
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">2Bk Deluxe Flat</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 9 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                USA
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                2 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                14 358 96584
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/male/17.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Christopher
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-muted"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Wishlist"
                              aria-label="Add Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="owl-item cloned"
                  style={{ width: "543.2px", marginRight: 25 }}
                >
                  <div className="item">
                    <div className="card mb-0 overflow-hidden">
                      <div className="item-card7-imgs">
                        <a href="business.html" className="absolute-link" />
                        <img
                          src="../assets/images/products/products/v4.jpg"
                          alt="img"
                          className="cover-image"
                        />
                      </div>
                      <div className="item-card7-overlaytext">
                        <a href="business.html" className="text-white">
                          AutoMobile
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="item-card7-desc">
                          <div className="item-card7-text">
                            <a href="business.html" className="text-dark">
                              <h4 className="">Gittbo AutoMobiles</h4>
                            </a>
                          </div>
                          <ul className="item-cards7-ic mb-0">
                            <li>
                              <a href="javascript:void(0)">
                                <span className="">
                                  <i className="icon icon-eye me-1" /> 22 Views
                                </span>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-location-pin text-muted me-1" />
                                London
                              </a>
                            </li>
                            <li className="mb-md-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-event text-muted me-1" />
                                5 hours ago
                              </a>
                            </li>
                            <li className="mb-0">
                              <a href="javascript:void(0)" className="icons">
                                <i className="icon icon-phone text-muted me-1" />
                                12 654 86596
                              </a>
                            </li>
                          </ul>
                          <p className="mb-0">
                            Omnis iste natus error sit dolore dg voluptatem
                            accusantium
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footerimg d-flex mt-0 mb-0">
                          <div className="d-flex footerimg-l mb-0">
                            <img
                              src="../assets/images/faces/male/18.jpg"
                              alt="image"
                              className="avatar brround  me-2"
                            />
                            <h5 className="time-title text-muted p-0 leading-normal mt-2 mb-0">
                              Wendy Peake
                              <i
                                className="icon icon-check text-success fs-12 ms-1"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title=""
                                data-bs-original-title="verified"
                                aria-label="verified"
                              />
                            </h5>
                          </div>
                          <div className="mt-2 footerimg-r ms-auto">
                            <a
                              href="javascript:void(0)"
                              className="text-muted"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              data-bs-original-title="Add Wishlist"
                              aria-label="Add Wishlist"
                            >
                              <i className="fa fa-heart" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-nav">
              <button type="button" role="presentation" className="owl-prev">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <span aria-label="Next">›</span>
              </button>
            </div>
            <div className="owl-dots disabled" />
          </div>
        </div>
      </section> */}
      <section>
        <div
          className="about-1 cover-image sptb bg-background-color"
          data-bs-image-src="../assets/images/banners/banner5.jpg"
          style={{
            background:
              'url("../assets/images/banners/banner5.jpg") center center',
          }}
        >
          <div className="content-text mb-0 text-white info">
            <div className="container">
              <div className="row text-center">
                <div className="col-lg-3 col-md-6">
                  <div className="counter-status status md-lg-0">
                    <div className="counter-icon text-secondary">
                      <i className="icon icon-docs" />
                    </div>
                    <h5>Total Listings</h5>
                    <h2 className="counter mb-0">17,846</h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter-status status-1 md-lg-0">
                    <div className="counter-icon text-warning">
                      <i className="icon icon-rocket" />
                    </div>
                    <h5>Featured Listings</h5>
                    <h2 className="counter mb-0">5,463</h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter-status mb-md-0">
                    <div className="counter-icon">
                      <i className="icon icon-people" />
                    </div>
                    <h5> Our Clients</h5>
                    <h2 className="counter mb-0">7,569</h2>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="counter-status status mb-0">
                    <div className="counter-icon text-success">
                      <i className="icon icon-emotsmile" />
                    </div>
                    <h5>Happy Customers</h5>
                    <h2 className="counter mb-0">7,253</h2>
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
