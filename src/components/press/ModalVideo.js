import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const ModalVideo = ({ src, poster, title = "Haber videosu", onClose }) => {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    closeRef.current.focus();

    return () => {
      video?.pause();
      if (dialog.open && typeof dialog.close === "function") dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-xl bg-gray-950 p-0 text-white shadow-2xl backdrop:bg-black/75"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <h2 id={titleId} className="font-semibold">{title}</h2>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Videoyu kapat" className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><X aria-hidden="true" /></button>
      </div>
      <video ref={videoRef} src={src} poster={poster} controls autoPlay playsInline preload="metadata" className="max-h-[75svh] w-full bg-black" />
    </dialog>,
    document.body
  );
};

export default ModalVideo;
