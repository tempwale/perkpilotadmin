"use client";

import {useState, type ReactElement} from "react";
import { GripVertical, Trash2, Plus } from "lucide-react";

interface PricingPlan {
  id: number;
  planTitle: string;
  price: string;
  priceType: "Monthly" | "Yearly" | "Lifetime";
  ctaButtonText: string;
  ctaButtonLink: string;
}

interface PricingProps {
  initialPlans?: PricingPlan[];
  onPlansChange?: (plans: PricingPlan[]) => void;
}

export default function Pricing({
  initialPlans,
  onPlansChange,
}: PricingProps): ReactElement{
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [plans, setPlans] = useState<PricingPlan[]>(
    initialPlans || [
      {
        id: 1,
        planTitle: "",
        price: "",
        priceType: "Monthly",
        ctaButtonText: "",
        ctaButtonLink: "",
      },
      {
        id: 2,
        planTitle: "",
        price: "",
        priceType: "Monthly",
        ctaButtonText: "",
        ctaButtonLink: "",
      },
      {
        id: 3,
        planTitle: "",
        price: "",
        priceType: "Monthly",
        ctaButtonText: "",
        ctaButtonLink: "",
      },
      {
        id: 4,
        planTitle: "",
        price: "",
        priceType: "Monthly",
        ctaButtonText: "",
        ctaButtonLink: "",
      },
    ]
  );

  const updatePlans = (newPlans: PricingPlan[]): void => {
    setPlans(newPlans);
    onPlansChange?.(newPlans);
  };

  const handlePlanTitleChange = (id: number, value: string): void => {
    const updatedPlans = plans.map((plan) =>
      plan.id === id ? { ...plan, planTitle: value } : plan
    );
    updatePlans(updatedPlans);
  };

  const handlePriceChange = (id: number, value: string): void => {
    const updatedPlans = plans.map((plan) =>
      plan.id === id ? { ...plan, price: value } : plan
    );
    updatePlans(updatedPlans);
  };

  const handlePriceTypeChange = (
    id: number,
    value: "Monthly" | "Yearly" | "Lifetime"
  ): void => {
    const updatedPlans = plans.map((plan) =>
      plan.id === id ? { ...plan, priceType: value } : plan
    );
    updatePlans(updatedPlans);
  };

  const handleCTATextChange = (id: number, value: string): void => {
    const updatedPlans = plans.map((plan) =>
      plan.id === id ? { ...plan, ctaButtonText: value } : plan
    );
    updatePlans(updatedPlans);
  };

  const handleCTALinkChange = (id: number, value: string): void => {
    const updatedPlans = plans.map((plan) =>
      plan.id === id ? { ...plan, ctaButtonLink: value } : plan
    );
    updatePlans(updatedPlans);
  };

  const deletePlan = (id: number): void => {
    const updatedPlans = plans.filter((plan): boolean => plan.id !== id);
    updatePlans(updatedPlans);
  };

  const addPlan = (): void => {
    const newId = Math.max(...plans.map((p) => p.id), 0) + 1;
    const updatedPlans = [
      ...plans,
      {
        id: newId,
        planTitle: "",
        price: "",
        priceType: "Monthly" as const,
        ctaButtonText: "",
        ctaButtonLink: "",
      },
    ];
    updatePlans(updatedPlans);
  };

  const handleToggle = (): void => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="w-full max-w-[1068px] py-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 flex flex-col gap-4">
      {/* Header */}
      <div
        data-layer="Row"
        className="Row self-stretch h-14 inline-flex justify-start items-center"
      >
        <div
          data-layer="Column"
          className="Column flex-1 self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-3"
        >
          <div
            data-layer="Frame 2147205991"
            className="Frame2147205991 flex justify-start items-center"
          >
            <GripVertical className="w-6 h-6 text-neutral-50" />
          </div>
          <div
            data-layer="Text"
            className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Pricing Plan
          </div>
        </div>
        <div
          data-layer="Column"
          className="Column self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4"
        >
          <button
            onClick={handleToggle}
            className="Button w-[53.33px] h-7 relative bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline-1 -outline-offset-1 outline-[#501bd6] overflow-hidden transition-all"
            aria-label={isEnabled ? "Disable pricing" : "Enable pricing"}
          >
            <div
              className={`Button w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] top-[2.67px] transition-all ${
                isEnabled ? "left-[26.67px]" : "left-[2.67px]"
              }`}
            />
          </button>
          <button
            onClick={(): void => {}}
            className="hover:opacity-70 transition-opacity"
            aria-label="Delete section"
          >
            <Trash2 className="w-6 h-6 text-neutral-50" />
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="px-4 flex flex-col gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-full py-4 px-6 bg-zinc-800 rounded-2xl outline-1 outline-zinc-700 flex flex-col gap-4"
          >
            {/* Plan Title and Price Row */}
            <div className="flex items-start gap-6">
              {/* Drag Handle */}
              <div className="pt-8">
                <GripVertical className="w-6 h-6 text-neutral-50" />
              </div>

              {/* Plan Title */}
              <div className="flex-1 flex flex-col gap-2">
                <label
                  htmlFor={`plan-title-${plan.id}`}
                  className="text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Plan Title
                </label>
                <input
                  id={`plan-title-${plan.id}`}
                  type="text"
                  value={plan.planTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePlanTitleChange(plan.id, e.target.value)
                  }
                  placeholder="Plan Title"
                  className="h-12 px-6 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500"
                />
              </div>

              {/* Price */}
              <div className="flex-1 flex flex-col gap-2">
                <label
                  htmlFor={`price-${plan.id}`}
                  className="text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Price
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center h-12 px-6 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700">
                    <span className="text-neutral-50 text-base font-normal font-['Poppins'] mr-2">
                      $
                    </span>
                    <input
                      id={`price-${plan.id}`}
                      type="text"
                      value={plan.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePriceChange(plan.id, e.target.value)
                      }
                      placeholder=""
                      className="flex-1 bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none placeholder:text-zinc-400"
                    />
                  </div>
                  <select
                    value={plan.priceType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handlePriceTypeChange(
                        plan.id,
                        e.target.value as "Monthly" | "Yearly" | "Lifetime"
                      )
                    }
                    className="h-12 px-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 focus:outline-zinc-500"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Lifetime">Lifetime</option>
                  </select>
                </div>
              </div>

              {/* Delete Button */}
              <div className="pt-8">
                <button
                  onClick={(): void => deletePlan(plan.id)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label={`Delete plan ${plan.id}`}
                >
                  <Trash2 className="w-6 h-6 text-neutral-50" />
                </button>
              </div>
            </div>

            {/* CTA Button Row */}
            <div className="flex items-end gap-6 ml-12">
              {/* CTA Button Text */}
              <div className="flex-1 flex flex-col gap-2">
                <label
                  htmlFor={`cta-text-${plan.id}`}
                  className="text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  CTA Button Text
                </label>
                <input
                  id={`cta-text-${plan.id}`}
                  type="text"
                  value={plan.ctaButtonText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCTATextChange(plan.id, e.target.value)
                  }
                  placeholder="Get The Deal"
                  className="h-12 px-6 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500"
                />
              </div>

              {/* CTA Button Link */}
              <div className="flex-1 flex flex-col gap-2">
                <label
                  htmlFor={`cta-link-${plan.id}`}
                  className="text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  CTA Button Link
                </label>
                <input
                  id={`cta-link-${plan.id}`}
                  type="url"
                  value={plan.ctaButtonLink}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCTALinkChange(plan.id, e.target.value)
                  }
                  placeholder="https://..."
                  className="h-12 px-6 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add More Button */}
      <div className="px-4 flex justify-end">
        <button
          onClick={addPlan}
          className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
          aria-label="Add more pricing plans"
        >
          <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
            Add More
          </div>
          <Plus className="w-6 h-6 text-neutral-50" />
        </button>
      </div>
    </div>
  );
}
