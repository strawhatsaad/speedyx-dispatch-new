"use client";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function TruckModel() {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const { scene } = useGLTF("/truck.glb");

  useGSAP(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    // Make all materials transparent
    mesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const meshChild = child as THREE.Mesh;
        if (meshChild.material) {
          const materials = Array.isArray(meshChild.material)
            ? meshChild.material
            : [meshChild.material];
          materials.forEach((mat) => {
            mat.transparent = true;
            mat.opacity = 1;
          });
        }
      }
    });

    // HERO SECTION: Scale up and fade out
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    heroTl.set(mesh.rotation, { x: 0, y: 0, z: 0 });
    heroTl.set(mesh.scale, { x: 1.5, y: 1.5, z: 1.5 });
    heroTl.set(mesh.position, { x: 0, y: 0, z: 0 });

    heroTl.to(
      mesh.scale,
      { x: 3.2, y: 3.2, z: 3.2, duration: 1, ease: "power2.inOut" },
      0
    );
    heroTl.to(mesh.rotation, { y: Math.PI * 2, duration: 1, ease: "none" }, 0);

    // Fade out
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
                  const materials = Array.isArray(meshChild.material)
                    ? meshChild.material
                    : [meshChild.material];
                  materials.forEach((mat) => {
                    mat.opacity = opacity;
                  });
                }
              }
            });
          }
        },
      },
      0.7
    );

    // FEATURES SECTION: Keep hidden
    gsap.timeline({
      scrollTrigger: {
        trigger: "#feature-section",
        start: "top top",
        end: "+=18000",
        scrub: 2,
        onEnter: () => setOpacity(mesh, 0),
      },
    });

    // VIDEO SECTION: Keep hidden throughout
    gsap.timeline({
      scrollTrigger: {
        trigger: "#video-section",
        start: "top top",
        end: "+=5000",
        scrub: 2.5,
        onEnter: () => setOpacity(mesh, 0),
        onUpdate: () => setOpacity(mesh, 0),
        onLeave: () => setOpacity(mesh, 0),
        onLeaveBack: () => setOpacity(mesh, 0),
      },
    });

    // // FORM SECTION: Show truck ONLY when form section starts
    // const formTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: "#form-section",
    //     start: "top 50%",
    //     end: "top 20%",
    //     scrub: 2,
    //   },
    // });

    // formTl.set(mesh.rotation, { x: 0, y: 0, z: 0 }, 0);
    // formTl.to(
    //   mesh.position,
    //   { x: viewport.width * 0.35, y: 0, z: 0, duration: 1 },
    //   0
    // );
    // formTl.to(mesh.scale, { x: 3, y: 3, z: 3, duration: 1 }, 0);
    // formTl.to(
    //   mesh,
    //   {
    //     duration: 1,
    //     onUpdate: function () {
    //       setOpacity(mesh, this.progress());
    //     },
    //   },
    //   0
    // );
  }, [viewport, scene]);

  // Mouse tracking - horizontal rotation only
  useFrame((state) => {
    if (!meshRef.current) return;
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

// Helper function to set opacity on all materials
function setOpacity(mesh: THREE.Group, opacity: number) {
  mesh.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const meshChild = child as THREE.Mesh;
      if (meshChild.material) {
        const materials = Array.isArray(meshChild.material)
          ? meshChild.material
          : [meshChild.material];
        materials.forEach((mat) => {
          mat.opacity = opacity;
        });
      }
    }
  });
}

useGLTF.preload("/truck.glb");
