import { useEffect, useRef, useState } from "react";

type Props = {
  onImageChange?: (file: File | null) => void;
};

export default function UploadIcon({ onImageChange }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
        imgRef.current = null;
      }
    };
  }, [previewUrl]);

  function handleFileInput(f: File | null) {
    if (!f) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setFile(null);
      setProgress(null);
      if (onImageChange) onImageChange(null);
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(f);
    setPreviewUrl(url);
    setFile(f);
    setProgress(0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p === null) return 1;
        const next = Math.min(95, p + Math.floor(Math.random() * 10) + 5);
        return next;
      });
    }, 300);

    const image = new Image();
    imgRef.current = image;
    image.onload = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setProgress(100);
      setTimeout(() => setProgress(null), 600);
      if (onImageChange) onImageChange(f);
      imgRef.current = null;
    };
    image.onerror = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setProgress(null);
      imgRef.current = null;
    };
    image.src = url;
  }

  return (
    <div
      data-layer="Row"
      className="Row self-stretch w-full py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-zinc-700 inline-flex justify-start items-center overflow-hidden"
    >
      <div
        data-layer="Column"
        className="Column h-[226px] px-4 py-3 rounded-xl inline-flex flex-col justify-center items-start gap-3"
      >
        <div
          data-layer="Frame 2147205991"
          className="Frame2147205991 inline-flex justify-start items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 4.875C12.6213 4.875 13.125 4.37132 13.125 3.75C13.125 3.12868 12.6213 2.625 12 2.625C11.3787 2.625 10.875 3.12868 10.875 3.75C10.875 4.37132 11.3787 4.875 12 4.875Z"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 13.125C12.6213 13.125 13.125 12.6213 13.125 12C13.125 11.3787 12.6213 10.875 12 10.875C11.3787 10.875 10.875 11.3787 10.875 12C10.875 12.6213 11.3787 13.125 12 13.125Z"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 21.375C12.6213 21.375 13.125 20.8713 13.125 20.25C13.125 19.6287 12.6213 19.125 12 19.125C11.3787 19.125 10.875 19.6287 10.875 20.25C10.875 20.8713 11.3787 21.375 12 21.375Z"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 4.875C12.6213 4.875 13.125 4.37132 13.125 3.75C13.125 3.12868 12.6213 2.625 12 2.625C11.3787 2.625 10.875 3.12868 10.875 3.75C10.875 4.37132 11.3787 4.875 12 4.875Z"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 13.125C12.6213 13.125 13.125 12.6213 13.125 12C13.125 11.3787 12.6213 10.875 12 10.875C11.3787 10.875 10.875 11.3787 10.875 12C10.875 12.6213 11.3787 13.125 12 13.125Z"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 21.375C12.6213 21.375 13.125 20.8713 13.125 20.25C13.125 19.6287 12.6213 19.125 12 19.125C11.3787 19.125 10.875 19.6287 10.875 20.25C10.875 20.8713 11.3787 21.375 12 21.375Z"
              stroke="#A1A1AA"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        data-layer="Frame 2147223627"
        className="Frame2147223627 flex-1 inline-flex flex-col justify-start items-start gap-2"
      >
        <div
          data-layer="Frame 2147205559"
          className="Frame2147205559 self-stretch pb-4 flex flex-col justify-center items-start gap-3"
        >
          <div
            data-layer="Icon"
            className="Icon justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Icon
          </div>
          <div
            data-layer="Uploaded"
            data-property-1="Default"
            className="Uploaded self-stretch h-14 flex flex-col justify-start items-center gap-2"
          >
            <div
              data-layer="Frame 1321315243"
              className="Frame1321315243 self-stretch flex-1 bg-zinc-800 rounded-xl flex flex-col justify-center items-start gap-6"
            >
              <label className="sr-only" htmlFor="upload-icon-input">
                Upload icon
              </label>
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  document.getElementById("upload-icon-input")?.click()
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    document.getElementById("upload-icon-input")?.click();
                  }
                }}
                className="Frame1321315108 self-stretch flex-1 px-4 py-2.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-700 inline-flex justify-center items-center gap-3 cursor-pointer"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="upload preview"
                    className="w-5 h-5 object-cover rounded"
                  />
                ) : (
                  <div className="ElUpload w-5 h-5 relative overflow-hidden">
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
                  </div>
                )}
                <div
                  data-layer="Upload Logo"
                  className="UploadLogo text-center justify-start text-neutral-50 text-xs font-medium font-['Poppins']"
                >
                  {previewUrl ? "Change" : "Upload"}
                </div>
                <input
                  id="upload-icon-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    handleFileInput(f);
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
                  <div
                    data-layer="Vector"
                    className="Vector w-[19.12px] h-[16.12px]"
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
                </div>
                <div
                  data-layer="Frame 1321315110"
                  className="Frame1321315110 inline-flex flex-col justify-start items-start gap-1"
                >
                  <div
                    data-layer="upl2345678.jpeg"
                    className="Upl2345678Jpeg justify-start text-neutral-50 text-sm font-medium font-['Inter'] leading-[21px]"
                  >
                    {file ? file.name : "No file"}
                  </div>
                  <div
                    data-layer="4.3 MB"
                    className="3Mb justify-start text-zinc-400 text-xs font-medium font-['Inter'] leading-[18px]"
                  >
                    {file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "-"}
                  </div>
                </div>
              </div>
              <div
                data-layer="basil:cross-solid"
                className="BasilCrossSolid w-6 h-6 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                >
                  <path
                    d="M8.36971 1.29971C8.44137 1.23056 8.49855 1.14783 8.5379 1.05634C8.57725 0.964857 8.59798 0.866452 8.59889 0.766868C8.5998 0.667285 8.58088 0.568516 8.54321 0.476327C8.50554 0.384137 8.44989 0.300372 8.37951 0.22992C8.30912 0.159467 8.22541 0.103738 8.13325 0.0659841C8.0411 0.02823 7.94235 0.00920731 7.84276 0.0100254C7.74318 0.0108435 7.64476 0.0314862 7.55323 0.0707492C7.46171 0.110012 7.37893 0.167109 7.30971 0.238708L4.30371 3.24371L1.29871 0.238708C1.23005 0.165022 1.14725 0.105919 1.05525 0.0649275C0.963247 0.0239355 0.863934 0.0018935 0.763231 0.00011672C0.662528 -0.00166006 0.562499 0.0168648 0.469111 0.0545858C0.375723 0.0923068 0.290889 0.148451 0.21967 0.21967C0.148451 0.290889 0.0923068 0.375722 0.0545858 0.46911C0.0168648 0.562499 -0.00166006 0.662528 0.00011672 0.763231C0.0018935 0.863934 0.0239355 0.963247 0.0649275 1.05525C0.105919 1.14725 0.165022 1.23005 0.238708 1.29871L3.24171 4.30471L0.236709 7.30971C0.104229 7.45188 0.0321051 7.63993 0.0355333 7.83423C0.0389615 8.02853 0.117674 8.21392 0.255087 8.35133C0.3925 8.48874 0.577885 8.56745 0.772186 8.57088C0.966487 8.57431 1.15453 8.50219 1.29671 8.36971L4.30371 5.36471L7.30871 8.37071C7.45088 8.50319 7.63893 8.57531 7.83323 8.57188C8.02753 8.56846 8.21292 8.48974 8.35033 8.35233C8.48774 8.21492 8.56645 8.02953 8.56988 7.83523C8.57331 7.64093 8.50119 7.45288 8.36871 7.31071L5.36571 4.30471L8.36971 1.29971Z"
                    fill="#FAFAFA"
                  />
                </svg>
              </div>
            </div>
            <div className="Frame1171275912 self-stretch h-[26px] p-1 inline-flex justify-start items-center gap-1">
              <div className="Frame1171275749 flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="w-full bg-neutral-50 rounded h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 bg-gradient-to-b from-[#501bd6] to-[#7f57e2] transition-all"
                    style={{
                      width:
                        progress != null
                          ? `${progress}%`
                          : previewUrl
                          ? `100%`
                          : `0%`,
                    }}
                  />
                </div>
              </div>
              <div className="justify-start text-zinc-400 text-xs font-medium font-['Inter'] leading-[18px]">
                {progress != null ? `${progress}%` : previewUrl ? `100%` : `0%`}
              </div>
            </div>
          </div>
        </div>
        <div
          data-layer="Frame 2147205992"
          className="Frame2147205992 self-stretch flex flex-col justify-center items-start gap-2"
        >
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
          >
            <div
              data-layer="Discount Percentage"
              className="DiscountPercentage justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Discount Percentage
            </div>
            <div
              data-layer="Input"
              className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden"
            >
              <div
                data-layer="Frame 13"
                className="Frame13 left-[16px] top-[12px] absolute flex justify-start items-center gap-3"
              >
                <div
                  data-layer="Frame 1171275453"
                  className="Frame1171275453 flex justify-start items-center"
                >
                  <div
                    data-layer="e.g. 20%"
                    className="EG20 justify-start text-zinc-400 text-base font-normal font-['Poppins'] leading-normal"
                  >
                    e.g. 20%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-layer="Frame 2147205993"
          className="Frame2147205993 self-stretch flex flex-col justify-center items-start gap-2"
        >
          <div
            data-layer="Frame 2147205559"
            className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
          >
            <div
              data-layer="Deal link"
              className="DealLink justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Deal link
            </div>
            <div
              data-layer="Input"
              className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden"
            >
              <div
                data-layer="Frame 13"
                className="Frame13 left-[16px] top-[12px] absolute flex justify-start items-center gap-3"
              >
                <div
                  data-layer="Frame 1171275453"
                  className="Frame1171275453 flex justify-start items-center"
                >
                  <div
                    data-layer="https://..."
                    className="Https justify-start text-zinc-400 text-base font-normal font-['Poppins'] leading-normal"
                  >
                    https://...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-layer="Column"
        className="Column h-[226px] px-4 py-3 flex justify-start items-center gap-4"
      >
        <div
          data-layer="fluent:delete-16-regular"
          className="FluentDelete16Regular w-6 h-6 relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10.5 4.5H13.5C13.5 4.10218 13.342 3.72064 13.0607 3.43934C12.7794 3.15804 12.3978 3 12 3C11.6022 3 11.2206 3.15804 10.9393 3.43934C10.658 3.72064 10.5 4.10218 10.5 4.5ZM9 4.5C9 3.70435 9.31607 2.94129 9.87868 2.37868C10.4413 1.81607 11.2044 1.5 12 1.5C12.7956 1.5 13.5587 1.81607 14.1213 2.37868C14.6839 2.94129 15 3.70435 15 4.5H21C21.1989 4.5 21.3897 4.57902 21.5303 4.71967C21.671 4.86032 21.75 5.05109 21.75 5.25C21.75 5.44891 21.671 5.63968 21.5303 5.78033C21.3897 5.92098 21.1989 6 21 6H20.154L18.3465 19.257C18.2239 20.1554 17.78 20.979 17.0968 21.5752C16.4137 22.1714 15.5377 22.5 14.631 22.5H9.369C8.46228 22.5 7.58626 22.1714 6.90315 21.5752C6.22004 20.979 5.77609 20.1554 5.6535 19.257L3.846 6H3C2.80109 6 2.61032 5.92098 2.46967 5.78033C2.32902 5.63968 2.25 5.44891 2.25 5.25C2.25 5.05109 2.32902 4.86032 2.46967 4.71967C2.61032 4.57902 2.80109 4.5 3 4.5H9ZM10.5 9.75C10.5 9.55109 10.421 9.36032 10.2803 9.21967C10.1397 9.07902 9.94891 9 9.75 9C9.55109 9 9.36032 9.07902 9.21967 9.21967C9.07902 9.36032 9 9.55109 9 9.75V17.25C9 17.4489 9.07902 17.6397 9.21967 17.7803C9.36032 17.921 9.55109 18 9.75 18C9.94891 18 10.1397 17.921 10.2803 17.7803C10.421 17.6397 10.5 17.4489 10.5 17.25V9.75ZM14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V17.25C15 17.4489 14.921 17.6397 14.7803 17.7803C14.6397 17.921 14.4489 18 14.25 18C14.0511 18 13.8603 17.921 13.7197 17.7803C13.579 17.6397 13.5 17.4489 13.5 17.25V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9ZM7.14 19.0545C7.21361 19.5934 7.47997 20.0875 7.88977 20.4451C8.29956 20.8028 8.82506 20.9999 9.369 21H14.631C15.1752 21.0003 15.7011 20.8033 16.1112 20.4456C16.5213 20.0879 16.7879 19.5937 16.8615 19.0545L18.6405 6H5.3595L7.14 19.0545Z"
              fill="#A1A1AA"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
