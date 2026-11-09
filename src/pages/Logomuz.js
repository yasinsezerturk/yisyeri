import React from "react";
import Layout from "../layouts/Layout";

import siteConfig from "../config/siteConfig";
import PageTitle from "../components/pageCards/PageTitle";

  
  const { BRAND, LOGOS } = siteConfig;

const Logomuz = () => {
  return (
    <Layout>
   <div className="max-w-7xl mx-auto px-4 py-16 mt-16">
        {/* Title */}
        <PageTitle 
          title={BRAND.TITLE}
          subtitle={BRAND.DESCRIPTION}
        />

       
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/*</div><div className="h-full flex flex-col justify-center">*/}
          {LOGOS.map((item) => (
            <div key={item.id} className="border rounded-xl shadow p-4 text-center">
              <h2 className="text-lg font-semibold mb-4">{item.TITLE}</h2>
              <img
                src={item.IMAGE}
                alt={item.TITLE}
                width={item.WIDTH}
                height={item.HEIGHT}
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto max-h-64 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Logomuz;
