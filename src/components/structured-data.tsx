import { siteUrl } from "@/lib/site-url";
import { homePaths, type Locale } from "@/i18n/config";
import { downloadUrl } from "@/lib/app-url";

/** What the site is, for search engines: the organization and the application (JSON-LD on the home page). */
export function StructuredData({ locale, name, description }: { locale: Locale; name: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${siteUrl}/#organization`, name, url: `${siteUrl}/`, logo: `${siteUrl}/icon-512.png` },
      {
        "@type": "SoftwareApplication",
        name,
        description,
        url: `${siteUrl}${homePaths[locale]}`,
        inLanguage: locale === "fa" ? "fa-AF" : "en",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web, Android",
        downloadUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
  // `<` is escaped so that no text inside the data can close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}
