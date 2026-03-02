"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import { MOCK_VIDEOS, MOCK_USERS, formatNumber } from "@/lib/data";
import { toggleFollow, getState } from "@/lib/store";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const user = MOCK_USERS.find((u) => u.id === userId) || MOCK_USERS[1];
  const userVideos = MOCK_VIDEOS.filter((v) => v.userId === user.id);
  const allVideos = MOCK_VIDEOS.slice(0, 4);

  const [isFollowing, setIsFollowing] = useState(() => {
    const state = getState();
    return state.followingUsers.includes(user.id);
  });
  const [followerCount, setFollowerCount] = useState(user.followers);
  const [activeTab, setActiveTab] = useState<"videos" | "liked">("videos");

  const handleFollow = () => {
    const nowFollowing = toggleFollow(user.id);
    setIsFollowing(nowFollowing);
    setFollowerCount((prev) => (nowFollowing ? prev + 1 : prev - 1));
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: "#000" }}>
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(0,0,0,0.9)",
          borderBottom: "1px solid #1A1A1A",
          backdropFilter: "blur(10px)",
        }}
      >
        <button onClick={() => router.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">@{user.username}</span>
          {user.isVerified && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <div className="pt-16">
        {/* Profile header */}
        <div className="px-4 py-6 text-center">
          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-full overflow-hidden"
              style={{
                border: "3px solid #D4AF37",
                boxShadow: "0 0 30px rgba(212,175,55,0.4)",
              }}
            >
              <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
            </div>
            {user.isLive && (
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-black live-badge"
                style={{ background: "#FF0000", color: "#fff" }}
              >
                LIVE
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-xl font-black text-white">{user.displayName}</h1>
            {user.isVerified && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <p className="text-sm mb-2" style={{ color: "#888" }}>@{user.username}</p>
          <p className="text-sm px-8 mb-4" style={{ color: "#AAA" }}>{user.bio}</p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-5">
            {[
              { label: "Following", value: formatNumber(user.following) },
              { label: "Followers", value: formatNumber(followerCount) },
              { label: "Likes", value: formatNumber(user.likes) },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-xs" style={{ color: "#666" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleFollow}
              className="flex-1 max-w-40 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: isFollowing ? "transparent" : "linear-gradient(135deg, #D4AF37, #B8860B)",
                color: isFollowing ? "#D4AF37" : "#000",
                border: isFollowing ? "1px solid #D4AF37" : "none",
              }}
            >
              {isFollowing ? "Following ✓" : "Follow"}
            </button>
            <button
              className="flex-1 max-w-40 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: "#111", color: "#888", border: "1px solid #2A2A2A" }}
            >
              Message
            </button>
            {user.isLive && (
              <Link href="/live">
                <button
                  className="py-2.5 px-4 rounded-xl text-sm font-bold"
                  style={{ background: "#FF0000", color: "#fff" }}
                >
                  🔴 Watch
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "#1A1A1A" }}>
          {(["videos", "liked"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-sm font-semibold capitalize transition-all"
              style={{
                color: activeTab === tab ? "#D4AF37" : "#555",
                borderBottom: activeTab === tab ? "2px solid #D4AF37" : "2px solid transparent",
              }}
            >
              {tab === "videos" ? "📹 Videos" : "❤️ Liked"}
            </button>
          ))}
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-3 gap-0.5 mt-0.5">
          {(activeTab === "videos" ? (userVideos.length > 0 ? userVideos : allVideos) : allVideos.slice(0, 3)).map((video) => (
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
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
