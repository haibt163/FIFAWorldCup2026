"use client";

import { Team } from "@/data/teams";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
  team: Team;
};

export default function TeamCard({ team }: Props) {
  const { t } = useLanguage();

  // Fallback flag if missing or empty
  const flag = team.flag && team.flag.trim() !== "" ? team.flag : "🏳️";

  return (
    <div
      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-2xs w-full"
      aria-label={t("teamCardAria", { team: team.name })}
    >
      {/* High impact big flag rendering block */}
      <span className="text-2xl filter drop-shadow-sm select-none shrink-0">{flag}</span>
      <div className="font-sans font-bold text-sm text-gray-900 truncate tracking-tight uppercase">
        {team.name}
      </div>
    </div>
  );
}
