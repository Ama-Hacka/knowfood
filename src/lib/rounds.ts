import questionsData from "@/../data/questions.json";
import type { Question } from "@/types";
import { daysBetween, getTodayKey } from "@/lib/date";

const LAUNCH_DATE = "2026-10-01";
const bank = questionsData as Question[];

export function getTodaysQuestions(todayKey?: string): Question[] {
  const dayKey = todayKey ?? getTodayKey();
  const dayIndex = daysBetween(LAUNCH_DATE, dayKey);

  return Array.from({ length: 5 }, (_, index) => {
    const questionIndex = (dayIndex * 5 + index) % bank.length;
    return bank[questionIndex];
  });
}

export function getRoundKey(dateKey: string): string {
  return dateKey;
}
