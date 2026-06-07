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
  { id: "QA",  name: "Qatar", group: "B", flag: "🇶🇦" },
  { id: "SUI", name: "Switzerland", group: "B", flag: "🇨🇭" },

  // GROUP C
  { id: "BRA", name: "Brazil", group: "C", flag: "🇧🇷" },
  { id: "MAR", name: "Morocco", group: "C", flag: "🇲🇦" },
  { id: "HT",  name: "Haiti", group: "C", flag: "🇭🇹" },
  { id: "SCO", name: "Scotland", group: "C", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },

  // GROUP D
  { id: "US",  name: "United States", group: "D", flag: "🇺🇸" },
  { id: "PY",  name: "Paraguay", group: "D", flag: "🇵🇾" },
  { id: "AU",  name: "Australia", group: "D", flag: "🇦🇺" },
  { id: "TR",  name: "Türkiye", group: "D", flag: "🇹🇷" },

  // GROUP E
  { id: "DE",  name: "Germany", group: "E", flag: "🇩🇪" },
  { id: "CW",  name: "Curaçao", group: "E", flag: "🇨🇼" },
  { id: "CI",  name: "Ivory Coast", group: "E", flag: "🇨🇮" },
  { id: "EC",  name: "Ecuador", group: "E", flag: "🇪🇨" },

  // GROUP F
  { id: "NL",  name: "Netherlands", group: "F", flag: "🇳🇱" },
  { id: "JP",  name: "Japan", group: "F", flag: "🇯🇵" },
  { id: "SE",  name: "Sweden", group: "F", flag: "🇸🇪" },
  { id: "TN",  name: "Tunisia", group: "F", flag: "🇹🇳" },

  // GROUP G
  { id: "BE",  name: "Belgium", group: "G", flag: "🇧🇪" },
  { id: "EG",  name: "Egypt", group: "G", flag: "🇪🇬" },
  { id: "IR",  name: "Iran", group: "G", flag: "🇮🇷" },
  { id: "NZ",  name: "New Zealand", group: "G", flag: "🇳🇿" },

  // GROUP H
  { id: "ES",  name: "Spain", group: "H", flag: "🇪🇸" },
  { id: "CV",  name: "Cape Verde", group: "H", flag: "🇨🇻" },
  { id: "SA",  name: "Saudi Arabia", group: "H", flag: "🇸🇦" },
  { id: "UY",  name: "Uruguay", group: "H", flag: "🇺🇾" },

  // GROUP I
  { id: "FR",  name: "France", group: "I", flag: "🇫🇷" },
  { id: "SN",  name: "Senegal", group: "I", flag: "🇸🇳" },
  { id: "IQ",  name: "Iraq", group: "I", flag: "🇮🇶" },
  { id: "NO",  name: "Norway", group: "I", flag: "🇳🇴" },

  // GROUP J
  { id: "AR",  name: "Argentina", group: "J", flag: "🇦🇷" },
  { id: "DZ",  name: "Algeria", group: "J", flag: "🇩🇿" },
  { id: "AT",  name: "Austria", group: "J", flag: "🇦🇹" },
  { id: "JO",  name: "Jordan", group: "J", flag: "🇯🇴" },

  // GROUP K
  { id: "PT",  name: "Portugal", group: "K", flag: "🇵🇹" },
  { id: "CD",  name: "DR Congo", group: "K", flag: "🇨🇩" },
  { id: "UZ",  name: "Uzbekistan", group: "K", flag: "🇺🇿" },
  { id: "CO",  name: "Colombia", group: "K", flag: "🇨🇴" },

  // GROUP L
  { id: "GB",  name: "England", group: "L", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "HR",  name: "Croatia", group: "L", flag: "🇭🇷" },
  { id: "GH",  name: "Ghana", group: "L", flag: "🇬🇭" },
  { id: "PA",  name: "Panama", group: "L", flag: "🇵🇦" }
];