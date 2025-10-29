import HeroSectionManagement from "../components/Deals/DealManagement/HeroSectionManagement";
import FooterActions from "../components/Deals/DealManagement/FooterActions";
import HomeManagementHeader from "../components/HomeManagement/HomeManagementHeader";
import HomePageSettings from "../components/HomeManagement/HomePageSettings";
import DiscountedIcons from "../components/Deals/DealManagement/DiscountedIcons";
import Stats from "../components/HomeManagement/Stats";
import TopPicks from "../components/HomeManagement/TopsPicks";
import SoftwareCompanies from "../components/HomeManagement/SoftwareComparisions";
import TopReviews from "../components/HomeManagement/TopReviews";

export default function HomeManagementPage() {
  return (
    <div className="flex justify-center">
      <div className="p-4 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-center items-center gap-6 w-full max-w-[1116px]">
        <div className="w-full flex flex-col gap-6">
          <HomeManagementHeader />
          <HomePageSettings />
          <HeroSectionManagement />
          <DiscountedIcons />
          <Stats />
          <TopPicks />
          <SoftwareCompanies />
          <TopReviews />
        </div>

        <FooterActions />
      </div>
    </div>
  );
}
