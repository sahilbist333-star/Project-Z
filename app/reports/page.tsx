import { redirect } from 'next/navigation'

// /reports without a slug redirects to homepage
// Public reports are only accessible via /reports/[slug] direct links
export default function ReportsIndexPage() {
    redirect('/')
}
