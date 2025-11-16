import { useState, useEffect, type ReactElement } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import type { FeatureComparisonApiResponse } from "../../../types/api.types";

interface Tool {
  id: number;
  name: string;
}

interface Feature {
  id: number;
  name: string;
  availability: boolean[];
}

type Props = {
  onFeaturesChange?: (featuresData: FeatureComparisonApiResponse) => void;
};

export default function FeatureComparison({ onFeaturesChange }: Props): ReactElement {
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const [featureHeadline, setFeatureHeadline] = useState<string>("");
  const [tools, setTools] = useState<Tool[]>([
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
  ]);
  const [features, setFeatures] = useState<Feature[]>([
    { id: 1, name: "", availability: [true, true, true] },
    { id: 2, name: "", availability: [false, true, true] },
    { id: 3, name: "", availability: [true, true, true] },
    { id: 4, name: "", availability: [true, true, true] },
  ]);

  useEffect((): void => {
    // Transform features to match FeatureApiResponse type
    const transformedFeatures = features.map((f) => {
      return {
        featureName: f.name || "Untitled Feature",
        tool1Available: f.availability[0] ?? false,
        tool2Available: f.availability[1] ?? false,
        tool3Available: f.availability[2] ?? false,
      };
    });

    onFeaturesChange?.({
      sectionTitle: sectionTitle || "Features",
      featuresHeadline: featureHeadline || "Feature Comparison",
      tools: tools.map((t) => t.name || `Tool ${t.id}`),
      features: transformedFeatures,
    });
  }, [sectionTitle, featureHeadline, tools, features, onFeaturesChange]);

  const addFeature = (): void => {
    const newFeature: Feature = {
      id: Date.now(),
      name: "",
      availability: tools.map(() => true),
    };
    setFeatures([...features, newFeature]);
  };

  const removeFeature = (id: number): void => {
    setFeatures(features.filter((f): boolean => f.id !== id));
  };

  const updateFeatureName = (id: number, name: string): void => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, name } : f)));
  };

  const toggleAvailability = (featureId: number, toolIndex: number): void => {
    setFeatures(
      features.map((f) => {
        if (f.id === featureId) {
          const newAvailability = [...f.availability];
          newAvailability[toolIndex] = !newAvailability[toolIndex];
          return { ...f, availability: newAvailability };
        }
        return f;
      })
    );
  };

  const updateToolName = (index: number, name: string): void => {
    const newTools = [...tools];
    if (newTools[index]) {
      newTools[index].name = name;
      setTools(newTools);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <div className="text-neutral-50 text-xl font-medium font-['Poppins'] leading-8">
          Features Comparison Section
        </div>

        <div className="py-4 bg-zinc-800 rounded-3xl border border-zinc-700 flex flex-col gap-4 overflow-hidden">
          <div className="px-6 flex flex-col gap-4">
            {/* Section Title Input */}
            <div className="flex flex-col gap-2">
              <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                Section Title
              </div>
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="Title"
                className="w-full h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Tools Row */}
            <div className="flex justify-start items-start gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                  Features Headline
                </div>
                <input
                  type="text"
                  value={featureHeadline}
                  onChange={(e) => setFeatureHeadline(e.target.value)}
                  placeholder="Feature"
                  className="w-full h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              {tools.map((tool, index): React.ReactElement => (
                <div key={tool.id} className="flex-1 flex flex-col gap-2">
                  <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                    Select Tool
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={tool.name}
                      onChange={(e) => updateToolName(index, e.target.value)}
                      placeholder="Select"
                      className="w-full h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    />
                    <ChevronDown className="w-6 h-6 absolute right-4 top-3 text-neutral-50 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Features List */}
            {features.map((feature): ReactElement => (
              <div
                key={feature.id}
                className="flex justify-start items-center gap-6"
              >
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={feature.name}
                    onChange={(e) =>
                      updateFeatureName(feature.id, e.target.value)
                    }
                    placeholder="Feature Name"
                    className="flex-1 h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={(): void => removeFeature(feature.id)}
                    className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                    aria-label="Remove feature"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                {tools.map((tool, toolIndex): ReactElement => (
                  <div
                    key={toolIndex}
                    className="flex-1 flex justify-start items-center gap-6"
                  >
                    <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                      Feature Available
                    </div>
                    <button
                      onClick={(): void => toggleAvailability(feature.id, toolIndex)}
                      className={`w-[53.33px] h-7 rounded-full relative transition-all ${
                        feature.availability[toolIndex]
                          ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2] border border-[#501bd6]"
                          : "bg-zinc-700 border border-zinc-600"
                      }`}
                      aria-label={`Toggle availability for ${
                        tool.name || "tool"
                      }`}
                    >
                      <div
                        className={`w-[23.33px] h-[22.67px] bg-white rounded-full absolute top-[2.67px] transition-all ${
                          feature.availability[toolIndex]
                            ? "left-[26.67px]"
                            : "left-[3px]"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            ))}

            {/* Add More Features Button */}
            <button
              onClick={addFeature}
              className="flex justify-end items-center gap-3 cursor-pointer group"
            >
              <div className="text-neutral-50 text-sm font-medium font-['Poppins'] group-hover:text-purple-400 transition-colors">
                Add More Features
              </div>
              <div className="w-6 h-6 flex items-center justify-center group-hover:bg-zinc-700 rounded-full transition-colors">
                <Plus className="w-5 h-5 text-neutral-50" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
