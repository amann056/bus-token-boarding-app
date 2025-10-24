"use client";

import { ChevronLeft, Plus, User, Check } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useState } from "react";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<"myself" | "friend">("myself");

  const transactions = [
    {
      id: 1,
      type: "fare",
      title: "Bus Route 4A Fare",
      date: "2021, 110 min",
      amount: "+22,000",
      icon: "user",
    },
    {
      id: 2,
      type: "purchase",
      title: "Token Purchase",
      date: "10,0 1:54 minin",
      amount: "- 1,54",
      icon: "check",
    },
    {
      id: 3,
      type: "purchase",
      title: "Token Purchase",
      date: "8,1 1:10 min",
      amount: "- 2,10",
      icon: "check",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-6">
        <Link href="/" className="text-[#00e5cc]">
          <ChevronLeft size={28} />
        </Link>
        <h1 className="text-xl font-bold">Wallet</h1>
        <div className="w-7" />
      </div>

      {/* Token Display */}
      <div className="text-center py-8">
        <h2 className="text-7xl font-bold text-[#00e5cc] mb-2">185</h2>
        <div className="flex items-center justify-center gap-2 text-gray-300">
          <span>Current Tokens</span>
          <svg
            width="18"
            height="18"
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
      </div>

      {/* Buy More Tokens Card */}
      <div className="mx-6 mb-6">
        <div className="bg-[#1a1d2e] rounded-2xl border-2 border-[#00e5cc] p-6">
          <h3 className="text-lg font-semibold mb-4">Buy More Tokens</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("myself")}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === "myself"
                  ? "bg-[#00e5cc] text-[#0f1219]"
                  : "bg-[#252836] text-gray-300 hover:bg-[#2d3142]"
              }`}
            >
              For Myself
            </button>
            <button
              onClick={() => setActiveTab("friend")}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === "friend"
                  ? "bg-[#00e5cc] text-[#0f1219]"
                  : "bg-[#252836] text-gray-300 hover:bg-[#2d3142]"
              }`}
            >
              For a Friend
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-6 mb-6 flex gap-3 overflow-x-auto pb-2">
        <div className="bg-[#1a1d2e] rounded-xl p-4 flex items-center gap-3 min-w-[180px] border border-white/10">
          <div className="w-10 h-10 rounded-full bg-[#252836] flex items-center justify-center">
            <User className="text-gray-400" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium">Bus Route 4A Fare</p>
            <p className="text-xs text-gray-400">20 ? 2? min ln</p>
          </div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4 flex items-center gap-3 min-w-[180px] border border-white/10">
          <div className="w-10 h-10 rounded-full bg-[#252836] flex items-center justify-center">
            <User className="text-gray-400" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium">8:1</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mx-6">
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-[#1a1d2e] rounded-xl p-4 flex items-center justify-between border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center">
                  {transaction.icon === "user" ? (
                    <User className="text-gray-400" size={22} />
                  ) : (
                    <Check className="text-gray-400" size={22} />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
              <span
                className={`text-lg font-semibold ${
                  transaction.amount.startsWith("+")
                    ? "text-[#00e5cc]"
                    : "text-red-400"
                }`}
              >
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-[#00e5cc] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{
          boxShadow: "0 0 30px rgba(0, 229, 204, 0.6)",
        }}
      >
        <Plus className="text-[#0f1219]" size={32} strokeWidth={3} />
      </button>

      <BottomNav active="wallet" />
    </div>
  );
}
