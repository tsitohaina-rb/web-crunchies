import { Metadata } from "next";
import React from "react";
import About from "@/components/main/about/About";

export const metadata: Metadata = {
  title: "About Us - Crunchies",
  description: "Learn more about Crunchies — who we are, what we do, and the mission that drives us. Meet the team behind the brand.",
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
