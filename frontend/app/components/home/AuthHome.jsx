"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import Navbar from "../Navbar";
import "./AuthHome.css";

export default function AuthHome() {
  const [userProfile, setUserProfile] = useState(null);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Update clock every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.push("/auth/signin");
        return;
      }

      // Fetch user profile
      const { data: profileRow, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (profileError || !profileRow) {
        router.push("/onboarding");
        return;
      }

      setUserProfile(profileRow);

      // Fetch startups
      const { data: startupRows } = await supabase
        .from("startups")
        .select("*")
        .eq("created_by", authData.user.id)
        .order("updated_at", { ascending: false });

      if (startupRows) {
        setStartups(startupRows);
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="home-loading">
        Loading...
      </div>
    );
  }

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(dateString));
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#0c0c0c]"></div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_28%),radial-gradient(circle_at_bottom,rgba(244,63,94,0.10),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_16%,transparent_84%,rgba(255,255,255,0.02))]" />

      <div className="auth-home-content">
        <Navbar />
        
        <div className="auth-home-header">
          <div className="greeting-box">
            <h1>Hello {userProfile?.full_name?.split(" ")[0]}</h1>
          </div>
          <div className="clock-box">
            <p>{formatDateTime(currentTime)}</p>
          </div>
        </div>

        <div className="auth-home-grid">
          {/* Main Area: Startups */}
          <div className="startups-section">
            <h2>Your Startups</h2>
            {startups.length > 0 ? (
              <div className="startups-list">
                {startups.map((startup) => (
                  <div key={startup.id} className="startup-card" onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer' }}>
                    <h3>{startup.name}</h3>
                    <p className="startup-desc">{startup.description}</p>
                    <div className="startup-meta">
                      <span className="team-size">Team: {startup.team_size} members</span>
                      <span className="last-updated">Last opened: {formatDate(startup.updated_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No startups found. Create one to get started!</p>
              </div>
            )}
          </div>

          {/* Right Sidebar: Community Highlights */}
          <div className="community-section">
            <h2>Community Highlights</h2>
            <div className="community-card">
              <div className="highlight-item">
                <span className="highlight-tag new">New</span>
                <p><strong>AlphaTech</strong> just raised $2M seed round</p>
              </div>
              <div className="highlight-item">
                <span className="highlight-tag trending">Trending</span>
                <p>Top AI tools for early-stage founders</p>
              </div>
              <div className="highlight-item">
                <span className="highlight-tag event">Event</span>
                <p>Founder Mix & Mingle - Friday 8PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
