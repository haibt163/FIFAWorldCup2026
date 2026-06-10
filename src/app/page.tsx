"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import GroupStage from "@/components/GroupStage";
import ThirdPlaceRanker from "@/components/ThirdPlaceRanker";
import KnockoutBracket from "@/components/KnockoutBracket";
import ChampionBanner from "@/components/ChampionBanner";
import { Team } from "@/data/teams";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [groupStandings, setGroupStandings] = useState<Record<string, Team[]>>({});
  const [bestThirds, setBestThirds] = useState<Team[]>([]);
  const [champion, setChampion] = useState<Team | null>(null); // Track the champion

  const handleGroupPredict = useCallback((predictions: Record<string, Team[]>) => {
    setGroupStandings(predictions);
  }, []);

  const handleChampionSelected = useCallback((team: Team | null) => {
    setChampion(team);
  }, []);

  const thirdPlaceCandidates = Object.values(groupStandings)
    .map(g => g[2])
    .filter(Boolean);

  const qualifyingPool: Team[] = [];
  Object.values(groupStandings).forEach((teams) => {
    if (teams[0]) qualifyingPool.push(teams[0]);
    if (teams[1]) qualifyingPool.push(teams[1]);
  });

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Changed w-10 to px-3 to let the box dynamically fit "SPEED26" */}
            <div className="h-10 px-3 bg-black text-white flex items-center justify-center font-serif font-black text-base shrink-0 rounded">
              SPEED26
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-gray-900 uppercase">
              FIFA WORLD CUP 2026 <span className="font-sans font-normal text-sm sm:text-base text-gray-500 normal-case tracking-normal ml-2">Predictor Simulator</span>
            </h1>
          </div>
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
            <KnockoutBracket 
              qualifyingTeams={qualifyingPool} 
              selectedBestThirds={bestThirds}
              onChampionSelected={handleChampionSelected}
            />
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

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-gray-900 tracking-wider">SPEED26</span>
            <span>&copy; {new Date().getFullYear()} World Cup 2026 Predictor.</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-600">
              {language === "en" ? "vibecoded by" : "được vibecode bởi"}{" "}
              <span className="font-semibold text-gray-900">Maris Filius</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Champion Banner - shows when champion is selected */}
      <ChampionBanner champion={champion} />
    </div>
  );
}