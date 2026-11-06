/**
 * The Hesab Ketab mark (copied from the app's components/ui/logo-mark.tsx): a tilted diamond, broken
 * like a stamp, around a brushed "H". `tone="light"` is for dark grounds.
 */
export function LogoMark({ size = 32, tone = "dark" }: { size?: number; tone?: "dark" | "light" }) {
  const frame = tone === "dark" ? "#212121" : "#ffffff";
  const glyph = tone === "dark" ? "#009688" : "#1ac6bd";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g stroke={frame} strokeWidth="2.4">
        <path d="M32 3.5 L3.5 32 L32 60.5 L60.5 32 L54.5 26" />
        <path d="M32 3.5 L37.5 9" />
      </g>
      <g stroke={glyph} strokeWidth="4.6">
        <path d="M24 22 C25.2 28 25.2 34 24 40" />
        <path d="M12.5 31.5 C21 35 30 34.5 40 30" />
        <path d="M39 14.5 C41 25 40.5 37 38 48.5" />
        <path d="M39 14.5 C46 16.5 48.5 22 45.5 28" />
      </g>
    </svg>
  );
}
