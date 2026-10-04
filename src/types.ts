export type Question = {
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

export type Option = {
  name: string;
  emoji: string;
  details: string[];
};

export type SavedState = {
  rounds: Record<string, {
    answers: Array<"a" | "b">;
    completed: boolean;
    score: number;
  }>;
  streak: number;
  lastPlayedDate: string | null;
  bestScore: number;
};
