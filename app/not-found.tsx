import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
            style={{ background: '#0a0a0b' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
                style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <span className="text-3xl font-display font-bold text-indigo-400">?</span>
            </div>
            <h1 className="font-display text-6xl font-bold text-white mb-4">404</h1>
            <h2 className="font-display text-xl font-bold text-white mb-3">Page not found</h2>
            <p className="text-slate-400 text-sm max-w-xs mb-8 leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex items-center gap-3">
                <Link href="/"
                    className="px-5 py-2.5 rounded-md text-white font-bold text-sm transition-all"
                    style={{ background: '#6366f1' }}>
                    Back to Home
                </Link>
                <Link href="/dashboard"
                    className="px-5 py-2.5 rounded-md font-bold text-sm transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                    Dashboard
                </Link>
            </div>
        </div>
    )
}
