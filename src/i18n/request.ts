import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, messages } from "./config";

// The locale comes from `setRequestLocale` in each language's layout and page.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : defaultLocale;
  return { locale, messages: messages[locale] };
});
