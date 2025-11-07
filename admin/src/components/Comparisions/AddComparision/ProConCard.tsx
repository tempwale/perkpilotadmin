import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ProConItem {
  id: number;
  pro: string;
  con: string;
}

type Props = {
  cardNumber?: number;
  onProsConsChange?: (prosConsData: any) => void;
};

export default function ProConCard({
  cardNumber = 1,
  onProsConsChange,
}: Props) {
  const [titlePros, setTitlePros] = useState<string>("");
  const [titleCons, setTitleCons] = useState<string>("");
  const [items, setItems] = useState<ProConItem[]>([
    { id: 1, pro: "", con: "" },
    { id: 2, pro: "", con: "" },
    { id: 3, pro: "", con: "" },
    { id: 4, pro: "", con: "" },
    { id: 5, pro: "", con: "" },
  ]);

  useEffect(() => {
    // Transform items to prosConsPairs format (remove id property)
    const prosConsPairs = items.map(({ pro, con }) => ({ pro, con }));

    const data = {
      cardNumber,
      titlePros,
      titleCons,
      prosConsPairs,
    };

    console.log(`ProConCard ${cardNumber} sending data:`, data);

    onProsConsChange?.([data]);
  }, [titlePros, titleCons, items, cardNumber]);

  const addItem = (): void => {
    const newItem: ProConItem = {
      id: Date.now(),
      pro: "",
      con: "",
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number): void => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updatePro = (id: number, value: string): void => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, pro: value } : item))
    );
  };

  const updateCon = (id: number, value: string): void => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, con: value } : item))
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="rounded-3xl flex flex-col gap-4">
          {/* Title Row */}
          <div className="flex justify-start items-start gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                Title Pros
              </div>
              <input
                type="text"
                value={titlePros}
                onChange={(e) => setTitlePros(e.target.value)}
                placeholder="Pros"
                className="w-full h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                Title Cons
              </div>
              <input
                type="text"
                value={titleCons}
                onChange={(e) => setTitleCons(e.target.value)}
                placeholder="Cons"
                className="w-full h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Items List */}
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-start items-start gap-6 group"
            >
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                    Pros
                  </div>
                  {index === 0 && items.length > 1 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-zinc-700 rounded-lg transition-all"
                      aria-label="Remove pros and cons"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-zinc-700 rounded-lg transition-all"
                      aria-label="Remove pros and cons"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.pro}
                  onChange={(e) => updatePro(item.id, e.target.value)}
                  placeholder="Pros"
                  className="w-full h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                  Cons
                </div>
                <input
                  type="text"
                  value={item.con}
                  onChange={(e) => updateCon(item.id, e.target.value)}
                  placeholder="Cons"
                  className="w-full h-12 px-6 py-3 bg-zinc-800 rounded-xl border border-zinc-700 text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add More Button */}
        <button
          onClick={addItem}
          className="flex justify-end items-center gap-3 cursor-pointer group"
        >
          <div className="text-neutral-50 text-sm font-medium font-['Poppins'] group-hover:text-purple-400 transition-colors">
            Add More Pros & Cons
          </div>
          <div className="w-6 h-6 flex items-center justify-center group-hover:bg-zinc-700 rounded-full transition-colors">
            <Plus className="w-5 h-5 text-neutral-50" />
          </div>
        </button>
      </div>
    </div>
  );
}
