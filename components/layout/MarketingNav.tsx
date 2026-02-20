import Link from 'next/link'

interface NavLink {
    label: string
    href: string
}

interface Props {
    /** Override the default nav links. Defaults to standard marketing nav. */
    links?: NavLink[]
}

const DEFAULT_LINKS: NavLink[] = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
]

const HOME_LINKS: NavLink[] = [
    { label: 'Features', href: '#features' },
    { label: 'Public Reports', href: '#public-reports' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
]

export { HOME_LINKS, DEFAULT_LINKS }

export default function MarketingNav({ links = DEFAULT_LINKS }: Props) {
    return (
        <>
            {/* Announcement bar */}
            <div className="py-2" style={{ background: '#FACC15' }}>
                <p className="text-center text-[9px] font-black text-black tracking-widest uppercase">
                    🆕 Generate shareable evidence reports for stakeholders in one click.{' '}
                    <a href="/#public-reports" className="underline ml-2">See how →</a>
                </p>
            </div>

            <nav className="border-b sticky top-0 z-50"
                style={{ background: 'rgba(8,8,8,0.95)', borderColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-7 h-7 rounded flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ background: '#6366f1' }}>
                            <span className="text-white text-xs font-bold">Z</span>
                        </div>
                        <span className="font-display text-sm font-bold text-white uppercase tracking-tight">Zointly</span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map(({ label, href }) => (
                            <a key={label} href={href}
                                className="text-[9px] font-bold text-slate-400 hover:text-white uppercase tracking-[0.2em] transition-colors">
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Auth CTA */}
                    <div className="flex items-center gap-3">
                        <Link href="/sign-in"
                            className="hidden md:block text-[9px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                            Sign In
                        </Link>
                        <Link href="/sign-up"
                            className="text-white px-5 py-2.5 rounded-sm font-bold text-[9px] uppercase tracking-widest hover:opacity-90 hover:scale-[1.02] transition-all"
                            style={{ background: '#6366f1' }}>
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}
