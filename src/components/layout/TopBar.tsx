"use client";

import Link from "next/link";
import { useState } from "react";
import { COUNTRIES } from "@/lib/data";
import { getState, setCountry } from "@/lib/store";

interface TopBarProps {
  showCountrySelector?: boolean;
  title?: string;
  showLogo?: boolean;
}

export default function TopBar({ showCountrySelector = false, title, showLogo = true }: TopBarProps) {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (typeof window === "undefined") return "ALL";
    return getState().selectedCountry;
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    setCountry(code);
    setShowDropdown(false);
  };

  const currentCountry = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0))",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        {showLogo && (
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", color: "#000" }}
            >
              Z
            </div>
            <span className="font-black text-lg tracking-wider gold-text">ZERO LIVE</span>
          </Link>
        )}
        {title && !showLogo && (
          <h1 className="font-bold text-lg text-white">{title}</h1>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {showCountrySelector && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: "#1A1A1A",
                border: "1px solid #2A2A2A",
                color: "#D4AF37",
              }}
            >
              <span>{currentCountry.flag}</span>
              <span className="hidden sm:block">{currentCountry.name}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50"
                style={{
                  background: "#111",
                  border: "1px solid #2A2A2A",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country.code)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all hover:bg-white/5"
                    style={{
                      color: selectedCountry === country.code ? "#D4AF37" : "#CCC",
                      borderBottom: "1px solid #1A1A1A",
                    }}
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span>{country.name}</span>
                    {selectedCountry === country.code && (
                      <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notifications */}
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full flex items-center justify-center relative"
          style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "#D4AF37" }}
          />
        </Link>
      </div>

      {/* Backdrop for dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
}
