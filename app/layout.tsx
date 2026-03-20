import type { Metadata, Viewport } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Zointly | The AI Copilot for Product Managers',
  description: 'Upload user interviews and feedback. Zointly\'s AI tells you exactly what features your users need next, backed by verbatim evidence.',
  openGraph: {
    title: 'Zointly | The AI Copilot for Product Managers',
    description: 'AI-powered product roadmap acceleration for PMs',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Zointly',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#080808',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-K99DPK8CEH" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-K99DPK8CEH');
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}
