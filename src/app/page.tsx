"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import GroupStage from "@/components/GroupStage";
import ThirdPlaceRanker from "@/components/ThirdPlaceRanker";
import KnockoutBracket from "@/components/KnockoutBracket";
import { Team } from "@/data/teams";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [groupStandings, setGroupStandings] = useState<Record<string, Team[]>>({});
  const [bestThirds, setBestThirds] = useState<Team[]>([]);

  const handleGroupPredict = useCallback((predictions: Record<string, Team[]>) => {
    setGroupStandings(predictions);
  }, []);

  const thirdPlaceCandidates = Object.values(groupStandings)
    .map(g => g[2])
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-serif font-black text-base shrink-0 rounded">AI</div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-gray-900 uppercase">
              FOOTBALL AI <span className="font-sans font-normal text-sm sm:text-base text-gray-500 normal-case tracking-normal ml-2">Predictor Simulator</span>
            </h1>
          </div>
          <button
            onClick={() => setLanguage(language === "en" ? "vi" : "en")}
            className="text-sm font-sans font-bold border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {language === "en" ? "VIETNAMESE" : "ENGLISH"}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-16">
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
          <section className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-3xl mb-3">🔒</div>
            <p className="text-gray-500 text-base font-sans font-medium max-w-md mx-auto">
              {language === "en" 
                ? "Please finish selecting exactly 8 best third-place teams above to build out the full tournament tree."
                : "Vui lòng hoàn thành việc chọn chính xác 8 đội xếp thứ ba tốt nhất ở trên để hiển thị sơ đồ vòng loại trực tiếp."}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}