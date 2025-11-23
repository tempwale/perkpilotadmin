import { useState, useEffect, useRef, type ReactElement, type FormEvent } from "react";
import { X, Link2 } from "lucide-react";

export interface LinkInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (linkText: string, url: string) => void;
  initialText?: string;
  initialUrl?: string;
  title?: string;
}

export default function LinkInputModal({
  isOpen,
  onClose,
  onConfirm,
  initialText = "",
  initialUrl = "",
  title = "Add Link",
}: LinkInputModalProps): ReactElement | null {
  const [linkText, setLinkText] = useState(initialText);
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setLinkText(initialText);
      setUrl(initialUrl);
      setError(null);
      // Focus first empty input or text input
      setTimeout(() => {
        if (initialText && !initialUrl && urlInputRef.current) {
          urlInputRef.current.focus();
        } else if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, initialText, initialUrl]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent): void => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => {
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  const validateUrl = (urlString: string): boolean => {
    if (!urlString.trim()) return false;
    try {
      const testUrl = new URL(urlString);
      return testUrl.protocol === "http:" || testUrl.protocol === "https:";
    } catch {
      try {
        const testUrl = new URL(`https://${urlString}`);
        return testUrl.protocol === "http:" || testUrl.protocol === "https:";
      } catch {
        return false;
      }
    }
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setError(null);

    const trimmedText = linkText.trim();
    const trimmedUrl = url.trim();

    if (!trimmedText) {
      setError("Link text is required");
      textInputRef.current?.focus();
      return;
    }

    if (!trimmedUrl) {
      setError("URL is required");
      urlInputRef.current?.focus();
      return;
    }

    // Validate and normalize URL
    let finalUrl = trimmedUrl;
    if (!validateUrl(trimmedUrl)) {
      // Try adding https://
      if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
        finalUrl = `https://${trimmedUrl}`;
        if (!validateUrl(finalUrl)) {
          setError("Please enter a valid URL (e.g., https://example.com)");
          urlInputRef.current?.focus();
          return;
        }
      } else {
        setError("Please enter a valid URL (e.g., https://example.com)");
        urlInputRef.current?.focus();
        return;
      }
    }

    onConfirm(trimmedText, finalUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="link-modal-title"
        className="relative w-[min(420px,90%)] p-6 bg-zinc-800 rounded-2xl outline-1 -outline-offset-1 outline-zinc-700 flex flex-col justify-start items-start gap-6 z-10"
      >
        {/* Header */}
        <div className="self-stretch flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link2 className="w-5 h-5 text-neutral-50" />
            <h3
              id="link-modal-title"
              className="text-neutral-50 text-xl font-semibold font-['Plus_Jakarta_Sans'] leading-7"
            >
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-neutral-50 transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="self-stretch flex flex-col gap-4">
          {/* Link Text Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="link-text"
              className="text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              Link Text
            </label>
            <input
              ref={textInputRef}
              id="link-text"
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Enter link text"
              className="w-full h-12 px-4 py-3 bg-zinc-900 rounded-xl outline-1 outline-zinc-700 text-neutral-50 text-base font-['Poppins'] placeholder:text-zinc-500 focus:outline-2 focus:outline-[#737eff]"
              autoComplete="off"
            />
          </div>

          {/* URL Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="link-url"
              className="text-neutral-50 text-sm font-medium font-['Poppins']"
            >
              URL
            </label>
            <input
              ref={urlInputRef}
              id="link-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full h-12 px-4 py-3 bg-zinc-900 rounded-xl outline-1 outline-zinc-700 text-neutral-50 text-base font-['Poppins'] placeholder:text-zinc-500 focus:outline-2 focus:outline-[#737eff]"
              autoComplete="off"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm font-['Poppins']">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-50 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-linear-to-b from-[#501bd6] to-[#7f57e2] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

