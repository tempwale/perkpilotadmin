import Author from "../components/AddComparision/Author";
import Header from "../components/AddComparision/Header";
import Hero from "../components/AddComparision/Hero";
import ToolsMentioned from "../components/AddComparision/ToolsMentioned";
import ModulesCard from "../components/AddComparision/ModulesCard";
import ToolBlogCard from "../components/AddComparision/ToolBlogCard";
import FeatureComparision from "../components/AddComparision/FeatureComparision";
import ProConGrid from "../components/AddComparision/ProConGrid";
import MoreComparisions from "../components/AddComparision/MoreComparisions";
export default function AddComparisionPage() {
  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header />
      <Hero />
      <ToolsMentioned />
      <Author />
      <ModulesCard />
      <ToolBlogCard />
      <FeatureComparision />
      <ProConGrid />
      <MoreComparisions />
    </div>
  );
}
