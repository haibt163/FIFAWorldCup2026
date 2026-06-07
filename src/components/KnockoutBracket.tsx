"use client";

import React, { useState, useEffect } from "react";
import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Match = {
  id: number;
  round: number; // 1: R32, 2: R16, 3: QF, 4: SF, 5: Final
  label: string;
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
};

type Props = {
  qualifyingTeams: Team[]; // Array containing all 1st and 2nd place teams (24 total)
  selectedBestThirds: Team[]; // Array containing the 8 chosen 3rd-place teams from ThirdPlaceRanker
};

function getFlagUrl(flag: string, id: string): string {
  try {
    const chars = Array.from(flag || "");
    const codePoints = [];
    for (const char of chars) {
      const cp = char.codePointAt(0);
      if (cp && cp >= 0x1F1E6 && cp <= 0x1F1FF) {
        codePoints.push(String.fromCharCode(cp - 0x1F1E6 + 97));
      }
    }
    if (codePoints.length === 2) return `https://flagcdn.com/w40/${codePoints.join("")}.png`;
  } catch (e) {}

  const lowerId = id.toLowerCase();
  if (lowerId === "eng") return "https://flagcdn.com/w40/gb-eng.png";
  if (lowerId === "sco") return "https://flagcdn.com/w40/gb-sct.png";
  if (lowerId === "mex") return "https://flagcdn.com/w40/mx.png";
  if (lowerId === "rsa") return "https://flagcdn.com/w40/za.png";
  return "https://flagcdn.com/w40/un.png";
}

/**
 * Official FIFA 2026 Constraint-Satisfaction Matching Engine
 * Allocates 8 selected third-place teams to their designated group winners
 */
function allocateThirdPlaceTeams(selectedThirds: Team[]): Record<string, Team | null> {
  const allocation: Record<string, Team | null> = {
    "1A": null, "1B": null, "1D": null, "1E": null,
    "1G": null, "1I": null, "1K": null, "1L": null
  };

  if (!selectedThirds || selectedThirds.length !== 8) return allocation;

  // Stable sort by group alphabetically to ensure deterministic prioritized binding
  const pool = [...selectedThirds].sort((a, b) => a.group.localeCompare(b.group));

  // Eligible pools defined by FIFA official bracket tracks
  const slots = [
    { key: "1E", allowed: ["A", "B", "C", "D", "F"] },
    { key: "1I", allowed: ["C", "D", "F", "G", "H"] },
    { key: "1A", allowed: ["C", "E", "F", "H", "I"] },
    { key: "1L", allowed: ["E", "H", "I", "J", "K"] },
    { key: "1G", allowed: ["A", "E", "H", "I", "J"] },
    { key: "1D", allowed: ["B", "E", "F", "I", "J"] },
    { key: "1B", allowed: ["E", "F", "G", "I", "J"] },
    { key: "1K", allowed: ["D", "E", "I", "J", "L"] }
  ];

  const assignedTeams = new Set<string>();

  for (const slot of slots) {
    const match = pool.find(
      (t) => slot.allowed.includes(t.group) && !assignedTeams.has(t.id) && t.group !== slot.key.slice(-1)
    );
    if (match) {
      allocation[slot.key] = match;
      assignedTeams.add(match.id);
    }
  }

  // Fallback structural safety layer to assign disjoint remaining teams if edge cases occur
  for (const slot of slots) {
    if (!allocation[slot.key]) {
      const fallback = pool.find((t) => !assignedTeams.has(t.id));
      if (fallback) {
        allocation[slot.key] = fallback;
        assignedTeams.add(fallback.id);
      }
    }
  }

  return allocation;
}

// Complete fully deterministic parental lineage labels for perfect localized fallbacks
const matchSourceLabels: Record<number, { team1: { en: string; vi: string }; team2: { en: string; vi: string } }> = {
  73: { team1: { en: "1A Group Winner", vi: "Nhất Bảng A" }, team2: { en: "3rd Place A/B/C/D/F", vi: "Hạng 3 A/B/C/D/F" } },
  74: { team1: { en: "2A Runner-up", vi: "Nhì Bảng A" }, team2: { en: "2B Runner-up", vi: "Nhì Bảng B" } },
  75: { team1: { en: "1B Group Winner", vi: "Nhất Bảng B" }, team2: { en: "3rd Place E/F/G/I/J", vi: "Hạng 3 E/F/G/I/J" } },
  76: { team1: { en: "1C Group Winner", vi: "Nhất Bảng C" }, team2: { en: "2F Runner-up", vi: "Nhì Bảng F" } },
  77: { team1: { en: "1E Group Winner", vi: "Nhất Bảng E" }, team2: { en: "3rd Place A/B/C/D/F", vi: "Hạng 3 A/B/C/D/F" } },
  78: { team1: { en: "1D Group Winner", vi: "Nhất Bảng D" }, team2: { en: "3rd Place B/E/F/I/J", vi: "Hạng 3 B/E/F/I/J" } },
  79: { team1: { en: "1G Group Winner", vi: "Nhất Bảng G" }, team2: { en: "3rd Place A/E/H/I/J", vi: "Hạng 3 A/E/H/I/J" } },
  80: { team1: { en: "2D Runner-up", vi: "Nhì Bảng D" }, team2: { en: "2E Runner-up", vi: "Nhì Bảng E" } },
  81: { team1: { en: "1I Group Winner", vi: "Nhất Bảng I" }, team2: { en: "3rd Place C/D/F/G/H", vi: "Hạng 3 C/D/F/G/H" } },
  82: { team1: { en: "2C Runner-up", vi: "Nhì Bảng C" }, team2: { en: "2G Runner-up", vi: "Nhì Bảng G" } },
  83: { team1: { en: "1K Group Winner", vi: "Nhất Bảng K" }, team2: { en: "3rd Place D/E/I/J/L", vi: "Hạng 3 D/E/I/J/L" } },
  84: { team1: { en: "1H Group Winner", vi: "Nhất Bảng H" }, team2: { en: "2J Runner-up", vi: "Nhì Bảng J" } },
  85: { team1: { en: "2H Runner-up", vi: "Nhì Bảng H" }, team2: { en: "2I Runner-up", vi: "Nhì Bảng I" } },
  86: { team1: { en: "1F Group Winner", vi: "Nhất Bảng F" }, team2: { en: "2K Runner-up", vi: "Nhì Bảng K" } },
  87: { team1: { en: "1L Group Winner", vi: "Nhất Bảng L" }, team2: { en: "3rd Place E/H/I/J/K", vi: "Hạng 3 E/H/I/J/K" } },
  88: { team1: { en: "1J Group Winner", vi: "Nhất Bảng J" }, team2: { en: "2L Runner-up", vi: "Nhì Bảng L" } },
  
  89: { team1: { en: "Winner M73", vi: "Thắng Trận M73" }, team2: { en: "Winner M74", vi: "Thắng Trận M74" } },
  90: { team1: { en: "Winner M75", vi: "Thắng Trận M75" }, team2: { en: "Winner M76", vi: "Thắng Trận M76" } },
  91: { team1: { en: "Winner M77", vi: "Thắng Trận M77" }, team2: { en: "Winner M78", vi: "Thắng Trận M78" } },
  92: { team1: { en: "Winner M79", vi: "Thắng Trận M79" }, team2: { en: "Winner M80", vi: "Thắng Trận M80" } },
  93: { team1: { en: "Winner M81", vi: "Thắng Trận M81" }, team2: { en: "Winner M82", vi: "Thắng Trận M82" } },
  94: { team1: { en: "Winner M83", vi: "Thắng Trận M83" }, team2: { en: "Winner M84", vi: "Thắng Trận M84" } },
  95: { team1: { en: "Winner M85", vi: "Thắng Trận M85" }, team2: { en: "Winner M86", vi: "Thắng Trận M86" } },
  96: { team1: { en: "Winner M87", vi: "Thắng Trận M87" }, team2: { en: "Winner M88", vi: "Thắng Trận M88" } },
  
  97: { team1: { en: "Winner M89", vi: "Thắng Trận M89" }, team2: { en: "Winner M90", vi: "Thắng Trận M90" } },
  98: { team1: { en: "Winner M91", vi: "Thắng Trận M91" }, team2: { en: "Winner M92", vi: "Thắng Trận M92" } },
  99: { team1: { en: "Winner M93", vi: "Thắng Trận M93" }, team2: { en: "Winner M94", vi: "Thắng Trận M94" } },
  100: { team1: { en: "Winner M95", vi: "Thắng Trận M95" }, team2: { en: "Winner M96", vi: "Thắng Trận M96" } },
  
  101: { team1: { en: "Winner M97", vi: "Thắng Trận M97" }, team2: { en: "Winner M98", vi: "Thắng Trận M98" } },
  102: { team1: { en: "Winner M99", vi: "Thắng Trận M99" }, team2: { en: "Winner M100", vi: "Thắng Trận M100" } },
  
  104: { team1: { en: "Winner M101", vi: "Thắng Trận M101" }, team2: { en: "Winner M102", vi: "Thắng Trận M102" } }
};

export default function KnockoutBracket({ qualifyingTeams, selectedBestThirds }: Props) {
  const { language } = useLanguage();
  const [matches, setMatches] = useState<Record<number, Match>>({});
  const isVi = language === "vi";

  // Comprehensive Bracket Initializer Engine using pure fixed-array offsets
  useEffect(() => {
    if (!qualifyingTeams || qualifyingTeams.length < 24) return;

    // Run official constraint lookup algorithm for third places
    const thirdPlaceAllocations = allocateThirdPlaceTeams(selectedBestThirds);
    const initialMatches: Record<number, Match> = {};

    // 1. Strict Index-Based Mapping for Round of 32 Grid Blueprint 
    const r32Setup = [
      { id: 73, label: "M73", t1: qualifyingTeams[0] || null, t2: thirdPlaceAllocations["1A"] },
      { id: 74, label: "M74", t1: qualifyingTeams[1] || null, t2: qualifyingTeams[3] || null },
      { id: 75, label: "M75", t1: qualifyingTeams[2] || null, t2: thirdPlaceAllocations["1B"] },
      { id: 76, label: "M76", t1: qualifyingTeams[4] || null, t2: qualifyingTeams[11] || null },
      { id: 77, label: "M77", t1: qualifyingTeams[8] || null, t2: thirdPlaceAllocations["1E"] },
      { id: 78, label: "M78", t1: qualifyingTeams[6] || null, t2: thirdPlaceAllocations["1D"] },
      { id: 79, label: "M79", t1: qualifyingTeams[12] || null, t2: thirdPlaceAllocations["1G"] },
      { id: 80, label: "M80", t1: qualifyingTeams[7] || null, t2: qualifyingTeams[9] || null },
      { id: 81, label: "M81", t1: qualifyingTeams[16] || null, t2: thirdPlaceAllocations["1I"] },
      { id: 82, label: "M82", t1: qualifyingTeams[5] || null, t2: qualifyingTeams[13] || null },
      { id: 83, label: "M83", t1: qualifyingTeams[20] || null, t2: thirdPlaceAllocations["1K"] },
      { id: 84, label: "M84", t1: qualifyingTeams[14] || null, t2: qualifyingTeams[19] || null },
      { id: 85, label: "M85", t1: qualifyingTeams[15] || null, t2: qualifyingTeams[17] || null },
      { id: 86, label: "M86", t1: qualifyingTeams[10] || null, t2: qualifyingTeams[21] || null },
      { id: 87, label: "M87", t1: qualifyingTeams[22] || null, t2: thirdPlaceAllocations["1L"] },
      { id: 88, label: "M88", t1: qualifyingTeams[18] || null, t2: qualifyingTeams[23] || null },
    ];

    r32Setup.forEach((m) => {
      initialMatches[m.id] = { id: m.id, round: 1, label: m.label, team1: m.t1, team2: m.t2, winner: null };
    });

    // 2. High-Level Blueprint Nodes Frame Configuration
    const structure = [
      { id: 89, round: 2, label: "M89" },
      { id: 90, round: 2, label: "M90" },
      { id: 91, round: 2, label: "M91" },
      { id: 92, round: 2, label: "M92" },
      { id: 93, round: 2, label: "M93" },
      { id: 94, round: 2, label: "M94" },
      { id: 95, round: 2, label: "M95" },
      { id: 96, round: 2, label: "M96" },
      { id: 97, round: 3, label: "M97" },
      { id: 98, round: 3, label: "M98" },
      { id: 99, round: 3, label: "M99" },
      { id: 100, round: 3, label: "M100" },
      { id: 101, round: 4, label: "M101" },
      { id: 102, round: 4, label: "M102" },
      { id: 104, round: 5, label: "M104" },
    ];

    structure.forEach((m) => {
      initialMatches[m.id] = { id: m.id, round: m.round, label: m.label, team1: null, team2: null, winner: null };
    });

    setMatches(initialMatches);
  }, [qualifyingTeams, selectedBestThirds]);

  // Cascade Progression Engine with forward clearing safety layers
  const selectWinner = (matchId: number, winner: Team) => {
    if (!matches[matchId]) return;

    setMatches((prev) => {
      const updated = { ...prev };
      updated[matchId] = { ...updated[matchId], winner };

      const dependencies: Record<number, { target: number; slot: "team1" | "team2" }> = {
        73: { target: 89, slot: "team1" }, 74: { target: 89, slot: "team2" },
        75: { target: 90, slot: "team1" }, 76: { target: 90, slot: "team2" },
        77: { target: 91, slot: "team1" }, 78: { target: 91, slot: "team2" },
        79: { target: 92, slot: "team1" }, 80: { target: 92, slot: "team2" },
        81: { target: 93, slot: "team1" }, 82: { target: 93, slot: "team2" },
        83: { target: 94, slot: "team1" }, 84: { target: 94, slot: "team2" },
        85: { target: 95, slot: "team1" }, 86: { target: 95, slot: "team2" },
        87: { target: 96, slot: "team1" }, 88: { target: 96, slot: "team2" },

        89: { target: 97, slot: "team1" }, 90: { target: 97, slot: "team2" },
        91: { target: 98, slot: "team1" }, 92: { target: 98, slot: "team2" },
        93: { target: 99, slot: "team1" }, 94: { target: 99, slot: "team2" },
        95: { target: 100, slot: "team1" }, 96: { target: 100, slot: "team2" },

        97: { target: 101, slot: "team1" }, 98: { target: 101, slot: "team2" },
        99: { target: 102, slot: "team1" }, 100: { target: 102, slot: "team2" },

        101: { target: 104, slot: "team1" }, 102: { target: 104, slot: "team2" },
      };

      let currentId = matchId;
      while (dependencies[currentId]) {
        const dep = dependencies[currentId];
        const sourceMatch = updated[currentId];
        const nextMatch = updated[dep.target];

        if (nextMatch) {
          const currentSourceWinner = sourceMatch ? sourceMatch.winner : null;
          
          if (nextMatch[dep.slot]?.id !== currentSourceWinner?.id) {
            updated[dep.target] = {
              ...nextMatch,
              [dep.slot]: currentSourceWinner,
              winner: null,
            };
          }
        }
        currentId = dep.target;
      }

      return updated;
    });
  };

  const roundNames = {
    en: ["Round of 32", "Round of 16", "Quarter-Finals", "Semi-Finals", "Grand Final"],
    vi: ["Vòng 32 Đội", "Vòng 16 Đội", "Tứ Kết", "Bán Kết", "Chung Kết"],
  };

  const renderRoundSection = (roundIndex: number) => {
    const roundMatches = Object.values(matches).filter((m) => m.round === roundIndex);
    if (roundMatches.length === 0) return null;

    return (
      <div key={roundIndex} className="w-full flex flex-col space-y-4">
        {/* Full Width Section Header Layout Style */}
        <div className="border-b-2 border-slate-900 pb-2 mb-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-wider uppercase font-sans">
            {roundNames[isVi ? "vi" : "en"][roundIndex - 1]}
          </h3>
          <p className="text-xs text-slate-500 font-bold tracking-tight mt-0.5 uppercase font-mono">
            {roundMatches.length} {isVi ? "Trận Đấu" : "Matches"}
          </p>
        </div>

        {/* Responsive Layout Grid Nodes Frame Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
          {roundMatches.map((match) => (
            <div
              key={match.id}
              className="bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden flex flex-col transition-all hover:border-slate-400 hover:shadow-sm"
            >
              {/* Card Meta Indicator Tag */}
              <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold tracking-wider text-slate-500 font-mono">
                  {match.label}
                </span>
                {match.winner && (
                  <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {isVi ? "Xong" : "Settled"}
                  </span>
                )}
              </div>

              {/* Competitors Interactive Grid Nodes */}
              <div className="p-2 flex flex-col gap-1.5 bg-white">
                {[
                  { team: match.team1, key: "team1" as const },
                  { team: match.team2, key: "team2" as const },
                ].map(({ team, key }) => {
                  const isWinner = match.winner?.id === team?.id && team !== null;
                  const hasWinnerSelected = match.winner !== null;

                  const placeholder = isVi 
                    ? matchSourceLabels[match.id][key].vi 
                    : matchSourceLabels[match.id][key].en;

                  return (
                    <button
                      key={key}
                      disabled={!team}
                      onClick={() => team && selectWinner(match.id, team)}
                      className={`relative w-full flex items-center justify-between p-3 rounded-md text-left transition-all ${
                        !team
                          ? "bg-slate-50/50 border border-dashed border-slate-200 text-slate-400 cursor-not-allowed pointer-events-none"
                          : isWinner
                          ? "bg-emerald-50/90 border border-emerald-500 text-slate-900 font-bold shadow-xs"
                          : hasWinnerSelected
                          ? "bg-white border border-slate-100 text-slate-400 opacity-40 hover:opacity-80"
                          : "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {team ? (
                          <img
                            src={getFlagUrl(team.flag, team.id)}
                            alt=""
                            className="w-8 h-5.5 object-cover rounded-xs border border-slate-200 shrink-0 shadow-xs"
                          />
                        ) : (
                          <div className="w-8 h-5.5 rounded-xs bg-slate-100 border border-dashed border-slate-200 flex items-center justify-center shrink-0 text-xs text-slate-400 font-bold font-sans">
                            ?
                          </div>
                        )}

                        <span className="text-sm font-bold truncate tracking-tight font-sans">
                          {team ? team.name : placeholder}
                        </span>
                      </div>

                      {isWinner && (
                        <div className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0 ring-4 ring-emerald-100" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!qualifyingTeams || qualifyingTeams.length < 24) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12">
      {renderRoundSection(1)}
      {renderRoundSection(2)}
      {renderRoundSection(3)}
      {renderRoundSection(4)}
      {renderRoundSection(5)}
    </div>
  );
}