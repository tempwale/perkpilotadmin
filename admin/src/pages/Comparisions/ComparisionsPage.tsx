import ComparisionsGrid from "../../components/Comparisions/Comparisions/ComparisionsGrid";
import ComparisionsHeader from "../../components/Comparisions/Comparisions/ComparisionsHeader";

export default function ComparisionsPage(): ReactElement{
  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <ComparisionsHeader />
      <ComparisionsGrid />
    </div>
  );
}
