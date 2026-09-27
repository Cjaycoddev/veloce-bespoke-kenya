'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Award, Users, MapPin,
  Heart, CheckCircle2, Globe, Car, Wrench, Banknote,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PageHero from '@/components/PageHero';

const easeOut = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: '200+', label: 'Vehicles delivered' },
  { value: '8', label: 'Years in the trade' },
  { value: '100%', label: 'Verified mileage' },
  { value: '48h', label: 'Average turnaround' },
];

const VALUES = [
  { Icon: ShieldCheck, title: 'Radical Transparency', body: 'Every price, every fee, every fault - documented upfront. No hidden surprises at signing.' },
  { Icon: Award, title: 'Curated, Never Commoditised', body: 'We only list vehicles we would happily own ourselves. If it does not meet the bar, it does not make the site.' },
  { Icon: Heart, title: 'Service Beyond Sale', body: 'Our relationship starts when you buy. Service, parts, and support for the life of the vehicle.' },
  { Icon: Globe, title: 'Built for Kenya', body: 'Financing routed through local banks. Import duty calculated to the shilling. Delivery anywhere in the country.' },
];

const WHAT_WE_DO = [
  { Icon: Car, title: 'Sell & Source', body: 'Curated inventory of verified used vehicles, and direct import for anything we do not have in stock.' },
  { Icon: Banknote, title: 'Finance', body: 'Asset finance from 10% deposit, routed through Kenya\'s leading banks in under a week.' },
  { Icon: Wrench, title: 'After-Sales', body: 'Full-service workshop, genuine parts, and manufacturer-schedule servicing that keeps warranties intact.' },
];

const TIMELINE = [
  { year: '2018', title: 'Founded in Nairobi', body: 'Started with three cars and one promise: verified mileage, honest pricing, no games.' },
  { year: '2020', title: 'Went fully digital', body: 'Launched online inventory and WhatsApp-first service so clients could buy without a showroom visit.' },
  { year: '2022', title: 'Import arm launched', body: 'Began end-to-end importing from Japan, UK, and South Africa for clients who wanted specific vehicles.' },
  { year: '2024', title: 'Workshop opened', body: 'Purpose-built service centre on Kiambu Road, staffed with factory-trained technicians.' },
];

const TEAM = [
  { name: 'Jonah Kimwainaina', role: 'Founder & Managing Director', note: '15 years in the East African motor trade.' },
  { name: 'Sales & Acquisitions', role: 'Vehicle sourcing', note: 'Direct relationships with auction houses in three countries.' },
  { name: 'Finance Desk', role: 'Bank liaison', note: 'Routes approvals through NCBA, KCB, Co-operative, Stanbic, and Absa.' },
  { name: 'Workshop', role: 'Service & Parts', note: 'Factory-trained technicians, OEM parts, warranty-safe servicing.' },
];
export default function AboutPage() {
  return (
    <main className="relative">
      <Navbar />

      <PageHero
        eyebrow="About Veloce Bespoke"
        title={<>Built on trust.<br /><span className="italic text-accent">Driven</span> by obsession.</>}
        description="A Nairobi-based automotive house for people who care how their next car was sourced, priced, and delivered."
        image="/images/heroes/about.jpg"
        imageAlt="Luxury vehicle at dusk"
        height="lg"
      />

      <section className="border-b border-border/60 bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: easeOut }} className="text-center md:text-left">
                <p className="font-display text-3xl font-light text-accent md:text-4xl">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-ink-dim">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">Our Story</span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">
                We started because<br />the market had a trust problem.
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: easeOut }} className="space-y-5 text-sm leading-relaxed text-ink-muted md:text-base">
              <p>Buying a car in Kenya should be exciting. Too often it is exhausting - odometers rolled back, prices shifting between visits, logbooks stuck in a drawer somewhere. We built Veloce Bespoke to fix that, one vehicle at a time.</p>
              <p>Every car on our lot is inspected against NTSA records. Every price is published with the taxes and fees already included. Every document is handled by us, in-house, before you sign anything.</p>
              <p>What began as three cars and one WhatsApp number has grown into a full-service automotive house: sales, imports, financing, and a workshop that treats every vehicle like it belongs to family.</p>
              <p className="font-display text-base italic text-ink">The car is the easy part. Getting you to trust us is the work.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }} className="mx-auto max-w-2xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">What We Stand For</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Four principles. No exceptions.</h2>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2">
            {VALUES.map((v, i) => {
              const Icon = v.Icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.08, duration: 0.7, ease: easeOut }} className="group rounded-2xl border border-border/60 bg-bg p-6 transition-colors hover:border-accent/60 md:p-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/5 text-accent">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink md:text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">What We Do</span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">One house.<br />Three services.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">Whether you are buying, financing, or servicing - the same team handles it end to end.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {WHAT_WE_DO.map((w, i) => {
              const Icon = w.Icon;
              return (
                <motion.div key={w.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.7, ease: easeOut }} className="rounded-2xl border border-border/60 bg-surface p-6 md:p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/5 text-accent">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink md:text-2xl">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{w.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">Milestones</span>
              <span className="h-px w-8 bg-accent" />
            </div>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">How we got here.</h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <span className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-border md:left-1/2 md:-translate-x-px" />
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1, duration: 0.7, ease: easeOut }} className={'relative mb-10 pl-12 last:mb-0 md:mb-14 md:w-1/2 md:pl-0 ' + (i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12')}>
                <span className={'absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-bg text-[10px] font-semibold text-accent md:left-auto ' + (i % 2 === 0 ? 'md:-right-4' : 'md:-left-4')}>
                  <CheckCircle2 size={12} strokeWidth={2.2} />
                </span>
                <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">{t.year}</p>
                <h3 className="mt-2 font-display text-lg font-medium text-ink md:text-xl">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">The Team</span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Named. Accountable.<br />Reachable.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">No call centres, no anonymous inboxes. You deal with the people whose names are on this page.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.08, duration: 0.6, ease: easeOut }} className="group overflow-hidden rounded-2xl border border-border/60 bg-surface transition-colors hover:border-accent/60">
                <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-surface via-elevated to-bg">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/5 text-accent">
                    <Users size={26} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-medium text-ink">{m.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-accent">{m.role}</p>
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted">{m.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: easeOut }}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">Visit</span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">Come see for<br />yourself.</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted md:text-base">Showroom and workshop on Kiambu Road. Open Monday to Saturday, and by appointment on Sundays.</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-ink-dim">Showroom</p>
                    <p className="text-sm text-ink">Kiambu Road, Nairobi, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-ink-dim">Registrations</p>
                    <p className="text-sm text-ink">NTSA Registered  TIMS Verified  Licensed Dealer</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="https://maps.google.com/?q=Kiambu+Road+Nairobi" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4 sm:py-3.5">
                  Get Directions
                  <ArrowUpRight size={16} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <Link href="/contact" className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-bg/40 px-6 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:border-accent hover:text-accent sm:py-3.5">
                  Contact Us
                  <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>

            <motion.a href="https://maps.google.com/?q=Kiambu+Road+Nairobi" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: easeOut }} className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-bg">
              <div className="relative aspect-[4/3]">
                <iframe title="Veloce Bespoke Kenya location" src="https://www.openstreetmap.org/export/embed.html?bbox=36.80%2C-1.24%2C36.90%2C-1.18&layer=mapnik" className="pointer-events-none absolute inset-0 h-full w-full opacity-60 grayscale transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ink-dim">Showroom</p>
                  <p className="mt-1 font-display text-base font-medium text-ink">Kiambu Road, Nairobi</p>
                </div>
                <ArrowUpRight size={18} strokeWidth={1.8} className="text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
