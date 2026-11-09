import React from "react";

import {ABOUT_DATA, ABOUT_DATA_APP} from "../config/siteConfig";
import Layout from "../layouts/Layout";
import PageTitle from "../components/pageCards/PageTitle";

const About = () => {
  // Object to array
  //const sections = Object.values(ABOUT_DATA.ABOUT_DATA);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16 mt-16">
        {/* Title */}
        <PageTitle 
          title={ABOUT_DATA_APP.TITLE}
          subtitle={ABOUT_DATA_APP.SUBTITLE}
        />

        {/* Content */}
        
        {ABOUT_DATA.map((section, index) => (
          <div
            key={section.id}
            className={`flex flex-col md:flex-row items-center mb-20 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Görsel */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                <img
                  src={section.IMAGE}
                  width="900"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  alt={section.TITLE}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Metin */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
              <div className="p-2 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <span className="text-blue-700 font-bold text-xl">{section.id}</span>
              </div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                {section.TITLE}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {section.TEXT}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default About;
