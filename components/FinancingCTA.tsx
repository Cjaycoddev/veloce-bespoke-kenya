'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}

export default function FinancingCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-bg py-20 md:py-28">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                Financing
              </span>
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">
              Drive it today,
              <br />
              <span className="italic text-accent">pay</span> as you go.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted md:text-base">
              Financing from 10% deposit through Kenya&apos;s leading banks.
              Pre-qualify in under two minutes  no impact on your credit score.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/financing"
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4 sm:py-3.5"
              >
                Get Pre-Approved
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/financing#calculator"
                className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-bg/40 px-6 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:border-accent hover:text-accent sm:py-3.5"
              >
                Try the Calculator
                <Calculator size={14} strokeWidth={2} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="relative rounded-2xl border border-border/80 bg-gradient-to-b from-surface to-bg p-6 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">
                Monthly Estimate
              </span>
              <span className="rounded-full border border-accent/40 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-accent">
                Live Preview
              </span>
            </div>

            <div className="space-y-5">
              <Row label="Vehicle Price" value="KES 8,950,000" />
              <Row label="Deposit (10%)" value="KES 895,000" />
              <Row label="Loan Term" value="60 months" />
              <div className="border-t border-border/60 pt-5">
                <div className="flex items-end justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-ink-dim">
                    Est. Monthly
                  </span>
                  <span className="font-display text-2xl font-light text-accent md:text-3xl">
                    KES 148,500
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-[10px] leading-relaxed text-ink-dim">
              Estimate only. Final terms depend on bank assessment and vehicle
              eligibility.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}