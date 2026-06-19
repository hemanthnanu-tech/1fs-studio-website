import React, { useState, useEffect } from "react";
import { UserCheck, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onAdminClick: () => void;
  bookingsCount: number;
  isLight: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ onAdminClick, bookingsCount, isLight, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Shoot Packages", href: "#packages" },
    { label: "Camera Rentals", href: "#rentals" },
    { label: "Contact", href: "#developer" },
  ];

  const navBg = scrolled
    ? isLight
      ? "border-b border-[#E4E4E7] bg-white/90 backdrop-blur-xl shadow-sm"
      : "border-b border-[#52525B]/15 bg-[#09090B]/92 backdrop-blur-xl shadow-sm"
    : isLight
      ? "bg-[#FAFAFA]/95 border-b border-[#E4E4E7]/60"
      : "bg-[#09090B]/95 border-b border-[#52525B]/10";

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-500 ${navBg}`}>
      <div className="mx-auto flex max-w-7xl h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Brand Logo ── */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          {/* Solid icon badge */}
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
            <div className={`absolute inset-0 transition-all duration-500 group-hover:scale-110 ${isLight ? "bg-[#171717]" : "bg-white"}`} />
            <span className={`relative z-10 font-sans font-black text-sm sm:text-base tracking-tight ${isLight ? "text-white" : "text-black"}`}>1F</span>
          </div>

          <div className="min-w-0">
            {/* Signature font for studio name */}
            <div className="flex items-center gap-1.5">
              <span className={`font-serif italic text-2xl sm:text-3xl leading-none transition-colors duration-500 tracking-tight ${
                isLight ? "text-[#171717]" : "text-[#FAFAFA]"
              }`}>
                1FS Photography
              </span>
              <span className="w-1.5 h-1.5 bg-[#71717A] rounded-full animate-pulse-ocean hidden sm:block" />
            </div>
            <p className={`text-[8px] sm:text-[9px] uppercase tracking-widest font-mono transition-colors duration-500 ${
              isLight ? "text-[#71717A]" : "text-[#A1A1AA]"
            }`}>
              Premium Camera Rental & Studio
            </p>
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative text-[11px] font-mono tracking-widest uppercase font-semibold transition-colors duration-300 group ${
                isLight ? "text-[#71717A] hover:text-[#52525B]" : "text-[#A1A1AA] hover:text-[#A1A1AA]"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${isLight ? "bg-[#171717]" : "bg-white"}`} />
            </a>
          ))}
        </nav>

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-all duration-300 cursor-pointer ${
              isLight
                ? "bg-[#FAFAFA] border-[#E4E4E7] hover:border-[#52525B]/50 text-[#52525B]"
                : "bg-[#18181B] border-[#52525B]/20 hover:border-[#52525B]/50 text-[#A1A1AA]"
            }`}
          >
            <AnimatePresence mode="wait">
              {isLight ? (
                <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Admin */}
          <button
            id="admin-gateway-btn"
            onClick={onAdminClick}
            className={`hidden sm:flex items-center gap-1.5 px-3 sm:px-4 h-9 sm:h-10 border rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer group ${
              isLight
                ? "bg-white border-[#E4E4E7] text-[#171717] hover:border-[#52525B]/60 hover:bg-[#FAFAFA]"
                : "bg-[#18181B] border-[#52525B]/20 text-[#A1A1AA] hover:border-[#52525B]/50 hover:text-[#FAFAFA]"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#52525B]" />
            <span>Admin</span>
          </button>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
              isLight ? "border-[#E4E4E7] bg-white text-[#171717]" : "border-[#52525B]/20 bg-[#18181B] text-[#A1A1AA]"
            }`}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className={`absolute top-full left-0 w-full overflow-hidden border-t border-b shadow-2xl md:hidden z-50 ${
              isLight ? "border-[#E4E4E7] bg-white/95 backdrop-blur-xl" : "border-[#52525B]/15 bg-[#09090B]/95 backdrop-blur-xl"
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`flex items-center gap-2.5 py-3 px-4 rounded-xl text-sm font-mono transition-all ${
                    isLight
                      ? "text-[#171717] hover:bg-[#FAFAFA] hover:text-[#52525B]"
                      : "text-[#A1A1AA] hover:bg-[#52525B]/10 hover:text-[#FAFAFA]"
                  }`}
                >
                  <span className="w-1 h-1 bg-[#52525B] rounded-full" />
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { onAdminClick(); setMobileOpen(false); }}
                className={`w-full flex items-center gap-2.5 py-3 px-4 rounded-xl text-sm font-mono transition-all ${
                  isLight ? "text-[#52525B] hover:bg-[#FAFAFA]" : "text-[#52525B] hover:bg-[#52525B]/10"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Admin Gateway
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
