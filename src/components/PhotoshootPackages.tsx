import React, { useState } from "react";
import { PhotoshootCategory, PriceOption } from "../types";
import { ThreeDCard } from "./ThreeDCard";
import { Baby, Car, Home, Heart, Check, Sparkles, CalendarDays, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PhotoshootPackagesProps {
  categories: PhotoshootCategory[];
  onBookPackageClick: (category: PhotoshootCategory, option: PriceOption) => void;
  isLight: boolean;
}

// Minimalist flat styling. No gradients.
const CATEGORY_STYLES: Record<string, { bgImage: string; color: string; colorLight: string; modalLight: string; modalDark: string; btnClassLight: string; btnClassDark: string }> = {
  "baby-shoot": {
    bgImage: "package/Baby_Shoot_Baby_Shower.png",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "glass-panel-light",
    modalDark: "glass-panel-dark",
    btnClassLight: "bg-white/50 hover:bg-white/80 text-black backdrop-blur-xl shadow-lg border border-white/40",
    btnClassDark: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl shadow-lg border border-white/10",
  },
  "car-bike": {
    bgImage: "package/Car_Bike_Delivery.png",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "glass-panel-light",
    modalDark: "glass-panel-dark",
    btnClassLight: "bg-white/50 hover:bg-white/80 text-black backdrop-blur-xl shadow-lg border border-white/40",
    btnClassDark: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl shadow-lg border border-white/10",
  },
  "traditional-house": {
    bgImage: "package/Traditional_House_Warming.png",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "glass-panel-light",
    modalDark: "glass-panel-dark",
    btnClassLight: "bg-white/50 hover:bg-white/80 text-black backdrop-blur-xl shadow-lg border border-white/40",
    btnClassDark: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl shadow-lg border border-white/10",
  },
  "pre-wedding": {
    bgImage: "package/Pre_Wedding.png",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "glass-panel-light",
    modalDark: "glass-panel-dark",
    btnClassLight: "bg-white/50 hover:bg-white/80 text-black backdrop-blur-xl shadow-lg border border-white/40",
    btnClassDark: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl shadow-lg border border-white/10",
  }
};

export function PhotoshootPackages({ categories, onBookPackageClick, isLight }: PhotoshootPackagesProps) {
  const [selectedCategory, setSelectedCategory] = useState<PhotoshootCategory | null>(null);

  const headingCls = isLight ? "text-[#171717]" : "text-[#FAFAFA]";
  const subCls = isLight ? "text-[#71717A]" : "text-[#A1A1AA]";
  const border = isLight ? "border-[#E4E4E7]" : "border-[#52525B]/12";

  const renderIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "Baby":  return <Baby className={className} />;
      case "Car":   return <Car className={className} />;
      case "Home":  return <Home className={className} />;
      case "Heart": return <Heart className={className} />;
      default:      return <Sparkles className={className} />;
    }
  };

  // Close modal when clicking escape
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCategory(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      id="packages"
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500 bg-transparent ${border}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className={`text-[10px] uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 mb-3 ${isLight ? "text-[#171717]" : "text-white"}`}>
            <span className={`w-6 h-px ${isLight ? "bg-[#171717]" : "bg-white"}`} />
            <Sparkles className="w-3 h-3" />
            <span className="font-serif italic capitalize text-xl tracking-normal font-semibold">1FS Photography</span>
            <span className={`w-6 h-px ${isLight ? "bg-[#171717]" : "bg-white"}`} />
          </span>
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-serif font-black leading-tight mb-4 ${headingCls}`}>
            Premium Photoshoot
          </h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${subCls}`}>
            Select a theme below to view our curated shoot packages. Every package is crafted to deliver breathtaking visuals and unforgettable memories.
          </p>
        </motion.div>

        {/* 2x2 Immersive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat, idx) => {
            const style = CATEGORY_STYLES[cat.id] || CATEGORY_STYLES["baby-shoot"];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setSelectedCategory(cat)}
                className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl flex flex-col sm:block h-auto sm:aspect-video md:aspect-[4/3] lg:aspect-[16/10] bg-[#18181B]"
              >
                {/* Image Section (Top on mobile, Absolute fill on desktop) */}
                <div className="relative w-full aspect-[4/3] sm:absolute sm:inset-0 sm:h-full">
                  <img 
                    src={style.bgImage} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover sm:object-cover sm:transition-transform sm:duration-1000 sm:group-hover:scale-110"
                  />
                  {/* Gradient only on desktop to make text readable */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-colors duration-500" />
                </div>
                
                {/* Content Section (Bottom block on mobile, Absolute bottom on desktop) */}
                <div className="relative sm:absolute sm:inset-0 p-6 sm:p-8 flex flex-col justify-end z-10 sm:bg-none bg-gradient-to-t from-[#09090B] to-[#18181B] border-t sm:border-0 border-[#52525B]/20">
                  <div className="transform sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md sm:border border-white/20"
                      style={{ backgroundColor: `${style.color}40` }}
                    >
                      {renderIcon(cat.icon, "w-6 h-6 text-white")}
                    </div>
                    
                    <h3 className="fluid-text-h3 font-serif font-bold text-white mb-2 leading-tight">
                      {cat.name}
                    </h3>
                    
                    <p className="text-[#A1A1AA] text-xs sm:text-sm line-clamp-2 max-w-sm font-light">
                      {cat.description}
                    </p>
                    
                    {/* Hover Button Reveal */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <button className="px-6 py-2.5 bg-white text-black rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-gray-100 transition-colors">
                        View Packages <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pricing Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] sm:top-10 sm:bottom-10 sm:max-w-2xl sm:mx-auto sm:h-fit shadow-2xl border ${
                isLight ? "liquid-glass-light" : "liquid-glass-dark"
              }`}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center border z-20 transition-colors ${
                  isLight ? "bg-white border-[#E4E4E7] text-[#171717] hover:bg-gray-50" : "bg-[#18181B] border-[#52525B]/30 text-[#A1A1AA] hover:bg-[#52525B]/20"
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#52525B] to-[#71717A] flex items-center justify-center shadow-lg">
                    {renderIcon(selectedCategory.icon, "w-7 h-7 text-white")}
                  </div>
                  <div>
                    <h3 className={`text-2xl sm:text-4xl font-serif font-black ${headingCls}`}>
                      {selectedCategory.name}
                    </h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#52525B] font-bold">
                      Pricing & Inclusions
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm max-w-3xl mb-10 ${subCls}`}>
                  {selectedCategory.description} All tiers include professional cameras and expert editing. Select a package below to book your date.
                </p>

                {/* Pricing Cards Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ${
                  selectedCategory.prices.length >= 3 ? "xl:grid-cols-3" : ""
                }`}>
                  {selectedCategory.prices.map((option, i) => {
                    const maxPrice = Math.max(...selectedCategory.prices.map(p => p.price));
                    const premium = option.price === maxPrice;
                    return (
                      <ThreeDCard key={i} isLight={isLight} className={`h-full ${premium ? (isLight ? "bg-amber-50/30 border-amber-200" : "bg-amber-900/10 border-amber-500/30") : ""}`} glowColor={premium ? "rgba(251,191,36,0.4)" : "rgba(14,107,168,0.2)"}>
                        <div className="flex flex-col h-full justify-between p-1">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-[10px] uppercase tracking-widest font-mono border py-1.5 px-3 rounded-full font-bold ${
                                premium 
                                  ? (isLight ? "bg-amber-100 text-amber-700 border-amber-300 shadow-sm" : "bg-amber-900/40 text-amber-400 border-amber-700/50 shadow-[0_0_10px_rgba(251,191,36,0.2)]") 
                                  : (isLight ? "bg-[#52525B]/10 text-[#52525B] border-[#52525B]/20" : "bg-[#52525B]/20 text-[#A1A1AA] border-[#52525B]/30")
                              }`}>
                                {option.label}
                              </span>
                              {premium && (
                                <motion.span 
                                  animate={{ scale: [1, 1.05, 1] }} 
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className={`flex items-center gap-1 text-[9px] uppercase font-mono px-2.5 py-1 rounded-full border font-bold ${
                                    isLight ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  }`}
                                >
                                  <Star className="w-3 h-3 fill-current" /> Best Value
                                </motion.span>
                              )}
                            </div>
                            <div className={`flex items-baseline gap-1.5 pb-4 border-b mb-5 ${border}`}>
                              <span className={`text-3xl sm:text-4xl font-serif font-black ${
                                premium 
                                  ? (isLight ? "text-amber-600 drop-shadow-sm" : "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]") 
                                  : (isLight ? "text-gradient-ocean" : "text-white")
                              }`}>
                                ₹{option.price.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <ul className="space-y-3">
                              {option.features.map((feat, idx) => (
                                <li key={idx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isLight ? "text-[#171717]" : "text-[#FAFAFA]"}`}>
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                    premium ? (isLight ? "bg-amber-100" : "bg-amber-900/40") : "bg-[#71717A]/10"
                                  }`}>
                                    <Check className={`w-3 h-3 ${
                                      premium ? (isLight ? "text-amber-600" : "text-amber-400") : "text-[#71717A]"
                                    }`} />
                                  </div>
                                  <span className="leading-snug">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-8 pt-4">
                            <button
                              onClick={() => {
                                onBookPackageClick(selectedCategory, option);
                                setSelectedCategory(null);
                              }}
                              className={`w-full py-3 px-4 border font-bold rounded-xl text-xs uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                premium
                                  ? (isLight ? "bg-amber-600 text-white hover:bg-amber-700 shadow-md border-transparent" : "bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] border-transparent")
                                  : (isLight
                                      ? "bg-transparent border-black/20 text-black hover:bg-black hover:text-white"
                                      : "bg-transparent border-white/20 text-white hover:bg-white hover:text-black hover:border-transparent")
                              }`}
                            >
                              <CalendarDays className="w-4 h-4" />
                              Book This Rate
                            </button>
                          </div>
                        </div>
                      </ThreeDCard>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
