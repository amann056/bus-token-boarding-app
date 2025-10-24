"use client";

import { ScanLine, CheckCircle, XCircle, AlertTriangle, User, CreditCard, Hash } from "lucide-react";
import ConductorBottomNav from "@/components/ConductorBottomNav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type VerificationStatus = "idle" | "scanning" | "success" | "error" | "warning";

interface PassengerData {
  name: string;
  seat: string;
  bookingId: string;
  payment: "paid" | "pending" | "failed";
}

export default function VerifyPassenger() {
  const [scanStatus, setScanStatus] = useState<VerificationStatus>("idle");
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);

  const handleScan = () => {
    setScanStatus("scanning");
    
    // Simulate QR scan
    setTimeout(() => {
      const mockResults = [
        {
          status: "success" as VerificationStatus,
          data: { name: "Alex Johnson", seat: "A12", bookingId: "TF8392", payment: "paid" as const },
        },
        {
          status: "error" as VerificationStatus,
          data: { name: "Unknown", seat: "—", bookingId: "INVALID", payment: "failed" as const },
        },
        {
          status: "warning" as VerificationStatus,
          data: { name: "Sarah Smith", seat: "B05", bookingId: "TF7281", payment: "pending" as const },
        },
      ];

      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setScanStatus(result.status);
      setPassengerData(result.data);

      // Auto reset after 5 seconds
      setTimeout(() => {
        setScanStatus("idle");
        setPassengerData(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00e5cc] rounded-full blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-14 pb-6 px-6 relative z-10"
      >
        <h1 className="text-3xl font-bold">Verify Passenger</h1>
        <p className="text-gray-400 text-sm mt-1">Scan QR code or NFC tag</p>
      </motion.div>

      {/* Scanner Area */}
      <div className="px-6 mb-8 relative z-10">
        <motion.div
          whileHover={{ scale: scanStatus === "idle" ? 1.02 : 1 }}
          className="bg-[#1a1d2e] rounded-3xl p-8 border border-white/10 relative overflow-hidden"
        >
          {/* Scanner Animation */}
          <AnimatePresence mode="wait">
            {scanStatus === "scanning" && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00e5cc] to-transparent z-20"
                style={{ boxShadow: "0 0 20px rgba(0, 229, 204, 0.8)" }}
              />
            )}
          </AnimatePresence>

          {/* Scanner Frame */}
          <div className="relative aspect-square max-w-sm mx-auto mb-6">
            <motion.div
              animate={
                scanStatus === "scanning"
                  ? {
                      borderColor: ["#00e5cc", "#0066ff", "#00e5cc"],
                      boxShadow: [
                        "0 0 20px rgba(0, 229, 204, 0.5)",
                        "0 0 40px rgba(0, 102, 255, 0.5)",
                        "0 0 20px rgba(0, 229, 204, 0.5)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: scanStatus === "scanning" ? Infinity : 0 }}
              className="absolute inset-0 border-4 rounded-3xl"
              style={{
                borderColor:
                  scanStatus === "success"
                    ? "#10b981"
                    : scanStatus === "error"
                    ? "#ef4444"
                    : scanStatus === "warning"
                    ? "#f59e0b"
                    : "#00e5cc",
              }}
            >
              {/* Corner Brackets */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
                <motion.div
                  key={corner}
                  animate={scanStatus === "scanning" ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 1, repeat: scanStatus === "scanning" ? Infinity : 0 }}
                  className={`absolute w-8 h-8 border-[#00e5cc] ${
                    corner.includes("top") ? "top-0" : "bottom-0"
                  } ${corner.includes("left") ? "left-0" : "right-0"} ${
                    corner.includes("top")
                      ? corner.includes("left")
                        ? "border-t-4 border-l-4"
                        : "border-t-4 border-r-4"
                      : corner.includes("left")
                      ? "border-b-4 border-l-4"
                      : "border-b-4 border-r-4"
                  }`}
                />
              ))}
            </motion.div>

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {scanStatus === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                  >
                    <ScanLine size={80} className="text-[#00e5cc]/50" />
                  </motion.div>
                )}
                {scanStatus === "scanning" && (
                  <motion.div
                    key="scanning"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0 }}
                    transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" } }}
                  >
                    <ScanLine size={80} className="text-[#00e5cc]" />
                  </motion.div>
                )}
                {scanStatus === "success" && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle size={80} className="text-[#10b981]" fill="#10b981" />
                  </motion.div>
                )}
                {scanStatus === "error" && (
                  <motion.div
                    key="error"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1], rotate: [0, -10, 10, -10, 0] }}
                    exit={{ scale: 0 }}
                  >
                    <XCircle size={80} className="text-[#ef4444]" fill="#ef4444" />
                  </motion.div>
                )}
                {scanStatus === "warning" && (
                  <motion.div
                    key="warning"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1], rotate: [0, 5, -5, 5, 0] }}
                    exit={{ scale: 0 }}
                    transition={{ rotate: { duration: 0.5, repeat: 3 } }}
                  >
                    <AlertTriangle size={80} className="text-[#f59e0b]" fill="#f59e0b" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Scan Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScan}
            disabled={scanStatus === "scanning"}
            className="w-full bg-gradient-to-r from-[#00e5cc] to-[#00b8a9] rounded-2xl py-4 font-bold text-lg text-[#0f1219] relative overflow-hidden disabled:opacity-50"
            style={{ boxShadow: "0 8px 32px rgba(0, 229, 204, 0.3)" }}
          >
            <motion.div
              animate={{ x: scanStatus === "scanning" ? ["0%", "100%"] : "0%" }}
              transition={{ duration: 1, repeat: scanStatus === "scanning" ? Infinity : 0, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <span className="relative z-10">
              {scanStatus === "scanning" ? "Scanning..." : "Scan QR / NFC"}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Passenger Details */}
      <AnimatePresence>
        {passengerData && scanStatus !== "idle" && scanStatus !== "scanning" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="px-6 mb-8 relative z-10"
          >
            <div
              className="bg-[#1a1d2e] rounded-2xl p-6 border-2 relative overflow-hidden"
              style={{
                borderColor:
                  scanStatus === "success"
                    ? "#10b981"
                    : scanStatus === "error"
                    ? "#ef4444"
                    : "#f59e0b",
              }}
            >
              {/* Status Banner */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                className={`absolute top-0 left-0 right-0 h-1 ${
                  scanStatus === "success"
                    ? "bg-[#10b981]"
                    : scanStatus === "error"
                    ? "bg-[#ef4444]"
                    : "bg-[#f59e0b]"
                }`}
                style={{
                  boxShadow:
                    scanStatus === "success"
                      ? "0 0 20px rgba(16, 185, 129, 0.8)"
                      : scanStatus === "error"
                      ? "0 0 20px rgba(239, 68, 68, 0.8)"
                      : "0 0 20px rgba(245, 158, 11, 0.8)",
                }}
              />

              {/* Status Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <p
                  className={`text-xl font-bold ${
                    scanStatus === "success"
                      ? "text-[#10b981]"
                      : scanStatus === "error"
                      ? "text-[#ef4444]"
                      : "text-[#f59e0b]"
                  }`}
                >
                  {scanStatus === "success"
                    ? "✓ Verified Successfully"
                    : scanStatus === "error"
                    ? "✗ Verification Failed"
                    : "⚠ Payment Pending"}
                </p>
                <p className="text-gray-400 text-sm">
                  {scanStatus === "success"
                    ? "Passenger can board"
                    : scanStatus === "error"
                    ? "Invalid or expired ticket"
                    : "Verify payment before boarding"}
                </p>
              </motion.div>

              {/* Passenger Info */}
              <div className="space-y-3">
                <InfoRow icon={User} label="Passenger Name" value={passengerData.name} delay={0.3} />
                <InfoRow icon={Hash} label="Seat Number" value={passengerData.seat} delay={0.4} />
                <InfoRow icon={Hash} label="Booking ID" value={passengerData.bookingId} delay={0.5} />
                <InfoRow
                  icon={CreditCard}
                  label="Payment Status"
                  value={passengerData.payment.toUpperCase()}
                  delay={0.6}
                  valueColor={
                    passengerData.payment === "paid"
                      ? "#10b981"
                      : passengerData.payment === "pending"
                      ? "#f59e0b"
                      : "#ef4444"
                  }
                />
              </div>

              {/* Action Buttons */}
              {scanStatus === "warning" && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-[#f59e0b] rounded-xl py-3 font-semibold text-white"
                >
                  Manually Verify Payment
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConductorBottomNav active="verify" />
    </div>
  );
}

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
  valueColor?: string;
}

function InfoRow({ icon: Icon, label, value, delay, valueColor }: InfoRowProps) {
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
