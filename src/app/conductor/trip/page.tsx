"use client";

import { MapPin, Clock, Users, DollarSign, TrendingUp, Download, CheckCircle } from "lucide-react";
import ConductorBottomNav from "@/components/ConductorBottomNav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Stop {
  name: string;
  time: string;
  status: "completed" | "current" | "upcoming";
}

export default function TripSummary() {
  const [tripStatus, setTripStatus] = useState<"active" | "paused" | "completed">("active");
  const [showReport, setShowReport] = useState(false);

  const stops: Stop[] = [
    { name: "Central Station", time: "08:00 AM", status: "completed" },
    { name: "Downtown Plaza", time: "08:15 AM", status: "completed" },
    { name: "University Ave", time: "08:30 AM", status: "current" },
    { name: "Tech Park", time: "08:45 AM", status: "upcoming" },
    { name: "Airport Terminal", time: "09:00 AM", status: "upcoming" },
  ];

  const tripData = {
    boarded: 24,
    noShows: 4,
    totalBookings: 28,
    revenue: 1240,
    startTime: "08:00 AM",
    currentTime: "08:32 AM",
    eta: "09:00 AM",
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00e5cc] rounded-full blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-14 pb-6 px-6 relative z-10"
      >
        <h1 className="text-3xl font-bold">Trip Summary</h1>
        <p className="text-gray-400 text-sm mt-1">Monitor your journey progress</p>
      </motion.div>

      {/* Trip Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6 flex gap-3 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTripStatus(tripStatus === "active" ? "paused" : "active")}
          className={`flex-1 rounded-2xl py-4 font-semibold relative overflow-hidden ${
            tripStatus === "active"
              ? "bg-gradient-to-r from-[#f59e0b] to-[#f97316]"
              : "bg-gradient-to-r from-[#10b981] to-[#059669]"
          }`}
          style={{
            boxShadow:
              tripStatus === "active"
                ? "0 8px 32px rgba(245, 158, 11, 0.3)"
                : "0 8px 32px rgba(16, 185, 129, 0.3)",
          }}
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <span className="relative z-10">{tripStatus === "active" ? "Pause Trip" : "Resume Trip"}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setTripStatus("completed");
            setShowReport(true);
          }}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl py-4 font-semibold relative overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)" }}
        >
          <span className="relative z-10">End Trip</span>
        </motion.button>
      </motion.div>

      {/* Trip Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6 relative z-10"
      >
        <div className="bg-[#1a1d2e] rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="text-[#00e5cc]" size={24} />
            Journey Timeline
          </h2>

          <div className="space-y-4">
            {stops.map((stop, index) => (
              <motion.div
                key={stop.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="relative">
                    <motion.div
                      animate={
                        stop.status === "current"
                          ? { scale: [1, 1.3, 1] }
                          : {}
                      }
                      transition={{
                        duration: 1.5,
                        repeat: stop.status === "current" ? Infinity : 0,
                      }}
                      className={`w-6 h-6 rounded-full border-4 ${
                        stop.status === "completed"
                          ? "bg-[#10b981] border-[#10b981]"
                          : stop.status === "current"
                          ? "bg-[#00e5cc] border-[#00e5cc]"
                          : "bg-transparent border-gray-600"
                      }`}
                      style={
                        stop.status === "current"
                          ? { boxShadow: "0 0 20px rgba(0, 229, 204, 0.6)" }
                          : {}
                      }
                    >
                      {stop.status === "completed" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <CheckCircle size={24} className="text-white" fill="#10b981" />
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Connecting line */}
                    {index < stops.length - 1 && (
                      <div
                        className={`absolute left-1/2 top-6 w-0.5 h-12 -translate-x-1/2 ${
                          stop.status === "completed" ? "bg-[#10b981]" : "bg-gray-700"
                        }`}
                      />
                    )}
                  </div>

                  {/* Stop info */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`flex-1 p-4 rounded-xl ${
                      stop.status === "current"
                        ? "bg-[#00e5cc]/10 border-2 border-[#00e5cc]"
                        : "bg-[#0f1219]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`font-semibold ${
                            stop.status === "current" ? "text-[#00e5cc]" : "text-white"
                          }`}
                        >
                          {stop.name}
                        </p>
                        <p className="text-sm text-gray-400">{stop.time}</p>
                      </div>
                      <MapPin
                        size={20}
                        className={
                          stop.status === "completed"
                            ? "text-[#10b981]"
                            : stop.status === "current"
                            ? "text-[#00e5cc]"
                            : "text-gray-600"
                        }
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Live Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-6 grid grid-cols-2 gap-4 relative z-10"
      >
        <LiveStatCard
          icon={Users}
          label="Boarded"
          value={tripData.boarded}
          total={tripData.totalBookings}
          color="#10b981"
        />
        <LiveStatCard
          icon={Users}
          label="No-Shows"
          value={tripData.noShows}
          total={tripData.totalBookings}
          color="#ef4444"
        />
        <LiveStatCard
          icon={DollarSign}
          label="Revenue"
          value={`$${tripData.revenue}`}
          color="#00e5cc"
        />
        <LiveStatCard
          icon={TrendingUp}
          label="Boarding Rate"
          value={`${Math.round((tripData.boarded / tripData.totalBookings) * 100)}%`}
          color="#f59e0b"
        />
      </motion.div>

      {/* Trip Report Modal */}
      <AnimatePresence>
        {showReport && tripStatus === "completed" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReport(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
            >
              <div className="bg-[#1a1d2e] rounded-3xl p-8 border-2 border-[#00e5cc] relative overflow-hidden">
                {/* Animated border glow */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 bg-gradient-to-r from-[#00e5cc] via-[#0066ff] to-[#00e5cc] opacity-30 blur-2xl"
                />

                <div className="relative z-10">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center"
                    style={{ boxShadow: "0 8px 32px rgba(16, 185, 129, 0.4)" }}
                  >
                    <CheckCircle size={48} className="text-white" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-center mb-2">Trip Completed!</h2>
                  <p className="text-gray-400 text-center text-sm mb-6">
                    {tripData.startTime} - {tripData.currentTime}
                  </p>

                  {/* Report Stats */}
                  <div className="space-y-3 mb-6">
                    <ReportRow label="Total Passengers" value={tripData.boarded} />
                    <ReportRow label="No-Shows" value={tripData.noShows} />
                    <ReportRow label="Total Revenue" value={`$${tripData.revenue}`} />
                    <ReportRow label="Stops Covered" value={stops.filter((s) => s.status === "completed").length} />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-[#00e5cc] to-[#00b8a9] rounded-xl py-3 font-semibold text-[#0f1219] flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Export Report
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowReport(false)}
                      className="flex-1 bg-[#0f1219] border border-white/10 rounded-xl py-3 font-semibold"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConductorBottomNav active="trip" />
    </div>
  );
}

interface LiveStatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  total?: number;
  color: string;
}

function LiveStatCard({ icon: Icon, label, value, total, color }: LiveStatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-[#1a1d2e] rounded-2xl p-5 border border-white/10 relative overflow-hidden"
    >
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <Icon size={24} style={{ color }} />
          {total && (
            <span className="text-xs text-gray-400">
              of {total}
            </span>
          )}
        </div>
        <motion.p
          key={value}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold mb-1"
          style={{ color }}
        >
          {value}
        </motion.p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
}

interface ReportRowProps {
  label: string;
  value: string | number;
}

function ReportRow({ label, value }: ReportRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-3 bg-[#0f1219]/50 rounded-xl"
    >
      <span className="text-gray-400">{label}</span>
      <span className="font-bold text-[#00e5cc]">{value}</span>
    </motion.div>
  );
}
