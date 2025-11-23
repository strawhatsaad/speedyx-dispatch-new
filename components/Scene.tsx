"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Float, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const meshRef = useRef<THREE.Mesh>(null);

  useGSAP(() => {
    if (!meshRef.current) return;

    // We link the animation to the whole page scroll wrapper
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // Watch the whole body
        start: "top top",
        end: "100vh top", // Finish animation when hero is scrolled past
        scrub: 1.5, // Slower scrub for smoother feel
      },
    });

    tl.to(meshRef.current.rotation, { z: Math.PI * 1.5, ease: "none" }, 0)
      .to(
        meshRef.current.scale,
        { x: 12, y: 12, z: 12, ease: "power1.inOut" },
        0
      )
      // Move it slightly away so it doesn't clip awkwardly,
      // or let the white content cover it before it clips.
      .to(meshRef.current.position, { z: 2, ease: "power1.in" }, 0);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 32]}>
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.6} />
      </TorusKnot>
    </Float>
  );
}

export default function Scene() {
  return (
    // FIXED POSITION: This makes it seamless. It never scrolls away.
    // Z-0: Behind everything.
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
      <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Environment preset="studio" />
        <Model />
      </Canvas>
    </div>
  );
}
