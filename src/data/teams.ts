// data/teams.ts
export interface Team {
  id: string;
  name: string;
  group: string;
  flag: string;
}

export const teams: Team[] = [
  // GROUP A
  { id: "MEX", name: "Mexico", group: "A", flag: "🇲🇽" },
  { id: "RSA", name: "South Africa", group: "A", flag: "🇿🇦" },
  { id: "KOR", name: "South Korea", group: "A", flag: "🇰🇷" },
  { id: "CZE", name: "Czech Republic", group: "A", flag: "🇨🇿" },

  // GROUP B
  { id: "CAN", name: "Canada", group: "B", flag: "🇨🇦" },
  { id: "BIH", name: "Bosnia-Herzegovina", group: "B", flag: "🇧🇦" },
  { id: "QAT", name: "Qatar", group: "B", flag: "🇶🇦" },
  { id: "SUI", name: "Switzerland", group: "B", flag: "🇨🇭" },

  // GROUP C
  { id: "BRA", name: "Brazil", group: "C", flag: "🇧🇷" },
  { id: "MAR", name: "Morocco", group: "C", flag: "🇲🇦" },
  { id: "HAI", name: "Haiti", group: "C", flag: "🇭🇹" },
  { id: "SCO", name: "Scotland", group: "C", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },

  // GROUP D
  { id: "USA", name: "United States", group: "D", flag: "🇺🇸" },
  { id: "PAR", name: "Paraguay", group: "D", flag: "🇵🇾" },
  { id: "AUS", name: "Australia", group: "D", flag: "🇦🇺" },
  { id: "TUR", name: "Türkiye", group: "D", flag: "🇹🇷" },

  // GROUP E
  { id: "GER", name: "Germany", group: "E", flag: "🇩🇪" },
  { id: "CUW", name: "Curaçao", group: "E", flag: "🇨🇼" },
  { id: "CIV", name: "Ivory Coast", group: "E", flag: "🇨🇮" },
  { id: "ECU", name: "Ecuador", group: "E", flag: "🇪🇨" },

  // GROUP F
  { id: "NED", name: "Netherlands", group: "F", flag: "🇳🇱" },
  { id: "JPN", name: "Japan", group: "F", flag: "🇯🇵" },
  { id: "SWE", name: "Sweden", group: "F", flag: "🇸🇪" },
  { id: "TUN", name: "Tunisia", group: "F", flag: "🇹🇳" },

  // GROUP G
  { id: "BEL", name: "Belgium", group: "G", flag: "🇧🇪" },
  { id: "EGY", name: "Egypt", group: "G", flag: "🇪🇬" },
  { id: "IRN", name: "Iran", group: "G", flag: "🇮🇷" },
  { id: "NZL", name: "New Zealand", group: "G", flag: "🇳🇿" },

  // GROUP H
  { id: "ESP", name: "Spain", group: "H", flag: "🇪🇸" },
  { id: "CPV", name: "Cape Verde", group: "H", flag: "🇨🇻" },
  { id: "KSA", name: "Saudi Arabia", group: "H", flag: "🇸🇦" },
  { id: "URU", name: "Uruguay", group: "H", flag: "🇺🇾" },

  // GROUP I
  { id: "FRA", name: "France", group: "I", flag: "🇫🇷" },
  { id: "SEN", name: "Senegal", group: "I", flag: "🇸🇳" },
  { id: "IRQ", name: "Iraq", group: "I", flag: "🇮🇶" },
  { id: "NOR", name: "Norway", group: "I", flag: "🇳🇴" },

  // GROUP J
  { id: "ARG", name: "Argentina", group: "J", flag: "🇦🇷" },
  { id: "ALG", name: "Algeria", group: "J", flag: "🇩🇿" },
  { id: "AUT", name: "Austria", group: "J", flag: "🇦🇹" },
  { id: "JOR", name: "Jordan", group: "J", flag: "🇯🇴" },

  // GROUP K
  { id: "POR", name: "Portugal", group: "K", flag: "🇵🇹" },
  { id: "COD", name: "DR Congo", group: "K", flag: "🇨🇩" },
  { id: "UZB", name: "Uzbekistan", group: "K", flag: "🇺🇿" },
  { id: "COL", name: "Colombia", group: "K", flag: "🇨🇴" },

  // GROUP L
  { id: "ENG", name: "England", group: "L", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "CRO", name: "Croatia", group: "L", flag: "🇭🇷" },
  { id: "GHA", name: "Ghana", group: "L", flag: "🇬🇭" },
  { id: "PAN", name: "Panama", group: "L", flag: "🇵🇦" }
];