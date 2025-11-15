import { useState , type ReactElement} from "react";
import { Plus } from "lucide-react";
import ProConCard from "./ProConCard";
import type { ProsConsCardApiResponse } from "../../../types/api.types";

type Props = {
  onProsConsChange?: (prosConsData: ProsConsCardApiResponse[]) => void;
};

export default function ProConGrid({ onProsConsChange }: Props): ReactElement{
  const [cards, setCards] = useState<number[]>([1]); // Start with 1 card
  const [allCardsData, setAllCardsData] = useState<ProsConsCardApiResponse[]>([]);

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

  const handleCardChange = (index: number, data: ProsConsCardApiResponse): void => {
    // Update the specific card's data
    const newData = [...allCardsData];
    newData[index] = data;
    setAllCardsData(newData);
    onProsConsChange?.(newData.filter((card): card is ProsConsCardApiResponse => Boolean(card)));
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
                onClick={(): void => removeCard(index)}
                className="text-red-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-zinc-800"
                title="Remove card"
              >
                <span className="text-lg">✕</span>
              </button>
            )}
          </div>

          <ProConCard
            cardNumber={index + 1}
            onProsConsChange={(data: ProsConsCardApiResponse) => {
              handleCardChange(index, data);
            }}
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
