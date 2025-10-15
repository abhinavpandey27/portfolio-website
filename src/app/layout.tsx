import type { Metadata } from "next";
import { Instrument_Sans } from 'next/font/google';
import "../styles/design-tokens.css";
import "../styles/global.css";
import "../styles/typography.css";

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Abhinav Pandey - Product Designer",
  description: "7+ years of experience in product and service design. Portfolio showcasing design work across Real Money Gaming, Fantasy Sports, Web3, and NFT products.",
  keywords: ["Product Designer", "UX Designer", "UI Designer", "Portfolio", "Mumbai", "India", "Web3", "Fantasy Sports"],
  authors: [{ name: "Abhinav Pandey" }],
  creator: "Abhinav Pandey",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-website.pages.dev",
    title: "Abhinav Pandey - Product Designer",
    description: "7+ years of experience in product and service design. Portfolio showcasing design work across Real Money Gaming, Fantasy Sports, Web3, and NFT products.",
    siteName: "Abhinav Pandey Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhinav Pandey - Product Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Pandey - Product Designer",
    description: "7+ years of experience in product and service design. Portfolio showcasing design work.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
