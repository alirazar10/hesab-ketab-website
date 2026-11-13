import { useLocale, useTranslations } from "next-intl";
import { LogoMark } from "@/components/logo-mark";
import { Hero } from "@/components/hero";
import { Example } from "@/components/example";
import { Steps } from "@/components/steps";
import { Gallery } from "@/components/gallery";
import { Rules } from "@/components/rules";
import { Residents } from "@/components/residents";
import { StructuredData } from "@/components/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { homePaths, type Locale } from "@/i18n/config";
import { downloadUrl, loginUrl } from "@/lib/app-url";
import { Download } from "lucide-react";

/** The whole landing page, in the language of the route that renders it. */
export function Landing() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const other: Locale = locale === "fa" ? "en" : "fa";

  return (
    <>
      <StructuredData locale={locale} name={t("brand")} description={t("meta.description")} />
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5 text-xl font-black">
          <LogoMark size={36} />
          {t("brand")}
        </a>
        <nav aria-label={t("nav.label")} className="flex items-center gap-7 text-sm font-bold">
          <a href="#how" className="hidden text-muted hover:text-ink md:inline">
            {t("nav.how")}
          </a>
          <a href="#app" className="hidden text-muted hover:text-ink md:inline">
            {t("nav.app")}
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
        <Gallery />
        <Rules />
        <Residents />

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 text-center shadow-[0_40px_80px_-50px_rgba(0,77,64,0.45)] sm:px-12 sm:py-20">
            <div aria-hidden className="absolute -top-32 left-1/2 -z-10 size-[420px] -translate-x-1/2 rounded-full bg-brand-soft blur-[60px]" />
            <div className="flex justify-center">
              <LogoMark size={56} />
            </div>
            <h2 className="mt-6 text-balance text-3xl font-black leading-snug sm:text-[2.6rem] sm:leading-[1.35] en:leading-tight">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-8 text-muted en:leading-7">{t("cta.lead")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href={loginUrl}
                className="rounded-lg bg-brand px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-dark"
              >
                {t("cta.start")}
              </a>
              <a
                href={downloadUrl}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-7 py-4 text-lg font-bold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <Download aria-hidden className="size-5" />
                {t("hero.download")}
              </a>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted">{t("cta.devices")}</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
