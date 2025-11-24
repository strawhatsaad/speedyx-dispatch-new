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

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    heroTl.set(mesh.scale, { x: 1, y: 1, z: 1 });
    heroTl.set(mesh.position, { x: 0, y: 0, z: 0 });
    heroTl.set(mesh.material, { opacity: 1, transparent: true });

    heroTl.to(
      mesh.scale,
      {
        x: 15,
        y: 15,
        z: 15,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    heroTl.to(
      mesh.material,
      {
        opacity: 0,
        duration: 0.3,
      },
      0.7
    );

    heroTl.to(
      mesh.rotation,
      {
        x: Math.PI * 2,
        y: Math.PI * 1.5,
        duration: 1,
        ease: "none",
      },
      0
    );

    const featuresTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#feature-section",
        start: "top top",
        end: "+=18000",
        scrub: 2,
      },
    });

    featuresTl.set(mesh.material, { opacity: 0 });

    // FORM SECTION: Show torus again
    const formTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#form-section",
        start: "top bottom",
        end: "top center",
        scrub: 2,
      },
    });

    formTl.to(mesh.material, { opacity: 1, duration: 0.5 });
    formTl.to(mesh.scale, { x: 3, y: 3, z: 3, duration: 0.5 }, 0);
    formTl.to(
      mesh.position,
      { x: viewport.width * 0.25, y: 0, z: 0, duration: 0.5 },
      0
    );
  }, [viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Stronger mouse tracking for visible response
    const y = (state.pointer.y * viewport.height) / 2;
    const x = (state.pointer.x * viewport.width) / 2;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.15,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.15,
      0.1
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <TorusKnot ref={meshRef} args={[1, 0.35, 32, 8]}>
        <meshStandardMaterial
          color="#000000"
          roughness={0.1}
          metalness={0.6}
          transparent={true}
          opacity={1}
        />
      </TorusKnot>
    </Float>
  );
}
