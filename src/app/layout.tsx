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
  description: "Portfolio showcasing product design work and case studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
