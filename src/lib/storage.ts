import type { SavedState } from "@/types";

const STORAGE_KEY = "platepick:v1";

export function getEmptySavedState(): SavedState {
  return {
    rounds: {},
    streak: 0,
    lastPlayedDate: null,
    bestScore: 0,
  };
}

export function readSavedState(): SavedState {
  if (typeof window === "undefined") {
    return getEmptySavedState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getEmptySavedState();
    }

    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      rounds: parsed.rounds ?? {},
      streak: typeof parsed.streak === "number" ? parsed.streak : 0,
      lastPlayedDate: typeof parsed.lastPlayedDate === "string" ? parsed.lastPlayedDate : null,
      bestScore: typeof parsed.bestScore === "number" ? parsed.bestScore : 0,
    };
  } catch {
    return getEmptySavedState();
  }
}

export function writeSavedState(state: SavedState): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage issues in private browsing or restricted browsers.
  }
}
