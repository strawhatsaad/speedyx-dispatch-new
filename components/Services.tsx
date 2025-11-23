"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Services() {
  const sectionRef = useRef(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Change Background to Black when entering this section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: "#0e0e0e",
            color: "#ffffff",
            duration: 0.5,
          }),
        onLeaveBack: () =>
          gsap.to("body", {
            backgroundColor: "#ffffff",
            color: "#000000",
            duration: 0.5,
          }),
      });

      // Animate items on scroll
      rowRefs.current.forEach((row, index) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
    },
    { scope: sectionRef }
  );

  const services = [
    { title: "Exclusive Loads", desc: "Access to premium, unlisted freight." },
    {
      title: "Broker Negotiation",
      desc: "We fight for every dollar per mile.",
    },
    { title: "Factoring Setup", desc: "Instant cash flow for new carriers." },
    { title: "Freight Guards", desc: "Resolution & reputation management." },
    { title: "Insurance Handling", desc: "Certificates processed in minutes." },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 md:px-12 w-full bg-transparent relative z-10"
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-20 text-white/90">
        OUR SERVICES
      </h2>

      <div className="flex flex-col">
        {services.map((service, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) rowRefs.current[i] = el;
            }} // Fix for TS void return
            className="border-t border-white/20 py-12 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-white/5 transition-colors duration-300 px-4"
          >
            <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300">
              {service.title}
            </h3>
            <p className="text-lg text-gray-400 mt-4 md:mt-0 max-w-md text-right">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
