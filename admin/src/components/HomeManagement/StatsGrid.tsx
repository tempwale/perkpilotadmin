import StatsCard from "./StatsCard";

export default function StatsGrid() {
  return (
    <div className="flex flex-row gap-4">
      <StatsCard />
      <StatsCard />
      <StatsCard />
      <StatsCard />
    </div>
  );
}
