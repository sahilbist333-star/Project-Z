import type { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'The Notebook | Zointly Blog',
  description: 'Insights on evidence-driven product management, user interview best practices, and AI-powered roadmap prioritization.',
}

export default function BlogPage() {
  return <BlogClient />
}
