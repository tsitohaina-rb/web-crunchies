import { locales } from "@/i18n/routing";

type MetadataProps = {
  currentLocale: string;
  currentPath: string;
  baseUrl: string;
};

export function generateI18nMeta({
  currentLocale,
  currentPath,
  baseUrl,
}: MetadataProps) {
  const cleanPath = currentPath.startsWith("/")
    ? currentPath
    : `/${currentPath}`;
  const alternateLinks = locales.map((locale) => ({
    rel: "alternate",
    hrefLang: locale,
    href:
      locale === "en"
        ? `${baseUrl}${cleanPath}`
        : `${baseUrl}/${locale}${cleanPath}`,
  }));

  const canonical =
    currentLocale === "en"
      ? `${baseUrl}${cleanPath}`
      : `${baseUrl}/${currentLocale}${cleanPath}`;
  const alternateLocales = locales
    .filter((locale) => locale !== currentLocale)
    .map((locale) => ({
      property: "og:locale:alternate",
      content: locale,
    }));

  return {
    alternateLinks,
    canonical,
    alternateLocales,
    currentLocale,
  };
}
