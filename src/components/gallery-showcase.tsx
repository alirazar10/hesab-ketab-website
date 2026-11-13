"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ShowcaseItem = { id: string; src: string; width: number; height: number; title: string; body: string; alt: string };

type Props = {
  items: ShowcaseItem[];
  locale: string;
  rtl: boolean;
  label: string;
  prev: string;
  next: string;
};

/** How long each screen stays before the next one comes forward, when the screens turn by themselves. */
const STEP_MS = 5200;
/** How far the page scrolls for each screen, in viewport heights, when scrolling drives them. */
const SCROLL_PER_SCREEN = 0.6;
/**
 * Scrolling drives the screens when the window is tall enough to pin the whole showcase in view; on a short window it would
 * not fit, so the screens turn by themselves instead.
 */
const SCROLL_QUERY = "(min-height: 680px)";

/**
 * The phone screens as a fanned stack: the chosen one in front, its neighbours tilted behind it. On a tall enough window
 * the showcase stays pinned while the page scrolls and each stretch of scrolling brings the next screen forward; otherwise
 * it moves on by itself while in view. A numbered list beside it (wide screens) or arrows and dots under it (phones)
 * choose a screen in either mode.
 */
export function GalleryShowcase({ items, locale, rtl, label, prev, next }: Props) {
  const count = items.length;
  const [active, setActive] = useState(0);
  // How far through the current screen's stretch of scrolling (0–1), for the line under the chosen feature.
  const [part, setPart] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tall = window.matchMedia(SCROLL_QUERY);
    const update = () => {
      setReduced(motion.matches);
      setScrollMode(tall.matches);
    };
    update();
    motion.addEventListener("change", update);
    tall.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    if (track.current) observer.observe(track.current);
    return () => {
      motion.removeEventListener("change", update);
      tall.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  // Scroll mode: the screen in front follows how far the page has scrolled through the track.
  useEffect(() => {
    if (!scrollMode) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = track.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const room = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / room)) * count;
      const index = Math.min(count - 1, Math.floor(progress));
      setActive(index);
      setPart(Math.min(1, progress - index));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [scrollMode, count]);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (scrollMode && el) {
        // The page has a first and a last screen here, so the arrows stop at the ends instead of jumping the whole track.
        const target = Math.min(count - 1, Math.max(0, i));
        // Scroll to the middle of that screen's stretch; the scroll handler then brings it forward.
        const top = el.getBoundingClientRect().top + window.scrollY;
        const room = el.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + ((target + 0.5) / count) * room, behavior: reduced ? "auto" : "smooth" });
      } else {
        setActive(((i % count) + count) % count);
      }
    },
    [count, scrollMode, reduced],
  );

  // Timed mode: move on by itself while in view, unless the pointer or the keyboard is on it.
  const playing = !scrollMode && visible && !hovered && !focused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % count), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, count]);

  const number = (i: number) => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(i + 1);
  // "Further on" lies to the left in Dari and to the right in English.
  const side = rtl ? -1 : 1;

  return (
    <div
      ref={track}
      className="relative"
      style={scrollMode ? { height: `calc(100svh + ${count * SCROLL_PER_SCREEN * 100}svh)` } : undefined}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(active + (rtl ? 1 : -1));
          if (e.key === "ArrowRight") go(active + (rtl ? -1 : 1));
        }}
        className={`grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 ${
          scrollMode ? "sticky top-0 h-svh content-center" : ""
        }`}
      >
        {/* The list that chooses a screen (wide screens). */}
        <ol className="order-2 hidden space-y-2 lg:order-1 lg:block">
          {items.map((item, i) => {
            const on = i === active;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={on ? "true" : undefined}
                  className={`group relative w-full overflow-hidden rounded-2xl px-5 py-4 text-start transition-colors duration-300 ${
                    on ? "bg-white/[0.09] ring-1 ring-white/15" : "hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={`tnum text-sm font-black transition-colors ${on ? "text-turquoise" : "text-white/35 group-hover:text-white/60"}`}
                    >
                      {number(i)}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-lg font-bold leading-8 transition-colors ${on ? "text-white" : "text-white/60 group-hover:text-white/85"}`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <span className="overflow-hidden text-[0.95rem] leading-7 text-white/70 en:leading-6">{item.body}</span>
                      </span>
                    </span>
                  </span>
                  {/* How close the next screen is: by time, or by scrolling. */}
                  {on && (
                    <span aria-hidden className="absolute inset-x-5 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/10">
                      {scrollMode ? (
                        <span
                          className="block h-full origin-right bg-turquoise transition-transform duration-150 ltr:origin-left"
                          style={{ transform: `scaleX(${part})` }}
                        />
                      ) : (
                        <span
                          key={active}
                          className="showcase-progress block h-full bg-turquoise"
                          style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                        />
                      )}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {/* The stage. */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto h-[400px] max-w-[560px] sm:h-[500px] lg:h-[min(620px,calc(100svh-80px))]">
            {/* The glow and rings behind the front phone. */}
            <div aria-hidden className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise/30 blur-[90px] sm:size-[420px]" />
            <div aria-hidden className="absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:size-[480px]" />
            <div aria-hidden className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:size-[600px]" />

            {items.map((item, i) => {
              // Where this screen sits relative to the front one: 0 in front, ±1 beside it, the rest out of sight behind.
              let offset = i - active;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;
              const shown = Math.abs(offset) <= 1;
              const front = offset === 0;
              const x = offset * 52 * side;
              const transform = front
                ? "translate(-50%, -50%)"
                : `translate(calc(-50% + ${x}%), -48%) scale(${shown ? 0.8 : 0.6}) rotate(${offset * side * 7}deg)`;
              return (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={front || !shown ? -1 : 0}
                  aria-hidden={!front}
                  onClick={() => go(i)}
                  aria-label={item.title}
                  className="absolute left-1/2 top-1/2 w-[192px] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:w-[240px] lg:w-[min(290px,calc((100svh-150px)*0.5))]"
                  style={{
                    transform,
                    zIndex: front ? 3 : shown ? 2 : 1,
                    opacity: front ? 1 : shown ? 0.55 : 0,
                    filter: front ? "none" : "saturate(0.6) brightness(0.8)",
                    pointerEvents: shown && !front ? "auto" : "none",
                  }}
                >
                  <span className={front && !reduced ? "showcase-float block" : "block"}>
                    <Image
                      src={item.src}
                      width={item.width}
                      height={item.height}
                      alt={item.alt}
                      sizes="(min-width: 1024px) 290px, (min-width: 640px) 240px, 192px"
                      loading={i < 2 || i === count - 1 ? "eager" : "lazy"}
                      className="h-auto w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.45)]"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Narrow screens: the caption, arrows and dots. */}
          <div className="mt-1 text-center lg:hidden" aria-live="polite">
            <p className="text-sm font-black text-turquoise">
              <span className="tnum">{number(active)}</span>
              <span className="text-white/35"> / {number(count - 1)}</span>
            </p>
            <p className="mt-1.5 text-xl font-bold">{items[active].title}</p>
            <p className="mx-auto mt-1.5 min-h-14 max-w-sm leading-7 text-white/70 en:leading-6">{items[active].body}</p>
          </div>
          <div className="mt-3 flex items-center justify-center gap-5 lg:hidden">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label={prev}
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
            >
              {rtl ? <ChevronRight aria-hidden size={20} /> : <ChevronLeft aria-hidden size={20} />}
            </button>
            <div className="flex gap-1.5">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={item.title}
                  aria-current={i === active ? "true" : undefined}
                  className="grid h-6 place-items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-turquoise" : "w-1.5 bg-white/30"}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label={next}
              className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20"
            >
              {rtl ? <ChevronLeft aria-hidden size={20} /> : <ChevronRight aria-hidden size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
