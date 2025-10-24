import { Home, Wallet, Star, Layers } from "lucide-react";
import Link from "next/link";

interface BottomNavProps {
  active: "home" | "wallet" | "track" | "history";
}

export default function BottomNav({ active }: BottomNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "/" },
    { id: "wallet", icon: Wallet, label: "Wallet", href: "/wallet" },
    { id: "track", icon: Star, label: "Track", href: "/track" },
    { id: "history", icon: Layers, label: "History", href: "/history" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1d2e] border-t border-white/10 px-4 pb-6 pt-3">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-1 group relative"
            >
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-[#00e5cc] scale-110"
                    : "text-gray-400 group-hover:text-[#00e5cc]"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <div className="absolute inset-0 blur-xl bg-[#00e5cc]/40 -z-10 animate-pulse" />
                )}
              </div>
              <span
                className={`text-xs transition-all duration-300 ${
                  isActive
                    ? "text-[#00e5cc] font-semibold"
                    : "text-gray-400 group-hover:text-[#00e5cc]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
