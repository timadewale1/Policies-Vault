"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/publications", label: "Publications" },
//   { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navInner">
        <Link
          href="/"
          className="h-serif"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 20, fontWeight: 700 }}
        >
          <img src="/policy-vault.png" alt="Policy Vault logo" style={{ width: 70, height: 70, display: "block" }} />
          <span>Policies Vault</span>
        </Link>

        {/* Desktop Links */}
        <nav className="navLinks">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className="navLink">
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger (mobile only) */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="mobileLink"
                onClick={() => setOpen(false)}
              >
                {i.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
