import Link from "next/link";

const features = [
  {
    title: "Structured onboarding",
    description: "เก็บข้อมูลธุรกิจแบบเป็นระบบ พร้อม Readiness Score ก่อนเริ่มผลิต",
  },
  {
    title: "Component-based production",
    description: "ประกอบเว็บไซต์จาก Blueprint และ Component มาตรฐานบน Platform เดียว",
  },
  {
    title: "Centralized support",
    description: "ติดตาม QA, Approval, Deployment และคำขอแก้ไขได้ในพื้นที่เดียว",
  },
];

const plans = [
  { name: "Starter", price: "เริ่มต้น", description: "สำหรับธุรกิจที่ต้องการเว็บไซต์พร้อมใช้งาน" },
  { name: "SME Growth", price: "เติบโต", description: "สำหรับทีมที่ต้องการเนื้อหาและการดูแลต่อเนื่อง" },
  { name: "Business Pro", price: "ขยายระบบ", description: "สำหรับองค์กรที่ต้องการ Workflow และการควบคุมคุณภาพ" },
];

export default function Home() {
  return (
    <main className="min-h-screen animate-page-enter bg-slate-100 text-slate-900">
      <header className="border-b-2 border-slate-300 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
          <Link href="/" className="text-lg font-bold tracking-tight hover:underline">
            WOP / Website Operating Platform
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-bold md:flex" aria-label="Main navigation">
            <Link href="/solutions/accounting" className="transition-colors duration-150 hover:underline">Solutions</Link>
            <Link href="/features" className="transition-colors duration-150 hover:underline">Features</Link>
            <Link href="/pricing" className="transition-colors duration-150 hover:underline">Pricing</Link>
            <Link href="/partners" className="transition-colors duration-150 hover:underline">Partners</Link>
            <Link href="/contact" className="transition-colors duration-150 hover:underline">Contact</Link>
            <Link href="/login" className="border-2 border-slate-900 px-4 py-2 transition-colors duration-150 hover:bg-slate-900 hover:text-white">Login</Link>
          </nav>
          <Link href="/get-started" className="border-2 border-slate-900 bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-slate-700 md:hidden">
            เริ่มต้น
          </Link>
        </div>
      </header>

      <section className="border-b-2 border-slate-300 bg-white px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Website-as-a-Service</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              สร้างเว็บ ออกแบบเว็บ และดูแลเว็บไซต์ธุรกิจจาก Platform เดียว
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              ระบบกลางสำหรับสร้างเว็บไซต์และออกแบบเว็บให้เหมาะกับธุรกิจ ตั้งแต่เก็บข้อมูล วางโครงสร้างหน้า ไปจนถึง Preview, Approval และ Deployment
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/get-started" className="border-2 border-slate-900 bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 hover:bg-slate-700">
                เริ่มต้นใช้งาน
              </Link>
              <Link href="/request-quote" className="border-2 border-slate-300 bg-white px-5 py-3 text-sm font-bold transition-colors duration-150 hover:border-slate-900 hover:bg-slate-50">
                ขอใบเสนอราคา
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>✓ Multi-tenant</span>
              <span>✓ Versioned components</span>
              <span>✓ Approval before publish</span>
            </div>
          </div>

          <div className="border-2 border-slate-900 bg-slate-100 p-4">
            <div className="border-2 border-slate-300 bg-white p-4">
              <div className="flex items-center justify-between border-b-2 border-slate-300 pb-4">
                <span className="text-sm font-bold">Production overview</span>
                <span className="border border-slate-300 px-2 py-1 text-xs">Today</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="border-2 border-slate-300 p-3"><p className="text-xs text-slate-500">Ready</p><p className="mt-3 text-2xl font-bold">24</p></div>
                <div className="border-2 border-slate-300 p-3"><p className="text-xs text-slate-500">In production</p><p className="mt-3 text-2xl font-bold">12</p></div>
                <div className="border-2 border-slate-300 p-3"><p className="text-xs text-slate-500">QA pass</p><p className="mt-3 text-2xl font-bold">91%</p></div>
              </div>
              <div className="mt-5 h-36 border-2 border-dashed border-slate-300 bg-slate-50" />
              <div className="mt-5 grid gap-3">
                <div className="h-4 w-3/4 bg-slate-200" />
                <div className="h-4 w-1/2 bg-slate-200" />
                <div className="h-4 w-2/3 bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">How it works</p>
          <h2 className="mt-3 text-3xl font-bold">จากข้อมูลธุรกิจสู่เว็บไซต์ที่พร้อมใช้งาน</h2>
          <p className="mt-4 text-slate-600">ทุกขั้นตอนถูกออกแบบให้ทีมทำงานร่วมกับลูกค้าได้อย่างชัดเจนและตรวจสอบย้อนกลับได้</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Collect", "เก็บข้อมูลธุรกิจ"],
            ["02", "Compose", "เลือก Blueprint และประกอบหน้า"],
            ["03", "Review", "QA และให้ลูกค้าอนุมัติ"],
            ["04", "Launch", "เชื่อม Domain และเปิดใช้งาน"],
          ].map(([number, title, description]) => (
            <div key={number} className="border-2 border-slate-300 bg-white p-5">
              <span className="text-xs font-bold text-slate-400">{number}</span>
              <h3 className="mt-8 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="free-website" className="border-y-2 border-slate-300 bg-white px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Start with a clear plan</p>
            <h2 className="mt-3 text-3xl font-bold">กำลังมองหาวิธีสร้างเว็บไซต์ฟรีอยู่หรือไม่?</h2>
            <p className="mt-4 leading-7 text-slate-600">
              เริ่มต้นสร้างเว็บไซต์ฟรีด้วยการวางโครงสร้างหน้า เนื้อหา และเป้าหมายเว็บไซต์ให้ชัดเจนก่อน จากนั้นจึงเลือกแนวทางออกแบบเว็บและฟีเจอร์ที่เหมาะกับธุรกิจของคุณ
            </p>
            <Link href="/get-started" className="mt-6 inline-block border-2 border-slate-900 px-5 py-3 text-sm font-bold transition-colors duration-150 hover:bg-slate-900 hover:text-white">
              เริ่มวางแผนเว็บไซต์ →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["สร้างเว็บ", "เริ่มจากเป้าหมายและข้อมูลธุรกิจ"],
              ["ออกแบบเว็บ", "เลือกโครงสร้างและสไตล์ที่เหมาะกับลูกค้า"],
              ["สร้างเว็บไซต์ฟรี", "เริ่มจาก Wireframe ก่อนตัดสินใจขยาย"],
            ].map(([title, description]) => (
              <div key={title} className="border-2 border-slate-300 p-5">
                <div className="h-16 border-2 border-dashed border-slate-300 bg-slate-50" />
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-y-2 border-slate-300 bg-white px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Platform capabilities</p>
              <h2 className="mt-3 text-3xl font-bold">ออกแบบมาเพื่อทีมที่ผลิตเว็บไซต์หลายราย</h2>
            </div>
            <Link href="/features" className="text-sm font-bold underline transition-colors duration-150 hover:text-slate-600">ดูความสามารถทั้งหมด →</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="border-2 border-slate-300 p-6">
                <div className="h-20 border-2 border-dashed border-slate-300 bg-slate-50" />
                <h3 className="mt-6 text-lg font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Packages</p>
            <h2 className="mt-3 text-3xl font-bold">เลือกแพ็กเกจให้เหมาะกับธุรกิจ</h2>
          </div>
          <Link href="/pricing" className="text-sm font-bold underline transition-colors duration-150 hover:text-slate-600">เปรียบเทียบแพ็กเกจ →</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div key={plan.name} className={`border-2 p-6 ${index === 1 ? "border-slate-900 bg-white" : "border-slate-300"}`}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{plan.price}</p>
              <h3 className="mt-4 text-2xl font-bold">{plan.name}</h3>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{plan.description}</p>
              <Link href="/request-quote" className="mt-8 inline-block border-2 border-slate-900 px-4 py-2 text-sm font-bold transition-colors duration-150 hover:bg-slate-900 hover:text-white">
                สนใจแพ็กเกจนี้ →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-slate-300 bg-slate-900 px-6 py-16 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Ready to start?</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold">เริ่มวางโครงเว็บไซต์ของคุณวันนี้</h2>
            <p className="mt-4 max-w-xl text-slate-300">พูดคุยกับทีมของเราเพื่อเลือกแพ็กเกจและขั้นตอนที่เหมาะกับธุรกิจ</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/get-started" className="border-2 border-white bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-colors duration-150 hover:bg-slate-100">Get started</Link>
            <Link href="/contact" className="border-2 border-slate-500 px-5 py-3 text-sm font-bold transition-colors duration-150 hover:border-white">Contact us</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold">คำถามเกี่ยวกับการสร้างเว็บไซต์</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <details className="border-2 border-slate-300 bg-white p-5">
            <summary className="cursor-pointer font-bold transition-colors duration-150 hover:text-slate-600">สร้างเว็บสำหรับธุรกิจควรเริ่มจากอะไร?</summary>
            <p className="mt-4 text-sm leading-6 text-slate-600">เริ่มจากกำหนดเป้าหมาย กลุ่มลูกค้า บริการหลัก และข้อมูลติดต่อ จากนั้นจึงออกแบบโครงสร้างหน้าและเนื้อหาที่ต้องใช้</p>
          </details>
          <details className="border-2 border-slate-300 bg-white p-5">
            <summary className="cursor-pointer font-bold transition-colors duration-150 hover:text-slate-600">ออกแบบเว็บให้เหมาะกับธุรกิจได้อย่างไร?</summary>
            <p className="mt-4 text-sm leading-6 text-slate-600">เลือก Blueprint และ Component ตามอุตสาหกรรม พร้อมกำหนด Brand, CTA และลำดับเนื้อหาให้สอดคล้องกับเป้าหมายเว็บไซต์</p>
          </details>
          <details className="border-2 border-slate-300 bg-white p-5">
            <summary className="cursor-pointer font-bold transition-colors duration-150 hover:text-slate-600">สร้างเว็บไซต์ฟรีได้หรือไม่?</summary>
            <p className="mt-4 text-sm leading-6 text-slate-600">คุณสามารถเริ่มจากการวางโครงสร้างและ Low-wireframe เพื่อประเมินแนวทางก่อนเลือกแพ็กเกจและบริการที่เหมาะสม</p>
          </details>
          <details className="border-2 border-slate-300 bg-white p-5">
            <summary className="cursor-pointer font-bold transition-colors duration-150 hover:text-slate-600">หลังออกแบบเว็บแล้วมีขั้นตอนอะไรต่อ?</summary>
            <p className="mt-4 text-sm leading-6 text-slate-600">ตรวจสอบเนื้อหา ทำ QA ให้ลูกค้า Review และ Approve จากนั้นจึงเชื่อม Domain และเปิดใช้งานเว็บไซต์</p>
          </details>
        </div>
      </section>

      <footer className="border-t-2 border-slate-300 bg-white px-6 py-12 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight hover:underline">
              WOP / Website Operating Platform
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              แพลตฟอร์มสำหรับสร้างเว็บ ออกแบบเว็บ และดูแลเว็บไซต์ธุรกิจตั้งแต่เริ่มต้นจนเปิดใช้งานจริง
            </p>
            <Link href="/get-started" className="mt-6 inline-block border-2 border-slate-900 bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-slate-700">
              เริ่มสร้างเว็บไซต์ →
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide">Product</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <Link href="/features" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Features</Link>
              <Link href="/pricing" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Pricing</Link>
              <Link href="/solutions/accounting" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Solutions</Link>
              <Link href="/sitemap-preview" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Sitemap preview</Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide">Company</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <Link href="/partners" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Partner program</Link>
              <Link href="/contact" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Contact us</Link>
              <Link href="/request-quote" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Request a quote</Link>
              <Link href="/login" className="transition-colors duration-150 hover:text-slate-900 hover:underline">Login</Link>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide">Start</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <Link href="/get-started" className="transition-colors duration-150 hover:text-slate-900 hover:underline">สร้างเว็บสำหรับธุรกิจ</Link>
              <Link href="/get-started" className="transition-colors duration-150 hover:text-slate-900 hover:underline">ออกแบบเว็บเบื้องต้น</Link>
              <Link href="/pricing" className="transition-colors duration-150 hover:text-slate-900 hover:underline">ดูแพ็กเกจ</Link>
              <Link href="/contact" className="transition-colors duration-150 hover:text-slate-900 hover:underline">คุยกับทีมงาน</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Website Operating Platform. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Thailand · ASEAN</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
