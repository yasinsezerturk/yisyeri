import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layouts/Layout";
import { usePartners } from "../../hooks/UsePartners";
import PageContainer from "../../components/pageCards/PageContainer";
import PageTitle from "../../components/pageCards/PageTitle";
import StatusMessage from "../../components/status/StatusMessage";

const PAGE_SIZE = 10;

const PartnersPage = () => {
  // Belediye servisi tüm kayıtları döndürür; sayfalama tarayıcıda yapılır.
  const { partners, loading, error } = usePartners(1, Number.MAX_SAFE_INTEGER);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);
  const hasMore = visibleCount < partners.length;

  useEffect(() => {
    if (loading || error || !hasMore || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setVisibleCount((count) => count + PAGE_SIZE);
      }
    }, { rootMargin: "100px" });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loading, error, hasMore, visibleCount]);

  return (
    <Layout>
      <div className="py-12 px-6 mt-16">
        <PageTitle title="Yeşil İşyerleri" subtitle="Çevre dostu üretim ve hizmet ilkelerini benimseyen işyerlerini keşfedin" />
        <StatusMessage loading={loading} error={error} data={partners} emptyMessage="Henüz veri bulunmamaktadır." type="detailed" />
        {!loading && !error && partners.length > 0 && <PageContainer partners={partners.slice(0, visibleCount)} />}
        {!loading && !error && hasMore && (
          <div ref={sentinelRef} className="mt-8 text-center">
            <button onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Daha Fazla Göster
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PartnersPage;
