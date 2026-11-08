import { useLocale, useTranslations } from "next-intl";
import { LogoMark } from "@/components/logo-mark";
import { Hero } from "@/components/hero";
import { Example } from "@/components/example";
import { Steps } from "@/components/steps";
import { Rules } from "@/components/rules";
import { Residents } from "@/components/residents";
import { SiteFooter } from "@/components/site-footer";
import { homePaths, type Locale } from "@/i18n/config";
import { loginUrl } from "@/lib/app-url";

/** The whole landing page, in the language of the route that renders it. */
export function Landing() {
  const t = useTranslations();
  const other: Locale = useLocale() === "fa" ? "en" : "fa";

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5 text-xl font-black">
          <LogoMark size={36} />
          {t("brand")}
        </a>
        <nav aria-label={t("nav.label")} className="flex items-center gap-7 text-sm font-bold">
          <a href="#how" className="hidden text-muted hover:text-ink md:inline">
            {t("nav.how")}
          </a>
          <a href="#fair" className="hidden text-muted hover:text-ink md:inline">
            {t("nav.fair")}
          </a>
          <a href="#residents" className="hidden text-muted hover:text-ink md:inline">
            {t("nav.residents")}
          </a>
          <a
            href={homePaths[other]}
            hrefLang={other}
            lang={other}
            aria-label={t("nav.otherLanguageLabel")}
            className="text-muted hover:text-ink"
          >
            {t("nav.otherLanguage")}
          </a>
          <a
            href={loginUrl}
            className="rounded-lg border border-line bg-surface px-4 py-2 text-ink hover:border-brand hover:text-brand"
          >
            {t("nav.signIn")}
          </a>
        </nav>
      </header>

      <main>
        <Hero />
        <Example />
        <Steps />
        <Rules />
        <Residents />

        <section className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
          <h2 className="text-3xl font-bold leading-snug sm:text-4xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-muted">{t("cta.lead")}</p>
          <a
            href={loginUrl}
            className="mt-9 inline-block rounded-lg bg-brand px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-dark"
          >
            {t("cta.start")}
          </a>
          <p className="mt-4 text-sm text-muted">{t("cta.devices")}</p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
