"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/store";
import { COUNTRIES } from "@/lib/data";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    country: "US",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    if (mode === "login") {
      if (!form.email || !form.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      login(form.email.split("@")[0], form.email.split("@")[0]);
    } else {
      if (!form.username || !form.displayName || !form.email || !form.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      login(form.username, form.displayName);
    }

    setLoading(false);
    router.push("/");
  };

  const handleSocialLogin = (provider: string) => {
    login(`${provider}_user`, `${provider} User`);
    router.push("/");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: "radial-gradient(ellipse at top, #1A1200 0%, #000 60%)" }}
    >
      {/* Logo */}
      <div className="text-center mb-10">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 gold-glow"
          style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)" }}
        >
          <span className="text-4xl font-black text-black">Z</span>
        </div>
        <h1 className="text-3xl font-black tracking-widest gold-text">ZERO LIVE</h1>
        <p className="text-sm mt-2" style={{ color: "#666" }}>
          Luxury Short Video & Live Streaming
        </p>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{
          background: "#0A0A0A",
          border: "1px solid #2A2A2A",
          boxShadow: "0 25px 80px rgba(212,175,55,0.1)",
        }}
      >
        {/* Tab switcher */}
        <div
          className="flex rounded-xl p-1 mb-6"
          style={{ background: "#111" }}
        >
          {(["login", "register"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
              style={{
                background: mode === tab ? "linear-gradient(135deg, #D4AF37, #B8860B)" : "transparent",
                color: mode === tab ? "#000" : "#666",
              }}
            >
              {tab === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#888" }}>
                  Username
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/\s/g, "_") })}
                  placeholder="@your_username"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: "#111",
                    border: "1px solid #2A2A2A",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                  onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#888" }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: "#111",
                    border: "1px solid #2A2A2A",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                  onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#888" }}>
                  Country
                </label>
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: "#111",
                    border: "1px solid #2A2A2A",
                    color: "#fff",
                  }}
                >
                  {COUNTRIES.filter((c) => c.code !== "ALL").map((country) => (
                    <option key={country.code} value={country.code} style={{ background: "#111" }}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#888" }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: "#111",
                border: "1px solid #2A2A2A",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
              onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#888" }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: "#111",
                border: "1px solid #2A2A2A",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
              onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #B8860B)",
              color: "#000",
              boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </span>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "#2A2A2A" }} />
          <span className="text-xs" style={{ color: "#555" }}>or continue with</span>
          <div className="flex-1 h-px" style={{ background: "#2A2A2A" }} />
        </div>

        {/* Social login */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Google", icon: "G", color: "#EA4335" },
            { name: "Apple", icon: "🍎", color: "#fff" },
            { name: "X", icon: "𝕏", color: "#1DA1F2" },
          ].map((provider) => (
            <button
              key={provider.name}
              onClick={() => handleSocialLogin(provider.name.toLowerCase())}
              className="py-3 rounded-xl text-sm font-bold transition-all hover:opacity-80"
              style={{
                background: "#111",
                border: "1px solid #2A2A2A",
                color: provider.color,
              }}
            >
              {provider.icon}
            </button>
          ))}
        </div>

        {/* Guest mode */}
        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 py-2 text-xs transition-all"
          style={{ color: "#555" }}
        >
          Continue as guest →
        </button>
      </div>

      {/* Terms */}
      <p className="text-xs text-center mt-6" style={{ color: "#444" }}>
        By continuing, you agree to our{" "}
        <span style={{ color: "#D4AF37" }}>Terms of Service</span> and{" "}
        <span style={{ color: "#D4AF37" }}>Privacy Policy</span>
      </p>
    </div>
  );
}
