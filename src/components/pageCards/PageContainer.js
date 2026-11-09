import React from "react";
import PageCard from "../pageCards/PageCard";
import { Link } from "react-router-dom";
import siteConfig from "../../config/siteConfig";

const PageContainer = ({ partners }) => {



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {partners.map((partner, index) => {
        const name = partner.isyeri_unvani || siteConfig.DEFAULT_TEXTS.NAME;
        const yetkili = partner.yetkili_kisi || siteConfig.DEFAULT_TEXTS.CONTACT;
        const faaliyet = partner.faaliyet_turu || siteConfig.DEFAULT_TEXTS.ACTIVITY;
        const image = partner.files?.[0]?.src || siteConfig.LOGO;
        const objectId = partner.objectid;
        if (objectId === undefined || objectId === null) return null;

        return (
          <Link
            key={objectId || `partner-${index}`}
            to={`/detay/${objectId}`}
            state={{ image }}
            className="block"
          >
            <PageCard
              id={objectId}
              name={name}
              image={image}
              extraInfo={`Yetkili: ${yetkili} | Tür: ${faaliyet}`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default PageContainer;
