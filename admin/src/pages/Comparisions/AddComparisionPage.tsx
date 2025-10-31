import Author from "../../components/Comparisions/AddComparision/Author";
import Header from "../../components/Comparisions/AddComparision/Header";
import Hero from "../../components/Comparisions/AddComparision/Hero";
import ToolsMentioned from "../../components/Comparisions/AddComparision/ToolsMentioned";
import ModulesCard from "../../components/Comparisions/AddComparision/ModulesCard";
import ToolBlogCard from "../../components/Comparisions/AddComparision/ToolBlogCard";
import FeatureComparision from "../../components/Comparisions/AddComparision/FeatureComparision";
import ProConGrid from "../../components/Comparisions/AddComparision/ProConGrid";
import MoreComparisions from "../../components/Comparisions/AddComparision/MoreComparisions";
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
