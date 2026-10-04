import { buildShareText } from "@/lib/share";

type ShareButtonProps = {
  score: number;
  streak: number;
  emojiGrid: string;
};

export function ShareButton({ score, streak, emojiGrid }: ShareButtonProps) {
  const text = buildShareText(score, streak, emojiGrid);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Plate Pick",
          text,
        });
        return;
      } catch {
        // Fallback to clipboard below.
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }

    window.alert("Copied your score to the clipboard.");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
    >
      Share score
    </button>
  );
}
