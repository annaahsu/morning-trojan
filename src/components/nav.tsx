"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const showNav = pathname !== "/";

  return (
    showNav && (
      <header className="header">
        <div className="logo">
          <Link className="navlink" href="/">
            Morning, <span className="trojan">Trojan</span>
          </Link>
        </div>
        <nav className="nav">
          <Link
            className={`navlink${pathname === "/about" ? " active" : ""}`}
            href="/about"
          >
            About
          </Link>
          <span>•</span>
          <Link
            className={`navlink${
              pathname === "/archive" || pathname.includes("/p/")
                ? " active"
                : ""
            }`}
            href="/archive"
          >
            Archive
          </Link>
        </nav>
        <style>{`
          .navlink {
            color: inherit;
            text-decoration: none;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
          }

          .logo {
            font-weight: bold;
            font-size: 1.2rem;
          }

          .nav {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .trojan {
            color: var(--red);
          }

          .active {
            text-decoration: underline;
          }
      `}</style>
      </header>
    )
  );
}
