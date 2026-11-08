import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";
import { legalMetadata } from "@/lib/legal";

export const metadata = legalMetadata("fa", "terms");

export default function Page() {
  setRequestLocale("fa");
  return <LegalPage locale="fa" document="terms" />;
}
