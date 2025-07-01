"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, Locale } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  languages?: {
    code: string;
    name: string;
    flag: string;
    dir?: "ltr" | "rtl";
  }[];
}

const LanguageSwitcher = ({
  className,
  languages = [],
}: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Show flag for selected language only */}
        {(() => {
          const selectedLang = languages.find((l) => l.code === locale);
          if (selectedLang?.flag) {
            return selectedLang.flag.startsWith("http") ? (
              <div className="flex items-center *:hover:bg-primary/5 cursor-pointer">
                <img
                  src={selectedLang.flag}
                  alt={selectedLang.name}
                  className="h-6 w-6 object-cover rounded-full border border-primary/20 bg-white p-1 mr-2 align-middle"
                />
                <b>{selectedLang.code.toUpperCase()}</b>
                <span className="mt-1">
                  <ChevronDown size={16} />
                </span>
              </div>
            ) : (
              <span className="text-xl">{selectedLang.flag}</span>
            );
          }
          // No fallback icon
          return null;
        })()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!rounded-[12px]">
        {languages.map((language) => (
          <DropdownMenuItem
            asChild
            key={language.code}
            className={
              locale === language.code
                ? "hover:!text-primary bg-primary/5 cursor-pointer"
                : "hover:!bg-primary/5 hover:!text-primary cursor-pointer"
            }
          >
            <Link href="/" locale={language.code}>
              {/* Show flag image or emoji before language name */}
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
