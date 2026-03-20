export interface BlogPost {
    slug: string;
    category: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    image: string;
}

export const posts: BlogPost[] = [
    {
        slug: 'how-zointlys-demand-score-works-under-the-hood',
        category: 'Product Intelligence',
        date: 'March 18, 2025',
        readTime: '6 min read',
        title: 'How Zointly\'s Demand Score Works Under the Hood',
        excerpt: 'A transparent look at the weighted algorithm behind the 0–10 demand score — how we combine frequency, urgency, and sentiment to rank product opportunities.',
        image: '/blog/demand-score.png',
    },
    {
        slug: 'from-500-support-tickets-to-a-quarterly-roadmap-in-90-seconds',
        category: 'Product Management',
        date: 'March 15, 2025',
        readTime: '8 min read',
        title: 'From 500 Support Tickets to a Quarterly Roadmap in 90 Seconds',
        excerpt: 'A step-by-step guide to using Zointly to process a full quarter of support feedback and turn it into a prioritized, evidence-backed product roadmap.',
        image: '/blog/roadmap-automation.png',
    },
    {
        slug: 'why-verbatim-customer-quotes-beat-any-slide-deck',
        category: 'Product Strategy',
        date: 'March 12, 2025',
        readTime: '5 min read',
        title: 'Why Verbatim Customer Quotes Beat Any Slide Deck',
        excerpt: 'Product leaders share how replacing summary slides with raw customer feedback in Zointly reports completely changed how engineering and design engaged with prioritization.',
        image: '/blog/verbatim-evidence.png',
    },
    {
        slug: 'the-complete-guide-to-zointly-insight-alerts',
        category: 'Feature Guide',
        date: 'March 8, 2025',
        readTime: '4 min read',
        title: 'The Complete Guide to Zointly Insight Alerts',
        excerpt: 'Insight Alerts notify you when demand surges, new signals emerge, or priorities shift. Here\'s how to configure them and what each alert type means for your roadmap.',
        image: '/blog/insight-alerts.png',
    },
    {
        slug: 'how-to-format-your-csv-for-perfect-zointly-analysis',
        category: 'How-to Guide',
        date: 'March 5, 2025',
        readTime: '3 min read',
        title: 'How to Format Your CSV for Perfect Zointly Analysis',
        excerpt: 'A practical guide covering the ideal CSV structure, common formatting mistakes, and how to clean up messy export files from popular tools like Intercom, Zendesk, and Typeform.',
        image: '/blog/csv-formatting.png',
    },
    {
        slug: 'your-first-analysis-a-complete-walkthrough-with-sample-data',
        category: 'Getting Started',
        date: 'March 1, 2025',
        readTime: '3 min read',
        title: 'Your First Analysis: A Complete Walkthrough with Sample Data',
        excerpt: 'New to Zointly? This step-by-step tutorial walks you through running your first analysis using our built-in sample dataset and reading every section of the results.',
        image: '/blog/first-analysis.png',
    },
];
