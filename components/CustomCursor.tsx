"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const trailElements = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<Array<{ x: number; y: number }>>([]);
  const [isInFooter, setIsInFooter] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    // Pre-create trail elements (reuse instead of recreating)
    const trailCount = 12;
    if (trailContainerRef.current) {
      for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement("div");
        trail.style.position = "fixed";
        trail.style.top = "0";
        trail.style.left = "0";
        trail.style.width = `${22 - i * 1}px`;
        trail.style.height = `${22 - i * 1}px`;
        trail.style.borderRadius = "50%";
        trail.style.pointerEvents = "none";
        trail.style.opacity = `${0.7 - i * 0.05}`;
        trail.style.willChange = "transform";
        trail.style.transform =
          "translate(-50%, -50%) translate(-9999px, -9999px)";
        trail.style.transition = "background-color 0.3s ease";
        trailContainerRef.current.appendChild(trail);
        trailElements.current.push(trail);
        trailPositions.current.push({ x: 0, y: 0 });
      }
    }

    // Check scroll position to determine if in footer
    const checkScrollPosition = () => {
      const footerSection = document.getElementById("footer-section");
      if (footerSection) {
        const rect = footerSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If footer is visible in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          setIsInFooter(true);
        } else {
          setIsInFooter(false);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      checkScrollPosition();
    };

    const handleScroll = () => {
      checkScrollPosition();
    };

    const animate = () => {
      // Update cursor position with lerp
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`;
      }

      // Update trail positions (interpolate between cursor and previous positions)
      trailPositions.current[0] = {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
      };

      for (let i = 1; i < trailElements.current.length; i++) {
        const prev = trailPositions.current[i - 1];
        const curr = trailPositions.current[i];

        curr.x += (prev.x - curr.x) * 0.3;
        curr.y += (prev.y - curr.y) * 0.3;

        trailElements.current[
          i
        ].style.transform = `translate(${curr.x}px, ${curr.y}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScrollPosition(); // Check initial position
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      // Cleanup trail elements
      trailElements.current.forEach((el) => el.remove());
      trailElements.current = [];
    };
  }, []);

  // Update colors when isInFooter changes
  useEffect(() => {
    const color = isInFooter ? "#ffffff" : "#000000";

    if (cursorRef.current) {
      cursorRef.current.style.backgroundColor = color;
    }

    trailElements.current.forEach((trail) => {
      trail.style.backgroundColor = color;
    });
  }, [isInFooter]);

  return (
    <>
      {/* SVG Filter for gooey effect */}
      <svg
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none"
        style={{ zIndex: 10000 }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Cursor container with gooey filter */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          filter: "url(#goo)",
          zIndex: 10000,
        }}
      >
        {/* Main cursor */}
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            backgroundColor: "#000000",
            pointerEvents: "none",
            mixBlendMode: "difference",
            willChange: "transform",
            transition: "background-color 0.3s ease",
          }}
        />

        {/* Trail container */}
        <div ref={trailContainerRef} />
      </div>
    </>
  );
}
