import React from "react";
import { Link } from "react-router-dom";
import CardPopup from "./CardPopup";
import { useState } from "react";
interface ComparisionsCardProps {
  id?: string | number;
  app1Logo?: React.ReactNode;
  app2Logo?: React.ReactNode;
  title?: string;
  description?: string;
  tags?: string[];
  onReadComparison?: () => void;
  onDelete?: () => void;
}

// Example Slack and Google Meet SVGs (replace with your own as needed)
const SlackLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="7" fill="#4A154B" />
    <path
      d="M8.5 16C8.5 14.6193 9.61929 13.5 11 13.5C12.3807 13.5 13.5 14.6193 13.5 16V19C13.5 20.3807 12.3807 21.5 11 21.5C9.61929 21.5 8.5 20.3807 8.5 19V16Z"
      fill="#E01E5A"
    />
    <path
      d="M16 8.5C17.3807 8.5 18.5 9.61929 18.5 11C18.5 12.3807 17.3807 13.5 16 13.5H13C11.6193 13.5 10.5 12.3807 10.5 11C10.5 9.61929 11.6193 8.5 13 8.5H16Z"
      fill="#36C5F0"
    />
    <path
      d="M23.5 16C23.5 17.3807 22.3807 18.5 21 18.5C19.6193 18.5 18.5 17.3807 18.5 16V13C18.5 11.6193 19.6193 10.5 21 10.5C22.3807 10.5 23.5 11.6193 23.5 13V16Z"
      fill="#2EB67D"
    />
    <path
      d="M16 23.5C14.6193 23.5 13.5 22.3807 13.5 21C13.5 19.6193 14.6193 18.5 16 18.5H19C20.3807 18.5 21.5 19.6193 21.5 21C21.5 22.3807 20.3807 23.5 19 23.5H16Z"
      fill="#ECB22E"
    />
  </svg>
);
function FramerLogo() {
  return (
    <svg
      width="21"
      height="32"
      viewBox="0 0 21 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_1900)">
        <path
          d="M0 0H21V10.6667H10.5L0 0ZM0 10.6667H10.5L21 21.3333H10.5V32L0 21.3333V10.6667Z"
          fill="#0D0D11"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_1900">
          <rect width="21" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const LineIcon = () => (
  <div className="h-0 w-4 relative">
    <div className="absolute inset-0 border-t border-zinc-400"></div>
  </div>
);

const ComparisionsCard: React.FC<ComparisionsCardProps> = ({
  id = "1",
  app1Logo = <SlackLogo />, // Replace with your own
  app2Logo = <FramerLogo />, // Replace with your own
  title = "Notion vs Obsidian",
  description = "Deep dive into two of the most popular note-taking apps, comparing features, pricing, and use cases.",
  tags = ["Productivity", "NotesTaking", "Work"],
  onReadComparison,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        data-layer="Frame 2147223651"
        className="Frame2147223651 w-[250px] p-2.5 bg-[#2f2f32] rounded-tl-lg rounded-tr-lg inline-flex justify-center items-center gap-2.5"
      >
        <div
          data-layer="Customize Deal Card?"
          className="CustomizeDealCard justify-start text-neutral-50 text-sm font-medium font-['Plus_Jakarta_Sans'] underline leading-[21px]"
          onClick={openModal}
        >
          Customize Comparision Card?
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942"
            stroke="#FAFAFA"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="w-full lg:w-[350px] h-[480px] p-4 sm:p-6 bg-white/5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex flex-col justify-start items-start gap-6">
        {/* Top Section: Logos and VS */}
        <div className="self-stretch flex flex-col justify-start items-center gap-4">
          <div className="w-full max-w-[28rem] inline-flex justify-center items-center mx-auto px-2">
            {/* App 1 Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 p-1.5 sm:p-2.5 bg-neutral-50 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-neutral-50 flex justify-center items-center gap-2.5">
              <div className="w-8 h-8 sm:w-8 sm:h-8 relative flex items-center justify-center">
                {app1Logo}
              </div>
            </div>
            {/* Line */}
            <LineIcon /> {/* VS Badge */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 p-1.5 bg-neutral-50 rounded-[100px] inline-flex flex-col justify-center items-center gap-2.5">
              <div className="text-center text-zinc-950 text-xs sm:text-sm font-medium font-['Poppins']">
                vs
              </div>
            </div>
            {/* Line */}
            <LineIcon /> {/* App 2 Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 p-1.5 sm:p-2.5 bg-neutral-50 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-neutral-50 flex justify-center items-center gap-2.5">
              <div className="w-8 h-8 sm:w-8 sm:h-8 relative flex items-center justify-center">
                {app2Logo}
              </div>
            </div>
          </div>
          {/* Title, Description, Tags */}
          <div className="self-stretch flex flex-col justify-start items-center gap-3 px-2">
            <div className="self-stretch text-center text-neutral-50 text-lg sm:text-xl font-medium font-['Plus_Jakarta_Sans'] leading-loose">
              {title}
            </div>
            <div className="self-stretch text-center text-zinc-300 text-sm sm:text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">
              {description}
            </div>
            <div className="inline-flex justify-center items-center gap-3 flex-wrap">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-white/10 rounded-[100px] flex justify-center items-center gap-2.5"
                >
                  <div className="text-zinc-200 text-xs font-medium font-['Poppins']">
                    {tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <Link
          to={`/comparison/${id}`}
          onClick={() => onReadComparison && onReadComparison()}
          className="self-stretch h-10 sm:h-12 px-3 py-2 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] inline-flex justify-center items-center cursor-pointer"
        >
          <div className="text-neutral-50 text-sm sm:text-base font-normal font-['Poppins'] leading-normal">
            Read Full Comparison
          </div>
        </Link>
      </div>
      {/* Modal: basic details popup */}
      {showModal && (
        <CardPopup
          onClose={closeModal}
          onDelete={onDelete}
          Comparision={{
            id,
            title,
            description,
            app1Logo,
            app2Logo,
            tags,
          }}
        />
      )}
    </div>
  );
};

export default ComparisionsCard;
