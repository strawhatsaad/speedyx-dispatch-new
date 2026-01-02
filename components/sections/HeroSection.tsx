"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      })
      .to(".hero-left", { x: -300, opacity: 0 }, 0)
      .to(".hero-right", { x: 300, opacity: 0 }, 0);
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    // @ts-ignore
    const { clientWidth, clientHeight } = target;
    const x = (offsetX - clientWidth / 2) / 5;
    const y = (offsetY - clientHeight / 2) / 5;
    gsap.to(target, { x, y, scale: 1.1, duration: 0.4, ease: "power3.out" });
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

  return (
    <section
      id="hero-section"
      className="h-screen w-full flex flex-col items-center justify-center relative"
    >
      <div className="flex gap-4 md:gap-8 text-[9vw] -mt-96 font-black leading-none tracking-tighter select-none pointer-events-auto">
        <h1
          className="hero-left blend-target cursor-pointer will-change-transform"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          SPEEDY
        </h1>
        <h1
          className="hero-right blend-target cursor-pointer will-change-transform"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          X-DISPATCH
        </h1>
      </div>
      <p className="blend-target mt-10 text-xl uppercase font-bold tracking-[0.5em]">
        Building Tomorrow
      </p>
    </section>
  );
}
