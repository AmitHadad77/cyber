import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "AI Aether — אבטחת ענן אוטונומית",
  description: "פלטפורמת אבטחת ענן אוטונומית מבוססת בינה מלאכותית",
  openGraph: {
    title: "AI Aether",
    description: "פלטפורמת אבטחת ענן אוטונומית",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}