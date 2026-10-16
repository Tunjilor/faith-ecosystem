// src/app/biblequiz/quiz-client.tsx
"use client";
import { useUser } from "@/context/UserContext";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DenominationSelect, { readDenomination } from "@/components/DenominationSelect";

type Choice = "A" | "B" | "C" | "D";
type CategoryId =
  | "general"
  | "women"
  | "parables"
  | "ai"
  | "theology"
  | "history"
  | "christmas"
  | "thanksgiving"
  | "new-year";

type Category = {
  id: CategoryId;
  name: string;
  hover?: string;
};

type ServerQuestion = {
  id: string;
  prompt: string;
  choices: { A: string; B: string; C: string; D: string };
  chosen?: Choice | null;
};

type StartResponse = {
  ok?: boolean;
  attemptId: string;
  questions: ServerQuestion[];
  category?: CategoryId;
  error?: string;
  message?: string;
};

type CompletionScore = { score: number; total: number; resultsHref: string | null };

type ReviewItem = {
  questionId: string;
  prompt: string;
  category: string;
  chosen: Choice | null;
  correctAnswer: Choice;
  isCorrect: boolean;
  explanation: string | null;
  choices: Record<Choice, string>;
};

type SubmitResponse = {
  ok?: boolean;
  attemptId?: string;
  shareId?: string;
  score?: number;
  total?: number;
  redirectTo?: string;
  error?: string;
  review?: ReviewItem[];
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const QUESTIONS_PER_QUIZ = 10;

const categories: Category[] = [
  { id: "general", name: "General Bible Knowledge" },
  { id: "women", name: "Women of the Bible" },
  { id: "parables", name: "Jesus' Parables" },
  { id: "christmas", name: "Christmas & the Nativity", hover: "Seasonal: the Christmas story" },
  { id: "thanksgiving", name: "Thanksgiving & Gratitude", hover: "Seasonal: gratitude in Scripture" },
  { id: "new-year", name: "New Year & New Beginnings", hover: "Seasonal: fresh starts in Scripture" },
  { id: "ai", name: "AI Bible Questions", hover: "Fresh AI-generated questions" },
  { id: "theology", name: "Theology", hover: "Fresh AI-generated questions" },
  { id: "history", name: "Church History", hover: "Fresh AI-generated questions" },
];

async function postJSON<T>(url: string, body?: unknown): Promise<{ ok: boolean; data: T | any; status: number }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    cache: "no-store",
    body: body ? JSON.stringify(body) : "{}",
  });
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data, status: res.status };
}

// localStorage helpers for guest seen-question tracking
const LS_PREFIX = "fca_quiz_seen_";

function getLocalSeenIds(cat: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_PREFIX + cat);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch { return []; }
}

function addLocalSeenIds(cat: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalSeenIds(cat);
    const merged = [...new Set([...existing, ...ids])].slice(-300);
    localStorage.setItem(LS_PREFIX + cat, JSON.stringify(merged));
  } catch {}
}

// â"€â"€ Main component â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export default function QuizClient() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [signedIn, setSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string>("");

  const [category, setCategory] = useState<CategoryId>("general");
  const [denomination, setDenomination] = useState("non-denominational");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ServerQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generic inline error
  const [inlineError, setInlineError] = useState<string | null>(null);

  // Completion state (replaces immediate redirect after submit)
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [completionScore, setCompletionScore] = useState<CompletionScore | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [showInlineReview, setShowInlineReview] = useState(false);

  const quizAreaRef = useRef<HTMLDivElement>(null);

  const _me = useUser();
  useEffect(() => {
    setSignedIn(Boolean(_me.signedIn || _me.authed));
    setUserEmail(_me.email ?? null);
    setUserDisplayName(_me.displayName ?? "");
  }, [_me]);

  useEffect(() => {
    setDenomination(readDenomination());
    const onChanged = () => setDenomination(readDenomination());
    window.addEventListener("denomination-changed", onChanged);
    return () => window.removeEventListener("denomination-changed", onChanged);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Deep-link support: /biblequiz?category=christmas (etc.) preselects a category and
  // auto-starts that quiz. Used by the seasonal topic pages' "take the Bible Quiz" buttons.
  const autoStartedRef = useRef(false);
  useEffect(() => {
    if (autoStartedRef.current || typeof window === "undefined") return;
    const requested = new URLSearchParams(window.location.search).get("category");
    if (!requested) return;
    const match = categories.find((c) => c.id === requested);
    if (!match) return;
    autoStartedRef.current = true;
    setCategory(match.id);
    void startQuiz(match.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCategoryName = useMemo(
    () => categories.find((c) => c.id === category)?.name ?? "General Bible Knowledge",
    [category]
  );

  const answeredCount = useMemo(
    () => questions.reduce((acc, q) => acc + (q.chosen ? 1 : 0), 0),
    [questions]
  );

  const currentQuestion = questions[currentIndex] ?? null;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;

  // Questions remaining in this quiz session (for soft prompt)
  const questionsLeftInQuiz = questions.length > 0 ? questions.length - currentIndex - 1 : null;
  const showSoftPrompt =
    questions.length > 0 &&
    questionsLeftInQuiz !== null &&
    questionsLeftInQuiz <= 2 &&
    questionsLeftInQuiz > 0;

  function handleApiError(data: any) {
    if (!data) {
      setInlineError("Something went wrong. Please try again.");
      return;
    }

    if (data.error === "reset_not_allowed") {
      setInlineError(data.message || "You can only reset today's quiz.");
      return;
    }

    setInlineError(data.message || data.error || "Something went wrong. Please try again.");
  }

  async function startQuiz(nextCategory?: CategoryId) {
    const cat = nextCategory ?? category;

    setBusy(true);
    setInlineError(null);
    setAttemptId(null);
    setQuestions([]);
    setCurrentIndex(0);
    setQuizCompleted(false);
    setCompletionScore(null);
    setReviewItems([]);
    setShowInlineReview(false);

    const clientSeenIds = !signedIn ? getLocalSeenIds(cat) : [];

    const { ok, data } = await postJSON<StartResponse>("/api/quiz/start", {
      category: cat,
      ...(clientSeenIds.length > 0 ? { clientSeenIds } : {}),
    });

    if (!ok) {
      handleApiError(data);
      setBusy(false);
      return;
    }

    const attempt = data as StartResponse;

    if (!attempt?.attemptId || !Array.isArray(attempt?.questions)) {
      setInlineError("Quiz start returned an unexpected response.");
      setBusy(false);
      return;
    }

    // Deduplicate by ID in-memory — guarantees zero repeats within this session
    // regardless of what the server returned.
    const seenInSession = new Set<string>();
    const dedupedQuestions = attempt.questions.filter((q) => {
      if (seenInSession.has(q.id)) return false;
      seenInSession.add(q.id);
      return true;
    });

    if (!signedIn && dedupedQuestions.length > 0) {
      addLocalSeenIds(cat, dedupedQuestions.map((q) => q.id));
    }

    setAttemptId(attempt.attemptId);
    setQuestions(dedupedQuestions);
    setCurrentIndex(0);
    setBusy(false);
    setTimeout(() => quizAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  async function restartQuiz() {
    const prevAttemptId = attemptId;
    setBusy(true);
    setInlineError(null);
    setAttemptId(null);
    setQuestions([]);
    setCurrentIndex(0);
    setQuizCompleted(false);
    setCompletionScore(null);

    const reset = await postJSON("/api/quiz/reset", { attemptId: prevAttemptId });
    if (!reset.ok) {
      handleApiError(reset.data);
      setBusy(false);
      return;
    }

    await startQuiz(category);
  }

  async function saveGuestName() {
    const name = displayName.trim();
    if (!name) { setToast("Enter a display name first."); return; }

    setSavingName(true);
    const { ok, data } = await postJSON("/api/guest/name", { name });
    setSavingName(false);

    if (!ok) { setToast(data?.message || "Could not save name."); return; }
    setToast("Saved ✅");
  }

  function setChoice(qid: string, choice: Choice) {
    setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, chosen: choice } : q)));
  }

  async function submitQuiz() {
    if (!attemptId) { setToast("Start a quiz first."); return; }
    if (!allAnswered) { setToast("Please answer all questions before submitting."); return; }

    setSubmitting(true);

    const answers = questions.map((q) => ({ questionId: q.id, chosen: q.chosen ?? null }));

    const { ok, data } = await postJSON<SubmitResponse>("/api/quiz/submit", { attemptId, answers });

    setSubmitting(false);

    if (!ok) { handleApiError(data); return; }

    const score = typeof data?.score === "number" ? data.score : 0;
    const total = typeof data?.total === "number" ? data.total : QUESTIONS_PER_QUIZ;
    const shareId = data?.shareId ?? null;

    // The API already returns the canonical results path; only build one ourselves
    // if it is absent. Either way it must be /biblequiz/results/<shareId> — that is
    // what the submit, leaderboard, and share routes all link to.
    const resultsHref = data?.redirectTo ?? (shareId ? `/biblequiz/results/${shareId}` : null);

    if (Array.isArray(data?.review)) setReviewItems(data.review);
    setCompletionScore({ score, total, resultsHref });
    setQuizCompleted(true);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        {/* â"€â"€ Header â"€â"€ */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Bible Quiz</h1>
            <div className="mt-1 text-white/70">Test your Scripture knowledge</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DenominationSelect className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/80 border-0 outline-none" />

            <button
              onClick={restartQuiz}
              disabled={busy}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-60"
              title="Restart resets today's quiz (if allowed)"
            >
              Restart
            </button>
          </div>
        </div>

        {/* â"€â"€ Toast â"€â"€ */}
        {toast && (
          <div className="mb-4 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white">
            {toast}
          </div>
        )}

        {/* â"€â"€ Inline error (non-limit errors) â"€â"€ */}
        {inlineError && (
          <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-4 text-white">
            <div className="font-semibold">âš ï¸ {inlineError}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => setInlineError(null)} className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
                Close
              </button>
            </div>
          </div>
        )}

        {/* â"€â"€ Player info strip â"€â"€ */}
        <div className="mb-4 rounded-2xl bg-white/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {signedIn ? (
              <div className="text-white/80">
                Playing as{" "}
                <span className="font-semibold text-white">{userDisplayName || userEmail || "Member"}</span>
                <span className="ml-2 text-white/40 text-sm">• {answeredCount}/{QUESTIONS_PER_QUIZ} answered</span>
              </div>
            ) : (
              <div className="text-white/80">
                Playing as <span className="font-semibold text-white">Guest</span>
                <span className="ml-2 text-white/50 text-sm">• {answeredCount}/{QUESTIONS_PER_QUIZ} answered</span>
              </div>
            )}

            {!signedIn && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Set your display name"
                  className="w-full sm:w-56 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none"
                />
                <button
                  onClick={saveGuestName}
                  disabled={savingName}
                  className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-60"
                >
                  {savingName ? "Saving…" : "Save name"}
                </button>
                <Link
                  href="/login?redirect=%2Fbiblequiz"
                  className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* â"€â"€ Category grid â"€â"€ */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((c) => {
            const isActive = c.id === category;
            return (
              <button
                key={c.id}
                title={c.hover || c.name}
                disabled={busy}
                onClick={async () => {
                  setCategory(c.id);
                  await startQuiz(c.id);
                }}
                className={classNames(
                  "rounded-2xl border px-5 py-4 text-left transition",
                  "border-white/10 bg-white/5 hover:bg-white/10",
                  isActive && "border-white/30 bg-white/10",
                  busy && "opacity-60"
                )}
              >
                <div className="font-semibold text-white">{c.name}</div>
                {c.hover && <div className="mt-1 text-sm text-white/60">{c.hover}</div>}
              </button>
            );
          })}
        </div>

        {/* â"€â"€ Quiz area â"€â"€ */}
        <div ref={quizAreaRef} className="rounded-2xl bg-white/5 p-5">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-white/80">
              Category: <span className="font-semibold text-white">{activeCategoryName}</span>
            </div>
          </div>

          {busy ? (
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-white/80">
              Loading quiz…
            </div>
          ) : quizCompleted && completionScore ? (
            <div className="space-y-5">
              {/* Score */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
                <div className="text-5xl font-extrabold text-white">
                  {completionScore.score}/{completionScore.total}
                </div>
                <div className="mt-2 text-lg font-semibold text-white/70">
                  {completionScore.score === completionScore.total
                    ? "Perfect score! 🎉"
                    : completionScore.score >= completionScore.total * 0.8
                    ? "Excellent work!"
                    : completionScore.score >= completionScore.total * 0.6
                    ? "Good effort!"
                    : "Keep studying — you've got this!"}
                </div>
                <div className="mt-1 text-sm text-white/50">{activeCategoryName}</div>
              </div>

              {/* Guest warm CTA */}
              {!signedIn && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-white">Great job!</div>
                  <p className="mt-2 text-sm text-white/70">
                    Create a free account to track your progress and avoid repeat questions. It takes 30 seconds — just your email, no password required.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/login?redirect=%2Fbiblequiz"
                      className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
                    >
                      Create Free Account
                    </Link>
                    {completionScore.resultsHref && (
                      <button
                        type="button"
                        onClick={() => {
                          // Same destination as "View Results" below. Capture the href
                          // before touching state so it cannot be nulled out from under us.
                          const resultsHref = completionScore.resultsHref;
                          if (resultsHref) router.push(resultsHref);
                        }}
                        className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                      >
                        Continue as Guest
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {completionScore.resultsHref && (
                  <Link
                    href={completionScore.resultsHref}
                    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
                  >
                    View Results
                  </Link>
                )}
                <button
                  type="button"
                  onClick={async () => { await startQuiz(category); }}
                  disabled={busy}
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60"
                >
                  Play Again
                </button>
              </div>

              {/* See Correct Answers — inline per-question review */}
              {completionScore.score < completionScore.total && (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowInlineReview((v) => !v)}
                    className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    {showInlineReview ? "Hide Answers" : "See Correct Answers"}
                  </button>

                  {showInlineReview && (
                    <div className="mt-5 space-y-3">
                      {reviewItems.length > 0 ? reviewItems.map((item, idx) => (
                        <div
                          key={item.questionId}
                          className={`rounded-2xl border p-4 ${
                            item.isCorrect
                              ? "border-green-500/40 bg-green-900/10"
                              : "border-red-500/40 bg-red-900/10"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-sm font-semibold text-white">
                              {idx + 1}. {item.prompt}
                            </div>
                            <span className={`shrink-0 text-xs font-bold ${item.isCorrect ? "text-green-400" : "text-red-400"}`}>
                              {item.isCorrect ? "Correct" : "Incorrect"}
                            </span>
                          </div>
                          <div className="mt-3 space-y-1 text-sm">
                            <div className="text-white/70">
                              Your answer:{" "}
                              <span className={item.isCorrect ? "text-green-300" : "text-red-300"}>
                                {item.chosen ? `${item.chosen}. ${item.choices[item.chosen]}` : "—"}
                              </span>
                            </div>
                            {!item.isCorrect && (
                              <div className="text-white/70">
                                Correct answer:{" "}
                                <span className="text-green-300">
                                  {item.correctAnswer}. {item.choices[item.correctAnswer]}
                                </span>
                              </div>
                            )}
                            {item.explanation && (
                              <div className="mt-2 rounded-xl bg-white/5 px-3 py-2 text-xs leading-6 text-white/70">
                                <span className="font-semibold text-white/85">Explanation: </span>
                                {item.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      )) : (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                          Review data unavailable for this session.
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}
            </div>
          ) : !attemptId || questions.length === 0 || !currentQuestion ? (
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-white/70">
              Select a category above to start.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Gentle progress note near the end of a quiz */}
              {showSoftPrompt && (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  {questionsLeftInQuiz === 1
                    ? "Last question of this quiz."
                    : `${questionsLeftInQuiz} questions left in this quiz.`}
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm text-white/60">
                  Question {currentIndex + 1} of {questions.length}
                </div>

                <div className="mt-2 font-semibold text-white">{currentQuestion.prompt}</div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {(["A", "B", "C", "D"] as Choice[]).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setChoice(currentQuestion.id, ch)}
                      className={classNames(
                        "rounded-xl border px-4 py-3 text-left transition",
                        "border-white/10 bg-white/5 hover:bg-white/10",
                        currentQuestion.chosen === ch && "border-white/30 bg-white/10"
                      )}
                    >
                      <div className="font-semibold text-white/90">{ch}</div>
                      <div className="text-sm text-white/70">{currentQuestion.choices[ch]}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-white/60">
                  Answered {answeredCount}/{questions.length}
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {currentIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((i) => i + 1)}
                      className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={submitQuiz}
                      disabled={!allAnswered || submitting}
                      className="rounded-md bg-gradient-to-r from-purple-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : "Submit & Share"}
                    </button>
                  )}
                </div>
              </div>

              {!allAnswered && currentIndex === questions.length - 1 && (
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-sm text-yellow-100">
                  Answer all questions to unlock your shareable results page.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}


