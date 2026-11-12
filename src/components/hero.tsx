import { useTranslations } from "next-intl";
import { exampleBill, exampleKwh, exampleUnits, num } from "@/lib/example";
import { downloadUrl, loginUrl } from "@/lib/app-url";
import { Register } from "./register";

const reading = "12458.7";

/** Unit shades for the split bar, darkest first; all brand tokens. */
export const unitShades = ["bg-brand-deep", "bg-brand", "bg-logo", "bg-turquoise"];

export function Hero() {
  const t = useTranslations("hero");
  const e = useTranslations("example");

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
      <div>
        <p className="text-sm font-bold text-brand">{t("eyebrow")}</p>
        <h1 className="mt-4 text-balance text-4xl font-black leading-[1.35] text-ink sm:text-5xl sm:leading-[1.3] lg:text-[3.6rem] en:leading-[1.12] en:sm:leading-[1.1] en:lg:text-[3.3rem]">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-9 text-muted en:leading-8">{t("lead")}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={loginUrl}
            className="rounded-lg bg-brand px-6 py-3.5 font-bold text-white transition-colors hover:bg-brand-dark"
          >
            {t("start")}
          </a>
          <a
            href={loginUrl}
            className="rounded-lg border border-line bg-surface px-6 py-3.5 font-bold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            {t("signIn")}
          </a>
          <a
            href={downloadUrl}
            className="rounded-lg px-4 py-3.5 font-bold text-brand transition-colors hover:text-brand-dark"
          >
            {t("download")}
          </a>
        </div>
      </div>

      {/* The meter, then the bill it produces, then that bill split by consumption. */}
      <figure className="relative">
        <div className="rounded-[28px] bg-[#2b2b2b] p-2.5 shadow-[0_30px_60px_-30px_rgba(0,77,64,0.55)]">
          <div className="relative rounded-[20px] bg-[linear-gradient(160deg,#f7faf9,#dfe7e5)] px-4 pb-7 pt-6 sm:px-9">
            {/* Faceplate screws */}
            {["top-3 right-3", "top-3 left-3", "bottom-3 right-3", "bottom-3 left-3"].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} size-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff,#9aa7a4)] shadow-inner`}
              />
            ))}
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-bold text-ink">{t("meterLabel")}</span>
              <span dir="ltr" className="tnum text-xs font-bold tracking-wider text-muted">
                kWh
              </span>
            </div>
            <div className="mt-4 flex justify-center rounded-xl bg-meter p-3 shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)]">
              <Register value={reading} size="lg" roll label={t("meterReading", { value: reading })} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-dashed border-[#b9c6c3] pt-4 text-sm">
              <div>
                <div className="text-muted">{t("consumption")}</div>
                <div className="tnum mt-1 font-bold">{t("consumptionValue", { value: num(exampleKwh) })}</div>
              </div>
              <div>
                <div className="text-muted">{t("bill")}</div>
                <div className="tnum mt-1 font-bold">{t("billValue", { value: num(exampleBill) })}</div>
              </div>
            </div>
          </div>
        </div>

        <figcaption className="mt-6 px-1">
          <div className="flex h-11 gap-1 overflow-hidden rounded-lg" aria-hidden="true">
            {exampleUnits.map((u, i) => (
              <div
                key={u.unit}
                className={`split-grow ${unitShades[i]} grid place-items-center text-sm font-bold text-white`}
                style={{ flex: u.kwh, "--i": i } as React.CSSProperties}
              >
                {e("unitName", { n: u.unit })}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">{t("period")}</p>
        </figcaption>
      </figure>
    </section>
  );
}
