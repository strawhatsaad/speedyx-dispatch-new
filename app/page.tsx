"use client";
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Experience from "@/components/Experience";

gsap.registerPlugin(ScrollTrigger);

// ... (Keep your 'features' array exactly as it is) ...
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

  // Form States
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useGSAP(
    () => {
      // ... (Keep all your existing GSAP animations exactly as they are) ...
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

      // VIDEO SECTION ANIMATIONS
      const videoTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#video-section",
          start: "top top",
          end: "+=3000",
          scrub: 2.5,
          pin: true,
        },
      });

      // Scale down feature section to top (happens as we approach video section)
      gsap.to("#feature-section", {
        scrollTrigger: {
          trigger: "#video-section",
          start: "top bottom",
          end: "top top",
          scrub: 2.5,
        },
        scale: 0.7,
        y: -window.innerHeight * 0.4,
        opacity: 0,
      });

      // Wait, then slide video cards into view
      videoTl.to({}, { duration: 0.3 }); // Pause at start

      videoTl.fromTo(
        ".video-card-bottom",
        { bottom: "-100%" },
        { bottom: "10%", duration: 1, ease: "power2.out" },
        0.3
      );

      videoTl.fromTo(
        ".video-card-top",
        { top: "-100%" },
        { top: "10%", duration: 1, ease: "power2.out" },
        0.3
      );

      // Animate center text after cards are in position
      videoTl.fromTo(
        ".video-text",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
        1.5
      );

      // FORM SECTION - Scale down video section
      gsap.to("#video-section", {
        scrollTrigger: {
          trigger: "#form-section",
          start: "top bottom",
          end: "top top",
          scrub: 2.5,
        },
        scale: 0.7,
        y: -window.innerHeight * 0.4,
        opacity: 0,
      });

      // Animate form elements
      gsap.fromTo(
        ".form-container",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: "#form-section",
            start: "top 60%",
            end: "top 30%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        ".torus-container",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: "#form-section",
            start: "top 60%",
            end: "top 30%",
            scrub: 2,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

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

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        // CRITICAL FIX: Do not set 'Content-Type'.
        // The browser sets it automatically to 'multipart/form-data' when body is FormData.
        body: formData,
      });
      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus("error");
    }
  };

  return (
    <main ref={containerRef} className="w-full relative bg-white">
      {/* ... (Fixed Background, Hero, Features, Video Sections remain unchanged) ... */}
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

      {/* VIDEO SECTION */}
      <div style={{ height: "3000px" }}>
        <section
          id="video-section"
          className="h-screen w-full relative overflow-hidden bg-white"
        >
          {/* Video Card - Slides from Bottom */}
          <div
            className="video-card-bottom absolute left-[8%] w-[30%] h-[50%] bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl shadow-2xl"
            style={{ bottom: "-100%" }}
          >
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
              Video 1
            </div>
          </div>

          {/* Video Card - Slides from Top */}
          <div
            className="video-card-top absolute right-[8%] w-[30%] h-[50%] bg-gradient-to-br from-gray-800 to-gray-600 rounded-3xl shadow-2xl"
            style={{ top: "-100%" }}
          >
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
              Video 2
            </div>
          </div>

          {/* Center Text */}
          <div className="video-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md text-center opacity-0 px-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-black mb-4">
              We'll take the hassle right off your hands
            </h2>
            <p className="text-xl md:text-2xl font-bold text-black opacity-70">
              So you can have all your attention on the road
            </p>
          </div>
        </section>
      </div>

      {/* FORM SECTION */}
      <section
        id="form-section"
        className="min-h-screen w-full relative bg-white py-20"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form */}
          <div className="form-container">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-black">
              Get Started Today
            </h2>
            <p className="text-xl text-black opacity-70 mb-8">
              Fill out the form below and we'll get you on the road to success
            </p>

            {/* Updated Form: No data-netlify attribute, uses onSubmit */}
            <form
              name="carrier-contact"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="carrier-contact" />

              {/* Hidden Honeypot field - manually handled or ignored by React */}
              <p className="hidden">
                <label>
                  Don't fill this out if you're human:{" "}
                  <input name="bot-field" />
                </label>
              </p>

              {/* Carrier Name */}
              <div>
                <label
                  htmlFor="carrier-name"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Carrier Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="carrier-name"
                  name="carrier-name"
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Your Company Name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* MC Number */}
              <div>
                <label
                  htmlFor="mc-number"
                  className="block text-sm font-bold text-black mb-2"
                >
                  MC Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="mc-number"
                  name="mc-number"
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="MC-123456"
                />
              </div>

              {/* MC Authority Letter */}
              <div>
                <label
                  htmlFor="mc-authority"
                  className="block text-sm font-bold text-black mb-2"
                >
                  MC Authority Letter
                </label>
                <input
                  type="file"
                  id="mc-authority"
                  name="mc-authority"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:font-bold hover:file:bg-gray-800 cursor-pointer"
                />
              </div>

              {/* W-9 Form */}
              <div>
                <label
                  htmlFor="w9-form"
                  className="block text-sm font-bold text-black mb-2"
                >
                  W-9 Form
                </label>
                <input
                  type="file"
                  id="w9-form"
                  name="w9-form"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:font-bold hover:file:bg-gray-800 cursor-pointer"
                />
              </div>

              {/* Insurance Documents */}
              <div>
                <label
                  htmlFor="insurance-docs"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Insurance Documents
                </label>
                <input
                  type="file"
                  id="insurance-docs"
                  name="insurance-docs"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:font-bold hover:file:bg-gray-800 cursor-pointer"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full bg-black text-white font-bold text-lg py-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {formStatus === "submitting"
                  ? "Sending..."
                  : "Submit Application"}
              </button>

              {formStatus === "success" && (
                <p className="text-green-600 font-bold mt-4">
                  Success! We will contact you shortly.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-600 font-bold mt-4">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Right Side - Torus Knot */}
          <div className="torus-container hidden lg:flex items-center justify-center h-[600px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-black text-black mb-2">
                  Interactive 3D
                </h3>
                <p className="text-lg text-black opacity-70">
                  Move your cursor to interact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
