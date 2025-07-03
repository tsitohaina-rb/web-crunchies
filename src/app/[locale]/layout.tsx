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
    <html lang={locale} dir="ltr">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7FPE227W1G"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7FPE227W1G');
            `,
          }}
        />
        {/* Alternates */}
        {alternateLinks.map((link) => (
          <link
            key={link.hrefLang}
            rel={link.rel}
            hrefLang={link.hrefLang}
            href={link.href}
          />
        ))}
        <link rel="canonical" href={canonical} />
        {/* Hardcoded alternates as per config */}
        <link rel="alternate" hrefLang="en-US" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="fr-FR" href={`${baseUrl}/fr`} />
        {/* Robots meta */}
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        {/* Google site verification */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
          />
        )}
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
