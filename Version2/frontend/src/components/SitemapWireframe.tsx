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
import { FiCalendar, FiCheckSquare, FiChevronDown, FiEdit3, FiFilter, FiMail, FiMessageCircle, FiPhone, FiPlus, FiUserPlus } from "react-icons/fi";

const sectionNames = {
  admin: "Internal Back Office",
  portal: "Customer Portal",
  partner: "Partner Portal",
};

const inboxMessages = [
  ['Facebook', 'คุณเมย์ · สนใจเว็บไซต์ร้านอาหาร', 'New lead', '10:42'],
  ['LINE', 'บริษัท Green Clinic · ขอใบเสนอราคา', 'Qualified', '10:18'],
  ['Website Form', 'คุณต้น · แบบฟอร์มขอใบเสนอราคา', 'New lead', '10:31'],
  ['Facebook', 'North Star Studio · สอบถามแพ็กเกจ', 'Contacted', '09:55'],
  ['LINE', 'Acme Accounting · ส่งข้อมูลเพิ่มเติม', 'Customer', 'เมื่อวาน'],
] as const;

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

    if (route.kind === "inbox") {
      return <div className="h-full min-h-0 flex-1 bg-white" />;
    }

    return (
      <WireframeHeader area={sectionNames.admin} title={route.pattern.endsWith("/:id") && ["/admin/contracts/:id", "/admin/deals/:id", "/admin/companies/:id"].includes(route.pattern) ? "ผู้ติดต่อ" : route.label} role={role} fullBleed={["/admin/contracts/:id", "/admin/deals/:id", "/admin/companies/:id"].includes(route.pattern)}>
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
  if (["/admin/contracts/:id", "/admin/deals/:id", "/admin/companies/:id"].includes(route.pattern)) return <ContractDetailTemplate />;
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
    { contact: 'บริษัท North Star Studio', form: 'ขอใบเสนอราคา', source: '/request-quote', status: 'New', submittedAt: getDateOffset(-1, 13, 42) },
    { contact: 'คุณกานต์', form: 'ติดต่อเรา', source: '/contact', status: 'Assigned', submittedAt: getDateOffset(-2, 16, 20) },
    { contact: 'Bright Home', form: 'Landing Page บ้านและสวน', source: '/campaign/home', status: 'Converted', submittedAt: getDateOffset(-2, 11, 8) },
    { contact: 'คุณพลอย', form: 'ขอใบเสนอราคา', source: '/request-quote', status: 'New', submittedAt: getDateOffset(-3, 9, 55) },
    { contact: 'Acme Accounting', form: 'ติดต่อเรา', source: '/contact', status: 'Assigned', submittedAt: getDateOffset(-3, 15, 12) },
    { contact: 'Lanna Cafe', form: 'Landing Page ร้านอาหาร', source: '/campaign/restaurant', status: 'Converted', submittedAt: getDateOffset(-4, 10, 4) },
    { contact: 'คุณวิน', form: 'ขอใบเสนอราคา', source: '/request-quote', status: 'New', submittedAt: getDateOffset(-5, 14, 36) },
    { contact: 'บริษัท Siam Wellness', form: 'ติดต่อเรา', source: '/contact', status: 'Assigned', submittedAt: getDateOffset(-6, 12, 18) },
    { contact: 'Mango Creative', form: 'Landing Page เอเจนซี', source: '/campaign/agency', status: 'Converted', submittedAt: getDateOffset(-7, 16, 45) },
  ];
  const pageSize = 10;
  const initialDateRange = getThisWeekRange();
  const [fromDate, setFromDate] = useState(initialDateRange.from);
  const [toDate, setToDate] = useState(initialDateRange.to);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState<(typeof rows)[number] | null>(null);
  const filteredRows = useMemo(
    () => rows.filter((row) => {
      const submittedDate = getDateInputValue(new Date(row.submittedAt));
      return (!fromDate || submittedDate >= fromDate) && (!toDate || submittedDate <= toDate);
    }),
    [fromDate, toDate],
  );
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const statusCounts = rows.reduce<Record<string, number>>((counts, row) => {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="border-2 border-slate-900 bg-slate-900 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-300">Total submissions</p>
          <p className="mt-3 text-3xl font-bold tabular-nums">{rows.length}</p>
          <p className="mt-1 text-xs text-slate-300">All captured requests</p>
        </div>
        <WireframeMetric label="New" value={String(statusCounts.New ?? 0)} detail="Needs first review" />
        <WireframeMetric label="Assigned" value={String(statusCounts.Assigned ?? 0)} detail="Owned by the sales team" />
        <WireframeMetric label="Converted" value={String(statusCounts.Converted ?? 0)} detail="Moved into CRM" />
      </div>

      <WireframeSection title="" className="overflow-visible p-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200 p-5">
          <h2 className="font-bold">Submission inbox</h2>
          <div className="relative flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-expanded={isDateFilterOpen}
              aria-controls="submission-date-filter"
              onClick={() => setIsDateFilterOpen((open) => !open)}
              className={`${btnSecondary} px-3 py-2`}
            >
              Filter
            </button>
            <DemoButton className={`${btnPrimary} px-4 py-2`} onClick={() => exportSubmissions(filteredRows)}>Export CSV</DemoButton>
            {isDateFilterOpen ? (
              <div id="submission-date-filter" className="absolute right-0 top-full z-10 mt-2 w-80 border-2 border-slate-300 bg-white p-4 shadow-[4px_4px_0_0_#cbd5e1]">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold">Filter by date</p>
                  <span className="text-xs text-slate-500">{filteredRows.length} results</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-xs font-bold text-slate-500" htmlFor="submission-from-date">
                    From
                    <input id="submission-from-date" name="submission-from-date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} className="h-10 border-2 border-slate-300 bg-white px-2 text-sm font-normal text-slate-900" />
                    <span className="font-normal text-slate-400">{formatDateInput(fromDate)}</span>
                  </label>
                  <label className="grid gap-1 text-xs font-bold text-slate-500" htmlFor="submission-to-date">
                    To
                    <input id="submission-to-date" name="submission-to-date" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} className="h-10 border-2 border-slate-300 bg-white px-2 text-sm font-normal text-slate-900" />
                    <span className="font-normal text-slate-400">{formatDateInput(toDate)}</span>
                  </label>
                </div>
                <button type="button" onClick={() => { const range = getThisWeekRange(); setFromDate(range.from); setToDate(range.to); }} className={`${btnSecondary} mt-3 w-full px-3 py-2`}>
                  Reset to this week
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs">
          <p className="font-bold text-slate-700">Showing {filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredRows.length)} of {filteredRows.length} submissions</p>
          <p className="text-slate-500">{formatDateInput(fromDate)} – {formatDateInput(toDate)}</p>
        </div>

        <div className="overflow-x-auto p-5">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500"><tr><th className="pb-3 pr-4">Contact</th><th className="pb-3 pr-4">Form source</th><th className="pb-3 pr-4">Status</th><th className="pb-3 pr-4">Received</th><th className="pb-3">Action</th></tr></thead>
            <tbody>{paginatedRows.length > 0 ? paginatedRows.map((row) => <tr key={`${row.contact}-${row.form}`} className={`border-b border-slate-200 ${rowHover}`}><td className="py-4 pr-4 align-top"><button type="button" onClick={() => setSelectedSubmission(row)} className={`${interact} text-left font-bold hover:underline`}>{row.contact}</button><p className="mt-1 text-xs text-slate-500">Click to view details</p></td><td className="py-4 pr-4 align-top"><p className="font-medium">{row.form}</p><p className="mt-1 font-mono text-xs text-slate-500">{row.source}</p></td><td className="py-4 pr-4 align-top"><span className={`inline-flex border px-2 py-1 text-xs font-bold ${getSubmissionStatusClass(row.status)}`}>{row.status}</span></td><td className="py-4 pr-4 align-top text-slate-600">{formatReceived(row.submittedAt)}</td><td className="py-4 align-top"><DemoButton className={`${btnSecondary} whitespace-nowrap px-3 py-2 text-xs`} onClick={() => setSelectedSubmission(row)}>Create contract</DemoButton></td></tr>) : <tr><td colSpan={5} className="py-12 text-center text-sm text-slate-500">No submissions in this date range.</td></tr>}</tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">
          <p className="text-xs text-slate-500">10 submissions per page</p>
          <nav className="flex items-center gap-1" aria-label="Submission pagination">
            <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className={`${btnSecondary} px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40`}>Previous</button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" aria-current={pageNumber === currentPage ? "page" : undefined} onClick={() => setPage(pageNumber)} className={`${pageNumber === currentPage ? btnPrimary : btnSecondary} px-3 py-2 text-xs`}>{pageNumber}</button>)}
            <button type="button" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} className={`${btnSecondary} px-3 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40`}>Next</button>
          </nav>
        </div>
      </WireframeSection>

      {selectedSubmission ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4" role="presentation" onMouseDown={() => setSelectedSubmission(null)}>
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto border-2 border-slate-900 bg-white p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="submission-detail-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Form submission</p>
                <h2 id="submission-detail-title" className="mt-1 text-xl font-bold">{selectedSubmission.contact}</h2>
              </div>
              <button type="button" onClick={() => setSelectedSubmission(null)} className="border border-slate-300 px-2 py-1 text-sm font-bold hover:border-slate-900" aria-label="Close submission details">×</button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <SubmissionDetail label="Contact" value={selectedSubmission.contact} />
              <SubmissionDetail label="Form" value={selectedSubmission.form} />
              <SubmissionDetail label="Source" value={selectedSubmission.source} mono />
              <SubmissionDetail label="Received" value={formatReceived(selectedSubmission.submittedAt)} />
              <SubmissionDetail label="Status" value={selectedSubmission.status} />
              <SubmissionDetail label="Email" value="customer@example.com" />
            </div>
            <div className="mt-4 border-2 border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Customer message</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">สนใจรายละเอียดบริการและแพ็กเกจเพิ่มเติม รบกวนทีมงานติดต่อกลับเพื่อแนะนำแนวทางที่เหมาะสมค่ะ</p>
            </div>
            <div className="mt-5 flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button type="button" onClick={() => setSelectedSubmission(null)} className={`${btnSecondary} px-4 py-2`}>Close</button>
              <DemoButton className={`${btnPrimary} px-4 py-2`} onClick={() => setSelectedSubmission(null)}>Create contract</DemoButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SubmissionDetail({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="border border-slate-200 p-3"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className={`mt-2 text-sm ${mono ? 'font-mono' : ''}`}>{value}</p></div>;
}

function getSubmissionStatusClass(status: string) {
  if (status === 'New') return 'border-sky-300 bg-sky-50 text-sky-700';
  if (status === 'Assigned') return 'border-amber-300 bg-amber-50 text-amber-700';
  return 'border-emerald-300 bg-emerald-50 text-emerald-700';
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
  const contracts = [
    { name: 'คุณต้น', contract: 'Website Retainer #001', company: 'Green Clinic Co., Ltd.', linked: true, status: 'Active', start: '01 Jan 2026', end: '31 Dec 2026' },
    { name: 'คุณเมย์', contract: 'SEO Add-on #004', company: 'Green Clinic Co., Ltd.', linked: true, status: 'Active', start: '01 Mar 2026', end: '28 Feb 2027' },
    { name: 'คุณกานต์', contract: 'Corporate Website #018', company: 'North Star Studio', linked: true, status: 'Pending signature', start: '18 Jul 2026', end: '17 Jul 2027' },
    { name: 'คุณพลอย', contract: 'Website Package #021', company: 'ยังไม่มีบริษัท', linked: false, status: 'Draft', start: '—', end: '—' },
  ];
  const linkedCount = contracts.filter((contract) => contract.linked).length;

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="border-2 border-slate-900 bg-slate-900 p-4 text-white"><p className="text-xs font-bold uppercase tracking-wide text-slate-300">Total contracts</p><p className="mt-3 text-3xl font-bold tabular-nums">{contracts.length}</p><p className="mt-1 text-xs text-slate-300">All contract records</p></div>
        <WireframeMetric label="Active" value={String(contracts.filter((contract) => contract.status === 'Active').length)} detail="Currently in service" />
        <WireframeMetric label="Pending signature" value={String(contracts.filter((contract) => contract.status === 'Pending signature').length)} detail="Waiting for approval" />
        <WireframeMetric label="Company linked" value={`${linkedCount}/${contracts.length}`} detail="Contract relationship" />
      </div>

      <WireframeSection title="" className="overflow-visible p-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200 p-5">
          <h2 className="font-bold">Contract inbox</h2>
          <div className="flex items-center gap-2"><button type="button" className={`${btnSecondary} px-3 py-2`}>Filter</button><ActionButton href={resolveActionTarget(route, "create")} className={`${btnPrimary} px-4 py-2`}>+ Add contract</ActionButton></div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs"><p className="font-bold text-slate-700">Showing {contracts.length} contracts</p><p className="text-slate-500">One company can have many contracts</p></div>
        <div className="overflow-x-auto p-5">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500"><tr><th className="pb-3 pr-4">Contact name</th><th className="pb-3 pr-4">Contract</th><th className="pb-3 pr-4">Company</th><th className="pb-3 pr-4">Linked</th><th className="pb-3 pr-4">Status</th><th className="pb-3 pr-4">Start</th><th className="pb-3">End</th></tr></thead>
            <tbody>{contracts.map((row) => <tr key={row.contract} className={`border-b border-slate-200 ${rowHover}`}><td className="py-4 pr-4 align-top font-bold">{detailHref ? <Link href={detailHref} className={`${interact} hover:underline`}>{row.name}</Link> : row.name}</td><td className="py-4 pr-4 align-top"><p className="font-medium">{row.contract}</p><p className="mt-1 text-xs text-slate-500">Contract record</p></td><td className="py-4 pr-4 align-top">{row.company}</td><td className="py-4 pr-4 align-top"><span className={`inline-flex border px-2 py-1 text-xs font-bold ${row.linked ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-amber-300 bg-amber-50 text-amber-700'}`}>{row.linked ? 'Linked' : 'Not linked'}</span></td><td className="py-4 pr-4 align-top"><span className={`inline-flex border px-2 py-1 text-xs font-bold ${getContractStatusClass(row.status)}`}>{row.status}</span></td><td className="py-4 pr-4 align-top text-slate-600">{row.start}</td><td className="py-4 align-top text-slate-600">{row.end}</td></tr>)}</tbody>
          </table>
        </div>
      </WireframeSection>
    </div>
  );
}

function getContractStatusClass(status: string) {
  if (status === 'Active') return 'border-emerald-300 bg-emerald-50 text-emerald-700';
  if (status === 'Pending signature') return 'border-amber-300 bg-amber-50 text-amber-700';
  return 'border-slate-300 bg-slate-50 text-slate-700';
}

function ContractDetailTemplate() {
  return (
    <div className="min-h-[calc(100vh-150px)] bg-slate-50">
      <div className="grid gap-3 p-3 pt-4 lg:grid-cols-[minmax(230px,0.8fr)_minmax(420px,1.45fr)_minmax(260px,0.95fr)] lg:p-4">
        <div className="grid content-start gap-3">
          <section className="border-2 border-slate-300 bg-white p-6">
            <div className="flex items-center gap-4"><div className="grid h-14 w-14 place-items-center border-2 border-slate-900 bg-slate-900 text-xl font-bold text-white">ต</div><div><h2 className="text-lg font-bold">คุณต้น</h2><p className="mt-1 text-sm text-slate-500">Customer contact</p></div></div>
            <div className="mt-6 grid grid-cols-5 gap-2 text-center"><DetailQuickAction icon={<FiEdit3 />} label="Note" /><DetailQuickAction icon={<FiMail />} label="Email" /><DetailQuickAction icon={<FiPhone />} label="Call" /><DetailQuickAction icon={<FiCheckSquare />} label="Task" /><DetailQuickAction icon={<FiCalendar />} label="Meeting" /></div>
          </section>
          <section className="border-2 border-slate-300 bg-white p-6"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">ข้อมูลสำคัญ</h2><FiFilter aria-hidden="true" className="text-slate-500" /></div><dl className="mt-6 grid gap-4 text-sm"><DetailField label="ชื่อ-นามสกุล" value="คุณต้น" /><DetailField label="อีเมล" value="customer@example.com" /><DetailField label="เบอร์โทร" value="081-234-5678" /><DetailField label="สถานะบริษัท" value="ผูกกับบริษัทแล้ว" /><DetailField label="บริษัท" value="Green Clinic Co., Ltd." /><DetailField label="ประเภทธุรกิจ" value="Healthcare" /></dl></section>
        </div>

        <div className="grid content-start gap-3">
          <div className="grid grid-cols-4 overflow-hidden border-2 border-slate-300 bg-white"><button type="button" className="border-r border-slate-200 bg-slate-50 px-3 py-4 font-bold">ข้อมูล</button><button type="button" className="border-r border-slate-200 px-3 py-4 text-slate-500 hover:bg-slate-50">กิจกรรม</button><button type="button" className="border-r border-slate-200 px-3 py-4 text-slate-500 hover:bg-slate-50">รายได้</button><button type="button" className="px-3 py-4 text-slate-500 hover:bg-slate-50">ข้อมูลเชิงลึก</button></div>
          <section className="border-2 border-slate-300 bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold">กิจกรรม</h2><DemoButton className={`${btnPrimary} flex items-center gap-2 px-4 py-2`}><FiPlus aria-hidden="true" /> เพิ่มกิจกรรม</DemoButton></div><div className="mt-5 flex flex-wrap gap-4 border-b border-slate-200 pb-3 text-sm"><span className="border-b-2 border-slate-900 pb-3 font-bold"><FiMessageCircle className="mr-1 inline" /> ทั้งหมด</span><span className="text-slate-500"><FiEdit3 className="mr-1 inline" /> Note</span><span className="text-slate-500"><FiMail className="mr-1 inline" /> Email</span><span className="text-slate-500"><FiPhone className="mr-1 inline" /> Call</span><span className="text-slate-500"><FiCheckSquare className="mr-1 inline" /> Task</span><span className="text-slate-500"><FiCalendar className="mr-1 inline" /> Meeting</span></div><p className="mt-5 text-3xl font-bold">มีนาคม 2569</p><div className="mt-5 grid gap-4"><ActivityCard type="ผู้ติดต่อ" title="สร้างผู้ติดต่อ" description="ระบบบันทึกข้อมูลผู้ติดต่อจากแชตเรียบร้อยโดยระบบ" date="10 มี.ค. 2569 10:24" /><ActivityCard type="ข้อความเข้า" title="ลูกค้าทักเข้ามาครั้งแรก" description="เริ่มบทสนทนาผ่าน WEBSITE FORM เพื่อขอใบเสนอราคาโดยลูกค้า" date="09 มี.ค. 2569 14:36" /></div></section>
        </div>

        <div className="grid content-start gap-5"><AssociationCard title="Companies (1)" action="Add" content={<><p className="font-bold text-teal-700 underline">Green Clinic Co., Ltd. <span className="ml-2 border border-emerald-400 px-2 py-1 text-xs font-normal no-underline">Primary</span></p><p className="mt-4 text-sm">Company Domain Name: <span className="text-teal-700 underline">greenclinic.co.th</span></p><p className="mt-3 text-sm">Phone: 02-123-4567</p></>} /><AssociationCard title="Deals (0)" action="Add" content={<p className="py-8 text-center text-sm text-slate-500">Track the revenue opportunities associated with this record.</p>} /><AssociationCard title="Tickets (0)" action="Add" content={<p className="py-8 text-center text-sm text-slate-500">Track the customer requests associated with this record.</p>} /><AssociationCard title="Attachments" action="Add" content={<p className="py-4 text-sm text-slate-500">No attachments yet.</p>} /></div>
      </div>
    </div>
  );
}

function DetailQuickAction({ icon, label }: { icon: ReactNode; label: string }) { return <button type="button" className="grid justify-items-center gap-1 text-xs font-bold hover:text-slate-500"><span className="grid h-10 w-10 place-items-center border-2 border-slate-300 text-lg">{icon}</span>{label}</button>; }
function DetailField({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>; }
function ActivityCard({ type, title, description, date }: { type: string; title: string; description: string; date: string }) { return <article className="border-2 border-slate-300 p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-sm text-slate-500"><FiUserPlus className="mr-1 inline" /> {type}</p><h3 className="mt-4 font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{description}</p></div><time className="shrink-0 text-xs text-slate-500">{date}</time></div></article>; }
function AssociationCard({ title, action, content }: { title: string; action: string; content: ReactNode }) { return <section className="border-2 border-slate-300 bg-white p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold"><FiChevronDown className="mr-1 inline" /> {title}</h2><button type="button" className="flex items-center gap-1 text-sm font-bold hover:underline"><FiPlus aria-hidden="true" /> {action}</button></div><div className="mt-4 border border-slate-300 p-4">{content}</div></section>; }

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
      <div className="overflow-x-auto pb-3"><div className="grid min-w-[1600px] grid-cols-5 gap-5">{columns.map(([status, deals]) => <section key={status} className="min-h-[520px] border-2 border-slate-300 bg-slate-50 p-4"><div className="flex items-center justify-between border-b-2 border-slate-300 pb-3"><h3 className="font-bold">{status}</h3><span className="border border-slate-400 px-2 py-1 text-xs font-bold">{deals.length}</span></div><div className="mt-3 grid gap-4">{deals.map(([id, company, name, value, score]) => <Link key={id} href={`/admin/deals/${id.toLowerCase()}`} className={`${cardHover} border-2 border-slate-300 bg-white p-5 active:scale-[0.99]`}><p className="text-xs font-bold text-slate-500">{id}</p><p className="mt-2 font-bold">{company}</p><p className="mt-1 text-sm text-slate-600">{name}</p><div className="mt-4 flex items-center justify-between gap-2 text-xs"><span className="font-bold">{value}</span><span className="rounded-full border border-slate-400 px-2 py-1">Score {score}</span></div><p className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-500">Owner: Sales · Updated today</p></Link>)}</div></section>)}</div></div>
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

function InboxMessageList() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto pr-1">
      <div className="grid gap-2">
        {inboxMessages.map(([channel, message, status, time]) => (
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
    </div>
  );
}

function InboxTemplate() {
  const [showFilters, setShowFilters] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);

  return (
    <div className="grid h-full min-h-0 bg-white lg:grid-cols-[220px_340px_1fr]">
      <section className="h-full min-h-0 min-w-0">
        <div className="relative h-full">
          <WireframeSection
            title="แชท"
            action={(
              <button
                type="button"
                onClick={() => setShowFilters((visible) => !visible)}
                aria-label="เปิดตัวกรองแชท"
                aria-expanded={showFilters}
                className={`grid h-9 w-9 place-items-center border-2 transition-colors ${showFilters ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-900"}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
              </button>
            )}
            className="m-0 flex h-full min-h-0 flex-col border-0 !border-b-0 p-3"
          >
            <p className="mb-4 text-xs text-slate-500">รวมทุกช่องทาง</p>
            <nav className="grid gap-1 text-sm">
              {['แชททั้งหมด 12', 'แชทของฉัน 4', 'Website Form 6', 'Facebook 3', 'LINE 3', 'จบแชทแล้ว 18'].map((item, index) => <DemoButton key={item} className={`${interact} flex items-center justify-between px-3 py-3 text-left ${index === 0 ? 'border-2 border-slate-900 bg-white font-bold' : 'text-slate-600 hover:bg-slate-50'}`}><span>{item.split(' ')[0]}{item.split(' ')[1] && ` ${item.split(' ')[1]}`}</span><span className="text-xs text-slate-400">{item.match(/\d+$/)?.[0]}</span></DemoButton>)}
            </nav>
            <div className="mt-auto border-t border-slate-200 pt-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Team</p><p className="mt-3 text-sm font-bold">Sales / Account</p><p className="mt-1 text-xs text-slate-500">กำลังออนไลน์ 3 คน</p></div>
          </WireframeSection>
          {showFilters ? (
            <div className="absolute right-3 top-16 z-30 grid w-48 gap-2 border-2 border-slate-300 bg-white p-3 shadow-lg">
              {['All', 'Facebook', 'LINE', 'Website Form', 'Unassigned'].map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={`border px-3 py-2 text-left text-xs font-bold ${index === 0 ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-600 hover:border-slate-900'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      <section className="h-full min-h-0">
      <WireframeSection title="แชททั้งหมด" className="m-0 flex h-full min-h-0 flex-col border-0 !border-b-0 p-3">
        <InboxMessageList />
      </WireframeSection>
      </section>

      <section className="h-full min-h-0 min-w-0">
      <WireframeSection title="" className="m-0 flex h-full min-h-0 flex-col border-0 !border-b-0 p-4">
        <div className="flex h-full min-h-0 flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold">คุณเมย์ · สนใจเว็บไซต์ร้านอาหาร</h3>
            <button
              type="button"
              onClick={() => setShowContractDialog(true)}
              className="border-2 border-slate-900 px-3 py-2 text-xs font-bold transition-colors hover:bg-slate-900 hover:text-white"
              aria-haspopup="dialog"
            >
              New Contract
            </button>
          </div>
          <div className="min-h-0 flex-1 grid content-start gap-3 overflow-y-auto border-2 border-dashed border-slate-300 bg-slate-50 p-4 text-sm">
            <div className="max-w-[80%] border border-slate-300 bg-white p-3">สวัสดีค่ะ อยากทำเว็บไซต์ร้านอาหาร มีแพ็กเกจแนะนำไหมคะ?</div>
            <div className="ml-auto max-w-[80%] border-2 border-slate-900 bg-white p-3">สวัสดีครับ ทีมงานช่วยแนะนำแพ็กเกจให้ได้ครับ ขอทราบประเภทธุรกิจและเป้าหมายเว็บไซต์เบื้องต้นครับ</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="h-12 border-2 border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-400">พิมพ์ข้อความตอบกลับ...</div>
            <DemoButton className={`${btnPrimary} px-5 py-2`}>Send</DemoButton>
          </div>
        </div>
      </WireframeSection>
      </section>

      {showContractDialog ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4"
          role="presentation"
          onMouseDown={() => setShowContractDialog(false)}
        >
          <div
            className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto border-2 border-slate-900 bg-white p-5 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-contract-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Contract</p>
                <h2 id="new-contract-dialog-title" className="mt-1 text-xl font-bold">New Contract</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowContractDialog(false)}
                className="border border-slate-300 px-2 py-1 text-sm font-bold hover:border-slate-900"
                aria-label="ปิด dialog"
              >
                ×
              </button>
            </div>

            <form
              className="mt-5 grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setShowContractDialog(false);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold">
                  Company
                  <input required name="company" placeholder="เช่น Green Clinic" className="h-11 border-2 border-slate-300 px-3 font-normal outline-none focus:border-slate-900" />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Contract name
                  <input required name="contractName" placeholder="เช่น Website Retainer" className="h-11 border-2 border-slate-300 px-3 font-normal outline-none focus:border-slate-900" />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Start date
                  <input required type="date" name="startDate" className="h-11 border-2 border-slate-300 px-3 font-normal outline-none focus:border-slate-900" />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  End date
                  <input required type="date" name="endDate" className="h-11 border-2 border-slate-300 px-3 font-normal outline-none focus:border-slate-900" />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Contract value
                  <input required type="number" min="0" name="value" placeholder="0" className="h-11 border-2 border-slate-300 px-3 font-normal outline-none focus:border-slate-900" />
                </label>
                <label className="grid gap-2 text-sm font-bold">
                  Status
                  <select name="status" defaultValue="Draft" className="h-11 border-2 border-slate-300 bg-white px-3 font-normal outline-none focus:border-slate-900">
                    <option>Draft</option>
                    <option>Pending signature</option>
                    <option>Active</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold">
                Notes
                <textarea name="notes" rows={3} placeholder="รายละเอียดเพิ่มเติมของสัญญา" className="border-2 border-slate-300 px-3 py-2 font-normal outline-none focus:border-slate-900" />
              </label>
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                <button type="button" onClick={() => setShowContractDialog(false)} className={`${btnSecondary} px-4 py-2`}>ยกเลิก</button>
                <button type="submit" className={`${btnPrimary} px-4 py-2`}>Save contract</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
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
