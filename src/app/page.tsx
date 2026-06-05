"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import GroupStage from "@/components/GroupStage";
import KnockoutBracket from "@/components/KnockoutBracket";
import { Team } from "@/data/teams";
import { getTopTeams } from "@/utils/simulator";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  const [qualifyingTeams, setQualifyingTeams] = useState<Team[]>([]);
  const [groupStageComplete, setGroupStageComplete] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "vi" : "en");
  };

  const handleGroupStageComplete = useCallback(() => {
    const { top2, bestThirds } = getTopTeams();
    const topTwoTeams: Team[] = Object.values(top2).flat();
    const qualifiers: Team[] = [...topTwoTeams, ...bestThirds];

    if (qualifiers.length !== 32) {
      console.warn(`Expected 32 qualifying teams, but got ${qualifiers.length}.`);
    }

    setQualifyingTeams(qualifiers);
    setGroupStageComplete(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">WC</div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
              World Cup <span className="text-blue-600">2026</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
              {language === "en" ? "ENGLISH" : "TIẾNG VIỆT"}
            </span>
            <button
              onClick={handleLanguageToggle}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-20">
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100">{t("groupStage")}</h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>
          <GroupStage onComplete={handleGroupStageComplete} />
        </section>

        {groupStageComplete && qualifyingTeams.length === 32 ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100">{t("knockoutStage")}</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>
            <KnockoutBracket qualifyingTeams={qualifyingTeams} />
          </section>
        ) : (
          <section className="text-center py-20 bg-white dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="text-4xl mb-4">🔒</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              {t("simulateMatches")} to unlock the {t("knockoutStage")}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
