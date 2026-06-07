"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      id="main-navbar"
      className="bg-surface-white sticky top-0 z-50 border-b border-outline-variant/30"
    >
      <div className="flex justify-between items-center px-5 md:px-16 w-full max-w-[1280px] mx-auto h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <svg
            className="h-8 w-auto text-primary"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex items-baseline" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-primary font-bold text-2xl leading-none">
              Yatr
            </span>
            <span className="text-accent-saffron font-bold text-2xl leading-none">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 items-center text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-primary font-semibold text-sm hover:text-deep-teal transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/plan"
            className="bg-accent-saffron text-white px-6 py-2.5 rounded-[50px] font-semibold text-sm btn-scale shadow-md hover:shadow-lg"
          >
            Plan My Trip
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-white border-t border-outline-variant/30 px-5 pb-6 animate-fade-in-up">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-base font-semibold transition-colors ${
                      isActive ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-outline-variant/30">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-primary font-semibold text-center py-2"
            >
              Login
            </Link>
            <Link
              href="/plan"
              onClick={() => setMobileOpen(false)}
              className="bg-accent-saffron text-white px-6 py-3 rounded-[50px] font-semibold text-center shadow-md"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
