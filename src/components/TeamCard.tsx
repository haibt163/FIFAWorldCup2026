import Image from "next/image";
import { Team } from "@/src/data/teams";
import { useContext } from "react";
import { LanguageContext } from "@/src/context/LanguageContext";

type Props = {
  team: Team;
  points: number;
  goalDifference: number;
  goalsFor: number;
  goalsAgainst: number;
};

export default function TeamCard({
  team,
  points,
  goalDifference,
  goalsFor,
  goalsAgainst,
}: Props) {
  const { t } = useContext(LanguageContext);

  return (
    <div
      className="flex items-center p-2 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      role="row"
      aria-label={t("teamCardAria", { team: team.name })}
    >
      {/* Flag – fallback to emoji if image missing */}
      <div className="w-8 h-5 mr-2 flex-shrink-0">
        {team.flag ? (
          <Image
            src={team.flag}
            alt={`${team.name} flag`}
            width={32}
            height={20}
            className="object-cover rounded-sm"
          />
        ) : (
          <span>{team.emoji ?? "🏳️"}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{team.name}</div>
        <div className="text-xs text-gray-400">
          {t("teamStats", {
            gd: goalDifference,
            gf: goalsFor,
            ga: goalsAgainst,
          })}
        </div>
      </div>

      <div className="font-bold text-lg">{points}</div>
    </div>
  );
}
