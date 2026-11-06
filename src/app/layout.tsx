import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { locale } from "@/i18n/request";
import "./globals.css";

// Estedad: an open-licensed Persian typeface, the same one the app uses.
const estedad = localFont({
  variable: "--font-estedad",
  display: "swap",
  src: [
    { path: "./fonts/Estedad-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Estedad-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Estedad-Black.ttf", weight: "900", style: "normal" },
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description"), locale: "fa_AF", type: "website" },
  };
}

export const viewport: Viewport = { themeColor: "#00796b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale} dir="rtl" className={estedad.variable}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
