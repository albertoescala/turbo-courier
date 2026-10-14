import type { Metadata } from 'next'
import { Barlow_Condensed, Manrope } from 'next/font/google'
import { SITE, SITE_URL } from './data'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: '900', style: 'italic', variable: '--font-barlow' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: '/',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
  formatDetection: { telephone: false },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE" className={`${manrope.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  )
}
