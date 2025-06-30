import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { ToastProvider } from "@/components/providers/ToastProvider";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import { generateI18nMeta } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  params: Promise<{ locale: Locale }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "fr-FR": "/fr",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  const headersList = headers();
  const pathname = (await headersList).get("x-pathname") || "";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  const { alternateLinks, canonical, alternateLocales, currentLocale } =
    generateI18nMeta({
      currentLocale: locale,
      currentPath: pathname,
      baseUrl,
    });
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        {alternateLinks.map((link) => (
          <link
            key={link.hrefLang}
            rel={link.rel}
            hrefLang={link.hrefLang}
            href={link.href}
          />
        ))}
        <link rel="canonical" href={canonical} />
        <meta property="og:locale" content={currentLocale} />
        {alternateLocales.map((meta, index) => (
          <meta key={index} property={meta.property} content={meta.content} />
        ))}
        <meta name="application-name" content="Crunchies" />
        <meta name="og:site_name" content="Crunchies" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ToastProvider defaultPosition="top-right">
            <div className="relative min-h-screen flex flex-col">
              <Header />
              {children}
              <Footer />
            </div>
          </ToastProvider>
          <NotificationProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
