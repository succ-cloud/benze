import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteProvider } from "@/components/quote/QuoteProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Spainzy of Douala | Mercedes-Benz in Cameroon",
    template: "%s · Spainzy of Douala",
  },
  description:
    "Mercedes-Benz SUVs and the G-Class for sale in Cameroon. Priced in FCFA from the Douala showroom.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#171a20]">
        <QuoteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
