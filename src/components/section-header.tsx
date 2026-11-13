/**
 * The head of every section on the landing page: a small label, the heading and its lead, in one style so the sections read
 * as one page. `dark` is for the sections on the deep brand band.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold ${
          dark ? "bg-white/10 text-turquoise ring-1 ring-white/15" : "bg-brand-soft text-brand"
        }`}
      >
        <span aria-hidden className={`size-1.5 rounded-full ${dark ? "bg-turquoise" : "bg-brand"}`} />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance text-3xl font-black leading-snug sm:text-[2.6rem] sm:leading-[1.35] en:leading-tight en:sm:leading-[1.15]">
        {title}
      </h2>
      {lead && <p className={`mt-5 leading-8 en:leading-7 ${dark ? "text-white/75" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

/** The light on the dark brand band: two soft glows from opposite corners and a faint dot grid. */
export function DarkGlow() {
  return (
    <>
      <div aria-hidden className="absolute -top-40 start-[-10%] -z-10 size-[640px] rounded-full bg-logo/40 blur-[140px]" />
      <div aria-hidden className="absolute -bottom-56 end-[-10%] -z-10 size-[720px] rounded-full bg-turquoise/20 blur-[150px]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
    </>
  );
}
