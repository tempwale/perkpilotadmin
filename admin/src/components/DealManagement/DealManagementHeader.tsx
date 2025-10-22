type Props = {
  title?: string;
  subtitle?: string;
  onPreview?: () => void;
  onSave?: () => void;
};

export default function DealManagementHeader({
  title = "Deal Page Management",
  subtitle = "Control overall setting for the Deal page.",
  onPreview,
  onSave,
}: Props) {
  return (
    <div className="flex justify-center">
      <div className="p-4 bg-zinc-900 rounded-3xl inline-flex flex-col justify-center items-center gap-6 w-full">
        <div className="w-full pb-4 border-b border-zinc-700 inline-flex justify-start items-center gap-2">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="text-neutral-50 text-2xl font-semibold leading-[29px]">
              {title}
            </div>
            <div className="text-zinc-400 text-base">{subtitle}</div>
          </div>

          <div className="flex-1 h-12 flex justify-start items-center gap-4">
            <button
              type="button"
              onClick={() => onPreview && onPreview()}
              className="flex-1 h-12 px-3 py-2 bg-white/10 rounded-xl flex justify-center items-center gap-2.5 text-neutral-50 text-base transition-colors duration-150 ease-in-out hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => onSave && onSave()}
              className="flex-1 h-12 px-3 py-2 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-xl flex justify-center items-center text-neutral-50 text-base transition-transform duration-150 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#7f57e2] active:scale-100"
            >
              Save & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
