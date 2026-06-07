"use client";

import React, { useState, useEffect } from "react";
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
  return "https://flagcdn.com/w40/un.png";
}

export default function ThirdPlaceRanker({
  thirdPlaceTeams,
  selectedBestThirds,
  onSelectionChange,
}: Props) {
  const { language } = useLanguage();
  const [orderedTeams, setOrderedTeams] = useState<Team[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Synchronize internal layout order array with input teams
  useEffect(() => {
    if (thirdPlaceTeams.length > 0) {
      // Prioritize previously selected ones up top, then append the rest
      const unselected = thirdPlaceTeams.filter(
        (t) => !selectedBestThirds.some((s) => s.id === t.id)
      );
      const initialOrder = [...selectedBestThirds, ...unselected];
      setOrderedTeams(initialOrder.slice(0, 12));
    }
  }, [thirdPlaceTeams]);

  // Keep parent state updated with top 8 qualifiers
  useEffect(() => {
    if (orderedTeams.length >= 8) {
      const top8 = orderedTeams.slice(0, 8);
      // Only fire change if values actually differ to avoid state loops
      if (JSON.stringify(top8.map(t => t.id)) !== JSON.stringify(selectedBestThirds.map(t => t.id))) {
        onSelectionChange(top8);
      }
    }
  }, [orderedTeams]);

  // Desktop Drag Handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const remaining = [...orderedTeams];
    const draggedItem = remaining.splice(draggedIndex, 1)[0];
    remaining.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setOrderedTeams(remaining);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Cross-Platform Mobile Position Adjusters
  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= orderedTeams.length) return;

    const updated = [...orderedTeams];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setOrderedTeams(updated);
  };

  const labels = {
    en: {
      title: "Third-Place Team Power Rankings",
      subtitle: "Drag and drop or tap arrows to position the best 8 teams into the green qualification slots.",
      qualified: "Advancing to Round of 32",
      eliminated: "Eliminated from Tournament",
      group: "Group",
    },
    vi: {
      title: "Bảng Xếp Hạng Các Đội Thứ Ba",
      subtitle: "Kéo thả hoặc chạm mũi tên để sắp xếp 8 đội xuất sắc nhất vào vị trí đi tiếp màu xanh.",
      qualified: "Giành Quyền Vào Vòng 32 Đội",
      eliminated: "Bị Loại Khỏi Giải Đấu",
      group: "Bảng",
    },
  };

  const t = labels[language === "vi" ? "vi" : "en"];

  return (
    <div className="w-full max-w-2xl mx-auto my-8 bg-white border border-gray-200/80 rounded-xl shadow-xs overflow-hidden font-sans">
      <div className="p-6 bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 font-sans uppercase">
          {t.title}
        </h2>
        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="divide-y divide-gray-100 select-none touch-manipulation">
        {orderedTeams.map((team, index) => {
          const isQualified = index < 8;
          const isDragging = draggedIndex === index;

          return (
            <div
              key={team.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center justify-between gap-4 px-4 py-3.5 transition-all duration-150 ${
                isDragging ? "bg-emerald-50/40 opacity-50 scale-[0.99]" : "bg-white"
              } ${
                isQualified 
                  ? "hover:bg-emerald-50/20" 
                  : "hover:bg-gray-50/50 opacity-75"
              }`}
            >
              {/* Left Wing: Rank Index & Flag */}
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-extrabold tracking-tighter ${
                    isQualified
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-400 line-through"
                  }`}
                >
                  {index + 1}
                </span>

                <img
                  src={getFlagUrl(team.flag, team.id)}
                  alt=""
                  className="w-7 h-5 object-cover rounded shadow-2xs border border-gray-200/60 shrink-0"
                />

                <span
                  className={`text-sm tracking-tight truncate font-medium ${
                    isQualified 
                      ? "text-gray-900 font-bold" 
                      : "text-gray-400 line-through decoration-gray-300"
                  }`}
                >
                  {team.name}
                </span>
              </div>

              {/* Right Wing: Control Buttons and Badges */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-[10px] font-extrabold tracking-wider border rounded px-2 py-0.5 uppercase ${
                    isQualified
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                      : "bg-gray-50 text-gray-400 border-gray-200"
                  }`}
                >
                  {t.group} {team.group}
                </span>

                {/* Tactical Mobile Up/Down Hotkeys */}
                <div className="flex items-center bg-gray-50 border border-gray-200/80 rounded-md overflow-hidden">
                  <button
                    disabled={index === 0}
                    onClick={() => moveItem(index, "up")}
                    className="p-1.5 hover:bg-gray-200/70 disabled:opacity-30 disabled:pointer-events-none text-gray-500 transition-colors"
                    aria-label="Move item up"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <div className="w-px h-4 bg-gray-200" />
                  <button
                    disabled={index === orderedTeams.length - 1}
                    onClick={() => moveItem(index, "down")}
                    className="p-1.5 hover:bg-gray-200/70 disabled:opacity-30 disabled:pointer-events-none text-gray-500 transition-colors"
                    aria-label="Move item down"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Desktop Drag Handle Accessory Indicator */}
                <div className="hidden sm:block cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-400 p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-12a2 2 0 10.001 4.001A2 2 0 0013 2zm0 6a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Summary Indicators */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
        <span className="text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          {t.qualified}: 8
        </span>
        <span>
          {t.eliminated}: 4
        </span>
      </div>
    </div>
  );
}