"use client";

import { Users, CheckCircle, XCircle, Clock, DollarSign } from "lucide-react";
import ConductorBottomNav from "@/components/ConductorBottomNav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SeatStatus = "available" | "booked" | "verified" | "pending";

interface Seat {
  id: string;
  number: string;
  status: SeatStatus;
  passenger?: {
    name: string;
    bookingId: string;
    payment: "paid" | "pending";
  };
}

export default function SeatOverview() {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [seats] = useState<Seat[]>(
    Array.from({ length: 40 }, (_, i) => {
      const seatNumber = `${String.fromCharCode(65 + Math.floor(i / 4))}${(i % 4) + 1}`;
      const statuses: SeatStatus[] = ["available", "booked", "verified", "pending"];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: `seat-${i}`,
        number: seatNumber,
        status,
        passenger:
          status !== "available"
            ? {
                name: ["Alex Johnson", "Sarah Smith", "Mike Davis", "Emma Wilson"][
                  Math.floor(Math.random() * 4)
                ],
                bookingId: `TF${Math.floor(1000 + Math.random() * 9000)}`,
                payment: status === "pending" ? "pending" : "paid",
              }
            : undefined,
      };
    })
  );

  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case "verified":
        return "#10b981";
      case "booked":
        return "#00e5cc";
      case "pending":
        return "#f59e0b";
      case "available":
        return "#374151";
    }
  };

  const stats = {
    verified: seats.filter((s) => s.status === "verified").length,
    booked: seats.filter((s) => s.status === "booked").length,
    pending: seats.filter((s) => s.status === "pending").length,
    available: seats.filter((s) => s.status === "available").length,
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-0 w-96 h-96 bg-[#00e5cc] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-0 w-96 h-96 bg-[#0066ff] rounded-full blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-14 pb-6 px-6 relative z-10"
      >
        <h1 className="text-3xl font-bold">Seat Overview</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time passenger status</p>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-6 grid grid-cols-2 gap-3 relative z-10"
      >
        <LegendItem icon={CheckCircle} label="Verified" count={stats.verified} color="#10b981" />
        <LegendItem icon={Users} label="Booked" count={stats.booked} color="#00e5cc" />
        <LegendItem icon={Clock} label="Pending" count={stats.pending} color="#f59e0b" />
        <LegendItem icon={XCircle} label="Available" count={stats.available} color="#374151" />
      </motion.div>

      {/* Bus Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-6 relative z-10"
      >
        <div className="bg-[#1a1d2e] rounded-3xl p-6 border border-white/10 relative overflow-hidden">
          {/* Driver Section */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex justify-end"
          >
            <div className="bg-[#0f1219] rounded-2xl px-6 py-3 border border-[#00e5cc]/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00e5cc]/20 flex items-center justify-center">
                <Users size={20} className="text-[#00e5cc]" />
              </div>
              <span className="text-sm font-semibold text-gray-300">Driver</span>
            </div>
          </motion.div>

          {/* Seats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {seats.map((seat, index) => (
              <motion.button
                key={seat.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.01 }}
                whileHover={{ scale: 1.1, rotate: seat.status === "available" ? 0 : 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => seat.status !== "available" && setSelectedSeat(seat)}
                className="aspect-square rounded-2xl relative overflow-hidden"
                style={{
                  backgroundColor: `${getSeatColor(seat.status)}20`,
                  border: `2px solid ${getSeatColor(seat.status)}`,
                  boxShadow:
                    selectedSeat?.id === seat.id
                      ? `0 0 20px ${getSeatColor(seat.status)}80`
                      : "none",
                }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${getSeatColor(
                      seat.status
                    )}40, transparent)`,
                  }}
                />

                {/* Seat number */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: getSeatColor(seat.status) }}>
                    {seat.number}
                  </span>
                  {seat.status === "verified" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.01 }}
                    >
                      <CheckCircle size={16} className="mt-1" style={{ color: "#10b981" }} />
                    </motion.div>
                  )}
                  {seat.status === "pending" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock size={16} className="mt-1" style={{ color: "#f59e0b" }} />
                    </motion.div>
                  )}
                </div>

                {/* Shimmer effect for active seats */}
                {seat.status !== "available" && (
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Passenger Details Modal */}
      <AnimatePresence>
        {selectedSeat && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSeat(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 pb-28"
            >
              <div className="bg-[#1a1d2e] rounded-t-3xl p-6 mx-4 border border-white/10 relative overflow-hidden">
                {/* Animated gradient border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 bg-gradient-to-r from-[#00e5cc] via-[#0066ff] to-[#00e5cc] opacity-20 blur-xl"
                />

                <div className="relative z-10">
                  {/* Seat Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#00e5cc]/20 rounded-full border border-[#00e5cc]/50 mb-4"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold"
                      style={{
                        backgroundColor: `${getSeatColor(selectedSeat.status)}40`,
                        color: getSeatColor(selectedSeat.status),
                      }}
                    >
                      {selectedSeat.number}
                    </div>
                    <span className="text-sm font-semibold text-[#00e5cc]">
                      Seat {selectedSeat.number}
                    </span>
                  </motion.div>

                  {/* Passenger Info */}
                  <div className="space-y-4 mb-6">
                    <DetailRow
                      icon={Users}
                      label="Passenger"
                      value={selectedSeat.passenger?.name || "N/A"}
                      delay={0.1}
                    />
                    <DetailRow
                      icon={DollarSign}
                      label="Booking ID"
                      value={selectedSeat.passenger?.bookingId || "N/A"}
                      delay={0.2}
                    />
                    <DetailRow
                      icon={CheckCircle}
                      label="Status"
                      value={selectedSeat.status.toUpperCase()}
                      delay={0.3}
                      valueColor={getSeatColor(selectedSeat.status)}
                    />
                    <DetailRow
                      icon={DollarSign}
                      label="Payment"
                      value={selectedSeat.passenger?.payment.toUpperCase() || "N/A"}
                      delay={0.4}
                      valueColor={selectedSeat.passenger?.payment === "paid" ? "#10b981" : "#f59e0b"}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {selectedSeat.status === "booked" && (
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-[#00e5cc] to-[#00b8a9] rounded-xl py-3 font-semibold text-[#0f1219]"
                      >
                        Mark as Verified
                      </motion.button>
                    )}
                    {selectedSeat.status === "pending" && (
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-[#f59e0b] to-[#f97316] rounded-xl py-3 font-semibold text-white"
                      >
                        Verify Payment
                      </motion.button>
                    )}
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSeat(null)}
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

      <ConductorBottomNav active="seats" />
    </div>
  );
}

interface LegendItemProps {
  icon: React.ElementType;
  label: string;
  count: number;
  color: string;
}

function LegendItem({ icon: Icon, label, count, color }: LegendItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#1a1d2e] rounded-xl p-3 border border-white/10 flex items-center gap-3"
    >
      <div
        className="p-2 rounded-lg"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-bold" style={{ color }}>
          {count}
        </p>
      </div>
    </motion.div>
  );
}

interface DetailRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
  valueColor?: string;
}

function DetailRow({ icon: Icon, label, value, delay, valueColor }: DetailRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 p-3 bg-[#0f1219]/50 rounded-xl"
    >
      <div className="p-2 bg-[#00e5cc]/20 rounded-lg">
        <Icon size={20} className="text-[#00e5cc]" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-semibold" style={{ color: valueColor || "white" }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}
