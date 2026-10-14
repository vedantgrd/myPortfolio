import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'VEDANT / UNFINISHED — Personal Archive & Technical Laboratory',
  description:
    'The personal digital publication, engineering notebook, and interactive project archive of Vedant Garud. Exploring multi-agent AI, systems engineering, hardware integration, and cryptography.',
  keywords: [
    'Vedant Garud',
    'Vidyut',
    'Bullwhip AI',
    'Agridrone',
    'CipherLab',
    'Software Engineer',
    'Pillai College of Engineering',
    'VFS Global',
    'Next.js 16',
  ],
  authors: [{ name: 'Vedant Garud' }],
  creator: 'Vedant Garud',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0f12',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#0d0f12] text-[#f2eee6] min-h-screen flex flex-col selection:bg-[#e1523d]/30 selection:text-white`}
      >
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
