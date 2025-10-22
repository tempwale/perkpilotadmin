import React, { useRef, useState } from "react";
import HandshakeIcon from "../assets/icons/handshake";

type HeaderProps = {
  userName?: string;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
};

export default function Header({
  userName = "Admin",
  onSearch,
  onLogout,
}: HeaderProps) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const submitSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    } else if (e.key === "Escape") {
      setQuery("");
    }
  };

  const handleLogout = () => {
    setMenuOpen(false);
    if (onLogout) onLogout();
  };

  // simple blur handler to close menu when clicking outside
  const handleBlur = (e: React.FocusEvent) => {
    // if focus moved outside the menu container, close
    if (menuRef.current && !menuRef.current.contains(e.relatedTarget as Node)) {
      setMenuOpen(false);
    }
  };

  return (
    <header
      data-layer="Header"
      className="Header w-full h-[84px] px-6 py-4 bg-zinc-900 inline-flex justify-between items-center overflow-hidden"
    >
      <div className="flex flex-row  gap-2 items-center">
        <div
          data-layer="Label"
          className="Label justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-loose"
        >
          Good Morning!
        </div>
        <HandshakeIcon />
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          data-layer="Main/text-field"
          className="MainTextField w-[287px] h-12 relative bg-zinc-800 rounded-lg outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-center items-start gap-2.5"
        >
          <div
            data-layer="Frame 13"
            className="Frame13 left-[16px] top-[12px] absolute inline-flex justify-start items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M10.5423 19.2499C15.3518 19.2499 19.2507 15.3511 19.2507 10.5416C19.2507 5.73211 15.3518 1.83325 10.5423 1.83325C5.73284 1.83325 1.83398 5.73211 1.83398 10.5416C1.83398 15.3511 5.73284 19.2499 10.5423 19.2499Z"
                stroke="#E4E4E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.1673 20.1666L18.334 18.3333"
                stroke="#E4E4E7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              data-layer="Frame 1171275453"
              className="Frame1171275453 flex justify-start items-center"
            >
              <input
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {}}
                className="bg-transparent text-zinc-200 text-base font-normal font-['Poppins'] leading-normal outline-none"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div
          data-layer="Frame 1321314971"
          className="Frame1321314971 p-2 rounded-[100px] inline-flex justify-end items-center gap-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="23"
            viewBox="0 0 20 23"
            fill="none"
          >
            <path
              d="M7 21C8.5 22.3333 11.5 22.3333 13 21"
              stroke="#FAFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 0C10.5523 0 11 0.447715 11 1C11 1.01772 10.998 1.03524 10.9971 1.05273C11.9776 1.194 12.9406 1.61713 13.8008 2.25C13.1571 2.53108 12.6331 3.03198 12.3193 3.65723C11.6317 3.22145 10.9179 3.00003 10.2812 3H9.71875C8.65003 3.00016 7.36257 3.6203 6.35059 4.83984C5.36516 6.02744 4.79991 7.6056 4.9834 9.23535C5.1722 10.336 4.9294 11.2946 4.42773 12.0879C3.97663 12.8012 3.33955 13.3299 2.96387 13.6465C2.00283 14.4563 1.99733 14.5666 2 14.7656V14.792C2 15.2632 2.12327 15.4679 2.21582 15.5781C2.33423 15.719 2.57944 15.9064 3.08008 16.0674L3.13184 16.084L3.17969 16.1025H3.17871L3.18164 16.1035L3.18066 16.1025L3.18262 16.1035H3.18164C3.19149 16.107 3.20974 16.1134 3.23535 16.1221C3.2934 16.1417 3.39143 16.1736 3.52832 16.2139C3.80281 16.2946 4.23362 16.4089 4.8125 16.5254C5.97004 16.7583 7.72081 17 10 17C12.2791 17 14.0299 16.7582 15.1875 16.5254C15.7663 16.409 16.1972 16.2946 16.4717 16.2139C16.6089 16.1735 16.7076 16.1417 16.7656 16.1221C16.7902 16.1138 16.8074 16.1071 16.8174 16.1035L16.8184 16.1025V16.1035C16.8197 16.103 16.8212 16.1029 16.8223 16.1025H16.8203L16.8682 16.084L16.9199 16.0674C17.3985 15.9135 17.6499 15.7219 17.7773 15.5684C17.8831 15.4409 18 15.2289 18 14.793C18 14.5599 17.9695 14.4356 17.0225 13.6367C16.6487 13.3215 16.0132 12.7939 15.5645 12.0801C15.0647 11.2851 14.8278 10.3281 15.0166 9.23242C15.0633 8.816 15.0601 8.40305 15.0146 7.99902C15.7453 7.99553 16.413 7.7303 16.9316 7.29297C17.0582 8.00366 17.0893 8.74457 17 9.5C16.5001 11.9998 19.9993 12.1899 20 14.792L19.9883 15.1045C19.8732 16.6229 18.9085 17.5292 17.5322 17.9717C17.5214 17.9758 14.833 19 10 19C5.18761 19 2.50211 17.9844 2.46875 17.9717C1.00048 17.4998 0 16.5479 0 14.792C-0.0342197 12.2137 3.49998 11.9998 3 9.5C2.50362 5.29928 5.65412 1.53495 9.00195 1.05273C9.00105 1.03526 9 1.0177 9 1C9 0.447722 9.44773 1.13387e-05 10 0Z"
              fill="#FAFAFA"
            />
            <circle cx="15" cy="5" r="2" fill="url(#paint0_linear_689_8582)" />
            <defs>
              <linearGradient
                id="paint0_linear_689_8582"
                x1="15"
                y1="3"
                x2="15"
                y2="7"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#501BD6" />
                <stop offset="1" stopColor="#7F57E2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          data-layer="ph:question"
          className="PhQuestion w-6 h-6 relative overflow-hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13.125 16.875C13.125 17.0975 13.059 17.315 12.9354 17.5C12.8118 17.685 12.6361 17.8292 12.4305 17.9144C12.225 17.9995 11.9988 18.0218 11.7805 17.9784C11.5623 17.935 11.3618 17.8278 11.2045 17.6705C11.0472 17.5132 10.94 17.3127 10.8966 17.0945C10.8532 16.8762 10.8755 16.65 10.9606 16.4445C11.0458 16.2389 11.19 16.0632 11.375 15.9396C11.56 15.816 11.7775 15.75 12 15.75C12.2984 15.75 12.5845 15.8685 12.7955 16.0795C13.0065 16.2905 13.125 16.5766 13.125 16.875ZM12 6.75C9.93188 6.75 8.25 8.26406 8.25 10.125V10.5C8.25 10.6989 8.32902 10.8897 8.46967 11.0303C8.61033 11.171 8.80109 11.25 9 11.25C9.19892 11.25 9.38968 11.171 9.53033 11.0303C9.67099 10.8897 9.75 10.6989 9.75 10.5V10.125C9.75 9.09375 10.7597 8.25 12 8.25C13.2403 8.25 14.25 9.09375 14.25 10.125C14.25 11.1562 13.2403 12 12 12C11.8011 12 11.6103 12.079 11.4697 12.2197C11.329 12.3603 11.25 12.5511 11.25 12.75V13.5C11.25 13.6989 11.329 13.8897 11.4697 14.0303C11.6103 14.171 11.8011 14.25 12 14.25C12.1989 14.25 12.3897 14.171 12.5303 14.0303C12.671 13.8897 12.75 13.6989 12.75 13.5V13.4325C14.46 13.1184 15.75 11.7544 15.75 10.125C15.75 8.26406 14.0681 6.75 12 6.75ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
              fill="#FAFAFA"
            />
          </svg>
        </div>
        <div
          data-layer="Button"
          ref={menuRef}
          onBlur={handleBlur}
          className="relative Button pl-3 pr-1 py-2 bg-zinc-800 rounded-lg inline-flex justify-start items-center gap-2"
        >
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="flex items-center gap-2 bg-transparent border-none p-0"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <img
              data-layer="Vertical container"
              className="VerticalContainer w-8 h-8 rounded-full"
              src="https://placehold.co/32x32"
            />
            <div
              data-layer="Horizontal container"
              className="HorizontalContainer flex justify-start items-center gap-2"
            >
              <div
                data-layer="User"
                className="User justify-start text-neutral-50 text-base font-normal font-['Poppins'] leading-normal"
              >
                {userName}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.0008 15.28C11.8674 15.28 11.7384 15.255 11.6138 15.205C11.4884 15.155 11.3841 15.0883 11.3008 15.005L6.70078 10.405C6.51745 10.2216 6.42578 9.98831 6.42578 9.70498C6.42578 9.42165 6.51745 9.18831 6.70078 9.00498C6.88411 8.82165 7.11745 8.72998 7.40078 8.72998C7.68411 8.72998 7.91745 8.82165 8.10078 9.00498L12.0008 12.905L15.9008 9.00498C16.0841 8.82165 16.3174 8.72998 16.6008 8.72998C16.8841 8.72998 17.1174 8.82165 17.3008 9.00498C17.4841 9.18831 17.5758 9.42165 17.5758 9.70498C17.5758 9.98831 17.4841 10.2216 17.3008 10.405L12.7008 15.005C12.6008 15.105 12.4924 15.1756 12.3758 15.217C12.2591 15.259 12.1341 15.28 12.0008 15.28Z"
                  fill="#FAFAFA"
                />
              </svg>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-12 w-40 bg-zinc-800 rounded shadow-lg p-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-700 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
