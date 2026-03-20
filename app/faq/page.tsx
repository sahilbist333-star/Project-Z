import type { Metadata } from 'next'
import FAQClient from './FAQClient'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Zointly',
  description: 'Answers on AI feedback scoring, automated product discovery, and secure user research storage for modern product teams.',
}

export default function FAQPage() {
  return <FAQClient />
}
