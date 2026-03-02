"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";
import { COUNTRIES } from "@/lib/data";

const TAGS_SUGGESTIONS = [
  "luxury", "lifestyle", "fashion", "music", "food", "travel",
  "fitness", "beauty", "tech", "art", "dance", "comedy",
  "motivation", "business", "gaming", "sports",
];

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<"select" | "edit" | "publish">("select");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [country, setCountry] = useState("US");
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file");
      return;
    }
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
    setStep("edit");
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePublish = async () => {
    setUploading(true);
    setStep("publish");
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 150));
      setUploadProgress(i);
    }
    await new Promise((r) => setTimeout(r, 500));
    setUploading(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: "#000" }}>
      <TopBar showLogo={false} title="Upload Video" />

      <div className="pt-16">
        {/* Step: Select video */}
        {step === "select" && (
          <div className="px-4 py-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Upload area */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-3xl flex flex-col items-center justify-center py-16 transition-all hover:opacity-80"
              style={{
                background: "#0A0A0A",
                border: "2px dashed #2A2A2A",
                minHeight: 300,
              }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Upload Video</h3>
              <p className="text-sm text-center px-8" style={{ color: "#555" }}>
                Tap to select a vertical video from your device
              </p>
              <div className="flex items-center gap-4 mt-6">
                {["MP4", "MOV", "AVI"].map((fmt) => (
                  <span
                    key={fmt}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "#1A1A1A", color: "#888", border: "1px solid #2A2A2A" }}
                  >
                    {fmt}
                  </span>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: "#444" }}>Max 500MB • Up to 10 minutes</p>
            </button>

            {/* Tips */}
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold" style={{ color: "#888" }}>Tips for great content</h4>
              {[
                { icon: "📱", tip: "Film vertically (9:16 ratio) for best results" },
                { icon: "💡", tip: "Good lighting makes your content shine" },
                { icon: "🎵", tip: "Add trending music to boost discovery" },
                { icon: "✍️", tip: "Write a compelling caption with hashtags" },
              ].map((item) => (
                <div key={item.tip} className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm" style={{ color: "#666" }}>{item.tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step: Edit */}
        {step === "edit" && videoPreview && (
          <div className="px-4 py-4">
            <div className="flex gap-4 mb-6">
              {/* Video preview */}
              <div
                className="flex-shrink-0 rounded-2xl overflow-hidden"
                style={{ width: 100, aspectRatio: "9/16", background: "#111" }}
              >
                <video
                  src={videoPreview}
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              </div>

              {/* Caption */}
              <div className="flex-1">
                <label className="block text-xs font-medium mb-2" style={{ color: "#888" }}>
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe your video... Add hashtags to reach more people"
                  maxLength={300}
                  rows={5}
                  className="w-full px-3 py-3 rounded-xl text-sm text-white outline-none resize-none"
                  style={{
                    background: "#111",
                    border: "1px solid #2A2A2A",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                  onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                />
                <p className="text-xs text-right mt-1" style={{ color: "#444" }}>
                  {caption.length}/300
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-5">
              <label className="block text-xs font-medium mb-2" style={{ color: "#888" }}>
                Tags ({selectedTags.length}/5)
              </label>
              <div className="flex flex-wrap gap-2">
                {TAGS_SUGGESTIONS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: selectedTags.includes(tag) ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "#111",
                      color: selectedTags.includes(tag) ? "#000" : "#888",
                      border: selectedTags.includes(tag) ? "none" : "1px solid #2A2A2A",
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Country */}
            <div className="mb-5">
              <label className="block text-xs font-medium mb-2" style={{ color: "#888" }}>
                Region
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                style={{ background: "#111", border: "1px solid #2A2A2A" }}
              >
                {COUNTRIES.filter((c) => c.code !== "ALL").map((c) => (
                  <option key={c.code} value={c.code} style={{ background: "#111" }}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Settings */}
            <div
              className="rounded-2xl p-4 mb-6 space-y-4"
              style={{ background: "#111", border: "1px solid #1A1A1A" }}
            >
              <h4 className="text-sm font-semibold text-white">Privacy & Settings</h4>
              {[
                { label: "Allow Comments", value: allowComments, setter: setAllowComments },
                { label: "Allow Duet", value: allowDuet, setter: setAllowDuet },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "#888" }}>{setting.label}</span>
                  <button
                    onClick={() => setting.setter(!setting.value)}
                    className="w-12 h-6 rounded-full transition-all relative"
                    style={{
                      background: setting.value ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "#2A2A2A",
                    }}
                  >
                    <span
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                      style={{ left: setting.value ? "calc(100% - 22px)" : "2px" }}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Publish button */}
            <button
              onClick={handlePublish}
              className="w-full py-4 rounded-2xl font-bold text-base transition-all"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                color: "#000",
                boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
              }}
            >
              Publish Video ✨
            </button>

            <button
              onClick={() => setStep("select")}
              className="w-full py-3 mt-3 text-sm"
              style={{ color: "#555" }}
            >
              ← Choose different video
            </button>
          </div>
        )}

        {/* Step: Publishing */}
        {step === "publish" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
            {uploading ? (
              <>
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
                >
                  <svg className="animate-spin" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Publishing...</h3>
                <p className="text-sm mb-6" style={{ color: "#666" }}>Your video is being uploaded</p>
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-xs mb-2" style={{ color: "#888" }}>
                    <span>Uploading</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: "#1A1A1A" }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${uploadProgress}%`,
                        background: "linear-gradient(135deg, #D4AF37, #B8860B)",
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-white font-bold text-xl mb-2">Video Published!</h3>
                <p className="text-sm" style={{ color: "#666" }}>Your video is now live on ZERO LIVE</p>
              </>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
