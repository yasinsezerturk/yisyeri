import React, { useState, useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import CTAButton1 from "../../components/button/CTAButton1";
import CTAButton2 from "../../components/button/CTAButton2";
import siteConfig from "../../config/siteConfig";
import useBackgroundVideo from "../../hooks/useBackgroundVideo";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const playBackground = useBackgroundVideo();
  const backgroundRef = useRef(null);
  const [backgroundPaused, setBackgroundPaused] = useState(false);

  const toggleBackground = () => {
    const pause = !backgroundPaused;
    setBackgroundPaused(pause);
    if (pause) backgroundRef.current?.pause();
    else backgroundRef.current?.play().catch(() => {});
  };

  useEffect(() => {
    let frame = null;
    const update = () => { setIsScrolled(window.scrollY > 450); frame = null; };
    const handleScroll = () => { if (frame === null) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald-950 py-28 text-white" style={{ minHeight: "100svh" }}>
        <img src={siteConfig.HERO_POSTER} alt="" width="848" height="480" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        {playBackground && <video ref={backgroundRef} src={siteConfig.HERO_BACKGROUND_VIDEO} poster={siteConfig.HERO_POSTER} playsInline autoPlay={!backgroundPaused} muted loop preload="none" aria-hidden="true" tabIndex={-1} className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight drop-shadow-lg sm:text-5xl md:text-6xl">
            {siteConfig.SITE_NAME} <span className="text-yellow-400">{siteConfig.HERO_HIGHLIGHT}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg drop-shadow-md md:text-2xl">{siteConfig.SITE_DESCRIPTION_2}</p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <CTAButton2 href={siteConfig.CTA2URL}>{siteConfig.CTA2TEXT}</CTAButton2>
            <CTAButton1 href={siteConfig.CTAURL}>{siteConfig.CTATEXT}</CTAButton1>
          </div>
        </div>
        {playBackground && (
          <button type="button" onClick={toggleBackground} aria-pressed={backgroundPaused} aria-label={backgroundPaused ? "Arka plan videosunu oynat" : "Arka plan videosunu duraklat"} className="absolute bottom-6 right-4 z-20 inline-flex min-h-11 items-center gap-2 rounded-lg bg-black/60 px-4 py-2 text-sm text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {backgroundPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
            {backgroundPaused ? "Arka planı oynat" : "Arka planı duraklat"}
          </button>
        )}
      </section>
      {isScrolled && (
        <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-40 grid grid-cols-2 gap-3 sm:flex sm:justify-between md:left-6 md:right-6">
          <CTAButton2 isFixed href={siteConfig.CTA2URL}>{siteConfig.CTA2TEXT}</CTAButton2>
          <CTAButton1 isFixed href={siteConfig.CTAURL}>{siteConfig.CTATEXT}</CTAButton1>
        </div>
      )}
    </>
  );
};

export default Hero;
