'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, MessageCircle, CheckCircle2, ChevronDown,
  Car, Clock, ShieldCheck, Banknote, FileCheck, Handshake, Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PageHero from '@/components/PageHero';

const easeOut = [0.16, 1, 0.3, 1] as const;

const CONDITIONS = [
  { value: 'excellent', label: 'Excellent', note: 'Like new', multiplier: 1.0 },
  { value: 'good', label: 'Good', note: 'Minor wear', multiplier: 0.85 },
  { value: 'fair', label: 'Fair', note: 'Visible wear', multiplier: 0.7 },
  { value: 'rough', label: 'Needs Work', note: 'Major items', multiplier: 0.5 },
];

const WHY_SELL = [
  { Icon: Zap, title: 'Instant Offer', body: 'Get a ballpark in seconds, then a firm offer after our inspection.' },
  { Icon: Banknote, title: 'Same-Day Payment', body: 'Once you accept, we pay immediately via M-Pesa or bank transfer.' },
  { Icon: FileCheck, title: 'We Handle Transfer', body: 'NTSA, TIMS, logbook, insurance - every form is ours, not yours.' },
  { Icon: Handshake, title: 'No Time Wasters', body: 'Real buyers, real offers. No endless last-price messages.' },
];

const PROCESS = [
  { step: '01', title: 'Send Details', body: 'Fill the form or WhatsApp us with photos. Takes 2 minutes.' },
  { step: '02', title: 'Get an Estimate', body: 'We reply with a ballpark based on year, mileage, and condition.' },
  { step: '03', title: 'Bring It In', body: 'Book a 30-minute inspection at our workshop. Free, no obligation.' },
  { step: '04', title: 'Get Paid', body: 'Accept the offer, get paid same-day. We handle all paperwork.' },
];

const FAQS = [
  { q: 'What if my car has an outstanding loan?', a: 'That is common - we handle it. We settle the loan directly with the bank, pay you the balance, and take care of releasing the logbook.' },
  { q: 'Do you buy accident-damaged cars?', a: 'Yes, as long as the damage is disclosed upfront. We factor repair costs into our offer, so there are no surprises later.' },
  { q: 'How long does the whole process take?', a: 'From first WhatsApp to money in your account: usually 48 hours if the vehicle is in Nairobi. Upcountry adds a day for logistics.' },
  { q: 'Do you charge inspection or valuation fees?', a: 'No. Inspection and valuation are always free, even if you decide not to sell to us.' },
  { q: 'Can I trade in against a car from your inventory?', a: 'Absolutely - this is our most popular option. Your trade-in value goes against your next car, and we finance the balance.' },
  { q: 'Which vehicles do you buy?', a: 'Most makes and models under 12 years old, any fuel type. We also buy luxury and performance vehicles case by case.' },
];

export default function SellPage() {
  const [form, setForm] = useState({ make: '', model: '', year: '2020', mileage: '', condition: 'good', name: '', phone: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const update = (k: keyof typeof form, v: string) => setForm((prev) => ({ ...prev, [k]: v }));
  const isValid = form.make.trim().length > 1 && form.model.trim().length > 1 && form.phone.trim().length > 5;

  const estimate = useMemo(() => {
    const year = Number(form.year) || 2020;
    const mileage = Number(form.mileage) || 60000;
    const cond = CONDITIONS.find((c) => c.value === form.condition)?.multiplier ?? 0.85;
    const ageFactor = Math.max(0.25, 1 - (new Date().getFullYear() - year) * 0.08);
    const mileageFactor = Math.max(0.4, 1 - mileage / 400000);
    const value = 6500000 * ageFactor * mileageFactor * cond;
    return Math.round(value / 10000) * 10000;
  }, [form.year, form.mileage, form.condition]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = 'Hi Veloce Bespoke, I would like to sell / trade in my vehicle.\n\nVehicle: ' + form.year + ' ' + form.make + ' ' + form.model + '\nMileage: ' + (form.mileage || 'not specified') + ' km\nCondition: ' + form.condition + '\nName: ' + form.name + '\nPhone: ' + form.phone + '\n\nI will send photos next.';
    window.open('https://wa.me/254729836734?text=' + encodeURIComponent(text), '_blank');
    setSent(true);
  };

  const fmt = (n: number) => 'KES ' + n.toLocaleString('en-KE');

  return (
    <main className="relative">
      <Navbar />

      <PageHero
        eyebrow="Sell or Trade-In"
        title={<>Turn your car<br />into <span className="italic text-accent">cash</span>.</>}
        description="Fair offers, same-day payment, and we handle every document. Trade against anything in our inventory, or sell outright."
        image="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Vehicle ready for sale"
        height="md"
      />

      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {WHY_SELL.map((w, i) => {
              const Icon = w.Icon;
              return (
                <motion.div key={w.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.08, duration: 0.6, ease: easeOut }} className="rounded-2xl border border-border/60 bg-surface p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/5 text-accent">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-base font-medium text-ink md:text-lg">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{w.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }} className="lg:col-span-3">
              <div className="rounded-2xl border border-border/60 bg-bg p-6 md:p-8">
                <div className="mb-8 flex items-center gap-3">
                  <Car size={16} className="text-accent" strokeWidth={1.8} />
                  <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">Vehicle Details</span>
                </div>

                {sent ? (
                  <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-bg p-8 text-center md:p-10">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
                      <CheckCircle2 size={22} className="text-accent" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-2xl font-light text-ink">Sent. Now add photos.</h3>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">WhatsApp opened with your details. Send us 6-8 photos and we will reply with a firm offer.</p>
                    <button onClick={() => setSent(false)} className="mt-6 text-xs uppercase tracking-wider text-accent underline-offset-4 hover:underline">Submit another vehicle</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <Input label="Make" value={form.make} onChange={(v) => update('make', v)} placeholder="e.g. Toyota" />
                      <Input label="Model" value={form.model} onChange={(v) => update('model', v)} placeholder="e.g. Prado" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">Year</label>
                        <select value={form.year} onChange={(e) => update('year', e.target.value)} className="w-full appearance-none rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none">
                          {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                            <option key={y} value={String(y)}>{y}</option>
                          ))}
                        </select>
                      </div>
                      <Input label="Mileage (km)" value={form.mileage} onChange={(v) => update('mileage', v)} placeholder="e.g. 58000" type="number" />
                    </div>

                    <div>
                      <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">Condition</label>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        {CONDITIONS.map((c) => (
                          <button key={c.value} type="button" onClick={() => update('condition', c.value)} className={'rounded-lg border px-3 py-3 text-left transition-colors ' + (form.condition === c.value ? 'border-accent bg-accent/10 text-accent' : 'border-border/80 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')}>
                            <p className="text-xs font-medium">{c.label}</p>
                            <p className="mt-0.5 text-[10px] opacity-70">{c.note}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 border-t border-border/40 pt-5 md:grid-cols-2">
                      <Input label="Your Name" value={form.name} onChange={(v) => update('name', v)} placeholder="Jane Wanjiru" />
                      <Input label="Phone" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+254 7XX XXX XXX" />
                    </div>

                    <button type="submit" disabled={!isValid} className={'flex w-full items-center justify-between gap-3 rounded-full px-6 py-4 text-sm font-semibold tracking-wide transition-all ' + (isValid ? 'bg-accent text-bg hover:gap-4' : 'cursor-not-allowed bg-border text-ink-dim')}>
                      Send via WhatsApp
                      <MessageCircle size={16} strokeWidth={2} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: easeOut }} className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-accent/30 bg-gradient-to-b from-surface to-bg p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">Ballpark Estimate</span>
                  <span className="rounded-full border border-accent/40 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-accent">Instant</span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-ink-dim">Indicative Value</p>
                <p className="mt-1 font-display text-3xl font-light text-accent md:text-[34px]">{fmt(estimate)}</p>
                <div className="mt-8 space-y-3 border-t border-border/60 pt-6">
                  <Row label="Vehicle" value={(form.year + ' ' + (form.make || '-') + ' ' + (form.model || '')).trim()} />
                  <Row label="Mileage" value={form.mileage ? form.mileage + ' km' : '-'} />
                  <Row label="Condition" value={CONDITIONS.find((c) => c.value === form.condition)?.label || '-'} />
                </div>
                <p className="mt-6 text-[10px] leading-relaxed text-ink-dim">Rough guide based on market averages. Your firm offer follows a 30-minute inspection - free, no obligation.</p>
                <div className="mt-6 rounded-xl border border-border/60 bg-bg p-4">
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="shrink-0 text-accent" strokeWidth={1.8} />
                    <p className="text-[11px] text-ink-muted">Average response: <span className="font-medium text-ink">under 1 hour</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">How It Works</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">From photos to payment.</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {PROCESS.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.7, ease: easeOut }}>
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-display text-3xl font-light text-accent/70 md:text-4xl">{p.step}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mb-3 font-display text-xl font-medium text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">FAQ</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">Questions sellers ask.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="overflow-hidden rounded-xl border border-border/60 bg-bg">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface/50">
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

      <section className="relative overflow-hidden border-t border-border/60 bg-bg py-20 md:py-24">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
          <div className="mb-5 flex items-center justify-center gap-3">
            <ShieldCheck size={14} className="text-accent" strokeWidth={1.8} />
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">Trusted by sellers</span>
          </div>
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Not sure what it is worth?</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-muted md:text-base">Send one photo on WhatsApp. We will give you an honest range - no strings, no pressure.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="https://wa.me/254729836734?text=Hi%20Veloce%20Bespoke%2C%20I%27d%20like%20a%20valuation%20for%20my%20vehicle." target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4 sm:py-3.5">
              Get a Free Valuation
              <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link href="/inventory" className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-bg/40 px-6 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:border-accent hover:text-accent sm:py-3.5">
              Trade Against Inventory
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="shrink-0 text-ink-muted">{label}</span>
      <span className="truncate text-right font-medium text-ink">{value || '-'}</span>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none" />
    </div>
  );
}