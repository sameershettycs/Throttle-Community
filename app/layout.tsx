import type { Metadata } from "next";
import { Bebas_Neue, Orbitron } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LenisProvider from "./components/LenisProvider";
import { ScrollProgress } from "./components/ScrollTransitions";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Throttle Community | The Ultimate Biker Q&A Platform",
  description:
    "Join the #1 motorcycle community. Ask questions, share expertise, and connect with riders worldwide. Get expert help on maintenance, gear, routes, and more.",
  keywords: [
    "motorcycle",
    "biker",
    "community",
    "Q&A",
    "motorbike",
    "maintenance",
    "gear",
    "routes",
  ],
  authors: [{ name: "Throttle Community" }],
  openGraph: {
    title: "Throttle Community | The Ultimate Biker Q&A Platform",
    description:
      "Join the #1 motorcycle community. Ask questions, share expertise, and connect with riders worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${bebasNeue.variable} antialiased bg-charcoal text-foreground`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <ScrollProgress />
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
