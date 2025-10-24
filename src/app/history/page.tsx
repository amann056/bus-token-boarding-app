"use client";

import { Users, CheckCircle, Star, Sparkles, Award } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1219] text-white pb-28 relative overflow-hidden">
      {/* Animated Background Gradient Blobs */}
      <motion.div
        className="absolute top-20 -right-20 w-96 h-96 bg-[#00e5cc]/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#00e5cc]/10 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header */}
      <motion.div 
        className="text-center pt-14 pb-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-2xl font-bold"
          animate={{
            textShadow: [
              "0 0 10px rgba(0, 229, 204, 0)",
              "0 0 20px rgba(0, 229, 204, 0.3)",
              "0 0 10px rgba(0, 229, 204, 0)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Booking History
        </motion.h1>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="mx-6 mb-6 flex gap-3 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all relative overflow-hidden ${
            activeTab === "upcoming"
              ? "bg-[#00e5cc] text-[#0f1219]"
              : "bg-[#1a1d2e] text-gray-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === "upcoming" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          )}
          <span className="relative z-10">Upcoming Trips</span>
        </motion.button>
        <motion.button
          onClick={() => setActiveTab("past")}
          className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all relative overflow-hidden ${
            activeTab === "past"
              ? "bg-[#00e5cc] text-[#0f1219]"
              : "bg-[#1a1d2e] text-gray-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeTab === "past" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          )}
          <span className="relative z-10">Past Trips</span>
        </motion.button>
      </motion.div>

      {/* Trips List */}
      <div className="mx-6 space-y-4 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" && (
            <motion.div
              key="upcoming"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Upcoming Trip 1 - Featured */}
              <motion.div
                variants={cardVariants}
                onHoverStart={() => setHoveredCard("upcoming-1")}
                onHoverEnd={() => setHoveredCard(null)}
                className="rounded-3xl p-6 border-2 border-[#00e5cc] relative overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #00e5cc 0%, #00a896 100%)",
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(0, 229, 204, 0.5)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated sparkle particles */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Sparkles className="text-[#0f1219]/40" size={20} />
                </motion.div>

                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                  animate={{
                    opacity: hoveredCard === "upcoming-1" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div>
                    <motion.h3 
                      className="text-2xl font-bold text-[#0f1219]"
                      animate={hoveredCard === "upcoming-1" ? { x: [0, 5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      Bus Route 4A
                    </motion.h3>
                    <p className="text-[#0f1219]/80 text-sm">Tomorrow at 10:30 AM</p>
                  </div>
                  <motion.div
                    animate={hoveredCard === "upcoming-1" ? { 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="text-[#0f1219]/60" size={24} />
                  </motion.div>
                </div>
                
                <div className="flex items-end justify-between relative z-10">
                  <div className="text-[#0f1219]">
                    <p className="text-lg font-semibold">Seat(s) 12, 13, 14</p>
                  </div>
                  <motion.div 
                    className="text-right"
                    animate={hoveredCard === "upcoming-1" ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-sm text-[#0f1219]/80">Cost: 45 Tokens</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Upcoming Trip 2 */}
              <motion.div 
                variants={cardVariants}
                onHoverStart={() => setHoveredCard("upcoming-2")}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-[#1a1d2e] rounded-3xl p-6 border-2 border-[#00e5cc] relative overflow-hidden cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "#00e5cc",
                  boxShadow: "0 0 30px rgba(0, 229, 204, 0.3)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00e5cc]/5 via-transparent to-transparent"
                  animate={{
                    opacity: hoveredCard === "upcoming-2" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#00e5cc",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Users className="text-gray-400" size={22} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold mb-1"
                      animate={hoveredCard === "upcoming-2" ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      Bus Route 2B
                    </motion.h3>
                    <p className="text-gray-400 text-sm mb-1">Yesterday at 10:30 AM</p>
                    <p className="text-gray-400 text-sm mb-4">1021, 110 min</p>
                    
                    <motion.button 
                      className="w-full bg-[#00e5cc] text-[#0f1219] rounded-xl py-3 font-bold relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(0, 229, 204, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10">View Ticket</span>
                    </motion.button>
                  </div>
                  
                  <motion.div 
                    className="text-right"
                    animate={hoveredCard === "upcoming-2" ? { 
                      y: [0, -5, 0]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="text-gray-400 mb-1" size={20} />
                    <p className="text-xs text-gray-400">Friends Booked</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "past" && (
            <motion.div
              key="past"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Past Trip 1 */}
              <motion.div 
                variants={cardVariants}
                onHoverStart={() => setHoveredCard("past-1")}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-[#1a1d2e] rounded-3xl p-6 border border-white/10 relative overflow-hidden cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(0, 229, 204, 0.5)",
                  boxShadow: "0 0 25px rgba(0, 229, 204, 0.2)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00e5cc]/5 via-transparent to-transparent"
                  animate={{
                    opacity: hoveredCard === "past-1" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      backgroundColor: "#00e5cc",
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Users className="text-gray-400" size={22} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold mb-1"
                      animate={hoveredCard === "past-1" ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      Bus Route 1B
                    </motion.h3>
                    <p className="text-gray-400 text-sm mb-1">Yesterday at 6:00 PM</p>
                    <p className="text-gray-400 text-sm">2021, 110 min</p>
                  </div>
                  
                  <div className="text-right">
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-400 mb-2"
                      animate={hoveredCard === "past-1" ? { 
                        scale: [1, 1.05, 1]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle size={16} />
                      <span>Completed</span>
                    </motion.div>
                    <motion.p 
                      className="text-lg font-bold text-[#00e5cc]"
                      animate={{
                        textShadow: hoveredCard === "past-1" 
                          ? ["0 0 10px rgba(0, 229, 204, 0.5)", "0 0 20px rgba(0, 229, 204, 0.8)", "0 0 10px rgba(0, 229, 204, 0.5)"]
                          : "0 0 0px rgba(0, 229, 204, 0)"
                      }}
                      transition={{ duration: 1 }}
                    >
                      +7
                    </motion.p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <motion.button 
                    className="text-[#00e5cc] text-sm font-medium flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star size={14} className="group-hover:fill-[#00e5cc] transition-all" />
                    Rate Trip
                  </motion.button>
                </div>
              </motion.div>

              {/* Past Trip 2 - Token Purchase */}
              <motion.div 
                variants={cardVariants}
                onHoverStart={() => setHoveredCard("past-2")}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-[#1a1d2e] rounded-3xl p-6 border border-white/10 relative overflow-hidden cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(0, 229, 204, 0.5)",
                  boxShadow: "0 0 25px rgba(0, 229, 204, 0.2)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00e5cc]/5 via-transparent to-transparent"
                  animate={{
                    opacity: hoveredCard === "past-2" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      backgroundColor: "#00e5cc",
                      transition: { duration: 0.5 }
                    }}
                  >
                    <CheckCircle className="text-gray-400" size={22} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold mb-1"
                      animate={hoveredCard === "past-2" ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      Token Purchase
                    </motion.h3>
                    <p className="text-gray-400 text-sm">Jan 5, 2023 at 8:15 AM</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <motion.button 
                    className="text-gray-400 text-sm font-medium hover:text-[#00e5cc] transition-colors"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Receipt →
                  </motion.button>
                </div>
              </motion.div>

              {/* Past Trip 3 */}
              <motion.div 
                variants={cardVariants}
                onHoverStart={() => setHoveredCard("past-3")}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-[#1a1d2e] rounded-3xl p-6 border border-white/10 relative overflow-hidden cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "rgba(0, 229, 204, 0.5)",
                  boxShadow: "0 0 25px rgba(0, 229, 204, 0.2)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#00e5cc]/5 via-transparent to-transparent"
                  animate={{
                    opacity: hoveredCard === "past-3" ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-start gap-4 relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-[#252836] flex items-center justify-center flex-shrink-0"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      backgroundColor: "#00e5cc",
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Users className="text-gray-400" size={22} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm">1021, 110 min</p>
                  </div>
                  
                  <motion.button 
                    className="text-gray-400 text-sm font-medium hover:text-[#00e5cc] transition-colors flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star size={14} className="group-hover:fill-[#00e5cc] transition-all" />
                    Rate Trip
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav active="history" />
    </div>
  );
}