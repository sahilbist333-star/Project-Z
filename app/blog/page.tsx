import type { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'The Notebook Blog',
  description: 'Evidence-driven product management insights, user interview best practices, and AI-powered roadmap prioritization strategies from the Zointly team.',
}

export default function BlogPage() {
  return <BlogClient />
}
