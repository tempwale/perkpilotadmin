import { useState, type ChangeEvent, type FormEvent } from "react";
import FooterActions from "./FooterActions";

export default function ToolComparisonForm() {
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

  // Handle feature input changes
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  // Add new feature field
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  // Remove feature field
  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const updatedFeatures = formData.features.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        features: updatedFeatures,
      }));
    }
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
          </div>
        </div>

        {/* Deal Badge */}
        <div
          data-layer="Frame 2147206055"
          className="Frame2147206055 self-stretch inline-flex justify-start items-center gap-6"
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
                data-layer="Deal Badge"
                className="DealBadge justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
              >
                Deal Badge
              </div>
              <div
                data-layer="Input"
                className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  name="dealBadge"
                  value={formData.dealBadge}
                  onChange={handleInputChange}
                  placeholder="E.g. Hot Deals"
                  className="w-full bg-transparent outline-none text-zinc-500 text-base font-normal font-['Poppins'] leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div
          data-layer="Frame 2147205560"
          className="Frame2147205560 self-stretch flex flex-col justify-center items-start gap-2"
        >
          <div
            data-layer="Whats Included Section Title"
            className="WhatsIncludedSectionTitle justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Whats Included Section Title
          </div>
          <div
            data-layer="Input"
            className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
          >
            <input
              type="text"
              name="whatsIncludedTitle"
              value={formData.whatsIncludedTitle}
              onChange={handleInputChange}
              placeholder="Whats Included?"
              className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6"
            />
          </div>
        </div>

        {/* Dynamic Features */}
        {formData.features.map((feature, index) => (
          <div
            key={index}
            data-layer="Frame 2147205560"
            className="Frame2147205560 self-stretch flex flex-col justify-center items-start gap-2"
          >
            <div className="flex w-full items-center gap-3">
              <div
                data-layer="Input"
                className="Input flex-1 h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
              >
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="w-full bg-transparent outline-none text-zinc-400 text-base font-normal font-['Poppins'] leading-6"
                />
              </div>
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add More Features Button */}
        <div
          data-layer="Frame 2147205993"
          className="Frame2147205993 self-stretch inline-flex justify-end items-center gap-3"
        >
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div
              data-layer="Add More Pros & Cons"
              className="AddMoreProsCons justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Add More Pros & Cons
            </div>
            <div
              data-layer="ic:round-plus"
              className="IcRoundPlus w-6 h-6 relative overflow-hidden"
            >
              <div
                data-layer="Vector"
                className="Vector w-3.5 h-3.5 left-[5px] top-[5px] absolute bg-neutral-50"
              />
            </div>
          </button>
        </div>

        {/* Money Save Section */}
        <div
          data-layer="Frame 2147205562"
          className="Frame2147205562 self-stretch flex flex-col justify-center items-start gap-3"
        >
          <div
            data-layer="Money Save Upto"
            className="MoneySaveUpto justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Money Save Upto
          </div>
          <div
            data-layer="Frame 2147205986"
            className="Frame2147205986 self-stretch inline-flex justify-start items-start"
          >
            <div
              data-layer="Input"
              className="Input h-14 px-4 py-3 bg-zinc-800 rounded-tl-xl rounded-bl-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 flex justify-start items-center overflow-hidden"
            >
              <div className="justify-start text-neutral-50 text-base font-normal font-['Poppins'] leading-6">
                Save Upto
              </div>
            </div>
            <div
              data-layer="Input"
              className="Input flex-1 h-14 px-4 py-3 bg-zinc-900 outline outline-1 outline-offset-[-0.50px] outline-zinc-700 flex justify-start items-center"
            >
              <input
                type="number"
                name="saveUptoAmount"
                value={formData.saveUptoAmount}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6"
              />
            </div>
            <div
              data-layer="Input"
              className="Input w-[124px] h-14 px-4 py-3 bg-zinc-800 rounded-tr-xl rounded-br-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 flex justify-between items-center overflow-hidden"
            >
              <select
                name="saveUptoUnit"
                value={formData.saveUptoUnit}
                onChange={handleInputChange}
                className="bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6"
              >
                <option value="Upto">Upto</option>
                <option value="Flat">Flat</option>
              </select>
            </div>
          </div>
        </div>

        {/* Discount Section */}
        <div
          data-layer="Frame 2147223609"
          className="Frame2147223609 self-stretch flex flex-col justify-center items-start gap-3"
        >
          <div
            data-layer="Discount"
            className="Discount justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Discount
          </div>
          <div
            data-layer="Frame 2147205986"
            className="Frame2147205986 self-stretch inline-flex justify-start items-start"
          >
            <div
              data-layer="Input"
              className="Input w-[114px] h-14 px-4 py-3 bg-zinc-800 rounded-tl-xl rounded-bl-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 flex justify-start items-center overflow-hidden"
            >
              <div className="justify-start text-neutral-50 text-base font-normal font-['Poppins'] leading-6">
                Discount
              </div>
            </div>
            <div
              data-layer="Input"
              className="Input flex-1 h-14 px-4 py-3 bg-zinc-900 outline outline-1 outline-offset-[-0.50px] outline-zinc-700 flex justify-start items-center"
            >
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleInputChange}
                className="w-full bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6"
              />
            </div>
            <div
              data-layer="Input"
              className="Input w-[124px] h-14 px-4 py-3 bg-zinc-800 rounded-tr-xl rounded-br-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 flex justify-between items-center overflow-hidden"
            >
              <select
                name="discountUnit"
                value={formData.discountUnit}
                onChange={handleInputChange}
                className="bg-transparent outline-none text-neutral-50 text-base font-normal font-['Poppins'] leading-6"
              >
                <option value="%">%</option>
                <option value="$">$</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div
          data-layer="Frame 2147223608"
          className="Frame2147223608 self-stretch inline-flex justify-start items-start gap-6"
        >
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 flex-1 inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Primary CTA Button Text"
              className="PrimaryCtaButtonText justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Primary CTA Button Text
            </div>
            <div
              data-layer="Input"
              className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
            >
              <input
                type="text"
                name="primaryCtaText"
                value={formData.primaryCtaText}
                onChange={handleInputChange}
                placeholder="e.g., Get Notion"
                className="w-full bg-transparent outline-none text-zinc-500 text-base font-normal font-['Poppins'] leading-6"
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
            data-layer="Frame 2147205563"
            className="Frame2147205563 flex-1 inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Primary CTA Button Link"
              className="PrimaryCtaButtonLink justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Primary CTA Button Link
            </div>
            <div
              data-layer="Input"
              className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
            >
              <input
                type="url"
                name="primaryCtaLink"
                value={formData.primaryCtaLink}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full bg-transparent outline-none text-zinc-500 text-base font-normal font-['Poppins'] leading-6"
              />
            </div>
          </div>
        </div>

        {/* Secondary CTA */}
        <div
          data-layer="Frame 2147223607"
          className="Frame2147223607 self-stretch inline-flex justify-start items-start gap-6"
        >
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 flex-1 inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Secondary CTA Button Text"
              className="SecondaryCtaButtonText justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Secondary CTA Button Text
            </div>
            <div
              data-layer="Input"
              className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
            >
              <input
                type="text"
                name="secondaryCtaText"
                value={formData.secondaryCtaText}
                onChange={handleInputChange}
                placeholder="e.g., Get Motion"
                className="w-full bg-transparent outline-none text-zinc-500 text-base font-normal font-['Poppins'] leading-6"
              />
            </div>
            <div
              data-layer="The main button for users to proceed with the tool"
              className="TheMainButtonForUsersToProceedWithTheTool justify-start text-zinc-400 text-[10px] font-medium font-['Poppins']"
            >
              The main button for users to proceed with the tool
            </div>
          </div>

          <div
            data-layer="Frame 2147205563"
            className="Frame2147205563 flex-1 inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Primary CTA Button Link"
              className="PrimaryCtaButtonLink justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Primary CTA Button Link
            </div>
            <div
              data-layer="Input"
              className="Input self-stretch h-14 px-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center"
            >
              <input
                type="url"
                name="secondaryCtaLink"
                value={formData.secondaryCtaLink}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full bg-transparent outline-none text-zinc-500 text-base font-normal font-['Poppins'] leading-6"
              />
            </div>
          </div>
        </div>

        <FooterActions />
      </div>
    </form>
  );
}
