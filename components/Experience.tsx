"use client";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Load truck model
  const { scene } = useGLTF("/truck.glb");

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

    // Set initial truck rotation to face forward
    heroTl.set(mesh.rotation, { x: 0, y: 0, z: 0 });
    heroTl.set(mesh.scale, { x: 1.5, y: 1.5, z: 1.5 });
    heroTl.set(mesh.position, { x: 0, y: 0, z: 0 });

    // Make all materials transparent
    mesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const meshChild = child as THREE.Mesh;
        if (meshChild.material) {
          if (Array.isArray(meshChild.material)) {
            meshChild.material.forEach((mat) => {
              mat.transparent = true;
              mat.opacity = 1;
            });
          } else {
            meshChild.material.transparent = true;
            meshChild.material.opacity = 1;
          }
        }
      }
    });

    heroTl.to(
      mesh.scale,
      {
        x: 3,
        y: 3,
        z: 3,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    // Fade out all materials
    heroTl.to(
      mesh,
      {
        duration: 0.3,
        onUpdate: function () {
          const progress = this.progress();
          if (progress > 0.7) {
            const opacity = 1 - (progress - 0.7) / 0.3;
            mesh.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const meshChild = child as THREE.Mesh;
                if (meshChild.material) {
                  if (Array.isArray(meshChild.material)) {
                    meshChild.material.forEach((mat) => {
                      mat.opacity = opacity;
                    });
                  } else {
                    meshChild.material.opacity = opacity;
                  }
                }
              }
            });
          }
        },
      },
      0.7
    );

    // Rotate truck horizontally (spin around Y axis)
    heroTl.to(
      mesh.rotation,
      {
        y: Math.PI * 2,
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

    // Keep truck hidden during features
    featuresTl.set(mesh, {
      onStart: () => {
        mesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const meshChild = child as THREE.Mesh;
            if (meshChild.material) {
              if (Array.isArray(meshChild.material)) {
                meshChild.material.forEach((mat) => {
                  mat.opacity = 0;
                });
              } else {
                meshChild.material.opacity = 0;
              }
            }
          }
        });
      },
    });

    // Keep hidden during video section too
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#video-section",
        start: "top top",
        end: "+=5000",
        scrub: 2.5,
      },
    });

    videoTl.set(mesh, {
      onStart: () => {
        mesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const meshChild = child as THREE.Mesh;
            if (meshChild.material) {
              if (Array.isArray(meshChild.material)) {
                meshChild.material.forEach((mat) => {
                  mat.opacity = 0;
                });
              } else {
                meshChild.material.opacity = 0;
              }
            }
          }
        });
      },
    });

    // FORM SECTION: Show truck on the right side ONLY when form is in view
    const formTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#form-section",
        start: "top center",
        end: "top top",
        scrub: 2,
      },
    });

    // Reset rotation to face forward
    formTl.set(mesh.rotation, { x: 0, y: 0, z: 0 }, 0);

    // Position on far right side
    formTl.to(
      mesh.position,
      { x: viewport.width * 0.35, y: 0, z: 0, duration: 1 },
      0
    );
    formTl.to(mesh.scale, { x: 3, y: 3, z: 3, duration: 1 }, 0);
    formTl.to(
      mesh,
      {
        duration: 1,
        onUpdate: function () {
          const opacity = this.progress();
          mesh.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const meshChild = child as THREE.Mesh;
              if (meshChild.material) {
                if (Array.isArray(meshChild.material)) {
                  meshChild.material.forEach((mat) => {
                    mat.opacity = opacity;
                  });
                } else {
                  meshChild.material.opacity = opacity;
                }
              }
            }
          });
        },
      },
      0
    );
  }, [viewport, scene]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle horizontal rotation based on mouse X position
    const x = (state.pointer.x * viewport.width) / 2;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.08,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <primitive ref={meshRef} object={scene} />
    </Float>
  );
}

// Preload the model
useGLTF.preload("/truck.glb");
