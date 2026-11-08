import type { Metadata } from "next";
import en from "../../messages/legal/en.json";
import fa from "../../messages/legal/fa.json";
import { homePaths, locales, ogLocales, type Locale } from "@/i18n/config";

/** Where people write about their data or the terms. It must be a mailbox that is really read. */
export const contactEmail = "support@hesaabketab.com";

export type LegalDocument = "privacy" | "terms";

type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** A sentence that comes after the bullets. */
  after?: string;
  /** Show the contact address at the end of the section. */
  email?: boolean;
};

type LegalText = {
  labels: Record<"privacy" | "terms" | "updated" | "home" | "legalNav", string>;
} & Record<LegalDocument, { description: string; intro: string; sections: Section[] }>;

const legal: Record<Locale, LegalText> = { fa, en };

export const legalText = (locale: Locale) => legal[locale];

export const legalPath = (locale: Locale, document: LegalDocument) => `${homePaths[locale]}${document}/`;

/** Title, description and the links between the language versions of a legal page. */
export function legalMetadata(locale: Locale, document: LegalDocument): Metadata {
  const text = legal[locale];
  const title = `${text.labels[document]} | ${locale === "fa" ? "حساب کتاب" : "Hesab Ketab"}`;
  const description = text[document].description;
  return {
    title,
    description,
    alternates: {
      canonical: legalPath(locale, document),
      languages: Object.fromEntries(locales.map((l) => [l, legalPath(l, document)])),
    },
    openGraph: { title, description, locale: ogLocales[locale], type: "article" },
  };
}
