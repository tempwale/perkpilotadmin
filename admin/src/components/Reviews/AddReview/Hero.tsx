import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { fetchLogoByDomain } from "../../../utils/LogoFetch";

type Props = {
  reviewData?: any;
  updateReviewData?: (updates: any) => void;
};

export default function ToolReviewForm({
  reviewData,
  updateReviewData,
}: Props = {}) {
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
    toolName: "",
    toolCategory: "",
    toolDescription: "",
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
    // New field defaults
    showProductUsedBy: true,
    showAverageRating: false,
    productUsedByText: "",
    averageRating: 0,
    averageRatingText: "",
    totalUsers: "",
    founded: "",
    employees: "",
    headquarters: "",
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
  useEffect(() => {
    if (updateReviewData) {
      const updates: any = {};

      // Basic product info
      if (formData.toolName) updates.productName = formData.toolName;
      if (formData.toolCategory) updates.productType = formData.toolCategory;
      if (formData.toolDescription)
        updates.description = formData.toolDescription;

      // Logo (use first non-null logo as avatarUrl)
      const firstLogo = logoFiles.find((logo) => logo !== null);
      if (firstLogo) updates.avatarUrl = firstLogo;

      // Stats
      if (formData.totalUsers) updates.userCount = formData.totalUsers;
      if (formData.founded) {
        const year = parseInt(formData.founded);
        if (!isNaN(year)) updates.foundedYear = year;
      }
      if (formData.employees) updates.employeeRange = formData.employees;
      if (formData.headquarters) updates.headquarters = formData.headquarters;

      // Rating
      if (formData.averageRating > 0)
        updates.aggregateRating = formData.averageRating;

      // Only update if there are changes
      if (Object.keys(updates).length > 0) {
        updateReviewData(updates);
      }
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
    logoFiles,
    updateReviewData,
  ]);

  // Handle input changes for all text fields
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (field: keyof FormDataShape) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle star rating click
  // Handle star rating click
  const handleRatingClick = (rating: number) => {
    console.log("Rating clicked:", rating); // Debug log
    setFormData((prev) => ({
      ...prev,
      averageRating: prev.averageRating === rating ? 0 : rating, // Toggle if same rating
    }));
  };

  // Accessible star button component
  const StarButton = ({ star }: { star: number }) => {
    const filled = star <= (hoverRating || formData.averageRating);

    const onClick = (e?: any) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (formData.showAverageRating) handleRatingClick(star);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
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
        onMouseEnter={() => formData.showAverageRating && setHoverRating(star)}
        onMouseLeave={() => formData.showAverageRating && setHoverRating(0)}
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

  // Handle logo selection
  const handleLogoSelect = (index: number) => {
    setSelectedLogo(index);
  };

  // Handle logo file upload
  const handleLogoUpload = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newLogoFiles = [...logoFiles];
      newLogoFiles[index] = URL.createObjectURL(file);
      setLogoFiles(newLogoFiles);
      setSelectedLogo(index);
    }
  };

  // Handle logo fetch from domain
  const handleFetchLogo = async () => {
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

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Selected Logo Index:", selectedLogo);
    console.log("Logo Files:", logoFiles);
    // Add your API call or submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        data-layer="Frame 2147223610"
        className="Frame2147223610 w-[1068px] rounded-2xl inline-flex flex-col justify-start items-center gap-6"
      >
        {/* Tool Name and Category */}
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
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="toolName"
                  value={formData.toolName}
                  onChange={handleInputChange}
                  placeholder="Tool Name"
                  className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6"
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
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <select
                  name="toolCategory"
                  value={formData.toolCategory}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6"
                >
                  <option value="">Select Category</option>
                  <option value="productivity">Productivity</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>
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
              className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
            >
              <input
                type="text"
                name="toolDescription"
                value={formData.toolDescription}
                onChange={handleInputChange}
                placeholder="E.g. The collaborative user interface design tool."
                className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6"
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
                    onClick={() => handleLogoSelect(index)}
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
                  className="Input flex-1 h-10 px-3 py-2 relative bg-zinc-800 rounded-lg outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
                >
                  <input
                    type="text"
                    value={logoFetchUrl}
                    onChange={(e) => setLogoFetchUrl(e.target.value)}
                    placeholder="e.g., google.com"
                    className="w-full bg-transparent outline-none text-zinc-400 text-sm font-normal font-['Poppins']"
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
            {/* Product Used By Checkbox */}
            <div
              data-layer="Select/Selected"
              className="SelectSelected w-[163px] h-7 relative cursor-pointer"
              onClick={() => handleCheckboxChange("showProductUsedBy")}
            >
              <div
                data-layer="Product Used By"
                className="ProductUsedBy left-[40px] top-[4px] absolute justify-start text-neutral-50 text-base font-normal font-['Roboto']"
              >
                Product Used By
              </div>
              <div
                data-layer="Rectangle 3.1"
                className={`Rectangle31 w-7 h-7 left-0 top-0 absolute rounded-[14px] ${
                  formData.showProductUsedBy
                    ? "border-2 border-[#501bd6]"
                    : "bg-zinc-800 border border-zinc-700"
                }`}
              />
              {formData.showProductUsedBy && (
                <div
                  data-layer="Rectangle 3.2"
                  className="Rectangle32 w-[18px] h-[18px] left-[5px] top-[5px] absolute bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[14px]"
                />
              )}
            </div>

            {/* Average Deal Rating Checkbox */}
            {/* Average Deal Rating Section */}
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
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="averageRatingText"
                  value={formData.averageRatingText}
                  onChange={handleInputChange}
                  placeholder="4.9 / 5 ( 24 )"
                  disabled={!formData.showAverageRating}
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6 disabled:opacity-50"
                />
              </div>
            </div>
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
                  className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
                >
                  <input
                    type="text"
                    name="productUsedByText"
                    value={formData.productUsedByText}
                    onChange={handleInputChange}
                    placeholder="Redeemed By 100+ People"
                    disabled={!formData.showProductUsedBy}
                    className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6 disabled:opacity-50"
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
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="averageRatingText"
                  value={formData.averageRatingText}
                  onChange={handleInputChange}
                  placeholder="4.9 / 5 ( 24 )"
                  disabled={!formData.showAverageRating}
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6 disabled:opacity-50"
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
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="totalUsers"
                  value={formData.totalUsers}
                  onChange={handleInputChange}
                  placeholder="e.g. 5M"
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6"
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
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="founded"
                  value={formData.founded}
                  onChange={handleInputChange}
                  placeholder="E.g. 2015"
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6"
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
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="employees"
                  value={formData.employees}
                  onChange={handleInputChange}
                  placeholder="1000+"
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6"
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
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleInputChange}
                  placeholder="San Francisco"
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
