import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const SECTIONS = [
  {
    title: '1. Acceptance of terms',
    body: 'By accessing this website or purchasing a vehicle or service from Veloce Bespoke Kenya, you agree to these Terms & Conditions. If you do not agree, please do not use the site or our services.',
  },
  {
    title: '2. Vehicle listings and accuracy',
    body: 'We describe every vehicle as accurately as possible, including year, mileage, condition, and any known faults. Photographs are of the actual vehicle unless stated otherwise. Minor variations between the photograph and the physical vehicle may exist and are not grounds for a claim.',
  },
  {
    title: '3. Pricing',
    body: 'All prices are quoted in Kenya Shillings (KES) and include applicable taxes unless explicitly stated. Prices are valid for 7 days from the date of the written quotation. Import duty estimates provided on this site are guidance only; the final duty is determined by KRA.',
  },
  {
    title: '4. Financing',
    body: 'Financing is provided by third-party banks and financial institutions, not by Veloce Bespoke Kenya. Pre-qualification on this site is indicative only and does not constitute a loan offer. All loans are subject to the partner institution approval, terms, and conditions.',
  },
  {
    title: '5. Reservations and deposits',
    body: 'A vehicle may be reserved with a deposit as agreed in writing. Deposits are refundable within 48 hours if the sale does not proceed due to a fault on our side. Deposits are non-refundable if you withdraw for reasons unrelated to the vehicle condition.',
  },
  {
    title: '6. Trade-ins',
    body: 'Trade-in valuations are indicative until physical inspection. A final offer is made only after inspection. You confirm that you have the legal right to sell the trade-in vehicle and that it is free from undisclosed encumbrances, loans, or third-party claims.',
  },
  {
    title: '7. Warranty and after-sales',
    body: 'Used vehicle warranties are provided in writing at the point of sale and vary by vehicle. Vehicles sold "as-is" will be clearly marked. Our in-house service centre provides a 12-month / 20,000 km warranty on parts and labour for work we perform.',
  },
  {
    title: '8. Limitation of liability',
    body: 'To the maximum extent permitted by law, our liability for any claim arising from the use of this website or our services is limited to the amount you paid for the relevant vehicle or service. We are not liable for indirect or consequential loss.',
  },
  {
    title: '9. Website use',
    body: 'You agree not to misuse this website, including attempting to gain unauthorised access, scraping content at scale, or using the site for unlawful purposes. All content on the site is our property or used under licence and may not be reproduced without permission.',
  },
  {
    title: '10. Governing law',
    body: 'These terms are governed by the laws of Kenya. Any dispute will be subject to the exclusive jurisdiction of the courts of Kenya.',
  },
  {
    title: '11. Changes to these terms',
    body: 'We may update these terms from time to time. The current version is always available on this page, with the effective date shown above.',
  },
  {
    title: '12. Contact',
    body: 'For any question about these terms, contact us at jonahkimwainaina@gmail.com or +254 729 836 734.',
  },
];

export default function TermsPage() {
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
            Terms & <span className="italic text-accent">Conditions</span>.
          </h1>
          <p className="mt-5 text-xs uppercase tracking-wider text-ink-dim">
            Last updated: 27 September 2026
          </p>
        </div>
      </section>

      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="mb-10 flex items-start gap-4 rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/8 to-surface p-6 md:p-8">
            <FileText size={20} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
            <p className="text-sm leading-relaxed text-ink-muted">
              Plain-language terms. If anything is unclear, WhatsApp us on <span className="font-medium text-accent">+254 729 836 734</span> and we will walk you through it.
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
              These terms are governed by the laws of Kenya. They should be read alongside our{' '}
              <Link href="/privacy" className="text-accent underline-offset-4 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}