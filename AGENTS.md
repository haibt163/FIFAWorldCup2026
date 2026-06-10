# AI Agent Persona & Rules: World Cup 2026 Simulator Specialist

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
* **Official FIFA 2026 Knockout Format (Annex C):** The progression architecture of `KnockoutBracket.tsx` must align exactly with the official FIFA match tracks (Matches 73 through 104). It explicitly resolves the **495 different mathematical combinations** to correctly distribute group winners ($1A–1L$), runners-up ($2A–2L$), and the 8 best third-place teams down the bracket tree to the grand final.
* **Tie-breaking Logic:** Group tables must be sorted by Points, Goal Difference, and Goals For.
* **Knockout Stage:** Single-elimination tree consisting of: Round of 32 $\rightarrow$ Round of 16 $\rightarrow$ Quarter-finals $\rightarrow$ Semi-finals $\rightarrow$ Grand Final.

---

## 3. Tech Stack & Architecture Guidelines
* **Framework:** Next.js 15 with App Router, TypeScript, and Tailwind CSS.
* **State Management:** Use standard React `useState` and custom Contexts.
* **Bilingual Requirement (EN / VI):** Utilizes a static `LanguageContext` that injects translation dictionaries (`en` and `vi`) flawlessly across all sub-components.
* **Mobile-First UX Adjustments:** All row drag items must contain explicit style rules (`-webkit-touch-callout`, `user-select: none`) to eliminate native iOS selection overlays during a long-press. Touch sensors feature optimized activation delays ($\sim 150ms$) and boundary tolerances ($\ge 12px$) to accommodate natural thumb jitters.

---

## 4. UI/UX Style, Ambient Media & IShowSpeed Integration
* **Inspiration:** Premium interactive look and feel modeled directly after *The Telegraph’s* official simulation dashboards.
* **Atmospheric Visuals:** The application utilizes a customized overlay asset layer (`/ishowspeed.png`) served straight from the root `/public` directory. It is rendered as a global fixed background matrix with linear mask opacities configured inside `globals.css` to frame content elements beautifully without degrading readability or contrast.
* **Resilient Audio Infrastructure (YouTube Player API):** To secure full autoplay stability on mobile viewports (iOS Safari & Android Chrome) and bypass modern browser media blockages, streaming audio initializes asynchronously using a custom client-side `SpeedAudioManager` module. 
* **Gesture-Activated Bridge:** Playback automatically activates the millisecond a user interacts with the app (via click, touch tap, or scroll actions).
* **Automatic Silent Kill-switch:** The player monitors the viewport using a real-time `MutationObserver` on the root body element. As soon as a user finishes their prediction matrix and triggers the final champion presentation sequence (`ChampionBanner.tsx`), the music track pauses instantly.

---

# Project Status: World Cup 2026 Predictor App

## Current Progress
* **Core Concept**: Premium World Cup 2026 prediction platform with precise group standings mapping and mathematical knockout brackets.
* **Live Deployment**: Fully compiled, optimized, and deployed on Vercel at [https://fifamundial2026.vercel.app/](https://fifamundial2026.vercel.app/).
* **Media & Aesthetic Immersion**: Complete. Ambient IShowSpeed artwork layer and cross-platform gesture-activated background theme music are fully operational.

## Completed Tasks
- [x] Group stage component with 12 groups (A–L) and custom horizontal toggle badges
- [x] Smooth drag-and-drop mobile sensor configurations with text-selection protection
- [x] Comprehensive 3rd-Place Ranker tracking board enforcing strict 8-team validation constraints
- [x] Mathematically absolute Annex C Knockout Bracket (Matches 73–104) accommodating all 495 variations
- [x] Cross-platform flagcdn.com decoding engine for crisp UI asset rendering
- [x] Champion selection celebration banners
- [x] Fix background opacity layers across `page.tsx` and `layout.tsx` to let the `ishowspeed.png` wallpaper shine through from `globals.css`.
- [x] Consolidate conflicting layouts into a single managed client wrapper (`SpeedAudioManager.tsx`) with clear Next.js imports to prevent server layout hydration mismatches.
- [x] Update the YouTube background music module to play the explicit track identifier (`videoId: 'vrY1THC_NQE'`).
- [x] Expand target element wrapper dimensions inside `SpeedAudioManager` to `1px` by `1px` to permanently prevent modern mobile web engines from silently sleeping or pausing the stream.

## Pending Tasks
- [ ] Add prediction sharing configurations or image-generation downloads

## Architectural Decisions
* **Interaction Isolation:** Fast-action buttons manually override touch sensors via explicit `e.stopPropagation()` triggers to maintain rapid tactile response rates on high-refresh mobile viewports.
* **Rigid Core Logic Locking:** The foundational state handling structure within `KnockoutBracket.tsx` and `ThirdPlaceRanker.tsx` is fixed to uphold external FIFA regulatory guidelines; future updates will strictly focus on cosmetics and peripheral analytics features.
* **Audio Layer Segregation:** Global background sound initialization logic is entirely decoupled from the parent Next.js root layout document layout markup and bound securely within custom React hooks to avoid conflicting with runtime browser state transitions.