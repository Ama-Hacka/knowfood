import test from "node:test";
import assert from "node:assert/strict";

import { calculateScore, getNextStreak, getEmptySavedState } from "./scoring.ts";

test("calculateScore awards multipliers and caps at 1000", () => {
  const score = calculateScore([true, true, false, true, true]);
  assert.equal(score, 800);
});

test("getNextStreak increments for consecutive day play and resets otherwise", () => {
  assert.equal(getNextStreak("2026-10-02", "2026-10-03"), 2);
  assert.equal(getNextStreak("2026-10-03", "2026-10-03"), 1);
  assert.equal(getNextStreak("2026-10-05", "2026-10-03"), 1);
});

test("empty saved state initializes default fields", () => {
  const state = getEmptySavedState();
  assert.deepEqual(state.rounds, {});
  assert.equal(state.streak, 0);
  assert.equal(state.bestScore, 0);
  assert.equal(state.lastPlayedDate, null);
});
