import {useState, useRef, useEffect, type FormEvent, type ReactElement} from "react";
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
  Type,
  Image,
  Video,
} from "lucide-react";

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
  label = "Blog Body Text Editor"
}: Props): ReactElement {
  const [isEnabled, setIsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [content, setContent] = useState<string>(initialBody || "");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isUserInputRef = useRef(false);

  const handleToggle = (): void => {
    setIsEnabled(!isEnabled);
  };

  const handleDelete = (): void => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      setContent("");
      onBodyChange?.("");
    }
  };

  const execCommand = (command: string, value?: string): void => {
    if (contentRef.current) {
      contentRef.current.focus();
      document.execCommand(command, false, value);
      const event = new Event('input', { bubbles: true });
      contentRef.current.dispatchEvent(event);
    }
  };

  const handleInsertLink = (): void => {
    if (!contentRef.current) return;
    contentRef.current.focus();
    
    const selection = window.getSelection();
    if (!selection) return;
    
    if (selection.rangeCount === 0) {
      // No selection - create a range at cursor position
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false); 
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    
    if (selectedText) {
      const url = prompt("Enter URL for the selected text:", "https://");
      if (!url || !url.trim()) return;
      
  
      let linkElement: Element | null = null;
      let currentNode: Node | null = range.commonAncestorContainer;
      
      while (currentNode) {
        if (currentNode.nodeType === Node.ELEMENT_NODE && (currentNode as Element).tagName === "A") {
          linkElement = currentNode as Element;
          break;
        }
        currentNode = currentNode.parentElement || currentNode.parentNode;
      }
      
      if (linkElement) {
        // Update existing link
        (linkElement as HTMLAnchorElement).href = url.trim();
      } else {
        // Create new link
        const link = document.createElement("a");
        link.href = url.trim();
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.style.color = "#737eff";
        link.style.textDecoration = "underline";
        
        try {
          range.surroundContents(link);
        } catch {
          // If surroundContents fails, delete and insert
          const text = selectedText;
          range.deleteContents();
          link.textContent = text;
          range.insertNode(link);
        }
      }
    } else {
      // No text selected - ask for both link text and URL
      const linkText = prompt("Enter link text:", "");
      if (!linkText || !linkText.trim()) return;
      
      const url = prompt("Enter URL:", "https://");
      if (!url || !url.trim()) return;
      
      // Insert link at cursor position
      const link = document.createElement("a");
      link.href = url.trim();
      link.textContent = linkText.trim();
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.color = "#737eff";
      link.style.textDecoration = "underline";
      
      range.insertNode(link);
      
      // Move cursor after the link
      range.setStartAfter(link);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    // Trigger input event to update state
    const event = new Event('input', { bubbles: true });
    contentRef.current.dispatchEvent(event);
  };

  const handleInsertImage = (): void => {
    if (!contentRef.current) return;
    
    // Ensure the editor is focused
    contentRef.current.focus();
    
    const url = prompt("Enter image URL:", "https://");
    if (!url || !url.trim()) return;
    
    // Validate URL format
    try {
      new URL(url.trim());
    } catch {
      alert("Please enter a valid URL (e.g., https://example.com/image.jpg)");
      return;
    }
    
    const img = document.createElement("img");
    img.src = url.trim();
    img.alt = "Inserted image";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.display = "block";
    img.style.margin = "10px auto";
    img.style.borderRadius = "8px";
    
    // Create a container div for better styling
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.margin = "16px 0";
    container.style.textAlign = "center";
    container.appendChild(img);
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      // No selection - insert at end
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      range.insertNode(container);
    } else {
      const range = selection.getRangeAt(0);
      range.insertNode(container);
      
      // Move cursor after the image
      range.setStartAfter(container);
      range.collapse(true);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    
    // Trigger input event
    const event = new Event('input', { bubbles: true });
    contentRef.current.dispatchEvent(event);
  };

  const handleInsertYouTube = (): void => {
    if (!contentRef.current) return;
    
    // Ensure the editor is focused
    contentRef.current.focus();
    
    const url = prompt("Enter YouTube video URL:", "https://www.youtube.com/watch?v=");
    if (!url || !url.trim()) return;
    
    // Extract video ID from various YouTube URL formats
    let videoId = "";
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.trim().match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }
    
    if (!videoId) {
      alert("Invalid YouTube URL. Please enter a valid YouTube video URL.\n\nExamples:\n- https://www.youtube.com/watch?v=VIDEO_ID\n- https://youtu.be/VIDEO_ID");
      return;
    }
    
    // Create YouTube embed iframe with responsive container
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.maxWidth = "800px";
    container.style.margin = "20px auto";
    container.style.position = "relative";
    container.style.paddingBottom = "56.25%"; // 16:9 aspect ratio
    container.style.height = "0";
    container.style.borderRadius = "8px";
    container.style.overflow = "hidden";
    container.setAttribute("data-youtube-embed", videoId);
    
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
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
      // No selection - insert at end
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      range.insertNode(container);
    } else {
      const range = selection.getRangeAt(0);
      range.insertNode(container);
      
      // Move cursor after the video
      range.setStartAfter(container);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    // Trigger input event
    const event = new Event('input', { bubbles: true });
    contentRef.current.dispatchEvent(event);
  };

  const handleFontSizeChange = (direction: "up" | "down"): void => {
    setFontSize((prev) =>
      direction === "up" ? prev + 1 : Math.max(8, prev - 1)
    );
  };

  const handleContentChange = (e: FormEvent<HTMLDivElement>): void => {
    const el = e.currentTarget as HTMLDivElement;
    const newContent = el.innerHTML; // Use innerHTML to preserve formatting, links, images, etc.
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
  };

  // Sync refs with state/props on mount and when state changes externally (not from user input)
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
                <button className="inline-flex justify-center items-center gap-1 hover:opacity-70 transition-opacity">
                  <Type size={16} className="text-neutral-50" />
                  <span className="text-neutral-50 text-sm font-medium">
                    Frame
                  </span>
                  <ChevronDown size={14} className="text-neutral-50" />
                </button>
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
                  onClick={(): void => execCommand("bold")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Bold"
                >
                  <Bold size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("italic")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Italic"
                >
                  <Italic size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("underline")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Underline"
                >
                  <Underline size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("strikeThrough")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Strikethrough"
                >
                  <Strikethrough size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("superscript")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Superscript"
                >
                  <Superscript size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("subscript")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Subscript"
                >
                  <Subscript size={20} className="text-neutral-50" />
                </button>
              </div>

              <div className="p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
                <button
                  onClick={(): void => execCommand("justifyLeft")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Align Left"
                >
                  <AlignLeft size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("justifyCenter")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Align Center"
                >
                  <AlignCenter size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("justifyRight")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Align Right"
                >
                  <AlignRight size={20} className="text-neutral-50" />
                </button>
              </div>

              <div className="p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
                <button
                  onClick={(): void => execCommand("insertOrderedList")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Ordered List"
                >
                  <ListOrdered size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={(): void => execCommand("insertUnorderedList")}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Unordered List"
                >
                  <List size={20} className="text-neutral-50" />
                </button>
              </div>

              <div className="p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
                <button
                  onClick={handleInsertImage}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Insert Image"
                >
                  <Image size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={handleInsertYouTube}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Insert YouTube Video"
                >
                  <Video size={20} className="text-neutral-50" />
                </button>
                <button
                  onClick={handleInsertLink}
                  className="w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                  title="Insert Link"
                >
                  <Link2 size={20} className="text-neutral-50" />
                </button>
                <button
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
          `}</style>
        </div>
      </div>
    </>
  );
}

