# Project rules
- Next.js App Router, TypeScript (strict), Tailwind. No other UI libraries.
- Read SPEC.md before generating code. Follow its data model and scoring exactly.
- Keep it simple: small components, no over-engineering, no new dependencies without asking.
- All localStorage access goes through src/lib/storage.ts and is wrapped in try/catch.
- Mobile-first layouts. Large tap targets. Accessible (buttons, aria-labels, contrast).
- Never hardcode today's date; use getTodayKey().
