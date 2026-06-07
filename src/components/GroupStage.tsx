"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { teams, Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  onPredictComplete: (groupStandings: Record<string, Team[]>) => void;
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

function SortableTeamRow({
  team,
  position,
  groupLetter,
  onQuickMove,
}: {
  team: Team;
  position: number;
  groupLetter: string;
  onQuickMove: (groupLetter: string, teamId: string, targetIdx: number) => void;
}) {
  const { language } = useLanguage();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: team.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    WebkitTouchCallout: "none" as const,
    WebkitUserSelect: "none" as const,
    KhtmlUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    userSelect: "none" as const,
    touchAction: "none" as const, // Locks scrolling gestures inside Safari out of dragging windows
  };

  const styles = [
    "bg-[#eafaf1] text-[#27ae60] border-l-[#2ec4b6]",
    "bg-[#eafaf1] text-[#27ae60] border-l-[#2ec4b6]",
    "bg-[#fdfaf0] text-[#f39c12] border-l-[#ff9f1c]",
    "bg-[#fafafa] text-gray-400 border-l-gray-300 line-through text-opacity-60",
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-3 p-2.5 border-l-4 rounded-lg border border-gray-100/80 ${styles[position]} transition-all cursor-grab active:cursor-grabbing touch-none select-none`}
    >
      <span className="text-xs font-sans font-black w-4 text-center text-gray-500 shrink-0">{position + 1}</span>
      <img
        src={getFlagUrl(team.flag, team.id)}
        alt={`${team.name} flag`}
        className="w-7 h-5 object-cover rounded shadow-2xs border border-gray-200/60 shrink-0"
      />
      <span className="flex-1 font-sans font-bold text-sm text-gray-800 tracking-tight truncate">
        {team.name}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onQuickMove(groupLetter, team.id, 0);
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        className="text-[10px] bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 hover:bg-gray-50 touch-manipulation relative z-10 shrink-0"
        title={language === "en" ? "Move to 1st" : "Chuyển lên đầu"}
      >
        ⬆
      </button>
      {/* Explicitly colored handle that overrides opacity layers for mobile visibility */}
      <div 
        className="text-gray-400 text-sm font-sans font-bold select-none px-1 shrink-0 flex items-center justify-center opacity-100" 
        title={language === "en" ? "Drag to reorder" : "Kéo để sắp xếp"}
      >
        <span className="tracking-wide">⋮⋮</span>
      </div>
    </div>
  );
}

export default function GroupStage({ onPredictComplete }: Props) {
  const { language } = useLanguage();
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  const [activeId, setActiveId] = useState<string | null>(null);

  const [groupPredictions, setGroupPredictions] = useState<Record<string, Team[]>>(() => {
    const initial: Record<string, Team[]> = {};
    letters.forEach((letter) => {
      initial[letter] = teams.filter((t) => t.group === letter);
    });
    return initial;
  });

  const [groupStrengths] = useState<Record<string, "Very Strong" | "Strong" | "Average" | "Weak">>({
    A: "Weak",
    B: "Weak",
    C: "Average",
    D: "Weak",
    E: "Average",
    F: "Very Strong",
    G: "Weak",
    H: "Weak",
    I: "Very Strong",
    J: "Strong",
    K: "Weak",
    L: "Strong",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { 
      activationConstraint: { 
        delay: 200,     // Slight hold constraint protects standard scrolling triggers
        tolerance: 8    
      } 
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleQuickMove = useCallback(
    (groupLetter: string, teamId: string, targetIdx: number) => {
      const updatedGroup = [...groupPredictions[groupLetter]];
      const currentIdx = updatedGroup.findIndex((t) => t.id === teamId);
      if (currentIdx === -1 || currentIdx === targetIdx) return;

      const [movedTeam] = updatedGroup.splice(currentIdx, 1);
      updatedGroup.splice(targetIdx, 0, movedTeam);

      const newPredictions = { ...groupPredictions, [groupLetter]: updatedGroup };
      setGroupPredictions(newPredictions);
      onPredictComplete(newPredictions);
    },
    [groupPredictions, onPredictComplete]
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent, groupLetter: string) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = groupPredictions[groupLetter].findIndex((t) => t.id === active.id);
    const newIndex = groupPredictions[groupLetter].findIndex((t) => t.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(groupPredictions[groupLetter], oldIndex, newIndex);
      const newPredictions = { ...groupPredictions, [groupLetter]: reordered };
      setGroupPredictions(newPredictions);
      onPredictComplete(newPredictions);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  useEffect(() => {
    onPredictComplete(groupPredictions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-4xl font-serif font-black tracking-tight text-gray-900 uppercase">
          {language === "en" ? "GROUP STAGE" : "VÒNG BẢNG"}
        </h2>
        <p className="text-sm text-gray-600 font-sans mt-2 max-w-4xl leading-relaxed">
          {language === "en"
            ? "Organise teams from first to fourth based on how you think they will finish in each group. Group winners, runners-up and the eight best third-placed teams will advance to the round of 32."
            : "Sắp xếp các đội từ thứ nhất đến thứ tư dựa trên dự đoán của bạn về kết quả mỗi bảng. Các đội nhất, nhì bảng và 8 đội xếp thứ ba có thành tích tốt nhất sẽ tiến vào vòng 32 đội."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {letters.map((group) => (
          <div key={group} className="bg-[#f6f6f6] border border-gray-200 rounded-xl overflow-hidden shadow-sm p-4 space-y-3 min-w-[280px]">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <h3 className="font-sans font-bold text-gray-900 text-base whitespace-nowrap">Group {group}</h3>
              <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded text-gray-700 bg-white border border-gray-200 shadow-2xs whitespace-nowrap">
                {(() => {
                  const strength = groupStrengths[group];
                  if (strength === "Very Strong") return language === "en" ? "Very Strong" : "Rất Mạnh";
                  if (strength === "Strong") return language === "en" ? "Strong" : "Mạnh";
                  if (strength === "Average") return language === "en" ? "Average" : "Trung Bình";
                  return language === "en" ? "Weak" : "Yếu";
                })()}
              </span>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none min-h-[42px]">
              {groupPredictions[group].map((team) => (
                <button
                  key={`badge-${team.id}`}
                  onClick={() => handleQuickMove(group, team.id, 0)}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 bg-white border border-gray-200 rounded px-1.5 py-1 text-xs font-sans font-medium text-gray-700 hover:bg-gray-50 shrink-0 shadow-2xs relative z-10"
                >
                  <img 
                    src={getFlagUrl(team.flag, team.id)} 
                    alt="" 
                    className="w-4 h-3 object-cover rounded shadow-2xs border border-gray-200/50 shrink-0" 
                  />
                  <span className="uppercase text-[9px] tracking-wider font-bold text-gray-500">
                    {team.id.substring(0, 3)}
                  </span>
                </button>
              ))}
            </div>

            <DndContext 
              sensors={sensors} 
              collisionDetection={closestCenter} 
              onDragStart={handleDragStart}
              onDragEnd={(e) => handleDragEnd(e, group)}
              onDragCancel={handleDragCancel}
            >
              <SortableContext items={groupPredictions[group].map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-1.5 bg-white border border-gray-200 rounded-xl p-2 shadow-inner">
                  {groupPredictions[group].map((team, idx) => (
                    <SortableTeamRow
                      key={team.id}
                      team={team}
                      position={idx}
                      groupLetter={group}
                      onQuickMove={handleQuickMove}
                    />
                  ))}
                </div>
              </SortableContext>
              
              <DragOverlay>
                {activeId ? (() => {
                  let activeTeam: Team | undefined;
                  for (const letter of letters) {
                    activeTeam = groupPredictions[letter].find((t) => t.id === activeId);
                    if (activeTeam) break;
                  }
                  return activeTeam ? (
                    <div className="bg-white border-l-4 border-emerald-400 rounded-lg shadow-lg p-2.5 flex items-center gap-3 select-none pointer-events-none">
                      <img
                        src={getFlagUrl(activeTeam.flag, activeTeam.id)}
                        alt=""
                        className="w-7 h-5 object-cover rounded shadow-2xs border border-gray-200/60 shrink-0"
                      />
                      <span className="font-sans font-bold text-sm text-gray-800">{activeTeam.name}</span>
                    </div>
                  ) : null;
                })() : null}
              </DragOverlay>
            </DndContext>
          </div>
        ))}
      </div>
    </div>
  );
}