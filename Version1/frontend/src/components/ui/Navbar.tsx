"use client";

import type { NavbarProps } from "@/types/components";

export default function Navbar({
  brand,
  links,
  variant = "minimal",
  announcement,
  ctaText,
  ctaHref = "#contact",
}: NavbarProps) {
  const nav = (
    <div className="navbar-main">
      <div className="navbar-brand">{brand}</div>
      <ul className="navbar-links">
        {links?.map((link, i) => (
          <li key={i}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
      {ctaText && <a className="navbar-cta" href={ctaHref}>{ctaText}</a>}
    </div>
  );

  return (
    <nav className={`comp-navbar comp-navbar--${variant}`}>
      {variant === "announcement" && announcement && (
        <div className="navbar-announcement">{announcement}</div>
      )}
      {nav}
    </nav>
  );
}
