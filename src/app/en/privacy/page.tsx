import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";
import { legalMetadata } from "@/lib/legal";

export const metadata = legalMetadata("en", "privacy");

export default function Page() {
  setRequestLocale("en");
  return <LegalPage locale="en" document="privacy" />;
}
