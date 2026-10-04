"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Countdown } from "@/components/Countdown";
import { QuestionView } from "@/components/QuestionView";
import { RevealPanel } from "@/components/RevealPanel";
import { ResultsView } from "@/components/ResultsView";
import { getTodayKey } from "@/lib/date";
import { getTodaysQuestions } from "@/lib/rounds";
import { calculateScore, getNextStreak, MULTIPLIERS } from "@/lib/scoring";
import { readSavedState, writeSavedState } from "@/lib/storage";

export default function PlayPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [game, setGame] = useState({
    todayKey: "",
    questions: [] as ReturnType<typeof getTodaysQuestions>,
    currentIndex: 0,
    answers: [] as Array<"a" | "b">,
    selectedChoice: null as "a" | "b" | null,
    reveal: null as { correct: "a" | "b"; selected: "a" | "b" } | null,
    currentPoints: 0,
    completed: false,
    finalScore: 0,
    streak: 0,
  });

  useEffect(() => {
    const todayKey = getTodayKey();
    const questions = getTodaysQuestions(todayKey);
    const savedState = readSavedState();
    const existingRound = savedState.rounds[todayKey];

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGame({
      todayKey,
      questions,
      currentIndex: existingRound ? (existingRound.completed ? questions.length : existingRound.answers.length) : 0,
      answers: existingRound?.answers ?? [],
      selectedChoice: null,
      reveal: null,
      currentPoints: 0,
      completed: !!existingRound?.completed,
      finalScore: existingRound?.score ?? 0,
      streak: savedState.streak,
    });
    setIsHydrated(true);
  }, []);

  const { todayKey, questions, currentIndex, answers, selectedChoice, reveal, currentPoints, completed, finalScore, streak } = game;
  const currentQuestion = questions[currentIndex];
  const isRoundDone = !currentQuestion && completed;

  function handleAnswer(choice: "a" | "b") {
    if (!currentQuestion || reveal) {
      return;
    }

    const isCorrect = choice === currentQuestion.correct;
    const points = isCorrect ? 100 * (MULTIPLIERS[currentIndex] ?? 1) : 0;
    const updatedAnswers = [...answers, choice];
    const scoreSoFar = calculateScore(
      updatedAnswers.map((answer, index) => answer === questions[index].correct),
    );

    const currentState = readSavedState();
    const nextState = {
      ...currentState,
      rounds: {
        ...currentState.rounds,
        [todayKey]: {
          answers: updatedAnswers,
          completed: false,
          score: scoreSoFar,
        },
      },
    };

    writeSavedState(nextState);
    setGame((prev) => ({
      ...prev,
      answers: updatedAnswers,
      selectedChoice: choice,
      reveal: { correct: currentQuestion.correct, selected: choice },
      currentPoints: points,
    }));
  }

  function handleNext() {
    if (!selectedChoice) {
      return;
    }

    const isLastQuestion = currentIndex >= questions.length - 1;

    if (isLastQuestion) {
      const finalAnswers = answers;
      const scoreTotal = calculateScore(
        questions.map((question, index) => finalAnswers[index] === question.correct),
      );

      const previousState = readSavedState();
      const nextStreak = getNextStreak(previousState.lastPlayedDate, todayKey, previousState.streak);
      const nextState = {
        ...previousState,
        rounds: {
          ...previousState.rounds,
          [todayKey]: {
            answers: finalAnswers,
            completed: true,
            score: scoreTotal,
          },
        },
        streak: nextStreak,
        lastPlayedDate: todayKey,
        bestScore: Math.max(previousState.bestScore, scoreTotal),
      };

      writeSavedState(nextState);
      setGame((prev) => ({
        ...prev,
        completed: true,
        finalScore: scoreTotal,
        currentIndex: questions.length,
        selectedChoice: null,
        reveal: null,
        streak: nextStreak,
      }));
      return;
    }

    setGame((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      selectedChoice: null,
      reveal: null,
      currentPoints: 0,
    }));
  }

  if (!isHydrated) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-5 px-4 py-6 text-slate-100">
        <header className="flex items-center justify-between">
          <Link href="/" className="font-black uppercase tracking-[0.2em] text-amber-300">
            Plate Pick
          </Link>
          <div className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-sm font-semibold text-amber-300">
            🔥 0
          </div>
        </header>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-300">
          Loading today’s round…
        </div>
      </main>
    );
  }

  if (!todayKey || questions.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-5 px-4 py-6 text-slate-100">
        <header className="flex items-center justify-between">
          <Link href="/" className="font-black uppercase tracking-[0.2em] text-amber-300">
            Plate Pick
          </Link>
          <div className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-sm font-semibold text-amber-300">
            🔥 {streak}
          </div>
        </header>
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm text-slate-300">
          No questions available today.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-5 px-4 py-6 text-slate-100">
      <header className="flex items-center justify-between">
        <Link href="/" className="font-black uppercase tracking-[0.2em] text-amber-300">
          Plate Pick
        </Link>
        <div className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-sm font-semibold text-amber-300">
          🔥 {streak}
        </div>
      </header>

      {completed && isRoundDone ? (
        <ResultsView score={finalScore} questions={questions} answers={answers} streak={streak} />
      ) : currentQuestion && reveal ? (
        <>
          <RevealPanel
            question={currentQuestion}
            isCorrect={reveal.selected === reveal.correct}
            points={currentPoints}
            onNext={handleNext}
            showNext
          />
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-3 text-center text-sm text-slate-300">
            <Countdown />
          </div>
        </>
      ) : currentQuestion ? (
        <>
          <QuestionView
            question={currentQuestion}
            index={currentIndex}
            total={questions.length}
            onAnswer={handleAnswer}
            selected={selectedChoice}
            reveal={reveal}
          />
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-3 text-center text-sm text-slate-300">
            <Countdown />
          </div>
        </>
      ) : null}
    </main>
  );
}
