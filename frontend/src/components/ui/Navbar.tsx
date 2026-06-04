"use client";

import type { NavbarProps } from "@/types/components";

export default function Navbar({ brand, links }: NavbarProps) {
  return (
    <nav className="comp-navbar">
      <div className="navbar-brand">{brand}</div>
      <ul className="navbar-links">
        {links?.map((link, i) => (
          <li key={i}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
