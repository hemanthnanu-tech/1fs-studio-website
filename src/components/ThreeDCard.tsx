import React, { useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  key?: React.Key;
  isLight?: boolean;
}

export function ThreeDCard({
  children,
  className = "",
  glowColor = "rgba(14, 107, 168, 0.25)",
  isLight = false,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  const scale = useSpring(1, { stiffness: 350, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const percentX = (mouseX / width) - 0.5;
    const percentY = (mouseY / height) - 0.5;

    setGlareX((mouseX / width) * 100);
    setGlareY((mouseY / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.025);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none rounded-2xl ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ scale, transformStyle: "preserve-3d" }}
        className={`relative h-full w-full rounded-2xl transition-shadow duration-300 ${
          isLight
            ? "glass-panel-light"
            : "glass-panel-dark"
        }`}
        animate={{
          boxShadow: isHovered
            ? isLight
              ? `0 24px 60px -12px rgba(14, 107, 168, 0.15), 0 0 30px ${glowColor}`
              : `0 24px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px ${glowColor}`
            : isLight
              ? "0 4px 24px -6px rgba(14, 107, 168, 0.08)"
              : "0 4px 24px -10px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Orinoco Flow shimmer glare */}
        <div
          className="absolute inset-0 z-30 pointer-events-none rounded-2xl transition-opacity duration-300 overflow-hidden"
          style={{ opacity: isHovered ? 0.6 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: isLight
                ? `radial-gradient(circle 200px at ${glareX}% ${glareY}%, rgba(14, 107, 168, 0.12) 0%, transparent 70%)`
                : `radial-gradient(circle 200px at ${glareX}% ${glareY}%, rgba(168, 218, 220, 0.12) 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Top border gradient shine on hover */}
        <div
          className="absolute top-0 inset-x-0 h-px rounded-t-2xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(14,107,168,0.5), rgba(0,137,123,0.5), transparent)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Inner content */}
        <div
          className={`h-full w-full overflow-hidden rounded-xl p-5 relative z-10 bg-transparent`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
