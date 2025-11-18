// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import '../styles/cookieconsent-custom.css'
import CookieConsent from './components/CookieConsent'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Torno in Forma | Trasformazione Fitness Online',
  description: 'Allenamento personalizzato, piano alimentare e coaching online. Torna in forma ovunque ti trovi con il metodo Torno in Forma.',
  keywords: 'fitness online, personal trainer, dieta personalizzata, allenamento casa, coaching nutrizionale',
  openGraph: {
    title: 'Torno in Forma | Trasformazione Fitness Online',
    description: 'Il percorso completo per la tua trasformazione fisica',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Torno in Forma',
    description: 'Trasformazione fitness online personalizzata',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J1UR8QP9VL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J1UR8QP9VL');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}