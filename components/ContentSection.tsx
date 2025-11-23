"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContentSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Background color switcher
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: "#000",
            color: "#fff",
            duration: 0.5,
          }),
        onLeaveBack: () =>
          gsap.to("body", {
            backgroundColor: "#fff",
            color: "#000",
            duration: 0.5,
          }),
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative z-30 w-full py-32 px-6 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-7xl font-bold mb-24 leading-[0.9]">
          WE ARE A COLLABORATIVE ENGINE FOR <br />
          <span className="text-gray-500 italic">AMBITIOUS CARRIERS</span>
        </h2>

        <div className="space-y-16">
          {/* Service Items */}
          {[
            {
              title: "Negotiation",
              id: "01",
              desc: "We fight for every cent per mile.",
            },
            { title: "Insurance", id: "02", desc: "Seamless COI processing." },
            { title: "Factoring", id: "03", desc: "Get paid in 24 hours." },
            {
              title: "Exclusive Loads",
              id: "04",
              desc: "Off-market premium freight.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="group border-t border-white/20 py-10 flex flex-col md:flex-row justify-between items-start md:items-end hover:bg-white/5 transition-colors duration-500 px-4"
            >
              <span className="text-xs font-mono text-gray-500 mb-4 md:mb-0">
                ({item.id})
              </span>
              <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                {item.title}
              </h3>
              <p className="max-w-xs text-right text-gray-400 mt-4 md:mt-0">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
