import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "../../../config/siteConfig";
import Navbar from "./Navbar";

const Header = () => (
  <header className="fixed top-0 z-50 flex w-full items-center justify-between gap-4 bg-white px-4 py-3 shadow-md md:px-12 xl:px-20">
    <Link to="/" aria-label={`${siteConfig.SITE_NAME} ana sayfa`} className="relative block h-12 w-[60px] shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
      <img src={siteConfig.SITE_LOGO} alt="" width="60" height="48" decoding="async" className="absolute inset-0 z-10 h-full w-full object-contain" />
      <img src={siteConfig.SITE_YAZISI} alt="" width="60" height="48" decoding="async" className="absolute inset-0 h-full w-full object-contain motion-safe:animate-wiggleOnce" />
    </Link>
    <Navbar />
  </header>
);

export default Header;
