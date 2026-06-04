"use client";

import type { FooterProps } from "@/types/components";

export default function Footer({
  text,
  links,
  backgroundColor,
}: FooterProps) {
  return (
    <footer
      className="comp-footer"
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
    >
      <div className="footer-content">
        {links && links.length > 0 && (
          <ul className="footer-links">
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        )}
        <p className="footer-text">{text}</p>
      </div>
    </footer>
  );
}
