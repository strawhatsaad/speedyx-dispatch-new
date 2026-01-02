"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  useGSAP(() => {
    // Scale down features section as video section approaches
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

    // Video section timeline
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#video-section",
        start: "top top",
        end: "+=5000",
        scrub: 2.5,
        pin: true,
      },
    });

    videoTl.to({}, { duration: 0.3 }); // Pause

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

    videoTl.fromTo(
      ".video-text",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
      1.5
    );
  });

  return (
    <div style={{ height: "5000px" }}>
      <section
        id="video-section"
        className="h-screen w-full relative overflow-hidden bg-white"
      >
        {/* Video Card - Bottom */}
        <div
          className="video-card-bottom absolute left-[8%] w-[30%] h-[50%] bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl shadow-2xl overflow-hidden"
          style={{ bottom: "-100%" }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Card - Top */}
        <div
          className="video-card-top absolute right-[8%] w-[30%] h-[50%] bg-gradient-to-br from-gray-800 to-gray-600 rounded-3xl shadow-2xl overflow-hidden"
          style={{ top: "-100%" }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
  );
}
