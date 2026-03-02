"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import { MOCK_VIDEOS, MOCK_USERS, MOCK_LIVE_STREAMS, formatNumber } from "@/lib/data";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "trending", label: "Trending", emoji: "🔥" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "fashion", label: "Fashion", emoji: "👗" },
  { id: "food", label: "Food", emoji: "🍽️" },
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "beauty", label: "Beauty", emoji: "💄" },
  { id: "tech", label: "Tech", emoji: "💻" },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"videos" | "creators" | "live">("videos");

  const filteredVideos = MOCK_VIDEOS.filter((v) => {
    if (searchQuery) {
      return (
        v.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (activeCategory === "all" || activeCategory === "trending") return true;
    return v.tags.includes(activeCategory);
  });

  return (
    <div className="min-h-screen pb-20" style={{ background: "#000" }}>
      <TopBar showLogo title="Explore" />

      <div className="pt-16 px-4">
        {/* Search bar */}
        <div className="relative mb-4">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: "#111", border: "1px solid #2A2A2A" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos, creators, tags..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-600"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeCategory === cat.id ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "#111",
                color: activeCategory === cat.id ? "#000" : "#888",
                border: activeCategory === cat.id ? "none" : "1px solid #2A2A2A",
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Tab switcher */}
        <div
          className="flex rounded-xl p-1 mb-5"
          style={{ background: "#111" }}
        >
          {(["videos", "creators", "live"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "transparent",
                color: activeTab === tab ? "#000" : "#666",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Videos grid */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-2 gap-2">
            {filteredVideos.map((video, i) => (
              <Link key={video.id} href="/" className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "9/16" }}>
                <img
                  src={video.thumbnail}
                  alt={video.caption}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)" }}
                />
                {/* Trending badge */}
                {i < 2 && (
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#000" }}
                  >
                    🔥 Hot
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">{video.caption}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={video.user.avatar} alt="" className="w-4 h-4 rounded-full" />
                    <span className="text-xs" style={{ color: "#D4AF37" }}>@{video.user.username}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#D4AF37">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    <span className="text-xs text-white">{formatNumber(video.likes)}</span>
                    <span className="text-xs" style={{ color: "#555" }}>•</span>
                    <span className="text-xs" style={{ color: "#888" }}>{formatNumber(video.views)} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Creators */}
        {activeTab === "creators" && (
          <div className="space-y-3">
            {MOCK_USERS.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:opacity-80"
                style={{ background: "#111", border: "1px solid #1A1A1A" }}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-14 h-14 rounded-full"
                    style={{ border: "2px solid #D4AF37" }}
                  />
                  {user.isLive && (
                    <span
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-bold live-badge"
                      style={{ background: "#FF0000", color: "#fff", fontSize: "9px" }}
                    >
                      LIVE
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white">{user.displayName}</span>
                    {user.isVerified && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#888" }}>@{user.username}</p>
                  <p className="text-xs mt-1" style={{ color: "#666" }}>{user.bio}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-white font-semibold">{formatNumber(user.followers)}</span>
                    <span className="text-xs" style={{ color: "#555" }}>followers</span>
                    <span className="text-xs" style={{ color: "#555" }}>•</span>
                    <span className="text-xs text-white font-semibold">{formatNumber(user.likes)}</span>
                    <span className="text-xs" style={{ color: "#555" }}>likes</span>
                  </div>
                </div>
                <button
                  className="px-4 py-2 rounded-full text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                    color: "#000",
                  }}
                >
                  Follow
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* Live streams */}
        {activeTab === "live" && (
          <div className="space-y-3">
            {MOCK_LIVE_STREAMS.map((stream) => (
              <Link
                key={stream.id}
                href="/live"
                className="relative rounded-2xl overflow-hidden block"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%)" }}
                />
                <div
                  className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold live-badge"
                  style={{ background: "#FF0000", color: "#fff" }}
                >
                  🔴 LIVE
                </div>
                <div
                  className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                  style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  {formatNumber(stream.viewers)}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={stream.user.avatar} alt="" className="w-8 h-8 rounded-full border-2" style={{ borderColor: "#D4AF37" }} />
                    <div>
                      <p className="text-white text-sm font-bold">{stream.user.displayName}</p>
                      <p className="text-xs" style={{ color: "#D4AF37" }}>@{stream.user.username}</p>
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium">{stream.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs" style={{ color: "#D4AF37" }}>
                      👑 {formatNumber(stream.gifts)} gifts
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Empty state */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "#111", border: "1px dashed #2A2A2A" }}
            >
              <div className="text-4xl mb-3">📡</div>
              <p className="text-white font-semibold mb-1">More streams coming soon</p>
              <p className="text-sm" style={{ color: "#555" }}>Be the first to go live!</p>
              <Link
                href="/live"
                className="inline-block mt-4 px-6 py-2 rounded-full text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#000" }}
              >
                Go Live Now
              </Link>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
