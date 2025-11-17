import { useState, type ReactElement } from "react";

type Props = {
  onSave?: (publish: boolean) => Promise<void>;
};

export default function FooterActions({ onSave }: Props): ReactElement {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDraft = async (): Promise<void> => {
    if (!onSave) return;
    try {
      setIsSaving(true);
      await onSave(false);
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndPublish = async (): Promise<void> => {
    if (!onSave) return;
    try {
      setIsSaving(true);
      await onSave(true);
    } catch (error) {
      console.error("Error saving and publishing:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full inline-flex justify-start items-center gap-4">
      <button
        onClick={handleSaveDraft}
        disabled={isSaving}
        className="flex-1 h-12 px-3 py-2 rounded-lg outline-1 -outline-offset-1 outline-neutral-50 flex justify-center items-center transition-colors duration-150 hover:bg-zinc-700/30 focus:outline-none focus:ring-2 focus:ring-[#7f57e2] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="text-neutral-50 text-base">{isSaving ? "Saving..." : "Save Draft"}</div>
      </button>
      <button
        onClick={handleSaveAndPublish}
        disabled={isSaving}
        className="flex-1 h-12 px-3 py-2 bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-lg flex justify-center items-center transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7f57e2] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="text-white text-base">{isSaving ? "Saving..." : "Save & Publish"}</div>
      </button>
    </div>
  );
}
