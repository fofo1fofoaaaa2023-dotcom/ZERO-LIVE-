"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import VideoCard from "@/components/video/VideoCard";
import { MOCK_VIDEOS, getRecommendedVideos } from "@/lib/data";
import { getState } from "@/lib/store";
import Link from "next/link";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");
  const containerRef = useRef<HTMLDivElement>(null);

  const videos = useMemo(() => {
    const state = typeof window !== "undefined" ? getState() : null;
    return state ? getRecommendedVideos(state.selectedCountry) : MOCK_VIDEOS;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollTop / height);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* Top bar */}
      <TopBar showCountrySelector />

      {/* Tab switcher */}
      <div
        className="absolute top-14 left-0 right-0 z-40 flex items-center justify-center gap-6 py-2"
        style={{ background: "transparent" }}
      >
        <button
          onClick={() => setActiveTab("for-you")}
          className="text-sm font-semibold pb-1 transition-all"
          style={{
            color: activeTab === "for-you" ? "#fff" : "#666",
            borderBottom: activeTab === "for-you" ? "2px solid #D4AF37" : "2px solid transparent",
          }}
        >
          For You
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className="text-sm font-semibold pb-1 transition-all"
          style={{
            color: activeTab === "following" ? "#fff" : "#666",
            borderBottom: activeTab === "following" ? "2px solid #D4AF37" : "2px solid transparent",
          }}
        >
          Following
        </button>
      </div>

      {/* Video feed */}
      <div
        ref={containerRef}
        className="snap-container w-full h-full"
        style={{ paddingBottom: 0 }}
      >
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={index === activeIndex}
          />
        ))}

        {/* Load more indicator */}
        <div
          className="snap-item flex items-center justify-center"
          style={{ height: "100vh", background: "#000" }}
        >
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
              </svg>
            </div>
            <p className="text-white font-semibold mb-1">You&apos;re all caught up!</p>
            <p className="text-sm" style={{ color: "#666" }}>Check back later for more content</p>
          </div>
        </div>
      </div>

      {/* Live streams banner */}
      <div
        className="absolute top-28 left-0 right-0 z-30 px-4 pointer-events-none"
        style={{ display: activeIndex === 0 ? "block" : "none" }}
      >
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {[
            { name: "Zero Beats", viewers: "45.6K", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=beats&backgroundColor=ffd5dc" },
            { name: "Gold Fitness", viewers: "12.3K", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fitness&backgroundColor=b6e3f4" },
          ].map((stream) => (
            <Link
              key={stream.name}
              href="/live"
              className="flex-shrink-0 pointer-events-auto"
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="relative">
                  <img src={stream.avatar} alt={stream.name} className="w-7 h-7 rounded-full" />
                  <span
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full live-badge"
                    style={{ background: "#FF0000", border: "1px solid #000" }}
                  />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-none">{stream.name}</p>
                  <p className="text-xs" style={{ color: "#D4AF37" }}>{stream.viewers} watching</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav />
    </main>
  );
}
