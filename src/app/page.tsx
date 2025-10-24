"use client";

import { UserPlus, Settings, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [ripples, setRipples] = useState<number[]>([]);

  const handleTapToBoard = () => {
    const newRipple = Date.now();
    setRipples([...ripples, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== newRipple));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28">
      {/* Header */}
      <div className="pt-14 pb-8 text-center">
        <h1 className="text-2xl font-bold">TransitFlow</h1>
      </div>

      {/* Main Circular Button */}
      <div className="flex justify-center items-center mb-8 px-4">
        <button
          onClick={handleTapToBoard}
          className="relative w-64 h-64 rounded-full border-4 border-[#00e5cc] bg-transparent flex items-center justify-center group transition-all duration-300 hover:scale-105"
          style={{
            boxShadow: "0 0 40px rgba(0, 229, 204, 0.4)",
          }}
        >
          {/* Animated Ripple Rings */}
          {ripples.map((ripple) => (
            <div
              key={ripple}
              className="absolute inset-0 rounded-full border-2 border-[#00e5cc] animate-ping opacity-75"
              style={{ animationDuration: "2s" }}
            />
          ))}
          
          {/* Pulse Rings */}
          <div className="absolute inset-0 rounded-full border border-[#00e5cc]/30 pulse-ring" />
          <div className="absolute inset-0 rounded-full border border-[#00e5cc]/20 pulse-ring" style={{ animationDelay: "0.5s" }} />
          
          <span className="text-2xl font-semibold z-10 group-hover:scale-110 transition-transform">
            Tap to Board
          </span>
        </button>
      </div>

      {/* Token Balance */}
      <div className="flex items-center justify-center gap-2 mb-6 px-4">
        <span className="text-gray-300 text-lg">Current Tokens: 185</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 px-6 mb-6">
        <Link
          href="/wallet?mode=friend"
          className="bg-[#1a1d2e] rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#00e5cc]/30 hover:border-[#00e5cc] transition-all hover:scale-105"
        >
          <UserPlus className="text-[#00e5cc]" size={28} />
          <span className="text-sm font-medium">Buy for Friend</span>
          <div className="h-0.5 w-16 bg-[#00e5cc] rounded-full" />
        </Link>
        
        <button className="bg-[#1a1d2e] rounded-2xl p-6 flex flex-col items-center gap-3 border border-white/10 hover:border-[#00e5cc]/50 transition-all hover:scale-105">
          <Settings className="text-[#00e5cc]" size={28} />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>

      {/* Mini Map */}
      <div className="mx-6 bg-[#1a1d2e] rounded-2xl overflow-hidden relative h-56 border border-white/10">
        {/* Map Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a2d3e" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="250" fill="#1a1d2e" />
          <rect width="400" height="250" fill="url(#grid)" />
          
          {/* Streets */}
          <line x1="50" y1="80" x2="180" y2="80" stroke="#2a2d3e" strokeWidth="3" />
          <line x1="180" y1="80" x2="350" y2="120" stroke="#2a2d3e" strokeWidth="3" />
          <line x1="120" y1="30" x2="120" y2="200" stroke="#2a2d3e" strokeWidth="3" />
          <line x1="250" y1="40" x2="250" y2="220" stroke="#2a2d3e" strokeWidth="3" />
          
          {/* Route Line */}
          <line x1="60" y1="180" x2="340" y2="80" stroke="#00e5cc" strokeWidth="4" strokeLinecap="round" />
          
          {/* Stop Circle */}
          <circle cx="200" cy="130" r="6" fill="#00e5cc" opacity="0.8" />
          
          {/* Bus Icon */}
          <g transform="translate(290, 90)">
            <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#00e5cc" />
            <rect x="-10" y="-7" width="8" height="6" fill="#1a1d2e" />
            <rect x="2" y="-7" width="8" height="6" fill="#1a1d2e" />
            <circle cx="-8" cy="12" r="3" fill="#1a1d2e" />
            <circle cx="8" cy="12" r="3" fill="#1a1d2e" />
          </g>
        </svg>

        {/* Route Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f1219] to-transparent p-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-[#00e5cc]" size={20} />
            <div>
              <p className="text-sm font-semibold">Route 4A - Arriving in 8 min</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}