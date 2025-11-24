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
    id: 1,
    name: "Rate Negotiation",
    shortDesc: "Maximum rates per load",
    fullDesc:
      "We leverage real-time market data and broker relationships to negotiate the highest possible rates. Our team fights for every dollar per mile, ensuring you get paid what you deserve.",
    color: "#FF6B6B",
  },
  {
    id: 2,
    name: "Fast Factoring",
    shortDesc: "24-hour payment guarantee",
    fullDesc:
      "Get paid within 24 hours of delivery. We handle all factoring paperwork and broker follow-ups, so you can focus on driving while maintaining healthy cash flow.",
    color: "#4ECDC4",
  },
  {
    id: 3,
    name: "Exclusive Lanes",
    shortDesc: "Premium hidden freight",
    fullDesc:
      "Access off-market loads from our private broker network. These exclusive lanes aren't posted on public boards, giving you a competitive advantage and better rates.",
    color: "#45B7D1",
  },
  {
    id: 4,
    name: "Full Compliance",
    shortDesc: "MC authority protection",
    fullDesc:
      "We resolve freight guards, handle insurance certificates, and maintain your perfect safety record. Your MC authority stays pristine while we manage all compliance headaches.",
    color: "#FFA07A",
  },
  {
    id: 5,
    name: "Route Planning",
    shortDesc: "Optimal miles & efficiency",
    fullDesc:
      "Smart routing technology plans your most profitable paths. Minimize deadhead miles, maximize loaded miles, and keep your truck moving efficiently across all 48 states.",
    color: "#98D8C8",
  },
  {
    id: 6,
    name: "24/7 Support",
    shortDesc: "Round-the-clock dispatch",
    fullDesc:
      "Our dispatch team never sleeps. Whether it's 3 AM breakdown assistance or last-minute load changes, we're always here to keep you moving and earning.",
    color: "#F7DC6F",
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const featureSectionRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shortTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // HERO
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

      // PIN THE FEATURE SECTION
      ScrollTrigger.create({
        trigger: featureSectionRef.current,
        start: "top top",
        end: "+=18000",
        pin: true,
        scrub: 2,
      });

      // MASTER TIMELINE
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: featureSectionRef.current,
          start: "top top",
          end: "+=18000",
          scrub: 2,
        },
      });

      // STAGE 1: RISE
      imageRefs.current.forEach((img, i) => {
        if (img) {
          masterTl.fromTo(
            img,
            {
              y: window.innerHeight,
              x: 0,
              scale: 1,
              opacity: 1,
            },
            {
              y: window.innerHeight / 2 - 200 - i * 100,
              x: 0,
              duration: 1,
            },
            i * 0.1
          );
        }
      });

      masterTl.to({}, { duration: 0.5 });

      // STAGE 2: SNAP HORIZONTAL
      imageRefs.current.forEach((img, i) => {
        if (img) {
          const centerX = window.innerWidth / 2;
          const spacing = 260;
          const startX =
            centerX - (features.length * spacing) / 2 + spacing / 2;
          const targetX = startX + i * spacing - centerX;

          masterTl.to(
            img,
            {
              x: targetX,
              y: -80,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.2)",
            },
            2 + i * 0.05
          );
        }
      });

      masterTl.to({}, { duration: 0.3 });

      // STAGE 3: TEXT REVEAL
      shortTextRefs.current.forEach((text, i) => {
        if (text) {
          const centerX = window.innerWidth / 2;
          const spacing = 260;
          const startX =
            centerX - (features.length * spacing) / 2 + spacing / 2;
          const targetX = startX + i * spacing;

          // Position text below its image
          masterTl.set(
            text,
            {
              left: targetX,
              top: "50%",
              x: 0,
              y: 100,
            },
            3
          );

          masterTl.fromTo(
            text,
            { opacity: 0 },
            { opacity: 1, duration: 0.2 },
            3 + i * 0.08
          );
        }
      });

      masterTl.to({}, { duration: 0.5 });

      // STAGE 4: CAROUSEL LAYOUT
      if (imageRefs.current[0]) {
        masterTl.to(
          imageRefs.current[0],
          {
            x: 0,
            y: -100,
            scale: 2,
            duration: 0.8,
          },
          4
        );
      }

      imageRefs.current.slice(1).forEach((img, i) => {
        if (img) {
          masterTl.to(
            img,
            {
              x: -window.innerWidth * 0.42,
              y: -250 + i * 140,
              scale: 0.6,
              duration: 0.8,
            },
            4
          );
        }
      });

      shortTextRefs.current.forEach((text) => {
        if (text) {
          masterTl.to(text, { opacity: 0, duration: 0.3 }, 4);
        }
      });

      masterTl.to({}, { duration: 0.3 });

      // STAGE 5+: CAROUSEL
      features.forEach((feature, idx) => {
        const baseTime = 5 + idx * 0.5;

        if (detailRefs.current[idx]) {
          masterTl.fromTo(
            detailRefs.current[idx],
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              onStart: () => setActiveFeature(idx),
            },
            baseTime
          );
        }

        if (idx < features.length - 1) {
          const transitionTime = baseTime + 0.35;

          if (detailRefs.current[idx]) {
            masterTl.to(
              detailRefs.current[idx],
              {
                opacity: 0,
                duration: 0.2,
              },
              transitionTime
            );
          }

          if (imageRefs.current[idx]) {
            masterTl.to(
              imageRefs.current[idx],
              {
                x: -window.innerWidth * 0.42,
                y: -250 + idx * 140,
                scale: 0.6,
                duration: 0.3,
              },
              transitionTime
            );
          }

          if (imageRefs.current[idx + 1]) {
            masterTl.to(
              imageRefs.current[idx + 1],
              {
                x: 0,
                y: -100,
                scale: 2,
                duration: 0.3,
              },
              transitionTime
            );
          }
        }
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <main ref={containerRef} className="w-full relative bg-white">
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1]}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Environment preset="city" />
          <Experience />
        </Canvas>
      </div>

      <section
        id="hero-section"
        className="h-screen w-full flex flex-col items-center justify-center relative"
      >
        <div className="flex gap-4 md:gap-8 text-[12vw] font-black leading-none tracking-tighter select-none pointer-events-auto">
          <h1 className="hero-left blend-target cursor-pointer">SPEEDY</h1>
          <h1 className="hero-right blend-target cursor-pointer">X</h1>
        </div>
        <p className="blend-target mt-10 text-xl uppercase font-bold tracking-[0.5em]">
          Building Tomorrow
        </p>
      </section>

      {/* FEATURES */}
      <div style={{ height: "18000px" }}>
        <section
          id="feature-section"
          ref={featureSectionRef}
          className="h-screen w-full relative overflow-hidden"
        >
          {features.map((feature, index) => (
            <div key={feature.id}>
              <div
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="absolute left-1/2 top-1/2 w-[140px] h-[140px] rounded-2xl shadow-2xl"
                style={{
                  backgroundColor: feature.color,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white font-black text-3xl">
                  {feature.id}
                </div>
              </div>

              <div
                ref={(el) => {
                  shortTextRefs.current[index] = el;
                }}
                className="absolute opacity-0 pointer-events-none -translate-x-1/2"
                style={{ width: "240px" }}
              >
                <h3 className="text-black text-base font-bold text-center whitespace-nowrap">
                  {feature.name}
                </h3>
                <p className="text-black text-sm text-center opacity-80">
                  {feature.shortDesc}
                </p>
              </div>

              <div
                ref={(el) => {
                  detailRefs.current[index] = el;
                }}
                className="absolute left-1/2 top-1/2 opacity-0 max-w-xl text-center pointer-events-none"
                style={{
                  transform: "translate(-50%, 180px)",
                }}
              >
                <h2 className="text-5xl md:text-7xl font-black mb-4 text-black">
                  {feature.name}
                </h2>
                <p className="text-xl md:text-2xl font-bold mb-6 text-black opacity-70">
                  {feature.shortDesc}
                </p>
                <p className="text-base md:text-lg leading-relaxed text-black px-4">
                  {feature.fullDesc}
                </p>
                <div className="mt-8 text-sm font-mono opacity-50 text-black">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(features.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
