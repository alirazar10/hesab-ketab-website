import localFont from "next/font/local";

// Estedad: an open-licensed Persian typeface, the same one the app uses. It has Latin letters too.
export const estedad = localFont({
  variable: "--font-estedad",
  display: "swap",
  src: [
    { path: "./fonts/Estedad-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Estedad-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Estedad-Black.ttf", weight: "900", style: "normal" },
  ],
});
