/** Page templates are compositions of reusable UI components. */

export const TEMPLATE_REGISTRY = {
  company_profile: {
    description: "Standard SME company profile page",
    sections: ["navbar", "hero", "services", "contact", "footer"],
  },
  landing_page: {
    description: "Conversion-focused single page",
    sections: ["navbar", "hero", "features", "cta", "footer"],
  },
} as const;

export type TemplateName = keyof typeof TEMPLATE_REGISTRY;
