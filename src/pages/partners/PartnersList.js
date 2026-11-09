import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';

import siteConfig from '../../config/siteConfig';
import PartnerListCard from './PartnerListCard';

const PartnersList = ({ partners }) => {
  

  const { title, subtitle, emptyMessage, viewAllText, viewAllLink } = 
    siteConfig.partners.list;

  if (!partners || partners.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 mb-6">{subtitle}</p>
        <div className="text-center py-8">
          <Users className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return ( 
     /* in Partner */
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        <Link
          to={viewAllLink}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {viewAllText}

          <ArrowRight size={18} className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        {partners.slice(0, 3).map((partner) => (
          <PartnerListCard key={partner.objectid} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default PartnersList;