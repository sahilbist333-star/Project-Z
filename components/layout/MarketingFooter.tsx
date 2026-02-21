import Link from 'next/link'
import { FadeIn } from '@/components/ui/motion'

export default function MarketingFooter() {
    return (
        <footer className="border-t py-14" style={{ background: '#080808', borderColor: 'rgba(255,255,255,0.05)' }}>
            <FadeIn className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    <div>
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: '#6366f1' }}>
                                <span className="text-white text-xs font-bold">Z</span>
                            </div>
                            <span className="font-display font-bold text-sm text-white uppercase tracking-tight">Zointly</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">AI-powered product decision intelligence for modern product teams.</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-4">Product</p>
                        <div className="space-y-3">
                            {([
                                ['Features', '/#features'],
                                ['Pricing', '/pricing'],
                                ['Public Reports', '/#public-reports'],
                                ['FAQ', '/faq'],
                            ] as const).map(([label, href]) => (
                                <Link key={label} href={href} className="block text-xs text-slate-600 hover:text-slate-300 transition-colors">{label}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-4">Company</p>
                        <div className="space-y-3">
                            {([
                                ['About', '/about'],
                                ['Blog', '/blog'],
                                ['Contact', '/contact'],
                            ] as const).map(([label, href]) => (
                                <Link key={label} href={href} className="block text-xs text-slate-600 hover:text-slate-300 transition-colors">{label}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-4">Legal</p>
                        <div className="space-y-3">
                            {([
                                ['Privacy Policy', '/privacy'],
                                ['Terms of Service', '/terms'],
                            ] as const).map(([label, href]) => (
                                <Link key={label} href={href} className="block text-xs text-slate-600 hover:text-slate-300 transition-colors">{label}</Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span className="font-display text-sm font-bold text-slate-700 uppercase tracking-widest">ZOINTLY</span>
                    <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">© {new Date().getFullYear()} Zointly Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-[9px] text-slate-700 hover:text-slate-400 font-bold uppercase tracking-widest">Privacy</Link>
                        <Link href="/terms" className="text-[9px] text-slate-700 hover:text-slate-400 font-bold uppercase tracking-widest">Terms</Link>
                    </div>
                </div>
            </FadeIn>
        </footer>
    )
}
