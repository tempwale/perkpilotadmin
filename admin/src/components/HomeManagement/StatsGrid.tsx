import { type ReactElement } from "react";
import StatsCard from "./StatsCard";

export default function StatsGrid(): ReactElement{
  return (
    <div className="flex flex-row gap-4">
      <StatsCard />
      <StatsCard />
      <StatsCard />
      <StatsCard />
    </div>
  );
}
