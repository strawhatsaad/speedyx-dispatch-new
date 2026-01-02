"use client";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import TruckModel from "@/components/TruckModel";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import VideoSection from "@/components/sections/VideoSection";
import FormSection from "@/components/sections/FormSection";
import FooterSection from "@/components/sections/FooterSection";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <main ref={containerRef} className="w-full relative bg-white">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Fixed Canvas Background */}
      <div
        className="fixed top-0 left-0 w-full h-screen pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} />
          <Environment preset="city" />
          <TruckModel />
        </Canvas>
      </div>

      {/* Sections */}
      <HeroSection />
      <FeaturesSection containerRef={containerRef} />
      <VideoSection />
      <FormSection />
      <FooterSection />
    </main>
  );
}
