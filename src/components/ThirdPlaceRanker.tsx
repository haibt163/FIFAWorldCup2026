"use client";

import React from "react";
import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  thirdPlaceTeams: Team[];
  selectedBestThirds: Team[];
  onSelectionChange: (selected: Team[]) => void;
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
  if (lowerId === "kor") return "https://flagcdn.com/w40/kr.png";
  if (lowerId === "cze") return "https://flagcdn.com/w40/cz.png";
  if (lowerId === "can") return "https://flagcdn.com/w40/ca.png";
  if (lowerId === "bih") return "https://flagcdn.com/w40/ba.png";
  if (lowerId === "sui") return "https://flagcdn.com/w40/ch.png";
  if (lowerId === "bra") return "https://flagcdn.com/w40/br.png";
  if (lowerId === "mar") return "https://flagcdn.com/w40/ma.png";
  return lowerId.length === 2 ? `https://flagcdn.com/w40/${lowerId}.png` : `https://flagcdn.com/w40/un.png`;
}

export default function ThirdPlaceRanker({ thirdPlaceTeams, selectedBestThirds, onSelectionChange }: Props) {
  const { language } = useLanguage();

  const toggleSelection = (team: Team) => {
    if (selectedBestThirds.find((t) => t.id === team.id)) {
      onSelectionChange(selectedBestThirds.filter((t) => t.id !== team.id));
    } else {
      if (selectedBestThirds.length >= 8) return;
      onSelectionChange([...selectedBestThirds, team]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-3">
  <h2 className="text-3xl font-serif font-black tracking-tight text-gray-900 uppercase">
    {language === "en" ? "THIRD-PLACE FINISHERS" : "CÁC ĐỘI XẾP THỨ BA"}
  </h2>
  <p className="text-xs text-gray-600 font-sans mt-1">
    {language === "en" ? "Predict the eight best third-place teams" : "Dự đoán 8 đội xếp thứ ba có thành tích tốt nhất"}
        </p>
      </div>

      <div className="bg-[#f6f6f6] border border-gray-200 rounded-xl p-4">
        <div className="bg-white border border-gray-200 rounded-lg p-2.5 text-xs font-sans font-bold text-gray-700 mb-4 shadow-2xs inline-block">
          {language === "en" ? `${selectedBestThirds.length}/8 selected` : `Đã chọn ${selectedBestThirds.length}/8 đội`}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
          {thirdPlaceTeams.map((team) => {
            const isChecked = selectedBestThirds.some((t) => t.id === team.id);
            return (
              <div
                key={team.id}
                onClick={() => toggleSelection(team)}
                className={`flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-colors touch-manipulation ${
                  isChecked ? "bg-[#eafaf1]/60 text-gray-900 font-bold" : "bg-white text-gray-700 hover:bg-gray-50/80"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 pointer-events-none"
                />
                <img
                  src={getFlagUrl(team.flag, team.id)}
                  alt={`${team.name} flag`}
                  className="w-7 h-5 object-cover rounded shadow-2xs border border-gray-200/60 shrink-0"
                />
                <span className="font-sans text-sm tracking-tight flex-1 truncate">{team.name}</span>
                <span className="text-[10px] font-sans font-extrabold tracking-wider text-gray-400 uppercase bg-gray-50 border border-gray-100 rounded px-2 py-0.5">
                  {language === "en" ? "GRP" : "BẢNG"} {team.group}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}