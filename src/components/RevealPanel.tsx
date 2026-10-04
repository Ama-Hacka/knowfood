import type { Question } from "@/types";

type RevealPanelProps = {
  question: Question;
  isCorrect: boolean;
  points: number;
  onNext: () => void;
  showNext: boolean;
};

export function RevealPanel({ question, isCorrect, points, onNext, showNext }: RevealPanelProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
      <div className="flex items-center justify-between gap-3">
        <span className={`text-lg font-bold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
          {isCorrect ? "✅ Correct" : "❌ Not quite"}
        </span>
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold text-amber-300">
          +{points} pts
        </span>
      </div>

      <p className="text-base text-slate-200">{question.explanation}</p>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Sources</p>
        <ul className="space-y-1 text-sm text-sky-300">
          {question.sources.map((source) => (
            <li key={source.label}>
              <a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {showNext ? (
        <button
          type="button"
          onClick={onNext}
          className="mt-2 w-full rounded-full bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          {question.id === "q-0005" ? "See results" : "Next question"}
        </button>
      ) : null}
    </div>
  );
}
