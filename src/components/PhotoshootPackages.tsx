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
    bgImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "bg-white border-black/10",
    modalDark: "bg-[#09090B] border-white/10",
    btnClassLight: "bg-[#171717] text-white hover:bg-black",
    btnClassDark: "bg-white text-black hover:bg-gray-200",
  },
  "car-bike": {
    bgImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1000",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "bg-white border-black/10",
    modalDark: "bg-[#09090B] border-white/10",
    btnClassLight: "bg-[#171717] text-white hover:bg-black",
    btnClassDark: "bg-white text-black hover:bg-gray-200",
  },
  "traditional-house": {
    bgImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "bg-white border-black/10",
    modalDark: "bg-[#09090B] border-white/10",
    btnClassLight: "bg-[#171717] text-white hover:bg-black",
    btnClassDark: "bg-white text-black hover:bg-gray-200",
  },
  "pre-wedding": {
    bgImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000",
    color: "#171717",
    colorLight: "#E4E4E7",
    modalLight: "bg-white border-black/10",
    modalDark: "bg-[#09090B] border-white/10",
    btnClassLight: "bg-[#171717] text-white hover:bg-black",
    btnClassDark: "bg-white text-black hover:bg-gray-200",
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

  const isPremium = (label: string) =>
    label.toLowerCase().includes("premium") || label.toLowerCase().includes("luxury");

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
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b relative overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-[#FFFFFF]" : "bg-[#09090B]"
      } ${border}`}
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
            <span className="font-serif italic capitalize text-2xl tracking-normal font-semibold">1FS Photography</span>
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
                className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-[4/3] sm:aspect-video md:aspect-[4/3] lg:aspect-[16/10] shadow-xl"
              >
                {/* Background Image */}
                <img 
                  src={style.bgImage} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/50 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20"
                      style={{ backgroundColor: `${style.color}40` }} // 40 is hex for 25% opacity
                    >
                      {renderIcon(cat.icon, "w-6 h-6 text-white")}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm line-clamp-2 max-w-md">
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border backdrop-blur-xl ${
                isLight ? CATEGORY_STYLES[selectedCategory.id].modalLight : CATEGORY_STYLES[selectedCategory.id].modalDark
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
                    const premium = isPremium(option.label);
                    return (
                      <ThreeDCard key={i} isLight={isLight} className="h-full" glowColor={premium ? "rgba(106,90,205,0.4)" : "rgba(14,107,168,0.2)"}>
                        <div className="flex flex-col h-full justify-between p-1">
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-[10px] uppercase tracking-widest font-mono border py-1.5 px-3 rounded-full font-bold ${
                                isLight ? "bg-[#52525B]/10 text-[#52525B] border-[#52525B]/20" : "bg-[#52525B]/20 text-[#A1A1AA] border-[#52525B]/30"
                              }`}>
                                {option.label}
                              </span>
                              {premium && (
                                <span className="flex items-center gap-1 text-[9px] uppercase font-mono bg-[#A1A1AA]/15 text-[#A1A1AA] px-2.5 py-1 rounded-full border border-[#A1A1AA]/30 font-bold">
                                  <Star className="w-3 h-3" /> Best Value
                                </span>
                              )}
                            </div>
                            <div className={`flex items-baseline gap-1.5 pb-4 border-b mb-5 ${border}`}>
                              <span className="text-3xl sm:text-4xl font-serif font-black text-gradient-ocean">
                                ₹{option.price.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <ul className="space-y-3">
                              {option.features.map((feat, idx) => (
                                <li key={idx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isLight ? "text-[#171717]" : "text-[#FAFAFA]"}`}>
                                  <div className="w-5 h-5 rounded-full bg-[#71717A]/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-[#71717A]" />
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
                                  ? (isLight ? CATEGORY_STYLES[selectedCategory.id].btnClassLight : CATEGORY_STYLES[selectedCategory.id].btnClassDark)
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
