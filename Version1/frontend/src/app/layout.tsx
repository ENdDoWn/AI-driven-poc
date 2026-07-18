import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI UI Builder — POC",
  description: "AI-Driven SME Website Builder using Google Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
