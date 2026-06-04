import React, { useState, useEffect } from "react";
import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Match = {
  id: string;
  round: number; // 1 = Round of 32, 2 = Round of 16, 3 = Quarter, 4 = Semi, 5 = Final
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
};

type KnockoutBracketProps = {
  qualifyingTeams: Team[];
};

const TOTAL_ROUNDS = 5;

const KnockoutBracket = ({ qualifyingTeams }: KnockoutBracketProps) => {
  const { t } = useLanguage();
  const [matches, setMatches] = useState<Match[]>([]);

  // Initialize bracket when qualifying teams change
  useEffect(() => {
    if (qualifyingTeams.length !== 32) return;

    const initialMatches: Match[] = [];
    let matchId = 0;

    // Round of 32 (16 matches)
    for (let i = 0; i < 32; i += 2) {
      initialMatches.push({
        id: `r1-${matchId++}`,
        round: 1,
        team1: qualifyingTeams[i] || null,
        team2: qualifyingTeams[i + 1] || null,
        winner: null,
      });
    }

    // Round of 16 (8 matches)
    for (let i = 0; i < 8; i += 2) {
      initialMatches.push({
        id: `r2-${matchId++}`,
        round: 2,
        team1: null,
        team2: null,
        winner: null,
      });
    }

    // Quarter-finals (4 matches)
    for (let i = 0; i < 4; i += 2) {
      initialMatches.push({
        id: `r3-${matchId++}`,
        round: 3,
        team1: null,
        team2: null,
        winner: null,
      });
    }

    // Semi-finals (2 matches)
    for (let i = 0; i < 2; i += 2) {
      initialMatches.push({
        id: `r4-${matchId++}`,
        round: 4,
        team1: null,
        team2: null,
        winner: null,
      });
    }

    // Grand Final (1 match)
    initialMatches.push({
      id: `r5-0`,
      round: 5,
      team1: null,
      team2: null,
      winner: null,
    });

    setMatches(initialMatches);
  }, [qualifyingTeams]);

  // Handle selecting a winner
  const selectWinner = (matchId: string, winner: Team) => {
    setMatches((prev) => {
      const updated = [...prev];
      const matchIndex = updated.findIndex((m) => m.id === matchId);
      if (matchIndex === -1) return prev;

      updated[matchIndex] = { ...updated[matchIndex], winner };

      // Find the next round match and assign this winner
      const currentMatch = updated[matchIndex];
      const nextRound = currentMatch.round + 1;
      if (nextRound <= TOTAL_ROUNDS) {
        const nextMatchIndex = updated.findIndex(
          (m) => m.round === nextRound && m.id > matchId
        );
        if (nextMatchIndex !== -1 && !updated[nextMatchIndex].team1) {
          const nextMatch = updated[nextMatchIndex];
          const slotToUpdate = nextMatch.team1 ? "team2" : "team1";
          updated[nextMatchIndex] = {
            ...nextMatch,
            [slotToUpdate]: winner,
          };
        }
      }

      return updated;
    });
  };

  // Get matches for a specific round
  const getMatchesByRound = (round: number): Match[] => {
    return matches.filter((m) => m.round === round);
  };

  // Get round label
  const getRoundLabel = (round: number): string => {
    switch (round) {
      case 1:
        return "Round of 32";
      case 2:
        return "Round of 16";
      case 3:
        return t("quarterFinals");
      case 4:
        return t("semiFinals");
      case 5:
        return t("final");
      default:
        return "";
    }
  };

  // Render a single match
  const renderMatch = (match: Match, isFinal: boolean = false) => {
    const { team1, team2, winner } = match;

    return (
      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm mb-4 min-w-[180px]">
        <div className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-300">
          {getRoundLabel(match.round)}
        </div>
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={() => team1 && selectWinner(match.id, team1)}
            disabled={!team1 || (team2 !== null && winner !== null)}
            className={`flex-1 text-left px-2 py-1 rounded ${
              winner === team1
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            } ${!team1 || (team2 !== null && winner !== null) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span className="text-sm">{team1?.flag || ""}</span>
            <span className="text-xs ml-1">{team1?.name || "TBD"}</span>
          </button>
          <span className="text-gray-400 font-bold">vs</span>
          <button
            onClick={() => team2 && selectWinner(match.id, team2)}
            disabled={!team2 || (team1 !== null && winner !== null)}
            className={`flex-1 text-right px-2 py-1 rounded ${
              winner === team2
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            } ${!team2 || (team1 !== null && winner !== null) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span className="text-sm">{team2?.flag || ""}</span>
            <span className="text-xs ml-1">{team2?.name || "TBD"}</span>
          </button>
        </div>
        {winner && !isFinal && (
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
            Winner: {winner.name}
          </div>
        )}
      </div>
    );
  };

  // Render the full bracket
  const renderBracket = () => {
    return (
      <div className="space-y-6">
        {Array.from({ length: TOTAL_ROUNDS }, (_, i) => i + 1).map((round) => (
          <div key={round} className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {getRoundLabel(round)}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {getMatchesByRound(round).map((match) =>
                renderMatch(match, round === TOTAL_ROUNDS)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render champion banner
  const renderChampion = () => {
    const finalMatch = matches.find((m) => m.round === 5);
    if (!finalMatch?.winner) return null;

    return (
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{t("predictWinner")}</h2>
        <div className="text-4xl mb-2">{finalMatch.winner.flag}</div>
        <div className="text-xl font-semibold text-white">{finalMatch.winner.name}</div>
        <div className="text-white/80 mt-1">{t("final")} Champion</div>
      </div>
    );
  };

  if (qualifyingTeams.length !== 32) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        Waiting for 32 qualifying teams from the Group Stage...
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        {t("knockoutStage")}
      </h2>
      {renderBracket()}
      {renderChampion()}
    </div>
  );
};

export default KnockoutBracket;
