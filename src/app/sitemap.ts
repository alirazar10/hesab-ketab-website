import type { MetadataRoute } from "next";
import { defaultLocale, homePaths, locales, type Locale } from "@/i18n/config";
import { legalPath } from "@/lib/legal";
import { siteUrl } from "@/lib/site-url";

// Written to a plain file by the static export.
export const dynamic = "force-static";

/** Each page once per language, with links to its other language versions. Add new pages here. */
const pages: ((locale: Locale) => string)[] = [
  (locale) => homePaths[locale],
  (locale) => legalPath(locale, "privacy"),
  (locale) => legalPath(locale, "terms"),
  (locale) => legalPath(locale, "deletion"),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}${path(l)}`])),
      "x-default": `${siteUrl}${path(defaultLocale)}`,
    };
    return locales.map((locale) => ({
      url: `${siteUrl}${path(locale)}`,
      priority: path(defaultLocale) === "/" ? 1 : 0.3,
      alternates: { languages },
    }));
  });
}
