# Hesab Ketab website (حساب کتاب)

The public landing page for Hesab Ketab, the app that splits a building's electricity, water, sewage
and trash bills between its households. The app itself lives in a separate repository (`hesab-ketab`).

A static Next.js site (App Router, Tailwind 4, next-intl), in Dari, right to left, with the Estedad
font and the app's brand tokens. `npm run build` writes plain HTML to `out/`, which any static host
can serve.

## Commands

- `npm install`
- `npm run dev`: dev server (http://localhost:3000; use `npm run dev -- -p 3001` while the app runs on 3000)
- `npm run build`: static export to `out/`
- `npm run typecheck`, `npm run lint`

## Configuration

`NEXT_PUBLIC_APP_URL` (see `.env.example`) is the address of the web app. The sign-in and sign-up
buttons link to `<NEXT_PUBLIC_APP_URL>/login`. It is inlined at build time, so rebuild after changing it.

## Content and wording

All text is in `messages/fa.json`. It follows the app's terminology (`docs/terminology.md` in the app
repository): natural Afghan Dari, Latin digits, solar-hijri dates such as «20 عقرب 1405». The worked
example's numbers are in `src/lib/example.ts`: one bill split by consumption, with shares that add
up exactly.

## Layout

- `src/app/`: layout (font, metadata), page, global styles and brand tokens, icon
- `src/components/`: page sections (`hero`, `example`, `steps`, `rules`, `residents`), the meter
  `register` and the `logo-mark` (both copied from the app)
