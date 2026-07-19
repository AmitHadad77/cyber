import type { Metadata } from "next";
import PremiumCursor from "@/components/ui/PremiumCursor";
import Preloader from "@/components/Preloader";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI Aether — אבטחת ענן אוטונומית",
  description: "פלטפורמת אבטחת ענן אוטונומית המזהה ומגיבה לאיומים בזמן אמת.",
  openGraph: {
    title: "AI Aether",
    description: "פלטפורמת אבטחת ענן אוטונומית.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
          <PremiumCursor />
        <Preloader />
        {children}
      </body>
    </html>
  );
}