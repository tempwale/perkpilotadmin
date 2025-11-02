import ProConCard from "./ProConCard";

type Props = {
  onProsConsChange?: (prosConsData: any[]) => void;
};

export default function ProConGrid({ onProsConsChange }: Props) {
  return <ProConCard onProsConsChange={onProsConsChange} />;
}
