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

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-primary/5">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
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
              Crunchies is a premium pet store dedicated to providing
              high-quality products and exceptional service for pets and their
              owners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:left-0 after:-bottom-2">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:left-0 after:-bottom-2">
              Get in Touch
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <MapPin
                    size={18}
                    className="text-primary mt-1 group-hover:scale-110 transition-transform"
                  />
                  <p className="text-gray-600">
                    1234 Pet Street, Pawsville, <br />
                    CA 98765, United States
                  </p>
                </div>
                <div className="flex items-center gap-3 group">
                  <Phone
                    size={18}
                    className="text-primary group-hover:scale-110 transition-transform"
                  />
                  <p className="text-gray-600">+1 (234) 567-8901</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <Mail
                    size={18}
                    className="text-primary group-hover:scale-110 transition-transform"
                  />
                  <p className="text-gray-600">info@crunchies.com</p>
                </div>
                <div className="flex items-center gap-3 group">
                  <Clock
                    size={18}
                    className="text-primary group-hover:scale-110 transition-transform"
                  />
                  <p className="text-gray-600">Hide "Mon-Sat: 8.00-18.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary/10 py-6 bg-white/50 backdrop-blur-sm">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} Crunchies. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/crunchies0601"
              className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
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
