"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const mainCursor = useRef<HTMLDivElement>(null);
  const followers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Use quickTo for higher performance on mousemove
    const xTo = gsap.quickTo(mainCursor.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    const yTo = gsap.quickTo(mainCursor.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    // Create separate quickTo instances for followers to create the 'drag'
    const followersX = followers.current.map((f) =>
      gsap.quickTo(f, "x", { duration: 0.3, ease: "power3" })
    );
    const followersY = followers.current.map((f) =>
      gsap.quickTo(f, "y", { duration: 0.3, ease: "power3" })
    );

    const moveCursor = (e: MouseEvent) => {
      // Move main dot
      xTo(e.clientX);
      yTo(e.clientY);

      // Move followers with lag
      followersX.forEach((func, i) => {
        // Add a slight stagger based on index
        gsap.to(followers.current[i], {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3 + i * 0.1, // Slower duration for trailing effect
          ease: "power2.out",
          overwrite: "auto",
        });
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

      {/* Trailing dots that create the liquid trail */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) followers.current[i] = el;
          }}
          // Varying sizes makes the trail look more organic
          className={`cursor-dot z-10 opacity-90 ${
            i === 0 ? "w-7 h-7" : i === 1 ? "w-6 h-6" : "w-4 h-4"
          }`}
        />
      ))}
    </div>
  );
}
