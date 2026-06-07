"use client";

import { Team } from "@/data/teams";

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

type Props = {
  team: Team;
};

export default function TeamCard({ team }: Props) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-2xs w-full">
      <img 
        src={getFlagUrl(team.flag, team.id)} 
        alt={`${team.name} flag`} 
        className="w-7 h-5 object-cover rounded shadow-2xs border border-gray-200/60 shrink-0 select-none" 
      />
      <div className="font-sans font-bold text-sm text-gray-900 truncate tracking-tight uppercase">
        {team.name}
      </div>
    </div>
  );
}