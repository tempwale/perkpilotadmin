import { useState, useCallback, type ReactElement } from "react";
import { Plus } from "lucide-react";
import ProConCard from "./ProConCard";
import type { ProsConsCardApiResponse } from "../../../types/api.types";

type Props = {
  initialProsConsCards?: ProsConsCardApiResponse[];
  onProsConsChange?: (prosConsData: ProsConsCardApiResponse[]) => void;
};

export default function ProConGrid({ initialProsConsCards, onProsConsChange }: Props): ReactElement{
  // Initialize cards from initialProsConsCards if provided
  const getInitialCards = (): number[] => {
    if (initialProsConsCards && initialProsConsCards.length > 0) {
      return initialProsConsCards.map((_, idx) => idx + 1);
    }
    return [1];
  };

  const [cards, setCards] = useState<number[]>(getInitialCards());
  const [allCardsData, setAllCardsData] = useState<ProsConsCardApiResponse[]>(initialProsConsCards || []);

  const addCard = (): void => {
    if (cards.length < 3) {
      setCards([...cards, cards.length + 1]);
    }
  };

  const removeCard = (index: number): void => {
    const newCards = cards.filter((_, i): boolean => i !== index);
    setCards(newCards);
    // Also remove the data for that card
    const newData = allCardsData.filter((_, i): boolean => i !== index);
    setAllCardsData(newData);
    onProsConsChange?.(newData);
  };

  // Memoize handleCardChange to prevent unnecessary re-renders
  // Use functional update to avoid dependency on allCardsData
  const handleCardChange = useCallback((index: number, data: ProsConsCardApiResponse): void => {
    // Use functional update to avoid stale closure issues
    setAllCardsData((prevData) => {
      const newData = [...prevData];
    newData[index] = data;
      const filteredData = newData.filter((card): card is ProsConsCardApiResponse => Boolean(card));
      onProsConsChange?.(filteredData);
      return newData;
    });
  }, [onProsConsChange]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Title - Outside border */}


      {/* Cards Container */}
      <div className="w-full flex flex-col gap-4 rounded-3xl bg-zinc-800 border border-zinc-700 p-6">
        {cards.map((cardId, index) => (
          <div key={cardId} className="flex flex-col gap-4">
            {/* Card Header with Number - Outside card border */}
            <div className="flex justify-between items-center">
              <h3 className="text-neutral-50 text-xl font-medium font-['Poppins'] leading-8">
                Pros & Cons Card {String(index + 1).padStart(2, "0")}
              </h3>
              {cards.length > 1 && (
                <button
                  type="button"
                  onClick={(): void => removeCard(index)}
                  className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-zinc-800"
                  title="Remove card"
                >
                  <span className="text-lg">✕</span>
                </button>
              )}
            </div>

            {/* Card Content - Inside border */}
            <div className="bg-zinc-800 rounded-3xl border border-zinc-700 py-6">
              <ProConCard
                cardNumber={index + 1}
                initialData={initialProsConsCards?.[index]}
                onProsConsChange={(data: ProsConsCardApiResponse) => {
                  handleCardChange(index, data);
                }}
              />
            </div>
          </div>
        ))}

        {cards.length < 3 && (
          <button
            type="button"
            onClick={addCard}
            className="self-stretch h-14 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-700 hover:border-[#501bd6] transition-all inline-flex justify-center items-center gap-3"
          >
            <Plus size={20} className="text-neutral-50" />
            <span className="text-neutral-50 text-sm font-medium font-['Poppins']">
              Add Pros & Cons Card ({cards.length}/3)
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
