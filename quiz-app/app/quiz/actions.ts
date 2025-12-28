'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveQuizScore(
    subjectId: string,
    chapterId: string,
    score: number,
    totalScore: number
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { error } = await supabase
        .from('quiz_results')
        .insert({
            user_id: user.id,
            subject_id: subjectId,
            chapter_id: chapterId,
            score: score,
            total_score: totalScore
        });

    if (error) {
        console.error("Error saving score:", error);
        throw new Error("Failed to save score");
    }

    revalidatePath('/subjects');
}

export async function getQuizProgress() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return {};

    const { data, error } = await supabase
        .from('quiz_results')
        .select('subject_id, chapter_id, score, total_score')
        .eq('user_id', user.id);

    if (error || !data) return {};

    // Organize by subject
    // Record<subjectId, { completed: number, totalScore: number }>
    // This is a naive implementation; you might want robust aggregation via SQL or here.
    const progress: Record<string, { completedChapters: Set<string>, totalScore: number }> = {};

    data.forEach(row => {
        if (!progress[row.subject_id]) {
            progress[row.subject_id] = { completedChapters: new Set(), totalScore: 0 };
        }
        progress[row.subject_id].completedChapters.add(row.chapter_id);
    });

    // Convert Set to count for easier consumption
    const result: Record<string, number> = {};
    Object.keys(progress).forEach(sub => {
        result[sub] = progress[sub].completedChapters.size;
    });

    return result;
}
