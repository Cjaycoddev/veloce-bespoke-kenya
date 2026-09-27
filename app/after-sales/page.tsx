'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Wrench, Wrench as WrenchIcon, Gauge, Disc3, Battery,
  Snowflake, Settings, Droplet, CircleDot, ShieldCheck,
  Calendar, Clock, MapPin, Phone, MessageCircle,
  ArrowRight, CheckCircle2, ChevronDown, Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PageHero from '@/components/PageHero';

const easeOut = [0.16, 1, 0.3, 1] as const;

const PACKAGES = [
  {
    name: 'Essential',
    tag: 'From KES 8,500',
    blurb: 'Ideal for the regular commuter. Oil, filters, fluids, and a 30-point inspection.',
    items: ['Engine oil & filter', 'Air & cabin filters', 'Brake fluid check', 'Battery health check', '30-point inspection'],
    accent: false,
  },
  {
    name: 'Signature',
    tag: 'From KES 18,000',
    blurb: 'Our most popular package. Full mechanical + fluid service with a road test.',
    items: ['Everything in Essential', 'Spark plugs / glow plugs', 'Coolant flush', 'Transmission fluid top-up', 'Brake pad inspection', 'Full diagnostic scan', 'Road test & report'],
    accent: true,
  },
  {
    name: 'Bespoke',
    tag: 'From KES 32,000',
    blurb: 'For performance and luxury vehicles. Detailed handover with a written condition report.',
    items: ['Everything in Signature', 'Full transmission service', 'Differential fluid service', 'Suspension inspection', 'A/C service & re-gas', 'Bodywork detail', 'Written condition report'],
    accent: false,
  },
];

const SERVICES = [
  { Icon: Wrench, label: 'Routine Service', note: 'Oil, filters, fluids' },
  { Icon: Gauge, label: 'Diagnostics', note: 'Full electronic scan' },
  { Icon: Disc3, label: 'Brakes & Rotors', note: 'Pads, discs, fluids' },
  { Icon: CircleDot, label: 'Tyres & Alignment', note: 'Fitting, balance, alignment' },
  { Icon: Battery, label: 'Electrical', note: 'Battery, alternator, wiring' },
  { Icon: Snowflake, label: 'A/C & Climate', note: 'Service, re-gas, repairs' },
  { Icon: Droplet, label: 'Bodywork & Paint', note: 'Dent, scratch, full respray' },
  { Icon: Settings, label: 'Suspension', note: 'Shocks, bushes, steering' },
];

const PROCESS = [
  { step: '01', title: 'Book', body: 'Send us a WhatsApp or fill the form. We confirm a slot within an hour.' },
  { step: '02', title: 'Inspect', body: 'A senior technician walks the vehicle with you and documents every item.' },
  { step: '03', title: 'Approve', body: 'We send a written quote  nothing gets done without your yes.' },
  { step: '04', title: 'Handover', body: 'Service complete, vehicle washed, report emailed, next interval scheduled.' },
];

const FAQS = [
  { q: 'Do you use genuine parts?', a: 'Yes  every part we fit is either OEM or a manufacturer-approved equivalent. We tell you which before we start, and every part is listed on your invoice.' },
  { q: 'Will servicing here void my manufacturer warranty?', a: 'No. We service to manufacturer schedules using approved parts, which preserves your warranty under the Consumer Protection Act.' },
  { q: 'How long does a standard service take?', a: 'Between 3 and 5 hours for our Signature package. Bespoke services can take 1-2 days. We confirm timing when you book.' },
  { q: 'Do you offer pickup and delivery?', a: 'Yes, within Nairobi. Small fee depending on distance. Just mention it when you book.' },
  { q: 'What payment methods do you accept?', a: 'M-Pesa, bank transfer, card, and cash. Corporate accounts available on request.' },
  { q: 'Can you service imported vehicles you did not sell?', a: 'Absolutely. We service any make and model  that is most of our workshop traffic.' },
];
export default function AfterSalesPage() {
  const [form, setForm] = useState({
    name: '', phone: '', vehicle: '', service: 'Signature Service',
    date: '', notes: '',
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const update = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const isValid = form.name.trim().length > 1 && form.phone.trim().length > 5 && form.vehicle.trim().length > 1;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = 'Hi Veloce Bespoke, I would like to book a service.\n\nName: ' + form.name + '\nPhone: ' + form.phone + '\nVehicle: ' + form.vehicle + '\nService: ' + form.service + '\nPreferred date: ' + (form.date || 'flexible') + '\n\n' + form.notes;
    window.open('https://wa.me/254729836734?text=' + encodeURIComponent(text), '_blank');
    setSent(true);
  };

  return (
    <main className="relative">
      <Navbar />

      <PageHero
        eyebrow="After-Sales & Service"
        title={<>Keep it <span className="italic text-accent">precise</span>.<br />Keep it for life.</>}
        description="Genuine parts, factory-trained technicians, and a workshop that treats every vehicle like it is our own."
        image="/images/heroes/after-sales.jpg"
        imageAlt="Vehicle service workshop"
        height="md"
      />

      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }} className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">Service Packages</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Pick a package.<br />Or build your own.</h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-muted">All packages include a 30-point inspection, wash, and a written report.</p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.7, ease: easeOut }} className={'relative flex flex-col overflow-hidden rounded-2xl border p-6 md:p-8 ' + (p.accent ? 'border-accent/50 bg-gradient-to-b from-accent/8 to-surface' : 'border-border/60 bg-surface')}>
                {p.accent && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full border border-accent/40 bg-bg/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-accent backdrop-blur-sm">
                    <Sparkles size={9} strokeWidth={2} />
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-light text-ink md:text-3xl">{p.name}</h3>
                <p className="mt-2 font-display text-sm font-medium text-accent">{p.tag}</p>
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">{p.blurb}</p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                      <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#book" className={'mt-8 inline-flex items-center justify-between gap-3 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-all hover:gap-4 ' + (p.accent ? 'bg-accent text-bg' : 'border border-border/80 text-ink hover:border-accent hover:text-accent')}>
                  Book {p.name}
                  <ArrowRight size={15} strokeWidth={2} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="border-t border-border/60 bg-surface/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">Book a Service</span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">Tell us about your vehicle.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">We confirm most bookings within the hour on WhatsApp  usually faster.</p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-bg p-4">
                  <Clock size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                  <div>
                    <p className="text-xs font-medium text-ink">Workshop Hours</p>
                    <p className="mt-1 text-[11px] text-ink-muted">Mon-Sat 8am-6pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-bg p-4">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                  <div>
                    <p className="text-xs font-medium text-ink">Workshop</p>
                    <p className="mt-1 text-[11px] text-ink-muted">Kiambu Road, Nairobi</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}>
              {sent ? (
                <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-surface p-8 text-center md:p-10">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
                    <CheckCircle2 size={22} className="text-accent" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-display text-2xl font-light text-ink">Almost there.</h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">WhatsApp should have opened in a new tab. Hit send and we will confirm your slot.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-xs uppercase tracking-wider text-accent underline-offset-4 hover:underline">Book another service</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border/60 bg-bg p-6 md:p-8">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Full Name" value={form.name} onChange={(v) => update('name', v)} placeholder="Jane Wanjiru" />
                    <Input label="Phone" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+254 7XX XXX XXX" />
                  </div>
                  <Input label="Vehicle" value={form.vehicle} onChange={(v) => update('vehicle', v)} placeholder="e.g. 2020 Toyota Prado" />
                  <div>
                    <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">Service Package</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Essential', 'Signature', 'Bespoke'].map((s) => (
                        <button key={s} type="button" onClick={() => update('service', s + ' Service')} className={'rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ' + (form.service.startsWith(s) ? 'border-accent bg-accent/10 text-accent' : 'border-border/80 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <Input label="Preferred Date" value={form.date} onChange={(v) => update('date', v)} placeholder="e.g. Friday morning" />
                  <div>
                    <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">Notes</label>
                    <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Anything we should know?" className="w-full resize-none rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none" />
                  </div>
                  <button type="submit" disabled={!isValid} className={'mt-2 flex w-full items-center justify-between gap-3 rounded-full px-6 py-4 text-sm font-semibold tracking-wide transition-all ' + (isValid ? 'bg-accent text-bg hover:gap-4' : 'cursor-not-allowed bg-border text-ink-dim')}>
                    Confirm via WhatsApp
                    <MessageCircle size={16} strokeWidth={2} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">What We Do</span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Full-service workshop.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">Every job, in-house. No outsourcing, no middlemen, no surprises.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {SERVICES.map((s, i) => {
              const Icon = s.Icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.05, duration: 0.6, ease: easeOut }} className="group rounded-2xl border border-border/60 bg-surface p-5 transition-colors hover:border-accent/60 md:p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-border/80 text-ink-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-sm font-medium text-ink md:text-base">{s.label}</h3>
                  <p className="mt-1 text-[11px] text-ink-muted">{s.note}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">How It Works</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Four steps. Zero guesswork.</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {PROCESS.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.7, ease: easeOut }} className="relative">
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-display text-3xl font-light text-accent/70 md:text-4xl">{p.step}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mb-3 font-display text-xl font-medium text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck size={16} className="text-accent" strokeWidth={1.8} />
                <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">Warranty & Guarantee</span>
              </div>
              <h3 className="font-display text-xl font-medium text-ink md:text-2xl">Every part. Every job. Guaranteed.</h3>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {['12-month / 20,000km parts warranty', 'Genuine OEM & approved parts only', 'Manufacturer schedule maintained', 'Warranty-safe servicing', 'Written condition report', 'Free re-check within 30 days'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                    <span className="text-sm leading-relaxed text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-surface p-6 md:p-8">
              <span className="font-display text-[10px] uppercase tracking-[0.35em] text-accent">Need parts?</span>
              <h3 className="mt-3 font-display text-xl font-medium text-ink">Talk to our parts desk.</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">Genuine or performance  sourced within 48 hours.</p>
              <a href="https://wa.me/254729836734?text=Hi%20Veloce%20Bespoke%2C%20I%20need%20a%20part." target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-between gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4">
                Ask for a part
                <MessageCircle size={15} strokeWidth={2} />
              </a>
            </div>
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
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">Common questions.</h2>
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
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Ready when you are.</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-muted md:text-base">Talk to a service advisor directly. No forms, no waiting rooms.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="https://wa.me/254729836734?text=Hi%20Veloce%20Bespoke%2C%20I%27d%20like%20to%20book%20a%20service." target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4 sm:py-3.5">
              Book on WhatsApp
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

function Input({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none" />
    </div>
  );
}
