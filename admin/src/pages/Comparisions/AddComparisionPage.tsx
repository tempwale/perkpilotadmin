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
    author: "",
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

  const handleAuthorChange = (author: string) => {
    setComparisonData((prev) => ({
      ...prev,
      author,
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
    // Ensure at least 2 cards with default values for missing data
    const minCards = Math.max(2, prosConsData.length);
    const prosConsCards = Array.from({ length: minCards }, (_, index) => {
      const item = prosConsData[index] || {
        titlePros: `Card ${index + 1} - Pros`,
        titleCons: `Card ${index + 1} - Cons`,
        items: [{ pro: "Default Pro", con: "Default Con" }],
      };
      return {
        cardNumber: index + 1,
        titlePros: item.titlePros || `Card ${index + 1} - Pros`,
        titleCons: item.titleCons || `Card ${index + 1} - Cons`,
        prosConsPairs:
          item.items && item.items.length > 0
            ? item.items.map((pair: any) => ({
                pro: pair.pro || "Untitled Pro",
                con: pair.con || "Untitled Con",
              }))
            : [{ pro: "Default Pro", con: "Default Con" }],
      };
    });
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
