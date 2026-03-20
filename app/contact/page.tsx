import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us | Zointly',
  description: 'Get in touch for enterprise sales, technical support, or partnership inquiries regarding our AI Copilot for PMs.',
}

export default function ContactPage() {
  return <ContactClient />
}
