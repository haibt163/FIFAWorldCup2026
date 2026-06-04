export type Team = {
  name: string;
  country: string;
  flag: string; // URL or emoji placeholder
  group: string; // 'A' to 'L'
  ranking: number; // FIFA ranking placeholder
  strength: number; // 0-100 strength for simulation
};

export const teams: Team[] = [
  // Group A
  { name: "Brazil", country: "Brazil", flag: "🇧🇷", group: "A", ranking: 1, strength: 95 },
  { name: "Germany", country: "Germany", flag: "🇩🇪", group: "A", ranking: 2, strength: 92 },
  { name: "Spain", country: "Spain", flag: "🇪🇸", group: "A", ranking: 3, strength: 90 },
  { name: "France", country: "France", flag: "🇫🇷", group: "A", ranking: 4, strength: 89 },

  // Group B
  { name: "Argentina", country: "Argentina", flag: "🇦🇷", group: "B", ranking: 5, strength: 88 },
  { name: "England", country: "England", flag: "🇬🇧", group: "B", ranking: 6, strength: 87 },
  { name: "Italy", country: "Italy", flag: "🇮🇹", group: "B", ranking: 7, strength: 85 },
  { name: "Netherlands", country: "Netherlands", flag: "🇳🇱", group: "B", ranking: 8, strength: 84 },

  // Group C
  { name: "Portugal", country: "Portugal", flag: "🇵🇹", group: "C", ranking: 9, strength: 83 },
  { name: "Belgium", country: "Belgium", flag: "🇧🇪", group: "C", ranking: 10, strength: 82 },
  { name: "Croatia", country: "Croatia", flag: "🇭🇷", group: "C", ranking: 11, strength: 80 },
  { name: "Switzerland", country: "Switzerland", flag: "🇨🇭", group: "C", ranking: 12, strength: 79 },

  // Group D
  { name: "USA", country: "USA", flag: "🇺🇸", group: "D", ranking: 13, strength: 78 },
  { name: "Mexico", country: "Mexico", flag: "🇲🇽", group: "D", ranking: 14, strength: 77 },
  { name: "Japan", country: "Japan", flag: "🇯🇵", group: "D", ranking: 15, strength: 76 },
  { name: "South Korea", country: "South Korea", flag: "🇰🇷", group: "D", ranking: 16, strength: 75 },

  // Group E
  { name: "Brazil", country: "Brazil", flag: "🇧🇷", group: "E", ranking: 17, strength: 74 },
  { name: "Germany", country: "Germany", flag: "🇩🇪", group: "E", ranking: 18, strength: 73 },
  { name: "Spain", country: "Spain", flag: "🇪🇸", group: "E", ranking: 19, strength: 72 },
  { name: "France", country: "France", flag: "🇫🇷", group: "E", ranking: 20, strength: 71 },

  // Group F
  { name: "Argentina", country: "Argentina", flag: "🇦🇷", group: "F", ranking: 21, strength: 70 },
  { name: "England", country: "England", flag: "🇬🇧", group: "F", ranking: 22, strength: 69 },
  { name: "Italy", country: "Italy", flag: "🇮🇹", group: "F", ranking: 23, strength: 68 },
  { name: "Netherlands", country: "Netherlands", flag: "🇳🇱", group: "F", ranking: 24, strength: 67 },

  // Group G
  { name: "Portugal", country: "Portugal", flag: "🇵🇹", group: "G", ranking: 25, strength: 66 },
  { name: "Belgium", country: "Belgium", flag: "🇧🇪", group: "G", ranking: 26, strength: 65 },
  { name: "Croatia", country: "Croatia", flag: "🇭🇷", group: "G", ranking: 27, strength: 64 },
  { name: "Switzerland", country: "Switzerland", flag: "🇨🇭", group: "G", ranking: 28, strength: 63 },

  // Group H
  { name: "USA", country: "USA", flag: "🇺🇸", group: "H", ranking: 29, strength: 62 },
  { name: "Mexico", country: "Mexico", flag: "🇲🇽", group: "H", ranking: 30, strength: 61 },
  { name: "Japan", country: "Japan", flag: "🇯🇵", group: "H", ranking: 31, strength: 60 },
  { name: "South Korea", country: "South Korea", flag: "🇰🇷", group: "H", ranking: 32, strength: 59 },

  // Group I
  { name: "Brazil", country: "Brazil", flag: "🇧🇷", group: "I", ranking: 33, strength: 58 },
  { name: "Germany", country: "Germany", flag: "🇩🇪", group: "I", ranking: 34, strength: 57 },
  { name: "Spain", country: "Spain", flag: "🇪🇸", group: "I", ranking: 35, strength: 56 },
  { name: "France", country: "France", flag: "🇫🇷", group: "I", ranking: 36, strength: 55 },

  // Group J
  { name: "Argentina", country: "Argentina", flag: "🇦🇷", group: "J", ranking: 37, strength: 54 },
  { name: "England", country: "England", flag: "🇬🇧", group: "J", ranking: 38, strength: 53 },
  { name: "Italy", country: "Italy", flag: "🇮🇹", group: "J", ranking: 39, strength: 52 },
  { name: "Netherlands", country: "Netherlands", flag: "🇳🇱", group: "J", ranking: 40, strength: 51 },

  // Group K
  { name: "Portugal", country: "Portugal", flag: "🇵🇹", group: "K", ranking: 41, strength: 50 },
  { name: "Belgium", country: "Belgium", flag: "🇧🇪", group: "K", ranking: 42, strength: 49 },
  { name: "Croatia", country: "Croatia", flag: "🇭🇷", group: "K", ranking: 43, strength: 48 },
  { name: "Switzerland", country: "Switzerland", flag: "🇨🇭", group: "K", ranking: 44, strength: 47 },

  // Group L
  { name: "USA", country: "USA", flag: "🇺🇸", group: "L", ranking: 45, strength: 46 },
  { name: "Mexico", country: "Mexico", flag: "🇲🇽", group: "L", ranking: 46, strength: 45 },
  { name: "Japan", country: "Japan", flag: "🇯🇵", group: "L", ranking: 47, strength: 44 },
  { name: "South Korea", country: "South Korea", flag: "🇰🇷", group: "L", ranking: 48, strength: 43 },
];
