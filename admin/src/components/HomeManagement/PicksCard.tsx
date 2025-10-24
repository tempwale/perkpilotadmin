import React from "react";

interface PickProps {
  appName: string;
  category: string;
  description: string;
  discountPercentage: string;
  savingsAmount: string;
  rating: string;
  verified?: boolean;
}

const Pick: React.FC<PickProps> = ({
  appName,
  category,
  description,
  discountPercentage,
  savingsAmount,
  rating,
  verified = false,
}) => {
  const SlackIcon = () => (
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

  const VerifyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.418 5.73285C15.2801 5.51249 15.0769 5.34061 14.8367 5.24113C14.5965 5.14166 14.3313 5.11954 14.078 5.17785L12.28 5.59085C12.0957 5.6332 11.9043 5.6332 11.72 5.59085L9.92199 5.17785C9.66866 5.11954 9.40344 5.14166 9.16327 5.24113C8.92309 5.34061 8.7199 5.51249 8.58199 5.73285L7.60199 7.29685C7.50199 7.45685 7.36699 7.59185 7.20699 7.69285L5.64299 8.67285C5.42301 8.81064 5.25138 9.0135 5.15193 9.25327C5.05247 9.49303 5.03013 9.75781 5.08799 10.0109L5.50099 11.8109C5.54319 11.9948 5.54319 12.1859 5.50099 12.3699L5.08799 14.1689C5.0299 14.422 5.05213 14.687 5.1516 14.927C5.25106 15.167 5.42282 15.37 5.64299 15.5079L7.20699 16.4879C7.36699 16.5879 7.50199 16.7229 7.60299 16.8829L8.58299 18.4469C8.86499 18.8979 9.40299 19.1209 9.92199 19.0019L11.72 18.5889C11.9043 18.5465 12.0957 18.5465 12.28 18.5889L14.079 19.0019C14.3322 19.0599 14.5972 19.0377 14.8371 18.9382C15.0771 18.8388 15.2801 18.667 15.418 18.4469L16.398 16.8829C16.498 16.7229 16.633 16.5879 16.793 16.4879L18.358 15.5079C18.5782 15.3698 18.7499 15.1666 18.8491 14.9264C18.9484 14.6862 18.9704 14.4211 18.912 14.1679L18.5 12.3699C18.4576 12.1856 18.4576 11.9941 18.5 11.8099L18.913 10.0109C18.9712 9.75777 18.9491 9.49285 18.8498 9.25289C18.7505 9.01293 18.579 8.80984 18.359 8.67185L16.794 7.69185C16.6342 7.59167 16.4992 7.45663 16.399 7.29685L15.418 5.73285ZM14.915 9.85985C14.9768 9.74612 14.9922 9.61283 14.9577 9.48803C14.9233 9.36322 14.8418 9.25664 14.7304 9.1907C14.619 9.12476 14.4864 9.1046 14.3604 9.13447C14.2344 9.16434 14.1249 9.24191 14.055 9.35085L11.44 13.7769L9.86099 12.2649C9.81415 12.2168 9.7581 12.1786 9.69618 12.1526C9.63427 12.1266 9.56776 12.1134 9.50062 12.1137C9.43348 12.114 9.36708 12.1278 9.3054 12.1543C9.24371 12.1808 9.188 12.2195 9.14157 12.268C9.09515 12.3165 9.05897 12.3739 9.0352 12.4366C9.01142 12.4994 9.00054 12.5664 9.00319 12.6335C9.00584 12.7005 9.02198 12.7664 9.05063 12.8271C9.07929 12.8878 9.11989 12.9422 9.16999 12.9869L11.204 14.9359C11.2584 14.9879 11.3239 15.027 11.3956 15.0502C11.4672 15.0734 11.5432 15.0801 11.6178 15.0698C11.6925 15.0595 11.7638 15.0325 11.8265 14.9908C11.8892 14.949 11.9417 14.8937 11.98 14.8289L14.915 9.85985Z"
        fill="#FAFAFA"
      />
    </svg>
  );

  const StarIcon = () => (
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
      <path
        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97938L9 0Z"
        fill="#FFBA1F"
      />
    </svg>
  );

  return (
    <div
      className="flex flex-col items-center flex-shrink-0 w-full h-full"
      style={{
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(12px)",
        width: "381px",
        height: "257px",
        padding: "0 16px 16px 16px",
        gap: "16px",
        flexShrink: 0,
      }}
    >
      {/* Header Section */}
      <div className="w-full py-4 border-b border-[rgba(235,239,245,0.12)] flex flex-col gap-3">
        {/* App Info Row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 flex-1">
            {/* App Icon */}
            <div
              className="flex items-center justify-center p-2.5 rounded-full border-2"
              style={{
                backgroundColor: "#FAFAFA",
                borderColor: "rgba(255, 255, 255, 0.08)",
                width: "56px",
                height: "56px",
              }}
            >
              <SlackIcon />
            </div>

            {/* App Name and Category */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3
                  className="text-xl font-medium text-[#FAFAFA] whitespace-nowrap"
                  style={{ fontFamily: "Urbanist" }}
                >
                  {appName}
                </h3>
                {verified && <VerifyIcon />}
              </div>
              <p
                className="text-xs text-[#A1A1AA] whitespace-nowrap"
                style={{ fontFamily: "Poppins" }}
              >
                {category}
              </p>
            </div>
          </div>
        </div>

        {/* Description and Offer */}
        <div className="flex flex-col gap-3 w-full">
          <p
            className="text-xs text-[#A1A1AA] w-full leading-normal"
            style={{ fontFamily: "Poppins" }}
          >
            {description}
          </p>

          {/* Discount Badge */}
          <div
            className="flex items-center justify-between px-3 py-2 rounded-full w-full"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <span
              className="text-sm font-medium text-[#FAFAFA]"
              style={{ fontFamily: "Poppins" }}
            >
              {discountPercentage}
            </span>
            <span
              className="text-sm text-[#E4E4E7]"
              style={{ fontFamily: "Poppins" }}
            >
              {savingsAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center gap-6 w-full">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarIcon />
          <span
            className="text-sm font-medium text-[#E4E4E7] whitespace-nowrap"
            style={{ fontFamily: "Plus Jakarta Sans", lineHeight: "21px" }}
          >
            {rating}
          </span>
        </div>

        {/* Redeem Button */}
        <button
          className="flex-1 flex items-center justify-center px-3 py-2 rounded-full text-[#09090B] hover:text-white text-base bg-[#FAFAFA] hover:bg-gradient-to-b hover:from-[#501BD6] hover:to-[#7F57E2] transition-all duration-200"
          style={{
            fontFamily: "Poppins",
            lineHeight: "24px",
          }}
        >
          Redeem
        </button>
      </div>
    </div>
  );
};

export default Pick;
