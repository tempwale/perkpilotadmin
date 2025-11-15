"use client";

import {useState, type ReactElement} from "react";
import { GripVertical, Trash2, Plus } from "lucide-react";

type Props = {
  initialPros?: string[];
  initialCons?: string[];
  onProsChange?: (pros: string[]) => void;
  onConsChange?: (cons: string[]) => void;
};

export default function ProsCons({ initialPros, initialCons, onProsChange, onConsChange }: Props = {}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [pros, setPros] = useState<string[]>(initialPros || [""]);
  const [cons, setCons] = useState<string[]>(initialCons || [""]);

  const addPro = () => {
    const newPros = [...pros, ""];
    setPros(newPros);
    onProsChange?.(newPros);
  };

  const addCon = () => {
    const newCons = [...cons, ""];
    setCons(newCons);
    onConsChange?.(newCons);
  };

  const deletePro = (index: number) => {
    const newPros = pros.filter((_, i) => i !== index);
    setPros(newPros);
    onProsChange?.(newPros);
  };

  const deleteCon = (index: number) => {
    const newCons = cons.filter((_, i) => i !== index);
    setCons(newCons);
    onConsChange?.(newCons);
  };

  const updatePro = (index: number, value: string) => {
    const newPros = pros.map((pro, i) => (i === index ? value : pro));
    setPros(newPros);
    onProsChange?.(newPros);
  };

  const updateCon = (index: number, value: string) => {
    const newCons = cons.map((con, i) => (i === index ? value : con));
    setCons(newCons);
    onConsChange?.(newCons);
  };

  return (
    <div
      data-layer="Frame 2147206001"
      className="Frame2147206001 self-stretch inline-flex flex-col justify-start items-start gap-4"
    >
      <div
        data-layer="Pros vs Cons"
        className="ProsVsCons self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
      >
        Pros vs Cons
      </div>

      <div
        data-layer="Row"
        className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-700 flex flex-col justify-center items-start gap-4 overflow-hidden"
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
              className="Frame2147205991 flex justify-start items-center cursor-grab"
            >
              <GripVertical className="w-6 h-6 text-neutral-50" />
            </div>
            <div
              data-layer="Text"
              className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Pros & Cons
            </div>
          </div>
          <div
            data-layer="Column"
            className="Column self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4"
          >
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              data-layer="Button"
              className="Button w-[53.33px] h-7 relative bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline outline-1 outline-offset-[-1px] outline-[#501bd6] overflow-hidden"
            >
              <div
                data-layer="Button"
                className={`Button w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] transition-all duration-200 ${
                  isEnabled ? "left-[26.67px]" : "left-[3px]"
                } top-[2.67px]`}
              />
            </button>
          </div>
        </div>

        {/* Pros and Cons Content */}
        <div
          data-layer="Frame 2147206019"
          className="Frame2147206019 self-stretch px-6 inline-flex justify-start items-start gap-6"
        >
          {/* Pros Column */}
          <div
            data-layer="Frame 2147205560"
            className="Frame2147205560 flex-1 inline-flex flex-col justify-start items-start gap-3"
          >
            <div className="flex justify-between items-center w-full">
              <div
                data-layer="Pros"
                className="Pros justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Pros
              </div>
              <button
                onClick={addPro}
                className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
              >
                <span className="text-neutral-50 text-xs font-medium">Add Pro</span>
                <Plus className="w-4 h-4 text-neutral-50" />
              </button>
            </div>
            
            {pros.map((pro, index) => (
              <div key={index} className="w-full flex items-center gap-2">
                <input
                  type="text"
                  value={pro}
                  onChange={(e) => updatePro(index, e.target.value)}
                  placeholder={`Pro ${index + 1}`}
                  data-layer="Input"
                  className="Input flex-1 h-12 pl-6 pr-4 py-3 bg-zinc-900 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-2 focus:outline-[#501bd6]"
                />
                {pros.length > 1 && (
                  <button
                    onClick={() => deletePro(index)}
                    className="hover:opacity-70 transition-opacity"
                    aria-label="Delete pro"
                  >
                    <Trash2 className="w-5 h-5 text-neutral-50" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Cons Column */}
          <div
            data-layer="Frame 2147205561"
            className="Frame2147205561 flex-1 inline-flex flex-col justify-start items-start gap-3"
          >
            <div className="flex justify-between items-center w-full">
              <div
                data-layer="Cons"
                className="Cons justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Cons
              </div>
              <button
                onClick={addCon}
                className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
              >
                <span className="text-neutral-50 text-xs font-medium">Add Con</span>
                <Plus className="w-4 h-4 text-neutral-50" />
              </button>
            </div>
            
            {cons.map((con, index) => (
              <div key={index} className="w-full flex items-center gap-2">
                <input
                  type="text"
                  value={con}
                  onChange={(e) => updateCon(index, e.target.value)}
                  placeholder={`Con ${index + 1}`}
                  data-layer="Input"
                  className="Input flex-1 h-12 pl-6 pr-4 py-3 bg-zinc-900 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-2 focus:outline-[#501bd6]"
                />
                {cons.length > 1 && (
                  <button
                    onClick={() => deleteCon(index)}
                    className="hover:opacity-70 transition-opacity"
                    aria-label="Delete con"
                  >
                    <Trash2 className="w-5 h-5 text-neutral-50" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
