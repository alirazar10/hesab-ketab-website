import fa from "../../messages/fa.json";
import en from "../../messages/en.json";

/**
 * The site's languages. Dari is the default and lives at `/`; English is at `/en/`. A static export
 * has no middleware, so each language is its own prerendered page (see `app/(fa)` and `app/en`).
 */
export const locales = ["fa", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const directions: Record<Locale, "rtl" | "ltr"> = { fa: "rtl", en: "ltr" };

/** The home page of each language. */
export const homePaths: Record<Locale, string> = { fa: "/", en: "/en/" };

/** The Open Graph locale of each language. */
export const ogLocales: Record<Locale, string> = { fa: "fa_AF", en: "en" };

// English must have every key Dari has (a missing key fails the type check here).
const english: typeof fa = en;

export const messages: Record<Locale, typeof fa> = { fa, en: english };

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);
