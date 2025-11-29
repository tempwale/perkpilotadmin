import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { fetchLogoByDomain } from "../../../utils/LogoFetch";
import type { ReviewApiResponse } from "../../../types/api.types";
import CategorySelector from "../../Shared/CategorySelector";

type Props = {
  reviewData?: ReviewApiResponse;
  updateReviewData?: (updates: Partial<ReviewApiResponse>) => void;
};

export default function ToolReviewForm({
  reviewData,
  updateReviewData,
}: Props = {}): ReactElement {
  type FormDataShape = {
    toolName: string;
    toolCategory: string;
    toolDescription: string;
    dealBadge: string;
    whatsIncludedTitle: string;
    features: string[];
    saveUptoAmount: string;
    saveUptoUnit: string;
    discountValue: string;
    discountUnit: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    // New fields
    showProductUsedBy: boolean;
    showAverageRating: boolean;
    productUsedByText: string;
    averageRating: number;
    averageRatingText: string;
    totalUsers: string;
    founded: string;
    employees: string;
    headquarters: string;
  };

  const [formData, setFormData] = useState<FormDataShape>({
    toolName: reviewData?.productName || "",
    toolCategory: reviewData?.productType || "",
    toolDescription: reviewData?.description || "",
    dealBadge: "",
    whatsIncludedTitle: "",
    features: ["", ""],
    saveUptoAmount: "1080",
    saveUptoUnit: "Upto",
    discountValue: "20",
    discountUnit: "%",
    primaryCtaText: "",
    primaryCtaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
    showProductUsedBy: reviewData?.showProductUsedBy ?? true,
    showAverageRating: reviewData?.showAverageRating ?? false,
    productUsedByText: reviewData?.productUsedByText ?? "",
    averageRating: reviewData?.aggregateRating ?? 0,
    averageRatingText: reviewData?.averageRatingText ?? "",
    totalUsers: reviewData?.userCount ?? "",
    founded: reviewData?.foundedYear ? String(reviewData?.foundedYear) : "",
    employees: reviewData?.employeeRange ?? "",
    headquarters: reviewData?.headquarters ?? "",
  });

  const [selectedLogo, setSelectedLogo] = useState<number>(0);
  const [logoFiles, setLogoFiles] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [logoFetchUrl, setLogoFetchUrl] = useState<string>("");
  const [logoFetching, setLogoFetching] = useState<boolean>(false);
  const [logoFetchError, setLogoFetchError] = useState<string | null>(null);

  // Sync all form data to parent's reviewData
  useEffect((): void => {
    if (!updateReviewData) return;

      const updates: Partial<ReviewApiResponse> = {};
    const pushIfChanged = <K extends keyof ReviewApiResponse>(
      key: K,
      value: ReviewApiResponse[K]
    ): void => {
      const currentValue = reviewData ? reviewData[key] : undefined;
      if (!Object.is(currentValue, value)) {
        updates[key] = value;
      }
    };

      // Basic product info
    pushIfChanged("productName", formData.toolName);
    pushIfChanged("productType", formData.toolCategory);
    pushIfChanged("description", formData.toolDescription);

      // Logo (use first non-null logo as avatarUrl)
    const firstLogo = logoFiles.find((logo) => logo !== null) ?? undefined;
    pushIfChanged("avatarUrl", firstLogo);

      // Stats
    pushIfChanged("userCount", formData.totalUsers);
      if (formData.founded) {
        const year = parseInt(formData.founded);
      if (!isNaN(year)) pushIfChanged("foundedYear", year);
    } else {
      pushIfChanged("foundedYear", undefined);
    }
    pushIfChanged("employeeRange", formData.employees);
    pushIfChanged("headquarters", formData.headquarters);

    // Hero toggles + copy
    pushIfChanged("showProductUsedBy", formData.showProductUsedBy);
    pushIfChanged("productUsedByText", formData.productUsedByText);
    pushIfChanged("showAverageRating", formData.showAverageRating);
    pushIfChanged(
      "averageRatingText",
      formData.showAverageRating ? formData.averageRatingText : ""
    );

      // Rating
    const aggregateRatingValue =
      formData.showAverageRating && formData.averageRating > 0
        ? formData.averageRating
        : undefined;
    pushIfChanged("aggregateRating", aggregateRatingValue);

      if (Object.keys(updates).length > 0) {
        updateReviewData(updates);
    }
  }, [
    formData.toolName,
    formData.toolCategory,
    formData.toolDescription,
    formData.totalUsers,
    formData.founded,
    formData.employees,
    formData.headquarters,
    formData.averageRating,
    formData.productUsedByText,
    formData.averageRatingText,
    formData.showProductUsedBy,
    formData.showAverageRating,
    logoFiles,
    reviewData,
    updateReviewData,
  ]);

  // Handle input changes for all text fields
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (field: keyof FormDataShape): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle star rating click
  const handleRatingClick = (rating: number): void => {
    console.log("Rating clicked:", rating); // Debug log
    setFormData((prev) => {
      const newRating = prev.averageRating === rating ? 0 : rating;
      return {
        ...prev,
        averageRating: newRating,
        averageRatingText: newRating > 0 ? `${newRating} / 5` : "",
      };
    });
  };


  const StarButton = ({ star }: { star: number }): ReactElement=> {
    const filled = star <= (hoverRating || formData.averageRating);

    const onClick = (e?: React.MouseEvent<HTMLDivElement>): void => {
      e?.preventDefault();
      e?.stopPropagation();
      if (formData.showAverageRating) handleRatingClick(star);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
      if (!formData.showAverageRating) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleRatingClick(star);
      }
    };

    return (
      <div
        role="button"
        tabIndex={formData.showAverageRating ? 0 : -1}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={(): void => {
          if (formData.showAverageRating) setHoverRating(star);
        }}
        onMouseLeave={(): void => {
          if (formData.showAverageRating) setHoverRating(0);
        }}
        aria-pressed={formData.averageRating === star}
        className={`w-6 h-6 p-0 bg-transparent transition-all flex items-center justify-center ${
          formData.showAverageRating
            ? "cursor-pointer hover:scale-110"
            : "opacity-50 pointer-events-none"
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={filled ? "#FFD700" : "none"}
          stroke={filled ? "#FFD700" : "#ffffff"}
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    );
  };

  const ToggleOption = ({
    label,
    active,
    onToggle,
  }: {
    label: string;
    active: boolean;
    onToggle: () => void;
  }): ReactElement => (
    <button
      type="button"
      onClick={onToggle}
      className="SelectSelected w-[208px] h-7 relative cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f57e2]"
    >
      <span className="absolute left-[40px] top-[4px] text-left text-neutral-50 text-base font-normal font-['Roboto']">
        {label}
      </span>
      <span
        className={`Rectangle31 w-7 h-7 left-0 top-0 absolute rounded-[14px] ${
          active
            ? "border-2 border-[#501bd6]"
            : "bg-zinc-800 border border-zinc-700"
        }`}
      />
      {active && (
        <span className="Rectangle32 w-[18px] h-[18px] left-[5px] top-[5px] absolute bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[14px]" />
      )}
    </button>
  );

  const handleLogoSelect = (index: number): void => {
    setSelectedLogo(index);
  };

  const handleLogoUpload = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      const newLogoFiles = [...logoFiles];
      newLogoFiles[index] = URL.createObjectURL(file);
      setLogoFiles(newLogoFiles);
      setSelectedLogo(index);
    }
  };

  const handleFetchLogo = async (): Promise<void> => {
    if (!logoFetchUrl.trim()) {
      setLogoFetchError("Please enter a domain or company name");
      return;
    }

    setLogoFetching(true);
    setLogoFetchError(null);

    try {
      const logoUrl = await fetchLogoByDomain(logoFetchUrl.trim());
      if (logoUrl) {
        const newLogoFiles = [...logoFiles];
        newLogoFiles[selectedLogo] = logoUrl;
        setLogoFiles(newLogoFiles);
        setLogoFetchUrl("");
      } else {
        setLogoFetchError(
          "Logo not found. Please try another domain or upload manually."
        );
      }
    } catch (error) {
      setLogoFetchError(
        error instanceof Error
          ? error.message
          : "Failed to fetch logo. Please try again."
      );
    } finally {
      setLogoFetching(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Selected Logo Index:", selectedLogo);
    console.log("Logo Files:", logoFiles);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        data-layer="Frame 2147223610"
        className="Frame2147223610 w-[1068px] rounded-2xl inline-flex flex-col justify-start items-center gap-6"
      >
        <div
          data-layer="Frame 2147206050"
          className="Frame2147206050 self-stretch inline-flex justify-start items-center gap-6"
        >
          <div
            data-layer="Frame 2147205989"
            className="Frame2147205989 flex-1 flex justify-start items-start gap-6"
          >
            <div
              data-layer="Frame 2147205559"
              className="Frame2147205559 flex-1 inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Tool Name"
                className="ToolName justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Tool Name
              </div>
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="toolName"
                  value={formData.toolName}
                  onChange={handleInputChange}
                  placeholder="Tool Name"
                  className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div
              data-layer="Frame 2147205562"
              className="Frame2147205562 flex-1 inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Tool Category"
                className="ToolCategory justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Tool Category
              </div>
              <CategorySelector
                value={formData.toolCategory}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    toolCategory: value,
                  }));
                }}
                placeholder="Select or type custom category"
                name="toolCategory"
              />
            </div>
          </div>
        </div>

        {/* Tool Description and Logo */}
        <div
          data-layer="Frame 2147206054"
          className="Frame2147206054 self-stretch inline-flex justify-start items-start gap-6"
        >
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 flex-1 inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Tool Description"
              className="ToolDescription justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Tool Description
            </div>
            <div
              data-layer="Input"
              className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
            >
              <input
                type="text"
                name="toolDescription"
                value={formData.toolDescription}
                onChange={handleInputChange}
                placeholder="E.g. The collaborative user interface design tool."
                className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6 placeholder:text-zinc-500"
              />
            </div>
            <div
              data-layer="The main button for users to proceed with the tool"
              className="TheMainButtonForUsersToProceedWithTheTool justify-start text-neutral-50 text-[10px] font-medium font-['Poppins']"
            >
              The main button for users to proceed with the tool
            </div>
          </div>

          <div
            data-layer="Frame 2147205564"
            className="Frame2147205564 flex-1 inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Product Logo Select"
              className="ProductLogoSelect w-[272px] justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Product Logo Select
            </div>
            <div
              data-layer="Frame 2147223625"
              className="Frame2147223625 inline-flex justify-start items-center gap-6"
            >
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative">
                  <input
                    type="file"
                    id={`logo-${index}`}
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(index, e)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`logo-${index}`}
                    className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer ${
                      selectedLogo === index
                        ? "border-2 border-[#501bd6]"
                        : "border border-zinc-700"
                    } ${logoFiles[index] ? "" : "bg-zinc-800"}`}
                    onClick={(): void => handleLogoSelect(index)}
                  >
                    {logoFiles[index] ? (
                      <img
                        src={logoFiles[index]}
                        alt={`Logo ${index + 1}`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-zinc-500 text-xs">+</span>
                    )}
                  </label>
                </div>
              ))}
            </div>

            {/* Logo Fetch Input */}
            <div className="w-full mt-4 flex flex-col gap-2">
              <div className="text-neutral-50 text-xs font-medium font-['Poppins']">
                Or fetch from domain
              </div>
              <div className="flex gap-2">
                <div
                  data-layer="Input"
                  className="Input flex-1 h-10 px-3 py-2 relative bg-zinc-800 rounded-lg outline-1 outline-offset-[-0.5px] outline-zinc-700 inline-flex justify-start items-center"
                >
                  <input
                    type="text"
                    value={logoFetchUrl}
                    onChange={(e) => setLogoFetchUrl(e.target.value)}
                    placeholder="e.g., google.com"
                    className="w-full bg-transparent outline-none text-neutral-50 text-sm font-normal font-['Poppins'] placeholder:text-zinc-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleFetchLogo}
                  disabled={logoFetching}
                  className="px-4 py-2 bg-[#501bd6] hover:bg-[#6030e8] disabled:opacity-50 text-neutral-50 text-sm font-medium rounded-lg transition-colors"
                >
                  {logoFetching ? "Fetching..." : "Fetch"}
                </button>
              </div>
              {logoFetchError && (
                <div className="text-red-400 text-xs font-medium">
                  {logoFetchError}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What You Want To Show Section */}
        <div
          data-layer="Frame 2147205990"
          className="Frame2147205990 self-stretch inline-flex flex-col justify-start items-start gap-4"
        >
          <div
            data-layer="What You Want To Show"
            className="WhatYouWantToShow justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
          >
            What You Want To Show
          </div>
          <div
            data-layer="Frame 2147206063"
            className="Frame2147206063 inline-flex justify-start items-start gap-4"
          >
            <ToggleOption
              label="Product Used By"
              active={formData.showProductUsedBy}
              onToggle={(): void => handleCheckboxChange("showProductUsedBy")}
            />
            <ToggleOption
              label="Average Deal Rating"
              active={formData.showAverageRating}
              onToggle={(): void => handleCheckboxChange("showAverageRating")}
            />
          </div>

          <div
            data-layer="Frame 2147206064"
            className="Frame2147206064 self-stretch inline-flex justify-start items-end gap-4"
          >
            <div
              data-layer="Frame 2147206058"
              className="Frame2147206058 flex-1 flex justify-start items-center gap-4"
            >
              <div
                data-layer="Frame 2147205559"
                className="Frame2147205559 flex-1 inline-flex flex-col justify-center items-start gap-3"
              >
                <div
                  data-layer="Product Used By Text"
                  className="ProductUsedByText justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
                >
                  Product Used By Text
                </div>
                <div
                  data-layer="Input"
                  className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
                >
                  <input
                    type="text"
                    name="productUsedByText"
                    value={formData.productUsedByText}
                    onChange={handleInputChange}
                    placeholder="Redeemed By 100+ People"
                    disabled={!formData.showProductUsedBy}
                    className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div
              data-layer="Frame 2147205997"
              className="Frame2147205997 flex-1 inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Add Deal Average Raings"
                className="AddDealAverageRaings justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Add Deal Average Ratings
              </div>
              <div
                data-layer="Frame 2147205996"
                className="Frame2147205996 inline-flex justify-start items-center gap-2"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton key={star} star={star} />
                ))}
              </div>
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="averageRatingText"
                  value={formData.averageRatingText}
                  onChange={handleInputChange}
                  placeholder="4.9 / 5 ( 24 )"
                  disabled={!formData.showAverageRating}
                  className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500 disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Stats Section */}
        <div
          data-layer="Frame 2147205994"
          className="Frame2147205994 self-stretch inline-flex flex-col justify-start items-start gap-2"
        >
          <div
            data-layer="Hero Stats"
            className="HeroStats self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
          >
            Hero Stats
          </div>
          <div
            data-layer="Frame 2147205989"
            className="Frame2147205989 self-stretch inline-flex justify-start items-start gap-6"
          >
            <div
              data-layer="Frame 2147205559"
              className="Frame2147205559 flex-1 inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Total Users"
                className="TotalUsers justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Total Users
              </div>
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="totalUsers"
                  value={formData.totalUsers}
                  onChange={handleInputChange}
                  placeholder="e.g. 5M"
                  className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div
              data-layer="Frame 2147205562"
              className="Frame2147205562 flex-1 inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Founded"
                className="Founded justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Founded
              </div>
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="founded"
                  value={formData.founded}
                  onChange={handleInputChange}
                  placeholder="E.g. 2015"
                  className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div
              data-layer="Frame 2147205563"
              className="Frame2147205563 flex-1 inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="Employees"
                className="Employees justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Employees
              </div>
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="employees"
                  value={formData.employees}
                  onChange={handleInputChange}
                  placeholder="1000+"
                  className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div
              data-layer="Frame 2147205564"
              className="Frame2147205564 flex-1 inline-flex flex-col justify-center items-start gap-3"
            >
              <div
                data-layer="HQ"
                className="Hq justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                HQ
              </div>
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleInputChange}
                  placeholder="San Francisco"
                  className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6 placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
