import type { Question } from "@/types";
import { FoodCard } from "@/components/FoodCard";

type QuestionViewProps = {
  question: Question;
  index: number;
  total: number;
  onAnswer: (choice: "a" | "b") => void;
  selected: "a" | "b" | null;
  reveal: { correct: "a" | "b"; selected: "a" | "b" } | null;
};

export function QuestionView({ question, index, total, onAnswer, selected, reveal }: QuestionViewProps) {
  const getStatus = (choice: "a" | "b") => {
    if (!reveal) {
      return selected === choice ? "default" : "default";
    }

    if (reveal.correct === choice) {
      return "correct";
    }

    if (reveal.selected === choice) {
      return "wrong";
    }

    return "default";
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>
          {index + 1}/{total}
        </span>
        <span className="rounded-full bg-slate-800 px-2 py-1 font-medium text-amber-300">
          ×{[1, 1, 2, 3, 3][index] ?? 1}
        </span>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/20">
        <p className="text-lg font-semibold text-white">{question.prompt}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FoodCard
          option={question.a}
          selected={selected === "a"}
          status={getStatus("a")}
          onSelect={() => onAnswer("a")}
        />
        <FoodCard
          option={question.b}
          selected={selected === "b"}
          status={getStatus("b")}
          onSelect={() => onAnswer("b")}
        />
      </div>
    </div>
  );
}
