import DealManagementHeader from "../components/DealManagement/DealManagementHeader";
import DealPageSettings from "../components/DealManagement/DealPageSettings";
import HeroSectionManagement from "../components/DealManagement/HeroSectionManagement";
import ArticleGrid from "../components/DealManagement/ArticleGrid";
import FooterActions from "../components/DealManagement/FooterActions";

export default function DealManagementPage() {
  return (
    <div className="flex justify-center">
      <div className="p-4 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-center items-center gap-6 w-full max-w-[1116px]">
        <div className="w-full flex flex-col gap-6">
          <DealManagementHeader />
          <DealPageSettings />
          <HeroSectionManagement />
          <ArticleGrid />
        </div>

        <FooterActions />
      </div>
    </div>
  );
}
