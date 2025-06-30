import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/routing";

// middleware for langue

export default createMiddleware({
  locales: locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: {
    name: "lang",
  },
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
