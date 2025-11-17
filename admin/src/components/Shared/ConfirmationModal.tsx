import { type ReactElement, type ReactNode, useEffect, useRef } from "react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  icon?: ReactNode;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "bg-neutral-50 text-zinc-950",
  icon,
  isLoading = false,
}: ConfirmationModalProps): ReactElement | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isLoading, onClose]);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Move focus to modal
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Restore focus on unmount
    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleTab = (event: KeyboardEvent): void => {
      if (event.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => {
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={(): void => {
          if (!isLoading) onClose();
        }}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex={-1}
        className="relative w-[min(420px,90%)] p-6 bg-zinc-800 rounded-2xl outline-1 -outline-offset-1 outline-zinc-700 flex flex-col justify-center items-center gap-6 z-10"
      >
        {/* Icon (optional) */}
        {icon && <div className="flex justify-center">{icon}</div>}

        {/* Title and Message */}
        <div className="w-full flex flex-col items-center gap-3">
          <h3
            id="modal-title"
            className="text-center text-neutral-50 text-xl font-semibold font-['Plus_Jakarta_Sans'] leading-7"
          >
            {title}
          </h3>
          <p
            id="modal-description"
            className="text-center text-zinc-300 text-sm font-normal font-['Poppins'] leading-5"
          >
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-center items-center gap-3">
          <button
            type="button"
            onClick={(): void => {
              if (!isLoading) onClose();
            }}
            aria-disabled={isLoading}
            className={`flex-1 h-10 px-4 py-2 rounded-full outline-1 -outline-offset-1 outline-[#ebeef4] flex justify-center items-center gap-2 ${
              isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-zinc-700"
            }`}
          >
            <span className="text-center text-neutral-50 text-sm font-medium font-['Inter'] leading-5">
              {cancelText}
            </span>
          </button>
          <button
            type="button"
            onClick={(): void => {
              if (!isLoading) onConfirm();
            }}
            aria-disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-full flex justify-center items-center gap-2 ${confirmButtonClass} ${
              isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:opacity-90"
            }`}
          >
            <span className="text-center text-sm font-medium font-['Inter'] leading-5">
              {isLoading ? "Processing..." : confirmText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
