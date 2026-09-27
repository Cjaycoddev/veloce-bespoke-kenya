import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const SECTIONS = [
  {
    title: '1. Who we are',
    body: 'Veloce Bespoke Kenya ("Veloce", "we", "us") is a vehicle dealership and service provider registered in Kenya, operating from Kiambu Road, Nairobi. We are the data controller for the personal information described in this policy.',
  },
  {
    title: '2. Information we collect',
    body: 'We collect information you provide directly (name, phone number, email address, vehicle details, financing information) and information collected automatically when you use this website (IP address, browser type, pages visited, referral source). We may also receive information from partner banks when processing a financing application.',
  },
  {
    title: '3. How we use your information',
    body: 'We use your information to respond to enquiries, arrange test drives, process financing applications, complete a purchase or trade-in, provide after-sales service, and comply with legal obligations under Kenyan law (including NTSA and KRA requirements). With your consent, we may also send you occasional updates about new inventory.',
  },
  {
    title: '4. Legal basis',
    body: 'We process personal data on the basis of your consent, the performance of a contract with you, and our legitimate business interests. Where we process data for anti-money-laundering or tax purposes, we do so to comply with a legal obligation.',
  },
  {
    title: '5. Sharing your information',
    body: 'We share information only where necessary: with partner banks when you apply for financing, with NTSA, KRA, and KEBS for registration and compliance, with insurers, and with service providers who help us operate the website. We do not sell your data to third parties.',
  },
  {
    title: '6. Data retention',
    body: 'We retain personal data for as long as necessary to fulfil the purpose it was collected for, and for any additional period required by Kenyan law. Financial records are typically kept for seven years.',
  },
  {
    title: '7. Your rights',
    body: 'Under the Kenya Data Protection Act (2019), you have the right to access the personal data we hold about you, request correction or deletion, object to certain processing, and lodge a complaint with the Office of the Data Protection Commissioner (ODPC). To exercise any of these rights, contact us using the details below.',
  },
  {
    title: '8. Cookies',
    body: 'This website uses a minimal set of cookies and similar technologies for basic functionality and anonymous analytics. You can disable cookies in your browser settings without affecting core site functionality.',
  },
  {
    title: '9. Security',
    body: 'We use reasonable technical and organisational measures to protect your information, including encryption in transit and access controls on internal systems. No system is completely secure, and we cannot guarantee absolute security.',
  },
  {
    title: '10. Changes to this policy',
    body: 'We may update this policy from time to time. Material changes will be posted on this page with an updated effective date. Continued use of the site after changes take effect constitutes acceptance.',
  },
  {
    title: '11. Contact',
    body: 'For any privacy-related question, contact us at jonahkimwainaina@gmail.com or +254 729 836 734. You may also write to us at our registered address on Kiambu Road, Nairobi.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border/60 bg-bg pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/5 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8">
          <Link href="/" className="group mb-8 inline-flex items-center gap-2 text-xs text-ink-muted transition-colors hover:text-accent">
            <ArrowLeft size={14} strokeWidth={1.8} className="transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">Legal</span>
          </div>
          <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Privacy <span className="italic text-accent">Policy</span>.
          </h1>
          <p className="mt-5 text-xs uppercase tracking-wider text-ink-dim">
            Last updated: 27 September 2026
          </p>
        </div>
      </section>

      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="mb-10 flex items-start gap-4 rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/8 to-surface p-6 md:p-8">
            <Shield size={20} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
            <p className="text-sm leading-relaxed text-ink-muted">
              We keep this short and honest. If anything below is unclear, WhatsApp us on <span className="font-medium text-accent">+254 729 836 734</span> and we will explain it in plain language.
            </p>
          </div>

          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-medium text-ink md:text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-border/60 pt-8">
            <p className="text-xs leading-relaxed text-ink-dim">
              This policy is governed by the laws of Kenya. It should be read alongside our{' '}
              <Link href="/terms" className="text-accent underline-offset-4 hover:underline">Terms & Conditions</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}