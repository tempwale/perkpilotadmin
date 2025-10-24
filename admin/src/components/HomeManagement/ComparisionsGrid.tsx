import React from "react";
import ComparisionsCard from "./ComparisionsCard";
import deviconFigma from "../../assets/app-icons/devicon_figma.svg";
import deviconFramermotion from "../../assets/app-icons/devicon_framermotion.svg";
import deviconSlack from "../../assets/app-icons/devicon_slack.svg";
import logosAirtable from "../../assets/app-icons/logos_airtable.svg";
import skillIconsWebflow from "../../assets/app-icons/skill-icons_webflow.svg";

type ComparisionsGridProps = {
  data?: any[];
  searchQuery?: string;
};

const ComparisionsGrid: React.FC<ComparisionsGridProps> = ({ data }) => {
  const comparisons = [
    {
      app1Name: "Framer",
      app1Icon: deviconFramermotion,
      app2Name: "Webflow",
      app2Icon: skillIconsWebflow,
      title: "Framer Vs Webflow",
      subtitle: "Battle of Best No-Code Dev Tool",
      description:
        "Collaborative power vs. desktop dominance. Which one fits your workflow?",
    },
    {
      app1Name: "Figma",
      app1Icon: deviconFigma,
      app2Name: "Adobe XD",
      app2Icon: deviconFigma, // Using Figma icon as placeholder for Adobe XD
      title: "Figma Vs Adobe XD",
      subtitle: "Design Tool Showdown",
      description:
        "Real-time collaboration meets Adobe's ecosystem. Find your perfect design companion.",
    },
    {
      app1Name: "Notion",
      app1Icon: logosAirtable, // Using Airtable icon as placeholder for Notion
      app2Name: "Obsidian",
      app2Icon: deviconSlack, // Using Slack icon as placeholder for Obsidian
      title: "Notion Vs Obsidian",
      subtitle: "Knowledge Management Battle",
      description:
        "All-in-one workspace versus powerful note-linking. Which suits your thinking style?",
    },
  ];

  const handleViewComparison = (title: string) => {
    console.log(`View comparison clicked for: ${title}`);
    // Add your navigation logic here
  };

  const source = data && data.length ? data : comparisons;

  return (
    <div className="w-full lg: py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch">
        {source.map((comparison: any, index: number) => (
          <div key={index} className="w-full flex">
            <ComparisionsCard
              app1Name={comparison.app1Name}
              app1Icon={comparison.app1Icon}
              app2Name={comparison.app2Name}
              app2Icon={comparison.app2Icon}
              title={comparison.title}
              subtitle={comparison.subtitle}
              description={comparison.description}
              onViewComparison={() => handleViewComparison(comparison.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisionsGrid;
