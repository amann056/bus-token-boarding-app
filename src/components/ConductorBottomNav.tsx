"use client";

import { Home, ScanLine, Users, Route, Bell } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ConductorBottomNavProps {
  active: "home" | "verify" | "seats" | "trip" | "alerts";
}

export default function ConductorBottomNav({ active }: ConductorBottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home, href: "/conductor" },
    { id: "verify", label: "Verify", icon: ScanLine, href: "/conductor/verify" },
    { id: "seats", label: "Seats", icon: Users, href: "/conductor/seats" },
    { id: "trip", label: "Trip", icon: Route, href: "/conductor/trip" },
    { id: "alerts", label: "Alerts", icon: Bell, href: "/conductor/alerts" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1d2e]/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-md mx-auto px-2 py-3">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            const Icon = tab.icon;
            
            return (
              <Link key={tab.id} href={tab.href} className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1 px-4 py-2"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#00e5cc]/20 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <Icon
                    size={24}
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-[#00e5cc]" : "text-gray-400"
                    }`}
                    style={
                      isActive
                        ? { filter: "drop-shadow(0 0 8px rgba(0, 229, 204, 0.6))" }
                        : {}
                    }
                  />
                  <span
                    className={`text-xs relative z-10 transition-colors duration-300 ${
                      isActive ? "text-[#00e5cc] font-semibold" : "text-gray-400"
                    }`}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
