import React, { useState, useEffect } from "react";
import Pick from "./PicksCard";

const PicksGrid: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const picksData = [
    {
      appName: "Slack",
      category: "Communication Tool",
      description:
        "Every communications experience, Integrated contact center, voice, video, chat, and APIs.",
      discountPercentage: "25% OFF",
      savingsAmount: "Save Up To $1234",
      rating: "4.8/5.0 Ratings",
      verified: true,
    },
    {
      appName: "Slack",
      category: "Communication Tool",
      description:
        "Every communications experience, Integrated contact center, voice, video, chat, and APIs.",
      discountPercentage: "25% OFF",
      savingsAmount: "Save Up To $1234",
      rating: "4.8/5.0 Ratings",
      verified: true,
    },
    {
      appName: "Slack",
      category: "Communication Tool",
      description:
        "Every communications experience, Integrated contact center, voice, video, chat, and APIs.",
      discountPercentage: "25% OFF",
      savingsAmount: "Save Up To $1234",
      rating: "4.8/5.0 Ratings",
      verified: true,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden px-4 md:px-0">
      {/* scoped style to hide the native scrollbar for this carousel (cross-browser) */}
      <style>{`.picks-scroll::-webkit-scrollbar{display:none}.picks-scroll{scrollbar-width:none;-ms-overflow-style:none}`}</style>
      <div
        className="px-4 overflow-x-auto picks-scroll py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Top picks carousel"
      >
        <div className="flex gap-4 items-stretch snap-x snap-mandatory">
          {picksData
            .slice(0, isDesktop ? picksData.length : 3)
            .map((pick, index) => (
              <div
                key={index}
                className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] snap-start flex-shrink-0"
              >
                <Pick
                  appName={pick.appName}
                  category={pick.category}
                  description={pick.description}
                  discountPercentage={pick.discountPercentage}
                  savingsAmount={pick.savingsAmount}
                  rating={pick.rating}
                  verified={pick.verified}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PicksGrid;
