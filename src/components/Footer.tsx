"use client";

import Link from "next/link";
import {
  Feather,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  Globe,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

// Define Types for our Footer Links
interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_DATA: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "API Docs", href: "/docs" },
      { name: "Guides", href: "/guides" },
      { name: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");

    if (email) {
      toast.success(`Subscribed! Welcome to the loop, ${email}`);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Mission - Takes up 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-6 transition-transform">
                <Feather className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Dev<span className="text-blue-600">Scribe</span>
              </span>
            </Link>
            <p className="text-gray-500 text-md leading-relaxed max-w-sm">
              The premier destination for modern web development insights. Join
              50k+ developers staying ahead of the curve.
            </p>
            <div className="flex gap-5">
              <SocialIcon Icon={Twitter} href="#" color="hover:text-sky-500" />
              <SocialIcon Icon={Github} href="#" color="hover:text-black" />
              <SocialIcon
                Icon={Linkedin}
                href="#"
                color="hover:text-blue-700"
              />
            </div>
          </div>

          {/* Dynamic Link Sections - Takes up 4 columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {FOOTER_DATA.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-gray-900 mb-5">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-500 hover:text-blue-600 hover:translate-x-1 transition-all inline-block text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter - Takes up 4 columns */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative overflow-hidden group">
              {/* Decorative background element */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-100 rounded-full blur-3xl group-hover:bg-blue-200 transition-colors" />

              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Weekly Insights
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Get high-quality articles, zero spam.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:bg-gray-800 transition shadow-lg shadow-black/5 flex items-center justify-center gap-2"
                >
                  Join Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-xs text-gray-400 font-medium">
            <p>© 2026 DevScribe Inc.</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              All Systems Operational
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-black transition py-2 px-3 bg-gray-50 rounded-lg">
              <Globe className="w-3 h-3" />
              English (US)
            </button>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
              in Next.js
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-component for Social Icons to keep it DRY
function SocialIcon({
  Icon,
  href,
  color,
}: {
  Icon: any;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className={`text-gray-400 transition-all duration-300 transform hover:-translate-y-1 ${color}`}
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}
