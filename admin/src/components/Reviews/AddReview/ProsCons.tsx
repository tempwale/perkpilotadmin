"use client";

import { useState } from "react";
import { GripVertical, Trash2, Plus } from "lucide-react";

type ProsConsItem = {
  id: number;
  title: string;
  pros: string;
  cons: string;
  enabled: boolean;
};

export default function ProsCons() {
  const [items, setItems] = useState<ProsConsItem[]>([
    { id: 1, title: "", pros: "", cons: "", enabled: true },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        title: "",
        pros: "",
        cons: "",
        enabled: true,
      },
    ]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const updateField = (
    id: number,
    field: keyof Pick<ProsConsItem, "title" | "pros" | "cons">,
    value: string
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
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

      {items.map((item) => (
        <div
          key={item.id}
          data-layer="Row"
          className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-700 flex flex-col justify-center items-start gap-4 overflow-hidden"
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
                onClick={() => toggleItem(item.id)}
                data-layer="Button"
                className="Button w-[53.33px] h-7 relative bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline outline-1 outline-offset-[-1px] outline-[#501bd6] overflow-hidden"
              >
                <div
                  data-layer="Button"
                  className={`Button w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] transition-all duration-200 ${
                    item.enabled ? "left-[26.67px]" : "left-[3px]"
                  } top-[2.67px]`}
                />
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                data-layer="fluent:delete-16-regular"
                className="FluentDelete16Regular w-6 h-6 relative overflow-hidden cursor-pointer hover:opacity-70 transition-opacity"
              >
                <Trash2 className="w-6 h-6 text-neutral-50" />
              </button>
            </div>
          </div>
          <div
            data-layer="Frame 2147206019"
            className="Frame2147206019 self-stretch inline-flex justify-end items-center gap-6"
          >
            <div
              data-layer="Frame 2147205992"
              className="Frame2147205992 flex-1 px-6 rounded-3xl inline-flex flex-col justify-center items-end gap-2"
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
                  value={item.title}
                  onChange={(e) =>
                    updateField(item.id, "title", e.target.value)
                  }
                  placeholder="Title"
                  data-layer="Input"
                  className="Input self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-2 focus:outline-[#501bd6]"
                />
              </div>
              <div
                data-layer="Frame 2147206057"
                className="Frame2147206057 self-stretch inline-flex justify-start items-start gap-6"
              >
                <div
                  data-layer="Frame 2147205560"
                  className="Frame2147205560 flex-1 inline-flex flex-col justify-center items-start gap-2"
                >
                  <div
                    data-layer="Pros"
                    className="Pros justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Pros
                  </div>
                  <input
                    type="text"
                    value={item.pros}
                    onChange={(e) =>
                      updateField(item.id, "pros", e.target.value)
                    }
                    placeholder="Pros"
                    data-layer="Input"
                    className="Input self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-2 focus:outline-[#501bd6]"
                  />
                </div>
                <div
                  data-layer="Frame 2147205561"
                  className="Frame2147205561 flex-1 inline-flex flex-col justify-center items-start gap-2"
                >
                  <div
                    data-layer="Cons"
                    className="Cons justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                  >
                    Cons
                  </div>
                  <input
                    type="text"
                    value={item.cons}
                    onChange={(e) =>
                      updateField(item.id, "cons", e.target.value)
                    }
                    placeholder="Cons"
                    data-layer="Input"
                    className="Input self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 focus:outline-2 focus:outline-[#501bd6]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        data-layer="Frame 2147205993"
        className="Frame2147205993 inline-flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div
          data-layer="Add More Pros & Cons"
          className="AddMoreProsCons justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
        >
          Add More Pros & Cons
        </div>
        <Plus className="w-6 h-6 text-neutral-50" />
      </button>
    </div>
  );
}
