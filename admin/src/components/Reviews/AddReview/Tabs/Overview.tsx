"use client";

import { useState, useRef, type FormEvent } from "react";
import {
  GripVertical,
  Trash2,
  Type,
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
  Tag,
} from "lucide-react";

type Props = {
  initialOverview?: string;
  onOverviewChange?: (overview: string) => void;
};

export default function Overview({ initialOverview, onOverviewChange }: Props = {}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [content, setContent] = useState(
    initialOverview || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..."
  );
  const [heading, setHeading] = useState("Heading 1");
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      setContent("");
      setHeading("");
    }
  };

  const execCommand = (command: string, value?: string) => {
    // document.execCommand expects a string or undefined for the value
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const handleFontSizeChange = (direction: "up" | "down") => {
    setFontSize((prev) =>
      direction === "up" ? prev + 1 : Math.max(8, prev - 1)
    );
  };

  const handleContentChange = (e: FormEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const newContent = el.innerText;
    setContent(newContent);
    onOverviewChange?.(newContent);
  };

  const handleHeadingChange = (e: FormEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    setHeading(el.innerText);
  };

  return (
    <div className="Row w-[1068px] py-4 bg-zinc-800 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-700 flex flex-col justify-center items-start gap-4 overflow-hidden">
      {/* Header Row */}
      <div className="Row self-stretch h-14 inline-flex justify-start items-center">
        <div className="Column flex-1 self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-3">
          <div className="Frame2147205991 flex justify-start items-center cursor-grab">
            <GripVertical size={24} className="text-neutral-50" />
          </div>
          <div className="Text justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
            Overview
          </div>
        </div>
        <div className="Column self-stretch px-6 py-3 border-b border-zinc-700 flex justify-start items-center gap-4">
          <button
            onClick={handleToggle}
            className="Button w-[53.33px] h-7 relative bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline outline-1 outline-offset-[-1px] outline-[#501bd6] overflow-hidden cursor-pointer transition-opacity hover:opacity-90"
            aria-label="Toggle content"
          >
            <div
              className={`Button w-[23.33px] h-[22.67px] absolute bg-white rounded-[66.67px] transition-all duration-200 top-[2.67px] ${
                isEnabled ? "left-[26.67px]" : "left-[3px]"
              }`}
            />
          </button>
          <button
            onClick={handleDelete}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Delete content"
          >
            <Trash2 size={24} className="text-neutral-50" />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="Frame self-stretch px-4 bg-zinc-800 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-700 flex flex-col justify-start items-start overflow-hidden">
        {/* Toolbar */}
        <div className="Frame self-stretch border-b border-zinc-700 inline-flex justify-center items-center">
          <div className="Frame flex justify-start items-start">
            {/* Frame Dropdown */}
            <div className="Frame self-stretch min-h-12 px-3 py-2 border-r border-zinc-700 inline-flex flex-col justify-center items-center gap-2.5">
              <button className="Button inline-flex justify-center items-center gap-1 hover:opacity-70 transition-opacity">
                <Type size={16} className="text-neutral-50" />
                <span className="text-neutral-50 text-sm font-medium">
                  Frame
                </span>
                <ChevronDown size={14} className="text-neutral-50" />
              </button>
            </div>

            {/* Font Size */}
            <div className="Frame self-stretch min-h-12 px-3 py-2 border-r border-zinc-700 inline-flex flex-col justify-center items-center gap-2.5">
              <div className="Button inline-flex justify-center items-center gap-1 overflow-hidden">
                <div className="Text justify-start text-neutral-50 text-base font-bold font-['Plus_Jakarta_Sans'] leading-[22px]">
                  {fontSize}
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => handleFontSizeChange("up")}
                    className="hover:opacity-70"
                    aria-label="Increase font size"
                  >
                    <ChevronUp size={12} className="text-neutral-50" />
                  </button>
                  <button
                    onClick={() => handleFontSizeChange("down")}
                    className="hover:opacity-70"
                    aria-label="Decrease font size"
                  >
                    <ChevronDown size={12} className="text-neutral-50" />
                  </button>
                </div>
              </div>
            </div>

            {/* Text Formatting */}
            <div className="Frame p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
              <button
                onClick={() => execCommand("bold")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Bold"
              >
                <Bold size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("italic")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Italic"
              >
                <Italic size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("underline")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Underline"
              >
                <Underline size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("strikeThrough")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Strikethrough"
              >
                <Strikethrough size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("superscript")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Superscript"
              >
                <Superscript size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("subscript")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Subscript"
              >
                <Subscript size={20} className="text-neutral-50" />
              </button>
            </div>

            {/* Alignment */}
            <div className="Frame p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
              <button
                onClick={() => execCommand("justifyLeft")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Align Left"
              >
                <AlignLeft size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("justifyCenter")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Align Center"
              >
                <AlignCenter size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("justifyRight")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Align Right"
              >
                <AlignRight size={20} className="text-neutral-50" />
              </button>
            </div>

            {/* Lists */}
            <div className="Frame p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
              <button
                onClick={() => execCommand("insertOrderedList")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Ordered List"
              >
                <ListOrdered size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("insertUnorderedList")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Unordered List"
              >
                <List size={20} className="text-neutral-50" />
              </button>
            </div>

            {/* Image and Links */}
            <div className="Frame p-2 border-r border-zinc-700 flex justify-start items-start gap-2">
              <button
                onClick={() => {
                  const url = prompt("Enter image URL:");
                  if (url) execCommand("insertImage", url);
                }}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Insert Image"
              >
                <Type size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => {
                  const url = prompt("Enter URL:");
                  if (url) execCommand("createLink", url);
                }}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Insert Link"
              >
                <Link2 size={20} className="text-neutral-50" />
              </button>
              <button
                onClick={() => execCommand("unlink")}
                className="ButtonIcon w-8 h-8 p-1 flex justify-center items-center hover:bg-zinc-700 rounded transition-colors"
                title="Remove Link"
              >
                <Unlink size={20} className="text-neutral-50" />
              </button>
            </div>
          </div>

          {/* Tags Button */}
          <div className="Frame flex-1 h-12 min-h-12 px-3 py-1 inline-flex flex-col justify-center items-start gap-2.5">
            <button className="Button inline-flex justify-center items-center gap-2 overflow-hidden hover:opacity-70 transition-opacity">
              <Tag size={20} className="text-neutral-50" />
              <div className="Text justify-start text-neutral-50 text-sm font-bold font-['Plus_Jakarta_Sans'] leading-5">
                Tags
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="Frame self-stretch p-6 flex flex-col justify-center items-start gap-6">
          <div className="Frame flex flex-col justify-start items-start gap-2">
            <div
              contentEditable={isEnabled}
              onInput={handleHeadingChange}
              suppressContentEditableWarning={true}
              className="Heading1 justify-start text-neutral-50 text-[40px] font-semibold font-['Urbanist'] outline-none"
              style={{ fontSize: `${fontSize * 2.5}px` }}
            >
              {heading}
            </div>
          </div>
          <div
            ref={contentRef}
            contentEditable={isEnabled}
            onInput={handleContentChange}
            suppressContentEditableWarning={true}
            className="w-[688px] justify-start text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none"
            style={{ fontSize: `${fontSize}px` }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
