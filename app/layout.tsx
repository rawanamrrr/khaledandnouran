import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { RomanticAudio } from "@/components/romantic-audio"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/language-toggle"
import { Footer } from "@/components/footer"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://khaledandnouran.netlify.app/"),
  title: "Khaled & Nouran's Wedding",
  description: "Join us to celebrate the wedding of Khaled and Nouran",
  generator: "Digitiva",
  openGraph: {
    url: "https://khaledandnouran.netlify.app/",
    type: "website",
    title: "Khaled & Nouran's Wedding",
    description: "Join us to celebrate the wedding of Khaled and Nouran",
    images: [
      {
        url: "https://khaledandnouran.netlify.app/invitation-design-arabic.jpg",
        width: 1200,
        height: 630,
        alt: "Khaled & Nouran's Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khaled & Nouran's Wedding",
    description: "Join us to celebrate the wedding of Khaled and Nouran",
    images: ["https://khaledandnouran.netlify.app/invitation-design-arabic.jpg"],
  },
  icons: {
    icon: "/invitation-design-arabic.jpg",
    apple: "/invitation-design-arabic.jpg",
  },
  other: {
    'theme-color': '#ffffff',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': "Khaled & Nouran's Wedding",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Open Graph tags for Facebook & WhatsApp previews */}
                <meta property="og:url" content="ttps://khaledandnouran.netlify.app/" />
        <meta property="og:type" content="website" />
                <meta property="og:title" content="Khaled & Nouran's Wedding" />
                <meta property="og:description" content="Join us to celebrate the Wedding of Khaled and Nouran" />
                <meta
          property="og:image"
          content="ttps://khaledandnouran.netlify.app/invitation-design-arabic.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Khaled & Nouran's Wedding Invitation" />
        {/* Removed invalid fb:app_id since it's not needed for basic sharing */}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Khaled & Nouran's Wedding" />
                <meta name="twitter:description" content="Join us to celebrate the Wedding of Khaled and Nouran" />
                <meta name="twitter:image" content="ttps://khaledandnouran.netlify.app/invitation-design-arabic.jpg" />

        {/* Preload critical images for immediate loading */}
        <link
          rel="preload"
          href="/invitation-design-arabic.jpg"
          as="image"
          type="image/jpg"
        />
        {/* Preload GIF with high priority to eliminate lag on Netlify */}
        <link
          rel="preload"
          href="/invitation-design.gif"
          as="image"
          type="image/gif"
        />
        {/* Preconnect to domains for faster loading */}
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        {/* Preload Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          as="style"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <Suspense fallback={null}>
            <LanguageToggle />
            {children}
            <RomanticAudio />
            <Footer />
          </Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}