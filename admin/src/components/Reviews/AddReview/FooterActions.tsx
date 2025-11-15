type Props = {
  onSaveDraft?: () => void;
  onSaveAndPublish?: () => void;
};

export default function FooterActions({
  onSaveDraft,
  onSaveAndPublish,
}: Props) {
  return (
    <div className="w-full inline-flex justify-start items-center gap-4">
      <button
        type="button"
        onClick={onSaveDraft}
        className="flex-1 h-12 px-3 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-50 flex justify-center items-center transition-colors duration-150 hover:bg-zinc-700/30 focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
      >
        <div className="text-neutral-50 text-base">Save Draft</div>
      </button>
      <button
        type="button"
        onClick={onSaveAndPublish}
        className="flex-1 h-12 px-3 py-2 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-lg flex justify-center items-center transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
      >
        <div className="text-white text-base">Save & Publish</div>
      </button>
    </div>
  );
}
