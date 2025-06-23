import { Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn, 
  FaYoutube,
  FaWhatsapp,
  FaTelegramPlane,
  FaPinterestP,
} from "react-icons/fa";

import {
  SiVisa,
  SiMastercard,
  SiAmericanexpress,
  SiDiscover,
  SiPaypal,
} from "react-icons/si";
import { FaFax } from "react-icons/fa"; // Importing fax icon

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
        {/* About Section */}
        <div>
          <h3
            className="text-white font-semibold mb-4"
            style={{ fontSize: "20px" }}
          >
            Yelp Clone
          </h3>
          <p>
            Discover local businesses, restaurants, spas, gyms, and more with
            Yelp Clone.
          </p>
        </div>

        {/* Categories - Auto flow, responsive and no overlap */}
        <div>
          <h3
            className="text-white font-semibold mb-4"
            style={{ fontSize: "20px" }}
          >
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Spa",
              "Restaurants",
              "Salons",
              "Clinics",
              "Gyms",
              "Shops",
              "Hotels",
              "Hospitals",
            ].map((category) => (
              <button
                key={category}
                className="inline-flex items-center justify-center border border-gray-600 rounded-full px-3 py-1 text-xs truncate hover:bg-blue-600 hover:text-white transition"
                style={{ borderRadius: "12px", whiteSpace: "nowrap" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Listings - Single line links, flexible width */}
        <div className="min-w-0 w-full">
          <h3
            className="text-white font-semibold mb-4"
            style={{ fontSize: "20px" }}
          >
            {" "}
            Popular Listings
          </h3>
          <ul className="space-y-2">
            {[
              "Luxury Spa & Wellness",
              "Top Restaurants",
              "Premium Salons",
              "24/7 Medical Clinics",
              "Fitness & Yoga Centers",
              "Pet Care Services",
            ].map((listing) => (
              <li
                key={listing}
                className="flex items-center whitespace-nowrap overflow-hidden overflow-ellipsis"
                style={{ maxWidth: "100%" }} // This helps prevent overflow issues.
              >
                <span className="text-blue-500 font-bold">»</span>
                <span className="ml-2">{listing}</span>
              </li>
            ))}
          </ul>
        </div>

    
      </div>

      {/* Footer Links */}
      <div className="border-t border-gray-700 p-4 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-grey-400 !important text-sm">
            {[
              "How it works",
              "About Us",
              "Pricing",
              "Listing Categories",
              "Privacy Policy",
              "Terms & Conditions",
              "Blog",
              "Contact Us",
              "Premium Ads",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="!text-gray-400 hover:text-blue-500 !important"
              >
                <span className="underline underline-offset-4 decoration-white">
                  {link}
                </span>
              </a>
            ))}
          </div>
          <div className="flex justify-center space-x-3 p-2 mt-4 bg-gray-800 max-w-lg mx-auto">
          <a href="#" className="text-white hover:text-gray-300">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaYoutube size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaWhatsapp size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaTelegramPlane size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaPinterestP size={20} />
            </a>
          </div>
          <div className="text-center text-grey mt-5">
            © {new Date().getFullYear()} Yelp Clone. All Rights Reserved.
          </div>
        </div>
      </div>
      
    </footer>
  );
}
