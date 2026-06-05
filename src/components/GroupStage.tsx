"use client";

import React, { useState, useCallback } from "react";
import { teams, Team } from "@/data/teams";
import { calculateGroupStandings, GroupStanding } from "@/utils/simulator";
import TeamCard from "./TeamCard";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  onComplete: () => void;
};

export default function GroupStage({ onComplete }: Props) {
  const { t } = useLanguage();
  const [groupResults, setGroupResults] = useState<Record<string, GroupStanding[]>>({});
  const [isSimulated, setIsSimulated] = useState(false);

  const handleSimulateAll = useCallback(() => {
    const groups: Record<string, Team[]> = {};
    teams.forEach((t) => {
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });

    const results: Record<string, GroupStanding[]> = {};
    Object.entries(groups).forEach(([group, groupTeams]) => {
      results[group] = calculateGroupStandings(groupTeams);
    });

    setGroupResults(results);
    setIsSimulated(true);
    onComplete();
  }, [onComplete]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {t("groupStage")} • 48 Teams • 12 Groups
        </div>
        {!isSimulated && (
          <button
            onClick={handleSimulateAll}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            {t("simulateMatches")}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((group) => (
          <div 
            key={group} 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <h3 className="font-bold text-gray-800 dark:text-white">Group {group}</h3>
            </div>
            <div className="p-3 space-y-2">
              {isSimulated ? (
                groupResults[group]?.map((s, idx) => (
                  <div key={s.team.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}</span>
                    <TeamCard 
                      team={s.team} 
                      points={s.points} 
                      goalDifference={s.goalDifference} 
                      goalsFor={s.goalsFor} 
                      goalsAgainst={s.goalsAgainst} 
                    />
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm italic">
                  {t("simulateMatches")} to see standings
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
