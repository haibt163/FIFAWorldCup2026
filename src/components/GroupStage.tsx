"use client";

import React, { useState, useEffect, useCallback } from "react";
import { teams, Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  onPredictComplete: (groupStandings: Record<string, Team[]>) => void;
};

export default function GroupStage({ onPredictComplete }: Props) {
  const { t } = useLanguage();
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  
  const [groupPredictions, setGroupPredictions] = useState<Record<string, Team[]>>(() => {
    const initial: Record<string, Team[]> = {};
    letters.forEach(letter => {
      initial[letter] = teams.filter((t) => t.group === letter);
    });
    return initial;
  });

  const [groupStrengths] = useState<Record<string, "Strong" | "Weak">>({
    A: "Weak", B: "Weak", C: "Strong", D: "Weak",
    E: "Weak", F: "Weak", G: "Weak", H: "Strong",
    I: "Weak", J: "Strong", K: "Strong", L: "Strong"
  });

  const handleQuickMove = useCallback((groupLetter: string, teamId: string, targetIdx: number) => {
    const updatedGroup = [...groupPredictions[groupLetter]];
    const currentIdx = updatedGroup.findIndex(t => t.id === teamId);
    if (currentIdx === -1 || currentIdx === targetIdx) return;
    
    const [movedTeam] = updatedGroup.splice(currentIdx, 1);
    updatedGroup.splice(targetIdx, 0, movedTeam);
    
    const newPredictions = { ...groupPredictions, [groupLetter]: updatedGroup };
    setGroupPredictions(newPredictions);
    onPredictComplete(newPredictions);
  }, [groupPredictions, onPredictComplete]);

  useEffect(() => {
    onPredictComplete(groupPredictions);
  }, [groupPredictions, onPredictComplete]);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-4xl font-serif font-black tracking-tight text-gray-900 uppercase">{t("groupStageTitle")}</h2>
        <p className="text-sm text-gray-600 font-sans mt-2 max-w-4xl leading-relaxed">
          {t("groupStageDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {letters.map((group) => (
          <div key={group} className="bg-[#f6f6f6] border border-gray-200 rounded-xl overflow-hidden shadow-sm p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-sans font-bold text-gray-900 text-base">{t("groupLabel", { group })}</h3>
              <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded text-gray-700 bg-white border border-gray-200 shadow-2xs">
                {groupStrengths[group]}
              </span>
            </div>

            {/* Quick-toggle horizontal row layout */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {groupPredictions[group].map((team) => (
                <button
                  key={`badge-${team.id}`}
                  onClick={() => handleQuickMove(group, team.id, 0)}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 rounded px-2 py-1 text-xs font-sans font-medium text-gray-700 hover:bg-gray-50 shrink-0 shadow-2xs"
                >
                  <span className="text-sm select-none">{team.flag || "🏳️"}</span>
                  <span className="uppercase text-[10px] tracking-wider font-bold text-gray-500">
                    {team.id.substring(0, 3)}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Main ranked lists with vibrant flags */}
            <div className="space-y-1.5 bg-white border border-gray-200 rounded-xl p-2 shadow-inner">
              {groupPredictions[group].map((team, idx) => {
                const styles = [
                  "bg-[#eafaf1] text-[#27ae60] border-l-[#2ec4b6]", 
                  "bg-[#eafaf1] text-[#27ae60] border-l-[#2ec4b6]", 
                  "bg-[#fdfaf0] text-[#f39c12] border-l-[#ff9f1c]", 
                  "bg-[#fafafa] text-gray-400 border-l-gray-300 line-through text-opacity-60" 
                ];

                return (
                  <div 
                    key={team.id} 
                    className={`flex items-center gap-3 p-2 border-l-4 rounded-lg border border-gray-100/80 ${styles[idx]} transition-all`}
                  >
                    <span className="text-xs font-sans font-black w-4 text-center text-gray-500">
                      {idx + 1}
                    </span>
                    
                    <span className="text-xl filter drop-shadow-xs select-none min-w-[24px] text-center">
                      {team.flag || "🏳️"}
                    </span>
                    
                    <span className="flex-1 font-sans font-bold text-sm text-gray-800 tracking-tight">
                      {team.name}
                    </span>

                    <div className="flex flex-col gap-0.5 text-gray-300 select-none px-1">
                      <span className="text-[10px] leading-none">░</span>
                      <span className="text-[10px] leading-none">░</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
