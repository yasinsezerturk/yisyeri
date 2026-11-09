import React from "react";

import { MapPin, Phone, Mail, User, Clock } from "lucide-react";
import PartnersList from "../../pages/partners/PartnersList";
import StatusMessage from "../../components/status/StatusMessage";
import PageTitle from "./PageTitle";

import { usePartners } from "../../hooks/UsePartners";
import PartnerImages from "./PartnerImages";
import { getMapEmbedUrl } from "../../utils/partnerData";

const PartnerDetailsCard = ({ partner, loading, error }) => {

  
  const { partners } = usePartners(1, 20);
  if (!partner) {
    return (
      <StatusMessage
        loading={loading}
        error={error}
        data={partner}
        emptyMessage="Firma bulunamadı..."
      />
    );
  }

  const {
    isyeri_unvani,
    acik_adres,
    mahalle,
    yol_adi,
    calisma_saati,
    harita_kodu,
    yetkili_kisi,
    telefon,
    eposta,
    faaliyet_turu,
  } = partner;

  const mapUrl = getMapEmbedUrl(harita_kodu);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <PageTitle
        title={isyeri_unvani}
        subtitle={faaliyet_turu}
      />

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Photo + Adres + Harita + Çalışma Saatleri */}
        <div className="lg:col-span-2 space-y-6">

          {/* Photos */}
          {partner?.files && (
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <PartnerImages files={partner.files} />
            </div>
          )}


          {/* Adres Bilgisi */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-2">
              <MapPin className="text-blue-600 mr-3" size={28} />
              Adres Bilgisi
            </h2>
            <p className="text-sm text-gray-500">Açık Adres</p>
            <p className="text-lg font-medium text-gray-800">{acik_adres}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Mahalle</p>
                <p className="text-lg font-medium text-gray-800">{mahalle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cadde/Sokak</p>
                <p className="text-lg font-medium text-gray-800">{yol_adi}</p>
              </div>
            </div>
          </div>

          {/* Çalışma Saatleri (Mobil) */}
          {calisma_saati && (
            <div className="lg:hidden p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md">
              <div className="flex items-center mb-2">
                <Clock className="text-blue-600 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">
                  Çalışma Saatleri
                </h2>
              </div>
              <p className="text-gray-700">{calisma_saati}</p>
            </div>
          )}

          {/* Map */}
          {mapUrl && (
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-2">
                <MapPin className="text-blue-600 mr-3" size={28} />
                Konum Haritası
              </h2>
              <div className="rounded-xl overflow-hidden shadow-md">
                <iframe
                  title="İşyeri konumu"
                  className="w-full h-80 border-0"
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: İletişim + Çalışma Saatleri (Desktop) + Diğer Şirketler */}
        <div className="lg:col-span-2 space-y-6">
          {/* İletişim Bilgileri */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center border-b border-gray-200 pb-2">
              <User className="text-blue-600 mr-3" size={28} />
              İletişim Bilgileri
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Yetkili Kişi</p>
                  <p className="text-lg font-medium text-gray-800">
                    {yetkili_kisi || "Belirtilmemiş"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <p className="text-lg font-medium text-gray-800">
                    {telefon ? <a href={`tel:${telefon}`} className="hover:text-blue-600">
                      {telefon}
                    </a> : "Belirtilmemiş"}
                  </p>
                </div>
              </div>
              {eposta && (
                <div className="flex items-start gap-3">
                  <Mail
                    className="text-gray-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500">E-posta</p>
                    <p className="text-lg font-medium text-gray-800">
                      <a
                        href={`mailto:${eposta}`}
                        className="hover:text-blue-600"
                      >
                        {eposta}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Çalışma Saatleri (Desktop) */}
          {calisma_saati && (
            <div className="hidden lg:block p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-md">
              <div className="flex items-center mb-2">
                <Clock className="text-blue-600 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">
                  Çalışma Saatleri
                </h2>
              </div>
              <p className="text-gray-700">{calisma_saati}</p>
            </div>
          )}

          {/* Partners */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <PartnersList partners={partners.filter((item) => String(item.objectid) !== String(partner.objectid))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsCard;
