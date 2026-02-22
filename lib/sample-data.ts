// 60+ realistic SaaS product feedback entries for sample analysis
export const SAMPLE_FEEDBACK: string[] = [
    "The search doesn't find related tickets even when they describe the same issue with different words.",
    "Bulk export would save my team hours every week. It's a basic feature we're missing desperately.",
    "Our PM manually downloads 50 reports every Monday. It's embarrassing we don't have bulk export.",
    "We can't export reports — this blocks our entire weekly review process.",
    "The lack of granular reporting is the only thing preventing us from upgrading to enterprise.",
    "I need to search by semantic meaning, not just exact keywords. Current search is too rigid.",
    "When I search for 'billing issues', I want to see 'payment failures' and 'invoice errors' too.",
    "Integration with Slack would be a game changer for our team's feedback workflow.",
    "We get customer feedback in Slack every day but have no easy way to pipe it into your system.",
    "Can you add a Zapier integration? We'd immediately connect our Typeform surveys.",
    "The CSV import is broken - it fails on any file over 1MB without a useful error message.",
    "I uploaded a 2000-row CSV and it just showed a spinner forever. No error, no success.",
    "Mobile app is completely unusable on tablet. Tables overflow and buttons are cut off.",
    "The iOS app crashes whenever I try to view a report with more than 50 items.",
    "Dashboard takes 8 seconds to load on my laptop. This is way too slow to use daily.",
    "Performance is terrible when I have more than 100 feedback entries. Needs optimization.",
    "Sorting by demand score doesn't persist when I navigate away and come back.",
    "Filters reset every time I refresh the page. I lose my work constantly.",
    "We need role-based access so junior PMs can view but not run analyses.",
    "Two of my team members accidentally deleted analyses I needed. Please add permissions.",
    "Can we get API access? We want to trigger analyses from our internal tools automatically.",
    "Your API docs mention endpoints that don't exist. Very confusing for integration.",
    "The PDF export doesn't include the customer quotes. That's the most valuable part.",
    "Exported PDF looks completely different from the in-app view. Charts don't render.",
    "We need a way to compare two analyses side by side to see what changed.",
    "Historical view of demand scores would help us track if we're solving the right problems.",
    "The onboarding took me 20 minutes and I still wasn't sure how to upload my first dataset.",
    "First run experience is confusing. I didn't know what format my CSV needed to be in.",
    "Please add column mapping for CSV uploads. Our column names don't match your template.",
    "It would be amazing to connect directly to Zendesk instead of manual exports.",
    "Intercom integration would save us 3 hours per week of data preparation.",
    "We use Hubspot for customer feedback. Direct sync would be a huge win.",
    "Webhook support would let us build our own integrations. Much more flexible.",
    "The confidence score methodology is a black box. We need more transparency.",
    "Can you explain how the demand score is calculated? Our stakeholders keep asking.",
    "I need to show my board how prioritization decisions are made. Need audit trail.",
    "Public reports are great but they expire too quickly. Need permanent links.",
    "Shareable report links would help us align with our design team and engineering.",
    "We often work with agencies who need to see the analysis. Guest access would help.",
    "Email alerts when a new high-priority opportunity is detected would bring me back weekly.",
    "I forget to check the app. Push notifications or email digests would fix that.",
    "Scheduled weekly summary emails would greatly improve how I use this product.",
    "We have 5000 customer interviews. Can the system handle datasets that large?",
    "The 500 entry limit on free plan is too restrictive. Real feedback sets are much larger.",
    "I tried pasting 1000 reviews and got an error with no explanation of what went wrong.",
    "The opportunity cards should show a trend line to see if demand is growing or shrinking.",
    "I want to tag opportunities and filter by tag. Product areas change frequently.",
    "Keyboard shortcuts for navigating between opportunities would speed up my reviews.",
    "Dark mode please. I use this late at night and the white background is painful.",
    "We need custom branding on public reports. Our stakeholders ask why it says Zointly.",
    "Multi-language support is critical for our European customer feedback.",
    "Multilingual input is broken. Spanish feedback gets completely misinterpreted.",
    "Date range filtering for feedback would let us spot seasonal patterns.",
    "The app times out when processing large files. Need better loading states and progress.",
    "Processing status needs to be more informative. Just a spinner for 40 seconds is bad UX.",
    "Can we get a progress bar during analysis? The wait is anxiety-inducing.",
    "Undo button after deleting an analysis would prevent the pain I experienced last week.",
    "I accidentally deleted 3 months of analysis work. There is no way to recover it.",
    "Soft delete with a recycle bin would save us from accidental data loss.",
    "The pricing page doesn't explain what counts as one 'analysis'. Very confusing.",
    "I burned through my 3 free analyses not understanding what they were.",
]

export const SAMPLE_OPPORTUNITIES = [
    {
        title: "Bulk Data Export & Reporting",
        demand_score: 9.2,
        confidence: 95,
        priority: "P0",
        mentions_estimate: 15,
        problem_summary: "Users are experiencing significant operational friction due to the lack of bulk export capabilities. PMs and analysts are manually downloading individual reports, which blocks weekly review processes and prevents enterprise-level data portability.",
        proposed_solution: "Implement a high-performance background export system supporting CSV and JSON formats. Add a 'Bulk Actions' menu to the dashboard with progress tracking and email notifications for large datasets.",
        engineering_effort: "2-3 weeks",
        customer_quotes: [
            "Bulk export would save my team hours every week. It's a basic feature we're missing desperately.",
            "Our PM manually downloads 50 reports every Monday. It's embarrassing we don't have bulk export.",
            "We can't export reports — this blocks our entire weekly review process."
        ]
    },
    {
        title: "Semantic & Multi-language Search",
        demand_score: 8.5,
        confidence: 88,
        priority: "P1",
        mentions_estimate: 12,
        problem_summary: "The current keyword-based search is too rigid and fails to surface related feedback that uses different terminology. Additionally, non-English feedback (particularly Spanish) is being misinterpreted or ignored by the current indexing logic.",
        proposed_solution: "Transition to a vector-based semantic search engine using LLM embeddings. Implement automatic translation for multi-language indexing to ensure consistent intelligence across global feedback streams.",
        engineering_effort: "1 month",
        customer_quotes: [
            "I need to search by semantic meaning, not just exact keywords. Current search is too rigid.",
            "The search doesn't find related tickets even when they describe the same issue with different words.",
            "Multilingual input is broken. Spanish feedback gets completely misinterpreted."
        ]
    },
    {
        title: "Native Slack & Zapier Integration",
        demand_score: 7.8,
        confidence: 82,
        priority: "P1",
        mentions_estimate: 9,
        problem_summary: "The feedback loop is broken by manual data entry. Teams are gathering high-quality insights in Slack and Typeform but lack an automated way to pipe this data into the intelligence engine, leading to data silos.",
        proposed_solution: "Build a native Slack app for 1-click feedback clipping and a Zapier integration for connecting 6000+ external apps like Intercom and Hubspot.",
        engineering_effort: "3-4 weeks",
        customer_quotes: [
            "Integration with Slack would be a game changer for our team's feedback workflow.",
            "Can you add a Zapier integration? We'd immediately connect our Typeform surveys.",
            "Intercom integration would save us 3 hours per week of data preparation."
        ]
    },
    {
        title: "Dashboard Performance Optimization",
        demand_score: 7.2,
        confidence: 90,
        priority: "P2",
        mentions_estimate: 8,
        problem_summary: "Core application performance degrades significantly when processing datasets exceeding 100 entries. High latency in dashboard loading (8s+) is negatively impacting the 'Daily Active User' (DAU) metric and perceived reliability.",
        proposed_solution: "Implement data virtualization for large lists and server-side pagination. Optimize Supabase queries with materialization and edge caching for frequently accessed intelligence summaries.",
        engineering_effort: "2 weeks",
        customer_quotes: [
            "Dashboard takes 8 seconds to load on my laptop. This is way too slow to use daily.",
            "Performance is terrible when I have more than 100 feedback entries. Needs optimization.",
            "The app times out when processing large files. Need better loading states."
        ]
    },
    {
        title: "Role-Based Access Control (RBAC)",
        demand_score: 6.5,
        confidence: 75,
        priority: "P2",
        mentions_estimate: 6,
        problem_summary: "Larger teams are experiencing accidental data loss due to a lack of permission boundaries. Stakeholders require visibility without the risk of non-expert users modifying or deleting critical analysis results.",
        proposed_solution: "Introduce Owner, Admin, and Viewer roles. Implement 'Soft Delete' with a 30-day recovery bin to prevent permanent loss of intelligence work.",
        engineering_effort: "2-3 weeks",
        customer_quotes: [
            "We need role-based access so junior PMs can view but not run analyses.",
            "Two of my team members accidentally deleted analyses I needed. Please add permissions.",
            "Soft delete with a recycle bin would save us from accidental data loss."
        ]
    }
]

export const SAMPLE_CHANGE_SUMMARY = {
    items: [
        { type: "new", title: "Bulk Export Demand", detail: "Significant spike in requests for CSV/JSON portability detected in last 30 days." },
        { type: "surge", title: "Slack Workflow Integration", detail: "Active discussion on Slack automation has increased by 45% since Q4." },
        { type: "escalation", title: "Performance Critical", detail: "Latency issues escalated to P1 priority due to enterprise account friction." }
    ]
}
