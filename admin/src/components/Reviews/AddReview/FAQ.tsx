"use client";

import { useState } from "react";
import { GripVertical, Trash2, Plus } from "lucide-react";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

type Props = {
  initialFaqs?: Array<{ question: string; answer: string }>;
  onFaqsChange?: (faqs: Array<{ question: string; answer: string }>) => void;
};

export default function FAQ({ initialFaqs, onFaqsChange }: Props = {}) {
  const [faqs, setFaqs] = useState<FaqItem[]>(
    initialFaqs?.map((faq, idx) => ({
      id: idx + 1,
      question: faq.question,
      answer: faq.answer
    })) || [
      { id: 1, question: "", answer: "" },
      { id: 2, question: "", answer: "" },
      { id: 3, question: "", answer: "" },
    ]
  );

  const updateFaqs = (newFaqs: FaqItem[]) => {
    setFaqs(newFaqs);
    onFaqsChange?.(newFaqs.map(f => ({
      question: f.question,
      answer: f.answer
    })));
  };

  const handleQuestionChange = (id: number, value: string) => {
    updateFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, question: value } : faq))
    );
  };

  const handleAnswerChange = (id: number, value: string) => {
    updateFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, answer: value } : faq))
    );
  };

  const deleteFaq = (id: number) => {
    updateFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const addFaq = () => {
    const newId = Math.max(...faqs.map((f) => f.id), 0) + 1;
    updateFaqs([...faqs, { id: newId, question: "", answer: "" }]);
  };

  return (
    <div
      data-layer="Frame 2147206003"
      className="Frame2147206003 self-stretch inline-flex flex-col justify-start items-start gap-2"
    >
      <div
        data-layer="FAQs Update"
        className="FaqsUpdate self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
      >
        FAQs Update
      </div>

      {faqs.map((faq) => (
        <div
          key={faq.id}
          data-layer="Row"
          className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-700 inline-flex justify-start items-center overflow-hidden"
        >
          <div
            data-layer="Column"
            className="Column self-stretch px-6 py-3 rounded-xl inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Frame 2147205991"
              className="Frame2147205991 inline-flex justify-start items-center"
            >
              <GripVertical className="w-6 h-6 text-neutral-50" />
              <GripVertical className="w-6 h-6 text-neutral-50" />
            </div>
            <div
              data-layer="Text"
              className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              FAQ One
            </div>
          </div>

          <div
            data-layer="Frame 2147205992"
            className="Frame2147205992 flex-1 inline-flex flex-col justify-center items-start gap-2"
          >
            <div
              data-layer="Frame 2147205559"
              className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
            >
              <div
                data-layer="FAQ Question One"
                className="FaqQuestionOne justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                FAQ Question One
              </div>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleQuestionChange(faq.id, e.target.value)}
                placeholder="Question here..."
                className="self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-400 text-base font-normal font-['Poppins'] leading-6 focus:outline-zinc-500"
              />
            </div>

            <div
              data-layer="Frame 2147205560"
              className="Frame2147205560 self-stretch flex flex-col justify-center items-start gap-2"
            >
              <div
                data-layer="Description"
                className="Description justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Description
              </div>
              <input
                type="text"
                value={faq.answer}
                onChange={(e) => handleAnswerChange(faq.id, e.target.value)}
                placeholder="Answer here..."
                className="self-stretch h-12 pl-6 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-400 text-base font-normal font-['Poppins'] leading-6 focus:outline-zinc-500"
              />
            </div>
          </div>

          <div
            data-layer="Column"
            className="Column self-stretch px-6 py-3 flex justify-start items-center gap-4"
          >
            <button
              onClick={() => deleteFaq(faq.id)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Delete FAQ"
            >
              <Trash2 className="w-6 h-6 text-neutral-50" />
            </button>
          </div>
        </div>
      ))}

      <div
        data-layer="Frame 2147205993"
        className="Frame2147205993 self-stretch inline-flex justify-end items-center gap-3"
      >
        <button
          onClick={addFaq}
          className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <div
            data-layer="Add More FAQs"
            className="AddMoreFaqs justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Add More FAQs
          </div>
          <Plus className="w-6 h-6 text-neutral-50" />
        </button>
      </div>
    </div>
  );
}
