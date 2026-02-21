import Link from 'next/link'
import MarketingNav from '@/components/layout/MarketingNav'
import MarketingFooter from '@/components/layout/MarketingFooter'
import { FadeIn, StaggerContainer, StaggerItem, HeroBackground3D } from '@/components/ui/motion'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-10">
            <h2 className="font-display text-lg font-bold text-white mb-4">{title}</h2>
            <div className="space-y-3 text-slate-400 text-sm leading-relaxed">{children}</div>
        </section>
    )
}

export default function TermsPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            <StaggerContainer className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-28 relative z-10">
                <StaggerItem className="mb-12">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3">Legal</p>
                    <h1 className="font-display text-4xl font-bold text-white mb-3">Terms of Service</h1>
                    <p className="text-slate-500 text-sm">Last updated: February 20, 2025 · Effective: February 20, 2025</p>
                </StaggerItem>

                <StaggerItem className="rounded-[1.5rem] p-6 mb-10 bg-black/40 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Zointly (&ldquo;the Service&rdquo;), provided by Zointly Inc.
                        By creating an account or using the Service, you agree to be bound by these Terms.
                        If you do not agree, do not use the Service.
                    </p>
                </StaggerItem>

                <Section title="1. Account Registration">
                    <p>You must be at least 16 years old to create a Zointly account. You agree to provide accurate, current, and complete information during registration and to keep your account credentials confidential.</p>
                    <p>You are responsible for all activity that occurs under your account. Notify us immediately at <a href="mailto:hello@zointly.com" className="text-indigo-400 hover:underline">hello@zointly.com</a> if you suspect unauthorized access.</p>
                </Section>

                <Section title="2. Acceptable Use">
                    <p>You agree not to use Zointly to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Upload feedback data that you do not have the right to process or share</li>
                        <li>Reverse-engineer, scrape, or copy any part of the Service</li>
                        <li>Submit malicious code, automated bots, or denial-of-service attacks</li>
                        <li>Resell or redistribute access to the Service without written consent</li>
                        <li>Use the Service for any illegal purpose or in violation of applicable privacy laws</li>
                    </ul>
                </Section>

                <Section title="3. Subscription Plans and Billing">
                    <p><strong className="text-white">Free Plan:</strong> Available at no charge, subject to the usage limits described on our Pricing page. We may change free plan limits with 30 days&apos; notice.</p>
                    <p><strong className="text-white">Growth Plan:</strong> Billed monthly at the rate shown at checkout. Subscriptions renew automatically unless cancelled before the next billing date.</p>
                    <p><strong className="text-white">Cancellation:</strong> You may cancel your subscription at any time from the Account Settings page. Cancellations take effect at the end of your current billing cycle. No partial refunds are issued for unused time.</p>
                    <p><strong className="text-white">Refunds:</strong> Unless required by applicable law, payments are non-refundable. If you believe a charge was made in error, contact us within 14 days at <a href="mailto:hello@zointly.com" className="text-indigo-400 hover:underline">hello@zointly.com</a>.</p>
                </Section>

                <Section title="4. Intellectual Property">
                    <p>Zointly and its underlying technology (including the AI analysis pipeline, UI, and public report system) are owned by Zointly Inc. and protected by intellectual property laws.</p>
                    <p>You retain all ownership of the feedback data you upload. By using the Service, you grant Zointly a limited, non-exclusive license to process your data for the sole purpose of delivering your analysis results.</p>
                    <p>We do not claim ownership of your data. We do not use your data to train AI models.</p>
                </Section>

                <Section title="5. AI-Generated Content Disclaimer">
                    <p>Zointly uses Google Gemini to process feedback and generate opportunity analyses. AI-generated content may contain inaccuracies or omissions. Analysis results are provided for informational and decision-support purposes only.</p>
                    <p>You are solely responsible for product decisions made based on Zointly outputs. We are not liable for business outcomes resulting from the use or misuse of analysis results.</p>
                </Section>

                <Section title="6. Availability and Service Changes">
                    <p>We aim for high availability but do not guarantee uninterrupted access. We may modify, suspend, or discontinue features at any time with reasonable notice where practicable.</p>
                    <p>We reserve the right to update these Terms. We will notify you of material changes by email or in-app notice. Continued use of the Service after changes constitutes your acceptance of the new Terms.</p>
                </Section>

                <Section title="7. Limitation of Liability">
                    <p>To the maximum extent permitted by law, Zointly Inc. is not liable for indirect, incidental, consequential, or punitive damages arising from your use of the Service, including loss of data, lost profits, or business interruption.</p>
                    <p>Our total liability to you for any claim shall not exceed the total amount you paid to us in the 12 months preceding the claim, or $100 USD, whichever is greater.</p>
                </Section>

                <Section title="8. Governing Law">
                    <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.</p>
                </Section>

                <Section title="9. Contact">
                    <p>For legal questions or Terms-related inquiries, contact us at: <a href="mailto:hello@zointly.com" className="text-indigo-400 hover:underline">hello@zointly.com</a></p>
                </Section>
            </StaggerContainer>

            <MarketingFooter />
        </div>
    )
}
