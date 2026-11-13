import { useTranslations } from "next-intl";
import { exampleBill, exampleKwh, exampleUnits, num, shareOf } from "@/lib/example";
import { unitShades } from "./hero";
import { SectionHeader } from "./section-header";

export function Example() {
  const t = useTranslations("example");

  return (
    <section id="example" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} lead={t("lead", { total: num(exampleBill), kwh: num(exampleKwh) })} />

        <table className="mt-10 w-full border-collapse text-start">
          <thead>
            <tr className="border-b-2 border-ink text-sm text-muted">
              <th scope="col" className="py-3 pe-4 text-start font-bold">
                {t("household")}
              </th>
              <th scope="col" className="hidden py-3 pe-4 text-start font-bold sm:table-cell">
                {t("use")}
              </th>
              <th scope="col" className="py-3 text-end font-bold">
                {t("share")}
              </th>
            </tr>
          </thead>
          <tbody>
            {exampleUnits.map((u, i) => {
              const percent = num((u.kwh / exampleKwh) * 100, 1);
              return (
                <tr key={u.unit} className="border-b border-line align-top">
                  <td className="py-5 pe-4">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className={`size-3 shrink-0 rounded-sm ${unitShades[i]}`} />
                      <span className="font-bold">{t(`names.${u.name}`)}</span>
                      <span className="text-sm text-muted">{t("unitName", { n: u.unit })}</span>
                    </div>
                    <p className="tnum mt-2 ps-6 text-sm text-muted">
                      {t("explain", { kwh: num(u.kwh), all: num(exampleKwh), percent })}
                    </p>
                  </td>
                  <td className="tnum hidden py-5 pe-4 sm:table-cell">{t("kwh", { value: num(u.kwh) })}</td>
                  <td className="tnum whitespace-nowrap py-5 text-end text-lg font-bold">{t("afn", { value: num(shareOf(u.kwh)) })}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="py-5 pe-4 text-start font-bold">
                {t("total")}
              </th>
              <td className="tnum hidden py-5 pe-4 font-bold sm:table-cell">{t("kwh", { value: num(exampleKwh) })}</td>
              <td className="tnum whitespace-nowrap py-5 text-end text-lg font-black text-brand">
                {t("afn", { value: num(exampleBill) })}
              </td>
            </tr>
          </tfoot>
        </table>
        <p className="mt-2 text-sm text-muted">{t("note")}</p>
      </div>
    </section>
  );
}
