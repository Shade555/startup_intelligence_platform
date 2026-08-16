"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { AnimatedBackground } from "../ui/AnimatedBackground";

interface AuthProps {
  initialMode?: "signin" | "signup";
}

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const GoogleIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function Auth({ initialMode = "signin" }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          setError("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsSignUp(false);
          router.push("/onboarding");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
        } else {
          setEmail("");
          setPassword("");
          router.push("/home");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      setError(err.message || `An error occurred with ${provider} login`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0c0c0c]">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-[420px] px-6"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#0c0c0c] font-black flex items-center justify-center text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] mb-4 tracking-tighter">
            N
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className="text-[#a1a1aa] text-xs mt-1">
            {isSignUp ? "Enter your details to get started" : "Enter your details to sign in"}
          </p>
        </div>

        {/* We override the background color here to be very translucent so the GlassCard blur is highly visible against the animated mesh */}
        <GlassCard className="p-6 sm:p-7 w-full !bg-[rgba(10,10,10,0.4)] !border-[rgba(255,255,255,0.1)] !backdrop-blur-3xl shadow-2xl">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 text-sm font-medium flex items-start gap-2"
              >
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full h-11 px-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.06)] text-white text-sm placeholder:text-[#52525b] focus:outline-none focus:border-[rgba(255,255,255,0.2)] focus:bg-[rgba(255,255,255,0.04)] transition-all shadow-inner"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full h-11 px-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.06)] text-white text-sm placeholder:text-[#52525b] focus:outline-none focus:border-[rgba(255,255,255,0.2)] focus:bg-[rgba(255,255,255,0.04)] transition-all shadow-inner"
              />
            </div>

            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="flex flex-col gap-1.5 overflow-hidden"
                >
                  <label className="text-[10px] font-semibold text-[#a1a1aa] uppercase tracking-wider">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full h-11 px-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.06)] text-white text-sm placeholder:text-[#52525b] focus:outline-none focus:border-[rgba(255,255,255,0.2)] focus:bg-[rgba(255,255,255,0.04)] transition-all shadow-inner"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full h-11 mt-3 mb-1 font-bold tracking-wide text-sm"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center justify-between mt-6 mb-5">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
            <span className="px-3 text-[10px] text-[#71717a] font-bold uppercase tracking-[0.2em]">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.08)]"></div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 h-11 text-sm"
              disabled={loading}
              onClick={() => handleOAuthLogin("google")}
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 h-11 text-sm"
              disabled={loading}
              onClick={() => handleOAuthLogin("github")}
            >
              <GithubIcon />
              GitHub
            </Button>
          </div>
        </GlassCard>

        <p className="mt-6 text-center text-xs text-[#71717a]">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-white font-medium hover:underline focus:outline-none transition-colors"
            disabled={loading}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
