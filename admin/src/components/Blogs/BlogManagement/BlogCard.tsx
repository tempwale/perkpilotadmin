import { type ReactElement } from "react";
import React from "react";
import type { BlogsCardProps } from "../../../types/blog.types";

const sanitizeImageUrl = (url: string): string | null => {
  if (!url || typeof url !== "string") return null;
  
  try {
    const parsed = new URL(url, window.location.href);
    const protocol = parsed.protocol.toLowerCase();
    
    if (protocol === "http:" || protocol === "https:") {
      return parsed.href;
    }
    
    if (protocol === "data:") {
      const dataUrl = url.toLowerCase();
      if (dataUrl.startsWith("data:image/")) {
        return url;
      }
    }
    return null;
  } catch {
    return null;
  }
};

const EyeIcon = (): ReactElement=> (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 17.8C16.034 17.8 19.686 15.55 21.648 12C19.686 8.45 16.034 6.2 12 6.2C7.966 6.2 4.314 8.45 2.352 12C4.314 15.55 7.966 17.8 12 17.8ZM12 5C16.808 5 20.972 7.848 23 12C20.972 16.152 16.808 19 12 19C7.192 19 3.028 16.152 1 12C3.028 7.848 7.192 5 12 5ZM12 14.8C12.7426 14.8 13.4548 14.505 13.9799 13.9799C14.505 13.4548 14.8 12.7426 14.8 12C14.8 11.2574 14.505 10.5452 13.9799 10.0201C13.4548 9.495 12.7426 9.2 12 9.2C11.2574 9.2 10.5452 9.495 10.0201 10.0201C9.495 10.5452 9.2 11.2574 9.2 12C9.2 12.7426 9.495 13.4548 10.0201 13.9799C10.5452 14.505 11.2574 14.8 12 14.8ZM12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16Z"
      fill="#FAFAFA"
    />
  </svg>
);

const ArrowUpIcon = (): ReactElement=> (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12.9693 19.2807C12.8995 19.211 12.8442 19.1283 12.8065 19.0373C12.7687 18.9462 12.7493 18.8486 12.7493 18.7501C12.7493 18.6515 12.7687 18.5539 12.8065 18.4628C12.8442 18.3718 12.8995 18.2891 12.9693 18.2194L18.4396 12.7501H3.7499C3.55099 12.7501 3.36022 12.671 3.21957 12.5304C3.07891 12.3897 2.9999 12.199 2.9999 12.0001C2.9999 11.8011 3.07891 11.6104 3.21957 11.4697C3.36022 11.3291 3.55099 11.2501 3.7499 11.2501H18.4396L12.9693 5.78068C12.8285 5.63995 12.7495 5.44907 12.7495 5.25005C12.7495 5.05103 12.8285 4.86016 12.9693 4.71943C13.11 4.5787 13.3009 4.49963 13.4999 4.49963C13.6989 4.49963 13.8898 4.5787 14.0305 4.71943L20.7805 11.4694C20.8503 11.5391 20.9056 11.6218 20.9433 11.7128C20.9811 11.8039 21.0005 11.9015 21.0005 12.0001C21.0005 12.0986 20.9811 12.1962 20.9433 12.2873C20.9056 12.3783 20.8503 12.461 20.7805 12.5307L14.0305 19.2807C13.9609 19.3504 13.8782 19.4057 13.7871 19.4435C13.6961 19.4812 13.5985 19.5006 13.4999 19.5006C13.4013 19.5006 13.3037 19.4812 13.2127 19.4435C13.1216 19.4057 13.0389 19.3504 12.9693 19.2807Z"
      fill="#FAFAFA"
    />
  </svg>
);

const BlogsCard: React.FC<BlogsCardProps> = ({
  id = "blog-1",
  imageUrl = "",
  featured = true,
  views = 1234,
  title = "The Ultimate Remote Work Stack For 2025",
  description = "From just a startup idea to getting 1000s of customers every month and getting loved by globally users like our latest feature about SaaS financing for struggling startups",
  tags = ["SaaS", "Founders", "Marketplace"],
  readTime = "2 Minute Read",
  date = "27/06/2004",
  onClick,
  variant = "default",
}) => {
  const isCompact = variant === "compact";
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const ariaLabel = title
    ? `Blog post: ${title}. ${onClick ? "Press Enter or Space to open." : ""}`
    : "Blog post";

  const baseClasses = `flex flex-col items-center justify-start w-full ${
    isCompact ? "min-h-[560px]" : "max-w-[522px] min-h-[627px]"
  } bg-white/5 rounded-3xl shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] outline outline-1 -outline-offset-1 outline-white/10 transition-colors`;
  const innerPaddingClass = isCompact ? "p-4" : "p-6";
  const imageHeightClass = isCompact ? "h-[200px]" : "h-[238px]";
  const interactiveClasses = onClick
    ? "cursor-pointer hover:bg-[rgba(255,255,255,0.06)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
    : "";

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      data-id={id}
      className={`${baseClasses} ${interactiveClasses}`.trim()}
    >
      <div
        className={`flex flex-col justify-center items-start ${innerPaddingClass} gap-6 w-full h-full`}
      >
        {/* Image Section */}
        <div
          className={`self-stretch ${imageHeightClass} bg-white/10 rounded-2xl flex flex-col justify-center items-start gap-3 overflow-hidden`}
        >
          {imageUrl && sanitizeImageUrl(imageUrl) ? (
            <img
              src={sanitizeImageUrl(imageUrl) || ""}
              alt={title}
              className={`w-full ${imageHeightClass} object-cover rounded-2xl`}
            />
          ) : (
            <div className={`w-full ${imageHeightClass} rounded-2xl`} />
          )}
        </div>
        {/* Content Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {/* Top Row: Featured + Views */}
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="flex justify-center items-center gap-3">
                {featured && (
                  <div className="px-2 py-1 bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] flex justify-center items-center gap-2.5">
                    <div className="text-neutral-50 text-xs font-medium font-['Poppins']">
                      Featured Article
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-start items-center gap-2">
                <span className="w-6 h-6 relative flex items-center justify-center">
                  <EyeIcon />
                </span>
                <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
                  {views}
                </div>
              </div>
            </div>
            {/* Title */}
            <div className="self-stretch justify-start text-neutral-50 text-2xl font-medium font-['Plus_Jakarta_Sans'] leading-loose">
              {title}
            </div>
            {/* Description */}
            <div className="self-stretch h-[45px] justify-start text-zinc-200 text-sm font-normal font-['Poppins'] overflow-hidden text-ellipsis">
              {description}
            </div>
            {/* Tags */}
            <div className="inline-flex justify-center items-center gap-3 flex-wrap">
              {tags.map(
                (tag, idx): ReactElement => (
                  <div
                    key={idx}
                    className="px-2 py-1 bg-white/10 rounded-[100px] flex justify-center items-center gap-2.5"
                  >
                    <div className="justify-start text-zinc-200 text-xs font-medium font-['Poppins']">
                      {tag}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          {/* Bottom Row: Read Time + Date */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="py-2 rounded flex justify-center items-center gap-2">
              <div className="text-center justify-start text-neutral-50 text-base font-medium font-['Inter'] leading-normal">
                {readTime}
              </div>
              <span className="w-6 h-6 relative flex items-center justify-center">
                <ArrowUpIcon />
              </span>
            </div>
            <div className="justify-start text-zinc-300 text-sm font-medium font-['Poppins']">
              {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
