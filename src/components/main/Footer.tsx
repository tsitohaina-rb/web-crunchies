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
  CreditCard,
  DollarSign,
  Shield,
  Send,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary/10">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-bold mb-6 block">
              <Image
                src="/images/logo.png"
                alt="crunchies_logo"
                height={80}
                width={120}
              />
            </Link>
            <p className=" mb-6">
              Crunchies is a premium pet store dedicated to providing
              high-quality products and exceptional service for pets and their
              owners.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <p className="">
                  1234 Pet Street, Pawsville, <br />
                  CA 98765, United States
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <p className="">+1 (234) 567-8901</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <p className="">info@crunchies.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-primary" />
                <p className="">Monday-Saturday: 8.00-18.00</p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Information</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className=" hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className=" hover:text-primary transition-colors"
                >
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className=" hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className=" hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className=" hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className=" hover:text-primary transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-semibold mb-6">My Account</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/account"
                  className=" hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/order-history"
                  className=" hover:text-primary transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className=" hover:text-primary transition-colors"
                >
                  Wish List
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className=" hover:text-primary transition-colors"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/specials"
                  className=" hover:text-primary transition-colors"
                >
                  Specials
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-cards"
                  className=" hover:text-primary transition-colors"
                >
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <div className="flex gap-3 mb-8">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>

            <h4 className="text-lg font-semibold mb-4">Payment Methods</h4>
            <div className="flex gap-2 flex-wrap">
              <div className="h-10 w-16 rounded bg-primary/5 flex items-center justify-center">
                <CreditCard size={18} />
              </div>
              <div className="h-10 w-16 rounded bg-primary/5 flex items-center justify-center">
                <DollarSign size={18} />
              </div>
              <div className="h-10 w-16 rounded bg-primary/5 flex items-center justify-center">
                <Shield size={18} />
              </div>
              <div className="h-10 w-16 rounded bg-primary/5 flex items-center justify-center">
                <Send size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary/10 py-4">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
          <p className=" text-center md:text-left">
            &copy; {new Date().getFullYear()} Crunchies. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/sitemap"
              className=" hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
            <Link
              href="/help"
              className=" hover:text-primary transition-colors"
            >
              Help
            </Link>
            <Link href="/faq" className=" hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
