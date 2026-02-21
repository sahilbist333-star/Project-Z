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

export default function PrivacyPage() {
    return (
        <div className="min-h-screen" style={{ background: '#080808' }}>
            <MarketingNav />

            <StaggerContainer className="max-w-3xl mx-auto px-6 md:px-12 pt-20 pb-28 relative z-10">
                <StaggerItem className="mb-12">
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3">Legal</p>
                    <h1 className="font-display text-4xl font-bold text-white mb-3">Privacy Policy</h1>
                    <p className="text-slate-500 text-sm">Last updated: February 20, 2025 · Effective: February 20, 2025</p>
                </StaggerItem>

                <StaggerItem className="rounded-[1.5rem] p-6 mb-10 bg-black/40 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        This Privacy Policy explains how Zointly Inc. (&ldquo;Zointly&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects your personal information when you use Zointly (&ldquo;the Service&rdquo;).
                        We are committed to handling your data responsibly and transparently.
                    </p>
                </StaggerItem>

                <Section title="1. Information We Collect">
                    <p><strong className="text-white">Account Information:</strong> When you register, we collect your name, email address, and password (hashed; never stored in plain text).</p>
                    <p><strong className="text-white">Feedback Data:</strong> Text or CSV data you upload for analysis. This is the core input for generating your product opportunities.</p>
                    <p><strong className="text-white">Usage Data:</strong> We log how many analyses you run, when you last used the Service, and general interaction metrics (e.g., page views). We do not use cookies for tracking.</p>
                    <p><strong className="text-white">Payment Information:</strong> All payment processing is handled by Razorpay. We do not store your card details. We receive billing confirmation records only.</p>
                    <p><strong className="text-white">Communication Data:</strong> If you contact us via email, we retain that correspondence to help resolve your inquiry.</p>
                </Section>

                <Section title="2. How We Use Your Information">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>To authenticate you and operate your account</li>
                        <li>To process your feedback and generate AI analysis results</li>
                        <li>To send transactional emails (account confirmation, analysis notifications, alert emails)</li>
                        <li>To enforce our plan limits and billing cycles</li>
                        <li>To improve reliability, diagnose bugs, and maintain service security</li>
                        <li>To respond to your support requests</li>
                    </ul>
                    <p><strong className="text-white">We do not:</strong> sell your data, use your feedback to train AI models, send unsolicited marketing emails, or share data with third-party advertisers.</p>
                </Section>

                <Section title="3. Data Storage and Security">
                    <p>All data is stored in Supabase (PostgreSQL) with Row Level Security enabled — only you can access your own data via authenticated API calls.</p>
                    <p>Data is encrypted in transit (TLS 1.3) and at rest (AES-256). We host on AWS infrastructure in the ap-south-1 (Mumbai) region.</p>
                    <p>We perform regular security reviews and apply principle-of-least-privilege access controls to all system components.</p>
                </Section>

                <Section title="4. Third-Party Services">
                    <p>Zointly integrates with the following third-party services to operate:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong className="text-white">Supabase</strong> — Database, authentication, and file storage</li>
                        <li><strong className="text-white">Google Gemini API</strong> — AI analysis of feedback data</li>
                        <li><strong className="text-white">Razorpay</strong> — Subscription billing and payment processing</li>
                        <li><strong className="text-white">Resend</strong> — Transactional email delivery</li>
                    </ul>
                    <p>Each provider processes only the minimum data required for their function. We do not authorize them to use your data for any other purpose.</p>
                </Section>

                <Section title="5. Public Reports">
                    <p>When you generate a public report, the analysis results (opportunity titles, scores, and verbatim customer quotes from your uploaded feedback) become accessible via a unique public URL.</p>
                    <p>You control whether to generate and share public reports. You can regenerate a new URL from your results page at any time. Contact us to permanently remove a public report from our servers.</p>
                </Section>

                <Section title="6. Data Retention">
                    <p>We retain your account data and analyses for as long as your account is active.</p>
                    <p>If you delete your account, all associated data — including analyses, opportunities, snapshots, and insight alerts — is permanently and immediately deleted from our systems within 72 hours.</p>
                </Section>

                <Section title="7. Your Rights">
                    <p>Depending on your location, you may have rights under applicable privacy laws (including GDPR and India&apos;s DPDP Act) to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                        <li><strong className="text-white">Correction:</strong> Update inaccurate data via Account Settings</li>
                        <li><strong className="text-white">Deletion:</strong> Delete your account and all associated data</li>
                        <li><strong className="text-white">Portability:</strong> Request an export of your analyses</li>
                        <li><strong className="text-white">Objection:</strong> Opt out of any non-essential data processing</li>
                    </ul>
                    <p>To exercise any of these rights, contact <a href="mailto:hello@zointly.com" className="text-indigo-400 hover:underline">hello@zointly.com</a>. We will respond within 30 days.</p>
                </Section>

                <Section title="8. Children's Privacy">
                    <p>Zointly is not intended for use by children under 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, contact us and we will delete it promptly.</p>
                </Section>

                <Section title="9. Changes to This Policy">
                    <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or an in-app notice at least 14 days before the changes take effect.</p>
                    <p>Your continued use of the Service after the effective date constitutes your acceptance of the updated policy.</p>
                </Section>

                <Section title="10. Contact Us">
                    <p>For privacy-related questions, data requests, or complaints, contact our privacy team at:</p>
                    <p><a href="mailto:hello@zointly.com" className="text-indigo-400 hover:underline">hello@zointly.com</a> — subject line: &ldquo;Privacy Request&rdquo;</p>
                    <p>Zointly Inc. · hello@zointly.com</p>
                </Section>
            </StaggerContainer>

            <MarketingFooter />
        </div>
    )
}
