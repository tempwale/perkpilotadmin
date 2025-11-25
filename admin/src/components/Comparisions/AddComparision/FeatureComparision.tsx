import { useState, useEffect, useRef, type ReactElement } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import type { FeatureComparisonApiResponse, DealApiResponse } from "../../../types/api.types";
import { DEALS_API } from "../../../config/backend";

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
  initialData?: FeatureComparisonApiResponse;
  onFeaturesChange?: (featuresData: FeatureComparisonApiResponse) => void;
};

export default function FeatureComparison({ initialData, onFeaturesChange }: Props): ReactElement {
  const getInitialTools = (): Tool[] => {
    const baseTools =
      initialData?.tools?.map((name, idx) => ({ id: idx + 1, name })) ?? [];

    while (baseTools.length < 3) {
      baseTools.push({ id: baseTools.length + 1, name: "" });
    }

    return baseTools;
  };

  const getInitialFeatures = (): Feature[] => {
    if (initialData?.features && initialData.features.length > 0) {
      return initialData.features.map((f, idx) => ({
        id: idx + 1,
        name: f.featureName,
        availability: [
          f.tool1Available ?? false,
          f.tool2Available ?? false,
          f.tool3Available ?? false,
        ],
      }));
    }
    return [
    { id: 1, name: "", availability: [true, true, true] },
    { id: 2, name: "", availability: [false, true, true] },
    { id: 3, name: "", availability: [true, true, true] },
    { id: 4, name: "", availability: [true, true, true] },
    ];
  };

  const [sectionTitle, setSectionTitle] = useState<string>(initialData?.sectionTitle || "");
  const [featureHeadline, setFeatureHeadline] = useState<string>(initialData?.featuresHeadline || "");
  const [tools, setTools] = useState<Tool[]>(getInitialTools());
  const [features, setFeatures] = useState<Feature[]>(getInitialFeatures());
  
  // Search state for each tool (indexed by tool index)
  const [searchQueries, setSearchQueries] = useState<Record<number, string>>({});
  const [searchResults, setSearchResults] = useState<Record<number, DealApiResponse[]>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const searchRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const onFeaturesChangeRef = useRef(onFeaturesChange);

  useEffect(() => {
    onFeaturesChangeRef.current = onFeaturesChange;
  }, [onFeaturesChange]);

  useEffect((): void => {
    const transformedFeatures = features.map((f) => {
      return {
        featureName: f.name || "Untitled Feature",
        tool1Available: f.availability[0] ?? false,
        tool2Available: f.availability[1] ?? false,
        tool3Available: f.availability[2] ?? false,
      };
    });

    onFeaturesChangeRef.current?.({
      sectionTitle: sectionTitle || "Features",
      featuresHeadline: featureHeadline || "Feature Comparison",
      tools: tools.map((t) => t.name || `Tool ${t.id}`),
      features: transformedFeatures,
    });
  }, [sectionTitle, featureHeadline, tools, features]);

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
    // Update search query for this tool
    setSearchQueries((prev) => ({ ...prev, [index]: name }));
  };

  // Handle search for each tool
  useEffect(() => {
    const searchPromises: Array<() => void> = [];

    tools.forEach((_, index) => {
      const query = searchQueries[index] || "";
      
      if (!query.trim()) {
        setSearchResults((prev) => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });
        setShowResults((prev) => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });
        setLoading((prev) => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });
        return;
      }

      const abortController = new AbortController();
      const timeoutId = setTimeout(async (): Promise<void> => {
        setLoading((prev) => ({ ...prev, [index]: true }));
        try {
          const response = await fetch(
            `${DEALS_API}?q=${encodeURIComponent(query)}&_t=${Date.now()}`,
            {
              signal: abortController.signal,
              cache: "no-cache",
            }
          );

          if (!response.ok) {
            setLoading((prev) => {
              const updated = { ...prev };
              delete updated[index];
              return updated;
            });
            setSearchResults((prev) => {
              const updated = { ...prev };
              delete updated[index];
              return updated;
            });
            setShowResults((prev) => {
              const updated = { ...prev };
              delete updated[index];
              return updated;
            });
          } else {
            const data = (await response.json()) as
              | DealApiResponse[]
              | { data: DealApiResponse[] };
            const deals = Array.isArray(data) ? data : data.data ?? [];
            setSearchResults((prev) => ({ ...prev, [index]: deals.slice(0, 5) }));
            setShowResults((prev) => ({ ...prev, [index]: true }));
          }
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return;
          }
          console.error("Error fetching tools:", error);
          setSearchResults((prev) => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
          });
          setShowResults((prev) => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
          });
        } finally {
          setLoading((prev) => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
          });
        }
      }, 300);

      searchPromises.push(() => {
        clearTimeout(timeoutId);
        abortController.abort();
      });
    });

    return () => {
      searchPromises.forEach((cleanup) => cleanup());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQueries]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      const target = event.target as Node;
      Object.keys(searchRefs.current).forEach((key) => {
        const index = Number(key);
        if (
          searchRefs.current[index] &&
          !searchRefs.current[index]?.contains(target)
        ) {
          setShowResults((prev) => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
          });
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSelectTool = (index: number, deal: DealApiResponse): void => {
    updateToolName(index, deal.title || "");
    setShowResults((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setSearchQueries((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-neutral-50 text-xl font-medium font-['Poppins'] leading-8">
        Features Comparison Section
      </div>

      <div className="w-full flex flex-col gap-4">
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
                  <div
                    className="relative"
                    ref={(el) => {
                      searchRefs.current[index] = el;
                    }}
                  >
                  <div className="relative">
                    <input
                      type="text"
                      value={tool.name}
                      onChange={(e) => updateToolName(index, e.target.value)}
                        onFocus={() => {
                          if (searchQueries[index] && searchResults[index]?.length) {
                            setShowResults((prev) => ({ ...prev, [index]: true }));
                          }
                        }}
                        placeholder="Search or type tool name"
                        className="w-full h-12 px-6 py-3 pr-10 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    />
                      <div className="absolute right-4 top-3 flex items-center gap-2">
                        {loading[index] && (
                          <div className="text-zinc-400 text-xs">Searching...</div>
                        )}
                        <ChevronDown className="w-6 h-6 text-neutral-50 pointer-events-none" />
                      </div>
                    </div>
                    {/* Search Results Dropdown */}
                    {showResults[index] && searchResults[index] && searchResults[index].length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        {searchResults[index].map((deal) => (
                          <div
                            key={deal._id || deal.id || deal.title}
                            onClick={() => handleSelectTool(index, deal)}
                            className="px-4 py-3 hover:bg-zinc-700 cursor-pointer flex items-center gap-3"
                          >
                            {deal.logoUri && (
                              <img
                                src={deal.logoUri}
                                alt={deal.title}
                                className="w-8 h-8 object-contain rounded"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            )}
                            <div className="flex-1">
                              <div className="text-neutral-50 text-sm font-medium">
                                {deal.title}
                              </div>
                              {(deal.category || deal.tag) && (
                                <div className="text-zinc-400 text-xs">
                                  {deal.category || deal.tag}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
