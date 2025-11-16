import { useEffect, useState, type ReactElement } from "react";
import Header from "../../components/Deals/UpdateDeal/Header";
import Hero from "../../components/Deals/UpdateDeal/Hero";
import { useParams } from "react-router-dom";
import { DEALS_API } from "../../config/backend";
import type { Deal, DealApiResponse } from "../../types/api.types";
import { normalizeDeal, denormalizeDeal } from "../../types/api.types";

export default function UpdateDealPage(): ReactElement{
  const params = useParams<{ id?: string; reviewId?: string }>();
  const id = params.id ?? params.reviewId;

  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${DEALS_API}/${id}`);
        if (!res.ok) {
          const body = (await res.json().catch((): Record<string, never> => ({}))) as { message?: string } | { error?: string };
          throw new Error((body && typeof body === "object" && "message" in body && typeof body.message === "string" ? body.message : undefined) || `Server returned ${res.status}`);
        }
        const data = await res.json() as DealApiResponse;
        if (!mounted) return;
        setDeal(normalizeDeal(data));
      } catch (err) {
        console.error("Failed to load deal:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to load deal";
        if (mounted) setError(errorMessage);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return (): void => {
      mounted = false;
    };
  }, [id]);

  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header title="Update Deal" />
      {loading ? (
        <div className="text-sm text-zinc-400">Loading deal...</div>
      ) : error ? (
        <div className="text-sm text-red-400">{error}</div>
      ) : id ? (
        <Hero reviewId={id} initialDeal={deal ? denormalizeDeal(deal) : undefined} />
      ) : (
        <Hero create={true} />
      )}
    </div>
  );
}
