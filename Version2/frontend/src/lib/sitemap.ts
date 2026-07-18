export type SitemapSection = "shared" | "admin" | "portal" | "partner" | "public";
export type RouteKind = "dashboard" | "list" | "detail" | "form" | "preview" | "settings" | "report" | "public" | "transaction" | "inbox" | "kanban";

export type SitemapRoute = {
  pattern: string;
  label: string;
  section: SitemapSection;
  kind: RouteKind;
};

const route = (
  pattern: string,
  label: string,
  section: SitemapSection,
  kind: RouteKind = "list",
): SitemapRoute => ({ pattern, label, section, kind });

export const SITEMAP_ROUTES: SitemapRoute[] = [
  route("/login", "Login", "shared", "form"),
  route("/forgot-password", "Forgot password", "shared", "form"),
  route("/reset-password", "Reset password", "shared", "form"),
  route("/mfa/verify", "MFA verification", "shared", "form"),
  route("/invitation/:token", "Accept invitation", "shared", "form"),
  route("/profile", "Profile", "shared", "settings"),
  route("/preferences", "Preferences", "shared", "settings"),
  route("/notifications", "Notifications", "shared"),
  route("/security", "Security", "shared", "settings"),
  route("/session-expired", "Session expired", "shared", "form"),
  route("/403", "Access denied", "shared", "public"),
  route("/404", "Not found", "shared", "public"),
  route("/maintenance", "Maintenance", "shared", "public"),

  route("/admin/dashboard", "Dashboard", "admin", "dashboard"),
  route("/admin/sales-dashboard", "Sales Workspace", "admin", "dashboard"),
  route("/admin/sales-team", "Sales Team", "admin", "settings"),
  route("/admin/my-work", "Sales Workspace", "admin"),
  route("/admin/notifications", "Notifications", "admin"),
  route("/admin/inbox", "Unified Inbox", "admin", "inbox"),
  route("/admin/inbox/:id", "Conversation detail", "admin", "inbox"),
  route("/admin/form-submissions", "Form submissions", "admin"),
  route("/admin/form-submissions/:id", "Form submission detail", "admin", "detail"),
  route("/admin/calendar", "Due date / SLA calendar", "admin"),
  route("/admin/leads", "Lead list", "admin"),
  route("/admin/leads/:id", "Lead detail", "admin", "detail"),
  route("/admin/deals", "Deal pipeline", "admin", "kanban"),
  route("/admin/deals/:id", "Deal detail", "admin", "detail"),
  route("/admin/quotations", "Quotation list", "admin"),
  route("/admin/quotations/:id", "Quotation editor", "admin", "form"),
  route("/admin/contracts", "Contract list", "admin"),
  route("/admin/contracts/:id", "Contract detail", "admin", "detail"),
  route("/admin/customers", "Customer list", "admin"),
  route("/admin/customers/:id", "Customer 360", "admin", "detail"),
  route("/admin/companies", "Company list", "admin"),
  route("/admin/companies/:id", "Company detail", "admin", "detail"),
  route("/admin/organizations/:id", "Organization", "admin", "detail"),
  route("/admin/tenants/:id", "Tenant workspace", "admin", "detail"),
  route("/admin/subscriptions", "Subscription list", "admin"),
  route("/admin/subscriptions/:id", "Subscription detail", "admin", "detail"),
  route("/admin/invoices", "Invoice list", "admin"),
  route("/admin/invoices/:id", "Invoice detail", "admin", "detail"),
  route("/admin/payments", "Payment list", "admin"),
  route("/admin/collections", "Aging / overdue", "admin", "report"),
  route("/admin/refunds", "Refund requests", "admin"),
  route("/admin/onboarding", "Onboarding case board", "admin"),
  route("/admin/onboarding/:id", "Onboarding case detail", "admin", "detail"),
  route("/admin/intake-forms", "Intake form templates", "admin", "settings"),
  route("/admin/readiness", "Readiness queue", "admin"),
  route("/admin/production", "Production board", "admin", "dashboard"),
  route("/admin/production/:id", "Production job workspace", "admin", "detail"),
  route("/admin/content", "Content review queue", "admin"),
  route("/admin/websites/:id/builder", "Website builder", "admin", "form"),
  route("/admin/websites/:id/versions", "Website version history", "admin", "detail"),
  route("/admin/qa", "QA queue", "admin"),
  route("/admin/qa/:id", "QA run", "admin", "detail"),
  route("/admin/reviews", "Customer review queue", "admin"),
  route("/admin/domains", "Domain management", "admin"),
  route("/admin/deployments", "Deployment history", "admin"),
  route("/admin/tickets", "Ticket queue", "admin"),
  route("/admin/tickets/:id", "Ticket workspace", "admin", "detail"),
  route("/admin/support-quotas", "Support quota usage", "admin", "report"),
  route("/admin/estimates", "Out-of-scope estimates", "admin"),
  route("/admin/sla", "SLA dashboard", "admin", "report"),
  route("/admin/partners", "Partner list", "admin"),
  route("/admin/partners/:id", "Partner detail", "admin", "detail"),
  route("/admin/commissions", "Commission queue", "admin"),
  route("/admin/payouts", "Payout history", "admin"),
  route("/admin/users", "User management", "admin", "settings"),
  route("/admin/roles", "Roles & permissions", "admin", "settings"),
  route("/admin/packages", "Package configuration", "admin", "settings"),
  route("/admin/blueprints", "Blueprint library", "admin", "settings"),
  route("/admin/components", "Component library", "admin", "settings"),
  route("/admin/themes", "Theme library", "admin", "settings"),
  route("/admin/countries", "Country configuration", "admin", "settings"),
  route("/admin/integrations", "Integrations", "admin", "settings"),
  route("/admin/audit-logs", "Audit logs", "admin", "report"),
  route("/admin/reports/sales", "Sales report", "admin", "report"),
  route("/admin/reports/finance", "Finance report", "admin", "report"),
  route("/admin/reports/operations", "Operations report", "admin", "report"),
  route("/admin/reports/partners", "Partner report", "admin", "report"),
  route("/admin/reports/system", "System report", "admin", "report"),

  route("/portal/dashboard", "Dashboard", "portal", "dashboard"),
  route("/portal/tasks", "Tasks", "portal"),
  route("/portal/notifications", "Notifications", "portal"),
  route("/portal/onboarding", "Onboarding checklist", "portal"),
  route("/portal/onboarding/company", "Company information", "portal", "form"),
  route("/portal/onboarding/services", "Services information", "portal", "form"),
  route("/portal/onboarding/brand", "Brand information", "portal", "form"),
  route("/portal/onboarding/media", "Media assets", "portal", "form"),
  route("/portal/onboarding/domain", "Domain information", "portal", "form"),
  route("/portal/onboarding/review-submit", "Review and submit", "portal", "form"),
  route("/portal/websites", "Website list", "portal"),
  route("/portal/websites/:id", "Website overview", "portal", "detail"),
  route("/portal/websites/:id/preview", "Website preview", "portal", "preview"),
  route("/portal/websites/:id/content", "Website content", "portal", "form"),
  route("/portal/websites/:id/versions", "Website versions", "portal", "detail"),
  route("/portal/websites/:id/domain", "Domain status", "portal", "detail"),
  route("/portal/reviews", "Pending reviews", "portal"),
  route("/portal/reviews/:id", "Preview and comments", "portal", "preview"),
  route("/portal/reviews/:id/feedback", "Submit feedback", "portal", "form"),
  route("/portal/reviews/:id/approve", "Approve website", "portal", "form"),
  route("/portal/subscription", "Current subscription", "portal", "detail"),
  route("/portal/subscription/change-plan", "Change plan", "portal", "form"),
  route("/portal/subscription/renew", "Renew subscription", "portal", "form"),
  route("/portal/billing/invoices", "Invoices", "portal"),
  route("/portal/billing/invoices/:id", "Invoice detail", "portal", "detail"),
  route("/portal/billing/payment-methods", "Payment methods", "portal", "settings"),
  route("/portal/tickets", "Ticket list", "portal"),
  route("/portal/tickets/new", "Create ticket", "portal", "form"),
  route("/portal/tickets/:id", "Ticket detail", "portal", "detail"),
  route("/portal/support/quota", "Monthly support quota", "portal", "report"),
  route("/portal/support/estimates", "Support estimates", "portal"),
  route("/portal/organization/profile", "Organization profile", "portal", "settings"),
  route("/portal/organization/contacts", "Organization contacts", "portal"),
  route("/portal/organization/users", "Organization users", "portal", "settings"),
  route("/portal/organization/roles", "Organization roles", "portal", "settings"),
  route("/portal/settings", "Portal settings", "portal", "settings"),

  route("/partner/dashboard", "Partner dashboard", "partner", "dashboard"),
  route("/partner/notifications", "Notifications", "partner"),
  route("/partner/tasks", "Tasks", "partner"),
  route("/partner/leads", "Lead list", "partner"),
  route("/partner/leads/new", "Submit lead", "partner", "form"),
  route("/partner/leads/:id", "Lead status", "partner", "detail"),
  route("/partner/referral-links", "Referral links", "partner"),
  route("/partner/customers", "Attributed customers", "partner"),
  route("/partner/customers/:id", "Limited customer view", "partner", "detail"),
  route("/partner/subscriptions", "Subscription summary", "partner"),
  route("/partner/commissions", "Commission list", "partner"),
  route("/partner/commissions/:id", "Commission detail", "partner", "detail"),
  route("/partner/payouts", "Payout history", "partner"),
  route("/partner/statements", "Statements", "partner", "report"),
  route("/partner/brand", "Partner brand", "partner", "settings"),
  route("/partner/packages", "Assigned packages", "partner"),
  route("/partner/templates", "Marketing templates", "partner"),
  route("/partner/organization", "Partner organization", "partner", "settings"),
  route("/partner/users", "Partner users", "partner", "settings"),
  route("/partner/agreement", "Partner agreement", "partner", "detail"),
  route("/partner/settings", "Partner settings", "partner", "settings"),

  route("/", "Marketing home", "public", "public"),
  route("/pricing", "Pricing", "public", "public"),
  route("/solutions/:industry", "Industry solution", "public", "public"),
  route("/features", "Features", "public", "public"),
  route("/partners", "Partner program", "public", "public"),
  route("/contact", "Contact", "public", "form"),
  route("/get-started", "Get started", "public", "form"),
  route("/request-quote", "Request a quote", "public", "form"),
  route("/thank-you", "Thank you", "public", "public"),
  route("/partner-ref/:code", "Partner referral", "public", "form"),
  route("/q/:token", "Quotation review", "public", "transaction"),
  route("/q/:token/accept", "Accept quotation", "public", "transaction"),
  route("/q/:token/request-change", "Request quotation change", "public", "transaction"),
  route("/q/:token/reject", "Reject quotation", "public", "transaction"),
  route("/contract/:token", "Contract review", "public", "transaction"),
  route("/contract/:token/accept", "Accept contract", "public", "transaction"),
  route("/contract/:token/decline", "Decline contract", "public", "transaction"),
  route("/review/:token", "Website review", "public", "preview"),
  route("/review/:token/comments", "Review comments", "public", "form"),
  route("/review/:token/submit-feedback", "Submit review feedback", "public", "form"),
  route("/review/:token/approve", "Approve website", "public", "transaction"),
  route("/pay/:token", "Payment", "public", "transaction"),
  route("/pay/:token/success", "Payment success", "public", "transaction"),
  route("/pay/:token/failed", "Payment failed", "public", "transaction"),
  route("/receipt/:token", "Payment receipt", "public", "transaction"),
];

export const NAVIGATION: Record<Exclude<SitemapSection, "shared" | "public">, { label: string; href: string }[]> = {
  admin: [
    { label: "Dashboard", href: "/admin/sales-dashboard" },
    { label: "Sales Workspace", href: "/admin/my-work" },
    { label: "Sales Team", href: "/admin/sales-team" },
    { label: "Unified Inbox", href: "/admin/inbox" },
    { label: "Form submissions", href: "/admin/form-submissions" },
    { label: "Deal pipeline", href: "/admin/deals" },
    { label: "Company", href: "/admin/companies" },
    { label: "Contract", href: "/admin/contracts" },
    { label: "Onboarding", href: "/admin/onboarding" },
    { label: "Production", href: "/admin/production" },
    { label: "QA & Deployment", href: "/admin/qa" },
    { label: "Support Tickets", href: "/admin/tickets" },
    { label: "Platform Settings", href: "/admin/packages" },
    { label: "Reports", href: "/admin/reports/sales" },
  ],
  portal: [
    { label: "Dashboard", href: "/portal/dashboard" },
    { label: "Onboarding", href: "/portal/onboarding" },
    { label: "My Websites", href: "/portal/websites" },
    { label: "Reviews & Approval", href: "/portal/reviews" },
    { label: "Subscription & Billing", href: "/portal/subscription" },
    { label: "Support Tickets", href: "/portal/tickets" },
    { label: "Organization", href: "/portal/organization/profile" },
    { label: "Settings", href: "/portal/settings" },
  ],
  partner: [
    { label: "Dashboard", href: "/partner/dashboard" },
    { label: "Leads", href: "/partner/leads" },
    { label: "Customers", href: "/partner/customers" },
    { label: "Commissions", href: "/partner/commissions" },
    { label: "Payouts", href: "/partner/payouts" },
    { label: "Brand & Templates", href: "/partner/brand" },
    { label: "Organization", href: "/partner/organization" },
    { label: "Settings", href: "/partner/settings" },
  ],
};

function matchesPattern(pattern: string, path: string) {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);

  return (
    patternParts.length === pathParts.length &&
    patternParts.every((part, index) => part.startsWith(":") || part === pathParts[index])
  );
}

export function getRouteDefinition(path: string): SitemapRoute {
  const cleanPath = path.replace(/\/$/, "") || "/";
  return (
    SITEMAP_ROUTES.find((item) => matchesPattern(item.pattern, cleanPath)) ??
    route(cleanPath, humanizePath(cleanPath), getSection(cleanPath))
  );
}

export function getSection(path: string): SitemapSection {
  if (path.startsWith("/admin")) return "admin";
  if (path.startsWith("/portal")) return "portal";
  if (path.startsWith("/partner")) return "partner";
  if (["/login", "/profile", "/preferences", "/notifications", "/security"].includes(path)) return "shared";
  return "public";
}

export function sampleHref(pattern: string) {
  return pattern
    .replace(":id", "demo-id")
    .replace(":token", "demo-token")
    .replace(":industry", "accounting")
    .replace(":code", "demo-code");
}

function humanizePath(path: string) {
  const value = path.split("/").filter(Boolean).join(" / ").replace(/[-_]/g, " ");
  return value ? value.replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Home";
}

// --- Wireframe link resolution -------------------------------------------

function findRouteByPattern(pattern: string): SitemapRoute | undefined {
  return SITEMAP_ROUTES.find((item) => item.pattern === pattern);
}

/** Routes exactly one segment below `pattern` (e.g. /admin/leads -> /admin/leads/:id). */
export function getChildRoutes(pattern: string): SitemapRoute[] {
  const depth = pattern.split("/").filter(Boolean).length;
  const prefix = pattern === "/" ? "/" : `${pattern}/`;
  return SITEMAP_ROUTES.filter(
    (item) =>
      item.pattern.startsWith(prefix) &&
      item.pattern.split("/").filter(Boolean).length === depth + 1,
  );
}

export type WireframeAction = "create" | "detail" | "back" | "approve" | "confirm" | "request-change";

/**
 * Maps a template action on the current route to a real sitemap destination.
 * Returns a concrete href (params filled via sampleHref) or undefined when no
 * destination exists — in which case the template should render a demo-toast button.
 */
export function resolveActionTarget(route: SitemapRoute, action: WireframeAction): string | undefined {
  const children = getChildRoutes(route.pattern);
  const bySuffix = (...suffixes: string[]) =>
    children.find((child) => suffixes.includes(child.pattern.split("/").filter(Boolean).pop() ?? ""));

  let target: SitemapRoute | undefined;
  if (action === "create") target = bySuffix("new");
  if (action === "detail") {
    target = children.find((child) => {
      const last = child.pattern.split("/").filter(Boolean).pop() ?? "";
      return last.startsWith(":") && (child.kind === "detail" || child.kind === "form" || child.kind === "inbox");
    });
  }
  if (action === "approve") target = bySuffix("approve", "review-submit");
  if (action === "confirm") target = bySuffix("accept", "success", "approve");
  if (action === "request-change") target = bySuffix("request-change", "reject", "decline", "feedback");
  if (action === "back") {
    const parentPattern = "/" + route.pattern.split("/").filter(Boolean).slice(0, -1).join("/");
    target = parentPattern !== "/" ? findRouteByPattern(parentPattern) : undefined;
  }
  return target ? sampleHref(target.pattern) : undefined;
}
