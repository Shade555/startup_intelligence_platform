"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <img src="/vercel.svg" alt="Logo" className="navbar-logo-img" />
        </Link>
        <div className="navbar-spacer"></div>
        <div className="navbar-buttons">
          {user ? (
            <button onClick={handleLogout} className="navbar-btn signin-btn">
              Log Out
            </button>
          ) : (
            <>
              <Link href="/auth/signin" className="navbar-btn signin-btn">
                Sign In
              </Link>
              <Link href="/auth/signup" className="navbar-btn signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
