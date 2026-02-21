import Link from 'next/link'
import MarketingNav, { HOME_LINKS } from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import HomepagePricing from '@/components/pricing/HomepagePricing'
import { ArrowRight, BarChart3, Bell, CheckCircle2, ChevronRight, Globe, TrendingUp, Zap, Share2, Shield, PlayCircle, Sparkles } from 'lucide-react'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, FloatElement, GlowingPerspectiveCard, InfiniteMarquee, MousePerspectiveCard, HeroBackground3D } from '@/components/ui/motion'
import { FaqAccordion } from '@/components/ui/FaqAccordion'

const features = [
  {
    icon: BarChart3,
    title: 'AI Demand Scoring',
    description: 'Every feature request gets a 0–10 demand score based on frequency, urgency, and sentiment — not gut feel.',
  },
  {
    icon: Zap,
    title: 'Instant Analysis',
    description: 'Paste feedback or upload a CSV. Most analyses complete in under 60 seconds using Gemini AI.',
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
      <header className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden anim-grid-pan"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.025) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}>

        {/* Organic Mesh Background */}
        <HeroBackground3D />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Content */}
            <StaggerContainer className="text-left max-w-2xl">
              <StaggerItem>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 bg-black/30 backdrop-blur-md"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#6366f1' }} />
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em]">AI-Powered Product Intelligence</span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4 sm:mb-6 leading-tight sm:leading-[1.05] drop-shadow-2xl">
                  Stop guessing what to{' '}
                  <br className="block sm:hidden" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-lg">
                    build next.
                  </span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light max-w-xl">
                  Turn raw customer feedback into prioritized product opportunities with AI-verified demand scores, verbatim evidence, and shareable reports.
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6">
                  <Link href="/sign-up"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 group text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-[10px] uppercase tracking-widest bg-gradient-to-r from-indigo-400 to-purple-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(192,132,252,0.4)] hover:shadow-[0_0_40px_rgba(192,132,252,0.6)]">
                    Analyze Feedback Free
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="#features"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-[10px] uppercase tracking-widest bg-black/40 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                    <PlayCircle className="w-4 h-4 text-slate-400" />
                    See How It Works
                  </Link>
                </div>
              </StaggerItem>

              <StaggerItem>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] ml-2">
                  Free plan · 3 analyses/month · No credit card required
                </p>
              </StaggerItem>
            </StaggerContainer>

            {/* Right: Mockup Graphic */}
            <FadeIn delay={0.3} className="relative lg:ml-auto w-full max-w-lg">
              <FloatElement>
                <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full"></div>

                <GlowingPerspectiveCard className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-black/40 backdrop-blur-2xl border border-white/10">
                  {/* Window bar */}
                  <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 bg-black/50">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="ml-2 sm:ml-4 text-[8px] sm:text-[9px] text-slate-500 tracking-widest font-mono truncate">zointly.com/reports/prj-delta</span>
                    <div className="ml-auto px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden sm:block">
                      Verified
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 border-b border-white/5">
                    <div className="p-4 sm:p-6 border-r border-white/5">
                      <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Demand Score</p>
                      <p className="font-display text-2xl sm:text-3xl font-bold text-indigo-400">9.2</p>
                    </div>
                    <div className="p-4 sm:p-6">
                      <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1 sm:mb-2">Priority</p>
                      <p className="font-display text-lg sm:text-xl font-bold text-red-400 mt-1 sm:mt-2">P0 — Critical</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="p-8 bg-black/20">
                    <p className="text-base text-slate-300 italic leading-relaxed mb-6">
                      &ldquo;The lack of granular reporting is the only thing preventing us from moving our entire 400-person team to your platform. We currently export manually 3× a day.&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">VP</div>
                      <div>
                        <p className="text-[10px] font-bold text-white uppercase tracking-wider">VP Product, Fortune 500</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Verified Feedback</p>
                      </div>
                    </div>
                  </div>
                </GlowingPerspectiveCard>

                {/* Floating decorative elements */}
                <div className="absolute -right-6 -bottom-6 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Signal Trend</p>
                      <p className="text-sm font-bold text-white">+24% this week</p>
                    </div>
                  </div>
                </div>
              </FloatElement>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* Social Proof Marquee */}
      <FadeIn>
        <section className="py-8 border-y border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <p className="text-center text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">Trusted by innovative product teams</p>
            <InfiniteMarquee className="opacity-50 grayscale hover:grayscale-0 transition-all duration-500" speed={30}>
              {/* Dummy Logos acting as placeholders since we can't use real SVGs easily */}
              {['Acme Corp', 'GlobalNet', 'NovaTech', 'Stark Ind.', 'Omega', 'Vertex', 'Nexus', 'Horizon'].map(logo => (
                <span key={logo} className="font-display font-bold text-lg text-slate-300 tracking-tight cursor-default">{logo}</span>
              ))}
            </InfiniteMarquee>
          </div>
        </section>
      </FadeIn>

      {/* Features (Bento Grid) */}
      <section className="py-32" id="features">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">Intelligence System</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Everything you need to build<br />what actually matters.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
              Zointly replaces guesswork with structured evidence — from raw feedback to boardroom-ready insights.
            </p>
          </FadeIn>

          {/* Bento Box Grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1: AI Demand Scoring (Large Wide) */}
            <StaggerItem className="lg:col-span-2 row-span-2 group relative overflow-hidden p-6 sm:p-8 md:p-12 rounded-[2rem] bg-black/40 border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-indigo-500/20 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col justify-between gap-12">
                <div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <BarChart3 className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">AI Demand Scoring</h3>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">Every feature request gets a 0–10 demand score based on frequency, urgency, and sentiment — not gut feel.</p>
                </div>
                {/* Visual Element */}
                <div className="w-full flex items-end">
                  <div className="w-full h-32 md:h-48 rounded-t-xl bg-gradient-to-t from-indigo-500/20 to-transparent border-t border-x border-indigo-500/20 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indigo-400 shadow-[0_0_20px_#818cf8]"></div>
                    {/* Fake Chart bars */}
                    <div className="absolute bottom-0 w-full flex items-end justify-between px-6 gap-2 opacity-60">
                      {[40, 70, 45, 90, 60, 85, 55, 100].map((h, i) => (
                        <div key={i} className="w-full bg-indigo-500/50 rounded-t-sm" style={{ height: `${h}% ` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Card 2: Instant Analysis */}
            <StaggerItem className="group relative overflow-hidden p-6 sm:p-8 rounded-[2rem] bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all">
              <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-purple-500/10 border border-purple-500/20">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 mt-auto pt-12">Instant Analysis</h3>
                <p className="text-slate-400 text-base leading-relaxed">Paste feedback or upload a CSV. Most analyses complete in under 60 seconds using Gemini AI.</p>
              </div>
            </StaggerItem>

            {/* Card 3: Insight Alerts */}
            <StaggerItem className="group relative overflow-hidden p-6 sm:p-8 rounded-[2rem] bg-black/40 border border-white/5 hover:border-yellow-500/30 transition-all">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-yellow-500/5 blur-[80px] rounded-full group-hover:bg-yellow-500/10 transition-colors"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-yellow-500/10 border border-yellow-500/20">
                  <Bell className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 mt-auto pt-12">Insight Alerts</h3>
                <p className="text-slate-400 text-base leading-relaxed">Get notified when demand surges, new signals emerge, or priorities shift between analyses.</p>
              </div>
            </StaggerItem>

            {/* Card 4: Shareable Reports */}
            <StaggerItem className="group relative overflow-hidden p-6 sm:p-8 rounded-[2rem] bg-black/40 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-blue-500/10 border border-blue-500/20">
                  <Share2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 mt-auto pt-12">Shareable Evidence</h3>
                <p className="text-slate-400 text-base leading-relaxed">Every analysis generates a public URL with top opportunities and verbatim quotes.</p>
              </div>
            </StaggerItem>

            {/* Card 5: Verbatim Evidence (Wide) */}
            <StaggerItem className="md:col-span-2 lg:col-span-2 group relative overflow-hidden p-6 sm:p-8 md:p-10 rounded-[2rem] bg-black/40 border border-white/5 hover:border-teal-500/30 transition-all">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-teal-500/5 blur-[100px] rounded-full group-hover:bg-teal-500/10 transition-colors"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-teal-500/10 border border-teal-500/20">
                    <Shield className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">Verbatim Evidence</h3>
                  <p className="text-slate-400 text-base leading-relaxed">Opportunities are backed by raw, unparaphrased customer quotes — not AI summaries. Stakeholders trust what they can verify.</p>
                </div>
                {/* Mock Quote Box */}
                <div className="flex-1 w-full bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm self-end">
                  <p className="text-sm italic text-slate-300 mb-4">"We need a way to export these reports directly to PDF for our weekly syncs..."</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex justify-center items-center text-[10px] font-bold text-teal-300 border border-teal-500/30">JD</div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Enterprise Customer</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-indigo-900/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight mb-6">From feedback to decision in 3 steps.</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">It's designed to be completely frictionless. You can deploy it today without engineering help.</p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Upload Data', desc: 'Paste text or upload a CSV. Zointly accepts up to 5,000 entries — survey responses, support tickets, app reviews, anything.', color: 'indigo' },
              { step: '02', title: 'AI Analyzes', desc: 'Gemini AI processes every entry, clusters themes into opportunities, and assigns demand scores backed by verbatim quotes.', color: 'purple' },
              { step: '03', title: 'Share Evidence', desc: 'Get a prioritized list of opportunities with PRD-ready details and a permanent public report URL for stakeholders.', color: 'teal' },
            ].map(({ step, title, desc, color }) => (
              <StaggerItem key={step}>
                <div className="relative p-10 h-full rounded-[2rem] bg-black/40 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2 group overflow-hidden">
                  {/* Decorative blob */}
                  <div className={`absolute - right - 10 - top - 10 w - 32 h - 32 bg - ${color} -500 / 10 blur - [50px] rounded - full group - hover: bg - ${color} -500 / 20 transition - colors`}></div>

                  <div className="text-[60px] font-black font-display leading-none mb-8 text-white/5 group-hover:text-white/10 transition-colors">
                    {step}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4 relative z-10">{title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed relative z-10">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Public Reports */}
      <section className="py-32 border-t border-white/5 relative overflow-hidden" id="public-reports">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full point-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 mb-6">
                <Globe className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300">Public Reports</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                Share verified decision evidence with anyone.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
                Every analysis generates a permanent public URL. Share with your team, board, or investors without requiring them to create an account.
              </p>
              <StaggerContainer className="space-y-4 mb-10">
                {[
                  'Permanent, unguessable report URL',
                  'No sign-in required to view',
                  'Includes all verbatim customer quotes',
                  'Branded with "Generated with Zointly"',
                ].map(f => (
                  <StaggerItem key={f} className="flex items-center gap-3 text-base text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {f}
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <Link href="/sign-up"
                className="inline-flex items-center justify-center gap-2 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-primary group w-full sm:w-auto">
                Generate Your First Report
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
            {/* Mock report card */}
            <FadeIn delay={0.2} className="lg:ml-auto w-full max-w-lg perspective-[1200px]">
              <MousePerspectiveCard className="rounded-[2rem] overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex items-center gap-2 sm:gap-3 border-white/5 bg-black/60">
                  <Globe className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-[8px] sm:text-[10px] text-slate-500 font-mono tracking-wider truncate">zointly.com/reports/abc-xyz</span>
                  <div className="ml-auto px-2 sm:px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30 shrink-0">
                    Public Link
                  </div>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {[
                    { title: 'Bulk CSV Export', score: 9.2, priority: 'P0', color: '#ef4444' },
                    { title: 'Slack Integration', score: 8.7, priority: 'P1', color: '#f97316' },
                    { title: 'Advanced Search', score: 7.5, priority: 'P1', color: '#f97316' },
                    { title: 'Mobile App Support', score: 6.8, priority: 'P2', color: '#eab308' },
                  ].map(opp => (
                    <div key={opp.title} className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[120px] sm:max-w-[200px]">{opp.title}</p>
                        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 sm:mt-2 inline-block"
                          style={{ background: `${opp.color} 18`, color: opp.color }}>{opp.priority}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-display text-xl sm:text-2xl font-bold text-indigo-400">{opp.score}</p>
                        <p className="text-[8px] sm:text-[9px] text-slate-600 font-bold uppercase tracking-widest">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MousePerspectiveCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <HomepagePricing />

      {/* Retention Positioning */}
      <section className="py-32 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-6">Your customer needs change every week.</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">Zointly tracks emerging signals so your roadmap stays aligned with real demand.</p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: BarChart3, title: 'Demand surges', text: 'Catch quickly rising needs.' },
              { icon: Zap, title: 'New requests', text: 'Identify net-new signals early.' },
              { icon: TrendingUp, title: 'Priority shifts', text: 'Track ranking changes over time.' },
              { icon: Bell, title: 'Insight alerts', text: 'Get email updates automatically.' }
            ].map(item => (
              <StaggerItem key={item.title}>
                <div className="h-full p-8 rounded-[2rem] text-center bg-black/40 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-2">
                  <div className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-indigo-500/10 border border-indigo-500/20">
                    <item.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-3 font-display tracking-tight">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn className="text-center">
            <Link href="/sign-up"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-[10px] uppercase tracking-widest text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.2)] bg-primary group w-full sm:w-auto">
              Start tracking signals
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 border-t border-white/5 relative" id="faqs">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight">Frequently asked questions.</h2>
          </FadeIn>
          <StaggerContainer className="mt-16 w-full">
            <FaqAccordion items={faqs} />
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ScaleIn className="relative rounded-[3rem] overflow-hidden p-16 md:p-24 bg-black/40 border border-indigo-500/20 shadow-2xl">
            {/* Glowing background inside CTA */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
                Ship what users actually want.
              </h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-light">
                Stop spending hours in spreadsheets. Most analyses complete in under 60 seconds.
              </p>
              <Link href="/sign-up"
                className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(99,102,241,0.5)] bg-primary group w-full sm:w-auto">
                Analyze Feedback Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScaleIn>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
