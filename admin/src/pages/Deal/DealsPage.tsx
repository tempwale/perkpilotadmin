import DealsGrid from "../../components/Deals/Deals/DealsGrid";
import DealsHeader from "../../components/Deals/Deals/DealsHeader";

export default function DealsPage() {
  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <DealsHeader />
      <DealsGrid />
    </div>
  );
}
