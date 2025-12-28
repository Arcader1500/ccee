'use client';

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import { AlertCircle, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { login, signup } from "../auth/actions";

import { Suspense } from "react";

function LoginForm() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            if (isLogin) {
                await login(formData);
            } else {
                await signup(formData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card className="p-8 border-slate-700 bg-slate-800/50 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-slate-400">
                            {isLogin ? 'Enter your credentials to continue' : 'Join us to start your learning journey'}
                        </p>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-200 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {message}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                    <Input
                                        name="full_name"
                                        placeholder="John Doe"
                                        className="pl-10 bg-slate-900/50 border-slate-700"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="hello@example.com"
                                    className="pl-10 bg-slate-900/50 border-slate-700"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 bg-slate-900/50 border-slate-700"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary hover:underline font-medium"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
