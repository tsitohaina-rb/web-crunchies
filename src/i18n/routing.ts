import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "th", "ms", "ko", "zh", "ph", "id"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: {
    name: "lang",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
