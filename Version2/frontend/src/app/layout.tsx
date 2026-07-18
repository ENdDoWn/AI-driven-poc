import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "สร้างเว็บ ออกแบบเว็บ และสร้างเว็บไซต์ฟรี | Website Operating Platform",
    template: "%s | Website Operating Platform",
  },
  description:
    "แพลตฟอร์มสำหรับสร้างเว็บ ออกแบบเว็บ และบริหารเว็บไซต์ธุรกิจ ตั้งแต่เริ่มวางโครงสร้างจนถึงเปิดใช้งานจริง",
  keywords: [
    "สร้างเว็บ",
    "ออกแบบเว็บ",
    "สร้างเว็บไซต์ฟรี",
    "รับทำเว็บไซต์",
    "เว็บไซต์ธุรกิจ",
    "Website as a Service",
  ],
  openGraph: {
    title: "สร้างเว็บ ออกแบบเว็บ สำหรับธุรกิจ",
    description: "เริ่มวางโครงสร้างเว็บไซต์ธุรกิจ พร้อมระบบจัดการตั้งแต่ Onboarding ถึง Deployment",
    type: "website",
    locale: "th_TH",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
