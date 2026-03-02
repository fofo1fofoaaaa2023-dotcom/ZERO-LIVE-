"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BottomNav from "@/components/layout/BottomNav";
import { MOCK_LIVE_STREAMS, GIFTS, MOCK_COMMENTS, formatNumber } from "@/lib/data";

interface FloatingGift {
  id: string;
  emoji: string;
  x: number;
  color: string;
}

interface LiveComment {
  id: string;
  username: string;
  text: string;
  color: string;
  isGift?: boolean;
  giftName?: string;
}

const COMMENT_COLORS = ["#D4AF37", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];

export default function LivePage() {
  const [activeStream, setActiveStream] = useState(MOCK_LIVE_STREAMS[0]);
  const [showGifts, setShowGifts] = useState(false);
  const [floatingGifts, setFloatingGifts] = useState<FloatingGift[]>([]);
  const [liveComments, setLiveComments] = useState<LiveComment[]>([
    { id: "1", username: "luxe_vida", text: "🔥 This is amazing!", color: "#D4AF37" },
    { id: "2", username: "tokyo_style", text: "Love the vibes ✨", color: "#4ECDC4" },
    { id: "3", username: "afro_queen", text: "Sending love from Nigeria 🇳🇬", color: "#FF6B6B" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [viewers, setViewers] = useState(activeStream.viewers);
  const [coins, setCoins] = useState(5000);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showStreamList, setShowStreamList] = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);

  // Simulate live comments
  useEffect(() => {
    const messages = [
      "This is incredible! 🔥",
      "Best stream ever! 👑",
      "Sending gifts! 💎",
      "Love from Paris 🇫🇷",
      "You're amazing! ✨",
      "Keep going! 💪",
      "First time here, love it!",
      "The quality is unreal 🎯",
    ];
    const usernames = ["user_123", "gold_fan", "zero_lover", "luxury_life", "vip_member"];

    const interval = setInterval(() => {
      const comment: LiveComment = {
        id: Date.now().toString(),
        username: usernames[Math.floor(Math.random() * usernames.length)],
        text: messages[Math.floor(Math.random() * messages.length)],
        color: COMMENT_COLORS[Math.floor(Math.random() * COMMENT_COLORS.length)],
      };
      setLiveComments((prev) => [...prev.slice(-20), comment]);
      setViewers((prev) => prev + Math.floor(Math.random() * 10 - 3));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto scroll comments
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [liveComments]);

  const giftCounterRef = useRef(0);

  const sendGift = (gift: typeof GIFTS[0]) => {
    if (coins < gift.coins) {
      alert("Not enough coins! Top up to send gifts.");
      return;
    }
    setCoins((prev) => prev - gift.coins);

    giftCounterRef.current += 1;
    const giftId = `gift_${giftCounterRef.current}`;
    const giftX = 20 + (giftCounterRef.current * 17) % 60;

    // Add floating gift
    const floating: FloatingGift = {
      id: giftId,
      emoji: gift.emoji,
      x: giftX,
      color: gift.color,
    };
    setFloatingGifts((prev) => [...prev, floating]);
    setTimeout(() => {
      setFloatingGifts((prev) => prev.filter((g) => g.id !== floating.id));
    }, 2000);

    // Add gift comment
    const giftComment: LiveComment = {
      id: `${giftId}_comment`,
      username: "You",
      text: `sent a ${gift.name} ${gift.emoji}`,
      color: gift.color,
      isGift: true,
      giftName: gift.name,
    };
    setLiveComments((prev) => [...prev.slice(-20), giftComment]);
    setShowGifts(false);
  };

  const commentCounterRef = useRef(0);

  const sendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    commentCounterRef.current += 1;
    const comment: LiveComment = {
      id: `comment_${commentCounterRef.current}`,
      username: "You",
      text: newComment,
      color: "#D4AF37",
    };
    setLiveComments((prev) => [...prev.slice(-20), comment]);
    setNewComment("");
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background - simulated live stream */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #0A0A0A 0%, #1A0A00 50%, #0A0A0A 100%)`,
        }}
      >
        <img
          src={activeStream.thumbnail}
          alt="live"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Simulated video noise/grain */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      {/* Floating gifts */}
      {floatingGifts.map((gift) => (
        <div
          key={gift.id}
          className="absolute bottom-32 gift-animation pointer-events-none z-30 text-4xl"
          style={{ left: `${gift.x}%`, color: gift.color }}
        >
          {gift.emoji}
        </div>
      ))}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          {/* Stream selector */}
          <button
            onClick={() => setShowStreamList(!showStreamList)}
            className="flex items-center gap-2"
          >
            <img
              src={activeStream.user.avatar}
              alt={activeStream.user.displayName}
              className="w-10 h-10 rounded-full border-2"
              style={{ borderColor: "#D4AF37" }}
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm">{activeStream.user.displayName}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <p className="text-xs" style={{ color: "#D4AF37" }}>{activeStream.title}</p>
            </div>
          </button>

          {/* Follow button */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: isFollowing ? "transparent" : "linear-gradient(135deg, #D4AF37, #B8860B)",
              color: isFollowing ? "#D4AF37" : "#000",
              border: isFollowing ? "1px solid #D4AF37" : "none",
            }}
          >
            {isFollowing ? "Following" : "+ Follow"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewer count */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            <span className="text-white text-xs font-semibold">{formatNumber(viewers)}</span>
          </div>

          {/* LIVE badge */}
          <div
            className="px-3 py-1.5 rounded-full text-xs font-black live-badge"
            style={{ background: "#FF0000", color: "#fff" }}
          >
            🔴 LIVE
          </div>

          {/* Close */}
          <Link href="/">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.6)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Stream list dropdown */}
      {showStreamList && (
        <div
          className="absolute top-24 left-4 z-30 rounded-2xl overflow-hidden w-72"
          style={{ background: "#111", border: "1px solid #2A2A2A" }}
        >
          <div className="px-4 py-3" style={{ borderBottom: "1px solid #2A2A2A" }}>
            <h3 className="text-white font-bold text-sm">Live Now</h3>
          </div>
          {MOCK_LIVE_STREAMS.map((stream) => (
            <button
              key={stream.id}
              onClick={() => { setActiveStream(stream); setShowStreamList(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all"
            >
              <img src={stream.user.avatar} alt="" className="w-10 h-10 rounded-full border-2" style={{ borderColor: "#D4AF37" }} />
              <div className="flex-1 text-left">
                <p className="text-white text-sm font-semibold">{stream.user.displayName}</p>
                <p className="text-xs" style={{ color: "#888" }}>{stream.title}</p>
                <p className="text-xs" style={{ color: "#D4AF37" }}>{formatNumber(stream.viewers)} watching</p>
              </div>
              {activeStream.id === stream.id && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Gift stats bar */}
      <div
        className="absolute top-24 right-4 z-20 flex flex-col items-end gap-2"
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          <span className="text-sm">👑</span>
          <span className="text-xs font-bold" style={{ color: "#D4AF37" }}>
            {formatNumber(activeStream.gifts)} gifts
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span className="text-sm">🪙</span>
          <span className="text-xs font-bold text-white">{formatNumber(coins)} coins</span>
        </div>
      </div>

      {/* Comments section */}
      <div
        ref={commentsRef}
        className="absolute bottom-32 left-0 right-0 px-4 overflow-y-auto"
        style={{ maxHeight: "35vh", scrollbarWidth: "none" }}
      >
        {liveComments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-2 mb-2">
            {comment.isGift ? (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: `${comment.color}22`,
                  border: `1px solid ${comment.color}44`,
                }}
              >
                <span className="text-xs font-bold" style={{ color: comment.color }}>
                  @{comment.username}
                </span>
                <span className="text-xs text-white">{comment.text}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: comment.color }}>
                  @{comment.username}
                </span>
                <span className="text-xs text-white">{comment.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-6">
        {/* Gift panel */}
        {showGifts && (
          <div
            className="rounded-2xl p-4 mb-3"
            style={{ background: "#111", border: "1px solid #2A2A2A" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-sm">Send a Gift</h3>
              <div className="flex items-center gap-1">
                <span className="text-sm">🪙</span>
                <span className="text-sm font-bold" style={{ color: "#D4AF37" }}>{formatNumber(coins)}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {GIFTS.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => sendGift(gift)}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all hover:opacity-80"
                  style={{
                    background: "#1A1A1A",
                    border: `1px solid ${gift.color}33`,
                    opacity: coins < gift.coins ? 0.4 : 1,
                  }}
                >
                  <span className="text-2xl">{gift.emoji}</span>
                  <span className="text-xs text-white font-medium">{gift.name}</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs" style={{ color: "#D4AF37" }}>🪙</span>
                    <span className="text-xs" style={{ color: "#D4AF37" }}>{gift.coins}</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              className="w-full mt-3 py-2 rounded-xl text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#000" }}
            >
              Top Up Coins 🪙
            </button>
          </div>
        )}

        {/* Comment input */}
        <form onSubmit={sendComment} className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-full"
            style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Say something..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-600"
            />
          </div>

          {/* Gift button */}
          <button
            type="button"
            onClick={() => setShowGifts(!showGifts)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{
              background: showGifts ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "rgba(0,0,0,0.7)",
              border: showGifts ? "none" : "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <span className="text-xl">🎁</span>
          </button>

          {/* Share */}
          <button
            type="button"
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

          {/* Send */}
          {newComment && (
            <button
              type="submit"
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          )}
        </form>
      </div>

      {/* Backdrop for stream list */}
      {showStreamList && (
        <div className="absolute inset-0 z-20" onClick={() => setShowStreamList(false)} />
      )}
    </div>
  );
}
