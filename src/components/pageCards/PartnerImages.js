import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { parsePartnerImages } from "../../utils/partnerData";

const PartnerImages = ({ files }) => {
  const images = parsePartnerImages(files);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => { setCurrentIndex(0); }, [files]);
  const image = images[currentIndex] || images[0];

  if (!image) return <p className="text-gray-500 text-center">Görsel bulunamadı.</p>;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="rounded-xl overflow-hidden shadow-md">
        <img decoding="async" src={image.src} alt={image.label || `Görsel ${currentIndex + 1}`} className="w-full h-80 object-cover" />
      </div>
      {images.length > 1 && <>
        <button aria-label="Önceki görsel" onClick={() => setCurrentIndex((index) => (index - 1 + images.length) % images.length)} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"><ArrowLeft size={20} /></button>
        <button aria-label="Sonraki görsel" onClick={() => setCurrentIndex((index) => (index + 1) % images.length)} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"><ArrowRight size={20} /></button>
      </>}
    </div>
  );
};

export default PartnerImages;
