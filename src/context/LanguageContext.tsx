import React, { createContext, useContext, useState, ReactNode } from "react";

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
