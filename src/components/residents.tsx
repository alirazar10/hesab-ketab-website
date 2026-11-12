import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { num } from "@/lib/example";

// The statement of household Ahmadi (unit 2 in the worked example).
const lines = [
  { key: "electricity", why: "electricityWhy", amount: 6200 },
  { key: "water", why: "waterWhy", amount: 1000 },
  { key: "trash", why: "trashWhy", amount: 200 },
] as const;
const paid = 5000;
const balance = lines.reduce((s, l) => s + l.amount, 0) - paid;

export function Residents() {
  const t = useTranslations("residents");
  const e = useTranslations("example");

  return (
    <section id="residents" className="on-dark bg-brand-deep text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold leading-snug sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 leading-8 text-white/80">{t("lead")}</p>
          <ul className="mt-8 space-y-4">
            {(["own", "private", "calendar", "notices"] as const).map((key) => (
              <li key={key} className="flex gap-3 leading-7">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-turquoise" strokeWidth={2.5} />
                <span>{t(`points.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-surface p-6 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <div>
              <div className="text-sm text-muted">{t("card.title")}</div>
              <div className="mt-1 font-bold">{t("card.household")}</div>
            </div>
            <div className="text-sm font-bold text-brand">{t("card.period")}</div>
          </div>
          <dl className="divide-y divide-line">
            {lines.map((l) => (
              <div key={l.key} className="flex items-start justify-between gap-4 py-4">
                <dt>
                  <div className="font-bold">{t(`card.${l.key}`)}</div>
                  <div className="tnum mt-1 text-sm text-muted">{t(`card.${l.why}`)}</div>
                </dt>
                <dd className="tnum font-bold">{e("afn", { value: num(l.amount) })}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 py-4 text-muted">
              <dt>{t("card.paid")}</dt>
              <dd className="tnum">{e("afn", { value: num(paid) })}</dd>
            </div>
          </dl>
          <div className="flex items-center justify-between gap-4 rounded-xl bg-brand-soft px-4 py-4">
            <span className="font-bold">{t("card.balance")}</span>
            <span className="tnum text-xl font-black text-brand-deep">{e("afn", { value: num(balance) })}</span>
          </div>
          <p className="mt-4 text-sm text-muted">{t("card.due")}</p>
        </div>
      </div>
    </section>
  );
}
