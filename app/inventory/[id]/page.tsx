'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  MessageCircle,
  Phone,
  Calculator,
  Gauge,
  Fuel,
  Calendar,
  Cog,
  Car,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import VehicleCard from '@/components/VehicleCard';
import { VEHICLES } from '@/lib/vehicles';
import { calculateFinancing, formatKES } from '@/lib/financing';

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function VehicleDetailPage() {
  const params = useParams<{ id: string }>();
  const vehicle = useMemo(
    () => VEHICLES.find((v) => v.id === Number(params.id)),
    [params.id]
  );

  const [depositPercent, setDepositPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(60);
  const [rate, setRate] = useState(13.5);

  if (!vehicle) notFound();

  const financing = calculateFinancing({
    vehiclePrice: vehicle.price,
    depositPercent,
    loanTermMonths: loanTerm,
    annualRate: rate,
  });

  const similar = VEHICLES.filter(
    (v) => v.id !== vehicle.id && v.bodyType === vehicle.bodyType
  ).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hi Veloce Bespoke, I'm interested in this vehicle:\n\n` +
      `Stock #${vehicle.id}\n` +
      `${vehicle.year} ${vehicle.name}\n` +
      `${vehicle.mileageLabel}  ${vehicle.fuel}  ${vehicle.transmission}\n` +
      `Listed: ${vehicle.priceLabel}\n\n` +
      `Could you share more details?`
  );
  const whatsappUrl = `https://wa.me/254729836734?text=${whatsappMessage}`;

  const specs = [
    { Icon: Calendar, label: 'Year', value: String(vehicle.year) },
    { Icon: Gauge, label: 'Mileage', value: vehicle.mileageLabel },
    { Icon: Fuel, label: 'Fuel', value: vehicle.fuel },
    { Icon: Cog, label: 'Transmission', value: vehicle.transmission },
    { Icon: Car, label: 'Body', value: vehicle.bodyType },
    { Icon: ShieldCheck, label: 'Drive', value: vehicle.drive },
  ];

  return (
    <main className="relative">
      <Navbar />

      {/* Breadcrumb */}
      <section className="border-b border-border/60 bg-bg pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <Link
            href="/inventory"
            className="group inline-flex items-center gap-2 text-xs text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.8}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Inventory
          </Link>
        </div>
      </section>

      {/* Hero gallery + headline */}
      <section className="bg-bg pb-12 pt-8 md:pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="lg:col-span-3"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-surface">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  {vehicle.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-bg/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-accent backdrop-blur-md"
                    >
                      <ShieldCheck size={10} strokeWidth={2} />
                      {b}
                    </span>
                  ))}
                </div>
                <div className="absolute right-5 top-5 rounded-full border border-border/80 bg-bg/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted backdrop-blur-md">
                  Stock #{vehicle.id}
                </div>
              </div>
            </motion.div>

            {/* Headline + price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
              className="lg:col-span-2"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-ink-dim">
                {vehicle.make}  {vehicle.year}
              </span>
              <h1 className="mt-2 font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-4xl">
                {vehicle.name}
              </h1>

              <div className="mt-6 border-y border-border/60 py-5">
                <p className="text-[10px] uppercase tracking-[0.35em] text-ink-dim">
                  Asking Price
                </p>
                <p className="mt-1 font-display text-2xl font-medium text-ink md:text-3xl">
                  {vehicle.priceLabel}
                </p>
                <p className="mt-2 text-xs text-ink-muted">
                  Or from{' '}
                  <span className="font-medium text-accent">
                    {vehicle.monthlyLabel}
                  </span>{' '}
                  with financing
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4"
                >
                  <span className="flex items-center gap-2.5">
                    <MessageCircle size={16} strokeWidth={2} />
                    Ask About This Car
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                    WhatsApp
                  </span>
                </a>

                <a
                  href="tel:+254729836734"
                  className="flex w-full items-center justify-between gap-3 rounded-full border border-border/80 bg-bg px-6 py-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="flex items-center gap-2.5">
                    <Phone size={16} strokeWidth={1.8} />
                    Call to Book a Test Drive
                  </span>
                </a>

                <Link
                  href="#financing"
                  className="flex w-full items-center justify-between gap-3 rounded-full border border-border/80 bg-bg px-6 py-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="flex items-center gap-2.5">
                    <Calculator size={16} strokeWidth={1.8} />
                    Estimate Monthly Payment
                  </span>
                </Link>
              </div>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: vehicle.name,
                      text: `${vehicle.year} ${vehicle.name}  ${vehicle.priceLabel}`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="mt-5 flex items-center gap-2 text-xs text-ink-muted transition-colors hover:text-accent"
              >
                <Share2 size={12} strokeWidth={1.8} />
                Share this listing
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs + verification */}
      <section className="border-t border-border/60 bg-surface/30 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Specs */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                  Specifications
                </span>
              </div>
              <h2 className="mb-8 font-display text-2xl font-light text-ink md:text-3xl">
                The details.
              </h2>

              <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
                {specs.map((s, i) => {
                  const Icon = s.Icon;
                  return (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5, ease: easeOut }}
                      className="border-b border-border/40 pb-5"
                    >
                      <div className="mb-2 flex items-center gap-2 text-ink-dim">
                        <Icon size={13} strokeWidth={1.8} />
                        <span className="text-[10px] uppercase tracking-wider">
                          {s.label}
                        </span>
                      </div>
                      <p className="font-display text-lg font-medium text-ink">
                        {s.value}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Verification checklist */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                  Verified
                </span>
              </div>
              <h2 className="mb-8 font-display text-2xl font-light text-ink md:text-3xl">
                Every box ticked.
              </h2>

              <ul className="space-y-4">
                {[
                  'Mileage verified against NTSA records',
                  'TIMS portal confirmed',
                  'Service history available',
                  'Accident-free (or fully disclosed)',
                  'Import documents on file',
                  'Physical inspection welcomed',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: easeOut }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                      strokeWidth={1.8}
                    />
                    <span className="text-sm leading-relaxed text-ink-muted">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Financing calculator */}
      <section id="financing" className="border-t border-border/60 bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="lg:col-span-3"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                  Financing Preview
                </span>
              </div>
              <h2 className="mb-4 font-display text-2xl font-light leading-tight tracking-tight text-ink md:text-4xl">
                Adjust and see your monthly.
              </h2>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-ink-muted">
                Move the sliders  the estimate updates instantly. When you&apos;re
                happy, send it to a finance officer on WhatsApp.
              </p>

              {/* Deposit slider */}
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-wider text-ink-dim">
                    Deposit
                  </label>
                  <span className="font-display text-sm font-medium text-accent">
                    {depositPercent}%  {formatKES(financing.deposit)}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={1}
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
                />
                <div className="mt-2 flex justify-between text-[10px] text-ink-dim">
                  <span>10%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Term */}
              <div className="mb-8">
                <label className="mb-3 block text-[11px] uppercase tracking-wider text-ink-dim">
                  Loan Term
                </label>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                  {[12, 24, 36, 48, 60, 72].map((t) => (
                    <button
                      key={t}
                      onClick={() => setLoanTerm(t)}
                      className={
                        'rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ' +
                        (loanTerm === t
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border/80 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')
                      }
                    >
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Rate */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-wider text-ink-dim">
                    Annual Interest Rate
                  </label>
                  <span className="font-display text-sm font-medium text-accent">
                    {rate.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={22}
                  step={0.5}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
                />
                <div className="mt-2 flex justify-between text-[10px] text-ink-dim">
                  <span>8%</span>
                  <span>22%</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
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
                    key={financing.monthlyPayment}
                    initial={{ opacity: 0.4, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 font-display text-3xl font-light text-accent md:text-4xl"
                  >
                    {formatKES(financing.monthlyPayment)}
                  </motion.p>
                </div>

                <div className="mt-8 space-y-4 border-t border-border/60 pt-6">
                  <Row label="Vehicle Price" value={formatKES(vehicle.price)} />
                  <Row label="Deposit" value={formatKES(financing.deposit)} />
                  <Row label="Amount Financed" value={formatKES(financing.principal)} />
                  <Row label="Loan Term" value={`${loanTerm} months`} />
                  <div className="border-t border-border/60 pt-4">
                    <Row
                      label="Total Repayable"
                      value={formatKES(financing.totalRepayable)}
                      bold
                    />
                  </div>
                </div>

                <a
                  href={
                    'https://wa.me/254729836734?text=' +
                    encodeURIComponent(
                      `Hi Veloce Bespoke, I'd like to finance this vehicle:\n\n` +
                        `Stock #${vehicle.id}  ${vehicle.year} ${vehicle.name}\n` +
                        `Price: ${vehicle.priceLabel}\n` +
                        `Deposit: ${depositPercent}% (${formatKES(financing.deposit)})\n` +
                        `Term: ${loanTerm} months\n` +
                        `Est. monthly: ${formatKES(financing.monthlyPayment)}`
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-transform hover:scale-[1.02]"
                >
                  Send to Finance Officer
                  <MessageCircle size={16} strokeWidth={2} />
                </a>

                <p className="mt-5 text-[10px] leading-relaxed text-ink-dim">
                  Estimate only. Final terms depend on bank assessment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar vehicles */}
      {similar.length > 0 && (
        <section className="border-t border-border/60 bg-surface/30 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                    Similar
                  </span>
                </div>
                <h2 className="font-display text-2xl font-light leading-tight tracking-tight text-ink md:text-4xl">
                  You might also like.
                </h2>
              </div>
              <Link
                href="/inventory"
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                View all inventory
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

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
          bold ? 'font-display font-medium text-accent' : 'font-medium text-ink'
        }
      >
        {value}
      </span>
    </div>
  );
}