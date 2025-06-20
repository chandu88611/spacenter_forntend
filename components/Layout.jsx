"use client";

import React, { Suspense, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

function Layout({ children }) {
  const [notTop, setNotTop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const scrollThreshold = 200;
        setNotTop(scrollTop > scrollThreshold);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div>
   <Suspense fallback={<div />}>
        <Header />
      </Suspense>
      {children}
      <Newsletter />
      <Footer />

      {notTop && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          {/* <a
            href="https://wa.me/918088566821"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
          >
            <FaWhatsapp size={40} />
          </a>

          <a
            href="https://www.facebook.com/share/1XE6niM7pj/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon facebook"
          >
            <FaFacebook size={40} />
          </a>

          <a
            href="https://www.instagram.com/algotradingelite?igsh=NmpyMWUxbHltNzlk"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram size={40} />
          </a> */}
        </div>
      )}
    </div>
  );
}

export default Layout;
