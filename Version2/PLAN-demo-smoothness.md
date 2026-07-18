# Plan: ทำให้ Low-design Wireframe Demo ลื่นไหลเหมือนเว็บจริง

## Context

Demo (Version2) เป็น wireframe demo แบบ static ของ Website Operating Platform — ~180 routes ใน `SITEMAP_ROUTES` map ไปยัง ~15 template components. ผู้ใช้รู้สึกว่า demo "ไม่ลื่นไหล" สาเหตุที่ยืนยันจากโค้ดแล้ว:

1. **ไม่มี CSS transition/animation เลยทั้งโปรเจกต์** (grep `transition|animate|duration` ใน `frontend/src` = 0 matches) — sidebar ยุบ/ขยายกระโดดทันที
2. **ปุ่ม/ลิงก์ตาย** — ปุ่ม `type="button"` ไม่มี `onClick`, ลิงก์ `href="#"` → กดแล้วไม่เกิดอะไร รู้สึกเหมือนเว็บพัง
3. **ไม่มี hover/active/focus state** บน element ที่ interactive
4. **การเปลี่ยนหน้ารู้สึกเหมือน reload** — `loading.tsx` skeleton แว้บขึ้นมาแม้หน้าเป็น static, ไม่มี page-enter transition

**Scope ที่ผู้ใช้ยืนยัน:** Smoothness เต็มรูปแบบ + เชื่อมปุ่มไปหน้าจริงใน sitemap (ปุ่มไม่มีปลายทาง → toast "อยู่ระหว่างพัฒนา"). **คงสไตล์ wireframe สีเทาเดิมทั้งหมด** — ห้าม redesign, ห้ามเพิ่ม mock content ความละเอียดสูง

ทุก path อยู่ใต้ `Version2/frontend`. Stack: Next.js 15.5 (App Router) + React 19.1 + Tailwind CSS 4.1.

## ข้อเท็จจริงจากโค้ด (verified — อย่า re-explore)

- `src/app/globals.css` มีบรรทัดเดียว: `@import "tailwindcss";`
- Client components ปัจจุบัน: `AdminSidebar.tsx`, `app/login/page.tsx`, `app/admin/my-work/page.tsx`, `app/admin/sales-team/page.tsx` — ที่เหลือเป็น server ทั้งหมด
- `href="#"` มี 2 ที่: `SitemapWireframe.tsx:101` (Quick links), `app/portal/dashboard/page.tsx:82`
- ปุ่มตายใน `SitemapWireframe.tsx`: :120 (+ Create), :137 (+ Add company), :161 (Export), :188 (+ Add contract), :215 (Filter / + Add deal), :243-244 (Primary/Secondary action), :294-295 (Save/submit, Save draft), :332 (Approve), :359 (Save changes), :413 (Submit), :436-437 (Confirm, Request change), :450/:505/:520-522 (Inbox) + `app/admin/dashboard/page.tsx` (+ Create production job)
- `RouteContent` (`SitemapWireframe.tsx:51-66`) **ไม่ส่ง `route` เข้า template** (ยกเว้น `FormTemplate isPublic`) — ต้องเพิ่ม prop
- Sidebar collapse: `AdminSidebar.tsx:53` — `${collapsed ? "lg:w-20" : "lg:w-72"}` ไม่มี transition; state อ่านจาก localStorage ใน `useEffect` (:40-42) → snap หลัง hydration
- `loading.tsx` มี 5 ไฟล์: `app/admin/loading.tsx`, `app/admin/deals/loading.tsx`, `app/admin/inbox/loading.tsx`, `app/portal/loading.tsx`, `app/partner/loading.tsx` — ทั้งหมด render `RouteLoading`
- ไม่มี layout ย่อยใต้ root — `WireframeShell`/sidebar render ต่อหน้า (page transition จะ fade ทั้งหน้า รวม sidebar)
- `/new` routes มีแค่ 2: `/portal/tickets/new`, `/partner/leads/new`; detail children (`:id`) มีเกือบทุก list
- `sampleHref()` (`sitemap.ts:253`) แทน `:id`→`demo-id`, `:token`→`demo-token`, `:industry`→`accounting`, `:code`→`demo-code` — ตรงกับ `generateStaticParams` → ลิงก์ที่สร้างผ่านมันจะไม่ 404
- React 19.1 stable **ไม่มี** `ViewTransition` export → ห้ามใช้ `experimental.viewTransition`

---

## Step 1 — Motion tokens ใน `src/app/globals.css`

แทนที่เนื้อไฟล์ด้วย:

```css
@import "tailwindcss";

@theme {
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);

  --animate-page-enter: page-enter 180ms var(--ease-smooth);
  --animate-fade-in-late: fade-in 200ms var(--ease-smooth) 250ms both;
  --animate-toast-in: toast-in 200ms var(--ease-smooth);

  @keyframes page-enter {
    from { opacity: 0.4; }
    to { opacity: 1; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
}

@layer base {
  html { scroll-behavior: smooth; }

  :focus-visible {
    outline: 2px solid var(--color-slate-900);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-delay: 0ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

หมายเหตุ: Tailwind 4 แปลง `--animate-*` เป็น utilities `animate-page-enter` ฯลฯ อัตโนมัติ; blanket reduced-motion override ทำให้ไม่ต้องใส่ `motion-safe:` รายจุด; `page-enter` เริ่มที่ opacity 0.4 (ไม่ใช่ 0) เพราะทั้ง tree รวม sidebar re-mount ต่อ navigation — fade เบา ๆ ไม่ให้เห็นเป็น flash

## Step 2 — Shared interaction classes: ไฟล์ใหม่ `src/lib/ui.ts`

เก็บ classname เป็น TS constants (ไม่ใช้ `@apply`) เพื่อให้ Tailwind scanner เห็น:

```ts
export const interact =
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out";

export const pressable = `${interact} cursor-pointer active:scale-[0.98] active:duration-75`;

export const btnPrimary =
  `${pressable} border-2 border-slate-900 bg-slate-900 text-sm font-bold text-white hover:bg-slate-700`;

export const btnSecondary =
  `${pressable} border-2 border-slate-300 text-sm font-bold hover:border-slate-900 hover:bg-slate-50`;

export const cardHover =
  `${interact} hover:border-slate-900 hover:shadow-[3px_3px_0_0_#cbd5e1]`;

export const rowHover = `${interact} hover:bg-slate-50`;
```

(padding ใส่รายจุดเพราะปุ่มมีทั้ง `px-4 py-2` และ `px-4 py-3`; ใช้ shadow literal `#cbd5e1` — อย่าใช้ `theme()` ใน arbitrary value)

## Step 3 — Sitemap link-resolution helpers ใน `src/lib/sitemap.ts`

เพิ่มต่อท้าย `sampleHref` (:253):

```ts
function findRouteByPattern(pattern: string): SitemapRoute | undefined {
  return SITEMAP_ROUTES.find((item) => item.pattern === pattern);
}

/** Routes ลึกกว่า pattern 1 ระดับ (เช่น /admin/leads -> /admin/leads/:id) */
export function getChildRoutes(pattern: string): SitemapRoute[] {
  const depth = pattern.split("/").filter(Boolean).length;
  const prefix = pattern === "/" ? "/" : `${pattern}/`;
  return SITEMAP_ROUTES.filter(
    (item) =>
      item.pattern.startsWith(prefix) &&
      item.pattern.split("/").filter(Boolean).length === depth + 1,
  );
}

export type WireframeAction =
  | "create" | "detail" | "back" | "approve" | "confirm" | "request-change";

/** คืน href จริง (ผ่าน sampleHref) หรือ undefined → template render ปุ่ม toast แทน */
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
```

ผลลัพธ์ที่คาดหวังกับ route table จริง (ใช้ตรวจตอน implement):
- `/admin/leads` + `detail` → `/admin/leads/demo-id` · `/portal/tickets` + `create` → `/portal/tickets/new` · `/admin/companies` + `create` → `undefined` (toast)
- `/q/:token` + `confirm` → `/q/demo-token/accept`, + `request-change` → `/q/demo-token/request-change`
- `/contract/:token` + `confirm` → accept, + `request-change` → decline · `/pay/:token` + `confirm` → success
- `/portal/reviews/:id` + `approve` → `/portal/reviews/demo-id/approve` · `/portal/tickets/new` + `back` → `/portal/tickets`

## Step 4 — Toast system (ไม่เพิ่ม dependency)

**ไฟล์ใหม่ `src/components/Toast.tsx`** (`"use client"`): `ToastProvider` + `useToast()` — React context เก็บ `{id, message}[]`, แสดง fixed bottom-center, `aria-live="polite"`, class `animate-toast-in`, สไตล์ `border-2 border-slate-900 bg-slate-900 text-white` (เข้ากับ wireframe), stack สูงสุด 3 (`current.slice(-2)`), auto-dismiss 2.6s ผ่าน `setTimeout`

**ไฟล์ใหม่ `src/components/DemoButton.tsx`** (`"use client"`) — client leaf เดียวที่ฝังใน server templates:

```tsx
"use client";
import type { ButtonHTMLAttributes } from "react";
import { useToast } from "@/components/Toast";

const DEFAULT_MESSAGE = "ส่วนนี้อยู่ระหว่างพัฒนา (โหมดเดโม)";

export function DemoButton({ message = DEFAULT_MESSAGE, onClick, ...props }:
  ButtonHTMLAttributes<HTMLButtonElement> & { message?: string }) {
  const showToast = useToast();
  return (
    <button type="button" {...props}
      onClick={(e) => { onClick?.(e); showToast(message); }} />
  );
}
```

**ไฟล์ใหม่ `src/components/ActionButton.tsx`** (server — แค่ branch):

```tsx
import Link from "next/link";
import { DemoButton } from "@/components/DemoButton";

export function ActionButton({ href, className, children }:
  { href?: string; className: string; children: React.ReactNode }) {
  if (href) return <Link href={href} className={className}>{children}</Link>;
  return <DemoButton className={className}>{children}</DemoButton>;
}
```

**แก้ `src/app/layout.tsx`**: wrap `{children}` ใน `<ToastProvider>` (server pages ยังเป็น server — ผ่านเป็น children ของ client provider ได้)

ข้อควรระวัง: เมื่อ `ActionButton` render เป็น `<Link>` กล่อง layout เปลี่ยนจาก button → a — เพิ่ม `inline-block text-center` (หรือ `block` เมื่ออยู่ใน grid cell) กันเลย์เอาต์ขยับ

## Step 5 — Page transition + แก้ skeleton flash

**เลือก `template.tsx` ไม่ใช่ `experimental.viewTransition`** (React 19.1 stable ไม่รองรับ)

**ไฟล์ใหม่ `src/app/template.tsx`** (server):

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter">{children}</div>;
}
```

`template.tsx` re-mount DOM ต่อ navigation → replay enter animation ได้โดยไม่มี client JS. Trade-off ที่ยอมรับ: sidebar fade ไปด้วย (เพราะไม่มี nested layout) — opacity 0.4→1 @180ms ออกแบบมาให้แทบมองไม่เห็น. **ห้ามเพิ่ม translate/scale** ที่ระดับหน้า

**Skeleton flash — delay ไม่ลบ:** เก็บ `loading.tsx` ทั้ง 5 ไฟล์ไว้ แต่แก้ root div ของ `src/components/RouteLoading.tsx` (:3) เพิ่ม `animate-fade-in-late` → skeleton โปร่งใสช่วง 250ms แรก (`both` คุม opacity 0 ระหว่าง delay) — production static pages resolve เร็วกว่านั้น skeleton จึงไม่แว้บ; dev ยังเห็น skeleton แบบนุ่มนวลตอน compile

## Step 6 — AdminSidebar: collapse ลื่น, active state, chevron

ทั้งหมดใน `src/components/AdminSidebar.tsx`:

1. **Width transition โดยไม่ animate ตอนโหลด** — localStorage อ่านหลัง hydration (:40-42) ถ้าใส่ transition ตรง ๆ จะเห็น 72→20 animate ทุกครั้งที่ reload. Gate ด้วย state:
   ```tsx
   const [hydrated, setHydrated] = useState(false);
   useEffect(() => {
     setCollapsed(window.localStorage.getItem("wop-admin-sidebar-collapsed") === "true");
     requestAnimationFrame(() => requestAnimationFrame(() => setHydrated(true)));
   }, []);
   ```
   บรรทัด :53 เพิ่ม `overflow-x-hidden` และ `${hydrated ? "transition-[width] duration-200 ease-smooth" : ""}`
2. **Chevron**: แทน `{collapsed ? "→" : "←"}` (:56) ด้วย chevron SVG ใน `<span className={`inline-block transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}>` — คง aria-label/title เดิม + เพิ่ม `active:scale-[0.98]`
3. **Nav items** (:72-84): เพิ่ม `transition-colors duration-150` + `aria-current={isActive ? "page" : undefined}` — คง active styles เดิม (`border-slate-900 bg-slate-900 text-white`). ทำเหมือนกันกับ Logout (:91)
4. **Label**: คง `{!collapsed && item.label}` แต่เพิ่ม `whitespace-nowrap` บน span กันข้อความ wrap ระหว่าง width animate
5. **ห้ามสร้าง mobile drawer** (นอก scope — บน `<lg` sidebar เป็น block เต็มกว้างอยู่แล้ว)
6. ทำข้อ 3 ซ้ำกับ nav ใน `src/components/WireframeShell.tsx` (:41-53 — ใช้โดย portal/partner)

## Step 7 — เชื่อมปุ่ม/ลิงก์ใน `src/components/SitemapWireframe.tsx` (ไฟล์ใหญ่สุด)

**7a.** ส่ง `route` เข้า templates: แก้ `RouteContent` (:51-66) ให้ `DashboardTemplate`, `ListTemplate`, `CompanyTableTemplate`, `ContractTableTemplate`, `FormSubmissionsTemplate`, `DetailTemplate`, `FormTemplate`, `PreviewTemplate`, `TransactionTemplate` รับ prop `route: SitemapRoute`. Import `resolveActionTarget`, constants จาก `@/lib/ui`, `ActionButton`, `DemoButton`

**7b. รายจุด** (line refs = ก่อนแก้):

| Template | จุดแก้ |
|---|---|
| DashboardTemplate :100-104 | Quick links `href="#"` → ใช้ 4 รายการแรกจาก `NAVIGATION[route.section]` (ข้าม href ปัจจุบัน): label + href จริง; เพิ่ม `${interact} hover:bg-slate-50` |
| ListTemplate :120 | `+ Create` → `<ActionButton href={resolveActionTarget(route, "create")} className={`${btnPrimary} px-4 py-2`}>` |
| ListTemplate :124 + `Table` :533 | เพิ่ม prop `rowHref?` ให้ `Table`; ListTemplate ส่ง `resolveActionTarget(route, "detail")`; เมื่อมี `rowHref`: `<tr className={rowHover}>` + wrap name cell (:548) ใน `<Link href={rowHref} className="hover:underline">` (pattern เดียวกับ FormSubmissionsTemplate :169). เมื่อไม่มี (Recent activity, history) — ไม่ใส่ cursor/link, อย่า fake affordance |
| CompanyTableTemplate :137/:141 | `+ Add company` → ActionButton (`create` = undefined → toast); `Table rowHref` ผ่าน `detail` |
| ContractTableTemplate :188/:195 | เหมือนกัน; แถว inline `<tbody>` เพิ่ม `rowHover` + ลิงก์ชื่อ contract ไป `detail` |
| FormSubmissionsTemplate :161/:169 | `Export` → DemoButton; แถวมีลิงก์แล้ว — เพิ่ม `rowHover` บน `<tr>` + `interact` บนลิงก์ |
| DealKanbanTemplate :215/:223 | `Filter`/`+ Add deal` → DemoButton (`btnSecondary`/`btnPrimary`); การ์ดเป็น Link แล้ว — เพิ่ม `cardHover` + `active:scale-[0.99]` |
| DetailTemplate :243-244 | Primary → DemoButton (`btnPrimary`); Secondary เปลี่ยนเป็น `← Back to list` → ActionButton `back` |
| FormTemplate :294-295 | ทั้งสอง → DemoButton; เพิ่มปุ่มที่สาม `ยกเลิก` → ActionButton `back` |
| PreviewTemplate :332 | → ActionButton `approve` |
| SettingsTemplate :344-348/:359 | nav items ที่ไม่ active: `div` → DemoButton + `interact hover:border-slate-900`; `Save changes` → DemoButton |
| PublicTemplate :413/:397-398 | `Submit` → DemoButton; CTA links เพิ่ม transition จาก `btnPrimary`/`btnSecondary` |
| TransactionTemplate :436-437 | `Confirm` → ActionButton `confirm`; `Request change` → ActionButton `request-change` |
| InboxTemplate :450/:471/:505/:520-522 | Channel filters → DemoButton (+`interact`); conversation cards ทุกใบชี้ `/admin/inbox/demo-conversation` (เลิกใช้ `#` fallback); `Send`/`Create Lead`/`Assign owner`/`Create quotation` → DemoButton |
| `Placeholder` :560 | **ปล่อยไว้** — เป็น visual stub, ห้ามใส่ cursor-pointer |
| PublicWireframeShell :564 | เพิ่ม `interact` บน nav links + ปุ่ม Login |

**7c.** Sweep ความสม่ำเสมอ: ปุ่ม `border-slate-900 bg-slate-900 text-white` ทุกตัว → `btnPrimary`, ปุ่ม `border-slate-300` → `btnSecondary`. `WireframeMetric`/`WireframeSection` **คง static** — ไม่ interactive อย่าเพิ่ม hover

## Step 8 — Sweep หน้า bespoke

- `app/portal/dashboard/page.tsx:82` — quick links `href="#"` → route จริงตาม label (`/portal/websites`, `/portal/reviews`, `/portal/billing/invoices`, `/portal/tickets`) + `interact`
- `app/admin/dashboard/page.tsx` — `+ Create production job` → DemoButton (คง visual เดิม); quick links เพิ่ม `interact`
- `app/admin/my-work/page.tsx`, `app/admin/sales-team/page.tsx`, `app/login/page.tsx` (client อยู่แล้ว): grep หา `type="button"` ที่ไม่มี onClick และ `href="#"` — ปุ่มตายใช้ `useToast()` ตรง ๆ + เพิ่ม `interact`/`pressable`
- `app/page.tsx` (home): ลิงก์จริงหมดแล้ว — เพิ่ม `interact` บน nav/CTA/plan cards + `transition-colors` บน FAQ summary (ความสำคัญต่ำ)
- `app/sitemap-preview/page.tsx`: เพิ่ม `interact hover:bg-slate-50` บนลิงก์ (อ่านไฟล์ก่อน — สั้น)

## ลำดับทำ + ความเสี่ยง

ลำดับ: **1 → 2 → 3 → 4 → 6 → 5 → 7 → 8 → verify** (step 5/6 อิสระจาก 7 ตรวจก่อนได้)

- Step 7 diff ใหญ่สุด (~15 templates ในไฟล์ 590 บรรทัด) → **ทำ ListTemplate ให้จบก่อน ตรวจที่ `/admin/leads` แล้วค่อย batch ที่เหลือ**
- Heuristic ของ `resolveActionTarget` อาจ link เพี้ยนบาง route — ทุก output ผ่าน `sampleHref` จึง**ไม่มีทาง 404** (แย่สุดคือไปหน้าอื่นที่มีจริง) — เทียบกับตารางคาดหวังใน Step 3
- Fade ทั้งหน้า (รวม sidebar) เป็น trade-off ที่ยอมรับ; escape hatch คือ refactor เป็น `app/admin/layout.tsx` — **นอก scope**

## Verification

1. `cd frontend && npm run dev` (root ไม่มี workspace script); จบงานรัน `npm run build` — จะ exercise `generateStaticParams` ทั้ง ~180 routes จับ href ที่ไม่ prerender
2. ตรวจ manual:
   - **Sidebar** `/admin/dashboard`: กดยุบ — width animate 200ms, chevron หมุน, ไม่ snap; reload ทั้ง state ยุบ — **ไม่ animate ตอนโหลด**; active item ตาม navigation + มี `aria-current="page"` ใน DOM
   - **Toast** `/admin/companies`: `+ Add company` ขึ้น toast + ปุ่มยุบเมื่อกด; กดรัว 3 ครั้ง stack ไม่เกิน 3; หายเอง ~2.6s
   - **Links**: `/admin/leads` ชื่อแถว → `/admin/leads/demo-id`; Back to list → `/admin/leads`; `/portal/tickets` + Create → `/portal/tickets/new`; ยกเลิก → กลับ; `/q/demo-token` Confirm → accept; `/admin/inbox` การ์ดทุกใบกดได้
   - **Transition**: เดินระหว่างเมนู — fade นุ่ม, ไม่มี skeleton แว้บ (ตรวจ prod: `npm run build && npm run start`)
   - **Reduced motion**: DevTools → Rendering → emulate `prefers-reduced-motion: reduce` — ไม่มี animation, toast ยังขึ้น/หายทันที
   - **Focus**: Tab ผ่าน `/admin/deals` — เห็น outline 2px บนลิงก์/ปุ่ม/การ์ด

## Critical files

- `frontend/src/components/SitemapWireframe.tsx` (แก้ใหญ่สุด)
- `frontend/src/lib/sitemap.ts` (เพิ่ม helpers)
- `frontend/src/components/AdminSidebar.tsx`
- `frontend/src/components/WireframeShell.tsx`
- `frontend/src/app/globals.css`, `frontend/src/app/layout.tsx`
- ไฟล์ใหม่: `frontend/src/lib/ui.ts`, `frontend/src/components/Toast.tsx`, `frontend/src/components/DemoButton.tsx`, `frontend/src/components/ActionButton.tsx`, `frontend/src/app/template.tsx`
- `frontend/src/components/RouteLoading.tsx`
