import React, { useRef, useState, useEffect, useCallback } from "react";
import StoryCard from "../../components/section/StoryCard";
import siteConfig from "../../config/siteConfig";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StoryCardContainer = ({ partners }) => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalVisibleItems, setTotalVisibleItems] = useState(0);
  const [shouldCenter, setShouldCenter] = useState(false);

  // Partnere göre ortala
  useEffect(() => {
    if (containerRef.current && partners.length > 0) {
      const container = containerRef.current;
      const itemWidth = container.querySelector('.scroll-item')?.offsetWidth || 240;
      const containerWidth = container.clientWidth;
      const totalItemsWidth = partners.length * itemWidth;
      
      // ortala
      setShouldCenter(totalItemsWidth <= containerWidth);
    }
  }, [partners]);

  const updateScrollIndicator = useCallback(() => {
    if (containerRef.current && partners.length > 0) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const itemWidth = container.querySelector('.scroll-item')?.offsetWidth || 240;
      const visibleItems = Math.floor(containerWidth / itemWidth);
      
      setTotalVisibleItems(visibleItems);
      
      const scrollPos = container.scrollLeft;
      const newIndex = Math.floor(scrollPos / itemWidth);
      setCurrentIndex(newIndex);
    }
  }, [partners]);

  const checkScrollPosition = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      
      updateScrollIndicator();
    }
  }, [updateScrollIndicator]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftHandler = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index) => {
    if (containerRef.current && partners.length > 0) {
      const container = containerRef.current;
      const itemWidth = container.querySelector('.scroll-item')?.offsetWidth || 240;
      container.scrollTo({
        left: index * itemWidth,
        behavior: "smooth"
      });
    }
  };

  if (!partners) {
    return (
      <div className="flex justify-center items-center h-64 m-16">
        <p className="text-gray-500 text-lg">Yükleniyor...</p>
      </div>
    );
  }

  const dotCount = partners.length > 0 && totalVisibleItems > 0 
    ? Math.ceil(partners.length / totalVisibleItems) 
    : 0;

  return (
    <div className="relative mt-8 mb-28">
      {/* Oklar */}
      {!shouldCenter && showLeftArrow && (
        <button
          onClick={scrollLeftHandler}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 
                   bg-white/80 hover:bg-white rounded-full p-2 shadow-lg 
                   transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {!shouldCenter && showRightArrow && (
        <button
          onClick={scrollRightHandler}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 
                   bg-white/80 hover:bg-white rounded-full p-2 shadow-lg 
                   transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        ref={containerRef}
        className={`flex overflow-x-auto hide-scrollbar py-4 px-2 cursor-grab active:cursor-grabbing ${
          shouldCenter ? 'justify-center' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollBehavior: "smooth" }}
      >
        {partners.map((partner, index) => {
          const name = partner.isyeri_unvani || siteConfig.DEFAULT_TEXTS.NAME;
          const yetkili = partner.yetkili_kisi || siteConfig.DEFAULT_TEXTS.CONTACT;
          const faaliyet = partner.faaliyet_turu || siteConfig.DEFAULT_TEXTS.ACTIVITY;
          const image = partner.files?.[0]?.src || siteConfig.LOGO;
          const objectId = partner.objectid;
          if (objectId === undefined || objectId === null) return null;

          return (
            <div
              key={objectId || `partner-${index}`}
              className="flex-shrink-0 w-18 md:w-60 scroll-item"
            >
              <Link
                to={`/detay/${objectId}`}
                state={{ image }}
                className="block"
              >
                <StoryCard
                  id={objectId}
                  name={name}
                  image={image}
                  extraInfo={`Yetkili: ${yetkili} | Tür: ${faaliyet}`}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Nokta ind */}
      {!shouldCenter && dotCount > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index * totalVisibleItems)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex / totalVisibleItems)
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Sayfa ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryCardContainer;