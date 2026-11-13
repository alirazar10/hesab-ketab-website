import { setRequestLocale } from "next-intl/server";
import { ContactPage } from "@/components/contact-page";
import { contactMetadata } from "@/lib/contact";

export const metadata = contactMetadata("en");

export default function Page() {
  setRequestLocale("en");
  return <ContactPage locale="en" />;
}
