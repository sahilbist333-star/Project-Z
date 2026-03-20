import type { Metadata } from 'next'
import FAQClient from './FAQClient'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers on AI feedback scoring, automated product discovery, and secure user research storage for modern product teams using Zointly.',
}

export default function FAQPage() {
  return <FAQClient />
}
