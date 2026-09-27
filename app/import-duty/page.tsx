'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, MessageCircle, Calculator, AlertTriangle,
  CheckCircle2, ChevronDown, Ship,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PageHero from '@/components/PageHero';
import {
  calculateImportDuty, formatKES, DEFAULT_DUTY_INPUTS,
  USD_TO_KES, MAX_AGE_YEARS, type DutyInputs,
} from '@/lib/importDuty';

const easeOut = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  { q: 'How is the CIF value determined?', a: 'CIF = Cost of the vehicle + Insurance + Freight. The Kenya Revenue Authority (KRA) uses a Current Retail Selling Price (CRSP) guide to assess used imports, so the value KRA assigns may differ from what you paid.' },
  { q: 'Why does engine size affect the cost so much?', a: 'Excise duty in Kenya is tiered by engine capacity. A 3500cc SUV pays 35% excise, while a 1500cc sedan pays 20%.' },
  { q: 'What is the 8-year rule?', a: 'KEBS only permits import of vehicles whose year of first registration is within 8 years of the import date.' },
  { q: 'Are there other fees not shown here?', a: 'Yes. Shipping, clearing agent fees, KEBS inspection (QISJ), port storage, transport, and NTSA registration.' },
  { q: 'Can I finance the import?', a: 'Yes. Most partner banks will finance the full landed cost, not just the CIF value.' },
  { q: 'How long does the whole process take?', a: 'Typically 6-10 weeks from purchase abroad to keys in hand.' },
];

export default function ImportDutyPage() {
  const [inputs, setInputs] = useState<DutyInputs>(DEFAULT_DUTY_INPUTS);
  const [usdMode, setUsdMode] = useState(false);
  const [usdValue, setUsdValue] = useState(Math.round(DEFAULT_DUTY_INPUTS.cifKes / USD_TO_KES));
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const result = useMemo(() => calculateImportDuty(inputs), [inputs]);

  const update = <K extends keyof DutyInputs>(key: K, v: DutyInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  const setCifFromUsd = (usd: number) => {
    setUsdValue(usd);
    update('cifKes', Math.round(usd * USD_TO_KES));
  };

  return (
    <main className="relative">
      <Navbar />
            <PageHero
        eyebrow="Import Duty Calculator"
        title={
          <>
            Know the true
            <br />
            cost <span className="italic text-accent">before</span> you import.
          </>
        }
        description="Import duty, excise, VAT, IDF, and RDL  all calculated transparently. No surprises at the port."
        image="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Shipping containers at port"
        height="md"
      />
      <section className="relative bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }} className="lg:col-span-3">
              <div className="rounded-2xl border border-border/60 bg-surface p-6 md:p-8">
                <div className="mb-8 flex items-center gap-3">
                  <Calculator size={16} className="text-accent" strokeWidth={1.8} />
                  <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">Vehicle Parameters</span>
                </div>
                <div className="mb-8 flex gap-2">
                  <button onClick={() => setUsdMode(false)} className={'flex-1 rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors ' + (!usdMode ? 'border-accent bg-accent/10 text-accent' : 'border-border/80 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')}>KES</button>
                  <button onClick={() => setUsdMode(true)} className={'flex-1 rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors ' + (usdMode ? 'border-accent bg-accent/10 text-accent' : 'border-border/80 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')}>USD - convert at {USD_TO_KES}</button>
                </div>
                <div className="mb-8">
                  <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">{usdMode ? 'CIF Value (USD)' : 'CIF Value (KES)'}</label>
                  <div className="flex items-center rounded-xl border border-border/80 bg-bg px-4 py-3 focus-within:border-accent">
                    <span className="mr-3 text-sm text-ink-dim">{usdMode ? 'USD' : 'KES'}</span>
                    <input type="number" value={usdMode ? usdValue : inputs.cifKes} onChange={(e) => { const n = Math.max(0, Number(e.target.value)); if (usdMode) setCifFromUsd(n); else update('cifKes', n); }} className="w-full bg-transparent font-display text-lg font-medium text-ink outline-none" />
                  </div>
                  <p className="mt-2 text-[10px] text-ink-dim">Cost + Insurance + Freight to Mombasa port</p>
                </div>
                <div className="mb-8">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-wider text-ink-dim">Engine Capacity</label>
                    <span className="font-display text-sm font-medium text-accent">{inputs.engineCc.toLocaleString()} cc</span>
                  </div>
                  <input type="range" min={660} max={5000} step={50} value={inputs.engineCc} onChange={(e) => update('engineCc', Number(e.target.value))} className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[{ label: '1500cc', cc: 1500 }, { label: '2000cc', cc: 2000 }, { label: '2500cc', cc: 2500 }, { label: '3000cc', cc: 3000 }, { label: '3500cc', cc: 3500 }].map((p) => (
                      <button key={p.cc} onClick={() => update('engineCc', p.cc)} className={'rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ' + (inputs.engineCc === p.cc ? 'border-accent bg-accent/10 text-accent' : 'border-border/70 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')}>{p.label}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-wider text-ink-dim">Year of First Registration</label>
                    <span className={'font-display text-sm font-medium ' + (result.isAgeEligible ? 'text-accent' : 'text-red-400')}>{inputs.year}</span>
                  </div>
                  <input type="range" min={2000} max={new Date().getFullYear()} step={1} value={inputs.year} onChange={(e) => update('year', Number(e.target.value))} className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent" />
                  {!result.isAgeEligible && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/5 p-4">
                      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />
                      <div>
                        <p className="text-xs font-medium text-red-400">Age limit exceeded</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">This vehicle is {result.ageYears} years old. KEBS only permits imports up to {MAX_AGE_YEARS} years from first registration.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: easeOut }} className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-accent/30 bg-gradient-to-b from-surface to-bg p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">Landed Cost</span>
                  <span className="rounded-full border border-accent/40 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-accent">Estimate</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ink-dim">Total Cost to Drive</p>
                  <p className="mt-1 font-display text-3xl font-light text-accent md:text-[34px]">{formatKES(result.landedCost)}</p>
                </div>
                <div className="mt-8 space-y-3 border-t border-border/60 pt-6">
                  <Row label="CIF Value" value={formatKES(result.cif)} />
                  <Row label={'Import Duty (' + (result.importDutyRate * 100).toFixed(0) + '%)'} value={formatKES(result.importDuty)} />
                  <Row label={'Excise (' + (result.exciseRate * 100).toFixed(0) + '%)'} value={formatKES(result.exciseDuty)} />
                  <Row label={'VAT (' + (result.vatRate * 100).toFixed(0) + '%)'} value={formatKES(result.vat)} />
                  <Row label={'IDF (' + (result.idfRate * 100).toFixed(1) + '%)'} value={formatKES(result.idf)} />
                  <Row label={'RDL (' + (result.rdlRate * 100).toFixed(1) + '%)'} value={formatKES(result.rdl)} />
                  <div className="border-t border-border/60 pt-4"><Row label="Total Taxes" value={formatKES(result.totalTaxes)} /></div>
                  <div className="border-t border-border/60 pt-4"><Row label="Landed Cost" value={formatKES(result.landedCost)} bold /></div>
                </div>
                <a href={'https://wa.me/254729836734?text=' + encodeURIComponent('Hi Veloce Bespoke, I am planning an import.\n\nCIF: ' + formatKES(result.cif) + '\nEngine: ' + inputs.engineCc + 'cc\nYear: ' + inputs.year + '\nLanded cost: ' + formatKES(result.landedCost) + '\n\nCan you help?')} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-transform hover:scale-[1.02]">
                  Talk to an Import Specialist
                  <MessageCircle size={16} strokeWidth={2} />
                </a>
                <p className="mt-5 text-[10px] leading-relaxed text-ink-dim">Estimate only. Actual duty depends on KRA CRSP assessment, exchange rate, and current Finance Act.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Ship size={16} className="text-accent" strokeWidth={1.8} />
                <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">What We Handle</span>
              </div>
              <h3 className="font-display text-xl font-medium text-ink md:text-2xl">End-to-end import.</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">From purchase abroad to NTSA registration, we manage every step.</p>
            </div>
            <ul className="space-y-4 md:col-span-2 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-4 md:space-y-0">
              {['Vehicle sourcing & inspection', 'Purchase & export clearance', 'Shipping & marine insurance', 'KRA duty assessment & payment', 'KEBS QISJ inspection', 'Port clearing at Mombasa', 'Transport to Nairobi', 'NTSA registration & plates'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                  <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">FAQ</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">Questions importers ask.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="overflow-hidden rounded-xl border border-border/60 bg-surface">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-bg/50">
                    <span className="text-sm font-medium text-ink md:text-base">{faq.q}</span>
                    <ChevronDown size={18} strokeWidth={1.8} className={'shrink-0 text-accent transition-transform duration-300 ' + (open ? 'rotate-180' : '')} />
                  </button>
                  <div className={'grid transition-all duration-300 ease-out ' + (open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/60 bg-surface/30 py-20 md:py-24">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Let us handle the import.</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-muted md:text-base">From auction in Japan to keys in Nairobi  one team, one quote, no surprises.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="https://wa.me/254729836734?text=Hi%20Veloce%20Bespoke%2C%20I%27d%20like%20help%20importing%20a%20vehicle." target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4 sm:py-3.5">
              Chat on WhatsApp
              <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link href="/inventory" className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-bg/40 px-6 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:border-accent hover:text-accent sm:py-3.5">
              Browse Inventory
              <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-ink-muted">{label}</span>
      <span className={bold ? 'font-display font-medium text-accent' : 'font-medium text-ink'}>{value}</span>
    </div>
  );
}
