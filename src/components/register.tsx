/**
 * A meter register: boxed digits like the counter on an electricity meter, whole digits white on
 * ink and decimals on red, as in the app. With `roll`, each cell turns to its digit on load.
 */
export function Register({
  value,
  decimals = 1,
  minDigits = 5,
  size = "md",
  roll = false,
  label,
}: {
  value: string;
  decimals?: number;
  minDigits?: number;
  size?: "sm" | "md" | "lg";
  roll?: boolean;
  /** The accessible reading; the digit boxes themselves are decorative. */
  label: string;
}) {
  const [whole, fraction = ""] = value.split(".");
  const wholeCells = whole.replace(/\D/g, "").padStart(minDigits, "0").split("");
  const fractionCells = fraction.padEnd(decimals, "0").slice(0, decimals).split("");
  const cells = [
    ...wholeCells.map((d) => ({ d, red: false })),
    ...fractionCells.map((d) => ({ d, red: true })),
  ];
  const box = {
    sm: "h-8 w-6 text-lg",
    md: "h-10 w-7 text-2xl",
    lg: "h-14 w-9 text-3xl min-[400px]:h-16 min-[400px]:w-11 min-[400px]:text-4xl sm:h-20 sm:w-14 sm:text-5xl",
  }[size];

  return (
    <span dir="ltr" role="img" aria-label={label} className="tnum inline-flex gap-1 align-middle">
      {cells.map(({ d, red }, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`${box} ${red ? "bg-meter-red" : "bg-meter"} relative overflow-hidden rounded-[4px] font-bold leading-none text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.25),inset_0_2px_0_rgba(255,255,255,0.08)]`}
        >
          {roll ? (
            <span
              className="wheel absolute inset-x-0 top-0 flex h-[1000%] flex-col"
              style={{ "--d": Number(d), "--i": i } as React.CSSProperties}
            >
              {"0123456789".split("").map((n) => (
                <span key={n} className="grid h-[10%] place-items-center">
                  {n}
                </span>
              ))}
            </span>
          ) : (
            <span className="grid h-full place-items-center">{d}</span>
          )}
          {/* The window glass: a soft band across the middle, as on a real counter. */}
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_30%,transparent_70%,rgba(0,0,0,0.35))]" />
        </span>
      ))}
    </span>
  );
}
