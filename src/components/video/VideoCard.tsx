"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Video, formatNumber } from "@/lib/data";
import { toggleLike, toggleFollow, getState } from "@/lib/store";
import CommentsPanel from "./CommentsPanel";

interface VideoCardProps {
  video: Video;
  isActive: boolean;
}

export default function VideoCard({ video, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window === "undefined") return false;
    return getState().likedVideos.includes(video.id);
  });
  const [isFollowing, setIsFollowing] = useState(() => {
    if (typeof window === "undefined") return false;
    return getState().followingUsers.includes(video.userId);
  });
  const [likeCount, setLikeCount] = useState(video.likes);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isActive) {
      vid.play().then(() => {
        isPlayingRef.current = true;
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0;
      isPlayingRef.current = false;
      setIsPlaying(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const doubleTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVideoClick = () => {
    if (doubleTapTimerRef.current) {
      // Second tap within timeout = double tap
      clearTimeout(doubleTapTimerRef.current);
      doubleTapTimerRef.current = null;
      handleLike();
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    } else {
      // First tap - wait to see if double tap
      doubleTapTimerRef.current = setTimeout(() => {
        doubleTapTimerRef.current = null;
        // Single tap = pause/play
        const vid = videoRef.current;
        if (!vid) return;
        if (vid.paused) {
          vid.play();
          setIsPlaying(true);
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      }, 300);
    }
  };

  const handleLike = () => {
    const nowLiked = toggleLike(video.id);
    setIsLiked(nowLiked);
    setLikeCount((prev) => (nowLiked ? prev + 1 : prev - 1));
  };

  const handleFollow = () => {
    const nowFollowing = toggleFollow(video.userId);
    setIsFollowing(nowFollowing);
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || !vid.duration) return;
    setProgress((vid.currentTime / vid.duration) * 100);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: video.caption,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="snap-item relative w-full h-screen bg-black overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.url}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoClick}
        poster={video.thumbnail}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Double tap heart */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="animate-float-up text-8xl">❤️</div>
        </div>
      )}

      {/* Pause indicator */}
      {!isPlaying && isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)", border: "2px solid rgba(255,255,255,0.3)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ background: "rgba(255,255,255,0.2)" }}>
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, background: "#D4AF37" }}
        />
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-16 left-0 right-16 px-4 z-10 pointer-events-none">
        {/* User info */}
        <div className="flex items-center gap-3 mb-3">
          <Link href={`/profile/${video.userId}`} className="pointer-events-auto">
            <img
              src={video.user.avatar}
              alt={video.user.displayName}
              className="w-10 h-10 rounded-full border-2"
              style={{ borderColor: "#D4AF37" }}
            />
          </Link>
          <div>
            <div className="flex items-center gap-1">
              <Link href={`/profile/${video.userId}`} className="pointer-events-auto">
                <span className="font-bold text-white text-sm">@{video.user.username}</span>
              </Link>
              {video.user.isVerified && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <span className="text-xs" style={{ color: "#A0A0A0" }}>
              {video.user.country}
            </span>
          </div>
          {!isFollowing && (
            <button
              onClick={handleFollow}
              className="pointer-events-auto px-3 py-1 rounded-full text-xs font-bold transition-all"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                color: "#000",
              }}
            >
              Follow
            </button>
          )}
          {isFollowing && (
            <button
              onClick={handleFollow}
              className="pointer-events-auto px-3 py-1 rounded-full text-xs font-bold transition-all"
              style={{
                background: "transparent",
                border: "1px solid #D4AF37",
                color: "#D4AF37",
              }}
            >
              Following
            </button>
          )}
        </div>

        {/* Caption */}
        <p className="text-white text-sm leading-relaxed mb-2 pointer-events-auto" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
          {video.caption}
        </p>

        {/* Music */}
        {video.music && (
          <div className="flex items-center gap-2 pointer-events-auto">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span className="text-xs" style={{ color: "#D4AF37" }}>{video.music}</span>
          </div>
        )}
      </div>

      {/* Right action buttons */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-10">
        {/* Like */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: isLiked ? "rgba(212,175,55,0.2)" : "rgba(0,0,0,0.4)",
              border: isLiked ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.2)",
              transform: isLiked ? "scale(1.1)" : "scale(1)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={isLiked ? "#D4AF37" : "none"} stroke={isLiked ? "#D4AF37" : "white"} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <span className="text-white text-xs font-medium" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {formatNumber(likeCount)}
          </span>
        </button>

        {/* Comment */}
        <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <span className="text-white text-xs font-medium" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {formatNumber(video.comments)}
          </span>
        </button>

        {/* Share */}
        <button onClick={handleShare} className="flex flex-col items-center gap-1">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <span className="text-white text-xs font-medium" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
            {formatNumber(video.shares)}
          </span>
        </button>

        {/* Mute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
            </svg>
          )}
        </button>

        {/* Rotating music disc */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden border-2 animate-spin"
          style={{ borderColor: "#D4AF37", animationDuration: "4s" }}
        >
          <img src={video.user.avatar} alt="music" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Comments Panel */}
      {showComments && (
        <CommentsPanel
          videoId={video.id}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
}
