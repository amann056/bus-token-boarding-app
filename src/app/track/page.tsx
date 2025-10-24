"use client";

import { MapPin, User, Clock } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

export default function TrackPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28">
      {/* Header */}
      <div className="text-center pt-14 pb-6">
        <h1 className="text-2xl font-bold">Track Your Journey</h1>
      </div>

      {/* Tabs */}
      <div className="mx-6 mb-6 flex gap-3">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all ${
            activeTab === "upcoming"
              ? "bg-[#00e5cc] text-[#0f1219]"
              : "bg-[#1a1d2e] text-gray-400"
          }`}
        >
          Upcoming Trips
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all ${
            activeTab === "past"
              ? "bg-[#00e5cc] text-[#0f1219]"
              : "bg-[#1a1d2e] text-gray-400"
          }`}
        >
          Past Trips
        </button>
      </div>

      {/* Map View */}
      <div className="mx-6 mb-6 bg-[#1a1d2e] rounded-3xl overflow-hidden relative h-80 border border-white/10">
        {/* Map Background */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 320"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Grid pattern */}
          <defs>
            <pattern id="grid-track" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a2d3e" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="320" fill="#1a1d2e" />
          <rect width="400" height="320" fill="url(#grid-track)" />
          
          {/* Streets */}
          <line x1="50" y1="100" x2="180" y2="100" stroke="#2a2d3e" strokeWidth="3" />
          <line x1="180" y1="100" x2="350" y2="140" stroke="#2a2d3e" strokeWidth="3" />
          <line x1="120" y1="40" x2="120" y2="280" stroke="#2a2d3e" strokeWidth="3" />
          <line x1="250" y1="50" x2="250" y2="290" stroke="#2a2d3e" strokeWidth="3" />
          <line x1="60" y1="200" x2="340" y2="200" stroke="#2a2d3e" strokeWidth="3" />
          
          {/* Route Line with gradient */}
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#00e5cc", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "#00e5cc", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <line x1="60" y1="240" x2="360" y2="120" stroke="url(#route-gradient)" strokeWidth="5" strokeLinecap="round" />
          <line x1="60" y1="240" x2="360" y2="120" stroke="#00e5cc" strokeWidth="5" strokeLinecap="round" strokeDasharray="10,10">
            <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
          </line>
          
          {/* Next Stop Circle */}
          <circle cx="260" cy="160" r="8" fill="#00e5cc" opacity="0.6">
            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="260" cy="160" r="6" fill="#00e5cc" />
          
          {/* Bus Icon (animated) */}
          <g transform="translate(320, 130)">
            <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#00e5cc" />
            <rect x="-12" y="-8" width="10" height="7" fill="#1a1d2e" rx="1" />
            <rect x="2" y="-8" width="10" height="7" fill="#1a1d2e" rx="1" />
            <circle cx="-10" cy="14" r="4" fill="#1a1d2e" />
            <circle cx="10" cy="14" r="4" fill="#1a1d2e" />
            <rect x="-18" y="-16" width="36" height="3" fill="#00e5cc" opacity="0.6" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="320,130; 322,128; 320,130"
              dur="2s"
              repeatCount="indefinite"
            />
          </g>
        </svg>

        {/* Next Stop Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f1219] via-[#0f1219]/90 to-transparent p-5">
          <div className="flex items-start gap-3">
            <MapPin className="text-[#00e5cc] flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <p className="font-semibold text-lg">Next Stop: Elm Street Station</p>
              <p className="text-gray-400 text-sm">59:min</p>
            </div>
            <div className="text-right">
              <p className="text-[#00e5cc] font-semibold">ETA: 5 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details Card */}
      <div className="mx-6 mb-4 bg-[#1a1d2e] rounded-2xl p-5 border border-white/10">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center">
            <User className="text-gray-400" size={22} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Bus Route 4A</h3>
            <p className="text-gray-400 text-sm mb-1">Departure: 10:30 AM</p>
            <p className="text-gray-400 text-sm">2021, 110 min</p>
          </div>
        </div>
        
        <div className="bg-[#252836] rounded-xl p-4">
          <p className="font-medium mb-1">Downtown</p>
        </div>
      </div>

      {/* Status Card */}
      <div className="mx-6 bg-[#1a1d2e] rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center">
            <Clock className="text-[#00e5cc]" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold">Status: On Time</h3>
            <p className="text-gray-400 text-sm">Besterday at 10:30 PM</p>
          </div>
        </div>
      </div>

      <BottomNav active="track" />
    </div>
  );
}
