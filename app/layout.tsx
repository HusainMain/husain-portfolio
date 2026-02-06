import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { portfolioData } from "./data/portfolio";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005";
const name = portfolioData.personal.name;
const role = portfolioData.personal.title;

export const metadata: Metadata = {
  title: `${name} | ${role}`,
  description: "Portfolio showcasing education, skills, and featured projects.",
  applicationName: `${name} Portfolio`,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${name} | ${role}`,
    description: "Portfolio showcasing education, skills, and featured projects.",
    url: siteUrl,
    siteName: `${name} Portfolio`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} | ${role}`,
    description: "Portfolio showcasing education, skills, and featured projects.",
    images: ["/opengraph-image"],
    creator: "@yourhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}}()",
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
