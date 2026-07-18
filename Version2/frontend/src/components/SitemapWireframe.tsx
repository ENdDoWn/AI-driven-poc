"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  getRouteDefinition,
  getSection,
  NAVIGATION,
  resolveActionTarget,
  type SitemapRoute,
} from "@/lib/sitemap";
import { WireframeHeader, WireframeMetric, WireframeSection, WireframeShell } from "@/components/WireframeShell";
import { ActionButton } from "@/components/ActionButton";
import { DemoButton } from "@/components/DemoButton";
import { interact, btnPrimary, btnSecondary, cardHover, rowHover } from "@/lib/ui";

const sectionNames = {
  admin: "Internal Back Office",
  portal: "Customer Portal",
  partner: "Partner Portal",
};

export function SitemapWireframe({ path }: { path: string }) {
  const route = getRouteDefinition(path);
  const section = getSection(path);

  if (section === "admin") {
    const activeHref = NAVIGATION.admin.find((item) => path === item.href || path.startsWith(`${item.href}/`))?.href;
    const role = activeHref === "/admin/sales-team"
      ? "Sales Manager"
      : ["/admin/inbox", "/admin/form-submissions", "/admin/deals", "/admin/companies", "/admin/contracts", "/admin/leads", "/admin/my-work", "/admin/sales-dashboard"].includes(activeHref ?? "")
        ? "Sales"
        : "Super Admin / Management";

    return (
      <WireframeHeader area={sectionNames.admin} title={route.label} role={role} fullBleed={route.kind === "inbox"}>
        <RouteContent route={route} />
      </WireframeHeader>
    );
  }

  if (section === "portal" || section === "partner") {
    const navigation = NAVIGATION[section];
    const activeHref = navigation.find((item) => path === item.href || path.startsWith(`${item.href}/`))?.href;
    const role = section === "portal" ? "Customer Owner" : "Partner / Reseller";

    return (
      <WireframeShell
        area={sectionNames[section]}
        title={route.label}
        role={role}
        navigation={navigation}
        activeHref={activeHref}
        fullBleed={route.kind === "inbox"}
      >
        <RouteContent route={route} />
      </WireframeShell>
    );
  }

  return (
    <PublicWireframeShell area={section === "shared" ? "Shared Authentication" : "Public Experience"}>
      <RouteContent route={route} />
    </PublicWireframeShell>
  );
}

function RouteContent({ route }: { route: SitemapRoute }) {
  if (route.kind === "dashboard") return <DashboardTemplate route={route} />;
  if (route.kind === "preview") return <PreviewTemplate route={route} />;
  if (route.kind === "form") return <FormTemplate route={route} isPublic={route.section === "public"} />;
  if (route.kind === "settings") return <SettingsTemplate />;
  if (route.kind === "report") return <ReportTemplate />;
  if (route.kind === "transaction") return <TransactionTemplate route={route} />;
  if (route.kind === "inbox") return <InboxTemplate />;
  if (route.kind === "kanban") return <DealKanbanTemplate />;
  if (route.pattern === "/admin/companies") return <CompanyTableTemplate route={route} />;
  if (route.pattern === "/admin/contracts") return <ContractTableTemplate route={route} />;
  if (route.pattern === "/admin/form-submissions") return <FormSubmissionsTemplate />;
  if (route.kind === "public") return <PublicTemplate />;
  if (route.kind === "detail") return <DetailTemplate route={route} />;
  return <ListTemplate route={route} />;
}

function DashboardTemplate({ route }: { route: SitemapRoute }) {
  const navItems =
    route.section === "admin" || route.section === "portal" || route.section === "partner"
      ? NAVIGATION[route.section].filter((item) => item.href !== route.pattern).slice(0, 4)
      : [];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WireframeMetric label="Open items" value="24" detail="Across current workspace" />
        <WireframeMetric label="In progress" value="12" detail="Needs team attention" />
        <WireframeMetric label="Waiting" value="08" detail="Customer or external action" />
        <WireframeMetric label="Completed" value="91%" detail="Current period" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <WireframeSection title="Workflow overview">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['New', 'In progress', 'Waiting review', 'Completed'].map((label, index) => (
              <div key={label} className="border-2 border-dashed border-slate-300 p-4">
                <p className="text-sm text-slate-600">{label}</p>
                <p className="mt-5 text-2xl font-bold">{[8, 12, 6, 24][index]}</p>
              </div>
            ))}
          </div>
        </WireframeSection>
        <WireframeSection title="Upcoming actions">
          <div className="grid gap-3">
            {['Review submitted content', 'Confirm approval', 'Check due date'].map((label) => (
              <div key={label} className="border-b border-slate-200 pb-3 text-sm font-bold">{label}</div>
            ))}
          </div>
        </WireframeSection>
        <WireframeSection title="Recent activity">
          <Table rows={['Acme Accounting', 'Green Clinic', 'North Star Studio']} />
        </WireframeSection>
        <WireframeSection title="Quick links">
          <div className="grid gap-3 sm:grid-cols-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`${interact} border border-slate-300 p-3 text-sm font-bold hover:border-slate-900 hover:bg-slate-50`}>
                {item.label} →
              </Link>
            ))}
          </div>
        </WireframeSection>
      </div>
    </>
  );
}

function ListTemplate({ route }: { route: SitemapRoute }) {
  return (
    <div className="grid gap-6">
      <WireframeSection title="Filters and actions">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
          <Placeholder label="Search" />
          <Placeholder label="Status: All" />
          <Placeholder label="Owner: All" />
          <ActionButton href={resolveActionTarget(route, "create")} className={`${btnPrimary} px-4 py-2`}>+ Create</ActionButton>
        </div>
      </WireframeSection>
      <WireframeSection title="Results">
        <Table rows={['Acme Accounting', 'Green Clinic', 'North Star Studio', 'Bright Home']} rowHref={resolveActionTarget(route, "detail")} />
      </WireframeSection>
    </div>
  );
}

function CompanyTableTemplate({ route }: { route: SitemapRoute }) {
  return (
    <div className="grid gap-6">
      <WireframeSection title="Company table">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_auto]">
          <Placeholder label="Search company" />
          <Placeholder label="Status: All" />
          <ActionButton href={resolveActionTarget(route, "create")} className={`${btnPrimary} px-4 py-2`}>+ Add company</ActionButton>
        </div>
      </WireframeSection>
      <WireframeSection title="Companies">
        <Table rows={['Green Clinic Co., Ltd.', 'North Star Studio', 'Acme Accounting', 'Bright Home']} rowHref={resolveActionTarget(route, "detail")} />
      </WireframeSection>
    </div>
  );
}

function FormSubmissionsTemplate() {
  const rows = [
    { contact: 'คุณต้น', form: 'ขอใบเสนอราคา', source: '/request-quote', status: 'New', submittedAt: getDateOffset(0, 10, 31) },
    { contact: 'บริษัท Green Clinic', form: 'ติดต่อเรา', source: '/contact', status: 'Assigned', submittedAt: getDateOffset(0, 10, 18) },
    { contact: 'คุณเมย์', form: 'Landing Page ร้านอาหาร', source: '/campaign/restaurant', status: 'Converted', submittedAt: getDateOffset(-1, 14, 5) },
  ];
  const initialDateRange = getThisWeekRange();
  const [fromDate, setFromDate] = useState(initialDateRange.from);
  const [toDate, setToDate] = useState(initialDateRange.to);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const filteredRows = useMemo(
    () => rows.filter((row) => {
      const submittedDate = getDateInputValue(new Date(row.submittedAt));
      return (!fromDate || submittedDate >= fromDate) && (!toDate || submittedDate <= toDate);
    }),
    [fromDate, toDate],
  );

  return (
    <div className="grid gap-6">
      <WireframeSection
        title="Customer-submitted forms"
        action={
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              aria-expanded={isDateFilterOpen}
              aria-controls="submission-date-filter"
              onClick={() => setIsDateFilterOpen((open) => !open)}
              className={`${btnSecondary} px-3 py-2`}
            >
              Filter
            </button>
            <DemoButton className={`${btnPrimary} px-4 py-2`} onClick={() => exportSubmissions(filteredRows)}>Export</DemoButton>
            {isDateFilterOpen ? (
              <div id="submission-date-filter" className="absolute right-0 top-full z-10 mt-2 w-80 border-2 border-slate-300 bg-white p-4 shadow-[4px_4px_0_0_#cbd5e1]">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-xs font-bold text-slate-500" htmlFor="submission-from-date">
                    From
                    <input id="submission-from-date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className="h-10 border-2 border-slate-300 bg-white px-2 text-sm font-normal text-slate-900" />
                    <span className="font-normal text-slate-400">{formatDateInput(fromDate)}</span>
                  </label>
                  <label className="grid gap-1 text-xs font-bold text-slate-500" htmlFor="submission-to-date">
                    To
                    <input id="submission-to-date" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} className="h-10 border-2 border-slate-300 bg-white px-2 text-sm font-normal text-slate-900" />
                    <span className="font-normal text-slate-400">{formatDateInput(toDate)}</span>
                  </label>
                </div>
                <button type="button" onClick={() => { const range = getThisWeekRange(); setFromDate(range.from); setToDate(range.to); }} className={`${btnSecondary} mt-3 w-full px-3 py-2`}>
                  This week
                </button>
              </div>
            ) : null}
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500"><tr><th className="pb-3 pr-4">Contact</th><th className="pb-3 pr-4">Form source</th><th className="pb-3 pr-4">Status</th><th className="pb-3">Received</th></tr></thead>
            <tbody>{filteredRows.length > 0 ? filteredRows.map((row) => <tr key={`${row.contact}-${row.form}`} className={`border-b border-slate-200 ${rowHover}`}><td className="py-4 pr-4 font-bold"><Link href="/admin/form-submissions/demo-submission" className={`${interact} hover:underline`}>{row.contact}</Link></td><td className="py-4 pr-4"><p>{row.form}</p><p className="mt-1 font-mono text-xs text-slate-500">{row.source}</p></td><td className="py-4 pr-4"><span className="border border-slate-400 px-2 py-1 text-xs">{row.status}</span></td><td className="py-4">{formatReceived(row.submittedAt)}</td></tr>) : <tr><td colSpan={4} className="py-8 text-center text-sm text-slate-500">No submissions in this date range.</td></tr>}</tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-slate-500">แสดง {filteredRows.length} จาก {rows.length} รายการ</p>
      </WireframeSection>
      <WireframeSection title="Submission workflow">
        <div className="grid gap-3 sm:grid-cols-4">{['รับข้อมูลจาก Form', 'ตรวจสอบข้อมูล', 'สร้าง / merge Lead', 'ส่งต่อ Deal หรือ Sales'].map((step, index) => <div key={step} className="border-2 border-dashed border-slate-300 p-4"><p className="text-xs font-bold text-slate-500">0{index + 1}</p><p className="mt-2 text-sm font-bold">{step}</p></div>)}</div>
      </WireframeSection>
    </div>
  );
}

function getDateOffset(offset: number, hour: number, minute: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

function getDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getThisWeekRange() {
  const today = new Date();
  const monday = new Date(today);
  const day = today.getDay();
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  return { from: getDateInputValue(monday), to: getDateInputValue(today) };
}

function formatDateInput(value: string) {
  if (!value) return 'เลือกวันที่';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function formatReceived(date: string) {
  return new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date));
}

function exportSubmissions(rows: Array<{ contact: string; form: string; source: string; status: string; submittedAt: string }>) {
  const headers = ['Contact', 'Form source', 'Submitted from', 'Status', 'Received'];
  const csvRows = rows.map((row) => [row.contact, row.form, row.source, row.status, formatReceived(row.submittedAt)]);
  const csv = [headers, ...csvRows].map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `form-submissions-${getDateInputValue(new Date())}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function ContractTableTemplate({ route }: { route: SitemapRoute }) {
  const detailHref = resolveActionTarget(route, "detail");
  return (
    <div className="grid gap-6">
      <WireframeSection title="Contract table">
        <div className="grid gap-3 md:grid-cols-[1.3fr_1fr_1fr_auto]">
          <Placeholder label="Search contract / company" />
          <Placeholder label="Status: All" />
          <Placeholder label="Expiry: All" />
          <ActionButton href={resolveActionTarget(route, "create")} className={`${btnPrimary} px-4 py-2`}>+ Add contract</ActionButton>
        </div>
      </WireframeSection>
      <WireframeSection title="Contracts · one company can have many contracts">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500"><tr><th className="pb-3 pr-4">Contract</th><th className="pb-3 pr-4">Company</th><th className="pb-3 pr-4">Status</th><th className="pb-3 pr-4">Start</th><th className="pb-3">End</th></tr></thead>
            <tbody>{[['Website Retainer #001','Green Clinic Co., Ltd.','Active','01 Jan 2026','31 Dec 2026'],['SEO Add-on #004','Green Clinic Co., Ltd.','Active','01 Mar 2026','28 Feb 2027'],['Corporate Website #018','North Star Studio','Pending signature','18 Jul 2026','17 Jul 2027']].map((row) => <tr key={row[0]} className={`border-b border-slate-200 ${rowHover}`}><td className="py-4 pr-4 font-bold">{detailHref ? <Link href={detailHref} className={`${interact} hover:underline`}>{row[0]}</Link> : row[0]}</td><td className="py-4 pr-4">{row[1]}</td><td className="py-4 pr-4"><span className="border border-slate-400 px-2 py-1 text-xs">{row[2]}</span></td><td className="py-4 pr-4">{row[3]}</td><td className="py-4">{row[4]}</td></tr>)}</tbody>
          </table>
        </div>
      </WireframeSection>
    </div>
  );
}

function DealKanbanTemplate() {
  const columns: Array<[string, Array<[string, string, string, string, string]>]> = [
    ['New', [['DEAL-001', 'Green Clinic', 'Website redesign', '฿180,000', '60'], ['DEAL-002', 'Bright Home', 'สร้างเว็บไซต์ฟรี → Pro', '฿75,000', '52']]],
    ['Qualified', [['DEAL-014', 'North Star Studio', 'SEO + Content', '฿120,000', '68'], ['DEAL-016', 'Lanna Cafe', 'Restaurant website', '฿95,000', '72']]],
    ['Proposal', [['DEAL-021', 'Acme Accounting', 'Corporate website', '฿250,000', '76'], ['DEAL-023', 'Urban Living', 'E-commerce website', '฿320,000', '80']]],
    ['Negotiation', [['DEAL-031', 'Siam Wellness', 'Booking platform', '฿420,000', '84'], ['DEAL-034', 'Peak Academy', 'Learning website', '฿210,000', '86']]],
    ['Won', [['DEAL-041', 'Mango Creative', 'Brand website', '฿160,000', '92'], ['DEAL-042', 'Baan Dee Property', 'Property website', '฿290,000', '96']]],
  ];
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 border-b-2 border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">/admin/deals</p><h2 className="mt-2 text-3xl font-bold">Deal pipeline</h2></div>
        <div className="flex gap-3"><DemoButton className={`${btnSecondary} px-4 py-2`}>Filter</DemoButton><DemoButton className={`${btnPrimary} px-4 py-2`}>+ Add deal</DemoButton></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WireframeMetric label="Open deals" value="24" detail="Compared with previous period" />
        <WireframeMetric label="Pipeline value" value="฿2.8M" detail="All active opportunities" />
        <WireframeMetric label="Won this month" value="8" detail="Compared with previous period" />
        <WireframeMetric label="Win rate" value="36%" detail="Current sales period" />
      </div>
      <div className="overflow-x-auto pb-3"><div className="grid min-w-[1320px] grid-cols-5 gap-4">{columns.map(([status, deals]) => <section key={status} className="min-h-[520px] border-2 border-slate-300 bg-slate-50 p-3"><div className="flex items-center justify-between border-b-2 border-slate-300 pb-3"><h3 className="font-bold">{status}</h3><span className="border border-slate-400 px-2 py-1 text-xs font-bold">{deals.length}</span></div><div className="mt-3 grid gap-3">{deals.map(([id, company, name, value, score]) => <Link key={id} href={`/admin/deals/${id.toLowerCase()}`} className={`${cardHover} border-2 border-slate-300 bg-white p-4 active:scale-[0.99]`}><p className="text-xs font-bold text-slate-500">{id}</p><p className="mt-2 font-bold">{company}</p><p className="mt-1 text-sm text-slate-600">{name}</p><div className="mt-4 flex items-center justify-between gap-2 text-xs"><span className="font-bold">{value}</span><span className="rounded-full border border-slate-400 px-2 py-1">Score {score}</span></div><p className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-500">Owner: Sales · Updated today</p></Link>)}</div></section>)}</div></div>
    </div>
  );
}

function DetailTemplate({ route }: { route: SitemapRoute }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <WireframeSection title="Summary">
        <div className="grid gap-4 sm:grid-cols-2">
          {['Status', 'Owner', 'Created date', 'Last updated'].map((label) => (
            <div key={label} className="border border-slate-300 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
              <div className="mt-4 h-5 w-3/4 bg-slate-200" />
            </div>
          ))}
        </div>
      </WireframeSection>
      <WireframeSection title="Actions">
        <div className="grid gap-3">
          <DemoButton className={`${btnPrimary} px-4 py-3`}>Primary action</DemoButton>
          <ActionButton href={resolveActionTarget(route, "back")} className={`${btnSecondary} px-4 py-3`}>← Back to list</ActionButton>
        </div>
      </WireframeSection>
      <WireframeSection title="Details and history">
        <div className="grid gap-4">
          <div className="h-32 border-2 border-dashed border-slate-300 bg-slate-50" />
          <Table rows={['Created', 'Updated', 'Assigned', 'Reviewed']} />
        </div>
      </WireframeSection>
      <WireframeSection title="Activity timeline">
        <div className="grid gap-4">
          {['Request created', 'Information updated', 'Waiting for next step'].map((item) => (
            <div key={item} className="border-l-2 border-slate-300 pl-4 text-sm">
              <p className="font-bold">{item}</p>
              <p className="mt-1 text-slate-500">18 Jul 2026 · User name</p>
            </div>
          ))}
        </div>
      </WireframeSection>
    </div>
  );
}

function FormTemplate({ route, isPublic = false }: { route: SitemapRoute; isPublic?: boolean }) {
  const cancelHref = resolveActionTarget(route, "back");
  return (
    <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <WireframeSection title={isPublic ? "Contact form → create lead" : "Form fields"}>
        <div className="grid gap-5">
          {(isPublic ? ['ชื่อผู้ติดต่อ', 'บริษัท / ธุรกิจ', 'อีเมล', 'โทรศัพท์', 'ประเภทธุรกิจ', 'งบประมาณโดยประมาณ'] : ['Name / title', 'Description', 'Category', 'Owner', 'Attachments']).map((label) => (
            <label key={label} className="grid gap-2 text-sm font-bold">
              {label}
              <span className="h-11 border-2 border-slate-300 bg-slate-50" />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-bold">
            {isPublic ? 'รายละเอียดความต้องการ' : 'Notes'}
            <span className="h-28 border-2 border-slate-300 bg-slate-50" />
          </label>
        </div>
      </WireframeSection>
      <div className="grid content-start gap-6">
        <WireframeSection title={isPublic ? "Lead creation" : "Preview / summary"}>
          <div className="h-40 border-2 border-dashed border-slate-300 bg-slate-50" />
          <div className="mt-4 grid gap-2 text-sm text-slate-500">
            <div className="h-4 w-3/4 bg-slate-200" />
            <div className="h-4 w-1/2 bg-slate-200" />
          </div>
        </WireframeSection>
        <WireframeSection title={isPublic ? "After submit" : "Actions"}>
          <div className="grid gap-3">
            <DemoButton className={`${btnPrimary} px-4 py-3`}>{isPublic ? 'ส่งข้อมูลให้ทีมงาน' : 'Save / submit'}</DemoButton>
            <DemoButton className={`${btnSecondary} px-4 py-3`}>Save draft</DemoButton>
            {cancelHref ? <ActionButton href={cancelHref} className={`${btnSecondary} px-4 py-3`}>ยกเลิก</ActionButton> : null}
          </div>
        </WireframeSection>
      </div>
    </div>
  );
}

function PreviewTemplate({ route }: { route: SitemapRoute }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <WireframeSection title="Preview canvas">
        <div className="border-2 border-slate-900 bg-white p-3">
          <div className="flex items-center gap-2 border-b border-slate-300 pb-3">
            <span className="h-3 w-3 rounded-full border border-slate-400" />
            <span className="h-3 w-3 rounded-full border border-slate-400" />
            <span className="h-3 w-3 rounded-full border border-slate-400" />
            <div className="ml-3 h-6 flex-1 border border-slate-300 bg-slate-50" />
          </div>
          <div className="grid gap-4 p-5">
            <div className="h-36 border-2 border-dashed border-slate-300 bg-slate-100" />
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="h-24 border border-slate-300" />
              <div className="h-24 border border-slate-300" />
              <div className="h-24 border border-slate-300" />
            </div>
            <div className="h-24 border border-slate-300" />
          </div>
        </div>
      </WireframeSection>
      <WireframeSection title="Comments and approval">
        <div className="grid gap-4">
          <div className="border border-slate-300 p-4 text-sm">
            <p className="font-bold">Comment #01</p>
            <p className="mt-2 text-slate-600">Please update the contact section.</p>
          </div>
          <Placeholder label="Add comment" tall />
          <ActionButton href={resolveActionTarget(route, "approve")} className={`${btnPrimary} px-4 py-3`}>Approve / submit feedback</ActionButton>
        </div>
      </WireframeSection>
    </div>
  );
}

function SettingsTemplate() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
      <WireframeSection title="Settings navigation">
        <div className="grid gap-2">
          {['General', 'Access & permissions', 'Notifications', 'Billing', 'Audit history'].map((item, index) =>
            index === 0 ? (
              <div key={item} className="border border-slate-900 bg-slate-900 px-4 py-3 text-sm font-bold text-white">
                {item}
              </div>
            ) : (
              <DemoButton key={item} className={`${interact} border border-slate-300 px-4 py-3 text-left text-sm font-bold hover:border-slate-900 hover:bg-slate-50`}>
                {item}
              </DemoButton>
            ),
          )}
        </div>
      </WireframeSection>
      <WireframeSection title="Configuration">
        <div className="grid gap-5">
          {['Configuration name', 'Status', 'Default value', 'Description'].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-bold">
              {label}
              <span className="h-11 border-2 border-slate-300 bg-slate-50" />
            </label>
          ))}
          <DemoButton className={`${btnPrimary} justify-self-start px-4 py-3`}>Save changes</DemoButton>
        </div>
      </WireframeSection>
    </div>
  );
}

function ReportTemplate() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WireframeMetric label="Total" value="1,248" detail="Current period" />
        <WireframeMetric label="Growth" value="+18%" detail="Compared to last period" />
        <WireframeMetric label="Average" value="82" detail="Per account" />
        <WireframeMetric label="Target" value="90%" detail="Progress to target" />
      </div>
      <WireframeSection title="Chart area">
        <div className="flex h-64 items-end gap-3 border-b-2 border-l-2 border-slate-300 p-5">
          {['h-[30%]', 'h-[52%]', 'h-[45%]', 'h-[70%]', 'h-[62%]', 'h-[86%]', 'h-[74%]', 'h-[94%]'].map((height, index) => (
            <div key={index} className={`flex-1 bg-slate-300 ${height}`} />
          ))}
        </div>
      </WireframeSection>
      <WireframeSection title="Report details">
        <Table rows={['January', 'February', 'March', 'April']} />
      </WireframeSection>
    </div>
  );
}

function PublicTemplate() {
  return (
    <div className="grid gap-6">
      <section className="border-2 border-slate-900 bg-white p-8 lg:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Website Operating Platform</p>
        <h2 className="mt-5 max-w-2xl text-4xl font-bold">Launch a better website operation.</h2>
        <p className="mt-4 max-w-xl text-slate-600">โครงร่างหน้า public สำหรับสื่อสารคุณค่า แพ็กเกจ และช่องทางเริ่มต้นใช้งาน</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/get-started" className={`${btnPrimary} px-5 py-3`}>Get started</Link>
          <Link href="/pricing" className={`${btnSecondary} px-5 py-3`}>View pricing</Link>
        </div>
      </section>
      <div className="grid gap-6 md:grid-cols-3">
        {['Structured onboarding', 'Component-based production', 'Centralized support'].map((title) => (
          <div key={title} className="border-2 border-slate-300 bg-white p-6">
            <div className="h-24 border-2 border-dashed border-slate-300 bg-slate-50" />
            <h3 className="mt-5 font-bold">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">Content placeholder for this public section.</p>
          </div>
        ))}
      </div>
      <WireframeSection title="Call to action / contact block">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <Placeholder label="Email or business detail" />
          <DemoButton className={`${btnPrimary} px-5 py-2`}>Submit</DemoButton>
        </div>
      </WireframeSection>
    </div>
  );
}

function TransactionTemplate({ route }: { route: SitemapRoute }) {
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <WireframeSection title="Review and confirmation">
        <div className="grid gap-4">
          {['Reference number', 'Customer / organization', 'Package or amount', 'Expiry / due date'].map((label) => (
            <div key={label} className="flex items-center justify-between border-b border-slate-200 pb-3 text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="h-4 w-32 bg-slate-200" />
            </div>
          ))}
        </div>
      </WireframeSection>
      <WireframeSection title="Action">
        <p className="text-sm text-slate-600">ผู้ใช้งานตรวจสอบข้อมูลก่อนยืนยันรายการ</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ActionButton href={resolveActionTarget(route, "confirm")} className={`${btnPrimary} px-4 py-3`}>Confirm</ActionButton>
          <ActionButton href={resolveActionTarget(route, "request-change")} className={`${btnSecondary} px-4 py-3`}>Request change</ActionButton>
        </div>
      </WireframeSection>
    </div>
  );
}

function InboxTemplate() {
  return (
    <div className="grid min-h-[680px] overflow-hidden border-2 border-slate-300 bg-white xl:grid-cols-[220px_340px_1fr]">
      <aside className="border-b-2 border-slate-300 bg-slate-50 xl:border-b-0 xl:border-r-2">
        <div className="border-b-2 border-slate-300 p-5"><p className="text-lg font-bold">แชท</p><p className="mt-1 text-xs text-slate-500">รวมทุกช่องทาง</p></div>
        <nav className="grid gap-1 p-3 text-sm">
          {['แชททั้งหมด 12', 'แชทของฉัน 4', 'Website Form 6', 'Facebook 3', 'LINE 3', 'จบแชทแล้ว 18'].map((item, index) => <DemoButton key={item} className={`${interact} flex items-center justify-between px-3 py-3 text-left ${index === 0 ? 'border-2 border-slate-900 bg-white font-bold' : 'text-slate-600 hover:bg-white'}`}><span>{item.split(' ')[0]}{item.split(' ')[1] && ` ${item.split(' ')[1]}`}</span><span className="text-xs text-slate-400">{item.match(/\d+$/)?.[0]}</span></DemoButton>)}
        </nav>
        <div className="border-t border-slate-200 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Team</p><p className="mt-3 text-sm font-bold">Sales / Account</p><p className="mt-1 text-xs text-slate-500">กำลังออนไลน์ 3 คน</p></div>
      </aside>
      <section className="border-b-2 border-slate-300 xl:border-b-0 xl:border-r-2">
      <WireframeSection title="แชททั้งหมด" className="h-full border-0 p-3">
        <div className="mb-4 flex flex-wrap gap-2">
          {['All', 'Facebook', 'LINE', 'Website Form', 'Unassigned'].map((filter, index) => (
            <span key={filter} className={`border px-3 py-2 text-xs font-bold ${index === 0 ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'}`}>
              {filter}
            </span>
          ))}
        </div>
        <div className="grid gap-2">
          {[
            ['Facebook', 'คุณเมย์ · สนใจเว็บไซต์ร้านอาหาร', 'New lead', '10:42'],
            ['LINE', 'บริษัท Green Clinic · ขอใบเสนอราคา', 'Qualified', '10:18'],
            ['Website Form', 'คุณต้น · แบบฟอร์มขอใบเสนอราคา', 'New lead', '10:31'],
            ['Facebook', 'North Star Studio · สอบถามแพ็กเกจ', 'Contacted', '09:55'],
            ['LINE', 'Acme Accounting · ส่งข้อมูลเพิ่มเติม', 'Customer', 'เมื่อวาน'],
          ].map(([channel, message, status, time]) => (
            <Link key={message} href="/admin/inbox/demo-conversation" className={`${cardHover} border-2 border-slate-300 p-4`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="border border-slate-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">{channel}</span>
                  <p className="mt-3 font-bold">{message}</p>
                </div>
                <span className="text-xs text-slate-500">{time}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{status}</span>
                <span>Assigned: Sales</span>
              </div>
            </Link>
          ))}
        </div>
      </WireframeSection>
      </section>

      <section className="min-w-0">
      <WireframeSection title="Conversation and lead profile" className="h-full border-0 p-4">
        <div className="grid gap-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Facebook conversation</p>
              <h3 className="mt-2 text-lg font-bold">คุณเมย์ · สนใจเว็บไซต์ร้านอาหาร</h3>
            </div>
            <span className="border-2 border-slate-900 px-3 py-2 text-xs font-bold">New lead</span>
          </div>
          <div className="grid gap-3 border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-sm">
            <div className="max-w-[80%] border border-slate-300 bg-white p-3">สวัสดีค่ะ อยากทำเว็บไซต์ร้านอาหาร มีแพ็กเกจแนะนำไหมคะ?</div>
            <div className="ml-auto max-w-[80%] border-2 border-slate-900 bg-white p-3">สวัสดีครับ ทีมงานช่วยแนะนำแพ็กเกจให้ได้ครับ ขอทราบประเภทธุรกิจและเป้าหมายเว็บไซต์เบื้องต้นครับ</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="h-12 border-2 border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-400">พิมพ์ข้อความตอบกลับ...</div>
            <DemoButton className={`${btnPrimary} px-5 py-2`}>Send</DemoButton>
          </div>
          <div className="grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Lead profile</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-600">
                <p>Name: คุณเมย์</p>
                <p>Source: Facebook / LINE / Website Form</p>
                <p>Owner: Sales</p>
                <p>Industry: Restaurant</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Actions</p>
              <div className="mt-3 grid gap-2">
                <DemoButton className={`${interact} border border-slate-300 px-3 py-2 text-left text-sm font-bold hover:border-slate-900 hover:bg-slate-50`}>Create Lead</DemoButton>
                <DemoButton className={`${interact} border border-slate-300 px-3 py-2 text-left text-sm font-bold hover:border-slate-900 hover:bg-slate-50`}>Assign owner</DemoButton>
                <DemoButton className={`${interact} border border-slate-300 px-3 py-2 text-left text-sm font-bold hover:border-slate-900 hover:bg-slate-50`}>Create quotation</DemoButton>
              </div>
            </div>
          </div>
        </div>
      </WireframeSection>
      </section>
    </div>
  );
}

function Table({ rows, rowHref }: { rows: string[]; rowHref?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="pb-3 pr-4">Name / reference</th>
            <th className="pb-3 pr-4">Status</th>
            <th className="pb-3 pr-4">Owner</th>
            <th className="pb-3">Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className={`border-b border-slate-200 ${rowHref ? rowHover : ""}`}>
              <td className="py-4 pr-4 font-bold">
                {rowHref ? <Link href={rowHref} className={`${interact} hover:underline`}>{row}</Link> : row}
              </td>
              <td className="py-4 pr-4"><span className="border border-slate-400 px-2 py-1 text-xs">In progress</span></td>
              <td className="py-4 pr-4">User name</td>
              <td className="py-4">18 Jul</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Placeholder({ label, tall = false }: { label: string; tall?: boolean }) {
  return <div className={`${tall ? 'h-24' : 'h-11'} border-2 border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-400`}>{label}</div>;
}

function PublicWireframeShell({ area, children }: { area: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b-2 border-slate-300 bg-white px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
          <Link href="/" className="text-lg font-bold hover:underline">WOP / UI</Link>
          <nav className="hidden items-center gap-5 text-sm font-bold md:flex">
            <Link href="/pricing" className={`${interact} hover:underline`}>Pricing</Link>
            <Link href="/features" className={`${interact} hover:underline`}>Features</Link>
            <Link href="/contact" className={`${interact} hover:underline`}>Contact</Link>
            <Link href="/login" className={`${interact} border-2 border-slate-900 px-3 py-2 hover:bg-slate-50`}>Login</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{area}</p>
        {children}
      </main>
    </div>
  );
}
