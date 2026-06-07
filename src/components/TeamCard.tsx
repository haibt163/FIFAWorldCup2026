"use client";

import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

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

type Props = {
  team: Team;
};

export default function TeamCard({ team }: Props) {
  const { language } = useLanguage();

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-2xs w-full">
      <img
        src={getFlagUrl(team.flag, team.id)}
        alt={`${team.name.en} flag`}
        className="w-7 h-5 object-cover rounded shadow-2xs border border-gray-200/60 shrink-0 select-none"
      />
      <div className="font-sans font-bold text-sm text-gray-900 truncate tracking-tight uppercase">
        {team.name[language]}
      </div>
    </div>
  );
}