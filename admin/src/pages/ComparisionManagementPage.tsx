import BlogManagementHeader from "../components/BlogManagement/BlogManagementHeader";
import BlogPageSettings from "../components/BlogManagement/BlogPageSettings";
import HeroSectionManagement from "../components/BlogManagement/HeroSectionManagement";
import ArticleGrid from "../components/BlogManagement/ArticleGrid";
import FooterActions from "../components/BlogManagement/FooterActions";

export default function ComparisionManagementPage() {
  return (
    <div className="flex justify-center">
      <div className="p-4 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-center items-center gap-6 w-full max-w-[1116px]">
        <div className="w-full flex flex-col gap-6">
          <BlogManagementHeader />
          <BlogPageSettings />
          <HeroSectionManagement />
          <ArticleGrid />
        </div>

        <FooterActions />
      </div>
    </div>
  );
}
