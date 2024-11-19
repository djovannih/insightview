import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const supportedLocales = ["en", "it"];
const fallbackLocale = "en";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get("locale")?.value;

  const preferredLocale = (await headers())
    .get("accept-language")
    ?.split(",")
    .at(0)
    ?.split("-")
    .at(0);

  const locale =
    cookieLocale && supportedLocales.includes(cookieLocale)
      ? cookieLocale
      : preferredLocale && supportedLocales.includes(preferredLocale)
        ? preferredLocale
        : fallbackLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
