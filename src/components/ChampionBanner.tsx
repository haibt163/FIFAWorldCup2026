"use client";

import { useContext } from "react";
import { LanguageContext } from "@/src/context/LanguageContext";

type Props = {
  champion: string | null;
};

export default function ChampionBanner({ champion }: Props) {
  const { t } = useContext(LanguageContext);

  if (!champion) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={t("championBannerAria")}
    >
      <div className="bg-green-800 text-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">{t("congratulations")}</h2>
        <p className="text-xl">{champion}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-white text-green-800 rounded hover:bg-gray-200"
        >
          {t("playAgain")}
        </button>
      </div>
    </div>
  );
}
