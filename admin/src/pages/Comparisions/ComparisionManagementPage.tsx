import { useCallback, useEffect, useMemo, useState, type ReactElement } from "react";
import ComparisionManagementHeader from "../../components/Comparisions/ComparisionManagement/ComparisionManagementHeader";
import ComparisionPageSettings from "../../components/Comparisions/ComparisionManagement/ComparisionPageSettings";
import HeroSectionManagement from "../../components/Comparisions/ComparisionManagement/HeroSectionManagement";
import ArticleGrid from "../../components/Comparisions/ComparisionManagement/ArticleGrid";
import FooterActions from "../../components/Comparisions/ComparisionManagement/FooterActions";
import { fetchComparisonPageSettings, updateComparisonPageSettings } from "../../hooks/useComparisonPageSettings";
import fetchComparisions from "../../hooks/useComparisions";
import type { ComparisonApiResponse } from "../../types/api.types";

const DEFAULT_HERO_SUBHEAD =
  "In-depth reviews, comparisons, and insights about the latest software tools and productivity solutions.";

export default function ComparisionManagementPage(): ReactElement {
  const [settings, setSettings] = useState({
    comparisonPageStatus: "live" as "live" | "maintenance",
    comparisonPageTopTagline: "For Expert Insights",
    comparisonPageHeading: "Software Comparisions",
    comparisonPageSubheading: DEFAULT_HERO_SUBHEAD,
    comparisonPageTags: ["AI Tools", "No-code", "Marketing"],
  });
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [comparisons, setComparisons] = useState<ComparisonApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load(): Promise<void> {
      try {
        setLoading(true);
        const [pageSettings, comparisonsData] = await Promise.all([
          fetchComparisonPageSettings(),
          fetchComparisions(),
        ]);
        if (!mounted) return;
        
        setSettings({
          comparisonPageStatus: pageSettings.comparisonPageStatus ?? "live",
          comparisonPageTopTagline:
            pageSettings.comparisonPageTopTagline ?? "For Expert Insights",
          comparisonPageHeading:
            pageSettings.comparisonPageHeading ?? "Software Comparisions",
          comparisonPageSubheading:
            pageSettings.comparisonPageSubheading ?? DEFAULT_HERO_SUBHEAD,
          comparisonPageTags: pageSettings.comparisonPageTags ?? [],
        });
        setFeaturedIds(
          (pageSettings.featuredComparisons ?? [])
            .map((item: string | ComparisonApiResponse) =>
              typeof item === "string" ? item : item._id ?? ""
            )
            .filter((id): id is string => Boolean(id))
        );
        setComparisons(comparisonsData);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const featuredComparisons = useMemo(
    () =>
      comparisons.filter((comparison) => {
        const id = comparison._id ?? comparison.id ?? comparison.slug;
        return id ? featuredIds.includes(String(id)) : false;
      }),
    [comparisons, featuredIds]
  );

  const handleToggleFeatured = useCallback(
    (id: string) => {
      setFeaturedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setFeaturedIds]
  );

  const handleSave = useCallback(
    async (message = "Comparison page settings saved"): Promise<void> => {
      try {
        setSaving(true);
        setError(null);
        setSuccess(null);
        const payload = {
          comparisonPageStatus: settings.comparisonPageStatus,
          comparisonPageTopTagline: settings.comparisonPageTopTagline,
          comparisonPageHeading: settings.comparisonPageHeading,
          comparisonPageSubheading: settings.comparisonPageSubheading,
          comparisonPageTags: settings.comparisonPageTags,
          featuredComparisons: featuredIds,
        };
        const updated = await updateComparisonPageSettings(payload);
        setSettings({
          comparisonPageStatus: updated.comparisonPageStatus ?? "live",
          comparisonPageTopTagline:
            updated.comparisonPageTopTagline ?? "For Expert Insights",
          comparisonPageHeading:
            updated.comparisonPageHeading ?? "Software Comparisions",
          comparisonPageSubheading:
            updated.comparisonPageSubheading ?? DEFAULT_HERO_SUBHEAD,
          comparisonPageTags: updated.comparisonPageTags ?? [],
        });
        setFeaturedIds(
          (updated.featuredComparisons ?? [])
            .map((item: string | ComparisonApiResponse) =>
              typeof item === "string" ? item : item._id ?? ""
            )
            .filter((id): id is string => Boolean(id))
        );
        setSuccess(message);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setSaving(false);
      }
    },
    [featuredIds, settings]
  );

  const handleHeroChange = useCallback(
    (fields: {
      topTagline: string;
      mainHeadline: string;
      subHeadline: string;
      tags: string[];
    }) => {
      setSettings((prev) => ({
        ...prev,
        comparisonPageTopTagline: fields.topTagline,
        comparisonPageHeading: fields.mainHeadline,
        comparisonPageSubheading: fields.subHeadline,
        comparisonPageTags: fields.tags,
      }));
    },
    []
  );

  return (
    <div className="flex justify-center">
      <div className="p-4 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-center items-center gap-6 w-full max-w-[1116px]">
        <div className="w-full flex flex-col gap-6">
          {error && (
            <div className="w-full px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="w-full px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-200 text-sm">
              {success}
            </div>
          )}
          <ComparisionManagementHeader
            onSave={(): void => {
              void handleSave();
            }}
            isSaving={saving}
          />
          <ComparisionPageSettings
            status={settings.comparisonPageStatus}
            onToggle={(next): void =>
              setSettings((prev) => ({
                ...prev,
                comparisonPageStatus: next,
              }))
            }
          />
          <HeroSectionManagement
            topTagline={settings.comparisonPageTopTagline}
            mainHeadline={settings.comparisonPageHeading}
            subHeadline={settings.comparisonPageSubheading}
            tags={settings.comparisonPageTags}
            onChange={handleHeroChange}
          />
          <ArticleGrid
            comparisons={comparisons}
            featuredIds={featuredIds}
            onToggleFeatured={handleToggleFeatured}
            loading={loading}
          />
          {featuredComparisons.length > 0 && (
            <div className="w-full px-4 py-3 bg-white/5 rounded-2xl text-sm text-neutral-200">
              Featured comparisons selected: {featuredComparisons.length}
            </div>
          )}
        </div>

        <FooterActions
          onSaveDraft={(): void => {
            void handleSave("Draft saved");
          }}
          onSavePublish={(): void => {
            void handleSave("Comparison page published");
          }}
          isSaving={saving}
        />
      </div>
    </div>
  );
}
