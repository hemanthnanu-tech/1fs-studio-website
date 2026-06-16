import React, { useState, useMemo } from "react";
import { RentalItem } from "../types";
import { ThreeDCard } from "./ThreeDCard";
import { Check, Sparkles, AlertCircle, ShoppingCart, Search } from "lucide-react";
import { motion } from "motion/react";

interface CameraRentalsProps {
  items: RentalItem[];
  isLight: boolean;
  onAddToCart: (items: RentalItem[]) => void;
  onProductClick?: (images: string[]) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Camera:     "text-[#52525B]",
  Stabilizer: "text-[#71717A]",
};

export function CameraRentals({ items, isLight, onAddToCart, onProductClick }: CameraRentalsProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [cart, setCart] = useState<RentalItem[]>([]);

  const border = isLight ? "border-[#E4E4E7]" : "border-[#52525B]/12";
  const subCls = isLight ? "text-[#71717A]" : "text-[#A1A1AA]";
  const headingCls = isLight ? "text-[#171717]" : "text-[#FAFAFA]";

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesCategory;
    });
  }, [items, categoryFilter]);

  return (
    <section
      id="rentals"
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-[#FAFAFA]" : "bg-[#09090B]"
      }`}
    >
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: isLight ? "rgba(14,107,168,0.07)" : "rgba(14,107,168,0.10)" }} />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: isLight ? "rgba(0,137,123,0.05)" : "rgba(0,137,123,0.07)" }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={`text-[10px] uppercase tracking-widest font-mono font-bold flex items-center gap-2 mb-2 ${
              isLight ? "text-[#171717]" : "text-white"
            }`}>
              <span className={`w-6 h-px ${isLight ? "bg-[#171717]" : "bg-white"}`} />
              <Sparkles className="w-3 h-3" />
              Professional Gear Fleet
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight ${headingCls}`}>
              Rent Pro Gear
            </h2>
            <p className={`text-xs sm:text-sm mt-2 max-w-xl ${subCls}`}>
              High-performance cameras and stabilizers available for daily rent. Perfect for creators, videographers, and photographers. Safety accessories included.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`border p-3.5 sm:p-4 rounded-2xl max-w-xs flex items-start gap-3 ${
              isLight ? "bg-white border-[#E4E4E7] shadow-sm" : "bg-[#09090B] border-[#52525B]/15"
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-[#52525B]/10 border border-[#52525B]/20 flex items-center justify-center shrink-0">
              <AlertCircle className="w-3.5 h-3.5 text-[#52525B]" />
            </div>
            <p className={`text-[10px] sm:text-[11px] leading-relaxed ${subCls}`}>
              All rentals require Aadhaar / Government ID verification and are charged per 24-hr slot.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar justify-center">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors whitespace-nowrap border cursor-pointer ${
                  categoryFilter === cat 
                    ? "bg-[#52525B] text-white border-[#52525B]" 
                    : isLight 
                      ? "bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#52525B]" 
                      : "bg-[#09090B] text-[#A1A1AA] border-[#52525B]/20 hover:border-[#52525B]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gear grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.length === 0 && (
            <div className={`col-span-full py-12 text-center font-mono ${subCls}`}>
              No gear found matching your criteria.
            </div>
          )}
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <ThreeDCard
                isLight={isLight}
                className="h-full group cursor-pointer"
                glowColor={item.availability ? "rgba(14,107,168,0.25)" : "rgba(220,38,38,0.12)"}
              >
                <div className="flex flex-col h-full justify-between">

                  {/* Image */}
                  <div>
                    <div 
                      onClick={() => item.gallery && onProductClick?.(item.gallery)}
                      className={`relative aspect-video w-full rounded-xl overflow-hidden mb-4 border ${
                        item.gallery ? "cursor-pointer" : ""
                      } ${
                      isLight ? "bg-[#FAFAFA] border-[#E4E4E7]" : "bg-[#09090B] border-[#52525B]/10"
                    }`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-contain sm:object-cover p-2 sm:p-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Availability badge */}
                      <div className="absolute top-2 right-2">
                        <span className={`text-[9px] uppercase font-mono font-bold px-2 py-1 rounded-full border backdrop-blur-sm flex items-center gap-1 ${
                          item.availability
                            ? "bg-[#71717A]/15 text-[#71717A] border-[#71717A]/30"
                            : "bg-red-500/15 text-red-400 border-red-500/30"
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${item.availability ? "bg-[#71717A] animate-pulse" : "bg-red-400"}`} />
                          {item.availability ? "Available" : "Rented Out"}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="absolute bottom-2 left-2">
                        <span className={`text-[8px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 font-semibold ${
                          CATEGORY_COLORS[item.category] || "text-[#A1A1AA]"
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className={`text-sm sm:text-base font-serif font-bold group-hover:text-[#52525B] transition-colors mb-1.5 ${headingCls}`}>
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className={`flex items-baseline gap-1.5 pb-3 border-b ${border}`}>
                      <span className={`text-lg sm:text-xl font-mono font-extrabold ${isLight ? "text-[#171717]" : "text-white"}`}>₹{item.pricePerDay}</span>
                      <span className={`text-[10px] font-mono uppercase ${subCls}`}>/ day rent</span>
                    </div>

                    {/* Description */}
                    <p className={`text-[11px] mt-3 leading-relaxed line-clamp-3 ${subCls}`}>{item.description}</p>

                    {/* Specs */}
                    <div className={`mt-4 space-y-1.5 border-t pt-3 ${border}`}>
                      <span className={`text-[9px] font-mono uppercase tracking-wider ${subCls}`}>Specifications:</span>
                      {item.specs.map((spec, i) => (
                        <div key={i} className={`flex items-start gap-2 text-[10px] ${isLight ? "text-[#171717]" : "text-[#A1A1AA]"}`}>
                          <div className="w-3 h-3 rounded-full bg-[#71717A]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2 h-2 text-[#71717A]" />
                          </div>
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rent CTA */}
                  <div className="mt-6 pt-2">
                    <button 
                      onClick={() => {
                        if (cart.some(i => i.id === item.id)) {
                          setCart(cart.filter(i => i.id !== item.id));
                        } else {
                          setCart([...cart, item]);
                        }
                      }}
                      disabled={!item.availability}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all border flex items-center justify-center gap-2 ${
                        !item.availability
                          ? (isLight ? "bg-[#FAFAFA] text-[#B0C4D8] border-[#E4E4E7] cursor-not-allowed" : "bg-[#18181B] text-[#52525B] border-[#52525B]/8 cursor-not-allowed")
                          : cart.some(i => i.id === item.id)
                            ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                            : (isLight ? "bg-[#171717] text-white border-transparent hover:bg-black" : "bg-white text-black border-transparent hover:bg-gray-200")
                      }`}
                    >
                      {!item.availability ? "Out of Stock" : cart.some(i => i.id === item.id) ? (
                        <>Selected <Check className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Select <ShoppingCart className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  </div>

                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
          >
            <button
              onClick={() => {
                onAddToCart(cart);
                setCart([]);
              }}
              className="w-full bg-[#E1306C] hover:bg-[#C1205C] text-white py-3.5 px-6 rounded-2xl shadow-2xl shadow-[#E1306C]/20 flex items-center justify-between font-bold transition-colors border border-white/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  {cart.length}
                </div>
                <span>Book Selected Items</span>
              </div>
              <span>₹{cart.reduce((sum, item) => sum + item.pricePerDay, 0)}/day</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
