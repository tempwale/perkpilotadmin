import { useState, type ReactElement } from "react";
import { Star, Pencil } from "lucide-react";
import CardPopup from "./CardPopup";
import type { ReviewApiResponse } from "../../../types/api.types";

interface ReviewsCardProps {
  id: string;
  review?: ReviewApiResponse;
  onViewDetails?: () => void;
  onDelete?: () => void;
  showCustomizeHeader?: boolean;
  onCustomize?: () => void;
}

const DEMO_DATA: ReviewApiResponse = {
  productName: "Framer",
  productType: "No-Code Tool",
  description: "Every communications experience, Integrated contact center, voice, video, chat, and APIs.",
  pros: [
    "Real-time collaboration",
    "Browser-based",
    "Excellent prototyping",
    "Power design tool",
  ],
  cons: [
    "Limited offline access",
    "Pages limitations",
    "Not ideal for e-com",
    "Heavy websites lag",
  ],
  pricing: [
    {
      plan: "Starter",
      amount: "$14/Monthly",
    },
  ],
  aggregateRating: 4.8,
  ratingCount: 887,
};

function DemoLogo(): ReactElement {
  return (
    <svg
      width="21"
      height="32"
      viewBox="0 0 21 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2.5" y="2" width="16" height="28" rx="14" fill="#0D0D11" />
      <path
        d="M5 4H16V14.6667H10.5L5 4ZM5 14.6667H10.5L16 25.3333H10.5V36L5 25.3333V14.6667Z"
        fill="white"
      />
    </svg>
  );
}


const VerifyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.418 5.73285C15.2801 5.51249 15.0769 5.34061 14.8367 5.24113C14.5965 5.14166 14.3313 5.11954 14.078 5.17785L12.28 5.59085C12.0957 5.6332 11.9043 5.6332 11.72 5.59085L9.92199 5.17785C9.66866 5.11954 9.40344 5.14166 9.16327 5.24113C8.92309 5.34061 8.7199 5.51249 8.58199 5.73285L7.60199 7.29685C7.50199 7.45685 7.36699 7.59185 7.20699 7.69285L5.64299 8.67285C5.42301 8.81064 5.25138 9.0135 5.15193 9.25327C5.05247 9.49303 5.03013 9.75781 5.08799 10.0109L5.50099 11.8109C5.54319 11.9948 5.54319 12.1859 5.50099 12.3699L5.08799 14.1689C5.0299 14.422 5.05213 14.687 5.1516 14.927C5.25106 15.167 5.42282 15.37 5.64299 15.5079L7.20699 16.4879C7.36699 16.5879 7.50199 16.7229 7.60299 16.8829L8.58299 18.4469C8.86499 18.8979 9.40299 19.1209 9.92199 19.0019L11.72 18.5889C11.9043 18.5465 12.0957 18.5465 12.28 18.5889L14.079 19.0019C14.3322 19.0599 14.5972 19.0377 14.8371 18.9382C15.0771 18.8388 15.2801 18.667 15.418 18.4469L16.398 16.8829C16.498 16.7229 16.633 16.5879 16.793 16.4879L18.358 15.5079C18.5782 15.3698 18.7499 15.1666 18.8491 14.9264C18.9484 14.6862 18.9704 14.4211 18.912 14.1679L18.5 12.3699C18.4576 12.1856 18.4576 11.9941 18.5 11.8099L18.913 10.0109C18.9712 9.75777 18.9491 9.49285 18.8498 9.25289C18.7505 9.01293 18.579 8.80984 18.359 8.67185L16.794 7.69185C16.6342 7.59167 16.4992 7.45663 16.399 7.29685L15.418 5.73285ZM14.915 9.85985C14.9768 9.74612 14.9922 9.61283 14.9577 9.48803C14.9233 9.36322 14.8418 9.25664 14.7304 9.1907C14.619 9.12476 14.4864 9.1046 14.3604 9.13447C14.2344 9.16434 14.1249 9.24191 14.055 9.35085L11.44 13.7769L9.86099 12.2649C9.81415 12.2168 9.7581 12.1786 9.69618 12.1526C9.63427 12.1266 9.56776 12.1134 9.50062 12.1137C9.43348 12.114 9.36708 12.1278 9.3054 12.1543C9.24371 12.1808 9.188 12.2195 9.14157 12.268C9.09515 12.3165 9.05897 12.3739 9.0352 12.4366C9.01142 12.4994 9.00054 12.5664 9.00319 12.6335C9.00584 12.7005 9.02198 12.7664 9.05063 12.8271C9.07929 12.8878 9.11989 12.9422 9.16999 12.9869L11.204 14.9359C11.2584 14.9879 11.3239 15.027 11.3956 15.0502C11.4672 15.0734 11.5432 15.0801 11.6178 15.0698C11.6925 15.0595 11.7638 15.0325 11.8265 14.9908C11.8892 14.949 11.9417 14.8937 11.98 14.8289L14.915 9.85985Z"
      fill="#FAFAFA"
    />
  </svg>
);


export default function ReviewsCard({
  id,
  review,
  onViewDetails,
  onDelete,
  showCustomizeHeader = true,
  onCustomize,
}: ReviewsCardProps): ReactElement {
  const [showModal, setShowModal] = useState(false);

  const openModal = (): void => {
    setShowModal(true);
  };
  const closeModal = (): void => {
    setShowModal(false);
  };

  const data = review || DEMO_DATA;
  const pros = data.pros || DEMO_DATA.pros || [];
  const cons = data.cons || DEMO_DATA.cons || [];
  const pricing = data.pricing?.[0] || DEMO_DATA.pricing?.[0];
  const rating = data.aggregateRating || data.rating || DEMO_DATA.aggregateRating || 0;
  const ratingCount = data.ratingCount || DEMO_DATA.ratingCount || 0;
  const productName = data.productName || DEMO_DATA.productName || "Product";
  const productType = data.productType || DEMO_DATA.productType || "No-Code Tool";
  const description = data.description || data.overview || DEMO_DATA.description || "";
  const avatarUrl = data.avatarUrl;

  const handleCustomize = (): void => {
    if (onCustomize) {
      onCustomize();
    } else {
      openModal();
    }
  };

  const handleReadFullReview = (): void => {
    if (onViewDetails) {
      onViewDetails();
    }
    openModal();
  };

  return (
    <div>
      <div className="flex flex-col items-center p-0 w-[340px] h-[480px] flex-none grow">
        {showCustomizeHeader && (
          <div className="flex flex-row justify-center items-center p-2.5 gap-2.5 w-[220px] h-11 bg-[#2F2F32] rounded-t-lg flex-none grow-0">
            <button
              type="button"
              onClick={handleCustomize}
              className="flex flex-row items-center gap-2.5 text-[#FAFAFA] underline font-['Plus_Jakarta_Sans'] font-medium text-sm leading-[21px] hover:no-underline"
            >
              <span>Customize Review Card?</span>
              <Pencil className="w-6 h-5" />
            </button>
          </div>
        )}
    
        <div className="box-border flex flex-col items-center px-4 pb-4 gap-4 w-[340px] h-[436px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md rounded-[24px] flex-none grow-0">
          <div className="box-border flex flex-col items-start py-4 gap-4 w-[308px] h-[356px] border-b border-[rgba(235,239,245,0.12)] flex-none self-stretch grow-0">
            <div className="flex flex-row justify-between items-center p-0 w-[308px] h-14 flex-none self-stretch grow-0">
              <div className="m-auto flex flex-row items-center p-0 gap-3 w-[174px] h-14 flex-none grow">
                <div className="flex flex-row justify-center items-center p-[10px] gap-[10px] w-14 h-14 bg-[#F9FAFB] border-2 border-[rgba(255,255,255,0.08)] rounded-[100px] flex-none grow-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={productName}
                      className="w-[21px] h-8 object-contain"
                    />
                  ) : (
                    <DemoLogo />
                  )}
                </div>
                <div className="flex flex-col items-start p-0 gap-1 flex-1 min-w-0">
                  <div className="flex flex-row items-center p-0 gap-1 h-6 flex-none grow-0">
                    <div className="flex-1 min-w-0 font-['Urbanist'] font-medium text-xl leading-6 text-white">
                      {productName}
                    </div>
                    <VerifyIcon />
                  </div>
                  <div className="w-full font-['Poppins'] font-medium text-xs leading-[18px] text-[#CBD2DA] flex-none grow-0 truncate">
                    {productType}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center px-2 py-0.5 gap-1.5 w-[120px] h-6 bg-[rgba(255,255,255,0.08)] rounded-[100px] flex-none grow-0 ml-auto mr-2">
                <div className="flex flex-row items-center p-0 gap-1.5 flex-none grow-0">
                  <div className="relative w-4 h-4 flex-none grow-0">
                    <Star className="w-4 h-4 fill-[#FFBA1F] text-[#FFBA1F]" />
                  </div>
                  <div className="font-['Plus_Jakarta_Sans'] font-medium text-[11px] leading-4 text-[#F4F4F5] flex-none grow-0 whitespace-nowrap">
                    {rating.toFixed(1)}/5.0 Ratings
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start p-0 gap-4 w-[308px] h-[199px] flex-none self-stretch grow-0">   
              <div className="w-[308px] h-9 font-['Poppins'] font-normal text-xs leading-[18px] text-[#CBD2DA] flex-none self-stretch grow-0 line-clamp-2 overflow-hidden">
                {description}
              </div>
              {/* Pros and Cons */}
              <div className="flex flex-row items-start p-0 gap-4 w-[308px] h-[147px] flex-none self-stretch grow-0">
                <div className="flex flex-col items-start p-0 gap-3 w-[146px] h-[147px] flex-none grow">
                  <div className="w-[31px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#EBEFF5] flex-none grow-0">
                    Pros
                  </div>
                  <div className="flex flex-col items-start p-0 gap-2 w-[146px] h-[114px] flex-none self-stretch grow-0">
                    {pros.slice(0, 4).map((pro, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-row items-start p-0 gap-2 w-[146px] flex-none self-stretch grow-0 ${
                          idx === 0 ? "h-9" : "h-[18px]"
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                        <div className={`flex-1 font-['Plus_Jakarta_Sans'] font-medium text-xs leading-[18px] text-white overflow-hidden ${
                          idx === 0 ? "h-9 line-clamp-2" : "h-[18px] line-clamp-1"
                        }`}>
                          {pro}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start p-0 gap-3 w-[146px] h-[129px] flex-none grow">
                  <div className="w-[31px] h-[21px] font-['Poppins'] font-medium text-sm leading-[21px] text-[#EBEFF5] flex-none grow-0">
                    Cons
                  </div>
                  <div className="flex flex-col items-start p-0 gap-2 w-[146px] h-[96px] flex-none self-stretch grow-0">
                    {cons.slice(0, 4).map((con, idx) => (
                      <div
                        key={idx}
                        className="flex flex-row items-start p-0 gap-2 w-[146px] h-[18px] flex-none self-stretch grow-0"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0"></div>
                        <div className="flex-1 h-[18px] font-['Plus_Jakarta_Sans'] font-medium text-xs leading-[18px] text-white overflow-hidden line-clamp-1">
                          {con}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center px-4 py-2 gap-4 w-[308px] h-[37px] bg-[rgba(255,255,255,0.08)] rounded-[100px] flex-none self-stretch grow-0">
              <div className="font-['Plus_Jakarta_Sans'] font-medium text-sm leading-[21px] text-[#FAFAFA] flex-none whitespace-nowrap">
                Plan Starting:
              </div>
              <div className="font-['Plus_Jakarta_Sans'] font-medium text-sm leading-[21px] text-[#E4E4E7] flex-none truncate">
                {(() => {
                  const amount = pricing?.amount || "$14/Monthly";
                  const amountPart = amount.split("/")[0]?.trim() || "$14";
                  const cleanAmountPart = amountPart.replace(/\$/g, "");
                  const cleanAmount = cleanAmountPart ? `$${cleanAmountPart}` : "$14";
                  return `${cleanAmount}/Month`;
                })()}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center p-0 gap-6 w-[308px] h-12 flex-none self-stretch grow-0">
            <div className="relative flex flex-row items-center p-0 flex-none grow-0">
              <div className="flex items-center">
                {[
                  { name: "image.png", path: "/reviewicons/image.png" },
                  { name: "image copy.png", path: "/reviewicons/image copy.png" },
                  { name: "image copy 2.png", path: "/reviewicons/image copy 2.png" },
                ].map((avatar, idx) => {
                  // Properly encode the path
                  const encodedPath = `/reviewicons/${encodeURIComponent(avatar.name)}`;
                  return (
                    <img
                      key={idx}
                      src={encodedPath}
                      alt={`User ${idx + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-white -ml-6 first:ml-0 object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image: ${encodedPath}`, e);
                        // Fallback to original path if encoded fails
                        const target = e.target as HTMLImageElement;
                        if (target.src !== avatar.path) {
                          target.src = avatar.path;
                        }
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-white -ml-6 flex-none grow-0">
                <span className="font-['Poppins'] font-medium text-xs leading-[18px] text-center text-[#09090B]">
                  {ratingCount}+
                </span>
              </div>
            </div>
            <button
              onClick={handleReadFullReview}
              className="flex flex-row justify-center items-center px-3 py-2 gap-0 w-[164px] h-10 bg-white rounded-[100px] grow hover:bg-white/90 transition-colors"
            >
              <div className="w-[132px] h-6 font-['Poppins'] font-normal text-base leading-6 text-[#09090B] flex-none grow-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                Read Full Review
              </div>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <CardPopup
          onClose={closeModal}
          onDelete={onDelete}
          deal={{
            ...data,
            id,
            editPath: `/updatereview/${id}`,
          }}
        />
      )}
    </div>
  );
}
