'use client';

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SUBJECTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getQuizProgress } from "../quiz/actions";

export default function SubjectsPage() {
    const [hovered, setHovered] = useState<string | null>(null);
    const [progressData, setProgressData] = useState<Record<string, number>>({});

    // Load progress from Supabase on mount
    useEffect(() => {
        async function loadProgress() {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const data = await getQuizProgress();
                if (data) {
                    setProgressData(data);
                }
            } catch (error) {
                console.error("Failed to load progress:", error);
            }
        }
        loadProgress();
    }, []);

    return (
        <div className="min-h-screen p-8 pt-20 max-w-7xl mx-auto">
            <header className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text mb-4">
                        Choose a Subject
                    </h1>
                    <p className="text-slate-400">Select a course to view available chapters and quizzes.</p>
                </div>
                <Link href="/account">
                    <Button variant="outline" className="gap-2">
                        <User className="w-4 h-4" /> My Account
                    </Button>
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SUBJECTS.map((subject, index) => {
                    const completed = progressData[subject.id] || 0;
                    const totalChapters = subject.chapters.length;
                    const percent = Math.round((completed / totalChapters) * 100) || 0;

                    return (
                        <Link href={`/subjects/${subject.id}`} key={subject.id}>
                            <Card
                                variant="interactive"
                                className="h-full flex flex-col justify-between group relative overflow-hidden"
                                onMouseEnter={() => setHovered(subject.id)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {/* Background Gradient on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="text-4xl">{subject.icon}</span>
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-primary transition-colors">
                                        {subject.name}
                                    </h2>
                                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                        {subject.description}
                                    </p>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">
                                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {totalChapters} Chapters</span>
                                        <span className={percent === 100 ? "text-green-400" : "text-slate-400"}>{percent}% Complete</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={cn("h-full rounded-full", percent === 100 ? "bg-green-500" : "bg-primary")}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        {completed} / {totalChapters} completed
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
