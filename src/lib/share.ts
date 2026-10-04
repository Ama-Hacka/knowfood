export function buildShareText(
  score: number,
  streak: number,
  emojiGrid: string,
  domain = "https://platepick.app",
): string {
  return `Plate Pick 🍽️\n${emojiGrid}  ${score}/1000\n🔥 Streak: ${streak}\n${domain}`;
}
