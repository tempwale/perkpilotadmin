import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";

type ModuleItem = {
  id: string;
  label: string;
};

interface ComparisonModulesCardProps {
  initialModules?: Array<{ id: string; name: string }>;
  onModulesChange?: (modules: Array<{ id: string; name: string }>) => void;
}

const DEFAULT_MODULES: ModuleItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "mentioned-tools", label: "Mentioned Tools" },
  { id: "tools-brief", label: "Tools Brief" },
  { id: "features-comparisons", label: "Features Comparisons" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "conclusion", label: "Conclusion" },
];

const ComparisonModulesCard: React.FC<ComparisonModulesCardProps> = ({
  initialModules,
  onModulesChange,
}) => {
  const [modules, setModules] = useState<ModuleItem[]>(() => {
    if (initialModules && initialModules.length > 0) {
      return initialModules.map((m) => ({
        id: m.id,
        label: m.name,
      }));
    }
    return DEFAULT_MODULES;
  });

  const isInitialMount = useRef(true);
  const hasSyncedRef = useRef(false);
  const onModulesChangeRef = useRef(onModulesChange);

  // Keep ref updated
  useEffect(() => {
    onModulesChangeRef.current = onModulesChange;
  }, [onModulesChange]);

  // Sync with parent when modules change (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const transformedModules = modules.map((m) => ({
      id: m.id,
      name: m.label,
    }));

    console.log("=== ComparisonModulesCard sending data ===");
    console.log("Current modules state:", modules);
    console.log("Transformed modules:", transformedModules);

    onModulesChangeRef.current?.(transformedModules);
  }, [modules]);

  // Update when initialModules prop changes (for edit mode) - only once
  useEffect(() => {
    if (initialModules && initialModules.length > 0 && !hasSyncedRef.current) {
      const transformed = initialModules.map((m) => ({
        id: m.id,
        label: m.name,
      }));
      setModules(transformed);
      hasSyncedRef.current = true;
    }
  }, [initialModules]);

  const handleLabelChange = (id: string, newLabel: string): void => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, label: newLabel } : m))
    );
  };

  const handleAddModule = (): void => {
    const newModule: ModuleItem = {
      id: `module-${Date.now()}`,
      label: "",
    };
    setModules((prev) => [...prev, newModule]);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8">
          Comparison Modules
        </div>
        <button
          type="button"
          onClick={handleAddModule}
          className="flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition px-3 py-2 rounded-lg hover:bg-zinc-700/20"
        >
          <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
            Add More Comparison Modules
          </div>
          <Plus className="text-neutral-50 w-5 h-5" />
        </button>
      </div>

      {/* Module List */}
      <div className="self-stretch flex flex-col gap-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className="self-stretch flex flex-col justify-center items-start gap-2"
          >
            <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
              Module {String(index + 1).padStart(2, "0")}
            </div>
            <div className="Input self-stretch h-12 pl-4 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden">
              <input
                type="text"
                placeholder="Module Name"
                value={module.label}
                onChange={(e): void =>
                  handleLabelChange(module.id, e.target.value)
                }
                className="w-full bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonModulesCard;

