"use client";

import { Play, Square, Users, CheckCircle, Clock, MapPin } from "lucide-react";
import ConductorBottomNav from "@/components/ConductorBottomNav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConductorDashboard() {
  const [tripActive, setTripActive] = useState(false);
  const [stats] = useState({
    totalBooked: 28,
    seatsAvailable: 12,
    verified: 16,
    pending: 12,
  });

  const handleStartTrip = () => {
    setTripActive(true);
  };

  const handleEndTrip = () => {
    setTripActive(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-64 h-64 bg-[#00e5cc] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-10 w-80 h-80 bg-[#0066ff] rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-14 pb-6 px-6 relative z-10"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Conductor Panel
        </h1>
        <p className="text-gray-400 text-sm mt-1">Route 4A • Bus #2847</p>
      </motion.div>

      {/* Trip Status Banner */}
      <AnimatePresence mode="wait">
        {tripActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mx-6 mb-6 overflow-hidden relative z-10"
          >
            <div className="bg-gradient-to-r from-[#00e5cc]/20 to-[#0066ff]/20 rounded-2xl p-4 border border-[#00e5cc]/40 relative overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-[#00e5cc] rounded-full"
                  style={{ boxShadow: "0 0 20px rgba(0, 229, 204, 0.8)" }}
                />
                <div>
                  <p className="text-[#00e5cc] font-semibold">Trip Active</p>
                  <p className="text-xs text-gray-400">Live tracking enabled</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trip Control Buttons */}
      <div className="px-6 mb-8 flex gap-4 relative z-10">
        <AnimatePresence mode="wait">
          {!tripActive ? (
            <motion.button
              key="start"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartTrip}
              className="flex-1 bg-gradient-to-r from-[#00e5cc] to-[#00b8a9] rounded-2xl p-6 flex items-center justify-center gap-3 relative overflow-hidden group"
              style={{ boxShadow: "0 8px 32px rgba(0, 229, 204, 0.3)" }}
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <Play size={28} className="fill-[#0f1219] text-[#0f1219]" />
              <span className="text-xl font-bold text-[#0f1219]">Start Trip</span>
            </motion.button>
          ) : (
            <motion.button
              key="end"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEndTrip}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 flex items-center justify-center gap-3 relative overflow-hidden"
              style={{ boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)" }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Square size={28} className="fill-white text-white" />
              </motion.div>
              <span className="text-xl font-bold text-white">End Trip</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6 grid grid-cols-2 gap-4 relative z-10"
      >
        <StatsCard
          icon={Users}
          label="Total Booked"
          value={stats.totalBooked}
          color="#00e5cc"
          delay={0}
        />
        <StatsCard
          icon={Users}
          label="Seats Available"
          value={stats.seatsAvailable}
          color="#0066ff"
          delay={0.1}
        />
        <StatsCard
          icon={CheckCircle}
          label="Verified"
          value={stats.verified}
          color="#10b981"
          delay={0.2}
        />
        <StatsCard
          icon={Clock}
          label="Pending"
          value={stats.pending}
          color="#f59e0b"
          delay={0.3}
        />
      </motion.div>

      {/* Live Map Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-6 bg-[#1a1d2e] rounded-2xl overflow-hidden relative h-64 border border-white/10"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="conductor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a2d3e" strokeWidth="1" />
            </pattern>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5cc" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="#1a1d2e" />
          <rect width="400" height="300" fill="url(#conductor-grid)" />
          
          {/* Route Line */}
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            x1="60"
            y1="200"
            x2="340"
            y2="100"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          
          {/* Stops */}
          <circle cx="100" cy="180" r="8" fill="#00e5cc" opacity="0.6" />
          <circle cx="200" cy="150" r="8" fill="#00e5cc" opacity="0.6" />
          <circle cx="300" cy="120" r="8" fill="#00e5cc" opacity="0.6" />
          
          {/* Animated Bus */}
          <motion.g
            animate={{
              x: tripActive ? [0, 240] : 0,
              y: tripActive ? [0, -80] : 0,
            }}
            transition={{
              duration: tripActive ? 20 : 0,
              repeat: tripActive ? Infinity : 0,
              ease: "linear",
            }}
            transform="translate(60, 200)"
          >
            <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#00e5cc" />
            <rect x="-12" y="-9" width="10" height="8" fill="#1a1d2e" />
            <rect x="2" y="-9" width="10" height="8" fill="#1a1d2e" />
            <circle cx="-10" cy="14" r="4" fill="#1a1d2e" />
            <circle cx="10" cy="14" r="4" fill="#1a1d2e" />
          </motion.g>
        </svg>

        {/* Map Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f1219] via-[#0f1219]/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="text-[#00e5cc]" size={20} />
              <div>
                <p className="text-sm font-semibold">Next Stop: Central Station</p>
                <p className="text-xs text-gray-400">ETA: 8 minutes</p>
              </div>
            </div>
            {tripActive && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-3 py-1 bg-[#00e5cc]/20 rounded-full border border-[#00e5cc]/50"
              >
                <p className="text-xs text-[#00e5cc] font-semibold">LIVE</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <ConductorBottomNav active="home" />
    </div>
  );
}

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  delay: number;
}

function StatsCard({ icon: Icon, label, value, color, delay }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-[#1a1d2e] rounded-2xl p-5 border border-white/10 relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`,
        }}
      />
      <div className="flex items-center gap-3 relative z-10">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="p-2 rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </motion.div>
        <div>
          <motion.p
            key={value}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold"
            style={{ color }}
          >
            {value}
          </motion.p>
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
