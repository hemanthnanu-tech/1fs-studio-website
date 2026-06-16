import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Camera, ChevronDown, Instagram, Sparkles, ArrowRight } from "lucide-react";
import { STUDIO_STATISTICS } from "../data";

interface HeroSectionProps {
  isLight: boolean;
}

const STATS = [
  { value: "500+", label: "Shoots Delivered" },
  { value: "4K", label: "Production Grade" },
  { value: "4.9★", label: "Client Rating" },
];

export function HeroSection({ isLight }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 20);
    setMouseY(((e.clientY - rect.top) / rect.height - 0.5) * 15);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 transition-colors duration-700 ${
        isLight
          ? "bg-[#FAFAFA]"
          : "bg-[#09090B]"
      }`}
    >
      {/* Grid overlay */}
      <div className={`absolute inset-0 pointer-events-none ${isLight ? "bg-ocean-grid-light" : "bg-ocean-grid"}`} />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[130px]"
          style={{ background: isLight ? "rgba(14,107,168,0.10)" : "rgba(14,107,168,0.18)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full blur-[120px]"
          style={{ background: isLight ? "rgba(106,90,205,0.07)" : "rgba(106,90,205,0.12)" }}
        />
      </div>

      {/* 3D HUD Aperture — hidden on very small screens */}
      <div
        className={`absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none ${isLight ? "opacity-12" : "opacity-18"}`}
        style={{ transform: `translate(${mouseX * 0.4}px, ${mouseY * 0.4}px)` }}
      >
        <div className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full border border-dashed border-[#52525B]/40 relative flex items-center justify-center animate-spin-slow">
          <div className="w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full border border-[#71717A]/25 flex items-center justify-center">
            <div className="w-[140px] sm:w-[200px] h-[140px] sm:h-[200px] rounded-full border border-[#A1A1AA]/15 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#52525B] rounded-full animate-pulse-ocean" />
            </div>
          </div>
          <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#52525B]/60" />
          <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#52525B]/60" />
          <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#52525B]/60" />
          <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#52525B]/60" />
        </div>
      </div>

      {/* Wave SVG bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none" style={{ height: 60 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-[200%] h-full animate-wave" fill="none">
          <path d="M0,30 C180,52 360,8 540,30 C720,52 900,8 1080,30 C1260,52 1440,8 1440,30 L1440,60 L0,60 Z"
            fill={isLight ? "rgba(14,107,168,0.05)" : "rgba(14,107,168,0.08)"} />
        </svg>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity }}
        className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center"
      >
        {/* Designer badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`group inline-flex items-center gap-2 border px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all mb-8 ${
            isLight
              ? "bg-white/80 backdrop-blur border-[#E4E4E7] text-[#171717]"
              : "bg-[#18181B]/70 backdrop-blur border-[#52525B]/20 text-[#A1A1AA]"
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#52525B]" />
          <span><strong className={isLight ? "text-[#171717]" : "text-white"}>1FS Photography</strong></span>
          <Sparkles className="w-3 h-3 text-[#52525B] animate-twinkle" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
        >
          <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.85] mb-6 sm:mb-8 text-center flex flex-col items-center select-none ${
            isLight ? "text-[#171717]" : "text-white"
          }`}>
            Capture <span>Cinematic</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span>Moments & Rent Gear</span>
          </h1>

          <p className={`mt-5 sm:mt-7 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-500 ${
            isLight ? "text-[#71717A]" : "text-[#A1A1AA]"
          }`}>
            Uncompromising professional photography storytellers & ultra-flexible camera rentals for your creative shoots. Rent expert equipment like{" "}
            <strong className="text-[#52525B]">Sony ZV-E10</strong>,{" "}
            <strong className="text-[#52525B]">Nikon D3400</strong>, and{" "}
            <strong className="text-[#71717A]">DJI RS4 Gimbal</strong> instantly.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-book-shoot-btn"
            onClick={() => scrollTo("packages")}
            className={`btn-ripple px-6 sm:px-8 h-12 sm:h-14 font-semibold rounded-2xl text-xs sm:text-sm uppercase tracking-widest font-mono flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              isLight ? "bg-[#171717] text-white" : "bg-white text-black"
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            Book Full Photoshoot
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            id="hero-rent-gear-btn"
            onClick={() => scrollTo("rentals")}
            className={`btn-ripple px-6 sm:px-8 h-12 sm:h-14 border rounded-2xl text-xs sm:text-sm uppercase tracking-widest font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isLight
                ? "glass-light text-[#171717] hover:border-[#52525B]/60 hover:shadow-sm"
                : "glass-dark text-[#A1A1AA] hover:border-[#52525B]/50 hover:text-[#FAFAFA]"
            }`}
          >
            <Camera className="w-4 h-4 shrink-0 text-[#52525B]" />
            Rent Camera Gear
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className={`mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 border-t pt-6 sm:pt-8 w-full max-w-sm sm:max-w-lg mx-auto transition-colors duration-500 ${
            isLight ? "border-[#E4E4E7]" : "border-[#52525B]/15"
          }`}
        >
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className={`text-xl sm:text-2xl font-serif font-black ${isLight ? "text-[#171717]" : "text-white"}`}>{value}</span>
              <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mt-1 ${
                isLight ? "text-[#71717A]" : "text-[#A1A1AA]"
              }`}>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          {["WhatsApp Booking", "Verified 4K Gear", "Flexible Daily Rates"].map((feat, i) => (
            <span key={i} className={`inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border ${
              isLight
                ? "bg-[#52525B]/5 border-[#52525B]/15 text-[#52525B]"
                : "bg-[#52525B]/8 border-[#52525B]/20 text-[#A1A1AA]"
            }`}>
              <span className="w-1 h-1 bg-[#71717A] rounded-full" />
              {feat}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 cursor-pointer animate-bounce-soft z-10"
        onClick={() => scrollTo("packages")}
      >
        <span className={`text-[9px] font-mono uppercase tracking-widest ${isLight ? "text-[#71717A]" : "text-[#A1A1AA]"}`}>Explore</span>
        <ChevronDown className="w-4 h-4 text-[#52525B]" />
      </div>
    </div>
  );
}
