import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/logo-mark";
import { SiteFooter } from "@/components/site-footer";
import { homePaths, type Locale } from "@/i18n/config";
import { contactEmail, legalPath, legalText, type LegalDocument } from "@/lib/legal";

/** The Privacy Policy, the Terms of Use or the account deletion page, in the language of the route that renders it. */
export function LegalPage({ locale, document }: { locale: Locale; document: LegalDocument }) {
  const t = useTranslations();
  const { labels, [document]: content } = legalText(locale);
  const other: Locale = locale === "fa" ? "en" : "fa";

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <a href={homePaths[locale]} aria-label={labels.home} className="flex items-center gap-2.5 text-xl font-black">
          <LogoMark size={36} />
          {t("brand")}
        </a>
        <a
          href={legalPath(other, document)}
          hrefLang={other}
          lang={other}
          aria-label={t("nav.otherLanguageLabel")}
          className="text-sm font-bold text-muted hover:text-ink"
        >
          {t("nav.otherLanguage")}
        </a>
      </header>

      <main className="bg-surface">
        <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <h1 className="text-balance text-3xl font-black leading-snug sm:text-4xl en:leading-tight">
            {labels[document]}
          </h1>
          <p className="mt-3 text-sm text-muted">{labels.updated}</p>
          <p className="mt-8 text-lg leading-9 en:leading-8">{content.intro}</p>

          {content.sections.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="text-xl font-bold leading-snug sm:text-2xl">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8 text-muted en:leading-7">
                  {paragraph}
                </p>
              ))}
              {section.steps && (
                <ol className="mt-4 list-decimal space-y-3 ps-5 leading-8 text-muted marker:font-bold marker:text-brand en:leading-7">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-3 ps-5 leading-8 text-muted marker:text-brand en:leading-7">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.after && <p className="mt-4 font-bold leading-8 text-ink en:leading-7">{section.after}</p>}
              {section.email && (
                <a
                  dir="ltr"
                  href={`mailto:${contactEmail}`}
                  className="mt-3 inline-block font-bold text-brand hover:text-brand-dark"
                >
                  {contactEmail}
                </a>
              )}
            </section>
          ))}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
