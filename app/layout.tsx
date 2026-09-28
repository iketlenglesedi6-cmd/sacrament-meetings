import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sacrament-meetings.vercel.app"),
  title: {
    default: "Sacrament Meetings Planner",
    template: "%s | Sacrament Meetings Planner",
  },
  description: "Sacrament meeting programs, agendas, hymns, and ward leadership planning information.",
  openGraph: {
    title: "Sacrament Meetings Planner",
    description: "Keep sacrament meeting programs organized for church leadership and ward planning.",
    url: "https://sacrament-meetings.vercel.app",
    siteName: "Sacrament Meetings Planner",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sacrament Meeting Planner overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacrament Meetings Planner",
    description: "Ward sacrament meeting schedule and leadership planning tools.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${lora.variable} flex min-h-screen flex-col`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
