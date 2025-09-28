import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premier Roofing Solutions Boise | Roof Installation & Repair | (208) 555-0123",
  description: "Boise's trusted roofing experts. Residential & commercial roof installation, repair, and maintenance. Serving Boise, Meridian, Nampa, Eagle, Caldwell. Free estimates! Call (208) 555-0123",
  keywords: "roof installation Boise, roof repair Boise, roof replacement Idaho, commercial roofing Boise, storm damage repair, roofing contractor Boise",
  authors: [{ name: "Premier Roofing Solutions" }],
  creator: "Premier Roofing Solutions",
  publisher: "Premier Roofing Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://premierroofingboise.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Premier Roofing Solutions Boise | Professional Roof Installation",
    description: "Boise's trusted roofing experts. Residential & commercial roof installation, repair, and maintenance. Free estimates!",
    url: 'https://premierroofingboise.com',
    siteName: 'Premier Roofing Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premier Roofing Solutions Boise | Professional Roof Installation",
    description: "Boise's trusted roofing experts. Residential & commercial roof installation, repair, and maintenance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Premier Roofing Solutions",
              "description": "Professional roof installation, repair, and maintenance services in Boise, Idaho",
              "url": "https://premierroofingboise.com",
              "telephone": "+1-208-555-0123",
              "email": "info@premierroofingboise.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Boise",
                "addressRegion": "ID",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.6150,
                "longitude": -116.2023
              },
              "areaServed": [
                "Boise, ID",
                "Meridian, ID", 
                "Nampa, ID",
                "Eagle, ID",
                "Caldwell, ID",
                "Garden City, ID",
                "Kuna, ID",
                "Star, ID",
                "Middleton, ID"
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 43.6150,
                  "longitude": -116.2023
                },
                "geoRadius": "25000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Roofing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Residential Roof Installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial Roofing Services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Roof Repair & Maintenance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Storm Damage Restoration"
                    }
                  }
                ]
              },
              "priceRange": "$$",
              "openingHours": "Mo-Fr 08:00-18:00",
              "paymentAccepted": ["Cash", "Credit Card", "Check"],
              "currenciesAccepted": "USD"
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
