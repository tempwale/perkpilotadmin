import type { ReactElement } from "react";
import ReviewsHeader from "../../components/Reviews/Reviews/ReviewsHeader";
import ReviewsGrid from "../../components/Reviews/Reviews/ReviewsGrid";

export default function ManageReviewPage(): ReactElement {
  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <ReviewsHeader />
      <ReviewsGrid />
    </div>
  );
}