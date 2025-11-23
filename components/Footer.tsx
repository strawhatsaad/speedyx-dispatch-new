"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // Parallax effect on the footer text
      gsap.fromTo(
        textRef.current,
        { y: -100 },
        {
          y: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="h-[80vh] bg-[#0e0e0e] flex flex-col justify-between px-6 md:px-12 pb-10 pt-32 overflow-hidden"
    >
      <div className="flex flex-col gap-6 text-gray-400 text-lg">
        <p>Let's get you loaded.</p>
        <a
          href="mailto:dispatch@speedyx.com"
          className="hover:text-white transition-colors"
        >
          dispatch@speedyx.com
        </a>
        <a
          href="tel:+18005550199"
          className="hover:text-white transition-colors"
        >
          +1 (800) 555-0199
        </a>
      </div>

      <div className="overflow-hidden">
        <h1
          ref={textRef}
          className="text-[13vw] leading-[0.8] font-black uppercase text-white text-center tracking-tighter"
        >
          HAULING & <br /> MOVING
        </h1>
      </div>

      <div className="flex justify-between text-xs uppercase text-gray-500 border-t border-gray-800 pt-4 mt-10">
        <span>© 2025 SpeedyX Dispatch LLC</span>
        <span>USA / 48 STATES</span>
      </div>
    </footer>
  );
}
