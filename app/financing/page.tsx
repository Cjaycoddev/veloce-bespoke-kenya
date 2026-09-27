'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  MessageCircle,
  Calculator,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PageHero from '@/components/PageHero';
import {
  calculateFinancing,
  formatKES,
  LOAN_TERMS,
  DEFAULT_INPUTS,
  type FinancingInputs,
} from '@/lib/financing';

const PARTNER_BANKS = ['NCBA', 'KCB', 'Co-operative', 'Stanbic', 'Absa'];

const REQUIREMENTS = [
  'Copy of National ID or Passport',
  'KRA PIN certificate',
  '6 months of bank statements',
  '3 recent payslips (or business records if self-employed)',
  'Employment or business introduction letter',
  'Vehicle proforma invoice (we provide this)',
];

const FAQS = [
  {
    q: 'Can I get financing if I am self-employed?',
    a: 'Yes. Self-employed applicants typically need 12 months of bank statements and business records. Our partner banks assess on cash flow, not just payslips.',
  },
  {
    q: 'Do you accept SACCO members?',
    a: 'Yes  we work with several SACCOs and can route your application through your SACCO or directly to a partner bank, whichever gives better terms.',
  },
  {
    q: 'What if I do not have payslips?',
    a: 'Alternative proof of income works  M-Pesa statements, business records, or a guarantor. Talk to our finance officer on WhatsApp.',
  },
  {
    q: 'Can I apply jointly with a spouse or partner?',
    a: 'Absolutely. Joint applications often improve approval odds and can unlock better rates.',
  },
  {
    q: 'How long does approval take?',
    a: 'Pre-qualification is instant on this page. Full approval typically takes 35 working days once documents are submitted.',
  },
  {
    q: 'What deposit do I need?',
    a: 'From 10% on most vehicles. Some banks go up to 95100% financing for qualifying applicants.',
  },
];

export default function FinancingPage() {
  const [inputs, setInputs] = useState<FinancingInputs>(DEFAULT_INPUTS);
  const result = useMemo(() => calculateFinancing(inputs), [inputs]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const update = <K extends keyof FinancingInputs>(
    key: K,
    value: FinancingInputs[K]
  ) => setInputs((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="relative">
      <Navbar />

      {/* HERO STRIP */}
            <PageHero
        eyebrow="Financing"
        title={
          <>
            Know your monthly.
            <br />
            <span className="italic text-accent">Then</span> get approved.
          </>
        }
        description="Adjust the numbers below to see your estimated monthly payment in real time. Then submit a pre-qualification  no impact on your credit score."
        image="/images/heroes/financing.jpg"
        imageAlt="Luxury vehicle interior"
        height="md"
      />

      {/* CALCULATOR */}
      <section id="calculator" className="relative bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            {/* INPUTS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-border/60 bg-surface p-6 md:p-8">
                <div className="mb-8 flex items-center gap-3">
                  <Calculator size={16} className="text-accent" strokeWidth={1.8} />
                  <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">
                    Loan Parameters
                  </span>
                </div>

                {/* Vehicle price */}
                <div className="mb-8">
                  <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">
                    Vehicle Price
                  </label>
                  <div className="flex items-center rounded-xl border border-border/80 bg-bg px-4 py-3 focus-within:border-accent">
                    <span className="mr-3 text-sm text-ink-dim">KES</span>
                    <input
                      type="number"
                      value={inputs.vehiclePrice}
                      onChange={(e) =>
                        update('vehiclePrice', Math.max(0, Number(e.target.value)))
                      }
                      className="w-full bg-transparent font-display text-lg font-medium text-ink outline-none"
                    />
                  </div>
                </div>

                {/* Deposit slider */}
                <div className="mb-8">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-wider text-ink-dim">
                      Deposit
                    </label>
                    <span className="font-display text-sm font-medium text-accent">
                      {inputs.depositPercent}%  {formatKES(result.deposit)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={1}
                    value={inputs.depositPercent}
                    onChange={(e) =>
                      update('depositPercent', Number(e.target.value))
                    }
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
                  />
                  <div className="mt-2 flex justify-between text-[10px] text-ink-dim">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Loan term */}
                <div className="mb-8">
                  <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">
                    Loan Term
                  </label>
                  <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                    {LOAN_TERMS.map((term) => (
                      <button
                        key={term}
                        onClick={() => update('loanTermMonths', term)}
                        className={
                          'rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ' +
                          (inputs.loanTermMonths === term
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border/80 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')
                        }
                      >
                        {term}mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest rate */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-wider text-ink-dim">
                      Annual Interest Rate
                    </label>
                    <span className="font-display text-sm font-medium text-accent">
                      {inputs.annualRate.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={22}
                    step={0.5}
                    value={inputs.annualRate}
                    onChange={(e) =>
                      update('annualRate', Number(e.target.value))
                    }
                    className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
                  />
                  <div className="mt-2 flex justify-between text-[10px] text-ink-dim">
                    <span>8%</span>
                    <span>22%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RESULT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24 rounded-2xl border border-accent/30 bg-gradient-to-b from-surface to-bg p-6 md:p-8">
                <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">
                  Your Estimate
                </span>

                <div className="mt-6">
                  <p className="text-[11px] uppercase tracking-wider text-ink-dim">
                    Monthly Payment
                  </p>
                  <motion.p
                    key={result.monthlyPayment}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 font-display text-3xl font-light text-accent md:text-4xl"
                  >
                    {formatKES(result.monthlyPayment)}
                  </motion.p>
                </div>

                <div className="mt-8 space-y-4 border-t border-border/60 pt-6">
                  <Row label="Vehicle Price" value={formatKES(inputs.vehiclePrice)} />
                  <Row label="Deposit" value={formatKES(result.deposit)} />
                  <Row label="Amount Financed" value={formatKES(result.principal)} />
                  <Row label="Loan Term" value={`${inputs.loanTermMonths} months`} />
                  <Row label="Total Interest" value={formatKES(result.totalInterest)} />
                  <div className="border-t border-border/60 pt-4">
                    <Row
                      label="Total Repayable"
                      value={formatKES(result.totalRepayable)}
                      bold
                    />
                  </div>
                </div>

                <a
                  href={
                    'https://wa.me/254729836734?text=' +
                    encodeURIComponent(
                      `Hi Veloce Bespoke, I'd like to pre-qualify for financing.\n\n` +
                        `Vehicle price: ${formatKES(inputs.vehiclePrice)}\n` +
                        `Deposit: ${inputs.depositPercent}% (${formatKES(result.deposit)})\n` +
                        `Term: ${inputs.loanTermMonths} months\n` +
                        `Est. monthly: ${formatKES(result.monthlyPayment)}`
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-transform hover:scale-[1.02]"
                >
                  Send This to a Finance Officer
                  <MessageCircle size={16} strokeWidth={2} />
                </a>

                <p className="mt-5 text-[10px] leading-relaxed text-ink-dim">
                  Estimate only. Final terms depend on bank assessment and
                  vehicle eligibility.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNER BANKS */}
      <section className="border-y border-border/60 bg-surface/40 py-10">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-5 text-center font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">
            Financing Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
            {PARTNER_BANKS.map((bank) => (
              <span
                key={bank}
                className="font-display text-lg font-medium tracking-wide text-ink-muted md:text-xl"
              >
                {bank}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                  What You Will Need
                </span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">
                Simple, standard paperwork.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
                Have these ready and we can typically get you from approval to
                keys in under a week.
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="space-y-4"
            >
              {REQUIREMENTS.map((req) => (
                <motion.li
                  key={req}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="flex items-start gap-3 border-b border-border/40 pb-4"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-accent"
                    strokeWidth={1.8}
                  />
                  <span className="text-sm leading-relaxed text-ink">{req}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                FAQ
              </span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">
              Common questions.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-xl border border-border/60 bg-bg"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface/50"
                  >
                    <span className="text-sm font-medium text-ink md:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.8}
                      className={
                        'shrink-0 text-accent transition-transform duration-300 ' +
                        (open ? 'rotate-180' : '')
                      }
                    />
                  </button>
                  <div
                    className={
                      'grid transition-all duration-300 ease-out ' +
                      (open
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0')
                    }
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-border/60 bg-bg py-20 md:py-28">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-muted md:text-base">
            Talk to a finance officer directly. No forms, no waiting rooms 
            just answers.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/254729836734?text=Hi%20Veloce%20Bespoke%2C%20I%27d%20like%20to%20talk%20to%20a%20finance%20officer."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4 sm:py-3.5"
            >
              Chat on WhatsApp
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <Link
              href="/inventory"
              className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-bg/40 px-6 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:border-accent hover:text-accent sm:py-3.5"
            >
              Browse Inventory
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-ink-muted">{label}</span>
      <span
        className={
          bold
            ? 'font-display font-medium text-accent'
            : 'font-medium text-ink'
        }
      >
        {value}
      </span>
    </div>
  );
}