import { useEffect, useState } from "react";

type Props = {
  numberValue?: string | number;
  onNumberChange?: (value: string) => void;
  message?: string;
  onMessageChange?: (value: string) => void;
  onDelete?: () => void;
};

export default function StatsCard({
  numberValue,
  onNumberChange,
  message,
  onMessageChange,
  onDelete,
}: Props) {
  const [localNumber, setLocalNumber] = useState<string>(
    numberValue != null ? String(numberValue) : ""
  );
  const [localMessage, setLocalMessage] = useState<string>(message ?? "");

  useEffect(() => {
    if (numberValue != null) setLocalNumber(String(numberValue));
  }, [numberValue]);

  useEffect(() => {
    if (message != null) setLocalMessage(message);
  }, [message]);

  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setLocalNumber(v);
    if (onNumberChange) onNumberChange(v);
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setLocalMessage(v);
    if (onMessageChange) onMessageChange(v);
  }

  function handleDelete() {
    if (onDelete) onDelete();
  }

  return (
    <div
      data-layer="Row"
      className="Row self-stretch py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-zinc-700 inline-flex justify-start items-center overflow-hidden"
    >
      <div
        data-layer="Column"
        className="Column self-stretch px-4 py-3 rounded-xl inline-flex flex-col justify-center items-start gap-3"
      >
        <div
          data-layer="Frame 2147205991"
          className="Frame2147205991 inline-flex justify-start items-center"
        >
          <div
            data-layer="charm:menu-kebab"
            className="CharmMenuKebab w-6 h-6 relative overflow-hidden"
            aria-hidden
          >
            <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[2.62px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400" />
            <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[10.88px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400" />
            <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[19.12px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400" />
          </div>
          <div
            data-layer="charm:menu-kebab"
            className="CharmMenuKebab w-6 h-6 relative overflow-hidden"
            aria-hidden
          >
            <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[2.62px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400" />
            <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[10.88px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400" />
            <div className="Vector w-[2.25px] h-[2.25px] left-[10.88px] top-[19.12px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-zinc-400" />
          </div>
        </div>
      </div>
      <div
        data-layer="Frame 2147205992"
        className="Frame2147205992 flex-1 inline-flex flex-col justify-center items-start gap-2"
      >
        <div
          data-layer="Frame 2147205559"
          className="Frame2147205559 self-stretch flex flex-col justify-center items-start gap-2"
        >
          <div
            data-layer="Number"
            className="Number justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Number{" "}
          </div>
          <div
            data-layer="Input"
            className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden"
          >
            <label htmlFor="stats-number" className="sr-only">
              Number
            </label>
            <input
              id="stats-number"
              value={localNumber}
              onChange={handleNumberChange}
              placeholder="e.g. 2000+"
              className="w-full bg-transparent text-neutral-50 placeholder:text-zinc-400 text-base font-normal font-['Poppins'] outline-none"
            />
          </div>
        </div>
        <div
          data-layer="Frame 2147205560"
          className="Frame2147205560 self-stretch flex flex-col justify-center items-start gap-2"
        >
          <div
            data-layer="Message Body"
            className="MessageBody justify-start text-neutral-50 text-sm font-medium font-['Poppins']"
          >
            Message Body
          </div>
          <div
            data-layer="Input"
            className="Input self-stretch h-12 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline outline-1 outline-offset-[-0.50px] outline-zinc-700 inline-flex justify-start items-center flex-wrap content-center overflow-hidden"
          >
            <label htmlFor="stats-message" className="sr-only">
              Message body
            </label>
            <input
              id="stats-message"
              value={localMessage}
              onChange={handleMessageChange}
              placeholder="Deals Saved"
              className="w-full bg-transparent text-neutral-50 placeholder:text-zinc-400 text-base font-normal font-['Poppins'] outline-none"
            />
          </div>
        </div>
      </div>
      <div
        data-layer="Column"
        className="Column self-stretch px-4 py-3 flex justify-start items-center gap-4"
      >
        <button
          type="button"
          aria-label="Delete stat"
          onClick={handleDelete}
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
        </button>
      </div>
    </div>
  );
}
