import { type ReactElement } from "react";

interface FooterActionsProps {
  onSaveDraft?: () => void;
  onSavePublish?: () => void;
  saving?: boolean;
}

export default function FooterActions({
  onSaveDraft,
  onSavePublish,
  saving = false,
}: FooterActionsProps): ReactElement {
  return (
    <div className="w-full inline-flex justify-start items-center gap-4">
      <button
        onClick={onSaveDraft}
        disabled={saving}
        className="flex-1 h-12 px-3 py-2 rounded-lg outline-1 -outline-offset-1 outline-neutral-50 flex justify-center items-center transition-colors duration-150 hover:bg-zinc-700/30 focus:outline-none focus:ring-2 focus:ring-[#7f57e2] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="text-neutral-50 text-base">
          {saving ? "Saving..." : "Save Draft"}
        </div>
      </button>
      <button
        onClick={onSavePublish}
        disabled={saving}
        className="flex-1 h-12 px-3 py-2 bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-lg flex justify-center items-center transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7f57e2] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="text-white text-base">
          {saving ? "Saving..." : "Save & Publish"}
        </div>
      </button>
    </div>
  );
}
