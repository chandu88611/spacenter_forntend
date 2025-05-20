import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// const images = [
//   "/images/products/sp1.jpg",
//   "/images/products/sp2.jpg",
//   "/images/products/sp3.jpg",
//   "/images/products/sp4.jpg",
//   "/images/products/sp5.jpg",
//   "/images/products/sp6.jpg",
//   "/images/products/sp7.jpg",
//   "/images/products/sp8.jpg",
//   "/images/products/sp9.jpg",
//   "/images/products/sp10.jpg",
// ];

export default function ProductSlider({ imageUrls = [] }) {
  const images = imageUrls.length > 0 ? imageUrls : ["/images/default.jpg"];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbIndex, setThumbIndex] = useState(0);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Price Tag */}
      <div className="absolute top-0 left-0 bg-[#1b09bd] text-white px-3 py-2 text-sm font-semibold shadow-lg z-10 flex items-center">
        <span>$539</span>
        <div className="absolute top-0 right-[-10px] w-0 h-0 border-l-[10px] border-l-[#1b09bd] border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent" />
      </div>

      {/* Main Slider */}
      <div className="relative group h-[450px]">
        <Swiper
          loop={true}
          navigation={{
            nextEl: ".main-next",
            prevEl: ".main-prev",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="rounded-lg shadow-md h-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                crossOrigin="anonymous"
                src={img}
                alt={`Product ${index + 1}`}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="main-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10">
          <FaChevronLeft size={24} />
        </button>
        <button className="main-next absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10">
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnail Slider */}
      <div className="relative mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={5}
          slidesPerView={6}
          watchSlidesProgress
          modules={[Thumbs, Navigation]}
          navigation={{
            nextEl: ".thumb-next",
            prevEl: ".thumb-prev",
          }}
          className="rounded-md"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              onClick={() => thumbsSwiper?.slideTo(index)}
            >
              <img
                crossOrigin="anonymous"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-20 object-cover rounded-md border-2 transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? "border-blue-500 opacity-100"
                    : "border-transparent opacity-50"
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="thumb-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10">
          <FaChevronLeft size={16} />
        </button>
        <button className="thumb-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10">
          <FaChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// export default function ProductSlider() {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [thumbIndex, setThumbIndex] = useState(0);

//   return (
//     <div className="relative w-full max-w-3xl mx-auto">
//       {/* Price Tag */}
//       <div className="absolute top-0 left-0 bg-[#1b09bd] text-white px-3 py-2 text-sm font-semibold shadow-lg z-10 flex items-center">
//         <span>$539</span>
//         {/* Arrow at the end */}
//         <div
//           className="absolute top-0 right-[-10px] w-0 h-0
//     border-l-[10px] border-l-[#1b09bd] border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent"
//         />
//       </div>
//       {/* Main Slider */}
//       <div className="relative group h-[450px]">
//         {" "}
//         {/* Increased height */}
//         <Swiper
//           loop={true}
//           navigation={{
//             nextEl: ".main-next",
//             prevEl: ".main-prev",
//           }}
//           thumbs={{ swiper: thumbsSwiper }}
//           modules={[Navigation, Thumbs]}
//           className="rounded-lg shadow-md h-full"
//           onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//         >
//           {images.map((img, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={img}
//                 alt={`Product ${index + 1}`}
//                 className="w-full h-[450px] object-cover rounded-lg" // Increased height
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {/* Main Slider Navigation */}
//         <button className="main-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10">
//           <FaChevronLeft size={24} />
//         </button>
//         <button className="main-next absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10">
//           <FaChevronRight size={24} />
//         </button>
//       </div>

//       {/* Thumbnail Slider */}
//       <div className="relative mt-4">
//         <Swiper
//           onSwiper={setThumbsSwiper}
//           spaceBetween={5}
//           slidesPerView={6}
//           watchSlidesProgress
//           modules={[Thumbs, Navigation]}
//           navigation={{
//             nextEl: ".thumb-next",
//             prevEl: ".thumb-prev",
//           }}
//           className="rounded-md"
//         >
//           {images.map((img, index) => (
//             <SwiperSlide
//               key={index}
//               onClick={() => thumbsSwiper?.slideTo(index)}
//             >
//               <img
//                 src={img}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={`w-full h-20 object-cover rounded-md border-2 transition-all duration-300 cursor-pointer ${
//                   activeIndex === index
//                     ? "border-blue-500 opacity-100"
//                     : "border-transparent opacity-50"
//                 }`}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Thumbnail Navigation Arrows */}
//         <button className="thumb-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-100 transition z-10">
//           <FaChevronLeft size={16} />
//         </button>
//         <button className="thumb-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-100 transition z-10">
//           <FaChevronRight size={16} />
//         </button>
//       </div>
//     </div>
//   );
// }
