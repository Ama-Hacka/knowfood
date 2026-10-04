export const MULTIPLIERS = [1, 1, 2, 3, 3] as const;

export function calculateScore(correctFlags: boolean[]): number {
  return correctFlags.reduce((total, isCorrect, index) => {
    const multiplier = MULTIPLIERS[index] ?? 1;
    return total + (isCorrect ? 100 * multiplier : 0);
  }, 0);
}

export function getNextStreak(
  lastPlayedDate: string | null,
  todayKey: string,
  currentStreak = 1,
): number {
  if (!lastPlayedDate) {
    return 1;
  }

  const diffInDays = daysBetween(lastPlayedDate, todayKey);
  if (diffInDays === 0) {
    return currentStreak;
  }

  if (diffInDays === 1) {
    return currentStreak + 1;
  }

  return 1;
}

export function getEmptySavedState() {
  return {
    rounds: {},
    streak: 0,
    lastPlayedDate: null,
    bestScore: 0,
  } as const;
}

function daysBetween(startKey: string, endKey: string): number {
  const start = parseDateKey(startKey);
  const end = parseDateKey(endKey);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}
