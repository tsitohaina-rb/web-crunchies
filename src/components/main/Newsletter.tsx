import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-primary-foreground">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={24} className="text-primary" />
              <h3 className="text-2xl md:text-3xl font-semibold">
                Sign Up for Our Newsletter
              </h3>
            </div>
            <p className=" max-w-lg">
              Subscribe to our newsletter and receive updates on new products,
              special offers, and care tips for your pets.
            </p>
          </div>

          <div className="w-full md:w-1/2 max-w-md">
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white border-primary/10 focus-visible:ring-primary"
                required
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-white flex-shrink-0"
              >
                <Send size={18} className="mr-2" /> Subscribe
              </Button>
            </form>
            <p className="text-sm  mt-2">
              By subscribing, you agree to our privacy policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
