"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "vi";

type Dictionary = {
  [key: string]: string;
};

const dictionaries: Record<Language, Dictionary> = {
  en: {
    // General UI
    groupStage: "Group Stage",
    knockoutStage: "Knockout Stage",
    simulateMatches: "Simulate Matches",
    predictWinner: "Predict the Winner",
    reset: "Reset",
    // Group Stage specific
    groupStageTitle: "Group Stage",
    simulateAll: "Simulate All",
    simulationDone: "Simulation Complete",
    simulateAllAria: "Simulate all group matches",
    groupLabel: "Group {{group}}",
    groupTableAria: "Standings for Group {{group}}",
    bestThirdsTitle: "Best Third‑Place Teams",
    teamCardAria: "Team {{team}} card",
    teamStats: "GD: {{gd}} | GF: {{gf}} | GA: {{ga}}",
    // Knockout Stage specific
    knockoutTitle: "Knockout Bracket",
    resetBracket: "Reset Bracket",
    knockoutLocked: "Knockout bracket will unlock after group stage simulation.",
    matchAria: "Match in Round {{round}}",
    roundLabel: "Round {{round}}",
    tbd: "TBD",
    // Champion banner
    championBannerAria: "Champion announcement",
    congratulations: "Congratulations!",
    playAgain: "Play Again",
    // Additional strings used in the new UI
    quarterFinals: "Quarter-finals",
    semiFinals: "Semi-finals",
    final: "Final",
    waitingForTeams: "Waiting for qualifying teams...",
    winner: "Winner",
    select: "select",
    champion: "Champion",
  },
  vi: {
    // General UI
    groupStage: "Giai đoạn bảng",
    knockoutStage: "Giai đoạn loại trực tiếp",
    simulateMatches: "Mô phỏng trận đấu",
    predictWinner: "Dự đoán người thắng",
    reset: "Đặt lại",
    // Group Stage specific
    groupStageTitle: "Giai đoạn Bảng",
    simulateAll: "Mô phỏng tất cả",
    simulationDone: "Mô phỏng hoàn tất",
    simulateAllAria: "Mô phỏng tất cả các trận đấu nhóm",
    groupLabel: "Nhóm {{group}}",
    groupTableAria: "Bảng xếp hạng Nhóm {{group}}",
    bestThirdsTitle: "Các đội 3 vị tốt nhất",
    teamCardAria: "Thẻ đội {{team}}",
    teamStats: "Hiệu số: {{gd}} | Bàn thắng: {{gf}} | Thua: {{ga}}",
    // Knockout Stage specific
    knockoutTitle: "Vòng loại trực tiếp",
    resetBracket: "Đặt lại bảng",
    knockoutLocked: "Vòng loại sẽ mở sau khi mô phỏng bảng.",
    matchAria: "Trận đấu ở vòng {{round}}",
    roundLabel: "Vòng {{round}}",
    tbd: "Chưa xác định",
    // Champion banner
    championBannerAria: "Thông báo nhà vô địch",
    congratulations: "Xin chúc mừng!",
    playAgain: "Chơi lại",
    // Additional strings
    quarterFinals: "Tứ kết",
    semiFinals: "Bán kết",
    final: "Chung kết",
    waitingForTeams: "Đang chờ các đội đủ điều kiện...",
    winner: "Người thắng",
    select: "chọn",
    champion: "Nhà vô địch",
  },
};

type LanguageContextProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof dictionaries["en"], vars?: Record<string, string>) => string;
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load saved language from localStorage on mount
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (saved === "en" || saved === "vi") {
      setLanguage(saved);
    }
  }, []);

  // Persist language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const t = (key: keyof typeof dictionaries["en"], vars?: Record<string, string>) => {
    const template = dictionaries[language][key] || key;
    if (!vars) return template;
    return Object.entries(vars).reduce(
      (msg, [k, v]) => msg.replace(`{{${k}}}`, v),
      template
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};