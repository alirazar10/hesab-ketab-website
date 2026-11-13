import { useLocale, useTranslations } from "next-intl";
import { LogoMark } from "@/components/logo-mark";
import type { Locale } from "@/i18n/config";
import { loginUrl } from "@/lib/app-url";
import { contactPath } from "@/lib/contact";
import { legalPath, legalText } from "@/lib/legal";

/** The footer of every page, with the links to the legal documents. */
export function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { labels } = legalText(locale);
  // Dari pages count the year in the Afghan solar calendar, like every date on the site; English pages use the usual year.
  const now = new Date();
  const year = locale === "fa" ? new Intl.DateTimeFormat("en-u-ca-persian", { year: "numeric" }).format(now).replace(/\D/g, "") : String(now.getFullYear());

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2.5">
          <LogoMark size={24} />
          <span className="font-bold text-ink">{t("brand")}</span>
          <span className="hidden sm:inline">{t("footer.tagline")}</span>
        </div>
        <nav aria-label={labels.legalNav} className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={legalPath(locale, "privacy")} className="hover:text-ink">
            {labels.privacy}
          </a>
          <a href={legalPath(locale, "terms")} className="hover:text-ink">
            {labels.terms}
          </a>
          <a href={legalPath(locale, "deletion")} className="hover:text-ink">
            {labels.deletion}
          </a>
          <a href={contactPath(locale)} className="hover:text-ink">
            {t("footer.contact")}
          </a>
          <a href={loginUrl} className="font-bold text-brand hover:text-brand-dark">
            {t("footer.signIn")}
          </a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl border-t border-line px-5 py-5 text-sm text-muted sm:px-8">{t("footer.copyright", { year })}</p>
    </footer>
  );
}
