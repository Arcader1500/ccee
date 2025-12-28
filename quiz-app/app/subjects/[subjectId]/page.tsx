'use client';

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SUBJECTS } from "@/lib/data";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SubjectDetailsPage() {
    const params = useParams();
    const subjectId = params.subjectId as string;

    const subject = SUBJECTS.find(s => s.id === subjectId);

    if (!subject) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-900 text-white">
                <h2 className="text-2xl font-bold mb-4">Subject Not Found</h2>
                <Link href="/subjects">
                    <Button variant="outline">Back to Subjects</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 pt-20 max-w-5xl mx-auto">
            <Link href="/subjects">
                <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent text-slate-400 hover:text-white">
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back to Subjects
                </Button>
            </Link>

            <div className="flex items-center gap-6 mb-12">
                <div className="text-6xl">{subject.icon}</div>
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{subject.name}</h1>
                    <p className="text-slate-400">{subject.description}</p>
                </div>
            </div>

            <div className="space-y-4">
                {subject.chapters.map((chapter, index) => (
                    <Card key={chapter.id} variant="glass" className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-slate-200">{chapter.title}</h3>
                                <p className="text-sm text-slate-500">{chapter.topicCount} Topics to cover</p>
                            </div>
                        </div>

                        <Link href={`/quiz/${subject.id}/${chapter.id}`}>
                            <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                Start Quiz
                                <Play className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}
