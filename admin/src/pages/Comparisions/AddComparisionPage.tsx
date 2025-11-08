import { useState } from "react";
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

export default function AddComparisionPage() {
  const navigate = useNavigate();
  const [comparisonData, setComparisonData] = useState<Record<string, any>>({
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

  const handleHeroHeadingChange = (heading: string) => {
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

  const handleHeroBodyChange = (body: string) => {
    setComparisonData((prev) => ({
      ...prev,
      heroBody: body,
    }));
  };

  const handleToolsChange = (tools: any[]) => {
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

  const handleToolsHeadlineChange = (headline: string) => {
    setComparisonData((prev) => ({
      ...prev,
      sectionHeadline: headline,
    }));
  };

  const handleTipChange = (tip: string) => {
    setComparisonData((prev) => ({
      ...prev,
      tipBulbText: tip,
    }));
  };

  const handleAuthorChange = (authorId: string) => {
    setComparisonData((prev) => ({
      ...prev,
      authorId, // Changed from 'author' to 'authorId'
    }));
  };

  const handleBlogCategoryChange = (category: string) => {
    setComparisonData((prev) => ({
      ...prev,
      blogCategory: category,
    }));
  };

  const handleReadingTimeChange = (time: string) => {
    setComparisonData((prev) => ({
      ...prev,
      readingTime: time,
    }));
  };

  const handleToolBlogCardsChange = (cards: any[]) => {
    const toolBlogCards = cards.map((card, index) => ({
      sectionNumber: index + 1,
      blogTitle: card.title,
      blogBody: card.body,
    }));
    setComparisonData((prev) => ({
      ...prev,
      toolBlogCards,
    }));
  };

  const handleHeroImageChange = (imageUrl: string) => {
    setComparisonData((prev) => ({
      ...prev,
      comparisonHeroImage:
        imageUrl || "https://via.placeholder.com/800x400?text=Comparison+Hero",
    }));
  };

  const handleFeaturesChange = (featuresData: any) => {
    // Features are already transformed by FeatureComparison component
    // Just pass them through with proper structure
    setComparisonData((prev) => ({
      ...prev,
      featuresComparison: {
        sectionTitle: featuresData.sectionTitle || "Features",
        featuresHeadline: featuresData.featuresHeadline || "Feature Comparison",
        tools: featuresData.tools || [],
        features: featuresData.features || [],
      },
    }));
  };

  const handleProsConsChange = (prosConsData: any[]) => {
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

  const handleSaveSuccess = () => {
    navigate("/comparisons");
  };

  const handleSaveError = (error: string) => {
    console.error("Save error:", error);
  };

  return (
    <div
      data-layer="Frame 2147206029"
      className="Frame2147206029 w-[1116px] p-6 bg-zinc-900 rounded-3xl outline outline-1 outline-offset-[-1px] outline-zinc-800 inline-flex flex-col justify-start items-start gap-6"
    >
      <Header onBack={() => navigate(-1)} />
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
