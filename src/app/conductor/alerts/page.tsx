"use client";

import { Bell, AlertTriangle, CheckCircle, XCircle, Wifi, CreditCard, Users } from "lucide-react";
import ConductorBottomNav from "@/components/ConductorBottomNav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AlertType = "error" | "warning" | "success" | "info";

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "error",
      title: "Unverified Boarding Attempt",
      message: "Passenger with booking ID TF4821 attempted to board without valid verification.",
      time: "2 min ago",
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Payment Sync Pending",
      message: "3 passengers have pending payment verification. Check seat A12, B05, C08.",
      time: "5 min ago",
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "Trip Started Successfully",
      message: "Route 4A trip has been started. Live tracking is now active.",
      time: "15 min ago",
      read: true,
    },
    {
      id: "4",
      type: "info",
      title: "Network Connection Restored",
      message: "Payment verification system is back online. All systems operational.",
      time: "22 min ago",
      read: true,
    },
    {
      id: "5",
      type: "error",
      title: "Invalid Ticket Scanned",
      message: "QR code verification failed for passenger Alex Morrison. Ticket may be expired.",
      time: "28 min ago",
      read: true,
    },
  ]);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })));
  };

  const getAlertConfig = (type: AlertType) => {
    switch (type) {
      case "error":
        return {
          color: "#ef4444",
          icon: XCircle,
          bg: "rgba(239, 68, 68, 0.1)",
          border: "rgba(239, 68, 68, 0.3)",
        };
      case "warning":
        return {
          color: "#f59e0b",
          icon: AlertTriangle,
          bg: "rgba(245, 158, 11, 0.1)",
          border: "rgba(245, 158, 11, 0.3)",
        };
      case "success":
        return {
          color: "#10b981",
          icon: CheckCircle,
          bg: "rgba(16, 185, 129, 0.1)",
          border: "rgba(16, 185, 129, 0.3)",
        };
      case "info":
        return {
          color: "#00e5cc",
          icon: Wifi,
          bg: "rgba(0, 229, 204, 0.1)",
          border: "rgba(0, 229, 204, 0.3)",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-[#ef4444] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -80, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#f59e0b] rounded-full blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-14 pb-6 px-6 relative z-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Alerts</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time notifications</p>
          </div>
          <motion.div
            animate={unreadCount > 0 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="relative"
          >
            <Bell size={32} className="text-[#00e5cc]" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
              >
                {unreadCount}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Mark All as Read */}
      {unreadCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 mb-4 relative z-10"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={markAllAsRead}
            className="w-full bg-[#1a1d2e] border border-[#00e5cc]/30 rounded-xl py-3 font-semibold text-[#00e5cc] hover:border-[#00e5cc] transition-colors"
          >
            Mark All as Read
          </motion.button>
        </motion.div>
      )}

      {/* Alerts List */}
      <div className="px-6 space-y-3 relative z-10">
        <AnimatePresence>
          {alerts.map((alert, index) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => markAsRead(alert.id)}
                className="relative cursor-pointer"
              >
                <div
                  className={`bg-[#1a1d2e] rounded-2xl p-5 border-2 relative overflow-hidden transition-all ${
                    alert.read ? "opacity-60" : "opacity-100"
                  }`}
                  style={{
                    borderColor: config.border,
                    backgroundColor: alert.read ? "#1a1d2e" : config.bg,
                  }}
                >
                  {/* Unread indicator */}
                  {!alert.read && (
                    <>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{
                          backgroundColor: config.color,
                          boxShadow: `0 0 20px ${config.color}`,
                        }}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-5 right-5 w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: config.color,
                          boxShadow: `0 0 15px ${config.color}`,
                        }}
                      />
                    </>
                  )}

                  <div className="flex gap-4">
                    {/* Icon */}
                    <motion.div
                      animate={
                        !alert.read && alert.type === "error"
                          ? { rotate: [0, -10, 10, -10, 0] }
                          : {}
                      }
                      transition={{
                        duration: 0.5,
                        repeat: !alert.read && alert.type === "error" ? Infinity : 0,
                        repeatDelay: 2,
                      }}
                      className="flex-shrink-0"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: config.bg }}
                      >
                        <Icon size={24} style={{ color: config.color }} />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3
                          className="font-bold text-base"
                          style={{ color: alert.read ? "#9ca3af" : "white" }}
                        >
                          {alert.title}
                        </h3>
                      </div>
                      <p
                        className="text-sm mb-2 line-clamp-2"
                        style={{ color: alert.read ? "#6b7280" : "#9ca3af" }}
                      >
                        {alert.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{alert.time}</span>
                        {!alert.read && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-2 py-0.5 bg-[#00e5cc]/20 rounded-full text-xs font-semibold text-[#00e5cc]"
                          >
                            NEW
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover gradient effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${config.color}10, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 mt-6 relative z-10"
      >
        <h2 className="text-lg font-bold mb-3">Alert Summary</h2>
        <div className="grid grid-cols-3 gap-3">
          <QuickStatCard
            icon={XCircle}
            label="Errors"
            count={alerts.filter((a) => a.type === "error").length}
            color="#ef4444"
          />
          <QuickStatCard
            icon={AlertTriangle}
            label="Warnings"
            count={alerts.filter((a) => a.type === "warning").length}
            color="#f59e0b"
          />
          <QuickStatCard
            icon={CheckCircle}
            label="Resolved"
            count={alerts.filter((a) => a.type === "success").length}
            color="#10b981"
          />
        </div>
      </motion.div>

      <ConductorBottomNav active="alerts" />
    </div>
  );
}

interface QuickStatCardProps {
  icon: React.ElementType;
  label: string;
  count: number;
  color: string;
}

function QuickStatCard({ icon: Icon, label, count, color }: QuickStatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#1a1d2e] rounded-xl p-4 border border-white/10 text-center"
    >
      <div className="flex justify-center mb-2">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <motion.p
        key={count}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-2xl font-bold mb-1"
        style={{ color }}
      >
        {count}
      </motion.p>
      <p className="text-xs text-gray-400">{label}</p>
    </motion.div>
  );
}
