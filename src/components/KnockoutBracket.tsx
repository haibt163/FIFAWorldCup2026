"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Match = {
  id: number;
  round: number;
  label: string;
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
};

type Props = {
  qualifyingTeams: Team[];
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

  // FIFA code to ISO country code mappings
  if (lowerId === "eng") return "https://flagcdn.com/w40/gb-eng.png";
  if (lowerId === "sco") return "https://flagcdn.com/w40/gb-sct.png";
  if (lowerId === "mex") return "https://flagcdn.com/w40/mx.png";
  if (lowerId === "rsa") return "https://flagcdn.com/w40/za.png";
  if (lowerId === "kor") return "https://flagcdn.com/w40/kr.png";
  if (lowerId === "cze") return "https://flagcdn.com/w40/cz.png";
  if (lowerId === "can") return "https://flagcdn.com/w40/ca.png";
  if (lowerId === "bih") return "https://flagcdn.com/w40/ba.png";
  if (lowerId === "sui") return "https://flagcdn.com/w40/ch.png";
  if (lowerId === "bra") return "https://flagcdn.com/w40/br.png";
  if (lowerId === "mar") return "https://flagcdn.com/w40/ma.png";
  if (lowerId === "qat") return "https://flagcdn.com/w40/qa.png";
  if (lowerId === "usa") return "https://flagcdn.com/w40/us.png";
  if (lowerId === "par") return "https://flagcdn.com/w40/py.png";
  if (lowerId === "aus") return "https://flagcdn.com/w40/au.png";
  if (lowerId === "tur") return "https://flagcdn.com/w40/tr.png";
  if (lowerId === "ger") return "https://flagcdn.com/w40/de.png";
  if (lowerId === "cuv") return "https://flagcdn.com/w40/cw.png";
  if (lowerId === "civ") return "https://flagcdn.com/w40/ci.png";
  if (lowerId === "ecu") return "https://flagcdn.com/w40/ec.png";
  if (lowerId === "ned") return "https://flagcdn.com/w40/nl.png";
  if (lowerId === "jpn") return "https://flagcdn.com/w40/jp.png";
  if (lowerId === "swe") return "https://flagcdn.com/w40/se.png";
  if (lowerId === "tun") return "https://flagcdn.com/w40/tn.png";
  if (lowerId === "bel") return "https://flagcdn.com/w40/be.png";
  if (lowerId === "egy") return "https://flagcdn.com/w40/eg.png";
  if (lowerId === "irn") return "https://flagcdn.com/w40/ir.png";
  if (lowerId === "nzl") return "https://flagcdn.com/w40/nz.png";
  if (lowerId === "esp") return "https://flagcdn.com/w40/es.png";
  if (lowerId === "cpv") return "https://flagcdn.com/w40/cv.png";
  if (lowerId === "ksa") return "https://flagcdn.com/w40/sa.png";
  if (lowerId === "uru") return "https://flagcdn.com/w40/uy.png";
  if (lowerId === "fra") return "https://flagcdn.com/w40/fr.png";
  if (lowerId === "sen") return "https://flagcdn.com/w40/sn.png";
  if (lowerId === "irq") return "https://flagcdn.com/w40/iq.png";
  if (lowerId === "nor") return "https://flagcdn.com/w40/no.png";
  if (lowerId === "arg") return "https://flagcdn.com/w40/ar.png";
  if (lowerId === "alg") return "https://flagcdn.com/w40/dz.png";
  if (lowerId === "aut") return "https://flagcdn.com/w40/at.png";
  if (lowerId === "jor") return "https://flagcdn.com/w40/jo.png";
  if (lowerId === "por") return "https://flagcdn.com/w40/pt.png";
  if (lowerId === "cod") return "https://flagcdn.com/w40/cd.png";
  if (lowerId === "uzb") return "https://flagcdn.com/w40/uz.png";
  if (lowerId === "col") return "https://flagcdn.com/w40/co.png";
  if (lowerId === "cro") return "https://flagcdn.com/w40/hr.png";
  if (lowerId === "gha") return "https://flagcdn.com/w40/gh.png";
  if (lowerId === "pan") return "https://flagcdn.com/w40/pa.png";
  if (lowerId === "haiti") return "https://flagcdn.com/w40/ht.png";

  return lowerId.length === 2 ? `https://flagcdn.com/w40/${lowerId}.png` : `https://flagcdn.com/w40/un.png`;
}

export default function KnockoutBracket({ qualifyingTeams }: Props) {
  const { language } = useLanguage();
  const [matches, setMatches] = useState<Match[]>([]);

  const initOfficialTree = useCallback(() => {
    if (qualifyingTeams.length < 24) return;

    const winners: Record<string, Team> = {};
    const runnersUp: Record<string, Team> = {};
    const thirds: Team[] = qualifyingTeams.slice(24);

    const groupLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    groupLetters.forEach((letter, i) => {
      winners[letter] = qualifyingTeams[i * 2] || null;
      runnersUp[letter] = qualifyingTeams[i * 2 + 1] || null;
    });

    const officialR32: Match[] = [
      { id: 73, round: 1, label: "Sunday 28 June", team1: runnersUp["A"], team2: runnersUp["B"], winner: null },
      { id: 74, round: 1, label: "Sunday 28 June", team1: winners["A"], team2: thirds[0] || null, winner: null },
      { id: 75, round: 1, label: "Monday 29 June", team1: winners["B"], team2: thirds[1] || null, winner: null },
      { id: 76, round: 1, label: "Monday 29 June", team1: winners["C"], team2: runnersUp["F"], winner: null },
      { id: 77, round: 1, label: "Tuesday 30 June", team1: winners["F"], team2: runnersUp["C"], winner: null },
      { id: 78, round: 1, label: "Tuesday 30 June", team1: runnersUp["E"], team2: runnersUp["I"], winner: null },
      { id: 79, round: 1, label: "Tuesday 30 June", team1: winners["E"], team2: thirds[2] || null, winner: null },
      { id: 80, round: 1, label: "Wednesday 1 July", team1: winners["I"], team2: thirds[3] || null, winner: null },
      { id: 81, round: 1, label: "Wednesday 1 July", team1: winners["G"], team2: thirds[4] || null, winner: null },
      { id: 82, round: 1, label: "Wednesday 1 July", team1: winners["D"], team2: thirds[5] || null, winner: null },
      { id: 83, round: 1, label: "Thursday 2 July", team1: winners["H"], team2: runnersUp["J"], winner: null },
      { id: 84, round: 1, label: "Thursday 2 July", team1: runnersUp["K"], team2: runnersUp["L"], winner: null },
      { id: 85, round: 1, label: "Thursday 2 July", team1: winners["K"], team2: thirds[6] || null, winner: null },
      { id: 86, round: 1, label: "Friday 3 July", team1: runnersUp["D"], team2: runnersUp["G"], winner: null },
      { id: 87, round: 1, label: "Friday 3 July", team1: winners["J"], team2: runnersUp["H"], winner: null },
      { id: 88, round: 1, label: "Friday 3 July", team1: winners["L"], team2: thirds[7] || null, winner: null },
    ];

    const round2To5: Match[] = [
      { id: 89, round: 2, label: "Saturday 4 July", team1: null, team2: null, winner: null },
      { id: 90, round: 2, label: "Saturday 4 July", team1: null, team2: null, winner: null },
      { id: 91, round: 2, label: "Sunday 5 July", team1: null, team2: null, winner: null },
      { id: 92, round: 2, label: "Sunday 5 July", team1: null, team2: null, winner: null },
      { id: 93, round: 2, label: "Monday 6 July", team1: null, team2: null, winner: null },
      { id: 94, round: 2, label: "Monday 6 July", team1: null, team2: null, winner: null },
      { id: 95, round: 2, label: "Tuesday 7 July", team1: null, team2: null, winner: null },
      { id: 96, round: 2, label: "Tuesday 7 July", team1: null, team2: null, winner: null },
      { id: 97, round: 3, label: "Thursday 9 July", team1: null, team2: null, winner: null },
      { id: 98, round: 3, label: "Friday 10 July", team1: null, team2: null, winner: null },
      { id: 99, round: 3, label: "Saturday 11 July", team1: null, team2: null, winner: null },
      { id: 100, round: 3, label: "Saturday 11 July", team1: null, team2: null, winner: null },
      { id: 101, round: 4, label: "Tuesday 14 July", team1: null, team2: null, winner: null },
      { id: 102, round: 4, label: "Wednesday 15 July", team1: null, team2: null, winner: null },
      { id: 104, round: 5, label: "Sunday 19 July", team1: null, team2: null, winner: null },
    ];

    setMatches([...officialR32, ...round2To5]);
  }, [qualifyingTeams]);

  useEffect(() => {
    initOfficialTree();
  }, [initOfficialTree]);

  const selectWinner = (matchId: number, winner: Team) => {
    setMatches((prev) => {
      const idx = prev.findIndex((m) => m.id === matchId);
      if (idx === -1) return prev;

      const updated = [...prev];
      updated[idx] = { ...updated[idx], winner };

      const targetMap: Record<number, { match: number; slot: "team1" | "team2" }> = {
        74: { match: 89, slot: "team1" },
        77: { match: 89, slot: "team2" },
        73: { match: 90, slot: "team1" },
        75: { match: 90, slot: "team2" },
        76: { match: 91, slot: "team1" },
        78: { match: 91, slot: "team2" },
        79: { match: 92, slot: "team1" },
        80: { match: 92, slot: "team2" },
        83: { match: 93, slot: "team1" },
        84: { match: 93, slot: "team2" },
        81: { match: 94, slot: "team1" },
        82: { match: 94, slot: "team2" },
        86: { match: 95, slot: "team1" },
        88: { match: 95, slot: "team2" },
        85: { match: 96, slot: "team1" },
        87: { match: 96, slot: "team2" },
        89: { match: 97, slot: "team1" },
        90: { match: 97, slot: "team2" },
        93: { match: 98, slot: "team1" },
        94: { match: 98, slot: "team2" },
        91: { match: 99, slot: "team1" },
        92: { match: 99, slot: "team2" },
        95: { match: 100, slot: "team1" },
        96: { match: 100, slot: "team2" },
        97: { match: 101, slot: "team1" },
        98: { match: 101, slot: "team2" },
        99: { match: 102, slot: "team1" },
        100: { match: 102, slot: "team2" },
        101: { match: 104, slot: "team1" },
        102: { match: 104, slot: "team2" },
      };

      const target = targetMap[matchId];
      if (target) {
        const targetIdx = updated.findIndex((m) => m.id === target.match);
        if (targetIdx !== -1) {
          updated[targetIdx] = {
            ...updated[targetIdx],
            [target.slot]: winner,
            winner: null,
          };
        }
      }
      return updated;
    });
  };

  const getHeadings = (roundNum: number) => {
    switch (roundNum) {
      case 1:
        return {
          h: language === "en" ? "ROUND OF 32" : "VÒNG 32 ĐỘI",
          s: language === "en" ? "Select your winners for all 16 matches." : "Chọn đội chiến thắng cho tất cả 16 trận đấu.",
        };
      case 2:
        return {
          h: language === "en" ? "ROUND OF 16" : "VÒNG 16 ĐỘI",
          s: language === "en" ? "Select your winners for all eight matches." : "Chọn đội chiến thắng cho tất cả 8 trận đấu.",
        };
      case 3:
        return {
          h: language === "en" ? "QUARTER-FINALS" : "VÒNG TỨ KẾT",
          s: language === "en" ? "Select your winners for the quarter-finals." : "Chọn đội chiến thắng cho các trận tứ kết.",
        };
      case 4:
        return {
          h: language === "en" ? "SEMI-FINALS" : "VÒNG BÁN KẾT",
          s: language === "en" ? "Select your winners for both semi-finals." : "Chọn đội chiến thắng cho cả hai trận bán kết.",
        };
      default:
        return {
          h: language === "en" ? "FINAL" : "TRẬN CHUNG KẾT",
          s: language === "en" ? "Select your World Cup 2026 winner." : "Chọn nhà vô địch World Cup 2026 của bạn.",
        };
    }
  };

  const renderRoundSection = (roundNum: number) => {
    const roundMatches = matches.filter((m) => m.round === roundNum);
    const text = getHeadings(roundNum);

    return (
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-2">
          <h2 className="text-3xl font-serif font-black text-gray-900 tracking-tight uppercase">{text.h}</h2>
          <p className="text-xs text-gray-500 font-sans">{text.s}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {roundMatches.map((match) => (
            <div key={match.id} className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden p-3 space-y-2">
              <div className="text-[10px] font-sans font-bold text-gray-500 tracking-wider uppercase">
                {language === "en" ? "Match" : "Trận"} {match.id} • {match.label}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[match.team1, match.team2].map((team, idx) => {
                  const isWinner = match.winner?.id === team?.id && team !== null;
                  return (
                    <button
                      key={idx}
                      disabled={!team}
                      onClick={() => team && selectWinner(match.id, team)}
                      className={`flex flex-col items-center p-3 border rounded-xl transition-all relative touch-manipulation ${
                        !team
                          ? "bg-gray-50/50 border-gray-100 text-gray-300"
                          : isWinner
                          ? "bg-emerald-50 border-emerald-500 text-gray-900 font-bold ring-2 ring-emerald-500/10"
                          : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={isWinner}
                        readOnly
                        className="absolute top-2 right-2 w-3 h-3 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                      />
                      {team ? (
                        <img
                          src={getFlagUrl(team.flag, team.id)}
                          alt=""
                          className="w-10 h-7 object-cover rounded shadow-xs border border-gray-200/60 mb-1 shrink-0"
                        />
                      ) : (
                        <span className="text-3xl mb-1 select-none text-gray-300">🏳️</span>
                      )}
                      <span className="text-xs font-sans text-center truncate w-full tracking-tight">
                        {team ? team.name : language === "en" ? `Winner M${match.id}` : `Thắng Trận ${match.id}`}
                      </span>
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

  if (qualifyingTeams.length === 0) return null;

  return (
    <div className="space-y-12">
      {renderRoundSection(1)}
      {renderRoundSection(2)}
      {renderRoundSection(3)}
      {renderRoundSection(4)}
      {renderRoundSection(5)}
    </div>
  );
}