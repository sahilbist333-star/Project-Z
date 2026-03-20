import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch for enterprise sales, technical support, or partnership inquiries regarding Zointly\'s AI Copilot for PMs.',
}

export default function ContactPage() {
  return <ContactClient />
}
