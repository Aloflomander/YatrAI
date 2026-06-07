"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "login" | "signup";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>("login");

  /* ── Login form state ── */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /* ── Signup form state ── */
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email: loginEmail, password: loginPassword });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
    });
  };

  /* ── Shared input style ── */
  const inputClass =
    "w-full bg-white border border-[#bec9c8] rounded-lg px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ═══════════════════════════════════════
          LEFT PANEL — Image + Brand
         ═══════════════════════════════════════ */}
      <div className="relative w-full md:w-1/2 min-h-[280px] md:min-h-screen overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
          alt="Indian heritage architecture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D6E6E]/70 via-[#0D6E6E]/50 to-[#0a5555]/90" />

        {/* Logo — top-left */}
        <Link
          href="/"
          className="absolute top-8 left-8 md:left-10 z-10 flex items-center gap-1.5 text-xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="text-white text-lg">▷</span>
          <span>
            Yatr<span className="text-accent-saffron">AI</span>
          </span>
        </Link>

        {/* Bottom text */}
        <div className="absolute bottom-10 md:bottom-12 left-8 md:left-10 z-10 max-w-[320px]">
          <h2
            className="text-2xl md:text-[36px] font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-heading)", lineHeight: "1.2" }}
          >
            Your journey begins here.
          </h2>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Experience the magic of AI-curated travel. Discover hidden gems and
            tailored itineraries.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          RIGHT PANEL — Form
         ═══════════════════════════════════════ */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-6 py-10 md:py-0">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <h1
            className="text-[28px] font-bold text-[#1A1A2E] mb-1.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Welcome back
          </h1>
          <p className="text-[#6e7979] text-sm mb-7">
            Enter your details to access your account.
          </p>

          {/* ── Tab Switcher ── */}
          <div className="flex border-b border-[#e5e7eb] mb-7">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 pb-3 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "login"
                  ? "text-primary border-b-2 border-primary"
                  : "text-[#6e7979] hover:text-on-surface"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 pb-3 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "signup"
                  ? "text-primary border-b-2 border-primary"
                  : "text-[#6e7979] hover:text-on-surface"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* ═══════════ LOGIN FORM ═══════════ */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-on-surface">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-primary font-medium hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#0a5555] text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer"
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-1">
                <div className="flex-1 h-px bg-[#e5e7eb]" />
                <span className="text-[13px] text-[#6e7979]">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-[#e5e7eb]" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => console.log("Google OAuth")}
                className="w-full flex items-center justify-center gap-3 bg-white border border-[#bec9c8] hover:bg-gray-50 text-on-surface font-medium py-3 rounded-full transition-colors cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </form>
          )}

          {/* ═══════════ SIGNUP FORM ═══════════ */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1.5">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#0a5555] text-white font-semibold py-3.5 rounded-full transition-colors cursor-pointer"
              >
                Create Account →
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-1">
                <div className="flex-1 h-px bg-[#e5e7eb]" />
                <span className="text-[13px] text-[#6e7979]">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-[#e5e7eb]" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => console.log("Google OAuth")}
                className="w-full flex items-center justify-center gap-3 bg-white border border-[#bec9c8] hover:bg-gray-50 text-on-surface font-medium py-3 rounded-full transition-colors cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[12px] text-[#6e7979] leading-relaxed">
              By continuing, you agree to YatrAI&apos;s{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
            <p className="text-[12px] text-[#6e7979] mt-1">
              © 2024 YatrAI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
