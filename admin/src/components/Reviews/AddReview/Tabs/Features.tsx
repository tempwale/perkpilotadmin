"use client";

import {useState, type ReactElement} from "react";
import { GripVertical, Trash2, Plus } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  body: string;
}

interface ProductFeaturesProps {
  initialFeatures?: Feature[];
  onFeaturesChange?: (features: Feature[]) => void;
}

export default function ProductFeatures({
  initialFeatures,
  onFeaturesChange,
}: ProductFeaturesProps): ReactElement{
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [features, setFeatures] = useState<Feature[]>(
    initialFeatures || [
      { id: 1, title: "", body: "" },
      { id: 2, title: "", body: "" },
      { id: 3, title: "", body: "" },
      { id: 4, title: "", body: "" },
    ]
  );

  const updateFeatures = (newFeatures: Feature[]): void => {
    setFeatures(newFeatures);
    onFeaturesChange?.(newFeatures);
  };

  const handleTitleChange = (id: number, value: string): void => {
    const updatedFeatures = features.map((feature) =>
      feature.id === id ? { ...feature, title: value } : feature
    );
    updateFeatures(updatedFeatures);
  };

  const handleBodyChange = (id: number, value: string): void => {
    const updatedFeatures = features.map((feature) =>
      feature.id === id ? { ...feature, body: value } : feature
    );
    updateFeatures(updatedFeatures);
  };

  const deleteFeature = (id: number): void => {
    const updatedFeatures = features.filter((feature): boolean => feature.id !== id);
    updateFeatures(updatedFeatures);
  };

  const addFeature = (): void => {
    const newId = Math.max(...features.map((f) => f.id), 0) + 1;
    const updatedFeatures = [...features, { id: newId, title: "", body: "" }];
    updateFeatures(updatedFeatures);
  };

  const handleToggle = (): void => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div
      data-layer="Row"
      className="Row w-[1068px] py-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 inline-flex flex-col justify-center items-start gap-4 overflow-hidden"
    >
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
            <GripVertical className="w-6 h-6 text-neutral-50" />
          </div>
          <div
            data-layer="Text"
            className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Product Features
          </div>
        </div>
        <div
          data-layer="Column"
          className="Column self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4"
        >
          <button
            onClick={handleToggle}
            className="w-[53.33px] h-7 relative bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline-1 -outline-offset-1 outline-[#501bd6] overflow-hidden transition-all"
            aria-label={isEnabled ? "Disable features" : "Enable features"}
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
            aria-label="Delete section"
          >
            <Trash2 className="w-6 h-6 text-neutral-50" />
          </button>
        </div>
      </div>

      {/* Features List */}
      <div
        data-layer="Frame 2147206019"
        className="Frame2147206019 self-stretch px-4 flex flex-col justify-center items-start gap-6"
      >
        {features.map((feature) => (
          <div
            key={feature.id}
            data-layer="Row"
            className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline-1 outline-zinc-700 inline-flex justify-center items-end gap-6 overflow-hidden"
          >
            {/* Drag Handle */}
            <div
              data-layer="Column"
              className="Column self-stretch px-6 py-3 bg-zinc-800 rounded-xl inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Frame 2147205991"
                className="Frame2147205991 inline-flex justify-start items-center"
              >
                <GripVertical className="w-6 h-6 text-neutral-50" />
                <GripVertical className="w-6 h-6 text-neutral-50" />
              </div>
            </div>

            {/* Title Input */}
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
                  <label
                    htmlFor={`title-${feature.id}`}
                    data-layer="Title"
                    className="Title justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Title
                  </label>
                  <input
                    id={`title-${feature.id}`}
                    type="text"
                    value={feature.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleTitleChange(feature.id, e.target.value)
                    }
                    placeholder="Feature title"
                    className="self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500"
                  />
                </div>
              </div>
            </div>

            {/* Body Input */}
            <div
              data-layer="Frame 2147205996"
              className="Frame2147205996 flex-1 flex justify-start items-center gap-6"
            >
              <div
                data-layer="Frame 2147205992"
                className="Frame2147205992 flex-1 inline-flex flex-col justify-center items-start gap-2"
              >
                <div
                  data-layer="Frame 2147205559"
                  className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
                >
                  <label
                    htmlFor={`body-${feature.id}`}
                    data-layer="Feature Body"
                    className="FeatureBody justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Feature Body
                  </label>
                  <input
                    id={`body-${feature.id}`}
                    type="text"
                    value={feature.body}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleBodyChange(feature.id, e.target.value)
                    }
                    placeholder="Feature body"
                    className="self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-zinc-500"
                  />
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <div
              data-layer="Column"
              className="Column self-stretch px-6 py-3 flex justify-center items-center gap-4"
            >
              <button
                onClick={(): void => deleteFeature(feature.id)}
                className="hover:opacity-70 transition-opacity"
                aria-label={`Delete feature ${feature.id}`}
              >
                <Trash2 className="w-6 h-6 text-neutral-50" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add More Button */}
      <div
        data-layer="Frame 2147223629"
        className="Frame2147223629 self-stretch px-4 flex flex-col justify-center items-end gap-2.5"
      >
        <button
          onClick={addFeature}
          className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
          aria-label="Add more features"
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
