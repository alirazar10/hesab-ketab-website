import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { estedad } from "@/app/fonts";
import { directions, homePaths, locales, ogLocales, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site-url";
import "@/app/globals.css";

/** Title, description and the links between the language versions of the page. */
export async function localeMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    // Makes canonical and language links full addresses, on the legal pages too.
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: homePaths[locale],
      languages: Object.fromEntries(locales.map((l) => [l, homePaths[l]])),
    },
    openGraph: { title: t("title"), description: t("description"), locale: ogLocales[locale], type: "website" },
  };
}

/** The `<html>` of one language version: each language has its own root layout. */
export function Document({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  setRequestLocale(locale);
  return (
    <html lang={locale} dir={directions[locale]} className={estedad.variable}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
