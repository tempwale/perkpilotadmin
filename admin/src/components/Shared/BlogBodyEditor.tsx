import {useState, useRef, useEffect, type FormEvent, type ReactElement, type MouseEvent} from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  List,
  Link2,
  Unlink,
  ChevronUp,
  ChevronDown,
  Image,
  Video,
} from "lucide-react";
import LinkInputModal from "./LinkInputModal";
import Toast from "./Toast";

const placeholderStyles = `
  [data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #71717a;
    opacity: 0.6;
    pointer-events: none;
    display: block;
  }
  [data-placeholder]:focus:empty:before {
    opacity: 0.4;
  }
  [data-placeholder].empty:before {
    content: attr(data-placeholder);
    color: #71717a;
    opacity: 0.6;
    pointer-events: none;
    display: block;
  }
  [data-placeholder].empty:focus:before {
    opacity: 0.4;
  }
`;

type Props = {
  initialBody?: string;
  onBodyChange?: (body: string) => void;
  label?: string;
};

export default function BlogBodyEditor({
  initialBody = "",
  onBodyChange,
  label = "Blog Body Text Editor",
}: Props): ReactElement {
  const [isEnabled, setIsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [content, setContent] = useState<string>(initialBody || "");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isUserInputRef = useRef(false);
  const selectionRangeRef = useRef<Range | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkModalInitialText, setLinkModalInitialText] = useState("");
  const [linkModalInitialUrl, setLinkModalInitialUrl] = useState("");
  const [linkModalTitle, setLinkModalTitle] = useState("Add Link");
  const linkModalConfirmRef = useRef<(linkText: string, url: string) => void>(() => {});
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

  const handleToggle = (): void => {
    setIsEnabled(!isEnabled);
  };

  const handleDelete = (): void => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      setContent("");
      onBodyChange?.("");
    }
  };

  const saveSelectionRange = (): void => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    if (contentRef.current) {
      const range = selection.getRangeAt(0);
      if (contentRef.current.contains(range.commonAncestorContainer)) {
        selectionRangeRef.current = range.cloneRange();
      }
    }
  };

  const restoreSelectionRange = (): void => {
    if (!selectionRangeRef.current || !contentRef.current) {
      return;
    }
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    
    // Verify the saved range is still valid and within our editor
    try {
      if (contentRef.current.contains(selectionRangeRef.current.commonAncestorContainer)) {
        selection.removeAllRanges();
        selection.addRange(selectionRangeRef.current);
      }
    } catch {
      // Range became invalid, clear it
      selectionRangeRef.current = null;
    }
  };

  const ensureCursorInEditor = (): void => {
    if (!contentRef.current) return;
    
    const selection = window.getSelection();
    if (!selection) return;


    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (contentRef.current.contains(range.commonAncestorContainer)) {
        return; 
      }
    }

    const range = document.createRange();
    
    if (contentRef.current.childNodes.length > 0) {
      const lastChild = contentRef.current.lastChild;
      if (lastChild) {
        if (lastChild.nodeType === Node.TEXT_NODE) {
          range.setStart(lastChild, lastChild.textContent?.length || 0);
          range.setEnd(lastChild, lastChild.textContent?.length || 0);
        } else {
          range.selectNodeContents(lastChild);
          range.collapse(false);
        }
      }
    } else {
      range.selectNodeContents(contentRef.current);
      range.collapse(true);
    }

    selection.removeAllRanges();
    selection.addRange(range);
    selectionRangeRef.current = range.cloneRange();
  };

  const execCommand = (command: string, value?: string): void => {
    if (!contentRef.current) return;
    
    contentRef.current.focus();
    
    // Restore saved selection or ensure cursor is in editor
    if (selectionRangeRef.current) {
      restoreSelectionRange();
    } else {
      ensureCursorInEditor();
    }

    // Special handling for formatBlock when editor is empty
    if (command === "formatBlock") {
      const isEmpty = !contentRef.current.textContent?.trim();
      
      if (isEmpty) {
        // Extract tag name from value (e.g., "<H1>" -> "h1")
        const tagName = value?.replace(/[<>]/g, '').toLowerCase() || 'p';
        
        // Create the element directly for empty editor
        contentRef.current.innerHTML = `<${tagName}><br></${tagName}>`;
        
        // Place cursor inside the new element
        const newElement = contentRef.current.firstChild;
        if (newElement) {
          const range = document.createRange();
          range.selectNodeContents(newElement);
          range.collapse(true);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            selectionRangeRef.current = range.cloneRange();
          }
        }
      } else {
        // Editor has content, use execCommand normally
        document.execCommand(command, false, value);
      }
    } 
    // Special handling for list commands
    else if (command === "insertOrderedList" || command === "insertUnorderedList") {
      const isEmpty = !contentRef.current.textContent?.trim();
      
      if (isEmpty) {
        // Create list directly for empty editor
        const listTag = command === "insertOrderedList" ? "ol" : "ul";
        contentRef.current.innerHTML = `<${listTag}><li><br></li></${listTag}>`;
        
        // Place cursor inside the list item
        const listItem = contentRef.current.querySelector('li');
        if (listItem) {
          const range = document.createRange();
          range.selectNodeContents(listItem);
          range.collapse(true);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            selectionRangeRef.current = range.cloneRange();
          }
        }
      } else {
        // Editor has content, use execCommand normally
        document.execCommand(command, false, value);
      }
    } else {
      // All other commands
      document.execCommand(command, false, value);
    }

    // Trigger input event to update state
    const event = new Event('input', { bubbles: true });
    contentRef.current.dispatchEvent(event);
    
    // Save the new selection
    saveSelectionRange();
  };

  const handleToolbarMouseDown = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    saveSelectionRange();
  };

  const openLinkModal = (config: {
    title: string;
    initialText?: string;
    initialUrl?: string;
    onConfirm: (linkText: string, url: string) => void;
  }): void => {
    setLinkModalTitle(config.title);
    setLinkModalInitialText(config.initialText ?? "");
    setLinkModalInitialUrl(config.initialUrl ?? "");
    linkModalConfirmRef.current = config.onConfirm;
    saveSelectionRange();
    setShowLinkModal(true);
  };

  const handleInsertLink = (): void => {
    const selectedText = window.getSelection()?.toString().trim() ?? "";
    openLinkModal({
      title: "Add Link",
      initialText: selectedText,
      initialUrl: "",
      onConfirm: handleLinkConfirm,
    });
  };

  const handleLinkConfirm = (linkText: string, url: string): void => {
    if (!contentRef.current) return;
    restoreSelectionRange();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    const hasSelectedText = selectedText && selectedText === linkModalInitialText;

    if (hasSelectedText) {
      let linkElement: Element | null = null;
      let currentNode: Node | null = range.commonAncestorContainer;

      while (currentNode) {
        if (
          currentNode.nodeType === Node.ELEMENT_NODE &&
          (currentNode as Element).tagName === "A"
        ) {
          linkElement = currentNode as Element;
          break;
        }
        currentNode = currentNode.parentElement || currentNode.parentNode;
      }

      if (linkElement) {
        (linkElement as HTMLAnchorElement).href = url;
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.style.color = "#737eff";
        link.style.textDecoration = "underline";

        try {
          range.surroundContents(link);
        } catch {
          const text = selectedText;
          range.deleteContents();
          link.textContent = text;
          range.insertNode(link);
        }
      }
    } else {
      const link = document.createElement("a");
      link.href = url;
      link.textContent = linkText;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.color = "#737eff";
      link.style.textDecoration = "underline";
      range.deleteContents();
      range.insertNode(link);
      range.setStartAfter(link);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
    }

    const event = new Event("input", { bubbles: true });
    contentRef.current.dispatchEvent(event);
  };

  const handleInsertImageConfirm = (altText: string, url: string): void => {
    const cleanedUrl = url.trim();
    try {
      new URL(cleanedUrl);
    } catch {
      setToast({
        message: "Please enter a valid URL (e.g., https://example.com/image.jpg)",
        type: "error",
      });
      return;
    }

    if (!contentRef.current) return;

    const img = document.createElement("img");
    img.src = cleanedUrl;
    img.alt = altText || "Inserted image";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.display = "block";
    img.style.margin = "10px auto";
    img.style.borderRadius = "8px";

    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.margin = "16px 0";
    container.style.textAlign = "center";
    container.appendChild(img);

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      range.insertNode(container);
    } else {
      const range = selection.getRangeAt(0);
      range.insertNode(container);
      range.setStartAfter(container);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const event = new Event("input", { bubbles: true });
    contentRef.current.dispatchEvent(event);
  };

  const handleInsertImage = (): void => {
    const selectedText = window.getSelection()?.toString().trim() ?? "Image";
    openLinkModal({
      title: "Insert Image",
      initialText: selectedText,
      initialUrl: "https://",
      onConfirm: handleInsertImageConfirm,
    });
  };

  const handleInsertYouTube = (): void => {
    const selectedText = window.getSelection()?.toString().trim() ?? "YouTube Video";
    openLinkModal({
      title: "Insert YouTube Video",
      initialText: selectedText,
      initialUrl: "",
      onConfirm: handleInsertYouTubeConfirm,
    });
  };

  const handleInsertYouTubeConfirm = (linkText: string, url: string): void => {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      setToast({
        message:
          "Invalid YouTube URL. Please enter a valid YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)",
        type: "error",
      });
      return;
    }

    if (!contentRef.current) return;

    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.maxWidth = "800px";
    container.style.margin = "20px auto";
    container.style.position = "relative";
    container.style.paddingBottom = "56.25%";
    container.style.height = "0";
    container.style.borderRadius = "8px";
    container.style.overflow = "hidden";
    container.setAttribute("data-youtube-embed", videoId);
    container.setAttribute("data-youtube-title", linkText);

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    container.appendChild(iframe);

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      range.insertNode(container);
    } else {
      const range = selection.getRangeAt(0);
      range.insertNode(container);
      range.setStartAfter(container);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const event = new Event("input", { bubbles: true });
    contentRef.current.dispatchEvent(event);
  };

  const extractYouTubeVideoId = (urlString: string): string | null => {
    const trimmed = urlString.trim();
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const handleFontSizeChange = (direction: "up" | "down"): void => {
    setFontSize((prev) =>
      direction === "up" ? prev + 1 : Math.max(8, prev - 1)
    );
  };

  const handleContentChange = (e: FormEvent<HTMLDivElement>): void => {
    const el = e.currentTarget as HTMLDivElement;
    const newContent = el.innerHTML; 
    isUserInputRef.current = true;
    setContent(newContent);
    onBodyChange?.(newContent);
    const textContent = el.textContent || "";
    if (!textContent.trim()) {
      el.classList.add("empty");
      if (el.innerHTML === "<br>" || el.innerHTML === "<br/>") {
        el.innerHTML = "";
      }
    } else {
      el.classList.remove("empty");
    }
    setTimeout(() => {
      isUserInputRef.current = false;
    }, 0);
    saveSelectionRange();
  };

  const handleSelectionChange = (): void => {
    saveSelectionRange();
  };

  useEffect(() => {
    if (contentRef.current && !isUserInputRef.current) {
      const currentContent = contentRef.current.innerHTML || "";
      if (currentContent !== content) {
        contentRef.current.innerHTML = content;
      }
      const textContent = contentRef.current.textContent || "";
      if (!textContent.trim()) {
        contentRef.current.classList.add("empty");
      } else {
        contentRef.current.classList.remove("empty");
      }
    }
  }, [content]);

  // Sync local state when initialBody prop changes externally
  useEffect(() => {
    // If initialBody contains HTML, use it directly; otherwise use as plain text
    const bodyContent = initialBody || "";
    setContent(bodyContent);
    // Also update the ref if it exists and we're not in user input mode
    if (contentRef.current && !isUserInputRef.current) {
      contentRef.current.innerHTML = bodyContent;
      const textContent = contentRef.current.textContent || "";
      if (!textContent.trim()) {
        contentRef.current.classList.add("empty");
      } else {
        contentRef.current.classList.remove("empty");
      }
    }
  }, [initialBody]);

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <LinkInputModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onConfirm={(linkText: string, url: string): void =>
          linkModalConfirmRef.current(linkText, url)
        }
        initialText={linkModalInitialText}
        initialUrl={linkModalInitialUrl}
        title={linkModalTitle}
      />
      <style>{placeholderStyles}</style>
      <div className="w-full py-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 flex flex-col justify-center items-start gap-4 overflow-hidden">
        <div className="self-stretch h-14 inline-flex justify-start items-center">
          <div className="flex-1 self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-3">
            <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
              {label}
            </div>
          </div>
          <div className="self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4">
            <button
              onMouseDown={handleToolbarMouseDown}
              onClick={handleToggle}
              className="w-[53.33px] h-7 relative bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline-1 -outline-offset-1 outline-[#501bd6] overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
              aria-label="Toggle content"
            >
              <div
                className={`w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] transition-all duration-200 top-[2.67px] ${
                  isEnabled ? "left-[26.67px]" : "left-[3px]"
                }`}
              />
            </button>
            <button
              onMouseDown={handleToolbarMouseDown}
              onClick={handleDelete}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Delete content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-50"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>

        <div className="self-stretch px-4 bg-zinc-800 rounded-3xl outline-1 -outline-offset-1 outline-zinc-700 flex flex-col justify-start items-start overflow-hidden">
          <div className="self-stretch border-b border-zinc-700 inline-flex justify-center items-center">
            <div className="flex justify-start items-start">
              <div className="self-stretch min-h-12 px-3 py-2 border-r border-zinc-700 inline-flex flex-col justify-center items-center gap-2.5">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-neutral-50 text-sm font-medium">
                    Heading
                  </div>
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onMouseDown={handleToolbarMouseDown}
                      onClick={(): void => execCommand("formatBlock", "p")}
                      className="text-xs px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    >
                      P
                    </button>
                    <button
                      type="button"
                      onMouseDown={handleToolbarMouseDown}
                      onClick={(): void => execCommand("formatBlock", "h1")}
                      className="text-xs px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onMouseDown={handleToolbarMouseDown}
                      onClick={(): void => execCommand("formatBlock", "h2")}
                      className="text-xs px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onMouseDown={handleToolbarMouseDown}
                      onClick={(): void => execCommand("formatBlock", "h3")}
                      className="text-xs px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
                    >
                      H3
                    </button>
                  </div>
                </div>
              </div>

              <div className="self-stretch min-h-12 px-3 py-2 border-r border-zinc-700 inline-flex flex-col justify-center items-center gap-2.5">
                <div className="inline-flex justify-center items-center gap-1 overflow-hidden">
                  <div className="justify-start text-neutral-50 text-base font-bold font-['Plus_Jakarta_Sans'] leading-[22px]">
                    {fontSize}
                  </div>
                  <div className="flex flex-col">
                    <button
                      onClick={(): void => handleFontSizeChange("up")}
                      className="hover:opacity-70"
                      aria-label="Increase font size"
                    >
                      <ChevronUp size={12} className="text-neutral-50" />
                    </button>
                    <button
                      onClick={(): void => handleFontSizeChange("down")}
                      className="hover:opacity-70"
                      aria-label="Decrease font size"
                    >
                      <ChevronDown size={12} className="text-neutral-50" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
                  <button
                    onMouseDown={handleToolbarMouseDown}
                    onClick={(): void => execCommand("bold")}
                    className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                    title="Bold"
                  >
                  <Bold size={20} className="text-neutral-50" />
                </button>
                  <button
                    onMouseDown={handleToolbarMouseDown}
                    onClick={(): void => execCommand("italic")}
                    className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                    title="Italic"
                  >
                  <Italic size={20} className="text-neutral-50" />
                </button>
                  <button
                    onMouseDown={handleToolbarMouseDown}
                    onClick={(): void => execCommand("underline")}
                    className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                    title="Underline"
                  >
                  <Underline size={20} className="text-neutral-50" />
                </button>
                  <button
                    onMouseDown={handleToolbarMouseDown}
                    onClick={(): void => execCommand("strikeThrough")}
                    className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                    title="Strikethrough"
                  >
                  <Strikethrough size={20} className="text-neutral-50" />
                </button>
                  <button
                    onMouseDown={handleToolbarMouseDown}
                    onClick={(): void => execCommand("superscript")}
                    className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                    title="Superscript"
                  >
                  <Superscript size={20} className="text-neutral-50" />
                </button>
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={(): void => execCommand("subscript")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Subscript"
                >
                  <Subscript size={20} className="text-neutral-50" />
                </button>
              </div>

              <div className="p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={(): void => execCommand("justifyLeft")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Align Left"
                >
                  <AlignLeft size={20} className="text-neutral-50" />
                </button>
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={(): void => execCommand("justifyCenter")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Align Center"
                >
                  <AlignCenter size={20} className="text-neutral-50" />
                </button>
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={(): void => execCommand("justifyRight")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Align Right"
                >
                  <AlignRight size={20} className="text-neutral-50" />
                </button>
              </div>

              <div className="p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={(): void => execCommand("insertOrderedList")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Ordered List"
                >
                  <ListOrdered size={20} className="text-neutral-50" />
                </button>
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={(): void => execCommand("insertUnorderedList")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Unordered List"
                >
                  <List size={20} className="text-neutral-50" />
                </button>
              </div>

              <div className="p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={handleInsertImage}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Insert Image"
                >
                  <Image size={20} className="text-neutral-50" />
                </button>
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={handleInsertYouTube}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Insert YouTube Video"
                >
                  <Video size={20} className="text-neutral-50" />
                </button>
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={handleInsertLink}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Insert Link"
                >
                  <Link2 size={20} className="text-neutral-50" />
                </button>
                <button
                  onMouseDown={handleToolbarMouseDown}
                  onClick={(): void => execCommand("unlink")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Remove Link"
                >
                  <Unlink size={20} className="text-neutral-50" />
                </button>
              </div>
            </div>
          </div>

          <div className="self-stretch p-6 flex flex-col justify-center items-start gap-6">
            <div
              ref={contentRef}
              contentEditable={isEnabled}
              onInput={handleContentChange}
              onMouseUp={handleSelectionChange}
              onKeyUp={handleSelectionChange}
              onPointerUp={handleSelectionChange}
              onFocus={handleSelectionChange}
              suppressContentEditableWarning={true}
              dir="ltr"
              className="w-full justify-start text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none min-h-[200px] focus:outline-none focus:ring-0 prose prose-invert max-w-none"
              style={{ fontSize: `${fontSize}px`, direction: "ltr", textAlign: "left" }}
              data-placeholder="Enter blog body content..."
            />
          </div>
          <style>{`
            [contenteditable="true"] img {
              max-width: 100%;
              height: auto;
              display: block;
              margin: 10px auto;
              border-radius: 8px;
            }
            [contenteditable="true"] a {
              color: #737eff;
              text-decoration: underline;
              cursor: pointer;
            }
            [contenteditable="true"] a:hover {
              opacity: 0.8;
            }
            [contenteditable="true"] iframe {
              border: none;
            }
            [contenteditable="true"] [data-youtube-embed] {
              width: 100%;
              max-width: 800px;
              margin: 20px auto;
              position: relative;
              padding-bottom: 56.25%;
              height: 0;
              border-radius: 8px;
              overflow: hidden;
            }
            [contenteditable="true"] [data-youtube-embed] iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            [contenteditable="true"] h1 {
              font-size: 2em;
              font-weight: bold;
              margin: 0.67em 0;
            }
            [contenteditable="true"] h2 {
              font-size: 1.5em;
              font-weight: bold;
              margin: 0.83em 0;
            }
            [contenteditable="true"] h3 {
              font-size: 1.17em;
              font-weight: bold;
              margin: 1em 0;
            }
            [contenteditable="true"] p {
              margin: 1em 0;
            }
            [contenteditable="true"] ul,
            [contenteditable="true"] ol {
              padding-left: 2em;
              margin: 1em 0;
            }
            [contenteditable="true"] ul {
              list-style-type: disc;
            }
            [contenteditable="true"] ol {
              list-style-type: decimal;
            }
            [contenteditable="true"] li {
              margin: 0.5em 0;
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
