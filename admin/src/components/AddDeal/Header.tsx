type Props = {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  className?: string;
};

export default function Header({
  title = "Tool Comparison Blog",
  onBack,
  showBack = true,
  className = "",
}: Props) {
  return (
    <div
      data-layer="Container"
      className={`Container pb-4 border-b border-zinc-800 inline-flex justify-start items-center gap-4 ${className}`}
    >
      {showBack && (
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="SolarArrowUpOutline w-[32px]  h-[32px] px-[5px] py-[3px]  bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] flex justify-center items-center gap-2.5 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.21934 7.29865C0.0788896 7.15802 0 6.9674 0 6.76865C0 6.56989 0.0788896 6.37927 0.21934 6.23865L6.21934 0.238645C6.288 0.164958 6.3708 0.105856 6.4628 0.0648642C6.5548 0.0238724 6.65412 0.00183105 6.75482 5.43594e-05C6.85552 -0.00172234 6.95555 0.0168018 7.04894 0.0545225C7.14233 0.0922432 7.22716 0.148389 7.29838 0.219607C7.3696 0.290826 7.42574 0.37566 7.46346 0.469049C7.50118 0.562437 7.51971 0.662464 7.51793 0.763167C7.51616 0.863871 7.49411 0.963185 7.45312 1.05518C7.41213 1.14718 7.35303 1.22998 7.27934 1.29865L2.55934 6.01865L16.7493 6.01865C16.9483 6.01865 17.139 6.09766 17.2797 6.23832C17.4203 6.37897 17.4993 6.56973 17.4993 6.76865C17.4993 6.96756 17.4203 7.15832 17.2797 7.29897C17.139 7.43963 16.9483 7.51865 16.7493 7.51865L2.55934 7.51865L7.27934 12.2386C7.35303 12.3073 7.41213 12.3901 7.45312 12.4821C7.49411 12.5741 7.51616 12.6734 7.51793 12.7741C7.51971 12.8748 7.50118 12.9749 7.46346 13.0682C7.42574 13.1616 7.3696 13.2465 7.29838 13.3177C7.22716 13.3889 7.14233 13.445 7.04894 13.4828C6.95555 13.5205 6.85552 13.539 6.75482 13.5372C6.65412 13.5355 6.5548 13.5134 6.4628 13.4724C6.3708 13.4314 6.288 13.3723 6.21934 13.2986L0.21934 7.29865Z"
              fill="white"
            />
          </svg>
        </button>
      )}

      <div
        data-layer="Frame 2147205568"
        className="Frame2147205568 w-[671px] inline-flex flex-col justify-start items-start gap-2"
      >
        <div
          data-layer="Frame 2147205571"
          className="Frame2147205571 self-stretch flex flex-col justify-start items-start gap-1"
        >
          <div
            data-layer="Tool Comparison Blog"
            className="ToolComparisonBlog self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
