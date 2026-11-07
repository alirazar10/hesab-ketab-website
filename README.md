# Hesab Ketab website (حساب کتاب)

The public landing page for Hesab Ketab, the app that splits a building's electricity, water, sewage
and trash bills between its households. The app itself lives in a separate repository (`hesab-ketab`).

A static Next.js site (App Router, Tailwind 4, next-intl) in Dari (right to left, at `/`) and English
(at `/en/`), with the Estedad font and the app's brand tokens. `npm run build` writes plain HTML to `out/`, which any static host
can serve.

## Commands

- `npm install`
- `npm run dev`: dev server (http://localhost:3000; use `npm run dev -- -p 3001` while the app runs on 3000)
- `npm run build`: static export to `out/`
- `npm run typecheck`, `npm run lint`

## Configuration

`NEXT_PUBLIC_APP_URL` (see `.env.example`) is the address of the web app. The sign-in and sign-up
buttons link to `<NEXT_PUBLIC_APP_URL>/login`. It is inlined at build time, so rebuild after changing it.

## Languages

Each language has its own root layout and prerendered page (`src/app/(fa)` for `/`, `src/app/en` for
`/en/`), because a static export has no middleware. The list, text direction and paths are in
`src/i18n/config.ts`; the header links to the other language. Use logical classes (`ps-`, `pe-`,
`text-start`, `text-end`) so both directions work, and the `en:` variant for English-only spacing.

## Content and wording

All text is in `messages/fa.json` and `messages/en.json` (English must have every key Dari has; the
type check fails otherwise). Note that the app itself is only in Dari. It follows the app's terminology (`docs/terminology.md` in the app
repository): natural Afghan Dari, Latin digits, solar-hijri dates such as «20 عقرب 1405». The worked
example's numbers are in `src/lib/example.ts`: one bill split by consumption, with shares that add
up exactly.

## Layout

- `src/app/`: the two language routes, font, global styles and brand tokens, icon
- `src/components/document.tsx` (the <html> and metadata of a language), `landing.tsx` (the page)
- `src/components/`: page sections (`hero`, `example`, `steps`, `rules`, `residents`), the meter
  `register` and the `logo-mark` (both copied from the app)
