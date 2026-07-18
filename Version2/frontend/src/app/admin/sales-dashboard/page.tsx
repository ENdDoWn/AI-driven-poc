import Link from "next/link";
import { WireframeHeader, WireframeSection } from "@/components/WireframeShell";

const leadSources = [
  { source: "Website Form", leads: 20, share: 36, qualifiedRate: 35, converted: 4, value: "฿820K" },
  { source: "Facebook", leads: 15, share: 27, qualifiedRate: 22, converted: 2, value: "฿360K" },
  { source: "LINE", leads: 12, share: 21, qualifiedRate: 18, converted: 2, value: "฿280K" },
  { source: "Referral", leads: 9, share: 16, qualifiedRate: 44, converted: 3, value: "฿540K" },
];

const conversionTrend = [
  { period: "ม.ค.", rate: 24 },
  { period: "ก.พ.", rate: 28 },
  { period: "มี.ค.", rate: 26 },
  { period: "เม.ย.", rate: 32 },
  { period: "พ.ค.", rate: 35 },
  { period: "มิ.ย.", rate: 32 },
];

const todayActions = [
  { customer: "Acme Accounting", task: "โทรติดตามผู้ตัดสินใจ", due: "เกินกำหนด 1 วัน", tone: "red", href: "/admin/deals/acme" },
  { customer: "Green Clinic", task: "ยืนยันนัด Demo", due: "วันนี้ 15:00", tone: "amber", href: "/admin/calendar" },
  { customer: "Siam Health", task: "สร้าง Next step ในดีล", due: "วันนี้ 17:00", tone: "slate", href: "/admin/deals/siam-health" },
  { customer: "Bright Home", task: "ส่งเอกสารเพิ่มเติม", due: "พรุ่งนี้ 10:00", tone: "blue", href: "/admin/quotations" },
  { customer: "North Star Studio", task: "ตอบข้อความใหม่จาก LINE", due: "ภายใน 2 ชั่วโมง", tone: "green", href: "/admin/inbox" },
];

const hotLeads = [
  { name: "North Star Studio", source: "Website Form", intent: "ขอใบเสนอราคา", age: "12 นาที", score: 94 },
  { name: "Mango Retail", source: "Referral", intent: "นัดคุยแพ็กเกจ", age: "38 นาที", score: 88 },
  { name: "Urban Dental", source: "LINE", intent: "ถามราคาและเวลาเริ่มงาน", age: "2 ชั่วโมง", score: 81 },
  { name: "Peak Fitness", source: "Facebook", intent: "ดาวน์โหลดรายละเอียดบริการ", age: "5 ชั่วโมง", score: 72 },
];

const upcomingActivities = [
  { time: "วันนี้ 15:00", customer: "Green Clinic", activity: "Demo เว็บไซต์", owner: "คุณ" },
  { time: "วันนี้ 17:00", customer: "Siam Health", activity: "Follow-up", owner: "คุณ" },
  { time: "พรุ่งนี้ 10:00", customer: "Bright Home", activity: "ส่งเอกสารเพิ่มเติม", owner: "คุณ" },
  { time: "พฤหัส 13:30", customer: "Acme Accounting", activity: "คุยรอบตัดสินใจ", owner: "คุณ" },
];

const funnelStages = [
  { label: "Leads", count: 56, value: "฿4.8M", conversion: "100%" },
  { label: "Qualified", count: 32, value: "฿3.6M", conversion: "57%" },
  { label: "Proposal", count: 18, value: "฿2.8M", conversion: "56%" },
  { label: "Negotiation", count: 9, value: "฿1.7M", conversion: "50%" },
  { label: "Won", count: 6, value: "฿920K", conversion: "67%" },
];

const forecastRows = [
  { label: "Commit", value: "฿1.42M", amount: 142, tone: "bg-slate-900", detail: "ดีลโอกาสปิดสูง" },
  { label: "Best case", value: "฿2.06M", amount: 206, tone: "bg-slate-600", detail: "รวมดีลที่กำลังเจรจา" },
  { label: "Upside", value: "฿2.78M", amount: 278, tone: "bg-slate-300", detail: "รวมดีลที่ยังมีความไม่แน่นอน" },
];

const customer360 = [
  { customer: "Green Clinic", contact: "คุณแพร · ผู้ก่อตั้ง", lastActivity: "วันนี้ 11:20", openItems: "ใบเสนอราคา 1 ฉบับ", href: "/admin/customers/green-clinic" },
  { customer: "Acme Accounting", contact: "คุณนนท์ · CFO", lastActivity: "3 วันที่แล้ว", openItems: "รอผู้มีอำนาจตัดสินใจ", href: "/admin/customers/acme-accounting" },
  { customer: "Bright Home", contact: "คุณเมย์ · Marketing", lastActivity: "เมื่อวาน 16:45", openItems: "นัด Demo", href: "/admin/customers/bright-home" },
];

const winLoss = [
  { label: "ชนะ", count: 6, share: 46, note: "ลูกค้าเห็นความคุ้มค่าของแพ็กเกจ" },
  { label: "แพ้ราคา", count: 3, share: 23, note: "ควรเสนอแพ็กเกจเริ่มต้นเร็วขึ้น" },
  { label: "เงียบหาย", count: 2, share: 15, note: "ต้องตั้ง Follow-up หลายช่องทาง" },
  { label: "คู่แข่ง", count: 2, share: 15, note: "เก็บข้อมูลคู่แข่งใน CRM ให้ครบ" },
];

const dataCompleteness = [
  { label: "มี Next step", value: "82%", width: 82, issue: "4 ดีลขาดข้อมูล" },
  { label: "มี Close date", value: "91%", width: 91, issue: "2 ดีลขาดข้อมูล" },
  { label: "มี Decision maker", value: "64%", width: 64, issue: "9 ดีลขาดข้อมูล" },
  { label: "มี Activity ล่าสุด", value: "88%", width: 88, issue: "3 ดีลไม่มี Activity" },
];

const badgeStyles = {
  green: "border-green-300 bg-green-50 text-green-800",
  blue: "border-blue-300 bg-blue-50 text-blue-800",
  amber: "border-amber-300 bg-amber-50 text-amber-800",
  red: "border-red-300 bg-red-50 text-red-800",
  slate: "border-slate-300 bg-slate-50 text-slate-700",
};

type BadgeTone = keyof typeof badgeStyles;

function StatusBadge({ children, tone, className = "" }: { children: string; tone: BadgeTone; className?: string }) {
  return <span className={`inline-flex border px-2 py-1 text-xs font-bold ${badgeStyles[tone]} ${className}`}>{children}</span>;
}

function ProgressBar({ width, className = "bg-slate-900" }: { width: number; className?: string }) {
  return <div className="h-2 bg-slate-200"><div className={`h-2 ${className}`} style={{ width: `${Math.min(width, 100)}%` }} /></div>;
}

function SalesKpiCard({ label, value, detail, progress, metaLeft, metaRight }: { label: string; value: string; detail: string; progress?: number; metaLeft: string; metaRight: string }) {
  return (
    <section className="h-full border-2 border-slate-300 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <h2 className="truncate text-sm font-bold">{label}</h2>
        <span className="shrink-0 text-[11px] text-slate-500">ก.ค.</span>
      </div>
      <div className="flex min-h-[82px] flex-col">
        <p className="text-xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{detail}</p>
        <div className="mt-auto pt-3">
          {progress !== undefined ? <ProgressBar width={progress} /> : <div className="h-2" />}
          <div className="mt-1 flex justify-between gap-2 text-[11px] text-slate-500"><span>{metaLeft}</span><span>{metaRight}</span></div>
        </div>
      </div>
    </section>
  );
}

function ActionTodayCard() {
  return (
    <section className="h-full border-2 border-slate-300 bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <h2 className="text-sm font-bold">Action today</h2>
        <span className="text-[11px] text-slate-500">ก.ค.</span>
      </div>
      <div className="grid min-h-[82px] grid-cols-3 gap-2">
        <div className="border border-red-200 bg-red-50 p-2 text-red-700">
          <p className="text-xl font-bold">3</p>
          <p className="mt-1 text-[11px] font-bold leading-tight">เกินกำหนด</p>
        </div>
        <div className="border border-amber-200 bg-amber-50 p-2 text-amber-700">
          <p className="text-xl font-bold">5</p>
          <p className="mt-1 text-[11px] font-bold leading-tight">รายการวันนี้</p>
        </div>
        <div className="border border-green-200 bg-green-50 p-2 text-green-700">
          <p className="text-xl font-bold">8</p>
          <p className="mt-1 text-[11px] font-bold leading-tight">รายการทั้งหมด</p>
        </div>
      </div>
    </section>
  );
}

function TodayActionQueue() {
  return (
    <WireframeSection title="Today’s Action Queue" action={<Link href="/admin/my-work" className="text-xs font-bold underline">เปิด Sales Workspace →</Link>}>
      <div className="grid gap-3">
        {todayActions.map((item) => (
          <Link key={`${item.customer}-${item.task}`} href={item.href} className="group flex items-center justify-between gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-50">
            <div className="min-w-0">
              <p className="truncate font-bold group-hover:underline">{item.customer}</p>
              <p className="mt-1 truncate text-sm text-slate-500">{item.task}</p>
            </div>
            <StatusBadge tone={item.tone as BadgeTone}>{item.due}</StatusBadge>
          </Link>
        ))}
      </div>
    </WireframeSection>
  );
}

function TargetVsAchievement() {
  return <SalesKpiCard label="Target" value="฿1.84M" detail="61% ของเป้า ฿3M" progress={61} metaLeft="ขาด ฿1.16M" metaRight="เหลือ 12 วัน" />;
}

function HotLeads() {
  return (
    <WireframeSection title="Hot Leads" action={<Link href="/admin/leads" className="text-xs font-bold underline">ดู Leads ทั้งหมด →</Link>}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b-2 border-slate-300 text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="pb-3 pr-4">Lead</th><th className="pb-3 pr-4">Intent</th><th className="pb-3 pr-4">เข้ามา</th><th className="pb-3 text-right">Score</th></tr>
          </thead>
          <tbody>
            {hotLeads.map((lead) => (
              <tr key={lead.name} className="border-b border-slate-200 last:border-0">
                <td className="py-3 pr-4"><p className="font-bold">{lead.name}</p><p className="text-xs text-slate-500">{lead.source}</p></td>
                <td className="py-3 pr-4 text-slate-600">{lead.intent}</td>
                <td className="py-3 pr-4 text-slate-600">{lead.age}</td>
                <td className="py-3 text-right font-bold text-green-700">{lead.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WireframeSection>
  );
}

function UpcomingActivities() {
  return (
    <WireframeSection title="Upcoming Activities" action={<Link href="/admin/calendar" className="text-xs font-bold underline">เปิดปฏิทิน →</Link>}>
      <div className="grid gap-3">
        {upcomingActivities.map((item) => (
          <div key={`${item.time}-${item.customer}`} className="flex gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0">
            <div className="w-24 shrink-0 text-xs font-bold text-slate-500">{item.time}</div>
            <div><p className="font-bold">{item.customer}</p><p className="mt-1 text-sm text-slate-500">{item.activity} · {item.owner}</p></div>
          </div>
        ))}
      </div>
    </WireframeSection>
  );
}

function SalesFunnel() {
  return (
    <WireframeSection title="Sales Funnel" action={<span className="text-xs text-slate-500">เดือนนี้</span>}>
      <div className="grid gap-5" role="img" aria-label="กราฟ Sales Funnel แสดงจำนวน Lead ในแต่ละ Stage">
        {funnelStages.map((stage, index) => (
          <div key={stage.label} className="grid grid-cols-[5.5rem_1fr_5rem] items-center gap-3 text-sm">
            <div><p className="font-bold">{index + 1}. {stage.label}</p><p className="mt-1 text-xs text-slate-500">{stage.conversion}</p></div>
            <div className="flex justify-center">
              <div className={`flex h-12 items-center justify-center text-xs font-bold text-white ${index < 2 ? "bg-slate-900" : index < 4 ? "bg-slate-600" : "bg-slate-400"}`} style={{ width: `${100 - index * 17}%` }}>
                {stage.count} ราย
              </div>
            </div>
            <p className="text-right text-xs font-bold text-slate-700">{stage.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
        <div><p className="text-xs text-slate-500">Overall conversion</p><p className="mt-1 text-xl font-bold">11%</p></div>
        <div><p className="text-xs text-slate-500">จุดที่ควรโฟกัส</p><p className="mt-1 text-sm font-bold">Qualified → Proposal <span className="font-normal text-red-700">หลุด 44%</span></p></div>
      </div>
    </WireframeSection>
  );
}

function Forecast() {
  return (
    <WireframeSection title="Forecast" action={<span className="text-xs text-slate-500">ปิดภายในเดือนนี้</span>}>
      <div className="grid gap-4">
        {forecastRows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between text-sm"><span className="font-bold">{row.label}</span><span className="font-bold">{row.value}</span></div>
            <ProgressBar width={row.amount / 3} className={row.tone} />
            <p className="mt-1 text-xs text-slate-500">{row.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-slate-200 pt-4 text-sm"><span className="text-slate-500">Forecast range</span><span className="ml-2 font-bold">฿1.42M–฿2.78M</span></div>
    </WireframeSection>
  );
}

function DealRiskAging() {
  const dealRisks = [
    { customer: "Acme Accounting", stage: "Negotiation", days: 14, closeDate: "อีก 5 วัน", reason: "ไม่มี Activity 3 วัน", nextAction: "คุยผู้ตัดสินใจ", risk: "สูง", tone: "red" },
    { customer: "Siam Health", stage: "Qualified", days: 9, closeDate: "อีก 18 วัน", reason: "ยังไม่มี Next step", nextAction: "กำหนดวันถัดไป", risk: "กลาง", tone: "amber" },
    { customer: "Bright Home", stage: "Demo", days: 7, closeDate: "อีก 12 วัน", reason: "ไม่มี Activity 7 วัน", nextAction: "ส่งเอกสารเพิ่มเติม", risk: "กลาง", tone: "amber" },
  ];

  return (
    <WireframeSection title="Deal Risk & Aging" action={<span className="text-xs text-slate-500">ค้าง Stage นานที่สุด</span>}>
      <div className="grid gap-3">
        {dealRisks.map((deal) => (
          <div key={deal.customer} className="border-b border-slate-200 pb-3 last:border-0 last:pb-0">
            <div className="flex min-w-0 items-center gap-2"><p className="truncate font-bold">{deal.customer}</p><StatusBadge tone={deal.tone as BadgeTone} className="shrink-0 px-1.5 py-0.5 text-[11px]">{`เสี่ยง${deal.risk}`}</StatusBadge></div>
            <p className="mt-1 truncate text-sm text-slate-500" title={`${deal.stage} · ค้าง ${deal.days} วัน · ปิด ${deal.closeDate}`}>{deal.stage} · ค้าง {deal.days} วัน · ปิด {deal.closeDate}</p>
            <p className="mt-1 text-xs text-slate-500">{deal.reason}</p>
            <p className="mt-1 text-xs font-bold text-slate-700">Next: {deal.nextAction}</p>
          </div>
        ))}
      </div>
    </WireframeSection>
  );
}

function Customer360Summary() {
  return (
    <WireframeSection title="Customer 360 Summary" action={<Link href="/admin/customers" className="text-xs font-bold underline">ดู Customers →</Link>}>
      <div className="grid gap-3">
        {customer360.map((customer) => (
          <Link key={customer.customer} href={customer.href} className="border-b border-slate-200 pb-3 last:border-0 last:pb-0 hover:bg-slate-50">
            <div className="flex items-center justify-between gap-3"><p className="font-bold">{customer.customer}</p><span className="text-xs text-slate-500">เปิดดู →</span></div>
            <p className="mt-1 text-sm text-slate-500">{customer.contact} · ล่าสุด {customer.lastActivity}</p>
            <p className="mt-1 text-xs font-bold text-slate-700">{customer.openItems}</p>
          </Link>
        ))}
      </div>
    </WireframeSection>
  );
}

function WinLossAnalysis() {
  const pieColors = ["#16a34a", "#dc2626", "#f59e0b", "#64748b"];
  const tooltipPositions = [
    { area: "right-0 top-0", tooltip: "left-0 top-full mt-2" },
    { area: "left-0 top-0", tooltip: "right-0 top-full mt-2" },
    { area: "left-0 bottom-0", tooltip: "right-0 bottom-full mb-2" },
    { area: "right-0 bottom-0", tooltip: "left-0 bottom-full mb-2" },
  ];
  const totalDeals = winLoss.reduce((total, item) => total + item.count, 0);
  let accumulated = 0;
  const pieStops = winLoss.map((item, index) => {
    const start = accumulated;
    accumulated += (item.count / totalDeals) * 100;
    return `${pieColors[index]} ${start}% ${accumulated}%`;
  }).join(", ");

  return (
    <WireframeSection title="Win / Loss Analysis" className="flex h-full flex-col" action={<span className="text-xs text-slate-500">90 วันล่าสุด</span>}>
      <div className="flex min-h-[200px] flex-1 items-center justify-center">
        <div className="relative h-40 w-40">
          <div className="h-full w-full rounded-full" role="img" aria-label="กราฟ Pie แสดงผลลัพธ์ดีลใน 90 วันล่าสุด" style={{ background: `conic-gradient(${pieStops})` }} />
          {winLoss.map((item, index) => (
            <button key={item.label} type="button" aria-label={`${item.label}: ${item.count} ดีล · ${item.share}% · ${item.note}`} className={`group absolute h-20 w-20 rounded-full border-0 bg-transparent p-0 focus:outline-none focus:ring-2 focus:ring-slate-900 ${tooltipPositions[index].area}`}>
              <span className={`invisible pointer-events-none absolute z-20 w-max max-w-56 whitespace-normal border-2 border-slate-900 bg-slate-900 px-3 py-2 text-left text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 ${tooltipPositions[index].tooltip}`}>
                <span className="font-bold">{item.label}: {item.count} ดีล · {item.share}%</span><br />{item.note}
              </span>
            </button>
          ))}
        </div>
      </div>
    </WireframeSection>
  );
}

function DataCompleteness() {
  const segmentColors = ["#0f172a", "#2563eb", "#f59e0b", "#16a34a"];
  const tooltipPositions = [
    { area: "right-0 top-0", tooltip: "left-0 top-full mt-2" },
    { area: "right-0 bottom-0", tooltip: "bottom-full right-0 mb-2" },
    { area: "left-0 bottom-0", tooltip: "bottom-full left-0 mb-2" },
    { area: "left-0 top-0", tooltip: "left-0 top-full mt-2" },
  ];

  return (
    <WireframeSection title="CRM Data Completeness" className="flex h-full flex-col" action={<span className="text-xs text-slate-500">ข้อมูลของฉัน</span>}>
      <div className="flex min-h-[200px] flex-1 items-center justify-center">
        <div className="relative h-40 w-40">
          <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="กราฟ Donut แสดงความครบถ้วนของข้อมูล CRM แยกตามประเภทข้อมูล">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="16" pathLength="100" />
            {dataCompleteness.map((item, index) => (
              <circle key={item.label} cx="50" cy="50" r="40" fill="none" stroke={segmentColors[index]} strokeWidth="16" strokeDasharray="25 75" strokeDashoffset={-index * 25} pathLength="100" transform="rotate(-90 50 50)" strokeLinecap="butt">
                <title>{`${item.label}: ${item.value} · ${item.issue}`}</title>
              </circle>
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-bold">81%</span>
            <span className="text-[11px] text-slate-500">ครบถ้วนโดยรวม</span>
          </div>
          {dataCompleteness.map((item, index) => (
            <button key={item.label} type="button" aria-label={`${item.label}: ${item.value} · ${item.issue}`} className={`group absolute h-20 w-20 rounded-full border-0 bg-transparent p-0 focus:outline-none focus:ring-2 focus:ring-slate-900 ${tooltipPositions[index].area}`}>
              <span className={`invisible pointer-events-none absolute z-20 w-max max-w-56 whitespace-normal border-2 border-slate-900 bg-slate-900 px-3 py-2 text-left text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 ${tooltipPositions[index].tooltip}`}>
                <span className="font-bold">{item.label}: {item.value}</span><br />{item.issue}
              </span>
            </button>
          ))}
        </div>
      </div>
    </WireframeSection>
  );
}

function LeadSourceQuality() {
  const sourceColors = ["bg-slate-900", "bg-blue-600", "bg-sky-500", "bg-emerald-600"];
  const maxLeads = Math.max(...leadSources.map((item) => item.leads));

  return (
    <WireframeSection title="Lead source quality" action={<span className="text-xs text-slate-500">ลูกค้าของฉัน · เดือนนี้</span>}>
      <div className="grid gap-4">
        {leadSources.map((item, index) => (
          <button key={item.source} type="button" className="group relative block w-full text-left focus:outline-none" aria-label={`${item.source}: ${item.leads} leads, Qualified ${item.qualifiedRate}%, Won ${item.converted} ดีล`}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="font-bold">{item.source}</span><span className="text-slate-500">{item.leads} leads</span></div>
            <div className="h-2 bg-slate-200 ring-slate-900 group-focus:ring-2">
              <div className={`h-2 ${sourceColors[index]}`} style={{ width: `${(item.leads / maxLeads) * 100}%` }} />
            </div>
            <span className="invisible pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-64 -translate-x-1/2 border-2 border-slate-900 bg-slate-900 px-3 py-2 text-left text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100">
              <span className="font-bold">{item.source} · {item.leads} leads</span><br />สัดส่วน Lead {item.share}% · Qualified {item.qualifiedRate}% · Won {item.converted} ดีล
            </span>
          </button>
        ))}
      </div>
    </WireframeSection>
  );
}

function ConversionTrend() {
  const chartPoints = conversionTrend.map((item, index) => {
    const x = 8 + (index * 88) / (conversionTrend.length - 1);
    const y = 52 - ((item.rate - 20) / 20) * 40;
    return { ...item, x, y };
  });

  return (
    <WireframeSection title="Conversion trend" className="flex h-full flex-col" action={<span className="text-xs"><span className="font-bold">32%</span><span className="ml-1 text-green-700">· +6%</span></span>}>
      <div className="flex flex-1 flex-col justify-center">
        <svg viewBox="0 0 100 60" className="h-[240px] w-full" role="img" aria-label="กราฟเส้น Conversion trend 6 เดือนล่าสุด">
          {[20, 30, 40].map((value) => {
            const y = 52 - ((value - 20) / 20) * 40;
            return <g key={value}><line x1="8" x2="96" y1={y} y2={y} stroke="#cbd5e1" strokeDasharray="1.5 1.5" /><text x="0" y={y + 1.5} className="fill-slate-500 text-[3px]">{value}%</text></g>;
          })}
          <polyline points={chartPoints.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          {chartPoints.map((point) => <circle key={point.period} cx={point.x} cy={point.y} r="2" fill="white" stroke="#0f172a" strokeWidth="1"><title>{`${point.period}: ${point.rate}%`}</title></circle>)}
        </svg>
        <div className="grid grid-cols-6 text-center text-xs text-slate-500">{conversionTrend.map((item) => <span key={item.period}>{item.period}</span>)}</div>
      </div>
    </WireframeSection>
  );
}

function PriorityDeals() {
  const priorityDeals = [
    { name: "Green Clinic", amount: "฿450K", probability: 85, closeDate: "ปิดภายใน 5 วัน", nextStep: "ส่งใบเสนอราคา", signal: "Activity ล่าสุดวันนี้", health: "แข็งแรง", tone: "green" },
    { name: "Bright Home", amount: "฿320K", probability: 72, closeDate: "ปิดภายใน 12 วัน", nextStep: "นัด Demo", signal: "Activity ล่าสุด 2 วัน", health: "กำลังไปได้ดี", tone: "blue" },
    { name: "Acme Accounting", amount: "฿280K", probability: 68, closeDate: "ปิดภายใน 18 วัน", nextStep: "ติดตามผู้ตัดสินใจ", signal: "ค้าง Stage 14 วัน", health: "เสี่ยงสูง", tone: "red" },
  ];

  return (
    <WireframeSection title="Deals มีโอกาสปิดสูง & Next Action" action={<Link href="/admin/deals" className="text-xs font-bold underline">เปิด Deal Pipeline →</Link>}>
      <div className="grid gap-3">{priorityDeals.map((deal) => <div key={deal.name} className="border-2 border-slate-200 p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="font-bold">{deal.name}</p><p className="mt-1 text-sm text-slate-500">{deal.nextStep} · {deal.closeDate}</p></div><div className="flex flex-wrap gap-2"><StatusBadge tone={deal.tone as BadgeTone}>{`${deal.probability}% โอกาสปิด`}</StatusBadge><StatusBadge tone={deal.tone as BadgeTone}>{deal.health}</StatusBadge></div></div><div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs"><span className="text-slate-500">{deal.signal}</span><span className="font-bold">Next: {deal.nextStep}</span></div><div className="mt-4 flex items-center gap-3"><ProgressBar width={deal.probability} /><span className="text-sm font-bold">{deal.amount}</span></div></div>)}</div>
    </WireframeSection>
  );
}

export default function SalesDashboardPage() {
  return (
    <WireframeHeader area="CRM & Customer" title="Sales Dashboard" role="Sales">
      <div className="mb-6 flex flex-col gap-3 border-b-2 border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm text-slate-500">Monday, 18 July 2026</p><h2 className="mt-2 text-xl font-bold">ภาพรวมงานขายของฉัน</h2></div>
        <div className="flex flex-wrap gap-2 text-xs font-bold"><span className="border-2 border-slate-900 bg-slate-900 px-3 py-2 text-white">เดือนนี้</span><span className="border-2 border-slate-300 bg-white px-3 py-2">ทีมของฉัน</span><span className="border-2 border-slate-300 bg-white px-3 py-2">ทุกแหล่งที่มา</span></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ActionTodayCard />
        <SalesKpiCard label="Pipeline value" value="฿2.8M" detail="Weighted pipeline ฿1.24M" progress={93} metaLeft="93% ของเป้า" metaRight="24 active deals" />
        <SalesKpiCard label="Weighted forecast" value="฿2.42M" detail="ยังขาดเป้า ฿580K" progress={81} metaLeft="Coverage 81%" metaRight="เดือนนี้" />
        <TargetVsAchievement />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <TodayActionQueue />
        <HotLeads />
        <UpcomingActivities />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.15fr]">
        <SalesFunnel />
        <PriorityDeals />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-4">
        <Forecast />
        <Customer360Summary />
        <DealRiskAging />
        <LeadSourceQuality />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <DataCompleteness />
        <WinLossAnalysis />
        <ConversionTrend />
      </div>

    </WireframeHeader>
  );
}
