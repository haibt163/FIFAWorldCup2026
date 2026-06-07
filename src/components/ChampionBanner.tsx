// src/components/ChampionBanner.tsx

"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Team } from "@/data/teams";

type Props = {
  champion: Team | null;
};

export default function ChampionBanner({ champion }: Props) {
  const { language } = useLanguage();

  if (!champion) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs z-50 animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full mx-4">
        <h2 className="text-2xl font-serif font-black text-gray-900 uppercase tracking-tight mb-2">
          {language === "en" ? "CONGRATULATIONS!" : "CHÚC MỪNG!"}
        </h2>
        <p className="text-sm text-gray-500 font-sans mb-4">
          {language === "en"
            ? "Your Predicted World Cup Champion is:"
            : "Nhà vô địch World Cup dự đoán của bạn là:"}
        </p>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6 font-sans font-black text-lg text-gray-900 uppercase">
          {champion.name[language]}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors"
        >
          {language === "en" ? "Play Again" : "CHƠI LẠI"}
        </button>
      </div>
    </div>
  );
}