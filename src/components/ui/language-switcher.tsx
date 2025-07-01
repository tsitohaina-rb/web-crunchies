"use client";

import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Locale } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import clsx from "clsx";

interface Language {
  code: string;
  name: string;
  flag: string;
  dir?: "ltr" | "rtl";
}

interface LanguageSwitcherProps {
  className?: string;
  languages?: Language[];
}

const stripLocaleFromPath = (
  path: string,
  locales: string[],
  currentLocale: string
) => {
  const regex = new RegExp(`^/(${locales.join("|")})(/|$)`);
  return currentLocale === "en" ? path : path.replace(regex, "/");
};

const LanguageSwitcher = ({
  className,
  languages = [],
}: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const redirectTo = useMemo(
    () =>
      stripLocaleFromPath(
        pathname,
        languages.map((l) => l.code),
        locale
      ),
    [pathname, languages, locale]
  );

  const selectedLang = languages.find((l) => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={clsx(
            "flex items-center space-x-2 cursor-pointer",
            className
          )}
        >
          {selectedLang?.flag &&
            (selectedLang.flag.startsWith("http") ? (
              <img
                src={selectedLang.flag}
                alt={selectedLang.name}
                className="h-6 w-6 object-cover rounded-full border border-primary/20 bg-white p-1"
              />
            ) : (
              <span className="text-xl">{selectedLang.flag}</span>
            ))}
          <b>{selectedLang?.code.toUpperCase()}</b>
          <ChevronDown size={16} className="mt-1" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!rounded-[12px]">
        {languages.map((language) => (
          <DropdownMenuItem
            asChild
            key={language.code}
            className={clsx(
              "cursor-pointer",
              locale === language.code
                ? "hover:!text-primary bg-primary/5"
                : "hover:!bg-primary/5 hover:!text-primary"
            )}
          >
            <Link href={redirectTo} locale={language.code}>
              {language.flag &&
                (language.flag.startsWith("http") ? (
                  <img
                    src={language.flag}
                    alt={language.name}
                    className="inline-block h-6 w-6 object-cover rounded-full border bg-white border-primary/20 p-1 mr-2 align-middle"
                  />
                ) : (
                  <span className="mr-2 text-lg align-middle">
                    {language.flag}
                  </span>
                ))}
              {language.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
