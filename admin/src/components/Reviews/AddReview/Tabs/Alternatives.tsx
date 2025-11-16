"use client";

import {useState, type ReactElement} from "react";
import { GripVertical, Trash2, Search, Star } from "lucide-react";

interface Alternative {
  id: number;
  logo: string | null;
  name: string;
  isVerified: boolean;
  category: string;
  rating: number;
  reviewCount: number;
  pricing: string;
  compareLink: string;
}

interface AlternativesProps {
  initialAlternatives?: Alternative[];
  onAlternativesChange?: (alternatives: Alternative[]) => void;
}

export default function Alternatives({
  initialAlternatives,
}: AlternativesProps): ReactElement{
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [sectionTitle, setSectionTitle] = useState<string>(
    "Product Alternatives Section"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [alternatives] = useState<Alternative[]>(
    initialAlternatives || [
      {
        id: 1,
        logo: null,
        name: "Sketch",
        isVerified: true,
        category: "Design Tool",
        rating: 5,
        reviewCount: 200,
        pricing: "Free - $20/Month",
        compareLink: "Compare With Figma",
      },
      {
        id: 2,
        logo: null,
        name: "Sketch",
        isVerified: true,
        category: "Design Tool",
        rating: 5,
        reviewCount: 200,
        pricing: "Free - $20/Month",
        compareLink: "Compare With Figma",
      },
      {
        id: 3,
        logo: null,
        name: "Sketch",
        isVerified: true,
        category: "Design Tool",
        rating: 5,
        reviewCount: 200,
        pricing: "Free - $20/Month",
        compareLink: "Compare With Figma",
      },
      {
        id: 4,
        logo: null,
        name: "Sketch",
        isVerified: true,
        category: "Design Tool",
        rating: 5,
        reviewCount: 200,
        pricing: "Free - $20/Month",
        compareLink: "Compare With Figma",
      },
      {
        id: 5,
        logo: null,
        name: "Sketch",
        isVerified: true,
        category: "Design Tool",
        rating: 5,
        reviewCount: 200,
        pricing: "Free - $20/Month",
        compareLink: "Compare With Figma",
      },
      {
        id: 6,
        logo: null,
        name: "Sketch",
        isVerified: true,
        category: "Design Tool",
        rating: 5,
        reviewCount: 200,
        pricing: "Free - $20/Month",
        compareLink: "Compare With Figma",
      },
    ]
  );

  const handleToggle = (): void => {
    setIsEnabled(!isEnabled);
  };

  const handleSectionDelete = (): void => {
    // Logic to delete entire section
    console.log("Delete section");
  };

  const filteredAlternatives = alternatives.filter((alt): boolean =>
    alt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      data-layer="Row"
      className="Row w-[1068px] py-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 inline-flex flex-col justify-center items-start gap-4 overflow-hidden"
    >
      {/* Header */}
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
            className="Frame2147205991 flex justify-start items-center"
          >
            <GripVertical className="w-6 h-6 text-neutral-50" />
            <GripVertical className="w-6 h-6 text-neutral-50" />
          </div>
          <div
            data-layer="Text"
            className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Pricing Plan
          </div>
        </div>
        <div
          data-layer="Column"
          className="Column self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4"
        >
          <button
            onClick={handleToggle}
            className="Button w-[53.33px] h-7 relative bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline-1 -outline-offset-1 outline-[#501bd6] overflow-hidden transition-all"
            aria-label={isEnabled ? "Disable section" : "Enable section"}
          >
            <div
              className={`Button w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] top-[2.67px] transition-all ${
                isEnabled ? "left-[26.67px]" : "left-[2.67px]"
              }`}
            />
          </button>
          <button
            onClick={handleSectionDelete}
            className="hover:opacity-70 transition-opacity"
            aria-label="Delete section"
          >
            <Trash2 className="w-6 h-6 text-neutral-50" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        data-layer="Frame 2147205992"
        className="Frame2147205992 self-stretch px-4 rounded-2xl flex flex-col justify-start items-start gap-6"
      >
        {/* Section Title and Delete */}
        <div
          data-layer="Frame 2147206010"
          className="Frame2147206010 self-stretch inline-flex justify-start items-center gap-6"
        >
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 flex-1 flex justify-start items-center gap-3"
          >
            <input
              type="text"
              value={sectionTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSectionTitle(e.target.value)
              }
              className="flex-1 px-6 py-4 bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none"
            />
          </div>
          <button
            onClick={handleSectionDelete}
            className="flex items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <div className="text-[#e62f29] text-sm font-medium font-['Poppins']">
              Remove or Delete Section
            </div>
            <Trash2 className="w-6 h-6 text-[#e62f29]" />
          </button>
        </div>

        {/* Search Bar */}
        <div
          data-layer="Frame 2147205556"
          className="Frame2147205556 self-stretch inline-flex justify-start items-center gap-6"
        >
          <div className="flex-1 h-12 px-4 py-3 bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 flex justify-start items-center gap-3">
            <Search className="w-[22px] h-[22px] text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search Deals"
              className="flex-1 bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-400 outline-none"
            />
          </div>
        </div>

        {/* Alternatives Grid */}
        <div className="self-stretch flex flex-col gap-6">
          {/* Row 1 */}
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            {filteredAlternatives.slice(0, 2).map((alternative) => (
              <AlternativeCard key={alternative.id} alternative={alternative} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            {filteredAlternatives.slice(2, 4).map((alternative) => (
              <AlternativeCard key={alternative.id} alternative={alternative} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="self-stretch inline-flex justify-start items-start gap-6">
            {filteredAlternatives.slice(4, 6).map((alternative) => (
              <AlternativeCard key={alternative.id} alternative={alternative} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Alternative Card Component
interface AlternativeCardProps {
  alternative: Alternative;
}

const AlternativeCard: React.FC<AlternativeCardProps> = ({ alternative }): ReactElement=> {
  return (
    <div className="flex-1 p-6 bg-white/5 rounded-3xl outline-1 -outline-offset-1 outline-white/10 inline-flex flex-col justify-start items-start gap-[35px]">
      {/* Header */}
      <div className="self-stretch relative inline-flex justify-between items-center">
        {/* Logo and Name */}
        <div className="flex justify-start items-center gap-4">
          <div className="w-14 h-14 bg-neutral-50 rounded-full flex items-center justify-center">
            {alternative.logo ? (
              <img
                src={alternative.logo}
                alt={alternative.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-14 h-14 bg-neutral-50 rounded-full" />
            )}
          </div>
          <div className="inline-flex flex-col justify-start items-start gap-1">
            <div className="self-stretch inline-flex justify-start items-center gap-1">
              <div className="text-neutral-50 text-lg font-medium font-['Plus_Jakarta_Sans'] leading-[27px]">
                {alternative.name}
              </div>
              {alternative.isVerified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.4183 5.64301C15.2804 5.42265 15.0772 5.25077 14.837 5.15129C14.5968 5.05181 14.3316 5.02969 14.0783 5.08801L12.2803 5.50101C12.096 5.54336 11.9046 5.54336 11.7203 5.50101L9.9223 5.08801C9.66896 5.02969 9.40375 5.05181 9.16357 5.15129C8.9234 5.25077 8.72021 5.42265 8.5823 5.64301L7.6023 7.20701C7.5023 7.36701 7.3673 7.50201 7.2073 7.60301L5.6433 8.58301C5.42331 8.7208 5.25169 8.92366 5.15223 9.16342C5.05278 9.40319 5.03043 9.66797 5.0883 9.92101L5.5013 11.721C5.5435 11.905 5.5435 12.0961 5.5013 12.28L5.0883 14.079C5.03021 14.3322 5.05244 14.5972 5.1519 14.8372C5.25137 15.0771 5.42312 15.2802 5.6433 15.418L7.2073 16.398C7.3673 16.498 7.5023 16.633 7.6033 16.793L8.5833 18.357C8.8653 18.808 9.4033 19.031 9.9223 18.912L11.7203 18.499C11.9046 18.4567 12.096 18.4567 12.2803 18.499L14.0793 18.912C14.3325 18.9701 14.5975 18.9479 14.8375 18.8484C15.0774 18.7489 15.2804 18.5772 15.4183 18.357L16.3983 16.793C16.4983 16.633 16.6333 16.498 16.7933 16.398L18.3583 15.418C18.5785 15.28 18.7502 15.0767 18.8494 14.8365C18.9487 14.5964 18.9707 14.3312 18.9123 14.078L18.5003 12.28C18.4579 12.0957 18.4579 11.9043 18.5003 11.72L18.9133 9.92101C18.9715 9.66792 18.9494 9.403 18.8501 9.16304C18.7508 8.92308 18.5793 8.72 18.3593 8.58201L16.7943 7.60201C16.6345 7.50183 16.4995 7.36679 16.3993 7.20701L15.4183 5.64301ZM14.9153 9.77001C14.9771 9.65628 14.9925 9.52298 14.958 9.39818C14.9236 9.27338 14.8421 9.16679 14.7307 9.10085C14.6193 9.03491 14.4867 9.01476 14.3607 9.04463C14.2347 9.0745 14.1252 9.15206 14.0553 9.26101L11.4403 13.687L9.8613 12.175C9.81445 12.1269 9.7584 12.0887 9.69649 12.0628C9.63457 12.0368 9.56806 12.0236 9.50092 12.0239C9.43378 12.0242 9.36739 12.038 9.3057 12.0645C9.24402 12.091 9.1883 12.1296 9.14188 12.1781C9.09546 12.2267 9.05928 12.284 9.0355 12.3468C9.01173 12.4096 9.00084 12.4765 9.00349 12.5436C9.00614 12.6107 9.02228 12.6766 9.05094 12.7373C9.0796 12.798 9.12019 12.8523 9.1703 12.897L11.2043 14.846C11.2587 14.8981 11.3242 14.9371 11.3959 14.9603C11.4676 14.9835 11.5435 14.9902 11.6181 14.9799C11.6928 14.9697 11.7641 14.9426 11.8268 14.9009C11.8895 14.8592 11.942 14.8039 11.9803 14.739L14.9153 9.77001Z"
                    fill="#FAFAFA"
                  />
                </svg>
              )}
            </div>
            <div className="text-zinc-400 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-[21px]">
              {alternative.category}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-start items-center gap-4">
          <div className="w-[120px] h-6 flex items-center gap-0">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= alternative.rating
                    ? "fill-[#ffba1e] text-[#ffba1e]"
                    : "text-zinc-400"
                }`}
              />
            ))}
          </div>
          <div className="text-neutral-50 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
            Reviews ({alternative.reviewCount})
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium font-['Plus_Jakarta_Sans'] leading-8">
          {alternative.pricing}
        </div>
        <button className="px-6 py-3 bg-white/10 rounded-[100px] flex justify-center items-center hover:bg-white/20 transition-colors">
          <div className="text-neutral-50 text-base font-normal font-['Poppins'] leading-6">
            {alternative.compareLink}
          </div>
        </button>
      </div>
    </div>
  );
};
