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
  title: "Premier Fencing Solutions Boise | Fence Installation & Repair | (208) 555-0123",
  description: "Boise's trusted fencing experts. Residential & commercial fence installation, repair, and maintenance. Serving Boise, Meridian, Nampa, Eagle, Caldwell. Free estimates! Call (208) 555-0123",
  keywords: "fence installation Boise, fence repair Boise, privacy fence Idaho, commercial fencing Boise, pool fence installation, fence contractor Boise",
  authors: [{ name: "Premier Fencing Solutions" }],
  creator: "Premier Fencing Solutions",
  publisher: "Premier Fencing Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://premierfencingboise.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Premier Fencing Solutions Boise | Professional Fence Installation",
    description: "Boise's trusted fencing experts. Residential & commercial fence installation, repair, and maintenance. Free estimates!",
    url: 'https://premierfencingboise.com',
    siteName: 'Premier Fencing Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premier Fencing Solutions Boise | Professional Fence Installation",
    description: "Boise's trusted fencing experts. Residential & commercial fence installation, repair, and maintenance.",
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
              "name": "Premier Fencing Solutions",
              "description": "Professional fence installation, repair, and maintenance services in Boise, Idaho",
              "url": "https://premierfencingboise.com",
              "telephone": "+1-208-555-0123",
              "email": "info@premierfencingboise.com",
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
                "name": "Fencing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Residential Fence Installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial Fence Services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Pool Fence Installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fence Repair & Maintenance"
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
