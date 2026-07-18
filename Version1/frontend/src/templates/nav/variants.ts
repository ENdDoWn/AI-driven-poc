/** Navigation template variants. The Navbar component renders these variants. */

export const NAV_VARIANTS = {
  minimal: { description: "Simple horizontal navigation", layout: "horizontal" },
  centered: { description: "Centered brand and links", layout: "centered" },
  split: { description: "Light navigation with CTA split", layout: "horizontal" },
  announcement: { description: "Navigation with announcement bar", layout: "horizontal" },
  glass: { description: "Blurred glass navigation", layout: "horizontal" },
  underline: { description: "Light navigation with active underline", layout: "horizontal" },
  sidebar: { description: "Vertical sidebar navigation", layout: "vertical" },
} as const;

export type NavVariant = keyof typeof NAV_VARIANTS;
