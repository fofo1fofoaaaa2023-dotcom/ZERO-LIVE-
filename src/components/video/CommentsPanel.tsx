"use client";

import { useState } from "react";
import { MOCK_COMMENTS, formatNumber } from "@/lib/data";

interface CommentsPanelProps {
  videoId: string;
  onClose: () => void;
}

export default function CommentsPanel({ videoId: _videoId, onClose }: CommentsPanelProps) {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment = {
      id: `c${Date.now()}`,
      userId: "current",
      user: {
        id: "current",
        username: "you",
        displayName: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you&backgroundColor=b6e3f4",
        bio: "",
        followers: 0,
        following: 0,
        likes: 0,
        country: "US",
        isVerified: false,
      },
      text: newComment,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-20"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.5)" }}
      />

      {/* Panel */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 rounded-t-3xl overflow-hidden"
        style={{
          background: "#111",
          border: "1px solid #2A2A2A",
          maxHeight: "70vh",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #2A2A2A" }}
        >
          <h3 className="font-bold text-white text-base">{comments.length} Comments</h3>
          <button onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Comments list */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(70vh - 130px)" }}>
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 px-5 py-3">
              <img
                src={comment.user.avatar}
                alt={comment.user.displayName}
                className="w-9 h-9 rounded-full flex-shrink-0"
                style={{ border: "1px solid #2A2A2A" }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">@{comment.user.username}</span>
                  {comment.user.isVerified && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{comment.text}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs" style={{ color: "#555" }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                  <button className="flex items-center gap-1 text-xs" style={{ color: "#888" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    {formatNumber(comment.likes)}
                  </button>
                  <button className="text-xs" style={{ color: "#888" }}>Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderTop: "1px solid #2A2A2A", background: "#0A0A0A" }}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=you&backgroundColor=b6e3f4"
            alt="you"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-600"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-40"
            style={{
              background: newComment.trim() ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "#2A2A2A",
              color: newComment.trim() ? "#000" : "#555",
            }}
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
}
