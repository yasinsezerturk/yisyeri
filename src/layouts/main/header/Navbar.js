import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import siteConfig from "../../../config/siteConfig";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden xl:flex items-center space-x-10">
        <nav aria-label="Ana menü" className="flex flex-row items-center space-x-10">
          {siteConfig.NAVLINKS.map((link) => (
            <Link
              key={link.TO}
              to={link.TO}
              className="relative text-gray font-medium whitespace-nowrap duration-300 hover:shadow-lg"
            >
              {link.NAME}
            </Link>
          ))}
        </nav>

        {/* Belediye Logo */}
        <a
          href={siteConfig.BELEDIYE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <img
            src={siteConfig.LOGO2}
            alt={siteConfig.BELEDIYE_NAME}
            className="h-12"
          />
        </a>
      </div>

      {/* Hamburger */}
      <div className="xl:hidden flex items-center">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile */}
        <div id="mobile-navigation" hidden={!isMobileMenuOpen} className={`${isMobileMenuOpen ? "flex" : "hidden"} absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto bg-white shadow-lg px-6 py-6 flex-col items-start space-y-4 xl:hidden z-40`}>
          <nav aria-label="Mobil ana menü" className="flex flex-col space-y-4 items-start pl-4 w-full">
            {siteConfig.NAVLINKS.map((link) => (
              <Link
                key={link.TO}
                to={link.TO}
                onClick={handleLinkClick}
                className="inline-flex min-h-11 items-center rounded text-gray font-medium whitespace-nowrap duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {link.NAME}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200"></div>

          {/* CTA Button */}
          <a
            href={siteConfig.CTAURL}
            className="bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 px-4 py-2 sm:px-8 sm:py-3 rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.CTATEXT}
          </a>


          {/* Belediye Logo */}
          <div className="flex justify-center w-full pt-4 border-t border-gray-100">
            <a
              href={siteConfig.BELEDIYE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <img
                src={siteConfig.LOGO2}
                alt={siteConfig.BELEDIYE_NAME}
                className="h-12"
              />
            </a>
          </div>
        </div>
    </>
  );
};

export default Navbar;
