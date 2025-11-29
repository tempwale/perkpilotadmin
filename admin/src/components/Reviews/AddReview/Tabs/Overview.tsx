import {type ReactElement} from "react";
import BlogBodyEditor from "../../../Shared/BlogBodyEditor";

export type OverviewData =
  | string
  | {
      heading?: string;
      content?: string | string[];
    };

type Props = {
  initialOverview?: OverviewData;
  onOverviewChange?: (overview: OverviewData) => void;
};

export default function Overview({ initialOverview, onOverviewChange }: Props = {}): ReactElement {
  // Convert OverviewData to string for BlogBodyEditor
  const getInitialContent = (): string => {
    if (!initialOverview) return "";
    if (typeof initialOverview === "string") return initialOverview;
    if (Array.isArray(initialOverview.content)) {
      return initialOverview.content.join("\n\n");
    }
    return initialOverview.content || "";
  };

  const handleBodyChange = (htmlContent: string): void => {
    // Store as string - BlogBodyEditor returns HTML
    onOverviewChange?.(htmlContent);
  };

  return (
    <BlogBodyEditor
      initialBody={getInitialContent()}
      onBodyChange={handleBodyChange}
      label="Product Overview Editor"
    />
  );
}
