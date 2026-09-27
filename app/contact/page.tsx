'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Check,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PageHero from '@/components/PageHero';

// ============================================================
//  Channel cards  the four primary ways to reach us
// ============================================================

const CHANNELS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    sub: 'Fastest response',
    value: '+254 729 836 734',
    href: 'https://wa.me/254729836734?text=Hi%20Veloce%20Bespoke%2C%20I%27d%20like%20to%20talk%20to%20someone.',
    accent: true,
  },
  {
    icon: Phone,
    label: 'Call Sales',
    sub: 'MonSat  8am6pm',
    value: '+254 729 836 734',
    href: 'tel:+254729836734',
  },
  {
    icon: Mail,
    label: 'Email',
    sub: 'Replies within 24h',
    value: 'jonahkimwainaina@gmail.com',
    href: 'mailto:jonahkimwainaina@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Showroom',
    sub: 'By appointment',
    value: 'Kiambu Road, Nairobi',
    href: 'https://maps.google.com/?q=Kiambu+Road+Nairobi',
  },
];

const HOURS = [
  { day: 'Monday  Friday', time: '8:00 AM  6:00 PM' },
  { day: 'Saturday', time: '9:00 AM  4:00 PM' },
  { day: 'Sunday', time: 'By appointment only' },
  { day: 'Public Holidays', time: 'By appointment only' },
];

const DEPARTMENTS = [
  {
    title: 'Sales',
    line: 'Enquiries about vehicles, financing, and test drives.',
    contact: 'sales@velocebespoke.co.ke',
  },
  {
    title: 'After-Sales & Service',
    line: 'Bookings, parts, warranty, and maintenance support.',
    contact: 'service@velocebespoke.co.ke',
  },
  {
    title: 'Financing',
    line: 'Pre-qualification, partner bank routing, document help.',
    contact: 'finance@velocebespoke.co.ke',
  },
  {
    title: 'Trade-In & Sell',
    line: 'Valuations, inspections, and instant offers.',
    contact: 'sell@velocebespoke.co.ke',
  },
];

// ============================================================
//  Small helpers
// ============================================================

const easeOut = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: easeOut },
  }),
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Vehicle enquiry',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hi Veloce Bespoke,\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Subject: ${form.subject}\n\n` +
      `${form.message}`;
    const url = `https://wa.me/254729836734?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSent(true);
  };

  const isValid =
    form.name.trim().length > 1 &&
    form.phone.trim().length > 5 &&
    form.message.trim().length > 3;

  return (
    <main className="relative">
      <Navbar />

      {/* ============================================================
          HERO
          ============================================================ */}
            <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk.
            <br />
            <span className="italic text-accent">Properly.</span>
          </>
        }
        description="No call centres. No bots. When you reach out, you reach a real person on the team  usually within a few minutes on WhatsApp."
        image="/images/heroes/contact.jpg"
        imageAlt="Modern showroom interior"
        height="md"
      />

      {/* ============================================================
          CHANNEL CARDS
          ============================================================ */}
      <section className="relative bg-bg py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className={
                    'group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-500 ' +
                    (c.accent
                      ? 'border-accent/40 bg-gradient-to-b from-accent/10 to-surface hover:border-accent'
                      : 'border-border/60 bg-surface hover:border-accent/60')
                  }
                >
                  <div className="mb-8 flex items-start justify-between">
                    <span
                      className={
                        'flex h-11 w-11 items-center justify-center rounded-full border transition-colors ' +
                        (c.accent
                          ? 'border-accent/50 bg-accent/10 text-accent'
                          : 'border-border/80 text-ink-muted group-hover:border-accent group-hover:text-accent')
                      }
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.8}
                      className="text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-ink-dim">
                      {c.label}
                    </p>
                    <p className="font-display text-base font-medium leading-tight text-ink md:text-lg">
                      {c.value}
                    </p>
                    <p className="mt-2 text-[11px] text-ink-muted">{c.sub}</p>
                  </div>

                  {/* hover sheen */}
                  <span className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          FORM + SIDEBAR
          ============================================================ */}
      <section className="relative border-t border-border/60 bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* --- FORM --- */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="lg:col-span-3"
            >
              <div className="mb-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                    Send a Message
                  </span>
                </div>
                <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">
                  Tell us what you need.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">
                  Submitting opens WhatsApp with your message pre-filled  so
                  your details reach us instantly, from your own number.
                </p>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="rounded-2xl border border-accent/40 bg-gradient-to-b from-accent/10 to-surface p-8 text-center md:p-12"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
                    <Check size={22} className="text-accent" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-display text-2xl font-light text-ink">
                    Almost there.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
                    WhatsApp should have opened in a new tab. Hit send and
                    we&apos;ll reply within minutes during business hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-xs uppercase tracking-wider text-accent underline-offset-4 hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field
                      label="Full Name"
                      value={form.name}
                      onChange={(v) => update('name', v)}
                      placeholder="Jane Wanjiru"
                      required
                    />
                    <Field
                      label="Phone"
                      value={form.phone}
                      onChange={(v) => update('phone', v)}
                      placeholder="+254 7XX XXX XXX"
                      type="tel"
                      required
                    />
                  </div>

                  <Field
                    label="Email"
                    value={form.email}
                    onChange={(v) => update('email', v)}
                    placeholder="you@example.com"
                    type="email"
                  />

                  <div>
                    <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">
                      Subject
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                      {[
                        'Vehicle enquiry',
                        'Financing',
                        'After-sales',
                        'Trade-in',
                      ].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update('subject', s)}
                          className={
                            'rounded-lg border px-3 py-2.5 text-[11px] font-medium transition-colors ' +
                            (form.subject === s
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border/80 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')
                          }
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us what you're looking for, your budget, or any questions"
                      className="w-full resize-none rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                    <p className="text-[10px] leading-relaxed text-ink-dim">
                      By sending, you agree to be contacted on WhatsApp or by
                      phone.
                    </p>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={
                        'group inline-flex w-full items-center justify-between gap-3 rounded-full px-6 py-4 text-sm font-semibold tracking-wide transition-all sm:w-auto sm:py-3.5 ' +
                        (isValid
                          ? 'bg-accent text-bg hover:gap-4'
                          : 'cursor-not-allowed bg-border text-ink-dim')
                      }
                    >
                      Send via WhatsApp
                      <Send
                        size={15}
                        strokeWidth={2}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* --- SIDEBAR --- */}
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
              className="space-y-6 lg:col-span-2"
            >
              {/* Hours */}
              <div className="rounded-2xl border border-border/60 bg-bg p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Clock size={15} className="text-accent" strokeWidth={1.8} />
                  <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">
                    Hours
                  </span>
                </div>
                <ul className="space-y-3">
                  {HOURS.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between border-b border-border/40 pb-3 text-sm last:border-0 last:pb-0"
                    >
                      <span className="text-ink-muted">{h.day}</span>
                      <span className="font-medium text-ink">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map card */}
              <a
                href="https://maps.google.com/?q=Kiambu+Road+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-bg"
              >
                <div className="relative aspect-[4/3]">
                  <iframe
                    title="Veloce Bespoke Kenya location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=36.80%2C-1.24%2C36.90%2C-1.18&layer=mapnik"
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-60 grayscale transition-all duration-500 group-hover:opacity-90 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
                </div>
                <div className="relative flex items-center justify-between p-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ink-dim">
                      Showroom
                    </p>
                    <p className="mt-1 font-display text-base font-medium text-ink">
                      Kiambu Road, Nairobi
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                    className="text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
              </a>

              {/* Socials */}
              <div className="rounded-2xl border border-border/60 bg-bg p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" />
                  <span className="font-display text-[10px] uppercase tracking-[0.35em] text-ink-dim">
                    Follow
                  </span>
                </div>
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, label: 'Instagram' },
                    { Icon: Facebook, label: 'Facebook' },
                    { Icon: Youtube, label: 'YouTube' },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          DEPARTMENTS
          ============================================================ */}
      <section className="border-t border-border/60 bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                  Direct Lines
                </span>
              </div>
              <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">
                Reach the right desk.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              Skip the switchboard. Pick the department and we&apos;ll route
              you to the person who can actually help.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DEPARTMENTS.map((d, i) => (
              <motion.a
                key={d.title}
                href={`mailto:${d.contact}`}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="group relative flex items-start justify-between gap-6 rounded-2xl border border-border/60 bg-surface p-6 transition-all duration-500 hover:border-accent/60 md:p-8"
              >
                <div>
                  <h3 className="font-display text-xl font-medium text-ink transition-colors group-hover:text-accent md:text-2xl">
                    {d.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
                    {d.line}
                  </p>
                  <p className="mt-5 font-mono text-[11px] tracking-wide text-accent/80">
                    {d.contact}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.6}
                  className="shrink-0 text-ink-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL STRIP
          ============================================================ */}
      <section className="relative overflow-hidden border-t border-border/60 bg-surface/30 py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <h3 className="font-display text-2xl font-light leading-snug text-ink md:text-3xl">
              Prefer to see the cars first?
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
              Browse the current collection  every vehicle verified, priced
              transparently, and ready to drive.
            </p>
            <Link
              href="/inventory"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-accent/60 bg-accent/5 px-6 py-3.5 text-sm font-medium tracking-wide text-accent transition-all hover:gap-4 hover:bg-accent/10"
            >
              View Inventory
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

// ============================================================
//  Field  small reusable input
// ============================================================

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none"
      />
    </div>
  );
}