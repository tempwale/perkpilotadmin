import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Deals/AddDeal/Header";
import Hero from "../../components/Deals/AddDeal/Hero";

export default function AddDealPage(): ReactElement{
  const navigate = useNavigate();

  const handleBack = () => {
    void navigate("/deals");
  };

  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header title="New Deal Card" onBack={handleBack} />
      <Hero create={true} />
    </div>
  );
}
