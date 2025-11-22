import type { ReactElement } from "react";

interface ReviewPageManagementHeaderProps {
  onPreview?: () => void;
  onSavePublish?: () => void;
  saving?: boolean;
}

export default function ReviewPageManagementHeader({
  onPreview,
  onSavePublish,
  saving = false,
}: ReviewPageManagementHeaderProps): ReactElement {
  return (
    <div className="box-border flex flex-row items-center pb-4 gap-2 w-[1084px] h-[77px] border-b border-[#3F3F46]">
      <div className="flex flex-col items-start p-0 gap-2 w-[538px] h-[61px] flex-none order-0 grow">
        <div className="w-[538px] h-[29px] font-['Urbanist'] font-semibold text-2xl leading-[29px] text-[#FAFAFA]">
          Review Page Management
        </div>
        <div className="w-[538px] h-6 font-['Poppins'] font-normal text-base leading-6 text-[#A1A1AA]">
          Control overall setting for the review page.
        </div>
      </div>
      <div className="flex flex-row items-center p-0 gap-4 w-[538px] h-12 flex-none order-1 grow">
        <button
          onClick={onPreview}
          className="flex flex-row justify-center items-center px-3 py-2 gap-2.5 w-[261px] h-12 bg-white/8 rounded-xl flex-none order-0 grow"
        >
          <div className="w-[62px] h-6 font-['Poppins'] font-normal text-base leading-6 text-[#FAFAFA]">
            Preview
          </div>
        </button>
        <button
          onClick={onSavePublish}
          disabled={saving}
          className="flex flex-row justify-center items-center px-3 py-2 gap-2.5 w-[261px] h-12 bg-linear-to-b from-[#501BD6] to-[#7F57E2] rounded-xl flex-none order-1 grow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-[117px] h-6 font-['Poppins'] font-normal text-base leading-6 text-[#FAFAFA]">
            {saving ? "Saving..." : "Save & Publish"}
          </div>
        </button>
      </div>
    </div>
  );
}
