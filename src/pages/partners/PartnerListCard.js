import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, User, Clock, Building } from 'lucide-react';
import siteConfig from '../../config/siteConfig';


const PartnerListCard = ({ partner }) => {

    const name = partner.isyeri_unvani || siteConfig.DEFAULT_TEXTS.NAME;
    const yetkili = partner.yetkili_kisi || siteConfig.DEFAULT_TEXTS.CONTACT;
    const faaliyet = partner.faaliyet_turu || siteConfig.DEFAULT_TEXTS.ACTIVITY;
    const calismaSaati = partner.calisma_saati || "";
    const mahalle = partner.mahalle || "";
    const yolAdi = partner.yol_adi || "";
    const image = partner.files?.[0]?.src || siteConfig.LOGO;
    const objectId = partner.objectid;
    if (objectId === undefined || objectId === null) return null;

    return (
        <Link
            to={`${siteConfig.partners.detail.detailPath}/${objectId}`}
            state={{ image }}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
            <div className="flex h-full">
                <div className="w-2/5 flex-shrink-0">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {name}
                        </h3>

                        <div className="flex items-start text-sm text-gray-600 mt-2 mb-3">
                            <User size={14} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{yetkili}</span>
                        </div>

                        <div className="flex items-start text-xs text-gray-500 mb-2">
                            <Building size={14} className="mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{faaliyet}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-500">
                            <MapPin size={12} className="mr-1 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{`${mahalle} ${yolAdi ? ", " + yolAdi : ""}`}</span>
                        </div>

                        {calismaSaati && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Clock size={12} className="mr-1 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{calismaSaati}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PartnerListCard;