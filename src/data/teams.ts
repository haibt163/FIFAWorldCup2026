export type Team = {
  id: string;
  name: string;
  country: string;
  flag: string; // URL or emoji placeholder
  group: string; // 'A' to 'L'
  ranking: number; // FIFA ranking placeholder
  strength: number; // 0-100 strength for simulation
};

export const teams: Team[] = [
  // Group A
  { id: "mex", name: "Mexico", country: "Mexico", flag: "🇲🇽", group: "A", ranking: 16, strength: 82 },
  { id: "rsa", name: "South Africa", country: "South Africa", flag: "🇿🇦", group: "A", ranking: 59, strength: 72 },
  { id: "kor", name: "South Korea", country: "South Korea", flag: "🇰🇷", group: "A", ranking: 22, strength: 80 },
  { id: "cze", name: "Czech Republic", country: "Czech Republic", flag: "🇨🇿", group: "A", ranking: 45, strength: 76 },

  // Group B
  { id: "can", name: "Canada", country: "Canada", flag: "🇨🇦", group: "B", ranking: 35, strength: 77 },
  { id: "bih", name: "Bosnia and Herzegovina", country: "Bosnia and Herzegovina", flag: "🇧🇦", group: "B", ranking: 85, strength: 70 },
  { id: "qat", name: "Qatar", country: "Qatar", flag: "🇶🇦", group: "B", ranking: 46, strength: 74 },
  { id: "sui", name: "Switzerland", country: "Switzerland", flag: "🇨🇭", group: "B", ranking: 11, strength: 85 },

  // Group C
  { id: "bra", name: "Brazil", country: "Brazil", flag: "🇧🇷", group: "C", ranking: 5, strength: 94 },
  { id: "mar", name: "Morocco", country: "Morocco", flag: "🇲🇦", group: "C", ranking: 13, strength: 84 },
  { id: "hai", name: "Haiti", country: "Haiti", flag: "🇭🇹", group: "C", ranking: 102, strength: 62 },
  { id: "sco", name: "Scotland", country: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", ranking: 52, strength: 75 },

  // Group D
  { id: "usa", name: "United States", country: "USA", flag: "🇺🇸", group: "D", ranking: 11, strength: 86 },
  { id: "par", name: "Paraguay", country: "Paraguay", flag: "🇵🇾", group: "D", ranking: 48, strength: 76 },
  { id: "aus", name: "Australia", country: "Australia", flag: "🇦🇺", group: "D", ranking: 24, strength: 79 },
  { id: "tur", name: "Tükiye", country: "Tükiye", flag: "🇹🇷", group: "D", ranking: 26, strength: 81 },

  // Group E
  { id: "ger", name: "Germany", country: "Germany", flag: "🇩🇪", group: "E", ranking: 14, strength: 91 },
  { id: "cur", name: "Curaçao", country: "Curaçao", flag: "🇨🇼", group: "E", ranking: 72, strength: 68 },
  { id: "civ", name: "Ivory Coast", country: "Ivory Coast", flag: "🇨🇮", group: "E", ranking: 44, strength: 78 },
  { id: "ecu", name: "Ecuador", country: "Ecuador", flag: "🇪🇨", group: "E", ranking: 30, strength: 80 },

  // Group F
  { id: "ned", name: "Netherlands", country: "Netherlands", flag: "🇳🇱", group: "F", ranking: 6, strength: 89 },
  { id: "jpn", name: "Japan", country: "Japan", flag: "🇯🇵", group: "F", ranking: 18, strength: 83 },
  { id: "swe", name: "Sweden", country: "Sweden", flag: "🇸🇪", group: "F", ranking: 29, strength: 79 },
  { id: "tun", name: "Tunisia", country: "Tunisia", flag: "🇹🇳", group: "F", ranking: 55, strength: 73 },

  // Group G
  { id: "bel", name: "Belgium", country: "Belgium", flag: "🇧🇪", group: "G", ranking: 12, strength: 87 },
  { id: "egy", name: "Egypt", country: "Egypt", flag: "🇪🇬", group: "G", ranking: 36, strength: 77 },
  { id: "irn", name: "Iran", country: "Iran", flag: "🇮🇷", group: "G", ranking: 21, strength: 81 },
  { id: "nzl", name: "New Zealand", country: "New Zealand", flag: "🇳🇿", group: "G", ranking: 101, strength: 65 },

  // Group H
  { id: "esp", name: "Spain", country: "Spain", flag: "🇪🇸", group: "H", ranking: 8, strength: 92 },
  { id: "cpv", name: "Cape Verde", country: "Cape Verde", flag: "🇨🇻", group: "H", ranking: 62, strength: 71 },
  { id: "sau", name: "Saudi Arabia", country: "Saudi Arabia", flag: "🇸🇦", group: "H", ranking: 59, strength: 74 },
  { id: "uru", name: "Uruguay", country: "Uruguay", flag: "🇺🇾", group: "H", ranking: 15, strength: 85 },

  // Group I
  { id: "fra", name: "France", country: "France", flag: "🇫🇷", group: "I", ranking: 2, strength: 93 },
  { id: "sen", name: "Senegal", country: "Senegal", flag: "🇸🇳", group: "I", ranking: 17, strength: 83 },
  { id: "irq", name: "Iraq", country: "Iraq", flag: "🇮🇶", group: "I", ranking: 54, strength: 74 },
  { id: "nor", name: "Norway", country: "Norway", flag: "🇳🇴", group: "I", ranking: 47, strength: 81 },

  // Group J
  { id: "arg", name: "Argentina", country: "Argentina", flag: "🇦🇷", group: "J", ranking: 1, strength: 95 },
  { id: "dza", name: "Algeria", country: "Algeria", flag: "🇩🇿", group: "J", ranking: 41, strength: 77 },
  { id: "aut", name: "Austria", country: "Austria", flag: "🇦🇹", group: "J", ranking: 25, strength: 79 },
  { id: "jor", name: "Jordan", country: "Jordan", flag: "🇯🇴", group: "J", ranking: 88, strength: 67 },

  // Group K
  { id: "por", name: "Portugal", country: "Portugal", flag: "🇵🇹", group: "K", ranking: 7, strength: 90 },
  { id: "cod", name: "DR Congo", country: "DR Congo", flag: "🇨🇩", group: "K", ranking: 52, strength: 75 },
  { id: "uzb", name: "Uzbekistan", country: "Uzbekistan", flag: "🇺🇿", group: "K", ranking: 64, strength: 72 },
  { id: "col", name: "Colombia", country: "Colombia", flag: "🇨🇴", group: "K", ranking: 28, strength: 82 },

  // Group L
  { id: "eng", name: "England", country: "England", flag: "🇬🇧", group: "L", ranking: 4, strength: 91 },
  { id: "cro", name: "Croatia", country: "Croatia", flag: "🇭🇷", group: "L", ranking: 10, strength: 86 },
  { id: "gha", name: "Ghana", country: "Ghana", flag: "🇬🇭", group: "L", ranking: 73, strength: 74 },
  { id: "pan", name: "Panama", country: "Panama", flag: "🇵🇦", group: "L", ranking: 53, strength: 73 },
];
