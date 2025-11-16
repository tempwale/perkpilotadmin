import DealManagementHeader from "../../components/Deals/DealManagement/DealManagementHeader";
import DealPageSettings from "../../components/Deals/DealManagement/DealPageSettings";
import HeroSectionManagement from "../../components/Deals/DealManagement/HeroSectionManagement";
import ArticleGrid from "../../components/Deals/DealManagement/ArticleGrid";
import FooterActions from "../../components/Deals/DealManagement/FooterActions";

export default function DealManagementPage(): ReactElement{
  return (
    <div className="flex justify-center">
      <div className="p-4 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-center items-center gap-6 w-full max-w-[1116px]">
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
