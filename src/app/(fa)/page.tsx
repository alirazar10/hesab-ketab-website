import { setRequestLocale } from "next-intl/server";
import { Landing } from "@/components/landing";

export default function Page() {
  setRequestLocale("fa");
  return <Landing />;
}
