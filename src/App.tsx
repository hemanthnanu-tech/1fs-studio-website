/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { PhotoshootPackages } from "./components/PhotoshootPackages";
import { CameraRentals } from "./components/CameraRentals";
import { BookingCalendar } from "./components/BookingCalendar";
import { AdminPanel } from "./components/AdminPanel";
import { SocialFooter } from "./components/SocialFooter";
import { FAQ } from "./components/FAQ";
import { ThreeDCard } from "./components/ThreeDCard";
import { PHOTOSHOOT_CATEGORIES, RENTAL_ITEMS, STUDIO_STATISTICS } from "./data";
import { Booking, BlockedDate, RentalItem, PriceOption, PhotoshootCategory } from "./types";
import { Camera, ShieldAlert, Check, Video, Waves, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // ── Bookings ──
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("1fs_bookings");
    if (saved) { try { return JSON.parse(saved); } catch { return []; } }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 5);
    const nextWeekStr = nextWeek.toISOString().split("T")[0];

    const seeds: Booking[] = [
      {
        id: "seed-1",
        customerName: "Rahul Sharma",
        customerPhone: "919876543210",
        customerEmail: "rahul@gmail.com",
        type: "rental",
        selectedItemName: "Sony ZV-E10 Mirrorless",
        pricePaid: 1499,
        startDate: tomorrowStr,
        endDate: tomorrowStr,
        status: "confirmed",
        whatsappSent: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "seed-2",
        customerName: "Priya Patel",
        customerPhone: "919001234567",
        customerEmail: "priya@gmail.com",
        type: "photoshoot",
        selectedItemName: "Baby Shoot & Baby Shower (STANDARD)",
        pricePaid: 9999,
        startDate: nextWeekStr,
        endDate: nextWeekStr,
        timeSlot: "Morning (9AM–2PM)",
        status: "pending",
        whatsappSent: false,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem("1fs_bookings", JSON.stringify(seeds));
    return seeds;
  });

  // ── Blocked dates (Manual) ──
  const [manualBlockedDates, setManualBlockedDates] = useState<BlockedDate[]>(() => {
    const saved = localStorage.getItem("1fs_blocked_dates");
    if (saved) { try { const parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length > 0) return parsed; } catch {} }
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 5);
    const initial = [{ date: nextWeek.toISOString().split("T")[0], reason: "Baby Shower — Pre Booked" }];
    localStorage.setItem("1fs_blocked_dates", JSON.stringify(initial));
    return initial;
  });

  const effectiveBlockedDates: BlockedDate[] = [...manualBlockedDates];
  bookings.forEach(b => {
    if (b.status === "pending" || b.status === "confirmed") {
      if (b.type === "photoshoot") {
        effectiveBlockedDates.push({ date: b.startDate, reason: `Booking: ${b.selectedItemName}` });
      } else {
        const start = new Date(b.startDate);
        const end = new Date(b.endDate);
        let walk = new Date(start);
        while (walk <= end) {
          effectiveBlockedDates.push({ date: walk.toISOString().split("T")[0], reason: `Rental: ${b.selectedItemName}` });
          walk.setDate(walk.getDate() + 1);
        }
      }
    }
  });

  // ── Rental items ──
  const [rentalItems, setRentalItems] = useState<RentalItem[]>(() => {
    const saved = localStorage.getItem("1fs_rental_items");
    if (saved) { try { return JSON.parse(saved); } catch { return RENTAL_ITEMS; } }
    return RENTAL_ITEMS;
  });

  useEffect(() => { try { localStorage.setItem("1fs_bookings", JSON.stringify(bookings)); } catch(e){} }, [bookings]);
  useEffect(() => { try { localStorage.setItem("1fs_blocked_dates", JSON.stringify(manualBlockedDates)); } catch(e){} }, [manualBlockedDates]);
  useEffect(() => { try { localStorage.setItem("1fs_rental_items", JSON.stringify(rentalItems)); } catch(e){} }, [rentalItems]);

  // ── Theme — default LIGHT ──
  const [isLight, setIsLight] = useState<boolean>(() => {
    const stored = localStorage.getItem("1fs_theme");
    if (stored === "dark") return false;
    return true;
  });

  const handleToggleTheme = () => {
    setIsLight(prev => {
      const next = !prev;
      try { localStorage.setItem("1fs_theme", next ? "light" : "dark"); } catch(e) {}
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", !isLight);
    root.classList.toggle("light", isLight);
  }, [isLight]);

  // ── Booking modal ──
  const [selectedBookingItem, setSelectedBookingItem] = useState<{
    type: "rental" | "photoshoot";
    item: RentalItem | PhotoshootCategory;
    priceOption?: PriceOption;
  } | null>(null);

  const [cartItems, setCartItems] = useState<RentalItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const blockedDatesList = effectiveBlockedDates.map(b => b.date);

  const handleAddBlockedDate = (date: string, reason: string) => {
    if (manualBlockedDates.some(b => b.date === date)) return;
    setManualBlockedDates(prev => [...prev, { date, reason }]);
  };

  const handleRemoveBlockedDate = (date: string) => {
    setManualBlockedDates(prev => prev.filter(b => b.date !== date));
  };

  const handleUpdateBookingStatus = (id: string, status: "pending"|"confirmed"|"completed"|"cancelled") => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm("Delete this booking entry?")) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleToggleRentalAvailability = (itemId: string) => {
    setRentalItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, availability: !item.availability } : item
    ));
  };

  const handleAddNewBooking = (data: {
    customerName: string; customerPhone: string; customerEmail: string;
    type: "rental"|"photoshoot"; selectedItemName: string; pricePaid: number;
    startDate: string; endDate: string; timeSlot?: string; notes?: string;
  }) => {
    const record: Booking = {
      id: "booking-" + Date.now(),
      ...data,
      status: "pending",
      whatsappSent: false,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [record, ...prev]);
    // Note: Effective blocked dates automatically handles this now!
  };

  const handleRentClick = (item: RentalItem) =>
    setSelectedBookingItem({ type: "rental", item });

  const handlePhotoshootOptionClick = (category: PhotoshootCategory, priceOption: PriceOption) =>
    setSelectedBookingItem({ type: "photoshoot", item: category, priceOption });

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${
      isLight ? "bg-[#FAFAFA] text-[#171717]" : "bg-[#09090B] text-[#FAFAFA]"
    }`}>

      {/* ── Top Alert Bar ── */}
      <AnimatePresence>
      {isAlertVisible && (
        <motion.div 
          initial={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`relative border-b text-center py-2 sm:py-2.5 px-4 flex items-center justify-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-bold overflow-hidden transition-colors duration-500 ${
            isLight
              ? "bg-[#171717] text-white border-[#171717]"
              : "bg-white text-black border-white"
          }`}
        >
          <Waves className="w-3 h-3 animate-pulse-ocean relative z-10 shrink-0" />
          <span className="relative z-10 truncate">Pre-rent cameras & get cinematic shoots — 1FS Photography · Bengaluru · by Darshan B</span>
          <button onClick={() => setIsAlertVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
      </AnimatePresence>

      <Navbar
        onAdminClick={() => setIsAdminOpen(true)}
        bookingsCount={bookings.filter(b => b.status === "pending").length}
        isLight={isLight}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-grow">
        <HeroSection isLight={isLight} />

        <PhotoshootPackages
          categories={PHOTOSHOOT_CATEGORIES}
          onBookPackageClick={handlePhotoshootOptionClick}
          isLight={isLight}
        />

        <CameraRentals
          items={rentalItems}
          onAddToCart={(item) => {
            setCartItems(prev => {
              if (prev.find(i => i.id === item.id)) return prev;
              return [...prev, item];
            });
            setIsCartOpen(true);
          }}
          isLight={isLight}
        />

        {/* ── Why Choose Section ── */}
        <section className={`py-16 sm:py-24 border-t relative overflow-hidden transition-colors duration-500 ${
          isLight ? "bg-[#FFFFFF] border-[#E4E4E7]" : "bg-[#09090B] border-[#52525B]/12"
        }`}>
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#52525B]/5 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#A1A1AA]/4 rounded-full blur-[110px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">

              <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                <div>
                  <span className={`text-[10px] uppercase tracking-widest font-mono font-bold flex items-center gap-2 mb-2 ${
                    isLight ? "text-[#71717A]" : "text-[#A1A1AA]"
                  }`}>
                    <span className="w-6 h-px bg-gradient-to-r from-[#52525B] to-[#71717A]" />
                    Production Standard
                  </span>
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-black leading-tight transition-colors duration-500 ${
                    isLight ? "text-[#171717]" : "text-white"
                  }`}>
                    Why Creators <br />Choose 1FS Studio
                  </h3>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${
                  isLight ? "text-[#71717A]" : "text-[#A1A1AA]"
                }`}>
                  Under the creative vision of{" "}
                  <strong className="text-[#52525B]">Darshan B</strong>, 1FS Studio bridges top-tier hardware rentals and stunning visual storytelling. Baby themes, pre-wedding cinematic, house warming reveals, or automobile captures — we deliver memorable moments.
                </p>

                <div className="space-y-4 sm:space-y-5">
                  {[
                    { icon: Camera, title: "Maintained Pristine Fleet", desc: "Sensor-cleaned cameras, fully charged gimbals, and professional lens kits." },
                    { icon: Video, title: "Cinematic Retouching Included", desc: "Expert color grading, light correction, and beautiful dynamic video sequences." },
                    { icon: ShieldAlert, title: "Verified Rental Process", desc: "Government ID verification and refundable deposit — secure for both client and studio." },
                  ].map(({ icon: Icon, title, desc }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex gap-3.5"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isLight
                          ? "bg-[#52525B]/8 border-[#52525B]/15 text-[#52525B]"
                          : "bg-[#52525B]/15 border-[#52525B]/20 text-[#52525B]"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold mb-0.5 ${isLight ? "text-[#171717]" : "text-[#FAFAFA]"}`}>{title}</h4>
                        <p className={`text-xs leading-relaxed ${isLight ? "text-[#71717A]" : "text-[#A1A1AA]"}`}>{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Photo showcase grid */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600", label: "Baby Theme Shoots", tag: "Creative" },
                    { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600", label: "Car & Bike Reveals", tag: "Automotive", aspect: "3/4" }
                  ].map(({ src, label, tag, aspect = "1/1" }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="w-full h-full"
                    >
                      <ThreeDCard isLight={isLight} className={`relative rounded-2xl overflow-hidden border group cursor-pointer w-full h-full ${isLight ? "border-[#E4E4E7]" : "border-[#52525B]/15"}`} style={{ aspectRatio: aspect }}>
                        <img src={src} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-[#171717]/20 to-transparent p-3 flex flex-col justify-end">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-[#A1A1AA]">{tag}</span>
                          <strong className="text-xs text-white font-semibold">{label}</strong>
                        </div>
                      </ThreeDCard>
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  {[
                    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", label: "Pre-Wedding", tag: "Cinematic", aspect: "3/4" },
                    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600", label: "Traditional Events", tag: "Culture" }
                  ].map(({ src, label, tag, aspect = "1/1" }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                      className="w-full h-full"
                    >
                      <ThreeDCard isLight={isLight} className={`relative rounded-2xl overflow-hidden border group cursor-pointer w-full h-full ${isLight ? "border-[#E4E4E7]" : "border-[#52525B]/15"}`} style={{ aspectRatio: aspect }}>
                        <img src={src} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/85 via-[#171717]/20 to-transparent p-3 flex flex-col justify-end">
                          <span className="text-[8px] font-mono uppercase tracking-widest text-[#A1A1AA]">{tag}</span>
                          <strong className="text-xs text-white font-semibold">{label}</strong>
                        </div>
                      </ThreeDCard>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
        <FAQ isLight={isLight} />
      </main>

      <SocialFooter isLight={isLight} />

      {/* ── Floating Cart Button ── */}
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsCartOpen(true)}
            className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl flex items-center gap-2 font-mono text-xs uppercase font-bold hover:scale-105 transition-transform ${isLight ? "bg-[#171717] text-white" : "bg-white text-black"}`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isLight ? "bg-white text-[#171717]" : "bg-black text-white"}`}>
              {cartItems.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full max-w-md h-full shadow-2xl border-l flex flex-col z-10 ${
                isLight ? "bg-[#F4F4F5] border-[#E4E4E7]" : "bg-[#09090B] border-[#52525B]/20"
              }`}
            >
              <div className={`p-6 border-b flex justify-between items-center ${isLight ? "border-[#E4E4E7]" : "border-[#52525B]/20"}`}>
                <h2 className={`text-xl font-serif font-black ${isLight ? "text-[#171717]" : "text-white"}`}>Your Gear Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className={`p-2 rounded-xl border transition-colors ${
                  isLight ? "border-[#E4E4E7] text-[#171717] hover:bg-[#FAFAFA]" : "border-[#52525B]/20 text-[#A1A1AA] hover:bg-[#18181B]"
                }`}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <p className={`text-sm font-mono text-center mt-10 ${isLight ? "text-[#71717A]" : "text-[#A1A1AA]"}`}>
                    Your cart is completely empty.
                  </p>
                ) : (
                  cartItems.map(item => (
                    <motion.div layout key={item.id} className={`flex gap-4 p-3 rounded-2xl border ${
                      isLight ? "border-[#E4E4E7] bg-white" : "border-[#52525B]/20 bg-[#18181B]"
                    }`}>
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                      <div className="flex-1 py-1">
                        <h4 className={`text-xs font-bold font-serif line-clamp-1 ${isLight ? "text-[#171717]" : "text-[#FAFAFA]"}`}>{item.name}</h4>
                        <p className={`text-sm font-mono font-bold mt-1 ${isLight ? "text-[#52525B]" : "text-[#71717A]"}`}>₹{item.pricePerDay}<span className="text-[9px] text-gray-500">/day</span></p>
                      </div>
                      <button onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))} className="text-red-500 p-2 hover:bg-red-500/10 rounded-xl transition-colors self-center">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
              {cartItems.length > 0 && (
                <div className={`p-6 border-t ${isLight ? "border-[#E4E4E7] bg-white" : "border-[#52525B]/20 bg-[#09090B]"}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs font-mono uppercase tracking-widest ${isLight ? "text-[#71717A]" : "text-[#A1A1AA]"}`}>Subtotal/Day</span>
                    <span className={`text-xl font-serif font-black ${isLight ? "text-[#171717]" : "text-white"}`}>
                      ₹{cartItems.reduce((acc, item) => acc + item.pricePerDay, 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const msg = `Hi 1FS Studio! I'd like to rent the following gear:\n${cartItems.map(i => `- ${i.name} (₹${i.pricePerDay}/day)`).join("\n")}\n\nPlease let me know the availability.`;
                      window.open(`https://wa.me/917795849384?text=${encodeURIComponent(msg)}`, "_blank");
                    }}
                    className={`w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 shadow-lg ${isLight ? "bg-[#171717] text-white" : "bg-white text-black"}`}
                  >
                    Checkout via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {selectedBookingItem && (
        <BookingCalendar
          selectedItem={selectedBookingItem}
          blockedDates={blockedDatesList}
          onNewBookingAdded={handleAddNewBooking}
          onClose={() => setSelectedBookingItem(null)}
          isLight={isLight}
        />
      )}

      {isAdminOpen && (
        <AdminPanel
          bookings={bookings}
          blockedDates={manualBlockedDates}
          rentalItems={rentalItems}
          onAddBlockedDate={handleAddBlockedDate}
          onRemoveBlockedDate={handleRemoveBlockedDate}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onDeleteBooking={handleDeleteBooking}
          onToggleRentalAvailability={handleToggleRentalAvailability}
          onClose={() => setIsAdminOpen(false)}
          isLight={isLight}
        />
      )}
    </div>
  );
}
