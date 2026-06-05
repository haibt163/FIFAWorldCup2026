import { Team } from "@/data/teams";
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

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
      className="flex items-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
      role="row"
      aria-label={t("teamCardAria", { team: team.name })}
    >
      <div className="text-lg mr-3 flex-shrink-0">
        {team.flag || "🏳️"}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate text-sm text-gray-900 dark:text-gray-100">
          {team.name}
        </div>
        <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {t("teamStats", {
            gd: goalDifference,
            gf: goalsFor,
            ga: goalsAgainst,
          })}
        </div>
      </div>

      <div className="font-black text-sm text-blue-600 dark:text-blue-400 ml-2">
        {points}
      </div>
    </div>
  );
}
