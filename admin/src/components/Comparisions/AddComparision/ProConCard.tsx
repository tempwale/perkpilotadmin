import { useState, useEffect, useRef, useCallback, type ReactElement } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ProConItem {
  id: number;
  pro: string;
  con: string;
}

import type { ProsConsCardApiResponse } from "../../../types/api.types";

type Props = {
  cardNumber?: number;
  initialData?: ProsConsCardApiResponse;
  onProsConsChange?: (prosConsData: ProsConsCardApiResponse) => void;
};

export default function ProConCard({
  cardNumber = 1,
  initialData,
  onProsConsChange,
}: Props): ReactElement {
  const getInitialItems = (): ProConItem[] => {
    if (initialData?.prosConsPairs && initialData.prosConsPairs.length > 0) {
      return initialData.prosConsPairs.map((pair, idx) => ({
        id: idx + 1,
        pro: pair.pro || "",
        con: pair.con || "",
      }));
    }
    return [{ id: 1, pro: "", con: "" }];
  };

  const [titlePros, setTitlePros] = useState<string>(initialData?.titlePros || "");
  const [titleCons, setTitleCons] = useState<string>(initialData?.titleCons || "");
  const [items, setItems] = useState<ProConItem[]>(getInitialItems());

  const onProsConsChangeRef = useRef(onProsConsChange);
  useEffect(() => {
    onProsConsChangeRef.current = onProsConsChange;
  }, [onProsConsChange]);

  const debounceTimerRef = useRef<number | null>(null);

  const debouncedCallback = useCallback((data: ProsConsCardApiResponse): void => {
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      console.log(`ProConCard ${cardNumber} sending data:`, data);
      onProsConsChangeRef.current?.(data);
      debounceTimerRef.current = null;
    }, 500);
  }, [cardNumber]);

  useEffect((): void => {
    const prosConsPairs = items.map(({ pro, con }) => ({ pro, con }));

    const data: ProsConsCardApiResponse = {
      cardNumber,
      titlePros,
      titleCons,
      prosConsPairs,
    };

    debouncedCallback(data);
  }, [titlePros, titleCons, items, cardNumber, debouncedCallback]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
      setItems(items.filter((item): boolean => item.id !== id));
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
      {/* Main Card Container with border and rounded corners */}
      <div className="flex flex-col justify-center items-start px-6 gap-4 rounded-3xl">
        {/* Inner Content Container */}
        <div className="w-full flex flex-col gap-4">
          {/* Title Row */}
          <div className="flex items-start gap-6">
            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="text-neutral-50 text-sm font-medium font-['Poppins'] leading-[21px]">
                Title Pros
              </div>
              <input
                type="text"
                value={titlePros}
                onChange={(e) => setTitlePros(e.target.value)}
                placeholder="Pros"
                className="w-full h-12 px-6 py-3 bg-[#27272A] rounded-xl border border-[#3F3F46] text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="text-neutral-50 text-sm font-medium font-['Poppins'] leading-[21px]">
                Title Cons
              </div>
              <input
                type="text"
                value={titleCons}
                onChange={(e) => setTitleCons(e.target.value)}
                placeholder="Cons"
                className="w-full h-12 px-6 py-3 bg-[#27272A] rounded-xl border border-[#3F3F46] text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Items List */}
          {items.map((item): ReactElement => (
            <div
              key={item.id}
              className="flex items-start gap-6 group"
            >
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-neutral-50 text-sm font-medium font-['Poppins'] leading-[21px]">
                    Pros
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={(): void => removeItem(item.id)}
                      className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-zinc-700 rounded-lg transition-all"
                      aria-label="Remove this pros and cons pair"
                      title="Remove"
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
                  className="w-full h-12 px-6 py-3 bg-[#27272A] rounded-xl border border-[#3F3F46] text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="text-neutral-50 text-sm font-medium font-['Poppins'] leading-[21px]">
                  Cons
                </div>
                <input
                  type="text"
                  value={item.con}
                  onChange={(e) => updateCon(item.id, e.target.value)}
                  placeholder="Cons"
                  className="w-full h-12 px-6 py-3 bg-[#27272A] rounded-xl border border-[#3F3F46] text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder-zinc-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add More Button - Outside the card border */}
      <button
        type="button"
        onClick={addItem}
        className="w-full flex justify-end items-center gap-3 cursor-pointer group"
        title="Add another pros and cons pair"
      >
        <div className="text-neutral-50 text-sm font-medium font-['Poppins'] leading-[21px] group-hover:text-purple-400 transition-colors">
          Add More Pros & Cons
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <Plus className="w-6 h-6 text-neutral-50 group-hover:text-purple-400 transition-colors" />
        </div>
      </button>
    </div>
  );
}
