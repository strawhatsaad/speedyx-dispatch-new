"use client";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TorusKnot, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useGSAP(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    // Position Calculation: 25% to the left/right
    const xOffset = viewport.width * 0.25;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#feature-section",
        start: "top top",
        end: "+=1200%", // Longer scroll for distinct steps
        scrub: 0.5, // Tighter scrub for "snappy" feel
      },
    });

    /* SYNC LOGIC: 8 Steps Total
      Features switch at: 25%, 50%, 75% scroll progress.
      
      0% - 12.5%: Hold Left (Feature 1 reads)
      12.5% - 25%: Move Right
      25% - 37.5%: Hold Right (Feature 2 reads)
      37.5% - 50%: Move Left
      ...
    */

    // SETUP: Start Small & Centered -> Move to Starting Position
    tl.set(mesh.scale, { x: 1, y: 1, z: 1 }).set(mesh.position, {
      x: 0,
      y: 0,
      z: 0,
    });

    // ENTER: Scale to 2x (Not Huge) and move Left
    tl.to(
      mesh.scale,
      { x: 2, y: 2, z: 2, duration: 1, ease: "power2.inOut" },
      0
    ).to(mesh.position, { x: -xOffset, duration: 1, ease: "power2.inOut" }, 0);

    // STEP 1: HOLD LEFT (Allow Feature 1 Text to animate)
    tl.to(mesh.position, { x: -xOffset, duration: 2 }, 1);

    // STEP 2: MOVE RIGHT (Transition to Feature 2)
    tl.to(mesh.position, { x: xOffset, duration: 2, ease: "power1.inOut" }, 3);

    // STEP 3: HOLD RIGHT (Allow Feature 2 Text to animate)
    tl.to(mesh.position, { x: xOffset, duration: 2 }, 5);

    // STEP 4: MOVE LEFT (Transition to Feature 3)
    tl.to(mesh.position, { x: -xOffset, duration: 2, ease: "power1.inOut" }, 7);

    // STEP 5: HOLD LEFT (Allow Feature 3 Text to animate)
    tl.to(mesh.position, { x: -xOffset, duration: 2 }, 9);

    // STEP 6: MOVE RIGHT (Transition to Feature 4)
    tl.to(mesh.position, { x: xOffset, duration: 2, ease: "power1.inOut" }, 11);

    // STEP 7: HOLD RIGHT (Allow Feature 4 Text to animate)
    tl.to(mesh.position, { x: xOffset, duration: 2 }, 13);

    // CONTINUOUS ROTATION (Spins throughout the whole sequence)
    tl.to(
      mesh.rotation,
      { x: Math.PI * 6, y: Math.PI * 4, ease: "none", duration: 15 },
      0
    );
  }, [viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const y = (state.pointer.y * viewport.height) / 2;
    const x = (state.pointer.x * viewport.width) / 2;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.05,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.05,
      0.1
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <TorusKnot ref={meshRef} args={[1, 0.35, 64, 16]}>
        <meshStandardMaterial color="#000000" roughness={0.1} metalness={0.6} />
      </TorusKnot>
    </Float>
  );
}
