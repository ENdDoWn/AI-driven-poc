"use client";

import type { ComponentNode, FooterProps } from "@/types/components";
import ComponentRenderer from "../ComponentRenderer";

interface FooterComponentProps extends FooterProps {
  children?: ComponentNode[];
}

export default function Footer({
  text,
  links,
  backgroundColor,
  children,
}: FooterComponentProps) {
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
        {children && children.length > 0 && (
          <div className="footer-children">
            <ComponentRenderer components={children} />
          </div>
        )}
      </div>
    </footer>
  );
}
