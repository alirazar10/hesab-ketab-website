/** Where the Hesab Ketab web app runs. Set NEXT_PUBLIC_APP_URL at build time (it is inlined). */
export const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Sign-in and sign-up share one page in the app. */
export const loginUrl = `${appUrl}/login`;
