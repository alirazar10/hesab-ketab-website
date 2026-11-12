import type { Metadata } from "next";
import { defaultLocale, locales, ogLocales, type Locale } from "@/i18n/config";

/** The image shown when a link to the site is shared (1200x630, in `public/`). */
const shareImages: Record<Locale, string> = { fa: "/og-fa.png", en: "/og-en.png" };

const siteNames: Record<Locale, string> = { fa: "حساب کتاب", en: "Hesab Ketab" };

/** The alternate language links of a page; `x-default` is what a visitor with any other language gets. */
export const languageLinks = (path: (locale: Locale) => string) => ({
  ...Object.fromEntries(locales.map((l) => [l, path(l)])),
  "x-default": path(defaultLocale),
});

/** Icons for browsers and phones that do not use the SVG one (the SVG is `app/icon.svg`). */
export const icons: Metadata["icons"] = {
  icon: [
    { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
};

/** Open Graph and Twitter tags of a page, with the share image of its language. */
export function socialTags(
  locale: Locale,
  page: { title: string; description: string; path: string; type: "website" | "article" },
): Pick<Metadata, "openGraph" | "twitter"> {
  const images = [{ url: shareImages[locale], width: 1200, height: 630, alt: siteNames[locale] }];
  return {
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      siteName: siteNames[locale],
      locale: ogLocales[locale],
      type: page.type,
      images,
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images },
  };
}
