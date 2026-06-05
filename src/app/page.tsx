"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import GroupStage from "@/components/GroupStage";
import ThirdPlaceRanker from "@/components/ThirdPlaceRanker";
import KnockoutBracket from "@/components/KnockoutBracket";
import { Team } from "@/data/teams";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [groupStandings, setGroupStandings] = useState<Record<string, Team[]>>({});
  const [bestThirds, setBestThirds] = useState<Team[]>([]);

  const handleGroupPredict = useCallback((predictions: Record<string, Team[]>) => {
    setGroupStandings(predictions);
  }, []);

  const thirdPlaceCandidates = Object.values(groupStandings)
    .map((g) => g[2])
    .filter(Boolean);

  const qualifyingPool: Team[] = [];
  Object.values(groupStandings).forEach((teams) => {
    if (teams[0]) qualifyingPool.push(teams[0]);
    if (teams[1]) qualifyingPool.push(teams[1]);
  });

  const fullContenders = [...qualifyingPool, ...bestThirds];

  return (
    <div className="min-h-screen flex flex-col bg-white transition-colors duration-300">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Official Top Subtle Banner Strip */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#3cac3b] via-[#2a398d] to-[#e61d25]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Official styled stacked '26' square graphic asset indicator */}
            <div className="w-9 h-9 bg-black text-white flex flex-col items-center justify-center rounded font-sans font-black text-xs leading-none tracking-tighter select-none">
              <span>2</span>
              <span>6</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-black tracking-tight text-gray-900 uppercase leading-none">
                WORLD CUP 2026
              </h1>
              <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-gray-400">
                Official Predictor Simulator
              </span>
            </div>
          </div>

          <button
            onClick={() => setLanguage(language === "en" ? "vi" : "en")}
            className="text-xs font-sans font-bold border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 text-gray-700 shadow-2xs"
            aria-label={t("languageSwitch", { lang: language === "en" ? "vi" : "en" })}
          >
            {language === "en" ? "ENGLISH" : "TIẾNG VIỆT"}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-14">
        <section>
          <GroupStage onPredictComplete={handleGroupPredict} />
        </section>

        {thirdPlaceCandidates.length === 12 && (
          <section className="bg-white pt-4">
            <ThirdPlaceRanker
              thirdPlaceTeams={thirdPlaceCandidates}
              selectedBestThirds={bestThirds}
              onSelectionChange={setBestThirds}
            />
          </section>
        )}

        {bestThirds.length === 8 ? (
          <section className="pt-4 border-t border-gray-200">
            <KnockoutBracket qualifyingTeams={fullContenders} />
          </section>
        ) : (
          <section className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-gray-500 text-sm font-sans font-medium">
              Please finish selecting exactly 8 best third-place teams above to build out the full tournament tree.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
