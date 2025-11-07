import { useState } from "react";
import { Plus } from "lucide-react";
import ProConCard from "./ProConCard";

type Props = {
  onProsConsChange?: (prosConsData: any[]) => void;
};

export default function ProConGrid({ onProsConsChange }: Props) {
  const [cards, setCards] = useState<number[]>([1]); // Start with 1 card
  const [allCardsData, setAllCardsData] = useState<any[]>([]);

  const addCard = () => {
    if (cards.length < 3) {
      setCards([...cards, cards.length + 1]);
    }
  };

  const removeCard = (index: number) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
    // Also remove the data for that card
    const newData = allCardsData.filter((_, i) => i !== index);
    setAllCardsData(newData);
    onProsConsChange?.(newData);
  };

  const handleCardChange = (index: number, data: any) => {
    // Update the specific card's data
    const newData = [...allCardsData];
    newData[index] = data[0]; // ProConCard returns array with single item
    setAllCardsData(newData);
    onProsConsChange?.(newData.filter(Boolean));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {cards.map((cardId, index) => (
        <div key={cardId} className="relative">
          {/* Card Header with Number */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-[#501bd6] rounded-lg">
                <span className="text-neutral-50 text-sm font-semibold font-['Poppins']">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <span className="text-neutral-50 text-base font-medium font-['Poppins']">
                Pros & Cons Card
              </span>
            </div>
            {cards.length > 1 && (
              <button
                type="button"
                onClick={() => removeCard(index)}
                className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-zinc-800"
                title="Remove card"
              >
                <span className="text-lg">✕</span>
              </button>
            )}
          </div>

          <ProConCard
            cardNumber={index + 1}
            onProsConsChange={(data) => handleCardChange(index, data)}
          />
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
  );
}
