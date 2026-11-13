import type { Metadata } from "next";
import { homePaths, messages, type Locale } from "@/i18n/config";
import { icons, languageLinks, socialTags } from "@/lib/seo";

/** The public ways to reach Hesab Ketab. Each must be something that is really read. */
export const contacts = {
  whatsapp: { href: "https://wa.me/93787073311", display: "+93 78 707 3311" },
  email: { href: "mailto:info@hesaabketab.com", display: "info@hesaabketab.com" },
  facebook: { href: "https://www.facebook.com/hesaabketab", display: "facebook.com/hesaabketab" },
} as const;

export const contactPath = (locale: Locale) => `${homePaths[locale]}contact/`;

/** Title, description and the links between the language versions of the contact page. */
export function contactMetadata(locale: Locale): Metadata {
  const { title, description } = messages[locale].contact;
  const fullTitle = `${title} | ${locale === "fa" ? "حساب کتاب" : "Hesab Ketab"}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: contactPath(locale), languages: languageLinks(contactPath) },
    icons,
    ...socialTags(locale, { title: fullTitle, description, path: contactPath(locale), type: "website" }),
  };
}
