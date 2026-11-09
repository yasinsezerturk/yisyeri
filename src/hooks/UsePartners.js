import { useState, useEffect } from "react";
import { getPartners } from "../api/partnersApi";

export const usePartners = (page = 1, limit = 5) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getPartners(page, limit)
      .then((data) => { if (active) setPartners(data); })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setPartners([]);
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, limit]);

  return { partners, loading, error };
};
