# CLAUDE.md / Coding Conventions

## 1. Think Before Coding
* Don't assume. Don't hide confusion. Surface tradeoffs.
* Before implementing: State your assumptions explicitly. If uncertain, ask.
* If multiple interpretations exist, present them—don't pick silently.
* If a simpler approach exists, say so. Stop and name what is confusing.

## 2. Simplicity First
* Write the minimum code that solves the problem. Nothing speculative.
* No features beyond what was asked. No abstractions for single-use code.
* No "flexibility" or "configurability" that wasn't requested.
* If you write 200 lines and it could be 50, rewrite it. 

## 3. Surgical Changes
* Touch only what you must. Clean up only your own mess.
* When editing existing code: Don't "improve" adjacent code, comments, or formatting. 
* Don't refactor things that aren't broken. Match existing style perfectly.
* Every changed line must trace directly back to the user's explicit request.

## 4. Goal-Driven Execution
* Transform vague tasks into verifiable goals with strict success criteria.
* "Add validation" → "Write tests for invalid inputs, then make them pass."
* "Fix the bug" → "Write a test that reproduces it, then make it pass."@AGENTS.md

# WordPress to Next.js Migration Playbook

## Core Directives
1. Strictly follow the rules outlined in our loaded `@performance-optimisation` and `@vercel-deployment` blueprints.
2. Maintain look-and-feel consistency from the legacy WordPress source code while aggressively eliminating legacy plugin CSS bloating.

## Step-by-Step Migration Execution Pipeline

### Phase 1: Data Extraction & Schema Mapping
* Identify the source data structure (WordPress XML export, raw MySQL dump, or REST API).
* Map WordPress `wp_posts` and metadata into clean JSON schemas or local MDX files.

### Phase 2: Structural Next.js Scaffolding
* Initialize the target workspace using the Next.js App Router structure.
* Configure global layouts, Tailwind utility layers, and font optimizations (`next/font`).

### Phase 3: Component Componentization
* Isolate legacy WordPress elements (Header, Sidebar, Post Card, Footer) and convert them to modular React components.
* Enforce React Server Components (RSC) by default. Use `"use client"` only for interactive elements like mobile toggles or forms.

### Phase 4: SEO and Routing Hardening
* Build dynamic catch-all route segments (`app/[slug]/page.tsx`) to match old WordPress permalink structures.
* Generate automated `sitemap.ts` and `robots.ts`.
* Validate that `next/image` is utilized on all migrated media to achieve perfect cumulative layout shifts (CLS).

### Phase 5: Vercel Compilation Review
* Verify edge-config routing limits.
* Create standard `vercel.json` configuration blocks for fallback headers or historical URL redirect routing hooks.
