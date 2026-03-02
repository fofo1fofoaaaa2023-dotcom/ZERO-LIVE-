"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import { MOCK_VIDEOS, MOCK_USERS, formatNumber } from "@/lib/data";
import { getState, logout } from "@/lib/store";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!getState().currentUser?.isLoggedIn;
  });
  const [activeTab, setActiveTab] = useState<"videos" | "liked" | "saved">("videos");
  const [showSettings, setShowSettings] = useState(false);

  // Use first mock user as "current user" for demo
  const currentUser = MOCK_USERS[0];
  const userVideos = MOCK_VIDEOS.filter((v) => v.userId === currentUser.id);
  const likedVideos = MOCK_VIDEOS.slice(0, 3);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const stats = [
    { label: "Following", value: formatNumber(currentUser.following) },
    { label: "Followers", value: formatNumber(currentUser.followers) },
    { label: "Likes", value: formatNumber(currentUser.likes) },
  ];

  return (
    <div className="min-h-screen pb-20" style={{ background: "#000" }}>
      <TopBar showLogo={false} title="Profile" />

      {/* Settings button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed top-3 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      </button>

      {/* Settings dropdown */}
      {showSettings && (
        <>
          <div
            className="fixed top-14 right-4 z-50 rounded-2xl overflow-hidden w-52"
            style={{ background: "#111", border: "1px solid #2A2A2A", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}
          >
            {[
              { icon: "✏️", label: "Edit Profile", action: () => {} },
              { icon: "🔔", label: "Notifications", action: () => {} },
              { icon: "🔒", label: "Privacy", action: () => {} },
              { icon: "💎", label: "ZERO Premium", action: () => {} },
              { icon: "🌍", label: "Language", action: () => {} },
              { icon: "🚪", label: "Sign Out", action: handleLogout, danger: true },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setShowSettings(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5"
                style={{
                  color: (item as { danger?: boolean }).danger ? "#FF4444" : "#CCC",
                  borderBottom: "1px solid #1A1A1A",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
        </>
      )}

      <div className="pt-16">
        {/* Profile header */}
        <div className="px-4 py-6 text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-full overflow-hidden"
              style={{ border: "3px solid #D4AF37", boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>

          {/* Name */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-xl font-black text-white">{currentUser.displayName}</h1>
            {currentUser.isVerified && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-sm mb-2" style={{ color: "#888" }}>@{currentUser.username}</p>
          <p className="text-sm px-8 mb-4" style={{ color: "#AAA" }}>{currentUser.bio}</p>

          {/* Country badge */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "#1A1A1A", color: "#D4AF37", border: "1px solid #2A2A2A" }}
            >
              🇦🇪 {currentUser.country}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "#1A1A1A", color: "#D4AF37", border: "1px solid #2A2A2A" }}
            >
              👑 Creator
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-5">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-xs" style={{ color: "#666" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <button
              className="flex-1 max-w-36 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                color: "#000",
              }}
            >
              Edit Profile
            </button>
            <button
              className="flex-1 max-w-36 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "#111",
                color: "#D4AF37",
                border: "1px solid #D4AF37",
              }}
            >
              Share Profile
            </button>
            <Link href="/live">
              <button
                className="py-2.5 px-4 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: "#FF0000",
                  color: "#fff",
                }}
              >
                🔴 Go Live
              </button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex border-b"
          style={{ borderColor: "#1A1A1A" }}
        >
          {(["videos", "liked", "saved"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-sm font-semibold capitalize transition-all"
              style={{
                color: activeTab === tab ? "#D4AF37" : "#555",
                borderBottom: activeTab === tab ? "2px solid #D4AF37" : "2px solid transparent",
              }}
            >
              {tab === "videos" && "📹 "}
              {tab === "liked" && "❤️ "}
              {tab === "saved" && "🔖 "}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {(activeTab === "videos" ? userVideos : likedVideos).map((video) => (
            <Link key={video.id} href="/" className="relative" style={{ aspectRatio: "9/16" }}>
              <img
                src={video.thumbnail}
                alt={video.caption}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="text-white text-xs font-medium">{formatNumber(video.views)}</span>
              </div>
            </Link>
          ))}

          {/* Empty state */}
          {activeTab === "videos" && userVideos.length === 0 && (
            <div className="col-span-3 py-16 text-center">
              <div className="text-4xl mb-3">🎬</div>
              <p className="text-white font-semibold mb-1">No videos yet</p>
              <p className="text-sm mb-4" style={{ color: "#555" }}>Share your first video!</p>
              <Link
                href="/upload"
                className="inline-block px-6 py-2 rounded-full text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#000" }}
              >
                Upload Video
              </Link>
            </div>
          )}
        </div>

        {/* Not logged in CTA */}
        {!isLoggedIn && (
          <div
            className="mx-4 mt-6 p-5 rounded-2xl text-center"
            style={{ background: "#0A0A0A", border: "1px solid #2A2A2A" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
            >
              <span className="text-xl font-black text-black">Z</span>
            </div>
            <h3 className="text-white font-bold mb-1">Join ZERO LIVE</h3>
            <p className="text-sm mb-4" style={{ color: "#666" }}>
              Sign in to follow creators, like videos, and go live
            </p>
            <Link
              href="/auth"
              className="inline-block px-8 py-2.5 rounded-full text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#000" }}
            >
              Sign In / Register
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
