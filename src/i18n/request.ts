import { getRequestConfig } from "next-intl/server";
import messages from "../../messages/fa.json";

// One locale, no locale in the URL (the same setup as the app).
export const locale = "fa";

export default getRequestConfig(async () => ({ locale, messages }));
