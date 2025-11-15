import { type ReactElement } from "react";
import Alternatives from "./Tabs/Alternatives";
import Features from "./Tabs/Features";
import Overview from "./Tabs/Overview";
import Pricing from "./Tabs/Pricing";

type Props = {
  reviewData?: any;
  updateReviewData?: (updates: any) => void;
};

export default function Tabs({ reviewData, updateReviewData }: Props = {}) {
  return (
    <div>
      <div
        data-layer="Frame 2147206000"
        className="Frame2147206000 self-stretch inline-flex flex-col justify-start items-start gap-4"
      >
        <div
          data-layer="Tabs"
          className="Tabs self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
        >
          Tabs
        </div>
        <Overview
          initialOverview={reviewData?.overview}
          onOverviewChange={(overview) => {
            updateReviewData?.({ overview });
          }}
        />
        <Features
          initialFeatures={reviewData?.features?.map((f: any, idx: number) => ({
            id: idx + 1,
            title: f.title,
            body: f.description,
          }))}
          onFeaturesChange={(features) => {
            updateReviewData?.({
              features: features.map((f) => ({
                title: f.title,
                description: f.body,
              })),
            });
          }}
        />
        <Pricing
          initialPlans={reviewData?.pricing?.map((p: any, idx: number) => ({
            id: idx + 1,
            planTitle: p.plan,
            price: p.amount,
            priceType: "Monthly" as const,
            ctaButtonText: "",
            ctaButtonLink: "",
          }))}
          onPlansChange={(plans) => {
            updateReviewData?.({
              pricing: plans.map((p) => ({
                plan: p.planTitle,
                amount: p.price,
                note: p.priceType,
              })),
            });
          }}
        />
        <Alternatives
          initialAlternatives={reviewData?.alternatives?.map(
            (a: any, idx: number) => ({
              id: idx + 1,
              logo: a.avatarUrl || null,
              name: a.name,
              isVerified: true,
              category: a.type,
              rating: a.rating,
              reviewCount: a.reviewCount,
              pricing: a.price,
              compareLink: a.compareNote || "",
            })
          )}
          onAlternativesChange={(alternatives) => {
            updateReviewData?.({
              alternatives: alternatives.map((a) => ({
                name: a.name,
                type: a.category,
                avatarUrl: a.logo || undefined,
                price: a.pricing,
                rating: a.rating,
                reviewCount: a.reviewCount,
                compareNote: a.compareLink,
              })),
            });
          }}
        />
      </div>
    </div>
  );
}
