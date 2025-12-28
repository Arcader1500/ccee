import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/utils/supabase/server";
import { LogOut, Trash2, User } from "lucide-react";
import { redirect } from "next/navigation";
import { deleteProgress, signOut } from "../auth/actions";

export default async function AccountPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // Fetch quiz stats
    const { count: completedQuizzes } = await supabase
        .from('quiz_results')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

    return (
        <div className="min-h-screen p-8 pt-20 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-8">
                My Account
            </h1>

            <div className="space-y-6">
                <Card className="p-6 border-slate-700 bg-slate-800/50">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                            <User className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-100">
                                {profile?.full_name || 'User'}
                            </h2>
                            <p className="text-slate-400">{user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                            <div className="text-2xl font-bold text-primary mb-1">
                                {completedQuizzes || 0}
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">
                                Quizzes Taken
                            </div>
                        </div>
                    </div>

                    <form action={signOut}>
                        <Button variant="outline" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </form>
                </Card>

                <Card className="p-6 border-red-900/30 bg-red-950/10">
                    <h3 className="text-lg font-bold text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-slate-400 text-sm mb-6">
                        This action cannot be undone. All your quiz history and scores will be permanently deleted.
                    </p>

                    <form action={deleteProgress}>
                        <Button variant="destructive" className="w-full">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete All Progress
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
