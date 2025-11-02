import Alternatives from "./Tabs/Alternatives";
import Features from "./Tabs/Features";
import Overview from "./Tabs/Overview";
import Pricing from "./Tabs/Pricing";
import Reviews from "./Tabs/Reviews";

export default function Tabs() {
  return (
    <div>
      <div
        data-layer="Frame 2147206000"
        className="Frame2147206000 self-stretch inline-flex flex-col justify-start items-start gap-4"
      >
        <div
          data-layer="Tabs"
          className="Tabs self-stretch justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8"
        >
          Tabs
        </div>
        <Overview />
        <Features />
        <Pricing />
        <Reviews />
        <Alternatives />
      </div>
    </div>
  );
}
