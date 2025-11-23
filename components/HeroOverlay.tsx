"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroOverlay() {
  const containerRef = useRef(null);
  const leftText = useRef(null);
  const rightText = useRef(null);

  // The Jelly Hover Effect on Text
  const handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    // @ts-ignore
    const { clientWidth, clientHeight } = target;

    const x = (offsetX - clientWidth / 2) / 5;
    const y = (offsetY - clientHeight / 2) / 5;

    gsap.to(target, {
      x: x,
      y: y,
      scale: 1.1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    gsap.to(e.target, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Split animation
      tl.to(leftText.current, { x: -500, opacity: 0, ease: "power2.in" }, 0).to(
        rightText.current,
        { x: 500, opacity: 0, ease: "power2.in" },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero-container"
      className="h-screen w-full flex flex-col justify-center items-center relative z-20 overflow-hidden"
    >
      {/* CRITICAL: 'blend-target' sets color:white and mix-blend-mode: difference.
         Because the body is WHITE, White Text - White BG = Black (Visible Text).
         Because the Object is BLACK, White Text - Black Object = White (Visible Text).
      */}
      <div className="blend-target flex flex-col items-center leading-[0.8] font-black tracking-tighter select-none">
        <div className="flex gap-4 md:gap-8 text-[12vw] pointer-events-auto">
          <h1
            ref={leftText}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          >
            SPEEDY
          </h1>
          <h1
            ref={rightText}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          >
            X-DISPATCH
          </h1>
        </div>

        <div className="mt-8 text-xl md:text-2xl font-bold tracking-widest uppercase opacity-80">
          Building Tomorrow
        </div>
      </div>
    </section>
  );
}
