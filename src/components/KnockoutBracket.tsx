import React, { useState, useEffect, useCallback } from "react";
import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Match = {
  id: string;
  round: number;
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
};

type KnockoutBracketProps = {
  qualifyingTeams: Team[];
};

const TOTAL_ROUNDS = 5;

const getRoundStartIndices = (matches: Match[]) => {
  const starts: Record<number, number> = {};
  let idx = 0;
  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    const count = round === 1 ? 16 : Math.pow(2, TOTAL_ROUNDS - round);
    starts[round] = idx;
    idx += count;
  }
  return starts;
};

const KnockoutBracket = ({ qualifyingTeams }: KnockoutBracketProps) => {
  const { t } = useLanguage();
  const [matches, setMatches] = useState<Match[]>([]);

  const initBracket = useCallback(() => {
    if (qualifyingTeams.length !== 32) {
      setMatches([]);
      return;
    }

    const initialMatches: Match[] = [];
    let matchId = 0;

    for (let i = 0; i < 32; i += 2) {
      initialMatches.push({
        id: `r1-${matchId++}`,
        round: 1,
        team1: qualifyingTeams[i] ?? null,
        team2: qualifyingTeams[i + 1] ?? null,
        winner: null,
      });
    }

    const roundMatchCounts = [8, 4, 2, 1];
    roundMatchCounts.forEach((count, idx) => {
      const roundNumber = idx + 2;
      for (let i = 0; i < count; i++) {
        initialMatches.push({
          id: `r${roundNumber}-${matchId++}`,
          round: roundNumber,
          team1: null,
          team2: null,
          winner: null,
        });
      }
    });

    setMatches(initialMatches);
  }, [qualifyingTeams]);

  useEffect(() => {
    initBracket();
  }, [initBracket]);

  const selectWinner = (matchId: string, winner: Team) => {
    setMatches((prev) => {
      const updated = [...prev];
      const matchIndex = updated.findIndex((m) => m.id === matchId);
      if (matchIndex === -1) return prev;

      // 1. Set the winner for this match
      updated[matchIndex] = { ...updated[matchIndex], winner };

      // 2. Propagate winner to the next round
      const currentMatch = updated[matchIndex];
      const nextRound = currentMatch.round + 1;
      if (nextRound <= TOTAL_ROUNDS) {
        const roundStarts = getRoundStartIndices(updated);
        const startIdx = roundStarts[nextRound];
        const offsetInRound = Math.floor((matchIndex - roundStarts[currentMatch.round]) / 2);
        const nextMatchIdx = startIdx + offsetInRound;

        const nextMatch = updated[nextMatchIdx];
        if (nextMatch) {
          const slot = nextMatch.team1 ? "team2" : "team1";
          updated[nextMatchIdx] = { ...nextMatch, [slot]: winner };
        }
      }

      // 3. Clear downstream branches
      // Any match in the same or later rounds that depended on the previous winner must be reset
      const roundStarts = getRoundStartIndices(updated);
      const currentRoundStart = roundStarts[currentMatch.round];
      
      // We clear all matches in the next round that are "descendants" of this match
      // and recursively clear their descendants.
      const clearDownstream = (mIdx: number) => {
        const m = updated[mIdx];
        if (!m) return;
        
        // Clear this match's winner
        updated[mIdx] = { ...m, winner: null };
        
        // Clear the slot in the next round
        const nextRound = m.round + 1;
        if (nextRound <= TOTAL_ROUNDS) {
          const nextStart = roundStarts[nextRound];
          const offset = Math.floor((mIdx - roundStarts[m.round]) / 2);
          const nextIdx = nextStart + offset;
          
          const nextM = updated[nextIdx];
          if (nextM) {
            // Clear the team that came from this match
            const teamToClear = m.winner;
            if (nextM.team1 === teamToClear) updated[nextIdx] = { ...nextM, team1: null, winner: null };
            else if (nextM.team2 === teamToClear) updated[nextIdx] = { ...nextM, team2: null, winner: null };
            
            clearDownstream(nextIdx);
          }
        }
      };

      // To properly clear, we need to clear the next match and its children
      const nextRound = currentMatch.round + 1;
      if (nextRound <= TOTAL_ROUNDS) {
        const nextStart = roundStarts[nextRound];
        const offset = Math.floor((matchIndex - roundStarts[currentMatch.round]) / 2);
        clearDownstream(nextStart + offset);
      }

      return updated;
    });
  };

  const getRoundLabel = (round: number): string => {
    switch (round) {
      case 1: return "Round of 32";
      case 2: return "Round of 16";
      case 3: return t("quarterFinals");
      case 4: return t("semiFinals");
      case 5: return t("final");
      default: return "";
    }
  };

  const renderMatch = (match: Match, isFinal: boolean = false) => {
    const { team1, team2, winner, id } = match;

    return (
      <div className="flex flex-col p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-4 w-48 transition-all">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => team1 && selectWinner(id, team1)}
            disabled={!team1}
            className={`flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors ${
              winner === team1 ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <span>{team1?.flag || "🏳️"}</span>
              <span className="truncate">{team1?.name || "TBD"}</span>
            </span>
            {winner === team1 && <span className="ml-1">✓</span>}
          </button>

          <button
            onClick={() => team2 && selectWinner(id, team2)}
            disabled={!team2}
            className={`flex items-center justify-between px-2 py-1.5 rounded text-xs transition-colors ${
              winner === team2 ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <span>{team2?.flag || "🏳️"}</span>
              <span className="truncate">{team2?.name || "TBD"}</span>
            </span>
            {winner === team2 && <span className="ml-1">✓</span>}
          </button>
        </div>
      </div>
    );
  };

  if (qualifyingTeams.length !== 32) {
    return <div className="text-center p-8 text-gray-500 dark:text-gray-400">{t("waitingForTeams")}</div>;
  }

  const finalMatch = matches.find((m) => m.round === 5);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-6xl mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t("knockoutStage")}</h2>
        <button
          onClick={initBracket}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors"
        >
          {t("resetBracket")}
        </button>
      </div>

      <div className="overflow-x-auto pb-8 w-full">
        <div className="flex gap-8 min-w-max px-4 justify-center">
          {Array.from({ length: TOTAL_ROUNDS }, (_, i) => i + 1).map((round) => (
            <div key={round} className="flex flex-col items-center">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest">
                {getRoundLabel(round)}
              </h3>
              <div className="flex flex-col justify-around h-full gap-4">
                {matches.filter((m) => m.round === round).map((match) => (
                  <div key={match.id} className="flex items-center justify-center">
                    {renderMatch(match, round === TOTAL_ROUNDS)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {finalMatch?.winner && (
        <div className="mt-12 p-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl text-center text-white max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-widest">{t("predictWinner")}</h2>
          <div className="text-6xl mb-4">{finalMatch.winner.flag}</div>
          <div className="text-3xl font-black mb-2">{finalMatch.winner.name}</div>
          <div className="text-white/80 font-medium">{t("final")} {t("champion")}</div>
        </div>
      )}
    </div>
  );
};

export default KnockoutBracket;
