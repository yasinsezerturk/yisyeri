import React from "react";
import Layout from "../layouts/Layout";
import { MapPin, Phone, Mail, Clock, Users, ExternalLink } from "lucide-react";
import PageTitle from "../components/pageCards/PageTitle";
import siteConfig from "../config/siteConfig";

const Contact = () => {

  const externalFormUrl = siteConfig.CTAURL;

  const handleRedirect = () => {
    window.open(externalFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12 mt-16">
         {/* Title */}
        <PageTitle
          title="  İletişime Geçin"
          subtitle=" Soru, görüş ve önerileriniz için aşağıdaki iletişim kanallarını kullanabilir 
            veya Yeşil İşyeri başvuru formuna ulaşabilirsiniz."
        />


        {/* Map data */}
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-2 gap-12 mb-16">
     
          <div className="relative h-96 min-h-[24rem] rounded-2xl overflow-hidden shadow-xl lg:h-auto">
            <iframe
              className="absolute inset-0 block h-full w-full"
              title="Büyükçekmece Belediyesi Haritası"
              src="https://maps.google.com/maps?q=41.02115252472539,28.5852208036723&hl=tr&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Contacty  */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 flex items-center">
              <Users className="mr-3 text-blue-600" size={32} />
              İletişim Bilgileri
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-blue-600 mt-1 mr-4 flex-shrink-0" size={24} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800">Adres</h3>
                  <p className="text-gray-700">Fatih Mahallesi Şehremini Sokak. No:1 A Blok Zemin Kat Büyükçekmece/İstanbul</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-blue-600 mt-1 mr-4 flex-shrink-0" size={24} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800">Telefon</h3>
                  <p className="text-gray-700">
                    <a href="tel:4440340" className="break-words hover:text-blue-600 transition-colors">
                      444 0 340
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-blue-600 mt-1 mr-4 flex-shrink-0" size={24} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800">E-posta</h3>
                  <p className="text-gray-700">
                    <a href="mailto:danisma@bcekmece.bel.tr" className="break-words hover:text-blue-600 transition-colors">
                      danisma@bcekmece.bel.tr
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-blue-600 mt-1 mr-4 flex-shrink-0" size={24} />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800">Çalışma Saatleri</h3>
                  <p className="text-gray-700">Pazartesi - Cuma: 08:30 - 17:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Yeşil İşyeri Başvuru Formu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Yeşil İşyeri başvurusu için aşağıdaki butona tıklayarak
              ilgili sayfaya yönlendirileceksiniz.
            </p>
          </div>

          <button
            onClick={handleRedirect}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
          >
            <ExternalLink size={20} className="mr-2" />
            Başvuru Formuna Git
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Form doldurma işlemi için harici bir sayfaya yönlendirileceksiniz.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
