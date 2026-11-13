import { setRequestLocale } from "next-intl/server";
import { ContactPage } from "@/components/contact-page";
import { contactMetadata } from "@/lib/contact";

export const metadata = contactMetadata("fa");

export default function Page() {
  setRequestLocale("fa");
  return <ContactPage locale="fa" />;
}
