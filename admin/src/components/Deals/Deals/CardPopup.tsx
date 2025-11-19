import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import DeletePopup from "./DeletePopup";
import type { DealApiResponse } from "../../../types/api.types";

export default function CardPopup({
  onClose,
  onDelete,
  deal,
}: {
  onClose?: () => void;
  onDelete?: () => void;
  deal?: DealApiResponse;
}): ReactElement {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const id = String(deal?.id ?? deal?._id ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={(): void => onClose?.()}
        aria-hidden
      />

      <div
        data-layer="Card Popup"
        className="relative w-[min(680px,92%)] p-6 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 inline-flex flex-col justify-center items-center gap-6 z-10"
      >
        <button
          onClick={(): void => onClose?.()}
          aria-label="Close popup"
          className="absolute right-4 top-4 text-zinc-300 hover:text-white"
        >
          ✕
        </button>
        <div className="w-full flex items-center gap-4">
          <div className="w-12 h-12 shrink-0">
            {deal?.logoComponent ?? (
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="text-white text-lg font-semibold">
              {deal?.title ?? "Deal"}
            </div>
            <div className="text-zinc-400 text-sm">
              {deal?.category ?? deal?.dealType ?? ""}
            </div>
          </div>
        </div>
        <div className="mt-2 w-full text-zinc-300 text-sm">
          {deal?.description}
        </div>
        <div
          data-layer="Frame 1321315044"
          className="Frame1321315044 self-stretch flex flex-col justify-start items-center gap-6"
        >
          <div
            data-layer="Frame 1321315038"
            className="Frame1321315038 self-stretch flex flex-col justify-start items-start gap-4"
          >
            <div
              data-layer="Container"
              className="Container self-stretch p-3 bg-zinc-700 rounded-2xl inline-flex justify-start items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M2.72495 21C2.54162 21 2.37495 20.9543 2.22495 20.863C2.07495 20.7717 1.95829 20.6507 1.87495 20.5C1.79162 20.3493 1.74595 20.1867 1.73795 20.012C1.72995 19.8373 1.77562 19.6667 1.87495 19.5L11.125 3.5C11.225 3.33333 11.3543 3.20833 11.513 3.125C11.6716 3.04167 11.834 3 12 3C12.166 3 12.3286 3.04167 12.488 3.125C12.6473 3.20833 12.7763 3.33333 12.875 3.5L22.125 19.5C22.225 19.6667 22.271 19.8377 22.263 20.013C22.255 20.1883 22.209 20.3507 22.125 20.5C22.041 20.6493 21.9243 20.7703 21.775 20.863C21.6256 20.9557 21.459 21.0013 21.275 21H2.72495ZM12 18C12.2833 18 12.521 17.904 12.713 17.712C12.905 17.52 13.0006 17.2827 13 17C12.9993 16.7173 12.9033 16.48 12.712 16.288C12.5206 16.096 12.2833 16 12 16C11.7166 16 11.4793 16.096 11.288 16.288C11.0966 16.48 11.0006 16.7173 11 17C10.9993 17.2827 11.0953 17.5203 11.288 17.713C11.4806 17.9057 11.718 18.0013 12 18ZM12 15C12.2833 15 12.521 14.904 12.713 14.712C12.905 14.52 13.0006 14.2827 13 14V11C13 10.7167 12.904 10.4793 12.712 10.288C12.52 10.0967 12.2826 10.0007 12 10C11.7173 9.99933 11.48 10.0953 11.288 10.288C11.096 10.4807 11 10.718 11 11V14C11 14.2833 11.096 14.521 11.288 14.713C11.48 14.905 11.7173 15.0007 12 15Z"
                  fill="#FF9800"
                />
              </svg>
              <div
                data-layer="Note: Can’t be undone later! and you are free to edit this deal stack instead of deleting it full."
                className="NoteCanTBeUndoneLaterAndYouAreFreeToEditThisDealStackInsteadOfDeletingItFull flex-1 justify-start text-neutral-50 text-sm font-normal font-['Poppins']"
              >
                Note: Can’t be undone later! and you are free to edit this deal
                stack instead of deleting it full.
              </div>
            </div>
          </div>
          <div
            data-layer="Frame 2147205573"
            className="Frame2147205573 self-stretch inline-flex justify-center items-start gap-6"
          >
            {confirmOpen ? (
              <DeletePopup
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                  onDelete?.();
                  onClose?.();
                }}
                deal={deal}
              />
            ) : (
              <>
                <div
                  data-layer="Buttons/main"
                  data-button="ghost"
                  data-size="Large"
                  className="ButtonsMain flex-1 h-14 px-10 py-4 rounded-[100px] outline-1 -outline-offset-1 outline-[#ebeef4] flex justify-center items-center gap-2 cursor-pointer"
                  onClick={(): void => setConfirmOpen(true)}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    data-layer="Button"
                    className="Button text-center justify-start text-neutral-50 text-base font-medium font-['Inter'] leading-6"
                  >
                    Delete Card
                  </div>
                </div>
                <div
                  data-layer="Buttons/main"
                  data-button="on"
                  data-size="Large"
                  className="ButtonsMain flex-1 px-10 py-4 bg-neutral-50 rounded-[100px] flex justify-center items-center gap-2"
                  onClick={(): void => {
                    if (id) {
                      void Promise.resolve(navigate(`/updatedeal/${id}`));
                    }
                  }}
                >
                  <div
                    data-layer="Button"
                    className="Button text-center justify-start text-zinc-950 text-base font-medium font-['Inter'] leading-6"
                  >
                    Edit Card
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
