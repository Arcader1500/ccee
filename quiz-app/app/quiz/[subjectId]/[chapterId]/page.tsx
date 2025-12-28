'use client';

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Clock, HelpCircle, Save, XCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { playCorrectSound, playWrongSound } from "@/lib/audio";

type Question = {
    id: string;
    text: string;
    options: { id: string; text: string; feedback?: string }[];
    correctOptionId: string;
    hint: string;
    explanation: string;
};

export default function QuizPage() {
    const router = useRouter();
    const params = useParams();
    const subjectId = params.subjectId as string;
    const chapterId = params.chapterId as string;

    // Data Loading State
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Game State
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    // Fetch Questions
    useEffect(() => {
        async function fetchQuestions() {
            try {
                // Fetch from the public/data directory
                const res = await fetch(`/data/${subjectId}/${chapterId}/questions.json`);
                if (!res.ok) {
                    throw new Error(`Quiz not found for ${subjectId}/${chapterId}`);
                }
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setQuestions(data);
                } else {
                    throw new Error("No questions available in this quiz.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load quiz. Please check if the quiz data exists.");
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [subjectId, chapterId]);

    const currentQuestion = questions[currentQIndex];

    // Timer Effect
    useEffect(() => {
        if (gameFinished || loading || error) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    finishGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [gameFinished, loading, error]);


    // Mobile Detection
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleOptionSelect = (optionId: string) => {
        if (isAnswerChecked) return;
        setSelectedOption(optionId);
        setIsAnswerChecked(true);

        const currentQuestion = questions[currentQIndex];
        if (optionId === currentQuestion.correctOptionId) {
            setScore(s => s + 10);
            playCorrectSound();
        } else {
            playWrongSound();
        }
    };

    const handleNext = () => {
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
            setShowHint(false);
        } else {
            finishGame();
        }
    };

    const finishGame = () => {
        setGameFinished(true);
        if (score > 10) {
            confetti({
                particleCount: isMobile ? 50 : 150,
                spread: isMobile ? 60 : 100,
                disableForReducedMotion: true
            });
        }
    };

    const saveScore = () => {
        const history = JSON.parse(localStorage.getItem('quiz_history') || '[]');
        history.push({
            date: new Date().toISOString(),
            subjectId: subjectId,
            chapterId: chapterId,
            score: score,
            total: questions.length * 10
        });
        localStorage.setItem('quiz_history', JSON.stringify(history));
        alert("Score Saved!");
        router.push('/subjects');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <Card className="text-center p-8 border-red-500/50 bg-red-900/10">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Quiz</h2>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <Link href={`/subjects/${subjectId}`}>
                        <Button variant="outline">Back to Chapters</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (gameFinished) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center space-y-6 py-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-2xl"
                    >
                        <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>

                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
                        <p className="text-slate-400">You scored</p>
                        <div className="text-6xl font-bold text-primary mt-2">
                            {score} <span className="text-2xl text-slate-500">/ {questions.length * 10}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center pt-6">
                        <Link href="/subjects">
                            <Button variant="ghost">Exit</Button>
                        </Link>
                        <Button onClick={saveScore} className="gap-2">
                            <Save className="w-4 h-4" /> Save Score
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 pt-20 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <Link href={`/subjects/${subjectId}`}>
                    <Button variant="ghost" size="sm" className="text-slate-400">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Quit
                    </Button>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full font-mono text-cyan-400 border border-slate-700">
                        <Clock className="w-4 h-4" />
                        {formatTime(timeLeft)}
                    </div>
                    <div className="px-4 py-2 bg-slate-800 rounded-full font-bold text-primary border border-slate-700">
                        Score: {score}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Question Card */}
                    <Card className="mb-6 border-t-4 border-t-primary relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <HelpCircle className="w-32 h-32" />
                        </div>
                        <h2 className="text-lg md:text-3xl font-bold mb-6 relative z-10 leading-snug md:leading-relaxed text-slate-100">
                            {currentQIndex + 1}. {currentQuestion.text}
                        </h2>

                        {/* Hint Section */}
                        <div className="mb-6 relative z-10">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-sm text-yellow-500 flex items-center gap-2 hover:underline focus:outline-none"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {showHint ? "Hide Hint" : "Need a Hint?"}
                            </button>
                            <AnimatePresence>
                                {showHint && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-lg text-sm">
                                            💡 {currentQuestion.hint}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Options Grid */}
                        <div className="space-y-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option) => {
                                const isSelected = selectedOption === option.id;
                                const isCorrect = option.id === currentQuestion.correctOptionId;

                                let variantClass = "hover:bg-slate-700/50 cursor-pointer border-slate-700 bg-slate-800/50";

                                if (isAnswerChecked) {
                                    if (isSelected && isCorrect) variantClass = "bg-green-500/20 border-green-500 text-green-200";
                                    else if (isSelected && !isCorrect) variantClass = "bg-red-500/20 border-red-500 text-red-200";
                                    else if (isCorrect) variantClass = "bg-green-500/10 border-green-500/50 text-green-200 opacity-75"; // Highlight correct answer if wrong
                                    else variantClass = "opacity-50 border-slate-800 bg-slate-900/50"; // Dim others
                                } else if (isSelected) {
                                    variantClass = "bg-primary/20 border-primary text-white ring-1 ring-primary";
                                }

                                return (
                                    <div key={option.id} className="flex flex-col h-full">
                                        <div
                                            onClick={() => handleOptionSelect(option.id)}
                                            className={cn(
                                                "p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group h-full relative overflow-hidden touch-manipulation active:scale-[0.98]",
                                                variantClass,
                                                isAnswerChecked && !isSelected ? "opacity-50 grayscale-[0.5] pointer-events-none" : ""
                                            )}
                                        >
                                            <span className="font-semibold text-lg z-10 relative">{option.text}</span>
                                            {isAnswerChecked && isSelected && (
                                                isCorrect ? <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 ml-2 z-10" /> : <XCircle className="w-6 h-6 text-rose-400 shrink-0 ml-2 z-10" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* General Explanation (Always show after answer to give full context) */}
                    <AnimatePresence>
                        {isAnswerChecked && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-6 rounded-xl border border-slate-700 bg-slate-800/50 mb-6"
                            >
                                <h3 className="font-bold mb-2 flex items-center gap-2 text-primary">
                                    <HelpCircle className="w-4 h-4" /> Explanation
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {currentQuestion.explanation}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex justify-end pt-4">
                        {isAnswerChecked && (
                            <Button
                                onClick={handleNext}
                                className="w-full md:w-auto gap-2"
                            >
                                {currentQIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </Button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div >
    );
}
