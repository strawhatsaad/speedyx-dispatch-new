"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const centerImageRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // The scroll distance to complete animation
          scrub: 1, // Smooth scrubbing
          pin: true, // Pin the section
        },
      });

      // 1. The Text Splits Apart
      tl.to(textLeftRef.current, { x: -200, opacity: 0.5 }, 0).to(
        textRightRef.current,
        { x: 200, opacity: 0.5 },
        0
      );

      // 2. The Center Object Zooms/Rotates
      tl.to(
        centerImageRef.current,
        {
          scale: 15, // Massive zoom to fill screen
          rotation: 180,
          opacity: 0, // Fade out eventually to reveal next section
          ease: "power2.inOut",
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-white text-black"
    >
      {/* Background Header */}
      <div className="absolute top-10 w-full flex justify-between px-10 font-bold text-xs uppercase tracking-widest">
        <span>SpeedyX Dispatch</span>
        <span>USA Operations</span>
      </div>

      {/* Central Interactive Element (Abstract Torus Representation) */}
      <div
        ref={centerImageRef}
        className="absolute z-10 w-[300px] h-[300px] bg-black rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle, rgb(50,50,50) 0%, rgb(0,0,0) 100%)",
          boxShadow: "0 0 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Decorative rings to simulate the 3D object */}
        <div className="w-[80%] h-[80%] border-2 border-white/20 rounded-full"></div>
        <div className="w-[60%] h-[60%] border-2 border-white/20 rounded-full absolute"></div>
      </div>

      {/* The Big Typography */}
      <div className="relative z-20 flex flex-col items-center font-black leading-none tracking-tighter mix-blend-difference text-white">
        <h1 className="text-[10vw] md:text-[12vw] flex gap-10">
          <span ref={textLeftRef} className="inline-block">
            KEEPING
          </span>
          <span ref={textRightRef} className="inline-block">
            MOVING
          </span>
        </h1>
        <h1 className="text-[10vw] md:text-[12vw] mt-[-2vw]">AMERICA</h1>
      </div>

      <div className="absolute bottom-10 text-sm font-medium max-w-md text-center">
        A premier dispatching firm crafting exclusive loads & seamless
        operations since 2006.
      </div>
    </section>
  );
}
