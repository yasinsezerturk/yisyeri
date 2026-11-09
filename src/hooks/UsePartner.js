import { useState, useEffect } from "react";
import { getPartner } from "../api/partnersApi";

export const usePartner = (id) => {
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setPartner(null);
    getPartner(id)
      .then((data) => { if (active) setPartner(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  return { partner, loading, error };
};
