"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "John Martinez",
    review:
      "Best dispatch service I've ever worked with. Increased my revenue by 40% in just 3 months.",
  },
  {
    name: "Sarah Johnson",
    review:
      "The team is incredibly responsive. They found me premium lanes that aren't on any load boards.",
  },
  {
    name: "Mike Thompson",
    review:
      "Fast factoring and excellent communication. They handle everything so I can focus on driving.",
  },
  {
    name: "David Chen",
    review:
      "Professional service from day one. My truck stays loaded and I'm making more money than ever.",
  },
  {
    name: "Robert Williams",
    review:
      "They negotiate the best rates and handle all the paperwork. Worth every penny.",
  },
  {
    name: "Lisa Garcia",
    review:
      "24/7 support is a game changer. Had an issue at 2 AM and they were there to help immediately.",
  },
  {
    name: "James Anderson",
    review:
      "Switched from my old dispatcher and never looked back. These guys actually care about my success.",
  },
  {
    name: "Maria Rodriguez",
    review:
      "The exclusive lanes they provide have completely changed my business. Highly recommended.",
  },
  {
    name: "Thomas Brown",
    review:
      "Transparent pricing and honest communication. They deliver on every promise they make.",
  },
  {
    name: "Jennifer Davis",
    review:
      "My truck hasn't sat idle once since I started with them. Consistent loads, consistent income.",
  },
];

export default function FormSection() {
  useGSAP(() => {
    // Scale down video section as form appears
    gsap.to("#video-section", {
      scrollTrigger: {
        trigger: "#form-section",
        start: "top bottom",
        end: "top top",
        scrub: 2.5,
      },
      scale: 0.7,
      y: -window.innerHeight * 0.4,
      opacity: 0,
    });

    // Fade in form content
    gsap.fromTo(
      ".form-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: "#form-section",
          start: "top 70%",
          end: "top 40%",
          scrub: 2,
        },
      }
    );

    // Animate testimonial columns
    gsap.to(".testimonial-column-1", {
      y: "-50%",
      duration: 40,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".testimonial-column-2", {
      y: "50%",
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  });

  return (
    <section
      id="form-section"
      className="min-h-screen w-full relative bg-white py-20"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Form */}
          <div className="form-content w-full">
            <h2 className="text-5xl md:text-6xl font-black mb-4 text-black">
              Get Started Today
            </h2>
            <p className="text-xl text-black opacity-70 mb-8">
              Fill out the form below and we'll get you on the road to success
            </p>

            <form
              name="carrier-contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="carrier-contact" />

              <p className="hidden">
                <label>
                  Don't fill this out if you're human:{" "}
                  <input name="bot-field" />
                </label>
              </p>

              {/* Carrier Name */}
              <div>
                <label
                  htmlFor="carrier-name"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Carrier Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="carrier-name"
                  name="carrier-name"
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors bg-white"
                  placeholder="Your Company Name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors bg-white"
                  placeholder="your@email.com"
                />
              </div>

              {/* MC Number */}
              <div>
                <label
                  htmlFor="mc-number"
                  className="block text-sm font-bold text-black mb-2"
                >
                  MC Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="mc-number"
                  name="mc-number"
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors bg-white"
                  placeholder="MC-123456"
                />
              </div>

              {/* MC Authority Letter */}
              <div>
                <label
                  htmlFor="mc-authority"
                  className="block text-sm font-bold text-black mb-2"
                >
                  MC Authority Letter
                </label>
                <input
                  type="file"
                  id="mc-authority"
                  name="mc-authority"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:font-bold hover:file:bg-gray-800 cursor-pointer bg-white"
                />
              </div>

              {/* W-9 Form */}
              <div>
                <label
                  htmlFor="w9-form"
                  className="block text-sm font-bold text-black mb-2"
                >
                  W-9 Form
                </label>
                <input
                  type="file"
                  id="w9-form"
                  name="w9-form"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:font-bold hover:file:bg-gray-800 cursor-pointer bg-white"
                />
              </div>

              {/* Insurance Documents */}
              <div>
                <label
                  htmlFor="insurance-docs"
                  className="block text-sm font-bold text-black mb-2"
                >
                  Insurance Documents
                </label>
                <input
                  type="file"
                  id="insurance-docs"
                  name="insurance-docs"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white file:font-bold hover:file:bg-gray-800 cursor-pointer bg-white"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white font-bold text-lg py-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* Right Column - Testimonials */}
          <div className="hidden lg:block w-full h-[700px] relative overflow-hidden">
            {/* Fade overlay top */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

            {/* Fade overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 h-full">
              {/* Column 1 - Moving Up */}
              <div className="testimonial-column-1 flex flex-col gap-4 flex-1">
                {[...testimonials, ...testimonials].map(
                  (testimonial, index) => (
                    <div
                      key={`col1-${index}`}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex-shrink-0"
                    >
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        "{testimonial.review}"
                      </p>
                      <p className="text-xs font-bold text-black">
                        {testimonial.name}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Column 2 - Moving Down */}
              <div className="testimonial-column-2 flex flex-col gap-4 flex-1">
                {[...testimonials.slice(5), ...testimonials.slice(5)].map(
                  (testimonial, index) => (
                    <div
                      key={`col2-${index}`}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex-shrink-0"
                    >
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        "{testimonial.review}"
                      </p>
                      <p className="text-xs font-bold text-black">
                        {testimonial.name}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
