import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'Zointly | Decision Intelligence for Product Teams',
  description: 'Turn customer feedback into measurable demand signals. Zointly processes raw feedback into verified evidence reports.',
  openGraph: {
    title: 'Zointly',
    description: 'AI-powered product opportunity analysis',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}
