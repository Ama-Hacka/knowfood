import Link from "next/link";

export default function HowToPlayPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 px-4 py-10 text-slate-100">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-black uppercase tracking-[0.2em] text-amber-300">
          Plate Pick
        </Link>
      </header>

      <section className="space-y-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-5">
        <h1 className="text-3xl font-black text-white">How to play</h1>
        <ol className="list-decimal space-y-3 pl-5 text-slate-200">
          <li>Read the prompt and compare the two foods.</li>
          <li>Use the visible details, not the vibes.</li>
          <li>Pick the healthier option.</li>
          <li>Read the reveal and the source links.</li>
          <li>Share your score grid without spoiling the answer.</li>
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 text-slate-200">
        <p className="font-semibold text-white">Rules</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Exactly one option is healthier given the visible details.</li>
          <li>The twist is usually in the details, not the label.</li>
          <li>Questions are based on public food safety and nutrition sources.</li>
          <li>For fun and general education; not medical advice.</li>
        </ul>
      </section>

      <Link
        href="/play"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950"
      >
        Play today
      </Link>
    </main>
  );
}
