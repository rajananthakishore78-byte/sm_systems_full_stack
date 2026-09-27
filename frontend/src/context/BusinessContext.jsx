import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const BusinessContext = createContext(null);

export function BusinessProvider({ children }) {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getBusiness()
      .then(setBusiness)
      .catch(() => setBusiness({}))
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => api.getBusiness().then(setBusiness);

  return (
    <BusinessContext.Provider value={{ business: business || {}, loading, refresh }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) throw new Error("useBusiness must be used inside BusinessProvider");
  return ctx;
}
