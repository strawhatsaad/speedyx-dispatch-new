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
      // HERO: Torus scales up and fades out
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      });
      heroTl
        .to(".hero-left", { x: -300, opacity: 0 }, 0)
        .to(".hero-right", { x: 300, opacity: 0 }, 0);

      // FEATURE SECTION PINNING
      ScrollTrigger.create({
        trigger: featureSectionRef.current,
        start: "top top",
        end: "+=1200%", // Long scroll for all animation stages
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // STAGE 1: Images rise from bottom (vertical line)
      const riseTl = gsap.timeline({
        scrollTrigger: {
          trigger: featureSectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
        },
      });

      imageRefs.current.forEach((img, i) => {
        riseTl.fromTo(
          img,
          { y: window.innerHeight + 200, x: 0 },
          {
            y: window.innerHeight / 2 - 100 - i * 120,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          i * 0.15
        );
      });

      // STAGE 2: Snap to horizontal line
      const snapTl = gsap.timeline({
        scrollTrigger: {
          trigger: featureSectionRef.current,
          start: "top+=200% top",
          end: "+=150%",
          scrub: 1,
        },
      });

      imageRefs.current.forEach((img, i) => {
        const targetX = (i - 2.5) * 180; // Center around middle
        snapTl.to(
          img,
          {
            x: targetX,
            y: -100,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          i * 0.1
        );
      });

      // STAGE 3: Show short text for each
      const textRevealTl = gsap.timeline({
        scrollTrigger: {
          trigger: featureSectionRef.current,
          start: "top+=350% top",
          end: "+=150%",
          scrub: 1,
        },
      });

      shortTextRefs.current.forEach((text, i) => {
        textRevealTl.fromTo(
          text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.3 },
          i * 0.1
        );
      });

      // STAGE 4: First image to center, others to thumbnail strip
      const centerFirstTl = gsap.timeline({
        scrollTrigger: {
          trigger: featureSectionRef.current,
          start: "top+=500% top",
          end: "+=100%",
          scrub: 1,
        },
      });

      // Move first to center
      centerFirstTl.to(imageRefs.current[0], {
        x: 0,
        y: 0,
        scale: 1.5,
        duration: 1,
      });

      // Move others to left thumbnail strip
      imageRefs.current.slice(1).forEach((img, i) => {
        centerFirstTl.to(
          img,
          {
            x: -window.innerWidth * 0.4,
            y: -200 + i * 120,
            scale: 0.5,
            duration: 1,
          },
          0
        );
      });

      // Hide short text
      shortTextRefs.current.forEach((text) => {
        centerFirstTl.to(text, { opacity: 0, duration: 0.5 }, 0);
      });

      // STAGE 5-10: Individual feature details (carousel through all 6)
      features.forEach((feature, featureIndex) => {
        const startOffset = 600 + featureIndex * 100;

        // Show detail for current feature
        const detailTl = gsap.timeline({
          scrollTrigger: {
            trigger: featureSectionRef.current,
            start: `top+=${startOffset}% top`,
            end: "+=100%",
            scrub: 1,
            onEnter: () => setActiveFeature(featureIndex),
            onEnterBack: () => setActiveFeature(featureIndex),
          },
        });

        // Animate in detail text
        if (detailRefs.current[featureIndex]) {
          detailTl.fromTo(
            detailRefs.current[featureIndex],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }

        // Transition to next (if not last)
        if (featureIndex < features.length - 1) {
          const transitionTl = gsap.timeline({
            scrollTrigger: {
              trigger: featureSectionRef.current,
              start: `top+=${startOffset + 80}% top`,
              end: "+=20%",
              scrub: 1,
            },
          });

          // Current image scales down and moves to thumbnails
          transitionTl
            .to(imageRefs.current[featureIndex], {
              scale: 0.5,
              x: -window.innerWidth * 0.4,
              y: -200 + featureIndex * 120,
              duration: 0.5,
            })
            .to(
              detailRefs.current[featureIndex],
              { opacity: 0, duration: 0.3 },
              0
            );

          // Next image scales up to center
          transitionTl.to(
            imageRefs.current[featureIndex + 1],
            {
              scale: 1.5,
              x: 0,
              y: 0,
              duration: 0.5,
            },
            0.2
          );
        }
      });
    },
    { scope: containerRef }
  );

  // HOVER HELPERS for hero text
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
    <main ref={containerRef} className="w-full relative bg-white">
      {/* FIXED BACKGROUND: Canvas with Torus */}
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

      {/* FEATURES SECTION */}
      <section
        id="feature-section"
        ref={featureSectionRef}
        className="h-screen w-full relative"
        style={{
          background: "transparent",
          isolation: "auto",
        }}
      >
        {/* Feature Images */}
        {features.map((feature, index) => (
          <div key={`img-${feature.id}`}>
            {/* Image Box */}
            <div
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-2xl shadow-2xl cursor-pointer transition-shadow hover:shadow-3xl"
              style={{
                backgroundColor: feature.color,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-black text-2xl">
                {feature.id}
              </div>
            </div>

            {/* Short Description (horizontal line stage) */}
            <div
              ref={(el) => {
                shortTextRefs.current[index] = el;
              }}
              className="absolute opacity-0"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${
                  (index - 2.5) * 180
                }px), 80px)`,
              }}
            >
              <h3 className="text-white text-lg font-bold text-center whitespace-nowrap blend-target">
                {feature.name}
              </h3>
              <p className="text-white text-sm text-center opacity-80 blend-target">
                {feature.shortDesc}
              </p>
            </div>

            {/* Full Detail (center stage) */}
            <div
              ref={(el) => {
                detailRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 opacity-0 max-w-xl text-center"
              style={{
                transform: "translate(-50%, 150px)",
              }}
            >
              <h2 className="text-6xl font-black mb-4 blend-target">
                {feature.name}
              </h2>
              <p className="text-2xl font-bold mb-6 blend-target opacity-70">
                {feature.shortDesc}
              </p>
              <p className="text-lg leading-relaxed blend-target">
                {feature.fullDesc}
              </p>
              <div className="mt-8 text-sm font-mono opacity-50 blend-target">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(features.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Spacer for scroll */}
      <div className="h-[1200vh] w-full"></div>
      <div className="h-[50vh] w-full"></div>
    </main>
  );
}
