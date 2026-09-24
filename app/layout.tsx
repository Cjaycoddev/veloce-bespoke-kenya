import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Veloce Bespoke Kenya  Curated Luxury & Performance Vehicles',
  description:
    "Kenya's trusted destination for verified luxury and performance vehicles. Financing, import duty transparency, and after-sales care.",
  metadataBase: new URL('https://velocebespoke.co.ke'),
  openGraph: {
    title: 'Veloce Bespoke Kenya',
    description: 'Curated luxury and performance vehicles, delivered with trust.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}