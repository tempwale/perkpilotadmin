import { GripVertical, PlusIcon } from "lucide-react";
import { useState } from "react";

type ModulesCardProps = {
  initialModules?: string[];
  onModulesChange?: (modules: string[]) => void;
};

export default function ModulesCard({
  initialModules = ["Module Name", "Module Name", "Module Name", "Module Name"],
  onModulesChange,
}: ModulesCardProps) {
  const [modules, setModules] = useState<string[]>(initialModules);

  const handleModuleChange = (index: number, value: string) => {
    const updated = [...modules];
    updated[index] = value;
    setModules(updated);
    onModulesChange?.(updated);
  };

  const handleAddModule = () => {
    const updated = [...modules, "Module Name"];
    setModules(updated);
    onModulesChange?.(updated);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        data-layer="Modules Card"
        className="ModulesCard self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
      >
        Modules Card
      </div>

      <div
        data-layer="Row"
        className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-700 inline-flex flex-col justify-center items-start gap-4 overflow-hidden"
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

            {/* Add more modules */}
            <div
              onClick={handleAddModule}
              className="Frame2147205993 flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition"
            >
              <div
                data-layer="Add More Modules"
                className="AddMoreModules justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Add More Modules
              </div>
              <PlusIcon className="text-zinc-400 w-6 h-6" />
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
            className="Frame2147205992 flex-1 px-6 rounded-3xl inline-flex flex-col justify-center items-start gap-2"
          >
            {modules.map((name, index) => (
              <div
                key={index}
                className="self-stretch flex flex-col justify-center items-start gap-2"
              >
                <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
                  Module {String(index + 1).padStart(2, "0")}
                </div>

                <div className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleModuleChange(index, e.target.value)}
                    className="w-full bg-transparent text-zinc-400 text-base font-normal font-['Poppins'] leading-6 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
