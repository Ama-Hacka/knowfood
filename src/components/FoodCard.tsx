import type { Option } from "@/types";

type FoodCardProps = {
  option: Option;
  onSelect: () => void;
  selected: boolean;
  status: "default" | "correct" | "wrong";
};

export function FoodCard({ option, onSelect, selected, status }: FoodCardProps) {
  const cardStyles =
    status === "correct"
      ? "border-emerald-500 bg-emerald-500/10"
      : status === "wrong"
        ? "border-red-500 bg-red-500/10"
        : "border-slate-700 bg-slate-900/60";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Choose ${option.name}`}
      aria-pressed={selected}
      className={`flex w-full flex-col items-start gap-3 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${cardStyles} ${
        selected ? "ring-2 ring-amber-400" : "ring-0"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-4xl leading-none">{option.emoji}</span>
        {selected ? (
          <span className="rounded-full bg-amber-400/20 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-200">
            Picked
          </span>
        ) : null}
      </div>

      <div>
        <p className="text-xl font-semibold text-white">{option.name}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {option.details.map((detail) => (
          <span
            key={detail}
            className="rounded-full border border-slate-600 bg-slate-800/80 px-2 py-1 text-[11px] text-slate-200"
          >
            {detail}
          </span>
        ))}
      </div>
    </button>
  );
}
