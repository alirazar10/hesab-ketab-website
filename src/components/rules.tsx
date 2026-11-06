import { useTranslations } from "next-intl";
import { DoorOpen, Droplets, FilePenLine, ReceiptText, Trash2, Zap, type LucideIcon } from "lucide-react";

const rules: { key: string; icon: LucideIcon }[] = [
  { key: "electricity", icon: Zap },
  { key: "water", icon: Droplets },
  { key: "trash", icon: Trash2 },
  { key: "arrears", icon: ReceiptText },
  { key: "moveOut", icon: DoorOpen },
  { key: "adjust", icon: FilePenLine },
];

export function Rules() {
  const t = useTranslations("fair");

  return (
    <section id="fair" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="text-3xl font-bold leading-snug sm:text-4xl">{t("title")}</h2>
        <p className="mt-4 max-w-2xl leading-8 text-muted">{t("lead")}</p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {rules.map(({ key, icon: Icon }) => (
            <div key={key} className="bg-surface p-7">
              <Icon aria-hidden="true" className="size-6 text-brand" strokeWidth={2} />
              <h3 className="mt-4 text-lg font-bold">{t(`rules.${key}.title` as "rules.electricity.title")}</h3>
              <p className="mt-2 leading-7 text-muted">{t(`rules.${key}.body` as "rules.electricity.body")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
