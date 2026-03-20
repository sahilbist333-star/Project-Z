import type { Metadata } from 'next'
import PricingClient from './PricingClient'

export const metadata: Metadata = {
  title: 'Pricing | Zointly',
  description: 'Flexible pricing for product teams. High-performance feedback analysis plans to scale your product discovery and user research insights.',
}

export default function PricingPage() {
  return <PricingClient />
}
