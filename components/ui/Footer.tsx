import Link from "next/link";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  explore: [
    { label: "Popular Destinations", href: "/explore" },
    { label: "Plan My Trip", href: "/plan" },
    { label: "Travel Guides", href: "#" },
    { label: "Quick Links", href: "#" },
  ],
  connect: [
    { label: "Instagram", href: "#", icon: true },
    { label: "Twitter", href: "#", icon: true },
    { label: "Facebook", href: "#", icon: true },
    { label: "LinkedIn", href: "#", icon: true },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-footer-navy w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-5 md:px-16 py-16 md:py-20 max-w-[1280px] mx-auto">
        {/* Brand Column */}
        <div className="col-span-1">
          <div className="mb-4">
            <div className="flex items-center gap-1.5 h-8">
              <svg
                className="h-8 w-auto text-white"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                  fill="currentColor"
                />
              </svg>
              <div
                className="flex items-baseline"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-white font-bold text-2xl leading-none">
                  Yatr
                </span>
                <span className="text-accent-saffron font-bold text-2xl leading-none">
                  AI
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            AI-powered travel planning built for the modern Indian explorer.
            Discover, plan, and travel smarter.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} YatrAI. All rights reserved.
          </p>
        </div>

        {/* Links Columns */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-saffron transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-saffron transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-saffron transition-colors text-base flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">
                      link
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 px-5 md:px-16 py-6 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for modern explorers
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-accent-saffron transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-accent-saffron transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
