import Link from "next/link";
import { DemoButton } from "@/components/DemoButton";
import { WireframeHeader, WireframeMetric, WireframeSection } from "@/components/WireframeShell";

export default function AdminDashboardPage() {
  return (
    <WireframeHeader area="Internal Back Office" title="Production Dashboard" role="Super Admin / Management">
      <div className="mb-8 flex flex-col gap-4 border-b-2 border-slate-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Monday, 18 July 2026</p>
          <h2 className="mt-2 text-xl font-bold">ภาพรวมงานวันนี้</h2>
        </div>
        <DemoButton className="border-2 border-slate-900 bg-white px-4 py-2 text-sm font-bold transition-colors duration-150 hover:bg-slate-900 hover:text-white active:scale-[0.98]">
          + Create production job
        </DemoButton>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WireframeMetric label="Active customers" value="128" detail="+12 this month" />
        <WireframeMetric label="Onboarding ready" value="24" detail="8 need review" />
        <WireframeMetric label="Production jobs" value="36" detail="14 due this week" />
        <WireframeMetric label="QA pass rate" value="91%" detail="Target > 90%" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <WireframeSection title="Production pipeline">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Intake review", "08"],
              ["Ready to produce", "12"],
              ["In production", "10"],
              ["Waiting approval", "06"],
            ].map(([label, value]) => (
              <div key={label} className="border-2 border-dashed border-slate-300 p-4">
                <p className="text-sm text-slate-600">{label}</p>
                <p className="mt-5 text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </WireframeSection>

        <WireframeSection title="Team workload">
          <div className="grid gap-3">
            {[
              ["Website Implementer", "12 jobs"],
              ["Content Specialist", "08 jobs"],
              ["QA Officer", "06 jobs"],
            ].map(([role, workload]) => (
              <div key={role} className="flex items-center justify-between border-b border-slate-200 pb-3 text-sm">
                <span>{role}</span>
                <span className="font-bold">{workload}</span>
              </div>
            ))}
          </div>
        </WireframeSection>

        <WireframeSection title="Priority work">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="pb-3 pr-4">Website</th>
                  <th className="pb-3 pr-4">Stage</th>
                  <th className="pb-3 pr-4">Owner</th>
                  <th className="pb-3">Due</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Acme Accounting", "QA", "Nok", "Today"],
                  ["Green Clinic", "Production", "Ton", "Tomorrow"],
                  ["North Star Studio", "Review", "May", "22 Jul"],
                ].map(([website, stage, owner, due]) => (
                  <tr key={website} className="border-b border-slate-200">
                    <td className="py-4 pr-4 font-bold">{website}</td>
                    <td className="py-4 pr-4">{stage}</td>
                    <td className="py-4 pr-4">{owner}</td>
                    <td className="py-4">{due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WireframeSection>

        <WireframeSection title="Quick links">
          <div className="grid gap-3">
            {[["Customers", "/admin/companies"], ["Readiness queue", "/admin/readiness"], ["QA queue", "/admin/qa"], ["Tickets", "/admin/tickets"]].map(([label, href]) => (
              <Link key={label} href={href} className="border border-slate-300 p-3 text-sm font-bold transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50">
                {label} →
              </Link>
            ))}
          </div>
        </WireframeSection>
      </div>
    </WireframeHeader>
  );
}
