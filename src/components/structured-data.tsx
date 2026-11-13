import { siteUrl } from "@/lib/site-url";
import { homePaths, type Locale } from "@/i18n/config";
import { contacts } from "@/lib/contact";
import { downloadUrl } from "@/lib/app-url";
import { galleryIds, phoneImage } from "@/lib/gallery";
import { shareImages } from "@/lib/seo";

/** What the site is, for search engines: the organization and the application (JSON-LD on the home page). */
export function StructuredData({ locale, name, description }: { locale: Locale; name: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${siteUrl}/#organization`, name, url: `${siteUrl}/`, logo: `${siteUrl}/icon-512.png`,
        sameAs: [contacts.facebook.href],
        contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "info@hesaabketab.com", telephone: contacts.whatsapp.display },
      },
      {
        "@type": "SoftwareApplication",
        name,
        description,
        url: `${siteUrl}${homePaths[locale]}`,
        inLanguage: locale === "fa" ? "fa-AF" : "en",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web, Android",
        downloadUrl,
        image: `${siteUrl}${shareImages[locale]}`,
        // The app screenshots on the page, so search engines can show them with the app.
        screenshot: galleryIds.map((id) => `${siteUrl}${phoneImage(id).src}`),
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  // `<` is escaped so that no text inside the data can close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}
