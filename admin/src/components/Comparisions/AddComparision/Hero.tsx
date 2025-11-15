import { useEffect, useState, type ReactElement } from "react";
import { uploadToCloudinary } from "../../../config/cloudinary";

type Props = {
  heading?: string;
  body?: string;
  onHeadingChange?: (value: string) => void;
  onBodyChange?: (value: string) => void;
  onImageChange?: (value: string) => void;
  showInputs?: boolean;
  className?: string;
};

export default function Hero({
  heading = "Hero Heading",
  body = "Hero Body",
  onHeadingChange,
  onBodyChange,
  onImageChange,
  className = "",
}: Props): ReactElement {
  const [localHeading, setLocalHeading] = useState<string>(heading);
  const [localBody, setLocalBody] = useState<string>(body);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect((): void => setLocalHeading(heading), [heading]);
  useEffect((): void => setLocalBody(body), [body]);

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const v = e.target.value;
    setLocalHeading(v);
    onHeadingChange?.(v);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const v = e.target.value;
    setLocalBody(v);
    onBodyChange?.(v);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      // Upload to Cloudinary and get the URL
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Create a local preview
      const reader = new FileReader();
      reader.onload = (event): void => {
        const imageData = event.target?.result as string;
        setImage(imageData); // For local preview
      };
      reader.readAsDataURL(file);

      // Send Cloudinary URL to parent component
      onImageChange?.(cloudinaryUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div
        data-layer="Frame 2147205988"
        className="Frame2147205988 self-stretch inline-flex justify-between items-center"
      >
        <div
          data-layer="Hero Section"
          className="HeroSection flex-1 justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
        >
          Hero Section
        </div>
      </div>

      {/* Main Section */}
      <div
        data-layer="Frame 1597884268"
        className={`Frame1597884268 self-stretch rounded-2xl flex flex-col justify-start items-center gap-6 ${className}`}
      >
        <div
          data-layer="Frame 2147206050"
          className="Frame2147206050 self-stretch inline-flex justify-start items-center gap-6"
        >
          {/* Heading Input */}
          <div
            data-layer="Frame 2147205989"
            className="Frame2147205989 flex-1 flex justify-start items-start gap-6"
          >
            <div className="flex-1 flex flex-col gap-3">
              <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                Heading
              </div>
              <input
                aria-label="Hero heading"
                value={localHeading}
                onChange={handleHeadingChange}
                className="w-full h-14 px-4 py-3 bg-zinc-800 rounded-xl outline-1 outline-zinc-700 text-zinc-400 text-base font-['Poppins'] leading-6 outline-none"
                placeholder="Enter heading"
              />
            </div>

            {/* Body Input */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
                Body
              </div>
              <input
                aria-label="Hero body"
                value={localBody}
                onChange={handleBodyChange}
                className="w-full h-14 px-4 py-3 bg-zinc-800 rounded-xl outline-1 outline-zinc-700 text-zinc-400 text-base font-['Poppins'] leading-6 outline-none"
                placeholder="Enter body text"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="self-stretch flex flex-col gap-3 mt-6">
        <div className="text-neutral-50 text-sm font-medium font-['Poppins']">
          Hero Image
        </div>

        <label className="flex flex-row gap-2 items-center justify-center h-14 px-4 py-2 bg-zinc-800 rounded-xl outline-1 outline-zinc-700 cursor-pointer hover:bg-zinc-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 20C4.47717 20 0 15.5228 0 10C0 4.47717 4.47717 0 10 0C15.5228 0 20 4.47717 20 10C20 15.5228 15.5228 20 10 20ZM10 2.17392C5.67718 2.17392 2.17392 5.67827 2.17392 10C2.17392 14.3218 5.67718 17.8261 10 17.8261C14.3228 17.8261 17.8261 14.3218 17.8261 10C17.8261 5.67827 14.3228 2.17392 10 2.17392ZM11.9565 14.1848H8.04347V9.73913H5.59783L10 5.59783L14.4022 9.73913H11.9565V14.1848Z"
              fill="#FAFAFA"
            />
          </svg>
          <span className="text-neutral-50 text-xs font-medium font-['Poppins']">
            {uploading
              ? "Uploading..."
              : image
              ? "Change Image"
              : "Upload Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </label>

        {uploadError && (
          <div className="text-red-400 text-xs mt-1">{uploadError}</div>
        )}

        {image && (
          <div className="mt-3 w-full flex justify-center">
            <img
              src={image}
              alt="Uploaded preview"
              className="rounded-xl max-h-60 object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
}
