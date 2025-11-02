import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  onCardsChange?: (cards: any[]) => void;
};

export default function ToolBlogCard({ onCardsChange }: Props) {
  const [cards, setCards] = useState([
    { id: 1, title: "", body: "", note: "" },
  ]);

  useEffect(() => {
    onCardsChange?.(cards);
  }, [cards, onCardsChange]);

  const handleAddCard = () => {
    const newCard = { id: Date.now(), title: "", body: "", note: "" };
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleChange = (id: number, field: string, value: string) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header */}
      <div className="Frame2147205999 self-stretch inline-flex justify-between items-center">
        <div className="ToolBlogCards flex-1 justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8">
          Tool Blog Cards
        </div>

        <div
          className="Frame2147205993 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleAddCard}
        >
          <div className="AddMoreToolBlogCard justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
            Add More Tool Blog Card
          </div>
          <div className="IcRoundPlus w-6 h-6 relative overflow-hidden">
            <Plus className="text-zinc-400 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      {cards.map((card) => (
        <div
          key={card.id}
          className="Frame2147205990 self-stretch bg-zinc-800 rounded-3xl   inline-flex flex-col justify-start items-start gap-6"
        >
          {/* Top Row */}
          <div className="Row self-stretch p-4 bg-zinc-800 rounded-tl-xl rounded-tr-xl outline-1 outline-zinc-700 inline-flex justify-between items-center overflow-hidden">
            <div className="Frame2147206052 self-stretch flex justify-start items-center gap-6">
              <div className="Column self-stretch py-3 rounded-xl inline-flex flex-col justify-center items-start gap-3">
                <div className="Frame2147205991 inline-flex justify-start items-center">
                  {/* Dots (for visual only) */}
                  <div className="CharmMenuKebab w-6 h-6 relative overflow-hidden">
                    <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[2.62px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-50" />
                    <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[10.88px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-50" />
                    <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[19.12px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-50" />
                  </div>
                </div>
              </div>
              <div className="BlogSectionOne justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8">
                Blog Section
              </div>
            </div>

            <div className="Frame2147206053 self-stretch flex justify-start items-center gap-6">
              <div
                className="FluentDelete16Regular w-6 h-6 relative overflow-hidden cursor-pointer"
                onClick={() => handleDeleteCard(card.id)}
                title="Delete card"
              >
                <X className="text-zinc-400 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="Frame2147206054 self-stretch px-4 pb-4 flex flex-col justify-start items-start gap-6">
            {/* Blog Title */}
            <div className="Frame214720559 self-stretch flex flex-col justify-center items-start gap-3">
              <div className="BlogTitle text-neutral-50 text-sm font-medium font-['Poppins']">
                Blog Title
              </div>
              <input
                type="text"
                placeholder="Blog Heading"
                value={card.title}
                onChange={(e) => handleChange(card.id, "title", e.target.value)}
                className="self-stretch h-14 px-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-zinc-700 text-zinc-200 font-normal font-['Poppins'] text-base"
              />
            </div>

            {/* Blog Body */}
            <div className="Frame2147205563 self-stretch flex flex-col justify-center items-start gap-3">
              <div className="BlogBodyTextEditor text-neutral-50 text-sm font-medium font-['Poppins']">
                Blog Body Text Editor
              </div>
              <textarea
                placeholder="Blog Body Message"
                value={card.body}
                onChange={(e) => handleChange(card.id, "body", e.target.value)}
                className="self-stretch px-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-zinc-700 text-zinc-200 font-normal font-['Poppins'] text-base"
              />
            </div>

            {/* Additional Note */}
            <div className="Frame2147205564 self-stretch flex flex-col justify-center items-start gap-3">
              <div className="AdditionalNote text-neutral-50 text-sm font-medium font-['Poppins']">
                Additional Note
              </div>
              <input
                type="text"
                placeholder="Text here"
                value={card.note}
                onChange={(e) => handleChange(card.id, "note", e.target.value)}
                className="self-stretch h-14 px-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-zinc-700 text-zinc-200 font-normal font-['Poppins'] text-base"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
