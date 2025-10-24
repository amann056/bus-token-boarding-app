"use client";

import { Users, CheckCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28">
      {/* Header */}
      <div className="text-center pt-14 pb-6">
        <h1 className="text-2xl font-bold">Booking History</h1>
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

      {/* Trips List */}
      <div className="mx-6 space-y-4">
        {activeTab === "upcoming" && (
          <>
            {/* Upcoming Trip 1 */}
            <div
              className="rounded-3xl p-6 border-2 border-[#00e5cc] relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #00e5cc 0%, #00a896 100%)",
                boxShadow: "0 0 30px rgba(0, 229, 204, 0.3)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f1219]">Bus Route 4A</h3>
                  <p className="text-[#0f1219]/80 text-sm">Tomorrow at 10:30 AM</p>
                </div>
                <Users className="text-[#0f1219]/60" size={24} />
              </div>
              
              <div className="flex items-end justify-between">
                <div className="text-[#0f1219]">
                  <p className="text-lg font-semibold">Seat(s) 12, 13, 14</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#0f1219]/80">Cost: 45 Tokens</p>
                </div>
              </div>
            </div>

            {/* Upcoming Trip 2 */}
            <div className="bg-[#1a1d2e] rounded-3xl p-6 border-2 border-[#00e5cc] relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0">
                  <Users className="text-gray-400" size={22} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Bus Route 2B</h3>
                  <p className="text-gray-400 text-sm mb-1">Yesterday at 10:30 AM</p>
                  <p className="text-gray-400 text-sm mb-4">1021, 110 min</p>
                  
                  <button className="w-full bg-[#00e5cc] text-[#0f1219] rounded-xl py-3 font-bold hover:scale-105 transition-transform">
                    View Ticket
                  </button>
                </div>
                
                <div className="text-right">
                  <Users className="text-gray-400 mb-1" size={20} />
                  <p className="text-xs text-gray-400">Friends Booked</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "past" && (
          <>
            {/* Past Trip 1 */}
            <div className="bg-[#1a1d2e] rounded-3xl p-6 border border-white/10 relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0">
                  <Users className="text-gray-400" size={22} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Bus Route 1B</h3>
                  <p className="text-gray-400 text-sm mb-1">Yesterday at 6:00 PM</p>
                  <p className="text-gray-400 text-sm">2021, 110 min</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <CheckCircle size={16} />
                    <span>Completed</span>
                  </div>
                  <p className="text-lg font-bold text-[#00e5cc]">+7</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <button className="text-[#00e5cc] text-sm font-medium hover:underline">
                  Rate Trip
                </button>
              </div>
            </div>

            {/* Past Trip 2 - Token Purchase */}
            <div className="bg-[#1a1d2e] rounded-3xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-gray-400" size={22} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Token Purchase</h3>
                  <p className="text-gray-400 text-sm">Jan 5, 2023 at 8:15 AM</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <button className="text-gray-400 text-sm font-medium hover:text-[#00e5cc]">
                  View Receipt
                </button>
              </div>
            </div>

            {/* Past Trip 3 */}
            <div className="bg-[#1a1d2e] rounded-3xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0">
                  <Users className="text-gray-400" size={22} />
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-400 text-sm">1021, 110 min</p>
                </div>
                
                <button className="text-gray-400 text-sm font-medium hover:text-[#00e5cc]">
                  Rate Trip
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNav active="history" />
    </div>
  );
}
