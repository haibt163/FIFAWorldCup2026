import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "vi";

type Dictionary = {
  [key: string]: string;
};

const dictionaries: Record<Language, Dictionary> = {
  en: {
    groupStage: "Group Stage",
    knockoutStage: "Knockout Stage",
    simulateMatches: "Simulate Matches",
    predictWinner: "Predict Winner",
    reset: "Reset",
    quarterFinals: "Quarter-finals",
    semiFinals: "Semi-finals",
    final: "Final",
    waitingForTeams: "Waiting for qualifying teams...",
    resetBracket: "Reset Bracket",
    winner: "Winner",
    select: "select",
    champion: "Champion",
    predictWinner: "Predict the Winner",
  },
  vi: {
    groupStage: "Giai đoạn bảng",
    knockoutStage: "Giai đoạn loại trực tiếp",
    simulateMatches: "Mô phỏng trận đấu",
    predictWinner: "Dự đoán người thắng",
    reset: "Đặt lại",
    quarterFinals: "Tứ kết",
    semiFinals: "Bán kết",
    final: "Chung kết",
    waitingForTeams: "Đang chờ các đội đủ điều kiện...",
    resetBracket: "Đặt lại bảng",
    winner: "Người thắng",
    select: "chọn",
    champion: "Nhà vô địch",
    predictWinner: "Dự đoán người thắng",
  },
};

type LanguageContextProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof dictionaries["en"]) => string;
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

  const t = (key: keyof typeof dictionaries["en"]) => {
    return dictionaries[language][key] || key;
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
