import { useEffect, useState } from "react";
import Header from "../../components/Deals/UpdateDeal/Header";
import Hero from "../../components/Deals/UpdateDeal/Hero";
import { useParams } from "react-router-dom";
import { DEALS_API } from "../../config/backend";

export default function UpdateDealPage() {
  const params = useParams();
  const id = (params as any).id ?? (params as any).reviewId;

  const [deal, setDeal] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${DEALS_API}/${id}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Server returned ${res.status}`);
        }
        const data = await res.json();
        if (!mounted) return;
        setDeal(data);
      } catch (err: any) {
        console.error("Failed to load deal:", err);
        if (mounted) setError(err?.message || "Failed to load deal");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header title="Update Deal" />
      {loading ? (
        <div className="text-sm text-zinc-400">Loading deal...</div>
      ) : error ? (
        <div className="text-sm text-red-400">{error}</div>
      ) : id ? (
        <Hero reviewId={id} initialDeal={deal} />
      ) : (
        <Hero create={true} />
      )}
    </div>
  );
}
