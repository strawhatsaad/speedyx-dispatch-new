import FooterSection from "@/components/sections/FooterSection";
import React from "react";
import Image from "next/image";
import logo from "@/public/speedyx-logo.png";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SpeedyX Dispatch LLC",
  description:
    "Read the Privacy Policy of SpeedyX Dispatch LLC to learn how we collect, use, and protect your personal and business information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-black overflow-x-clip">
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <Link href={"/"}>
              <Image src={logo} alt="SpeedyX Logo" />
            </Link>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-6 py-12 leading-relaxed text-gray-700">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-black">
              Effective Date: October 29, 2025
            </p>
          </div>
          <p className="mb-8">
            SpeedyX Dispatch LLC (“we,” “our,” or “us”) values your privacy.
            This Privacy Policy explains how we collect, use, disclose, and
            protect your information when you visit our website, contact us, or
            use our dispatch services across the United States.
          </p>
          <p className="mb-8">
            By using our website or services, you agree to this Privacy Policy.
          </p>

          {/* Sections */}
          <PolicySection number="1" title="Information We Collect">
            <p className="mb-4">
              We may collect the following types of information:
            </p>

            <h4 className="font-semibold mt-6 mb-2">A. Personal Information</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Full Name</li>
              <li>Company Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Payment or banking details (for invoicing purposes)</li>
              <li>DOT/MC Number (if applicable)</li>
            </ul>

            <h4 className="font-semibold mt-6 mb-2">
              B. Non-Personal Information
            </h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>Browser type and version</li>
              <li>Device and operating system</li>
              <li>IP address and approximate location</li>
              <li>Website usage data via cookies and analytics tools</li>
            </ul>
          </PolicySection>

          <PolicySection number="2" title="How We Use Your Information">
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Provide and manage dispatch services for your trucking
                operations
              </li>
              <li>Communicate with carriers, drivers, and clients</li>
              <li>Send load confirmations, invoices, and service updates</li>
              <li>Improve our website, services, and customer support</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </PolicySection>

          <PolicySection number="3" title="Communication Consent">
            <p className="mb-4">
              By submitting your phone number or email through our website, you
              consent to receive:
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-4">
              <li>
                Service-related messages (load updates, confirmations, invoices,
                etc.)
              </li>
              <li>
                Occasional marketing or promotional messages related to dispatch
                services
              </li>
            </ul>
            <p>
              You may opt out at any time by replying “STOP” to text messages or
              clicking the “unsubscribe” link in emails.
              <span className="italic text-gray-600">
                (This clause ensures TCR and TCPA compliance for business text
                messaging.)
              </span>
            </p>
          </PolicySection>

          <PolicySection number="4" title="How We Protect Your Information">
            <p className="mb-4">
              We use industry-standard security measures to protect your
              personal information, including:
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-4">
              <li>Secure SSL encryption on our website</li>
              <li>Limited internal access to sensitive data</li>
              <li>Secure storage for payment and banking details</li>
            </ul>
            <p>
              While we take reasonable precautions, no method of electronic
              transmission is completely secure. You share information with us
              at your own risk.
            </p>
          </PolicySection>

          <PolicySection number="5" title="Sharing of Information">
            <p className="mb-4">We do not sell or rent your personal data.</p>
            <p>We may share information only with:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Partner carriers or brokers necessary to complete dispatch
                operations
              </li>
              <li>Payment processors and banks for invoicing purposes</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </PolicySection>

          <PolicySection number="6" title="Cookies & Tracking">
            <p>
              Our website may use cookies or similar technologies to improve
              your browsing experience and analyze site performance. You can
              disable cookies in your browser settings at any time.
            </p>
          </PolicySection>

          <PolicySection number="7" title="Data Retention">
            <p>
              We retain your information only as long as needed to provide our
              services, meet legal obligations, and maintain business records.
            </p>
          </PolicySection>

          <PolicySection number="8" title="Your Rights">
            <p className="mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-4">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent for communications</li>
              <li>Request a copy of your information</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:info@speedyxdispatch.com"
                className="text-blue-600 hover:underline"
              >
                info@speedyxdispatch.com
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection number="9" title="Children’s Privacy">
            <p>
              Our services are intended for professional trucking businesses and
              are not directed to individuals under 18. We do not knowingly
              collect information from minors.
            </p>
          </PolicySection>

          <PolicySection number="10" title="Updates to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated effective date.
            </p>
          </PolicySection>

          <PolicySection number="11" title="Contact Us">
            <p className="mb-2">
              If you have questions about this Privacy Policy or how we handle
              your data, please contact:
            </p>
            <p>
              <span className="font-semibold">SpeedyX Dispatch LLC</span>
              <br />
              Email:{" "}
              <a
                href="mailto:info@speedyxdispatch.com"
                className="text-blue-600 hover:underline"
              >
                info@speedyxdispatch.com
              </a>
            </p>
          </PolicySection>
        </section>
        <FooterSection />
      </main>
    </>
  );
}

/* Reusable Policy Section Component */
function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {number}. {title}
      </h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
