import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/logo-mark";
import { Hero } from "@/components/hero";
import { Example } from "@/components/example";
import { Steps } from "@/components/steps";
import { Rules } from "@/components/rules";
import { Residents } from "@/components/residents";
import { loginUrl } from "@/lib/app-url";

export default function Home() {
  const t = useTranslations();

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

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2.5">
            <LogoMark size={24} />
            <span className="font-bold text-ink">{t("brand")}</span>
            <span className="hidden sm:inline">{t("footer.tagline")}</span>
          </div>
          <a href={loginUrl} className="font-bold text-brand hover:text-brand-dark">
            {t("footer.signIn")}
          </a>
        </div>
      </footer>
    </>
  );
}
