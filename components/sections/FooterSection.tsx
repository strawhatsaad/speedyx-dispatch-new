"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import logo from "@/public/speedyx-logo.png";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  useGSAP(() => {
    // Fade in footer content
    gsap.fromTo(
      ".footer-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: "#footer-section",
          start: "top 70%",
          end: "top 40%",
          scrub: 2,
        },
      }
    );
  });

  return (
    <section
      id="footer-section"
      className="min-h-screen w-full relative bg-black text-white flex items-center justify-center py-20"
    >
      <div className="footer-content max-w-6xl mx-auto px-6 text-center">
        {/* Tagline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
          Your Success is Our Mission
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto">
          Partner with the dispatch team that puts your business first. We don't
          just move freight—we move your career forward.
        </p>

        {/* Logo */}
        <div className="mb-16">
          <Image src={logo} alt="SpeedyX Logo" />
          <p className="text-sm md:text-base uppercase tracking-[0.5em] text-gray-500 mt-4">
            Premium Dispatch Services
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          {/* Phone */}
          <div className="group">
            <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              Call Us
            </div>
            <a
              href="tel:+13609808062"
              className="text-xl md:text-2xl font-bold hover:text-gray-300 transition-colors"
            >
              +1 (360) 980-8062
            </a>
          </div>

          {/* Email */}
          <div className="group">
            <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              Email Us
            </div>
            <a
              href="mailto:info@speedyxdispatch.com"
              className="text-xl md:text-2xl font-bold hover:text-gray-300 transition-colors break-all"
            >
              info@speedyxdispatch.com
            </a>
          </div>

          {/* Address */}
          <div className="group">
            <div className="text-sm uppercase tracking-wider text-gray-500 mb-2">
              Visit Us
            </div>
            <address className="text-xl md:text-2xl font-bold not-italic">
              4387 Taft Ct
              <br />
              Woodbridge, VA 22193
            </address>
          </div>
        </div>

        {/* Privacy Policy Button */}
        <div className="mb-16">
          <Link
            href="/privacy-policy"
            className="inline-block bg-white text-black font-bold text-lg px-12 py-4 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SpeedyX Dispatch. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
