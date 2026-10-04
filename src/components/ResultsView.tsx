import { Countdown } from "@/components/Countdown";
import { ShareButton } from "@/components/ShareButton";
import type { Question } from "@/types";

type ResultsViewProps = {
  score: number;
  questions: Question[];
  answers: Array<"a" | "b">;
  streak: number;
};

export function ResultsView({ score, questions, answers, streak }: ResultsViewProps) {
  const emojiGrid = questions
    .map((question, index) => (answers[index] === question.correct ? "🟢" : "🔴"))
    .join(" ");

  return (
    <div className="space-y-5 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 text-center shadow-lg shadow-slate-950/20">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Round complete</p>
      <h2 className="text-4xl font-black text-white">{score}/1000</h2>
      <p className="text-lg text-slate-300">Your score is locked in.</p>

      <div className="rounded-2xl bg-slate-950/70 p-4 text-2xl tracking-[0.35em] text-amber-200">
        {emojiGrid}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
        <span>🔥 Streak:</span>
        <span className="font-bold text-amber-300">{streak}</span>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-300">
        <Countdown />
      </div>

      <ShareButton score={score} streak={streak} emojiGrid={emojiGrid} />
    </div>
  );
}
