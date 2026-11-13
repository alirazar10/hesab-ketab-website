/** The app screenshots shown on the home page (in `public/images/app/`, made from the real app with a sample building). */
export const galleryIds = ["home", "steps", "readings", "explained", "payments", "statement"] as const;
export type GalleryId = (typeof galleryIds)[number];

/** A framed phone, 720 x 1432. */
export const phoneImage = (id: GalleryId) => ({ src: `/images/app/phone-${id}.webp`, width: 720, height: 1432 });

/** The browser view, 1800 x 1080. */
export const desktopImage = { src: "/images/app/desktop-summary.webp", width: 1800, height: 1080 };
