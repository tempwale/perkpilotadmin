import { ChevronDown, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type Props = {
  topTagline?: string;
  mainHeadline?: string;
  subHeadline?: string;
  ctaText?: string;
  ctaLink?: string;
  onImageChange?: (file: File | null) => void;
  tags?: string[];
  onChange?: (fields: {
    topTagline: string;
    mainHeadline: string;
    subHeadline: string;
    ctaText?: string;
    ctaLink?: string;
    tags: string[];
  }) => void;
  open?: boolean;
  onToggleOpen?: (next: boolean) => void;
};

export default function HeroSectionManagement({
  topTagline,
  mainHeadline,
  subHeadline,
  ctaText,
  ctaLink,
  onImageChange,
  tags,
  onChange,
  open: openProp,
  onToggleOpen,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(true);

  // fields internal state
  const [internalTop, setInternalTop] = useState(
    topTagline ?? "For Expert Insights"
  );
  const [internalMain, setInternalMain] = useState(
    mainHeadline ?? "Software Deals"
  );
  const [internalSub, setInternalSub] = useState(
    subHeadline ??
      "In-depth reviews, comparisons, and insights about the latest software tools and productivity solutions."
  );
  const [internalTags, setInternalTags] = useState<string[]>(
    tags ?? ["AI Tools", "No-code", "Marketing"]
  );
  const [internalCtaText, setInternalCtaText] = useState<string>(ctaText ?? "");
  const [internalCtaLink, setInternalCtaLink] = useState<string>(ctaLink ?? "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const loadingImageRef = useRef<HTMLImageElement | null>(null);

  // cleanup preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      if (loadingImageRef.current) {
        loadingImageRef.current.onload = null;
        loadingImageRef.current.onerror = null;
        loadingImageRef.current = null;
      }
    };
  }, [previewUrl]);

  // sync prop -> internal when props change
  useEffect(() => {
    if (topTagline !== undefined) setInternalTop(topTagline);
  }, [topTagline]);
  useEffect(() => {
    if (mainHeadline !== undefined) setInternalMain(mainHeadline);
  }, [mainHeadline]);
  useEffect(() => {
    if (subHeadline !== undefined) setInternalSub(subHeadline);
  }, [subHeadline]);
  useEffect(() => {
    if (tags !== undefined) setInternalTags(tags);
  }, [tags]);

  // sync CTA props when they change
  useEffect(() => {
    if (ctaText !== undefined) setInternalCtaText(ctaText);
  }, [ctaText]);

  useEffect(() => {
    if (ctaLink !== undefined) setInternalCtaLink(ctaLink);
  }, [ctaLink]);

  const open = openProp ?? internalOpen;

  function toggleOpen() {
    const next = !open;
    if (openProp === undefined) setInternalOpen(next);
    if (onToggleOpen) onToggleOpen(next);
  }

  // notify parent when fields change
  useEffect(() => {
    if (onChange)
      onChange({
        topTagline: internalTop,
        mainHeadline: internalMain,
        subHeadline: internalSub,
        ctaText: internalCtaText,
        ctaLink: internalCtaLink,
        tags: internalTags,
      });
  }, [
    internalTop,
    internalMain,
    internalSub,
    internalCtaText,
    internalCtaLink,
    internalTags,
  ]);

  return (
    <div className="w-full p-4 bg-zinc-800 rounded-2xl flex flex-col justify-start items-start gap-6">
      <div className="self-stretch pb-4 border-b border-zinc-700 inline-flex justify-between items-center">
        <div className="text-neutral-50 text-xl font-medium leading-loose">
          Hero Section Management
        </div>

        <button
          type="button"
          aria-expanded={open}
          onClick={toggleOpen}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-zinc-700/20 focus:outline-none focus:ring-2 focus:ring-[#7f57e2]"
          aria-label={open ? "Collapse hero section" : "Expand hero section"}
        >
          <ChevronDown
            className={`text-zinc-400 transition-transform duration-150 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {open && (
        <>
          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Top Tagline
            </label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
              value={internalTop}
              onChange={(e) => setInternalTop(e.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Main Headline
            </label>
            <input
              className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
              value={internalMain}
              onChange={(e) => setInternalMain(e.target.value)}
            />
          </div>

          <div className="self-stretch flex flex-col justify-center items-start gap-3">
            <label className="text-neutral-50 text-sm font-medium">
              Sub-Headline ( Body )
            </label>
            <textarea
              className="self-stretch h-24 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
              value={internalSub}
              onChange={(e) => setInternalSub(e.target.value)}
            />
          </div>
          <div className="flex flex-row w-full justify-between gap-6">
            <div className="self-stretch w-full flex flex-col gap-3">
              <label className="text-neutral-50 text-sm font-medium">
                Primary CTA Button Text
              </label>
              <input
                className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
                value={internalCtaText}
                onChange={(e) => setInternalCtaText(e.target.value)}
              />
            </div>
            <div className="self-stretch w-full flex flex-col justify-center items-start gap-3">
              <label className="text-neutral-50 text-sm font-medium ">
                Primary CTA Button Link
              </label>
              <input
                className="self-stretch h-12 pl-4 pr-4 py-3 bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 text-zinc-200"
                value={internalCtaLink}
                onChange={(e) => setInternalCtaLink(e.target.value)}
              />
            </div>
          </div>
          <div
            data-layer="The main button for users to proceed with the tool"
            className="TheMainButtonForUsersToProceedWithTheTool justify-start pl-2 text-neutral-50 text-[12px] font-medium "
          >
            The main button for users to proceed with the tool
          </div>
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 self-stretch pb-4 inline-flex flex-col justify-center items-start gap-3"
          >
            <div
              data-layer="Hero Image"
              className="HeroImage justify-start text-neutral-50 text-sm font-medium "
            >
              Hero Image
            </div>
            <div className="Uploaded self-stretch h-14 flex flex-col justify-start items-center gap-2">
              <div className="Frame1321315243 self-stretch flex-1 bg-zinc-800 rounded-xl flex flex-col justify-center items-start gap-6">
                <label className="sr-only" htmlFor="hero-image-input">
                  Upload hero image
                </label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    const el = document.getElementById(
                      "hero-image-input"
                    ) as HTMLInputElement | null;
                    el?.click();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      const el = document.getElementById(
                        "hero-image-input"
                      ) as HTMLInputElement | null;
                      el?.click();
                    }
                  }}
                  className="Frame1321315108 self-stretch flex-1 px-4 py-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-700 inline-flex justify-center items-center gap-3 cursor-pointer"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="hero preview"
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
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
                  )}
                  <div className="UploadLogo text-center justify-start text-neutral-50 text-xs font-medium">
                    {previewUrl ? "Change" : "Upload"}
                  </div>
                  <input
                    id="hero-image-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      if (!f) {
                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                        setSelectedFile(null);
                        setUploadProgress(null);
                        if (onImageChange) onImageChange(null);
                        return;
                      }
                      // revoke previous preview to avoid leaks
                      if (previewUrl) URL.revokeObjectURL(previewUrl);
                      const url = URL.createObjectURL(f);
                      setSelectedFile(f);
                      setPreviewUrl(url);
                      setUploadProgress(0);

                      // simulate upload progress until the image actually loads
                      if (progressTimerRef.current) {
                        clearInterval(progressTimerRef.current);
                        progressTimerRef.current = null;
                      }
                      progressTimerRef.current = window.setInterval(() => {
                        setUploadProgress((p) => {
                          if (p === null) return 1;
                          const next = Math.min(
                            95,
                            p + Math.floor(Math.random() * 10) + 5
                          );
                          return next;
                        });
                      }, 300);

                      // finalize progress when the image element finishes loading
                      const img = new Image();
                      loadingImageRef.current = img;
                      img.onload = () => {
                        if (progressTimerRef.current) {
                          clearInterval(progressTimerRef.current);
                          progressTimerRef.current = null;
                        }
                        setUploadProgress(100);
                        // small delay to allow CSS transition
                        setTimeout(() => setUploadProgress(null), 600);
                        if (onImageChange) onImageChange(f);
                        loadingImageRef.current = null;
                      };
                      img.onerror = () => {
                        if (progressTimerRef.current) {
                          clearInterval(progressTimerRef.current);
                          progressTimerRef.current = null;
                        }
                        setUploadProgress(null);
                        loadingImageRef.current = null;
                      };
                      img.src = url;
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              data-layer="Uploaded"
              data-property-1="Variant2"
              className="Uploaded self-stretch flex flex-col justify-start items-center gap-2"
            >
              <div
                data-layer="Frame 1321315109"
                className="Frame1321315109 self-stretch inline-flex justify-between items-start flex-wrap content-start"
              >
                <div
                  data-layer="Frame 1321315114"
                  className="Frame1321315114 flex justify-start items-center gap-3"
                >
                  <div
                    data-layer="image icon"
                    className="ImageIcon p-2 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] inline-flex flex-col justify-center items-center gap-2 overflow-hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                    >
                      <path
                        d="M17.8125 0H1.3125C0.964403 0 0.630564 0.138281 0.384422 0.384422C0.138281 0.630564 0 0.964403 0 1.3125V14.8125C0 15.1606 0.138281 15.4944 0.384422 15.7406C0.630564 15.9867 0.964403 16.125 1.3125 16.125H17.8125C18.1606 16.125 18.4944 15.9867 18.7406 15.7406C18.9867 15.4944 19.125 15.1606 19.125 14.8125V1.3125C19.125 0.964403 18.9867 0.630564 18.7406 0.384422C18.4944 0.138281 18.1606 0 17.8125 0ZM1.3125 1.125H17.8125C17.8622 1.125 17.9099 1.14475 17.9451 1.17992C17.9802 1.21508 18 1.26277 18 1.3125V11.3972L15.2372 8.63438C15.1153 8.51248 14.9706 8.41579 14.8114 8.34983C14.6521 8.28386 14.4814 8.24991 14.3091 8.24991C14.1367 8.24991 13.966 8.28386 13.8068 8.34983C13.6475 8.41579 13.5028 8.51248 13.3809 8.63438L11.3728 10.6425L7.11563 6.38437C6.99375 6.26248 6.84905 6.16579 6.6898 6.09983C6.53055 6.03386 6.35987 5.99991 6.1875 5.99991C6.01513 5.99991 5.84445 6.03386 5.6852 6.09983C5.52595 6.16579 5.38125 6.26248 5.25937 6.38437L1.125 10.5187V1.3125C1.125 1.26277 1.14475 1.21508 1.17992 1.17992C1.21508 1.14475 1.26277 1.125 1.3125 1.125ZM1.125 14.8125V12.1097L6.05438 7.18031C6.07181 7.16274 6.09254 7.14879 6.11539 7.13927C6.13824 7.12975 6.16275 7.12485 6.1875 7.12485C6.21225 7.12485 6.23676 7.12975 6.25961 7.13927C6.28246 7.14879 6.30319 7.16274 6.32062 7.18031L14.1403 15H1.3125C1.26277 15 1.21508 14.9802 1.17992 14.9451C1.14475 14.9099 1.125 14.8622 1.125 14.8125ZM17.8125 15H15.7313L12.1688 11.4375L14.1759 9.42937C14.1934 9.41194 14.214 9.39811 14.2368 9.38868C14.2596 9.37924 14.284 9.37438 14.3086 9.37438C14.3332 9.37438 14.3576 9.37924 14.3804 9.38868C14.4032 9.39811 14.4238 9.41194 14.4412 9.42937L18.0037 12.9919V14.8125C18.0038 14.8374 17.9988 14.8621 17.9891 14.8851C17.9795 14.9081 17.9653 14.929 17.9475 14.9464C17.9297 14.9639 17.9086 14.9776 17.8854 14.9868C17.8622 14.996 17.8374 15.0005 17.8125 15ZM11.25 5.4375C11.25 5.25208 11.305 5.07082 11.408 4.91665C11.511 4.76248 11.6574 4.64232 11.8287 4.57136C12 4.50041 12.1885 4.48184 12.3704 4.51801C12.5523 4.55419 12.7193 4.64348 12.8504 4.77459C12.9815 4.9057 13.0708 5.07275 13.107 5.2546C13.1432 5.43646 13.1246 5.62496 13.0536 5.79627C12.9827 5.96757 12.8625 6.11399 12.7083 6.217C12.5542 6.32002 12.3729 6.375 12.1875 6.375C11.9389 6.375 11.7004 6.27623 11.5246 6.10041C11.3488 5.9246 11.25 5.68614 11.25 5.4375Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <div
                    data-layer="Frame 1321315110"
                    className="Frame1321315110 inline-flex flex-col justify-start items-start gap-1"
                  >
                    <div
                      data-layer="upl2345678.jpeg"
                      className="Upl2345678Jpeg justify-start text-neutral-50 text-sm font-medium  leading-[21px]"
                    >
                      {selectedFile ? selectedFile.name : "No file"}
                    </div>
                    <div
                      data-layer="4.3 MB"
                      className="3Mb justify-start text-zinc-400 text-xs font-medium  leading-[18px]"
                    >
                      {selectedFile
                        ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="BasilCrossSolid flex justify-center items-center w-6 h-6 relative bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[100px] overflow-hidden">
                  <button
                    type="button"
                    aria-label="Remove uploaded image"
                    onClick={() => {
                      if (previewUrl) URL.revokeObjectURL(previewUrl);
                      setPreviewUrl(null);
                      if (onImageChange) onImageChange(null);
                    }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <X className="text-white w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="Frame1171275912 self-stretch h-[26px] p-1 inline-flex justify-start items-center gap-1">
                <div className="Frame1171275749 flex-1 inline-flex flex-col justify-start items-start gap-1">
                  <div className="w-full bg-neutral-50 rounded h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] transition-all"
                      style={{
                        width:
                          uploadProgress != null
                            ? `${uploadProgress}%`
                            : previewUrl
                            ? `100%`
                            : `0%`,
                      }}
                    />
                  </div>
                </div>
                <div className="justify-start text-zinc-400 text-xs font-medium font-['Inter'] leading-[18px]">
                  {uploadProgress != null
                    ? `${uploadProgress}%`
                    : previewUrl
                    ? `100%`
                    : `0%`}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
