import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { BottomNav } from '@/components/bottom-nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'HELP ME · Support, made simple',
  description:
    'HELP ME is a mobile support app that helps you find jobs, housing, money help, healthcare, education, and trusted local services — all in one place.',
  applicationName: 'HELP ME',
  generator: 'v0.app',
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
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#14181f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col bg-background shadow-sm sm:my-0 sm:border-x sm:border-border">
          <div className="flex flex-1 flex-col">{children}</div>
          <BottomNav />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
