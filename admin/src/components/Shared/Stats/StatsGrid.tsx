import { useEffect, useState, type ReactElement } from "react";
import StatsCard from "./StatsCard";
import { STATS_API } from "../../../config/backend";

interface StatData {
  numberValue: string;
  message: string;
}

interface StatsApiResponse {
  _id?: string;
  stats: StatData[];
  createdAt?: string;
  updatedAt?: string;
}

interface StatsGridProps {
  onStatsChange?: (stats: StatData[]) => void;
}

export default function StatsGrid({ onStatsChange }: StatsGridProps): ReactElement {
  const [stats, setStats] = useState<StatData[]>([
    { numberValue: "", message: "" },
    { numberValue: "", message: "" },
    { numberValue: "", message: "" },
    { numberValue: "", message: "" },
  ]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      try {
        const response = await fetch(STATS_API);
        if (!response.ok) {
          if (response.status === 404) {
            return;
          }
          throw new Error(`Failed to fetch stats: ${response.status}`);
        }
        const data = (await response.json()) as StatsApiResponse;
        if (!mounted) return;
        const fetchedStats = data.stats || [];
        const paddedStats = [
          ...fetchedStats,
          ...Array(Math.max(0, 4 - fetchedStats.length))
            .fill(null)
            .map(() => ({ numberValue: "", message: "" })),
        ].slice(0, 4);
        setStats(paddedStats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        if (mounted) setInitialized(true);
      }
    }

    void fetchStats();
    return () => {
      mounted = false;
    };
  }, []);

  const handleStatChange = (index: number, field: "numberValue" | "message", value: string) => {
    const newStats = [...stats];
    if (!newStats[index]) {
      newStats[index] = { numberValue: "", message: "" };
    }
    newStats[index][field] = value;
    setStats(newStats);
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized) return;
    onStatsChange?.(stats);
  }, [initialized, stats, onStatsChange]);

  return (
    <div className="flex flex-row gap-4">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          numberValue={stat.numberValue}
          message={stat.message}
          onNumberChange={(value) => handleStatChange(index, "numberValue", value)}
          onMessageChange={(value) => handleStatChange(index, "message", value)}
        />
      ))}
    </div>
  );
}

