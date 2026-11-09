import { useEffect, useState } from "react";

// Mobilde, veri tasarrufunda ve azaltılmış harekette video kaynağı bağlanmaz.
export default function useBackgroundVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const desktop = window.matchMedia("(min-width: 768px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const update = () => setEnabled(
      desktop.matches && finePointer.matches && !reducedMotion.matches && !connection?.saveData &&
      !["slow-2g", "2g", "3g"].includes(connection?.effectiveType) && !document.hidden
    );
    const queries = [desktop, finePointer, reducedMotion];
    queries.forEach((query) => {
      if (query.addEventListener) query.addEventListener("change", update);
      else query.addListener?.(update);
    });
    connection?.addEventListener?.("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      queries.forEach((query) => {
        if (query.removeEventListener) query.removeEventListener("change", update);
        else query.removeListener?.(update);
      });
      connection?.removeEventListener?.("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return enabled;
}
