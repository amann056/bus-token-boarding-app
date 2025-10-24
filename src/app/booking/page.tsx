"use client";

import { ChevronLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useState } from "react";

export default function BookingPage() {
  const [bookingForFriends, setBookingForFriends] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([10, 11]);

  const seats = Array.from({ length: 16 }, (_, i) => i + 1);
  const bookedSeats = [3, 7, 16];

  const toggleSeat = (seat: number) => {
    if (bookedSeats.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-6">
        <Link href="/" className="text-[#00e5cc]">
          <ChevronLeft size={28} />
        </Link>
        <h1 className="text-xl font-bold">Select Your Seat</h1>
        <div className="w-7" />
      </div>

      {/* Trip Info */}
      <div className="mx-6 mb-6 bg-[#1a1d2e] rounded-2xl p-5 border border-white/10">
        <h2 className="text-lg font-semibold mb-3">Bus Route 4A</h2>
        <div className="grid grid-cols-2 gap-y-1 text-sm">
          <span className="text-gray-400">Departure: 10:30 AM</span>
          <span className="text-gray-400 text-right">ETA: 11:45 AM</span>
          <span className="text-gray-400">ETA: 11:45 AM</span>
          <span className="text-gray-400 text-right">Seats: 2/30 booked</span>
        </div>
      </div>

      {/* Booking for Friends Toggle */}
      <div className="mx-6 mb-6 bg-[#1a1d2e] rounded-2xl p-5 flex items-center justify-between border border-white/10">
        <span className="font-medium">Booking for Friends</span>
        <button
          onClick={() => setBookingForFriends(!bookingForFriends)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            bookingForFriends ? "bg-[#00e5cc]" : "bg-[#252836]"
          }`}
        >
          <div
            className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
              bookingForFriends ? "translate-x-7" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Section Title */}
      <div className="mx-6 mb-4">
        <h3 className="text-lg font-semibold">Transaction History</h3>
      </div>

      {/* Bus Seat Layout */}
      <div className="mx-6 mb-6">
        <div className="bg-[#1a1d2e] rounded-3xl p-8 border-4 border-[#2a2d3e] relative">
          {/* Driver Section */}
          <div className="absolute top-4 left-4 w-12 h-10 rounded-lg border-2 border-[#2a2d3e] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#2a2d3e]" />
          </div>

          {/* Seats Grid */}
          <div className="mt-12 grid grid-cols-4 gap-3">
            {seats.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              
              return (
                <button
                  key={seat}
                  onClick={() => toggleSeat(seat)}
                  disabled={isBooked}
                  className={`relative aspect-[3/4] rounded-2xl border-2 transition-all ${
                    isBooked
                      ? "border-[#2a2d3e] bg-[#1a1d2e] cursor-not-allowed"
                      : isSelected
                      ? "border-[#00e5cc] bg-[#00e5cc]/20 scale-105 shadow-lg"
                      : "border-[#2a2d3e] bg-[#1a1d2e] hover:border-[#00e5cc]/50"
                  }`}
                  style={
                    isSelected
                      ? { boxShadow: "0 0 20px rgba(0, 229, 204, 0.4)" }
                      : undefined
                  }
                >
                  {/* Seat Number Badge */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00e5cc] flex items-center justify-center text-xs font-bold text-[#0f1219]">
                      +{selectedSeats.indexOf(seat) + 1}
                    </div>
                  )}
                  
                  {/* Booked Indicator */}
                  {isBooked && (
                    <div className="absolute bottom-2 right-2">
                      <div className="w-5 h-5 rounded-full bg-[#00e5cc] flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border-2 border-[#0f1219]" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Door Indicator */}
          <div className="absolute bottom-4 left-4 right-4 h-8 border-t-2 border-[#2a2d3e]" />
        </div>
      </div>

      {/* Confirm Button */}
      <div className="mx-6">
        <button
          className="w-full bg-[#00e5cc] text-[#0f1219] rounded-2xl py-4 font-bold text-lg flex items-center justify-between px-6 hover:scale-105 transition-transform"
          style={{
            boxShadow: "0 0 30px rgba(0, 229, 204, 0.4)",
          }}
        >
          <span>Confirm Booking</span>
          <div className="bg-[#0f1219]/20 rounded-xl px-4 py-1.5">
            <span className="text-sm font-bold">{selectedSeats.length} Selected</span>
          </div>
        </button>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
