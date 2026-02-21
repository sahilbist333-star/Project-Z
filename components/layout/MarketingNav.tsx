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
        <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-6 pointer-events-none">
            {/* Announcement bar */}
            <div className="max-w-7xl mx-auto mb-4 rounded-full pointer-events-auto shadow-lg" style={{ background: '#FACC15' }}>
                <p className="text-center text-[10px] py-1.5 font-bold text-black tracking-widest uppercase">
                    🆕 Generate shareable evidence reports for stakeholders in one click.{' '}
                    <a href="/#public-reports" className="underline ml-2">See how →</a>
                </p>
            </div>

            <nav className="max-w-7xl mx-auto rounded-full pointer-events-auto border"
                style={{ background: 'rgba(8,8,8,0.7)', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(24px)' }}>
                <div className="px-6 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-6 h-6 rounded flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ background: '#6366f1' }}>
                            <span className="text-white text-[10px] font-bold">Z</span>
                        </div>
                        <span className="font-display text-sm font-bold text-white uppercase tracking-tight">Zointly</span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-8 bg-black/20 px-6 h-10 rounded-full border border-white/5">
                        {links.map(({ label, href }) => (
                            <a key={label} href={href}
                                className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Auth CTA */}
                    <div className="flex items-center gap-4">
                        <Link href="/sign-in"
                            className="hidden md:block text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors">
                            Log In
                        </Link>
                        <Link href="/sign-up"
                            className="text-white px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:opacity-90 hover:scale-[1.02] shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
                            style={{ background: '#6366f1' }}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

