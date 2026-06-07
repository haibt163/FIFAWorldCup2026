"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function ClientLangSetter() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}