import BlogManagementHeader from "../components/Blogs/BlogManagement/BlogManagementHeader";
import BlogPageSettings from "../components/Blogs/BlogManagement/BlogPageSettings";
import HeroSectionManagement from "../components/Blogs/BlogManagement/HeroSectionManagement";
import ArticleGrid from "../components/Blogs/BlogManagement/ArticleGrid";
import FooterActions from "../components/Blogs/BlogManagement/FooterActions";

export default function BlogManagementPage() {
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
