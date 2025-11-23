"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const mainCursor = useRef<HTMLDivElement>(null);
  const followers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Use quickTo for higher performance on mousemove
    const xTo = gsap.quickTo(mainCursor.current, "x", {
      duration: 0.08,
      ease: "power3",
    });
    const yTo = gsap.quickTo(mainCursor.current, "y", {
      duration: 0.08,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      // Move main dot
      xTo(e.clientX);
      yTo(e.clientY);

      // Move followers with lag (optimized with fewer followers)
      followers.current.forEach((follower, i) => {
        if (follower) {
          gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.25 + i * 0.12,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    // IMPORTANT: This container applies the 'goo' filter to everything inside
    <div className="gooey-container">
      {/* Main precise dot */}
      <div ref={mainCursor} className="cursor-dot w-8 h-8 z-20" />

      {/* Reduced to 3 trailing dots for better performance */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) followers.current[i] = el;
          }}
          // Varying sizes makes the trail look more organic
          className={`cursor-dot z-10 opacity-90 ${
            i === 0 ? "w-7 h-7" : i === 1 ? "w-5 h-5" : "w-4 h-4"
          }`}
        />
      ))}
    </div>
  );
}
