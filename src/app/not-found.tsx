import React from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex-grow flex items-center justify-center py-20">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-8xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className=" mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/95 text-white">
            <Home size={18} className="mr-2" />
            Return to Homepage
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
