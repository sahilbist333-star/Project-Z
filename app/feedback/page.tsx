import type { Metadata } from 'next'
import FeedbackClient from './FeedbackClient'

export const metadata: Metadata = {
  title: 'Submit Feedback',
  description: 'Help us improve Zointly. Report bugs, suggest features, or share your feedback with the product team.',
}

export default function FeedbackPage() {
  return <FeedbackClient />
}
