"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import GroupStage from "@/components/GroupStage";
import KnockoutBracket from "@/components/KnockoutBracket";
import { Team } from "@/data/teams";
import { getTopTeams } from "@/utils/simulator";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  // State for the 32 teams that advance to the knockout stage
  const [qualifyingTeams, setQualifyingTeams] = useState<Team[]>([]);
  // Flag indicating whether the group stage has been fully processed
  const [groupStageComplete, setGroupStageComplete] = useState(false);

  // Toggle language between English and Vietnamese
  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "vi" : "en");
  };

  /**
   * Called by the GroupStage component once all group matches have been simulated.
   * It uses the simulator utilities to compute the final standings, selects the
   * top‑2 teams from each group and the 8 best third‑place teams, and stores the
   * resulting 32 teams in state.
   */
  const handleGroupStageComplete = useCallback(() => {
    // Retrieve the top‑2 per group and the best third‑place teams
    const { top2, bestThirds } = getTopTeams();

    // Flatten the top‑2 teams into a single array preserving group order
    const topTwoTeams: Team[] = Object.values(top2).flat();

    // Combine top‑2 and best third‑place teams to form the 32 qualifiers
    const qualifiers: Team[] = [...topTwoTeams, ...bestThirds];

    // Ensure we have exactly 32 teams (defensive check)
    if (qualifiers.length !== 32) {
      console.warn(
        `Expected 32 qualifying teams, but got ${qualifiers.length}.`
      );
    }

    setQualifyingTeams(qualifiers);
    setGroupStageComplete(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("groupStage")} / {t("knockoutStage")}
          </h1>

          {/* Language Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {language === "en" ? "EN" : "VI"}
            </span>
            <button
              onClick={handleLanguageToggle}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${
                  language === "en" ? "translate-x-1" : "translate-x-6"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Group Stage Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            {t("groupStage")}
          </h2>
          {/* Pass the completion handler to GroupStage */}
          <GroupStage onComplete={handleGroupStageComplete} />
        </section>

        {/* Knockout Stage Section – rendered only after group stage is done */}
        {groupStageComplete && qualifyingTeams.length === 32 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              {t("knockoutStage")}
            </h2>
            <KnockoutBracket qualifyingTeams={qualifyingTeams} />
          </section>
        )}

        {/* Placeholder when knockout stage is locked */}
        {!groupStageComplete && (
          <section className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t("simulateMatches")} to unlock the {t("knockoutStage")}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
