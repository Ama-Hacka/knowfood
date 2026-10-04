# Plate Pick — Daily Food Showdown Game

## Product summary

Plate Pick is a daily food decision game: five daily matchups where the player chooses which option is healthier, sees the twist, and shares a score grid.

## Core loop

- Daily round: 5 questions/day
- Same questions for everyone, reset at midnight ET
- Tap one of two food cards to answer
- Immediate reveal with points, explanation, and sources
- End-of-round summary with emoji result grid and share button
- Streak tracking and local save state

## Design principles

- Only one answer should be clearly healthier given the visible details.
- The twist must be visible on the card as a detail or condition.
- Every question needs an explanation and source URLs.
- Avoid brand names and contested health claims.
- Keep it mobile-first, quick, and shareable.

## Data model

```ts
type Question = {
  id: string;
  prompt: string;
  difficulty: 1 | 2 | 3;
  isTwist: boolean;
  a: Option;
  b: Option;
  correct: "a" | "b";
  explanation: string;
  sources: { label: string; url: string }[];
  tags: string[];
};

type Option = {
  name: string;
  emoji: string;
  details: string[];
};

type SavedState = {
  rounds: Record<string, {
    answers: Array<"a" | "b">;
    completed: boolean;
    score: number;
  }>;
  streak: number;
  lastPlayedDate: string | null;
  bestScore: number;
};
```

## Scoring

- Correct = 100 × multiplier
- Multipliers per question: [1, 1, 2, 3, 3]
- Maximum score = 1,000
- Wrong answers score 0

## Streak logic

- If the user played yesterday, increment the streak.
- If they played today, keep the streak.
- Otherwise reset to 1.
- Only completing the current day counts.

## Date logic

- Use ET time zone for date comparisons.
- Use the current date formatted as YYYY-MM-DD.

## Files

- `src/types.ts`
- `src/lib/date.ts`
- `src/lib/rounds.ts`
- `src/lib/scoring.ts`
- `src/lib/storage.ts`
- `src/lib/share.ts`
- `data/questions.json`
- `src/app/play/page.tsx`
- `src/app/how-to-play/page.tsx`

## MVP acceptance

- A user can complete a round without signup.
- Refresh preserves progress in the current round.
- Results show the right score and emoji grid.
- Daily questions are selected deterministically from a date key.
- Share text never reveals the answer.
- Every question includes source links and an explanation.
- Layout is mobile-first and works at 360px.
