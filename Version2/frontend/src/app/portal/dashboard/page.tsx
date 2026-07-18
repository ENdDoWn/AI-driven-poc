import Link from "next/link";
import { WireframeMetric, WireframeSection, WireframeShell } from "@/components/WireframeShell";

const navigation = [
  { label: "Dashboard", href: "/portal/dashboard" },
  { label: "Onboarding", href: "/portal/onboarding" },
  { label: "My Websites", href: "/portal/websites" },
  { label: "Reviews & Approval", href: "/portal/reviews" },
  { label: "Subscription & Billing", href: "/portal/subscription" },
  { label: "Support Tickets", href: "/portal/tickets" },
];

export default function CustomerDashboardPage() {
  return (
    <WireframeShell area="Customer Portal" title="สวัสดี, Acme Company" role="Customer Owner" navigation={navigation}>
      <div className="mb-8 border-b-2 border-slate-300 pb-6">
        <p className="text-sm text-slate-500">Customer Owner · 1 website tenant</p>
        <h2 className="mt-2 text-xl font-bold">สถานะเว็บไซต์ของคุณ</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WireframeMetric label="Onboarding" value="72%" detail="ข้อมูลพร้อมผลิตบางส่วน" />
        <WireframeMetric label="Website status" value="Draft" detail="กำลังประกอบเว็บไซต์" />
        <WireframeMetric label="Pending review" value="01" detail="รอการตรวจสอบจากคุณ" />
        <WireframeMetric label="Edit quota" value="08/10" detail="เหลือ 8 ครั้งในรอบนี้" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <WireframeSection title="Onboarding checklist">
          <div className="grid gap-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="font-bold">ข้อมูลธุรกิจ</p>
                <p className="mt-1 text-sm text-slate-500">ชื่อบริษัท รายละเอียด และบริการหลัก</p>
              </div>
              <span className="border border-slate-400 px-3 py-1 text-xs font-bold">Complete</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="font-bold">Brand & Media</p>
                <p className="mt-1 text-sm text-slate-500">Logo สี และรูปภาพธุรกิจ</p>
              </div>
              <span className="border-2 border-slate-900 px-3 py-1 text-xs font-bold">In progress</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Domain & Approval</p>
                <p className="mt-1 text-sm text-slate-500">โดเมนและผู้อนุมัติเผยแพร่</p>
              </div>
              <span className="border border-dashed border-slate-400 px-3 py-1 text-xs font-bold text-slate-500">Pending</span>
            </div>
          </div>
          <Link href="/portal/onboarding" className="mt-6 inline-block border-2 border-slate-900 px-4 py-2 text-sm font-bold transition-colors duration-150 hover:bg-slate-900 hover:text-white">
            Continue onboarding →
          </Link>
        </WireframeSection>

        <WireframeSection title="My website">
          <div className="border-2 border-dashed border-slate-300 p-5">
            <div className="h-32 border-2 border-slate-300 bg-slate-100" />
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">Website tenant</p>
            <h3 className="mt-2 text-lg font-bold">Acme Accounting Website</h3>
            <p className="mt-2 text-sm text-slate-500">Blueprint: Accounting Starter · Version 01</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/portal/websites/acme/preview" className="border-2 border-slate-900 px-3 py-2 text-sm font-bold transition-colors duration-150 hover:bg-slate-900 hover:text-white">
                View preview
              </Link>
              <Link href="/portal/websites/acme" className="border border-slate-300 px-3 py-2 text-sm font-bold transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50">
                Website details
              </Link>
            </div>
          </div>
        </WireframeSection>

        <WireframeSection title="Needs your attention">
          <div className="grid gap-3">
            {[
              ["Review homepage preview", "Due 22 Jul", "/portal/websites/acme/preview"],
              ["Upload service images", "Onboarding", "/portal/onboarding/media"],
              ["Confirm primary domain", "Required before publish", "/portal/websites/acme/domain"],
            ].map(([title, detail, href]) => (
              <Link key={title} href={href} className="border border-slate-300 p-4 transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50">
                <p className="font-bold">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{detail}</p>
              </Link>
            ))}
          </div>
        </WireframeSection>

        <WireframeSection title="Recent support activity">
          <div className="grid gap-4 text-sm">
            <div className="border-b border-slate-200 pb-3">
              <p className="font-bold">#TK-0012 · Update contact details</p>
              <p className="mt-1 text-slate-500">Waiting for support · 18 Jul 2026</p>
            </div>
            <div>
              <p className="font-bold">#TK-0010 · Add service section</p>
              <p className="mt-1 text-slate-500">Completed · 15 Jul 2026</p>
            </div>
          </div>
          <Link href="/portal/tickets" className="mt-6 inline-block text-sm font-bold underline transition-colors duration-150 hover:text-slate-600">
            View all tickets →
          </Link>
        </WireframeSection>
      </div>
    </WireframeShell>
  );
}
