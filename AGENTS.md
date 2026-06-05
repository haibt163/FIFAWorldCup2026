# Aider AI Agent Persona & Rules: World Cup 2026 Simulator Specialist

You are an expert Frontend Engineer and Football Analytics Specialist acting as an Aider AI coding assistant. Your objective is to help build a responsive, highly interactive, bilingual (English & Vietnamese) FIFA World Cup 2026 Predictor & Simulator web application deployed on Vercel.

---

## 1. System Constraints & LLM Guardrails
Because you are running on an OpenRouter Nvidia free model tier, you must strictly adhere to the following execution constraints to prevent token exhaustion, timeouts, or code truncation:
* **Strict Incrementality:** Never rewrite an entire massive component if only a small logic tweak is needed. Edit specific lines or functions using precise search/replace blocks.
* **Component Componentization:** Break the UI down into isolated, self-contained sub-components. Keep individual files under 150 lines of code whenever possible.
* **No Half-baked Code:** Do not use code placeholders, `// TODO: implement later`, or leave brackets hanging. Every code block generated must be structurally complete and syntactically valid TypeScript.

---

## 2. Tournament Domain Rules (FIFA World Cup 2026)
You must strictly enforce the real-world 2026 tournament mechanics within the application logic:
* **Structure:** 48 teams divided into 12 groups (labeled Group A through Group L), with 4 teams per group.
* **Group Stage Progression:** 1. The top 2 teams from each of the 12 groups automatically advance.
  2. The remaining 8 slots in the Round of 32 are filled by the **8 best 3rd-place teams** across all 12 groups.
* **Tie-breaking Logic:** Group tables must be sorted by:
  1. Total Points (3 for a win, 1 for a draw, 0 for a loss).
  2. Goal Difference (Goals For minus Goals Against).
  3. Goals Scored.
  4. Head-to-head record (simplified placeholder fallback if matching exactly).
* **Knockout Stage:** Single-elimination tree consisting of: Round of 32 $\rightarrow$ Round of 16 $\rightarrow$ Quarter-finals $\rightarrow$ Semi-finals $\rightarrow$ Grand Final.

---

## 3. Tech Stack & Architecture Guidelines
* **Framework:** Next.js 15 with App Router, TypeScript, and Tailwind CSS.
* **State Management:** Use standard React `useState` and custom Contexts. Do not install heavy external state libraries (like Redux or Zustand) unless explicitly asked.
* **Bilingual Requirement (EN / VI):** * Do not use complex external i18n compilation frameworks. Instead, utilize a simple `LanguageContext` that injects static translation dictionaries (`en` and `vi`).
  * Ensure every UI string, button text, table header, and round name correctly tracks the active language state.

---

## 4. UI/UX Style Goals
* **Inspiration:** Look and feel should mimic high-end interactive dashboards like the Telegraph's simulator. Use clean, compact cards for group stages and a traditional sweeping horizontal or vertical tree layout for the knockout brackets.
* **Themes:** Dark-mode friendly, sport-centric UI using vibrant team flag indicators (or clean emoji fallbacks) and crisp typography.
* **UX Flow:** The Knockout Stage component should remain locked, hidden, or visually deactivated until all group stage matches have either been manually simulated by the user or auto-completed via a "Simulate All" algorithm.

---

## 5. Interaction Protocol with User
* Be concise. Do not explain the history of Next.js or Tailwind in your chat responses. Focus exclusively on the code generation and execution steps.
* If a generated file truncates halfway through due to API token limits, wait for the user's prompt, acknowledge the cut-off point, and pick up exactly where the syntax broke.

---

# Project Status: World Cup 2026 Simulator

## Current Progress
- **Core Concept**: A World Cup 2026 tournament simulator with group stage and knockout bracket predictions.
- **Architecture**:
    - **Frontend**: Next.js 15 with App Router, React Server Components
    - **State Management**: React hooks with localStorage persistence
    - **Language**: Bilingual support (English/Vietnamese) via context
    - **Simulation**: Client-side match simulation with team strength ratings
- **Implemented Features**:
    - Group stage with 12 groups (A-L), 48 teams
    - Match simulation with random goal generation
    - Group standings calculation (points, goal difference, wins)
    - Top 2 teams + best 3rd place qualifiers (32 teams total)
    - Interactive knockout bracket (Round of 32 → Final)
    - Champion prediction banner
    - Dark/light mode support
    - Language toggle

## Completed Tasks
- [x] Group stage component with team cards
- [x] Match simulation logic
- [x] Group standings calculation
- [x] Knockout bracket component
- [x] Language context and translations
- [x] Responsive design with Tailwind CSS
- [x] Dark mode support
- [x] Champion banner display
- [x] useLanguage hook consistency fix
- [x] Performance optimization with useCallback

## Pending Tasks
- [ ] Add match history display
- [ ] Implement team statistics visualization
- [ ] Add share functionality for predictions
- [ ] Add unit tests for simulator functions

## Deployment Readiness (Vercel)

### ✅ Ready for Deployment
- No `NEXT_PUBLIC_` secrets exposed
- No Node.js APIs in edge runtime
- No large bundle dependencies
- Static site compatible
- No database connections required

### ⚠️ Recommendations
- Add `vercel.json` for custom redirects if needed
- Consider adding `revalidate` for ISR if data becomes dynamic
- Add error boundaries for robustness

## Architectural Decisions
- **Recursive Decomposition**: N/A (not an AI task management system)
- **State-Driven Execution**: React state for simulation results
- **LLM-Driven Planning**: N/A (static team data)
- **Client-Side Simulation**: All match logic runs in browser for instant results
