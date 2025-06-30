import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations('components.Footer');
  return (
    <footer className="bg-gradient-to-b from-white to-primary/5">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="crunchies_logo"
                height={80}
                width={120}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
             {t('text1')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:left-0 after:-bottom-2">
              {t('text2')}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  {t('text3')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  {t('text4')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  {t('text5')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:left-0 after:-bottom-2">
              {t('text6')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin
                  size={18}
                  className="text-primary mt-1 group-hover:scale-110 transition-transform"
                />
                <p className="text-gray-600">
                  {t('text7')} <br />
                  {t('text8')}
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone
                  size={18}
                  className="text-primary group-hover:scale-110 transition-transform"
                />
                <p className="text-gray-600">+1 (234) 567-8901</p>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail
                  size={18}
                  className="text-primary group-hover:scale-110 transition-transform"
                />
                <p className="text-gray-600">info@crunchies.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary/10 py-6 bg-white/50 backdrop-blur-sm">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} Crunchies. {t('text9')}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/crunchies0601"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
