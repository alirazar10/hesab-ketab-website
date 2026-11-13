import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { desktopImage, galleryIds, phoneImage } from "@/lib/gallery";
import { GalleryShowcase } from "./gallery-showcase";
import { DarkGlow, SectionHeader } from "./section-header";

/**
 * "A look at the app", on a dark brand band: the phone screens as a fanned showcase that turns by itself, then the desktop
 * view tilted back. The screenshots are of a sample building, and say so.
 */
export function Gallery() {
  const t = useTranslations("gallery");
  const locale = useLocale();

  const items = galleryIds.map((id) => ({
    id,
    ...phoneImage(id),
    title: t(`items.${id}.title`),
    body: t(`items.${id}.body`),
    alt: t(`items.${id}.alt`),
  }));

  return (
    <section id="app" className="on-dark relative isolate overflow-clip bg-brand-deep text-white">
      <DarkGlow />

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeader dark eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

        <div className="mt-12 lg:mt-8">
          <GalleryShowcase
            items={items}
            locale={locale}
            rtl={locale === "fa"}
            label={t("label")}
            prev={t("prev")}
            next={t("next")}
          />
        </div>

        {/* The desktop view, tilted back; it stands up when the pointer is on it. */}
        <figure className="mx-auto mt-24 max-w-4xl [perspective:1600px]">
          <figcaption className="mb-10 text-center">
            <span className="block text-2xl font-black sm:text-3xl">{t("desktop.title")}</span>
            <span className="mx-auto mt-3 block max-w-xl leading-8 text-white/70 en:leading-7">{t("desktop.body")}</span>
          </figcaption>
          <div className="relative">
            <div aria-hidden className="absolute inset-x-[10%] -bottom-6 top-1/3 -z-10 rounded-full bg-turquoise/30 blur-[70px]" />
            <Image
              src={desktopImage.src}
              width={desktopImage.width}
              height={desktopImage.height}
              alt={t("desktop.alt")}
              sizes="(min-width: 896px) 896px, 100vw"
              loading="lazy"
              className="h-auto w-full origin-bottom rounded-2xl ring-1 ring-white/15 shadow-[0_50px_80px_-30px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform:rotateX(14deg)] hover:[transform:rotateX(0deg)] motion-reduce:[transform:none]"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
