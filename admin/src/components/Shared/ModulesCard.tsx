import { GripVertical, Plus } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef, type ReactElement } from "react";

export type Module = {
  id: string;
  title: string;
  benefits: string[];
};

export type ModulesCardProps = {
  initialModules?: Module[];
  onModulesChange?: (modules: Module[]) => void;
};

// Helper function to get benefit label
function getBenefitLabel(index: number): string {
  const labels = ["One", "Two", "Three", "Four", "Five"];
  return labels[index] ?? String(index + 1);
}

// Helper to create default module
const createDefaultModule = (): Module => ({
  id: crypto.randomUUID(),
  title: "",
  benefits: ["", "", "", "", ""],
});

export default function ModulesCard({
  initialModules,
  onModulesChange,
}: ModulesCardProps): ReactElement {
  // Default modules if none provided
  const resolvedInitialModules = initialModules && initialModules.length > 0 
    ? initialModules 
    : [createDefaultModule()];
  
  const [modules, setModules] = useState<Module[]>(resolvedInitialModules);
  const onModulesChangeRef = useRef(onModulesChange);
  const isInitialMount = useRef(true);
  const prevInitialModulesRef = useRef<Module[]>(resolvedInitialModules);
  const modulesRef = useRef<Module[]>(resolvedInitialModules);
  const isSyncingFromProps = useRef(false);

  // Keep refs updated
  useEffect((): void => {
    onModulesChangeRef.current = onModulesChange;
  }, [onModulesChange]);

  // Update modules ref whenever modules state changes
  useEffect((): void => {
    modulesRef.current = modules;
  }, [modules]);

  // Sync with initialModules prop (only when it actually changes from outside)
  // Only sync on mount or when initialModules changes from undefined to defined (or vice versa)
  useEffect((): void => {
    // Skip if we're currently syncing (to avoid loops)
    if (isSyncingFromProps.current) {
      // Still update the ref to track the latest value
      const resolvedModules = initialModules && initialModules.length > 0 
        ? initialModules 
        : [createDefaultModule()];
      prevInitialModulesRef.current = resolvedModules;
      return;
    }
    
    const resolvedModules = initialModules && initialModules.length > 0 
      ? initialModules 
      : [createDefaultModule()];
    
    // Only sync on first mount or when transitioning between undefined/defined states
    const prevWasUndefined = !prevInitialModulesRef.current || prevInitialModulesRef.current.length === 0;
    const currentIsUndefined = !initialModules || initialModules.length === 0;
    
    // Only sync if:
    // 1. First mount, OR
    // 2. Transitioning between undefined/defined states, OR
    // 3. The content actually changed (deep comparison)
      const prevStr = JSON.stringify(prevInitialModulesRef.current);
    const newStr = JSON.stringify(resolvedModules);
    const contentChanged = prevStr !== newStr;
    
    if (isInitialMount.current || (prevWasUndefined !== currentIsUndefined)) {
      // Sync on mount or state transitions
      if (contentChanged) {
        prevInitialModulesRef.current = resolvedModules;
        const currentStr = JSON.stringify(modulesRef.current);
        // Only sync if current modules are different from new initialModules
        if (currentStr !== newStr) {
          isSyncingFromProps.current = true;
          setModules(resolvedModules);
        }
      }
    } else {
      // Not a state transition - only update ref, don't sync
      // This prevents syncing when user is typing and parent updates
      prevInitialModulesRef.current = resolvedModules;
    }
  }, [initialModules]);

  // Clear syncing flag after layout effects
  useLayoutEffect((): void => {
    isSyncingFromProps.current = false;
  }, [modules]);

  // Call callback when modules change (but not on initial mount or when syncing from props)
  // Use a small debounce to batch rapid changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isSyncingFromProps.current) {
      return;
    }
    
    // Debounce the callback to prevent rapid parent updates
    const timeoutId = setTimeout(() => {
      onModulesChangeRef.current?.(modules);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [modules]);

  const handleTitleChange = (index: number, value: string): void => {
    const updated = [...modules];
    const currentModule = updated[index];
    if (currentModule) {
      updated[index] = {
        id: currentModule.id,
        title: value,
        benefits: currentModule.benefits || []
      };
      setModules(updated);
    }
  };

  const handleBenefitChange = (moduleIndex: number, benefitIndex: number, value: string): void => {
    const updated = [...modules];
    const currentModule = updated[moduleIndex];
    if (currentModule) {
      const benefits = [...(currentModule.benefits || [])];
      benefits[benefitIndex] = value;
      updated[moduleIndex] = {
        id: currentModule.id,
        title: currentModule.title || "",
        benefits
      };
      setModules(updated);
    }
  };

  const handleAddBenefit = (moduleIndex: number): void => {
    const updated = [...modules];
    const currentModule = updated[moduleIndex];
    if (currentModule) {
      updated[moduleIndex] = {
        id: currentModule.id,
        title: currentModule.title || "",
        benefits: [...(currentModule.benefits || []), ""],
      };
      setModules(updated);
    }
  };

  // const handleAddModule = (): void => {
  //   const updated = [...modules, createDefaultModule()];
  //   setModules(updated);
  // };

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        data-layer="Modules Tab"
        className="ModulesTab self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
      >
        Modules Tab
      </div>

      {modules.map((module, moduleIndex) => (
        <div
          key={module.id}
          data-layer="Row"
          className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 inline-flex flex-col justify-center items-start gap-4 overflow-hidden"
        >
          {/* Header */}
          <div
            data-layer="Row"
            className="Row self-stretch h-14 inline-flex justify-start items-center"
          >
            <div
              data-layer="Column"
              className="Column flex-1 self-stretch px-6 py-3 border-b border-zinc-700 flex justify-between items-center"
            >
              <div
                data-layer="Frame 2147223611"
                className="Frame2147223611 w-[525px] flex justify-start items-center gap-3"
              >
                {/* Drag icons */}
                <GripVertical className="text-zinc-400 w-6 h-6" />

                <div
                  data-layer="Text"
                  className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Blog Modules
                </div>
              </div>

              {/* Add more benefits */}
              <div
                onClick={(): void => handleAddBenefit(moduleIndex)}
                className="Frame2147205993 flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition"
              >
                <div
                  data-layer="Add More Benefits"
                  className="AddMoreBenefits justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Add More Benefits
                </div>
                <Plus className="text-zinc-400 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Module inputs */}
          <div
            data-layer="Frame 2147206019"
            className="Frame2147206019 self-stretch inline-flex justify-start items-center gap-6"
          >
            <div
              data-layer="Frame 2147205992"
              className="Frame2147205992 flex-1 px-6 rounded-3xl inline-flex flex-col justify-center items-start gap-6"
            >
              {/* Title Input */}
              <div className="self-stretch flex flex-col justify-center items-start gap-2">
                <div className="Title justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
                  Title
                </div>
                <div className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden">
                  <input
                    type="text"
                    placeholder="Title"
                    value={module.title}
                    onChange={(e): void => handleTitleChange(moduleIndex, e.target.value)}
                    className="w-full bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>

              {/* Benefits Inputs */}
              {module.benefits.map((benefit, benefitIndex) => (
                <div
                  key={`${module.id}-benefit-${benefitIndex}`}
                  className="self-stretch flex flex-col justify-center items-start gap-2"
                >
                  <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
                    Benefit {getBenefitLabel(benefitIndex)}
                  </div>
                  <div className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden">
                    <input
                      type="text"
                      placeholder="Benefit"
                      value={benefit}
                      onChange={(e): void => handleBenefitChange(moduleIndex, benefitIndex, e.target.value)}
                      className="w-full bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none placeholder:text-zinc-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Add More Modules Button */}
      {/* <div
        onClick={handleAddModule}
        className="flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition"
      >
        <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
          Add More Modules
        </div>
        <Plus className="text-zinc-400 w-6 h-6" />
      </div> */}
    </div>
  );
}
