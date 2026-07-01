import React from "react";
import { Instagram, Mail, Phone, MapPin, ExternalLink, Sparkles, Waves, Shield } from "lucide-react";
import { STUDIO_STATISTICS } from "../data";
import { motion } from "motion/react";

interface SocialFooterProps {
  isLight: boolean;
}

export function SocialFooter({ isLight }: SocialFooterProps) {
  const year = new Date().getFullYear();

  const headText = isLight ? "text-[#171717]" : "text-[#FAFAFA]";
  const subText  = isLight ? "text-[#71717A]" : "text-[#A1A1AA]";
  const border   = isLight ? "border-[#E4E4E7]" : "border-[#52525B]/10";
  const cardBg   = isLight
    ? "bg-[#FAFAFA] border-[#E4E4E7]"
    : "bg-[#09090B] border-[#52525B]/12";

  return (
    <footer
      id="contact"
      className={`py-12 sm:py-16 mt-auto border-t relative overflow-hidden transition-colors duration-500 ${
        isLight
          ? "bg-white border-t border-[#E4E4E7]"
          : "bg-[#09090B] border-t border-[#52525B]/10"
      }`}
    >
      {/* Wave accent top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none" style={{ height: 36 }}>
        <svg viewBox="0 0 1440 36" preserveAspectRatio="none" className="w-[200%] h-full animate-wave-slow" fill="none">
          <path d="M0,18 C240,30 480,6 720,18 C960,30 1200,6 1440,18 L1440,0 L0,0 Z"
            fill={isLight ? "rgba(14,107,168,0.04)" : "rgba(14,107,168,0.06)"} />
        </svg>
      </div>

      {/* Glow blobs */}
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: isLight ? "rgba(14,107,168,0.05)" : "rgba(14,107,168,0.07)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-6 sm:pb-8 relative z-10">

        {/* Footer grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 border-b ${border}`}>

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-5 space-y-4"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                <div className={`absolute inset-0 ${isLight ? "bg-[#171717]" : "bg-white"}`} />
                <span className={`relative z-10 font-sans font-black text-xl tracking-tight ${isLight ? "text-white" : "text-black"}`}>1F</span>
              </div>
              <div>
                <span className={`font-serif italic text-3xl sm:text-4xl font-semibold leading-none block transition-colors duration-500 tracking-tight ${headText}`}>
                  1FS Photography
                </span>
                <p className="text-[9px] text-[#71717A] uppercase tracking-widest font-mono">
                  Premium Rental & Studio · Bengaluru
                </p>
              </div>
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${subText}`}>
              Premium visual curation, cinematic event coverage, and elite camera rentals. Platform designed & built by{" "}
              <strong className={headText}>Hemanth Kumar K</strong>.
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <a
                href="https://instagram.com/_.hemxnth__"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative self-start overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono transition-all duration-300 group active:scale-95 border ${
                  isLight
                    ? "bg-[#FAFAFA] border-[#E4E4E7] text-[#171717] hover:border-[#E1306C]/50"
                    : "bg-[#09090B] border-[#52525B]/20 text-[#FAFAFA] hover:border-[#E1306C]/50"
                }`}
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E1306C] group-hover:scale-110 transition-all duration-300 relative z-10" />
                <span className="font-bold tracking-wider relative z-10">@_.hemxnth__ (Dev)</span>
              </a>
            </div>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 space-y-4"
          >
            <h4 className="text-[10px] uppercase tracking-widest text-[#52525B] font-mono font-bold flex items-center gap-2">
              <span className={`w-4 h-px ${isLight ? "bg-[#171717]" : "bg-white"}`} />
              Contact Us
            </h4>
            <div className={`space-y-3 text-xs ${headText}`}>
              <a href={`tel:${STUDIO_STATISTICS.phone}`}
                className={`flex items-center gap-3 hover:text-[#52525B] transition-colors group`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors group-hover:bg-[#25D366]/10 ${
                  isLight ? "bg-[#FAFAFA] border-[#E4E4E7]" : "bg-[#52525B]/8 border-[#52525B]/15"
                }`}>
                  <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <span>+91 {STUDIO_STATISTICS.phone}</span>
              </a>
              <a href={`mailto:${STUDIO_STATISTICS.email}`}
                className={`flex items-center gap-3 hover:text-[#52525B] transition-colors group`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors group-hover:bg-[#EA4335]/10 ${
                  isLight ? "bg-[#FAFAFA] border-[#E4E4E7]" : "bg-[#52525B]/8 border-[#52525B]/15"
                }`}>
                  <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
                </div>
                <span className="break-all">{STUDIO_STATISTICS.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors group-hover:bg-[#4285F4]/10 ${
                  isLight ? "bg-[#FAFAFA] border-[#E4E4E7]" : "bg-[#52525B]/8 border-[#52525B]/15"
                }`}>
                  <MapPin className="w-3.5 h-3.5 text-[#4285F4]" />
                </div>
                <span className={`leading-relaxed mt-0.5 ${subText}`}>{STUDIO_STATISTICS.address}</span>
              </div>
              
              {/* Studio Instagram moved below location */}
              <a
                href={`https://instagram.com/1fs_photography`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 hover:text-[#52525B] transition-colors group mt-4`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors group-hover:bg-[#E1306C]/10 ${
                  isLight ? "bg-[#FAFAFA] border-[#E4E4E7]" : "bg-[#52525B]/8 border-[#52525B]/15"
                }`}>
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                </div>
                <span className="font-mono">@1fs_photography</span>
              </a>
            </div>
          </motion.div>

          {/* Rental policy column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            <h4 className="text-[10px] uppercase tracking-widest text-[#52525B] font-mono font-bold flex items-center gap-2">
              <span className={`w-4 h-px ${isLight ? "bg-[#171717]" : "bg-white"}`} />
              Rental Policy
            </h4>

            <div className={`p-4 rounded-2xl border ${cardBg}`}>
              <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-[#52525B] font-bold mb-2">
                <Shield className="w-3.5 h-3.5" />
                ID Verification
              </div>
              <p className={`text-[10px] leading-relaxed ${subText}`}>
                Aadhaar / Government ID and a small security deposit are required before gear handover.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { label: "Shoot Packages", href: "#packages" },
                { label: "Camera Rentals", href: "#rentals" },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className={`flex items-center gap-2 text-xs font-mono transition-colors hover:text-[#52525B] ${subText}`}
                >
                  <span className="w-3 h-px bg-[#52525B]/40" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-3 text-[9px] font-mono uppercase tracking-widest ${subText} pt-5`}>
          <div className="flex items-center gap-2">
            <Waves className="w-3 h-3 text-[#52525B]" />
            <span>© {year} 1FS Photography · All rights reserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built by</span>
            <a href="https://wa.me/919538520031" target="_blank" rel="noopener noreferrer"
              className={`font-extrabold hover:underline inline-flex items-center gap-1 ${isLight ? "text-gradient-ocean" : "text-white"}`}
            >
              Hemanth Kumar K
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
