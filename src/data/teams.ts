// data/teams.ts
export interface Team {
  id: string;
  name: {
    en: string;
    vi: string;
  };
  flag: string;
  group: string; // A, B, C, ... L
}

export const teams: Team[] = [
  // GROUP A
  { id: "MEX", name: { en: "Mexico", vi: "México" }, flag: "🇲🇽", group: "A" },
  { id: "RSA", name: { en: "South Africa", vi: "Nam Phi" }, flag: "🇿🇦", group: "A" },
  { id: "KOR", name: { en: "South Korea", vi: "Hàn Quốc" }, flag: "🇰🇷", group: "A" },
  { id: "CZE", name: { en: "Czech Republic", vi: "Séc" }, flag: "🇨🇿", group: "A" },

  // GROUP B
  { id: "CAN", name: { en: "Canada", vi: "Canada" }, flag: "🇨🇦", group: "B" },
  { id: "BIH", name: { en: "Bosnia-Herzegovina", vi: "Bosna và Hercegovina" }, flag: "🇧🇦", group: "B" },
  { id: "QAT", name: { en: "Qatar", vi: "Qatar" }, flag: "🇶🇦", group: "B" },
  { id: "SUI", name: { en: "Switzerland", vi: "Thụy Sĩ" }, flag: "🇨🇭", group: "B" },

  // GROUP C
  { id: "BRA", name: { en: "Brazil", vi: "Brasil" }, flag: "🇧🇷", group: "C" },
  { id: "MAR", name: { en: "Morocco", vi: "Maroc" }, flag: "🇲🇦", group: "C" },
  { id: "HAI", name: { en: "Haiti", vi: "Haiti" }, flag: "🇭🇹", group: "C" },
  { id: "SCO", name: { en: "Scotland", vi: "Scotland" }, flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },

  // GROUP D
  { id: "USA", name: { en: "United States", vi: "Hoa Kỳ" }, flag: "🇺🇸", group: "D" },
  { id: "PAR", name: { en: "Paraguay", vi: "Paraguay" }, flag: "🇵🇾", group: "D" },
  { id: "AUS", name: { en: "Australia", vi: "Úc" }, flag: "🇦🇺", group: "D" },
  { id: "TUR", name: { en: "Türkiye", vi: "Thổ Nhĩ Kỳ" }, flag: "🇹🇷", group: "D" },

  // GROUP E
  { id: "GER", name: { en: "Germany", vi: "Đức" }, flag: "🇩🇪", group: "E" },
  { id: "CUW", name: { en: "Curaçao", vi: "Curaçao" }, flag: "🇨🇼", group: "E" },
  { id: "CIV", name: { en: "Ivory Coast", vi: "Bờ Biển Ngà" }, flag: "🇨🇮", group: "E" },
  { id: "ECU", name: { en: "Ecuador", vi: "Ecuador" }, flag: "🇪🇨", group: "E" },

  // GROUP F
  { id: "NED", name: { en: "Netherlands", vi: "Hà Lan" }, flag: "🇳🇱", group: "F" },
  { id: "JPN", name: { en: "Japan", vi: "Nhật Bản" }, flag: "🇯🇵", group: "F" },
  { id: "SWE", name: { en: "Sweden", vi: "Thụy Điển" }, flag: "🇸🇪", group: "F" },
  { id: "TUN", name: { en: "Tunisia", vi: "Tunisia" }, flag: "🇹🇳", group: "F" },

  // GROUP G
  { id: "BEL", name: { en: "Belgium", vi: "Bỉ" }, flag: "🇧🇪", group: "G" },
  { id: "EGY", name: { en: "Egypt", vi: "Ai Cập" }, flag: "🇪🇬", group: "G" },
  { id: "IRN", name: { en: "Iran", vi: "Iran" }, flag: "🇮🇷", group: "G" },
  { id: "NZL", name: { en: "New Zealand", vi: "New Zealand" }, flag: "🇳🇿", group: "G" },

  // GROUP H
  { id: "ESP", name: { en: "Spain", vi: "Tây Ban Nha" }, flag: "🇪🇸", group: "H" },
  { id: "CPV", name: { en: "Cape Verde", vi: "Cabo Verde" }, flag: "🇨🇻", group: "H" },
  { id: "KSA", name: { en: "Saudi Arabia", vi: "Ả Rập Xê Út" }, flag: "🇸🇦", group: "H" },
  { id: "URU", name: { en: "Uruguay", vi: "Uruguay" }, flag: "🇺🇾", group: "H" },

  // GROUP I
  { id: "FRA", name: { en: "France", vi: "Pháp" }, flag: "🇫🇷", group: "I" },
  { id: "SEN", name: { en: "Senegal", vi: "Sénégal" }, flag: "🇸🇳", group: "I" },
  { id: "IRQ", name: { en: "Iraq", vi: "Iraq" }, flag: "🇮🇶", group: "I" },
  { id: "NOR", name: { en: "Norway", vi: "Na Uy" }, flag: "🇳🇴", group: "I" },

  // GROUP J
  { id: "ARG", name: { en: "Argentina", vi: "Argentina" }, flag: "🇦🇷", group: "J" },
  { id: "ALG", name: { en: "Algeria", vi: "Algérie" }, flag: "🇩🇿", group: "J" },
  { id: "AUT", name: { en: "Austria", vi: "Áo" }, flag: "🇦🇹", group: "J" },
  { id: "JOR", name: { en: "Jordan", vi: "Jordan" }, flag: "🇯🇴", group: "J" },

  // GROUP K
  { id: "POR", name: { en: "Portugal", vi: "Bồ Đào Nha" }, flag: "🇵🇹", group: "K" },
  { id: "COD", name: { en: "DR Congo", vi: "CHDC Congo" }, flag: "🇨🇩", group: "K" },
  { id: "UZB", name: { en: "Uzbekistan", vi: "Uzbekistan" }, flag: "🇺🇿", group: "K" },
  { id: "COL", name: { en: "Colombia", vi: "Colombia" }, flag: "🇨🇴", group: "K" },

  // GROUP L
  { id: "ENG", name: { en: "England", vi: "Anh" }, flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  { id: "CRO", name: { en: "Croatia", vi: "Croatia" }, flag: "🇭🇷", group: "L" },
  { id: "GHA", name: { en: "Ghana", vi: "Ghana" }, flag: "🇬🇭", group: "L" },
  { id: "PAN", name: { en: "Panama", vi: "Panama" }, flag: "🇵🇦", group: "L" }
];