import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import Author from "../../components/Comparisions/AddComparision/Author";
import Header from "../../components/Comparisions/AddComparision/Header";
import Hero from "../../components/Comparisions/AddComparision/Hero";
import ToolsMentioned from "../../components/Comparisions/AddComparision/ToolsMentioned";
import ModulesCard from "../../components/Comparisions/AddComparision/ModulesCard";
import ToolBlogCard from "../../components/Comparisions/AddComparision/ToolBlogCard";
import FeatureComparision from "../../components/Comparisions/AddComparision/FeatureComparision";
import ProConGrid from "../../components/Comparisions/AddComparision/ProConGrid";
import MoreComparisions from "../../components/Comparisions/AddComparision/MoreComparisions";
import FooterActions from "../../components/Comparisions/AddComparision/FooterActions";
import type {
  Tool,
  FeaturesData,
  ProsConsCard,
  ComparisonData,
} from "../../types/comparison.types";
import type { FeatureComparisonApiResponse, BlogSectionApiResponse } from "../../types/api.types";

export default function AddComparisionPage(): ReactElement {
  const navigate = useNavigate();
  const [comparisonData, setComparisonData] = useState<ComparisonData>({
    pageType: "Tool Comparison Blog",
    heroHeading: "",
    heroBody: "",
    comparisonHeroImage:
      "https://via.placeholder.com/800x400?text=Comparison+Hero",
    sectionHeadline: "",
    tipBulbText: "",
    toolsMentioned: [],
    authorId: "", // Changed from 'author' to 'authorId'
    blogCategory: "",
    readingTime: "",
    toolBlogCards: [],
    featuresComparison: {
      sectionTitle: "",
      featuresHeadline: "",
      tools: [],
      features: [],
    },
    prosConsCards: [],
    slug: "",
    isPublished: true,
  });

  const handleHeroHeadingChange = (heading: string): void => {
    const slug = heading
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setComparisonData((prev) => ({
      ...prev,
      heroHeading: heading,
      slug: slug,
    }));
  };

  const handleHeroBodyChange = (body: string): void => {
    setComparisonData((prev) => ({
      ...prev,
      heroBody: body,
    }));
  };

  const handleToolsChange = (tools: Tool[]): void => {
    // Transform tools to match backend structure with default placeholder logos
    const toolsMentioned = tools.map((tool) => ({
      toolName: tool.name || "",
      toolLogo:
        tool.logo ||
        `https://via.placeholder.com/100?text=${tool.name || "Tool"}`, // Default placeholder
      toolCategory: tool.category || "Tool", // Default category
      isVerified: false,
    }));
    setComparisonData((prev) => ({
      ...prev,
      toolsMentioned,
    }));
  };

  const handleToolsHeadlineChange = (headline: string): void => {
    setComparisonData((prev) => ({
      ...prev,
      sectionHeadline: headline,
    }));
  };

  const handleTipChange = (tip: string): void => {  
    setComparisonData((prev) => ({
      ...prev,
      tipBulbText: tip,
    }));
  };

  const handleAuthorChange = (authorId: string): void => {
    setComparisonData((prev) => ({
      ...prev,
      authorId, // Changed from 'author' to 'authorId'
    }));
  };

  const handleBlogCategoryChange = (category: string): void => {
    setComparisonData((prev) => ({
      ...prev,
      blogCategory: category,
    }));
  };

  const handleReadingTimeChange = (time: string): void => {
    setComparisonData((prev) => ({
      ...prev,
      readingTime: time,
    }));
  };

  const handleToolBlogCardsChange = (cards: BlogSectionApiResponse[]): void => {
    const toolBlogCards = cards.map((card) => ({
      sectionNumber: card.sectionNumber,
      blogTitle: card.blogTitle,
      blogBody: card.blogBody,
    }));
    setComparisonData((prev) => ({
      ...prev,
      toolBlogCards,
    }));
  };

  const handleHeroImageChange = (imageUrl: string): void => {
    setComparisonData((prev) => ({
      ...prev,
      comparisonHeroImage:
        imageUrl || "https://via.placeholder.com/800x400?text=Comparison+Hero",
    }));
  };

  const handleFeaturesChange = (featuresData: FeatureComparisonApiResponse): void => {
    // Transform FeatureComparisonApiResponse to FeaturesData
    const transformedFeatures: FeaturesData = {
      sectionTitle: featuresData.sectionTitle,
      featuresHeadline: featuresData.featuresHeadline,
      tools: featuresData.tools,
      features: featuresData.features.map((f) => ({
        featureName: f.featureName,
        toolAvailability: {
          "0": f.tool1Available,
          "1": f.tool2Available,
          "2": f.tool3Available,
        },
      })),
    };
    setComparisonData((prev) => ({
      ...prev,
      featuresComparison: transformedFeatures,
    }));
  };

  const handleProsConsChange = (prosConsData: ProsConsCard[]): void => {
    console.log("Received pros/cons data:", prosConsData);

    // Use the data exactly as it comes from ProConCard
    const prosConsCards = prosConsData.map((item) => ({
      cardNumber: item.cardNumber,
      titlePros: item.titlePros,
      titleCons: item.titleCons,
      prosConsPairs: item.prosConsPairs, // Already in correct format from ProConCard
    }));

    console.log("Transformed pros/cons cards:", prosConsCards);

    setComparisonData((prev) => ({
      ...prev,
      prosConsCards,
    }));
  };

  const handleSaveSuccess = (): void => {
    void Promise.resolve(navigate("/comparisons"));
  };

  const handleSaveError = (error: string): void => {
    console.error("Save error:", error);
  };

  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline-1 -outline-offset-1 outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header onBack={() => {
        void Promise.resolve(navigate(-1));
      }} />
      <Hero
        onHeadingChange={handleHeroHeadingChange}
        onBodyChange={handleHeroBodyChange}
        onImageChange={handleHeroImageChange}
      />
      <ToolsMentioned
        onToolsChange={handleToolsChange}
        onHeadlineChange={handleToolsHeadlineChange}
        onTipChange={handleTipChange}
      />
      <Author
        onAuthorChange={handleAuthorChange}
        onCategoryChange={handleBlogCategoryChange}
        onReadingTimeChange={handleReadingTimeChange}
      />
      <ModulesCard />
      <ToolBlogCard onCardsChange={handleToolBlogCardsChange} />
      <FeatureComparision onFeaturesChange={handleFeaturesChange} />
      <ProConGrid onProsConsChange={handleProsConsChange} />
      <MoreComparisions />
      <FooterActions
        comparisonData={comparisonData}
        onSaveSuccess={handleSaveSuccess}
        onSaveError={handleSaveError}
      />
    </div>
  );
}
