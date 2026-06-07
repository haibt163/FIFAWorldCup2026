"use client";

import React, { useState, useEffect } from "react";
import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  thirdPlaceTeams: Team[];
  selectedBestThirds: Team[];
  onSelectionChange: (selected: Team[]) => void;
};

// Comprehensive country flag decoding map for robust cross-view rendering
const FLAG_MAP: Record<string, string> = {
  eng: "gb-eng",
  sco: "gb-sct",
  wls: "gb-wls",
  nir: "gb-nir",
  ger: "de",
  fra: "fr",
  esp: "es",
  ita: "it",
  ned: "nl",
  por: "pt",
  cro: "hr",
  sui: "ch",
  den: "dk",
  bel: "be",
  aut: "at",
  tur: "tr",
  cze: "cz",
  svk: "sk",
  ukr: "ua",
  pol: "pl",
  geo: "ge",
  hun: "hu",
  svn: "si",
  rom: "ro",
  rou: "ro",
  alb: "al",
  mex: "mx",
  rsa: "za",
  usa: "us",
  arg: "ar",
  bra: "br",
  jpn: "jp",
  kor: "kr",
  vie: "vn",
  vnm: "vn",
};

function getFlagUrl(flag: string, id: string): string {
  const lowerId = id.toLowerCase();
  if (FLAG_MAP[lowerId]) {
    return `https://flagcdn.com/w40/${FLAG_MAP[lowerId]}.png`;
  }

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

  return "https://flagcdn.com/w40/un.png";
}

type RowProps = {
  team: Team;
  index: number;
  t: any;
  moveItem: (index: number, direction: "up" | "down") => void;
  totalTeams: number;
};

function SortableTeamRow({ team, index, t, moveItem, totalTeams }: RowProps) {
  const isQualified = index < 8;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: team.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none", // Keeps touch viewports stable while dragging items
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between gap-4 px-4 py-3.5 transition-all duration-150 ${
        isDragging ? "bg-emerald-50/40 opacity-50 scale-[0.99] z-50 relative shadow-md" : "bg-white"
      } ${
        isQualified 
          ? "hover:bg-emerald-50/20" 
          : "hover:bg-gray-50/50 opacity-75"
      }`}
    >
      {/* Left Wing: Rank Index & Flag */}
      <div className="flex items-center gap-4 min-w-0 pointer-events-none select-none">
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
          className={`text-[10px] font-extrabold tracking-wider border rounded px-2 py-0.5 uppercase pointer-events-none select-none ${
            isQualified
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
              : "bg-gray-50 text-gray-400 border-gray-200"
          }`}
        >
          {t.group} {team.group}
        </span>

        {/* Tactical Mobile Up/Down Hotkeys (Stop propagation to prevent sensor interference) */}
        <div 
          className="flex items-center bg-gray-50 border border-gray-200/80 rounded-md overflow-hidden relative z-10"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
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
            disabled={index === totalTeams - 1}
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
}

export default function ThirdPlaceRanker({
  thirdPlaceTeams,
  selectedBestThirds,
  onSelectionChange,
}: Props) {
  const { language } = useLanguage();
  const [orderedTeams, setOrderedTeams] = useState<Team[]>([]);

  // Precision gesture timing layout configurations
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // Critical: safely separates page scrolling from manual sorting layouts on iOS Safari
        tolerance: 5,
      },
    })
  );

  // Synchronize layout order array and isolate 4th place ranking pollution
  useEffect(() => {
    if (thirdPlaceTeams.length > 0) {
      // Eliminate stale groups selections that no longer occupy a 3rd place slot
      const validSelected = selectedBestThirds.filter((s) =>
        thirdPlaceTeams.some((t) => t.id === s.id)
      );
      
      const unselected = thirdPlaceTeams.filter(
        (t) => !validSelected.some((s) => s.id === t.id)
      );
      
      const initialOrder = [...validSelected, ...unselected];
      setOrderedTeams(initialOrder.slice(0, 12));
    } else {
      setOrderedTeams([]);
    }
  }, [thirdPlaceTeams]);

  // Safely propagate up exactly the top 8 variations back upstream
  useEffect(() => {
    if (orderedTeams.length >= 8) {
      const top8 = orderedTeams.slice(0, 8);
      if (JSON.stringify(top8.map(t => t.id)) !== JSON.stringify(selectedBestThirds.map(t => t.id))) {
        onSelectionChange(top8);
      }
    }
  }, [orderedTeams]);

  // Handle Drag & Drop termination gracefully
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedTeams((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  // Synchronize cross-platform positioning logic
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedTeams.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {orderedTeams.map((team, index) => (
              <SortableTeamRow
                key={team.id}
                team={team}
                index={index}
                t={t}
                moveItem={moveItem}
                totalTeams={orderedTeams.length}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Footer Summary Indicators */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
        <span className="text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          {t.qualified}: {Math.min(8, orderedTeams.length)}
        </span>
        <span>
          {t.eliminated}: {Math.max(0, orderedTeams.length - 8)}
        </span>
      </div>
    </div>
  );
}