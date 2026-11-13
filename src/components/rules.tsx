import { useTranslations } from "next-intl";
import { SectionHeader } from "./section-header";
import { DoorOpen, Droplets, FilePenLine, ReceiptText, Trash2, Zap, type LucideIcon } from "lucide-react";

const others: { key: "water" | "trash" | "arrears" | "moveOut" | "adjust"; icon: LucideIcon }[] = [
  { key: "water", icon: Droplets },
  { key: "trash", icon: Trash2 },
  { key: "arrears", icon: ReceiptText },
  { key: "moveOut", icon: DoorOpen },
  { key: "adjust", icon: FilePenLine },
];

/** Price of one kWh at five rising levels of use: the same for the ratio method, a staircase for the tiered one. */
const bars = { ratio: [4, 4, 4, 4, 4], tiered: [2, 3, 5, 7, 9] } as const;

export function Rules() {
  const t = useTranslations("fair");
  const nav = useTranslations("nav");

  return (
    <section id="fair" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader eyebrow={nav("fair")} title={t("title")} lead={t("lead")} />

        <div className="mt-12 rounded-3xl bg-ground p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
              <Zap aria-hidden="true" className="size-6" strokeWidth={2} />
            </span>
            <div>
              <h3 className="text-xl font-bold">{t("rules.electricity.title")}</h3>
              <p className="mt-1 text-muted">{t("rules.electricity.body")}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {(["ratio", "tiered"] as const).map((method) => (
              <div key={method} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
                <h4 className="text-lg font-bold text-brand-dark">{t(`rules.electricity.${method}.title`)}</h4>
                <p className="mt-2 grow leading-8 text-muted en:leading-7">{t(`rules.electricity.${method}.body`)}</p>
                <div className="mt-6 flex items-end gap-4 border-t border-line pt-5">
                  <div aria-hidden="true" className="flex h-12 items-end gap-1.5">
                    {bars[method].map((height, i) => (
                      <span key={i} className="w-3.5 rounded-sm bg-brand" style={{ height: `${height * 5}px` }} />
                    ))}
                  </div>
                  <p className="pb-0.5 text-sm font-bold text-ink">{t(`rules.electricity.${method}.price`)}</p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-6 grid gap-x-8 gap-y-2 text-muted md:grid-cols-2">
            <li className="leading-7">{t("rules.electricity.vacant")}</li>
            <li className="leading-7">{t("rules.electricity.note")}</li>
          </ul>
        </div>

        <dl className="mt-10 divide-y divide-line border-y border-line">
          {others.map(({ key, icon: Icon }) => (
            <div key={key} className="grid gap-3 py-7 md:grid-cols-3 md:gap-10">
              <dt className="flex items-center gap-3 text-lg font-bold">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
                </span>
                {t(`rules.${key}.title`)}
              </dt>
              <dd className="leading-8 text-muted md:col-span-2 en:leading-7">{t(`rules.${key}.body`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
