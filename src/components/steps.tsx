import { useTranslations } from "next-intl";

// The monthly order of work in the app; the order matters, so the steps are numbered.
const steps = ["readings", "bills", "calculate", "finalize", "payments"] as const;

export function Steps() {
  const t = useTranslations("how");

  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h2 className="text-3xl font-bold leading-snug sm:text-4xl">{t("title")}</h2>
      <p className="mt-4 max-w-2xl leading-8 text-muted">{t("lead")}</p>

      <ol className="relative mt-12 grid gap-10 md:grid-cols-5 md:gap-6">
        {/* The line the steps sit on (desktop) */}
        <span aria-hidden="true" className="absolute inset-x-6 top-5 hidden h-px bg-line md:block" />
        {steps.map((key, i) => (
          <li key={key} className="relative flex gap-4 md:block">
            <span
              aria-hidden="true"
              className={`tnum relative grid h-10 w-8 shrink-0 place-items-center rounded-[4px] text-xl font-bold text-white ${
                key === "finalize" ? "bg-meter-red" : "bg-meter"
              }`}
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg font-bold md:mt-5">{t(`steps.${key}.title`)}</h3>
              <p className="mt-2 text-[0.95rem] leading-7 text-muted">{t(`steps.${key}.body`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
