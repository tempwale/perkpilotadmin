import Hero from "../../components/Reviews/AddReview/Hero";
import Header from "../../components/Reviews/AddReview/Header";
import Tabs from "../../components/Reviews/AddReview/Tabs";
import RatingBreakdown from "../../components/Reviews/AddReview/RatingBreakdown";
import ProsCons from "../../components/Reviews/AddReview/ProsCons";
import BestUseCase from "../../components/Reviews/AddReview/BestUseCase";
import TagChips from "../../components/Reviews/AddReview/TagChips";
import FAQ from "../../components/Reviews/AddReview/FAQ";
import FooterActions from "../../components/Reviews/AddReview/FooterActions";

export default function AddReviewPage() {
  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header />
      <Hero />
      <Tabs />
      <RatingBreakdown />
      <ProsCons />
      <BestUseCase />
      <TagChips />
      <FAQ />
      <FooterActions />
    </div>
  );
}
