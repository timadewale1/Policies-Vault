"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/research", label: "Research" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    await logout();
    router.replace("/admin/login");
  }

  // Don't show shell on login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <>
      <header className="navbar">
        <div className="container navInner">
          <Link href="/admin" className="h-serif brand">
            Admin
          </Link>

          {/* desktop links */}
          <nav className="navLinks">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="navLink"
                style={{
                  color: pathname === l.href ? "var(--text)" : "var(--muted)",
                  fontWeight: pathname === l.href ? 600 : 400,
                }}
              >
                {l.label}
              </Link>
            ))}

            <button className="logoutBtn" onClick={onLogout} type="button">
              Logout
            </button>
          </nav>

          {/* mobile menu */}
          <MobileMenu links={links} pathname={pathname} onLogout={onLogout} />
        </div>

        {/* ✅ border under navbar */}
        <div className="navBorder" />
      </header>

      <main>{children}</main>

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--bg);
        }

        .navBorder {
          height: 1px;
          background: var(--border);
        }

        .navInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          gap: 14px;
        }

        .brand {
          font-size: 18px;
          font-weight: 600;
        }

        .navLinks {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .navLink {
          padding: 6px 4px;
          font-size: 12px;
        }

        .logoutBtn {
          margin-left: 8px;
          border: 1px solid var(--border);
          background: transparent;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 12px;
          color: var(--muted);
        }

        /* ✅ mobile */
        @media (max-width: 900px) {
          .navLinks {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

function MobileMenu({
  links,
  pathname,
  onLogout,
}: {
  links: { href: string; label: string }[];
  pathname: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  // close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        className="hamburgerBtn"
        onClick={() => setOpen((s) => !s)}
        aria-label={open ? "Close menu" : "Open menu"}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="mobileLink">
                <span
                  style={{
                    color: pathname === l.href ? "var(--text)" : "var(--muted)",
                    fontWeight: pathname === l.href ? 600 : 400,
                  }}
                >
                  {l.label}
                </span>
              </Link>
            ))}

            <button
              onClick={() => onLogout()}
              className="mobileLink mobileBtn"
              type="button"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hamburgerBtn {
          display: none;
          border: 1px solid var(--border);
          background: transparent;
          padding: 10px 12px;
          cursor: pointer;
        }

        .hamburgerBtn span {
          display: block;
          width: 18px;
          height: 2px;
          background: var(--text);
          margin: 4px 0;
        }

        .mobileMenu {
          position: absolute;
          left: 0;
          right: 0;
          top: calc(100% - 1px);
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          padding: 10px 0;
          z-index: 60;
        }

        .mobileLink {
          display: block;
          padding: 12px 0;
          font-size: 13px;
        }

        .mobileBtn {
          text-align: left;
          background: transparent;
          border: none;
          width: 100%;
          color: var(--muted);
          cursor: pointer;
          padding: 12px 0;
          font-size: 13px;
        }

        /* ✅ only show hamburger on mobile */
        @media (max-width: 900px) {
          .hamburgerBtn {
            display: inline-block;
          }
        }
      `}</style>
    </>
  );
}
