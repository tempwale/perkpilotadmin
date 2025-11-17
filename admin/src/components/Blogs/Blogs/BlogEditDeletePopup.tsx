import { useEffect, useRef, type ReactElement, type KeyboardEvent } from "react";
import type { BlogEditDeletePopupProps } from "../../../types/blog.types";

export default function BlogEditDeletePopup({
  onClose,
  onEdit,
  onDelete,
}: BlogEditDeletePopupProps): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = "blog-edit-delete-popup-title";

  // Focus trap and Escape key handler
  useEffect(() => {
    // Save previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Move focus to modal
    const modal = modalRef.current;
    if (modal) {
      const firstFocusable = modal.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modal.focus();
      }
    }

    // Handle Escape key and Tab key for focus trap
    const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }

      const currentModal = modalRef.current;
      if (e.key === "Tab" && currentModal) {
        const focusableElements = currentModal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Restore focus on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      e.preventDefault();
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={(): void => onClose?.()}
        onKeyDown={handleOverlayKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Close popup"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-[min(500px,92%)] p-6 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 inline-flex flex-col justify-center items-start gap-6 z-10"
      >
        {/* Title */}
        <div
          id={titleId}
          className="self-stretch text-neutral-50 text-2xl font-semibold font-['Plus_Jakarta_Sans'] leading-8"
        >
          Want To Edit Or Delete This Blog Card?
        </div>

        {/* Description */}
        <div className="self-stretch text-zinc-300 text-base font-normal font-['Poppins'] leading-6">
          You can change and customize the blog card by editing it, or delete it permanently if it&apos;s no longer needed.
        </div>

        {/* Warning Note */}
        <div className="self-stretch p-4 bg-zinc-700 rounded-xl inline-flex justify-start items-center gap-3">
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
          <div className="flex-1 text-neutral-50 text-sm font-normal font-['Poppins'] leading-5">
            Note: This action cannot be undone. Instead of deleting the blog, consider editing it.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="self-stretch inline-flex justify-center items-start gap-3">
          {/* Delete Card Button */}
          <button
            onClick={(): void => {
              onClose?.();
              onDelete?.();
            }}
            className="flex-1 h-12 px-4 py-3 rounded-full outline-1 -outline-offset-1 outline-neutral-50 bg-transparent hover:bg-zinc-700/50 transition-colors flex justify-center items-center gap-2"
          >
            <div className="text-center text-neutral-50 text-base font-medium font-['Inter'] leading-6">
              Delete Card
            </div>
          </button>

          {/* Edit Card Button */}
          <button
            onClick={(): void => {
              onClose?.();
              onEdit?.();
            }}
            className="flex-1 h-12 px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-full transition-colors flex justify-center items-center gap-2"
          >
            <div className="text-center text-zinc-950 text-base font-medium font-['Inter'] leading-6">
              Edit Card
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

