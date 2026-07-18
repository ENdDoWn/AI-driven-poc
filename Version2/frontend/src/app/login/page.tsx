"use client";

import Link from "next/link";
import { useToast } from "@/components/Toast";

const demoRoles = [
  {
    role: "Super Admin / Management",
    area: "Internal Back Office",
    description: "ดูภาพรวม Platform, KPI และการตั้งค่าระบบ",
    href: "/admin/dashboard",
  },
  {
    role: "Sales",
    area: "CRM & Customer",
    description: "ดูแล Lead, Follow-up, Deal และลูกค้าที่รับผิดชอบ",
    href: "/admin/my-work",
  },
  {
    role: "Sales Manager",
    area: "CRM & Sales Team",
    description: "บริหารทีม Sales, กระจายงาน และดู Workload ของทีม",
    href: "/admin/sales-team",
  },
  {
    role: "Website Implementer / QA",
    area: "Production & QA",
    description: "ดูงานผลิตเว็บไซต์ ตรวจ QA และ Deployment",
    href: "/admin/production",
  },
  {
    role: "Customer Owner",
    area: "Customer Portal",
    description: "กรอกข้อมูล ดู Preview และอนุมัติเผยแพร่",
    href: "/portal/dashboard",
  },
  {
    role: "Partner / Reseller",
    area: "Partner Portal",
    description: "ดู Lead ลูกค้า Commission และ Payout",
    href: "/partner/dashboard",
  },
];

export default function LoginPage() {
  const showToast = useToast();

  return (
    <main className="grid min-h-screen animate-page-enter place-items-center bg-slate-100 px-6 py-12 text-slate-900">
      <div className="w-full max-w-6xl">
        <Link href="/" className="text-sm font-bold hover:underline">
          ← กลับหน้าเว็บไซต์
        </Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-2 border-slate-900 bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Shared Authentication</p>
            <h1 className="mt-3 text-2xl font-bold">เข้าสู่ระบบ</h1>
            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-bold">
                Email
                <span className="h-11 border-2 border-slate-300 bg-slate-50" />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Password
                <span className="h-11 border-2 border-slate-300 bg-slate-50" />
              </label>
              <button
                type="button"
                onClick={() => showToast("ส่วนนี้อยู่ระหว่างพัฒนา (โหมดเดโม) — เลือกบทบาทด้านขวาเพื่อดูตัวอย่าง")}
                className="h-11 border-2 border-slate-900 bg-slate-900 font-bold text-white transition-colors duration-150 hover:bg-slate-700 active:scale-[0.98]"
              >
                Login
              </button>
            </div>
            <div className="mt-6 flex justify-between text-sm text-slate-500">
              <span>Forgot password?</span>
              <span>MFA ต่อไป</span>
            </div>
          </div>

          <section className="border-2 border-slate-300 bg-white p-8">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Demo access</p>
                <h2 className="mt-2 text-2xl font-bold">เลือกเข้าสู่ระบบในฐานะ</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">กดเลือกบทบาทเพื่อดูหน้า UI ของแต่ละผู้ใช้งาน โดยไม่ต้องกรอกบัญชีจริง</p>
              </div>
              <span className="w-fit border-2 border-dashed border-slate-400 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">Demo only</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {demoRoles.map((demo) => (
                <Link key={demo.role} href={demo.href} onClick={() => window.localStorage.setItem("wop-demo-role", demo.role)} className="group border-2 border-slate-300 p-4 transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold group-hover:underline">{demo.role}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{demo.area}</p>
                    </div>
                    <span className="text-lg">→</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{demo.description}</p>
                </Link>
              ))}
            </div>
            <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
              Demo นี้เป็นเพียงการเปลี่ยนหน้าเพื่อแสดงบทบาท ยังไม่มีระบบ Authentication และ Permission จริง
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
