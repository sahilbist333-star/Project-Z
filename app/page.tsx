import Link from 'next/link'
import MarketingNav, { HOME_LINKS } from '@/components/layout/MarketingNav'
import { CheckCircle2, BarChart3, Share2, Bell, Zap, Shield, Globe, ChevronDown } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'AI Demand Scoring',
    description: 'Every feature request gets a 0–10 demand score based on frequency, urgency, and sentiment — not gut feel.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Paste feedback or upload a CSV. Zointly processes hundreds of entries in under 60 seconds using Gemini AI.',
  },
  {
    icon: Share2,
    title: 'Shareable Evidence Reports',
    description: 'Every analysis generates a public URL with your top opportunities and verbatim customer quotes.',
  },
  {
    icon: Bell,
    title: 'Insight Alerts',
    description: 'Get notified when demand surges, new signals emerge, or priorities shift between analyses.',
  },
  {
    icon: Shield,
    title: 'Verbatim Evidence',
    description: 'Opportunities are backed by raw, unparaphrased customer quotes — not AI summaries. Stakeholders trust what they can verify.',
  },
  {
    icon: Globe,
    title: 'Public Report Sharing',
    description: 'Share a permanent link with your team, board, or investors. No account needed to view it.',
  },
]

const faqs = [
  {
    q: 'How does the demand score work?',
    a: 'The Demand Score (0–10) uses a weighted algorithm that considers feedback frequency, urgency signals, and sentiment intensity. It\'s normalized across all opportunities so you can compare them fairly.',
  },
  {
    q: 'Can I share reports with stakeholders?',
    a: 'Yes. Every completed analysis generates a unique permanent URL that anyone can view without a Zointly account. Perfect for syncing with your team or presenting to leadership.',
  },
  {
    q: 'How do I upload feedback?',
    a: 'Two ways: paste text directly (one feedback entry per line) or upload a CSV file with a single feedback column. Zointly supports up to 5,000 entries per analysis on the Growth plan.',
  },
  {
    q: 'Is my feedback data secure?',
    a: 'All data is encrypted in transit and at rest using Supabase with Row Level Security. Your feedback is never used to train AI models or shared with third parties.',
  },
  {
    q: 'What happens after my free analyses are used?',
    a: 'You can upgrade to Growth (₹49/month) for 50 analyses and up to 5,000 entries per run. Your existing analyses and reports remain accessible forever on any plan.',
  },
  {
    q: 'Do I need a credit card to sign up?',
    a: 'No. The free plan requires no credit card. You get 3 analyses per month and can upgrade anytime.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080808', color: '#94a3b8' }}>

      <MarketingNav links={HOME_LINKS} />

      {/* Hero */}
      <header className="relative pt-36 pb-24 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.025) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6366f1' }} />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">AI-Powered Product Intelligence</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.08]">
            Stop guessing what to{' '}
            <span style={{ color: '#818cf8', textDecoration: 'underline', textDecorationColor: 'rgba(99,102,241,0.35)' }}>
              build next.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Turn raw customer feedback into prioritized product opportunities with AI-verified demand scores, verbatim evidence, and shareable reports.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/sign-up"
              style={{ background: '#6366f1', boxShadow: '0 0 30px rgba(99,102,241,0.35)' }}
              className="w-full sm:w-auto text-white px-8 py-4 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">
              Analyze Your Feedback Free →
            </Link>
            <Link href="#features"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
              className="w-full sm:w-auto text-white px-8 py-4 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:bg-white/8 transition-all">
              See How It Works
            </Link>
          </div>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
            Free plan · 3 analyses/month · No credit card required
          </p>
        </div>

        {/* Hero visual — mock analysis card */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 mt-20 relative z-10">
          <div className="rounded-xl overflow-hidden shadow-2xl"
            style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Window bar */}
            <div className="flex items-center gap-2 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#0a0a0b' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#eab308' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />
              <span className="ml-4 text-[10px] text-slate-600 tracking-widest font-mono">zointly.com/reports/prj-delta-992</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
                  Verified Analysis
                </div>
              </div>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {[
                { label: 'Demand Score', value: '9.2/10' },
                { label: 'Unique Mentions', value: '124' },
                { label: 'Confidence', value: '88%' },
                { label: 'Priority', value: 'P0 — Critical', highlight: true },
              ].map((item, i) => (
                <div key={i} className="p-6 text-left" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : undefined }}>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-3">{item.label}</p>
                  <p className={`font-display text-2xl font-bold ${item.highlight ? '' : 'text-white'}`}
                    style={item.highlight ? { color: '#6366f1' } : {}}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            {/* Quote */}
            <div className="p-8" style={{ background: 'rgba(8,8,8,0.5)' }}>
              <p className="text-base text-slate-300 italic leading-relaxed mb-4">
                &ldquo;The lack of granular reporting is the only thing preventing us from moving our entire 400-person team to your platform. We currently export manually 3× a day.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full" style={{ background: '#6366f1' }} />
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">
                  VP Product, Fortune 500
                  <span className="text-slate-600 ml-2">· Verified Feedback</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logos / social proof */}
      <section className="py-12 border-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-center text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-8">
            Trusted by Product Teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {['DataScale', 'NovaTech', 'Amplio', 'Cortex', 'Helix', 'Veritas'].map(logo => (
              <span key={logo} className="font-display font-bold text-xs text-slate-700 uppercase tracking-widest">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28" id="features">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#6366f1' }}>Intelligence System</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Everything you need to build<br />what actually matters.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              Zointly replaces guesswork with structured evidence — from raw feedback to boardroom-ready insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-7 rounded-xl transition-all hover:-translate-y-1 hover:border-indigo-500/20"
                style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#6366f1' }}>The Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">From feedback to decision in 3 steps.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Your Feedback', desc: 'Paste text or upload a CSV. Zointly accepts up to 5,000 entries — survey responses, support tickets, app reviews, anything.' },
              { step: '02', title: 'AI Analyzes & Scores', desc: 'Gemini AI processes every entry, clusters themes into opportunities, and assigns demand scores backed by verbatim quotes.' },
              { step: '03', title: 'Share Your Evidence', desc: 'Get a prioritized list of opportunities with PRD-ready details and a permanent public report URL for stakeholders.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-[80px] font-black font-display leading-none mb-4"
                  style={{ color: 'rgba(99,102,241,0.07)' }}>{step}</div>
                <h3 className="font-display text-lg font-bold text-white mb-3 -mt-10 relative">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Reports */}
      <section className="py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }} id="public-reports">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#6366f1' }}>Public Reports</p>
              <h2 className="font-display text-3xl font-bold text-white mb-5 leading-tight">
                Share verified decision evidence<br />with anyone — instantly.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Every Zointly analysis generates a permanent public URL. Share with your team, board, or investors without requiring them to create an account. Reports include demand scores, opportunity rankings, and verbatim customer evidence.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  'Permanent, unguessable report URL',
                  'No sign-in required to view',
                  'Includes all verbatim customer quotes',
                  'Branded with "Generated with Zointly"',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/sign-up"
                style={{ background: '#6366f1' }}
                className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">
                Generate Your First Report →
              </Link>
            </div>
            {/* Mock report card */}
            <div className="rounded-xl overflow-hidden"
              style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="px-6 py-4 border-b flex items-center gap-3"
                style={{ borderColor: 'rgba(255,255,255,0.05)', background: '#0a0a0b' }}>
                <Globe className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] text-slate-500 font-mono">zointly.com/reports/abc-xyz</span>
                <div className="ml-auto px-2 py-0.5 rounded text-[8px] font-bold"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>
                  Public
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: 'Bulk CSV Export', score: 9.2, priority: 'P0', color: '#ef4444' },
                  { title: 'Slack Integration', score: 8.7, priority: 'P1', color: '#f97316' },
                  { title: 'Advanced Search', score: 7.5, priority: 'P1', color: '#f97316' },
                  { title: 'Mobile App Support', score: 6.8, priority: 'P2', color: '#eab308' },
                ].map(opp => (
                  <div key={opp.title} className="flex items-center justify-between p-4 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <p className="text-sm font-semibold text-white">{opp.title}</p>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mt-1 inline-block"
                        style={{ background: `${opp.color}18`, color: opp.color }}>{opp.priority}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold" style={{ color: '#6366f1' }}>{opp.score}</p>
                      <p className="text-[9px] text-slate-600">/ 10</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Generated with Zointly · Powered by Gemini AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }} id="pricing">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#6366f1' }}>Simple Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Start free. Scale when you&apos;re ready.</h2>
            <p className="text-slate-500 max-w-md mx-auto">Plans scale with your analysis needs. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Free */}
            <div className="flex flex-col p-8 rounded-xl" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Starter</h3>
              <div className="text-3xl font-bold text-white font-display mb-2">$0</div>
              <p className="text-slate-500 text-xs mb-6">Forever free</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {['3 analyses / month', 'Up to 500 entries', 'Public reports', 'Basic opportunities'].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up"
                className="w-full text-center py-3 rounded-sm border font-bold text-[9px] uppercase tracking-widest transition-all text-slate-300 hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                Get Started Free
              </Link>
            </div>

            {/* Growth */}
            <div className="flex flex-col p-8 rounded-xl relative overflow-hidden ring-2 ring-indigo-500/30"
              style={{ background: '#0f1020', border: '2px solid #6366f1' }}>
              <div className="absolute top-0 right-0 text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-bl-lg"
                style={{ background: '#6366f1' }}>Most Popular</div>
              <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#818cf8' }}>Growth</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-white font-display">₹49</span>
                <span className="text-slate-500 text-xs">/month</span>
              </div>
              <p className="text-slate-500 text-xs mb-6">Billed monthly, cancel anytime</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {['50 analyses / month', 'Up to 5,000 entries', 'Public reports', 'Insight alerts', 'Email notifications', 'Priority processing'].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up"
                className="w-full text-center py-3 rounded-sm text-white font-bold text-[9px] uppercase tracking-widest transition-all hover:opacity-90"
                style={{ background: '#6366f1', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
                Get Growth Plan
              </Link>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col p-8 rounded-xl" style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-white font-display mb-2">Custom</div>
              <p className="text-slate-500 text-xs mb-6">For large teams</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {['Unlimited analyses', 'Unlimited entries', 'White-label reports', 'Dedicated support', 'SSO & Enhanced Security', 'Custom API access'].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:hello@zointly.io"
                className="w-full text-center py-3 rounded-sm border font-bold text-[9px] uppercase tracking-widest transition-all text-slate-300 hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#6366f1' }}>Customer Stories</p>
            <h2 className="font-display text-3xl font-bold text-white">Trusted by builders who move fast.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'We cut prioritization meetings from 3 hours to 20 minutes. Zointly gives us the evidence to make confident bets.',
                name: 'Maria Chen', role: 'VP of Product', company: 'NovaTech',
              },
              {
                quote: 'The verbatim customer quotes in every opportunity card changed how we present to leadership. No more "we think users want this."',
                name: 'Jordan Lee', role: 'Product Manager', company: 'Amplio',
              },
              {
                quote: 'Finally a tool that turns our 500 monthly support tickets into an actual roadmap. The demand scores are surprisingly accurate.',
                name: 'Sam Patel', role: 'Head of Product', company: 'DataScale',
              },
            ].map(({ quote, name, role, company }) => (
              <div key={name} className="p-7 rounded-xl"
                style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: '#6366f1' }}>{name[0]}</div>
                  <div>
                    <p className="text-white text-sm font-semibold">{name}</p>
                    <p className="text-slate-500 text-xs">{role}, {company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }} id="faqs">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: '#6366f1' }}>FAQ</p>
            <h2 className="font-display text-3xl font-bold text-white">Frequently asked questions.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-lg"
                style={{ background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.07)' }}>
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-white">{q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="relative rounded-2xl overflow-hidden p-14"
            style={{ background: '#0d0d0f', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] blur-[100px] opacity-20"
                style={{ background: 'rgba(99,102,241,0.5)' }} />
            </div>
            <div className="relative z-10">
              <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Start Today, Free</p>
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Ship what users actually want.
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Stop spending hours in spreadsheets. Get your first analysis in under 60 seconds — no credit card needed.
              </p>
              <Link href="/sign-up"
                style={{ background: '#6366f1', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-sm font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all">
                Analyze Your Feedback Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-14" style={{ background: '#080808', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
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
                  <a key={label} href={href} className="block text-xs text-slate-600 hover:text-slate-300 transition-colors">{label}</a>
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
                  <a key={label} href={href} className="block text-xs text-slate-600 hover:text-slate-300 transition-colors">{label}</a>
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
                  <a key={label} href={href} className="block text-xs text-slate-600 hover:text-slate-300 transition-colors">{label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <span className="font-display text-sm font-bold text-slate-700 uppercase tracking-widest">ZOINTLY</span>
            <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">© {new Date().getFullYear()} Zointly Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-[9px] text-slate-700 hover:text-slate-400 font-bold uppercase tracking-widest">Privacy</a>
              <a href="/terms" className="text-[9px] text-slate-700 hover:text-slate-400 font-bold uppercase tracking-widest">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
