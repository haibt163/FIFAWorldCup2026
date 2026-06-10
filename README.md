# FIFA World Cup 2026 Predictor & Simulator

A high-fidelity, interactive, bilingual (English & Vietnamese) tournament prediction platform modeled after premium data-journalism dashboards. This application allows users to predict group stage rankings and simulates the entire knockout tree precisely adhering to official FIFA tournament mechanics.

🚀 **Live Demo:** [https://fifamundial2026.vercel.app/](https://fifamundial2026.vercel.app/)  
💻 **Repository:** [https://github.com/haibt163/FIFAWorldCup2026](https://github.com/haibt163/FIFAWorldCup2026)

---

## 🏆 Core Achievements & Features

* **Absolute Annex C Compliance:** Unlike standard simulators, this app features a custom mathematical progression engine mapped directly to **Annex C of the Regulations for the FIFA World Cup 26** (Pages 80–97). It flawlessly resolves all **495 different mathematical combinations** required to map the 8 best third-placed teams into their exact designated Round of 32 slots.
* **Premium Drag-and-Drop Interactive UX:** Inspired by *The Telegraph's* layout, users can quickly sort group standings (1st–4th) via desktop dragging or dedicated quick-move badges.
* **Mobile-Optimized Sensor Controls:** Custom touch configurations feature high-tolerance boundary constraints ($\ge 12\text{px}$) and swift activation timings ($\sim 150\text{ms}$) engineered to prevent natural mobile thumb-jitters from dropping drag actions.
* **Native Selection Safeguards:** Includes hardcoded css target structures (`-webkit-touch-callout: none`, `user-select: none`) across row wrappers to permanently bypass native iOS text selection and copy/magnifier callouts while holding items.
* **Cross-Platform Flag Handling:** Replaces fragile native text emoji flags with an algorithmic `getFlagUrl` decoder engine. It dynamically pulls high-definition, sharp country graphics from `flagcdn.com` for bulletproof cross-platform rendering (Windows/Linux/iOS/Android).
* **Bilingual Translation State:** Reactive context-driven architecture allowing users to swap seamlessly between English (`en`) and Vietnamese (`vi`) without performance lags or flash-of-untranslated-content.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router) & React Server Components
* **Styling:** Tailwind CSS
* **Drag-and-Drop Engine:** `@dnd-kit/core` & `@dnd-kit/sortable`
* **State Management:** React Hooks & custom Context Providers (Local Storage Persistence)
* **Deployment:** Vercel Production Pipeline

---

## 📂 Project Blueprint Tree

```text
src/
├── app/
│   ├── layout.tsx         # Global metadata engine & antialiasing font wrapper
│   └── page.tsx           # Main application entry orchestrating layouts & stage locks
├── components/
│   ├── GroupStage.tsx     # Handles 12 groups (A-L) with mobile drag sensors & badges
│   ├── ThirdPlaceRanker.tsx # 3rd-place checker board validating the exact 8 qualifying squads
│   ├── KnockoutBracket.tsx  # Implements the 495-combination Annex C tree (Matches 73–104)
│   ├── TeamCard.tsx       # UI leaf rendering for team items
│   └── ChampionBanner.tsx # Celebratory modal popping up upon grand final selection
├── context/
│   └── LanguageContext.tsx # Injecting reactive 'en' and 'vi' language state dictionaries
└── data/
    └── teams.ts           # Unified data arrays tracking group mappings & country profiles


🚀 Getting Started (Local Setup)
1. Clone the repository
Bash
git clone [https://github.com/haibt163/FIFAWorldCup2026.git](https://github.com/haibt163/FIFAWorldCup2026.git)
cd FIFAWorldCup2026

2. Install dependencies
Bash
npm install
# or
yarn install
# or
pnpm install

3. Run the development server
Bash
npm run dev
Open http://localhost:3000 in your browser to inspect the application.

🗺️ Roadmap for Future Contributors
We are highly receptive to contributions that elevate the aesthetic immersion of the application without disrupting the core, locked down tournament logic.

🎵 1. Ambient Multimedia Integration
Objective: Implement a subtle background theme music interface leveraging the YouTube IFrame Player API.

Target Files: Create a specialized audio module or embed it smoothly within src/app/layout.tsx.

Requirement: Must support a clean toggle state (Play/Mute) that respects language translation fields.

🎨 2. Visual Effects & Aesthetic Refinements
Objective: Integrate modern graphic accents (e.g., subtle glow drop-shadows on cards, high-fidelity card textures, micro-animations behind active bracket paths, or tournament-themed background gradients).

Guidelines: Ensure additional layout transformations do not trigger layout shifts or lag behind mobile drag animations. Keep touch interaction handlers isolated.

🤝 Contribution Guidelines
Keep it Incremental: Focus your pull requests on isolated styling elements or peripheral features. Avoid breaking modifications to the tournament progression algorithms inside KnockoutBracket.tsx or ThirdPlaceRanker.tsx.

Component Isolation: Keep newly introduced custom sub-components clean, self-contained, and ideally under 150 lines of code.

No Placeholders: Ensure your submitted code is syntactically complete and thoroughly typed with TypeScript. Do not include half-baked // TODO blocks.

Bilingual Verification: If adding new textual components, make sure to add both English and Vietnamese text strings to your interface.

Feel free to open an Issue or submit a Pull Request. Let's make this the most polished and accurate World Cup 2026 simulator on GitHub! ⚽🔥