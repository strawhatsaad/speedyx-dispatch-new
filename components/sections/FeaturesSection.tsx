"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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

interface FeaturesSectionProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function FeaturesSection({
  containerRef,
}: FeaturesSectionProps) {
  const featureSectionRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shortTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // PIN SECTION
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

      // STAGE 1: Images rise from bottom
      imageRefs.current.forEach((img, i) => {
        if (img) {
          masterTl.fromTo(
            img,
            { y: window.innerHeight, x: 0, scale: 1, opacity: 1 },
            { y: window.innerHeight / 2 - 200 - i * 100, x: 0, duration: 1 },
            i * 0.1
          );
        }
      });

      masterTl.to({}, { duration: 0.5 });

      // STAGE 2: Snap to horizontal
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

      // STAGE 3: Text reveal
      shortTextRefs.current.forEach((text, i) => {
        if (text) {
          const centerX = window.innerWidth / 2;
          const spacing = 260;
          const startX =
            centerX - (features.length * spacing) / 2 + spacing / 2;
          const targetX = startX + i * spacing;

          masterTl.set(text, { left: targetX, top: "50%", x: 0, y: 100 }, 3);
          masterTl.fromTo(
            text,
            { opacity: 0 },
            { opacity: 1, duration: 0.2 },
            3 + i * 0.08
          );
        }
      });

      masterTl.to({}, { duration: 0.5 });

      // STAGE 4: Carousel layout
      if (imageRefs.current[0]) {
        masterTl.to(
          imageRefs.current[0],
          { x: 0, y: -100, scale: 2, duration: 0.8 },
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
        if (text) masterTl.to(text, { opacity: 0, duration: 0.3 }, 4);
      });

      masterTl.to({}, { duration: 0.3 });

      // STAGE 5+: Feature carousel
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
              { opacity: 0, duration: 0.2 },
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
              { x: 0, y: -100, scale: 2, duration: 0.3 },
              transitionTime
            );
          }
        }
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div style={{ height: "18000px" }}>
      <section
        id="feature-section"
        ref={featureSectionRef}
        className="h-screen w-full relative overflow-hidden"
      >
        {features.map((feature, index) => (
          <div key={feature.id}>
            {/* Image */}
            <div
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 w-[140px] h-[140px] rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: feature.color,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={`/feature-${feature.id}.png`}
                alt={feature.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Short Text */}
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

            {/* Detail */}
            <div
              ref={(el) => {
                detailRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 opacity-0 max-w-xl text-center pointer-events-none"
              style={{ transform: "translate(-50%, 180px)" }}
            >
              <h2 className="text-5xl md:text-5xl font-black mt-16 mb-4 text-black">
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
  );
}
