import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { SiteFooter } from "@/components/site-footer";
import { homePaths, type Locale } from "@/i18n/config";
import { contactPath, contacts } from "@/lib/contact";
import { legalPath, legalText } from "@/lib/legal";

/** Lucide has no brand icons, so the Facebook mark is drawn here. */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.350 9.101 11.647Z" />
    </svg>
  );
}

const channels = [
  { key: "whatsapp", icon: MessageCircle },
  { key: "email", icon: Mail },
  { key: "facebook", icon: FacebookIcon },
] as const;

/** The contact page, in the language of the route that renders it. */
export function ContactPage({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const other: Locale = locale === "fa" ? "en" : "fa";

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <a href={homePaths[locale]} className="flex items-center gap-2.5 text-xl font-black">
          <LogoMark size={36} />
          {t("brand")}
        </a>
        <a
          href={contactPath(other)}
          hrefLang={other}
          lang={other}
          aria-label={t("nav.otherLanguageLabel")}
          className="text-sm font-bold text-muted hover:text-ink"
        >
          {t("nav.otherLanguage")}
        </a>
      </header>

      <main className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <h1 className="text-balance text-3xl font-black leading-snug sm:text-4xl en:leading-tight">{t("contact.title")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 en:leading-8">{t("contact.intro")}</p>

          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {channels.map(({ key, icon: Icon }) => (
              <li key={key} className="flex flex-col rounded-2xl border border-line bg-ground p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-4 text-xl font-bold">{t(`contact.${key}.title`)}</h2>
                <p className="mt-2 grow leading-8 text-muted en:leading-7">{t(`contact.${key}.body`)}</p>
                <p dir="ltr" className="mt-4 break-all text-start text-sm font-bold text-ink">
                  {contacts[key].display}
                </p>
                <a
                  href={contacts[key].href}
                  {...(key === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="mt-4 inline-block rounded-lg bg-brand px-5 py-3 text-center font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  {t(`contact.${key}.action`)}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl leading-8 text-muted en:leading-7">
            {t("contact.note")}{" "}
            <a href={legalPath(locale, "deletion")} className="font-bold text-brand hover:text-brand-dark">
              {legalText(locale).labels.deletion}
            </a>
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
