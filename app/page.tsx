"use client";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Experience from "@/components/Experience";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Negotiation",
    desc: "We leverage market data to squeeze every dollar from brokers.",
  },
  {
    title: "Fast Cash",
    desc: "Get paid in 24 hours. We handle the paperwork, you get the funds.",
  },
  {
    title: "Exclusive Lanes",
    desc: "Access hidden freight not found on standard load boards.",
  },
  {
    title: "Full Compliance",
    desc: "We resolve freight guards and keep your MC authority pristine.",
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const featureSectionRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // HERO
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      heroTl
        .to(".hero-left", { x: -300, opacity: 0 }, 0)
        .to(".hero-right", { x: 300, opacity: 0 }, 0);

      // FEATURE PINNING (Matched to 1200% in Experience.tsx)
      ScrollTrigger.create({
        trigger: featureSectionRef.current,
        id: "feature-pin",
        start: "top top",
        end: "+=1200%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          // Clamp logic to ensure 0.999 maps to index 3
          const index = Math.floor(progress * features.length);
          const clampedIndex = Math.min(index, features.length - 1);
          setActiveFeature(clampedIndex);
        },
      });
    },
    { scope: containerRef }
  );

  // TEXT ANIMATION (Word by Word)
  useGSAP(() => {
    gsap.set(".word-span", { opacity: 0.1, y: 10 });
    gsap.set(".feature-container", { opacity: 0, pointerEvents: "none" });

    const currentContainer = textRefs.current[activeFeature];
    if (currentContainer) {
      gsap.to(currentContainer, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
      });
      gsap.to(currentContainer.querySelectorAll(".word-span"), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      });
    }
  }, [activeFeature]);

  // HOVER HELPERS
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
    <main ref={containerRef} className="w-full relative">
      {/* FIXED BACKGROUND: Z-0 */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Canvas gl={{ alpha: true, antialias: false }} dpr={[1, 1.5]}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Environment preset="city" />
          <Experience />
        </Canvas>
      </div>

      {/* HERO SECTION */}
      <section
        id="hero-section"
        className="h-screen w-full flex flex-col items-center justify-center relative pointer-events-none"
      >
        <div className="flex gap-4 md:gap-8 text-[12vw] font-black leading-none tracking-tighter select-none pointer-events-auto">
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
            X
          </h1>
        </div>
        <p className="blend-target mt-10 text-xl uppercase font-bold tracking-[0.5em]">
          Building Tomorrow
        </p>
      </section>

      {/* FEATURE SECTION */}
      <section
        id="feature-section"
        ref={featureSectionRef}
        className="h-screen w-full relative z-10"
      >
        {features.map((feature, index) => {
          // Index 0 (Even) -> Text Right
          // Index 1 (Odd) -> Text Left
          // Index 2 (Even) -> Text Right
          // Index 3 (Odd) -> Text Left
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={`feature-container absolute top-0 left-0 w-full h-full flex items-center px-6 md:px-24 transition-opacity duration-500
                        ${
                          isEven
                            ? "justify-end text-right"
                            : "justify-start text-left"
                        }
                    `}
            >
              <div className="max-w-2xl">
                <h2 className="blend-target text-6xl md:text-9xl font-black uppercase leading-[0.8] mb-8">
                  {feature.title.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className="word-span inline-block mr-4 opacity-0 will-change-transform"
                    >
                      {word}
                    </span>
                  ))}
                </h2>

                <p className="blend-target text-xl md:text-3xl font-bold leading-relaxed">
                  {feature.desc.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className="word-span inline-block mr-2 opacity-0 will-change-transform"
                    >
                      {word}
                    </span>
                  ))}
                </p>

                <div
                  className={`blend-target mt-8 text-sm font-mono opacity-50 ${
                    isEven ? "ml-auto" : "mr-auto"
                  }`}
                >
                  0{index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="h-[50vh] w-full"></div>
    </main>
  );
}
