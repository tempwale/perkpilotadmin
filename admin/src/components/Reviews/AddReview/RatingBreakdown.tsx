

import {useState, type ReactElement} from "react";
import { GripVertical, Trash2, Plus, Star } from "lucide-react";

type Feature = {
  id: number;
  name: string;
  rating: number;
  minScore: string;
  maxScore: string;
};

type Props = {
  initialCategories?: Array<{ category: string; value: number; outOf: number }>;
  onCategoriesChange?: (categories: Array<{ category: string; value: number; outOf: number }>) => void;
};

// Default feature names for placeholders
const DEFAULT_FEATURE_NAMES = [
  "Ease of Use",
  "Features",
  "Value",
  "Customer Support",
  "Reliability",
];

export default function RatingBreakdown({ initialCategories, onCategoriesChange }: Props = {}): ReactElement {
  const [isEnabled, setIsEnabled] = useState(true);
  const [title, setTitle] = useState("Rating Breakdown");

  const [features, setFeatures] = useState<Feature[]>(
    initialCategories?.map((cat, idx) => ({
      id: idx + 1,
      name: cat.category,
      rating: cat.value,
      minScore: "0",
      maxScore: cat.outOf.toString()
    })) || [
      { id: 1, name: "Ease of Use", rating: 0, minScore: "4.5", maxScore: "5.0" },
      { id: 2, name: "Features", rating: 0, minScore: "4.5", maxScore: "5.0" },
      { id: 3, name: "Value", rating: 0, minScore: "4.5", maxScore: "5.0" },
      {
        id: 4,
        name: "Customer Support",
        rating: 0,
        minScore: "4.5",
        maxScore: "5.0",
      },
      { id: 5, name: "Reliability", rating: 0, minScore: "4.5", maxScore: "5.0" },
    ]
  );

  const updateFeatures = (newFeatures: Feature[]): void => {
    setFeatures(newFeatures);
    onCategoriesChange?.(newFeatures.map(f => ({
      category: f.name,
      value: f.rating,
      outOf: parseFloat(f.maxScore) || 5
    })));
  };

  const handleFeatureNameChange = (id: number, value: string): void => {
    updateFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, name: value } : feature
      )
    );
  };

  const handleRatingChange = (id: number, rating: number): void => {
    updateFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, rating } : feature
      )
    );
  };

  const handleMinScoreChange = (id: number, value: string): void => {
    updateFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, minScore: value } : feature
      )
    );
  };

  const handleMaxScoreChange = (id: number, value: string): void => {
    updateFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, maxScore: value } : feature
      )
    );
  };

  const deleteFeature = (id: number): void => {
    updateFeatures(features.filter((feature) => feature.id !== id));
  };

  const addFeature = (): void => {
    const newId = Math.max(...features.map((f) => f.id), 0) + 1;
    updateFeatures([
      ...features,
      { id: newId, name: "", rating: 0, minScore: "4.5", maxScore: "5.0" },
    ]);
  };

  return (
    <div
      data-layer="Row"
      className="Row w-[1068px] py-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 inline-flex flex-col justify-center items-start gap-4 overflow-hidden"
    >
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
            Overview
          </div>
        </div>
        <div
          data-layer="Column"
          className="Column self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4"
        >
          <button
            onClick={(): void => setIsEnabled(!isEnabled)}
            className="w-[53.33px] h-7 relative bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline-1 -outline-offset-1 outline-[#501bd6] overflow-hidden transition-all"
          >
            <div
              className={`w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] transition-all top-[2.67px] ${
                isEnabled ? "left-[26.67px]" : "left-[2.67px]"
              }`}
            />
          </button>
          <button
            onClick={(): void => {}}
            className="hover:opacity-70 transition-opacity"
            aria-label="Delete"
          >
            <Trash2 className="w-6 h-6 text-neutral-50" />
          </button>
        </div>
      </div>

      <div
        data-layer="Frame 2147206019"
        className="Frame2147206019 self-stretch px-4 flex flex-col justify-center items-start gap-6"
      >
        <div
          data-layer="Frame 2147205992"
          className="Frame2147205992 self-stretch rounded-3xl flex flex-col justify-center items-start gap-2"
        >
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
          >
            <div
              data-layer="Title"
              className="Title justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Title
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 focus:outline-zinc-500 placeholder:text-zinc-500"
            />
          </div>
        </div>

        {features.map((feature, index) => (
          <div
            key={feature.id}
            data-layer="Row"
            className="Row self-stretch pl-20 py-4 bg-zinc-800 rounded-3xl outline-1 outline-zinc-700 inline-flex justify-center items-end gap-6 overflow-hidden"
          >
            <div
              data-layer="Column"
              className="Column self-stretch px-6 py-3 bg-zinc-800 rounded-xl inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Frame 2147205991"
                className="Frame2147205991 inline-flex justify-start items-center"
              >
                <GripVertical className="w-6 h-6 text-neutral-50" />
              </div>
            </div>

            <div
              data-layer="Frame 2147205995"
              className="Frame2147205995 flex-1 flex justify-start items-center gap-6"
            >
              <div
                data-layer="Frame 2147205992"
                className="Frame2147205992 flex-1 inline-flex flex-col justify-center items-start gap-2"
              >
                <div
                  data-layer="Frame 2147205559"
                  className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
                >
                  <div
                    data-layer={`Feature ${index + 1}`}
                    className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Feature{" "}
                    {["One", "Two", "Three", "Four", "Five"][index] ||
                      index + 1}
                  </div>
                  <input
                    type="text"
                    value={feature.name}
                    onChange={(e) =>
                      handleFeatureNameChange(feature.id, e.target.value)
                    }
                    placeholder={DEFAULT_FEATURE_NAMES[index] || `Feature ${index + 1}`}
                    className="self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 focus:outline-zinc-500 placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <div
                data-layer="Frame 1321315130"
                className="Frame1321315130 self-stretch inline-flex flex-col justify-start items-start gap-4"
              >
                <div
                  data-layer="Frame 1321315123"
                  className="Frame1321315123 self-stretch flex flex-col justify-start items-start gap-1"
                >
                  <div
                    data-layer="Rate"
                    className="Rate self-stretch justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Rate
                  </div>
                </div>
                <div
                  data-layer="Frame 2147205996"
                  className="Frame2147205996 inline-flex justify-start items-center gap-2"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={(): void => handleRatingChange(feature.id, star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= feature.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-neutral-50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-layer="Frame 2147205986"
              className="Frame2147205986 h-12 flex justify-start items-start"
            >
              <input
                type="text"
                value={feature.minScore}
                onChange={(e) =>
                  handleMinScoreChange(feature.id, e.target.value)
                }
                className="w-64 self-stretch pl-6 pr-4 py-3 bg-zinc-800 rounded-tl-xl rounded-bl-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 focus:outline-zinc-500"
              />
              <input
                type="text"
                value={feature.maxScore}
                onChange={(e) =>
                  handleMaxScoreChange(feature.id, e.target.value)
                }
                className="self-stretch px-4 py-3 bg-zinc-800 rounded-tr-xl rounded-br-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 focus:outline-zinc-500"
              />
            </div>

            <div
              data-layer="Column"
              className="Column self-stretch px-6 py-3 flex justify-center items-center gap-4"
            >
              <button
                onClick={(): void => deleteFeature(feature.id)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Delete feature"
              >
                <Trash2 className="w-6 h-6 text-neutral-50" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        data-layer="Frame 2147223629"
        className="Frame2147223629 self-stretch px-4 flex flex-col justify-center items-end gap-2.5"
      >
        <button
          onClick={addFeature}
          className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <div
            data-layer="Add More"
            className="AddMore justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Add More
          </div>
          <Plus className="w-6 h-6 text-neutral-50" />
        </button>
      </div>
    </div>
  );
}
