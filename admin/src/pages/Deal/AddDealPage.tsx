import type { ReactElement } from "react";
import Header from "../../components/Deals/AddDeal/Header";
import Hero from "../../components/Deals/AddDeal/Hero";

export default function AddDealPage(): ReactElement{
  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header title="New Deal Card" />
      <Hero />
      {/* Add your form or components for adding a deal here */}
    </div>
  );
}
