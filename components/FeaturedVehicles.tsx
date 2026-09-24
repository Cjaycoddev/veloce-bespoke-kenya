'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { FEATURED_VEHICLES } from '@/lib/data';

export default function FeaturedVehicles() {
  return (
    <section className="relative bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent" />
              <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
                The Collection
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl"
            >
              This Week&apos;s Arrivals
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/inventory"
              className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
            >
              View all inventory
              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_VEHICLES.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: 'easeOut' }}
            >
              <Link
                href={`/inventory/${car.id}`}
                className="group block overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all duration-500 hover:border-accent/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                    {car.badges.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-bg/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-accent backdrop-blur-sm"
                      >
                        <ShieldCheck size={9} strokeWidth={2} />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ink-dim">
                    {car.year}  {car.mileage}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-medium leading-tight text-ink transition-colors group-hover:text-accent">
                    {car.name}
                  </h3>

                  <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-dim">
                        From
                      </p>
                      <p className="font-display text-base font-medium text-ink">
                        {car.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider text-ink-dim">
                        Est. Monthly
                      </p>
                      <p className="font-display text-sm font-medium text-accent">
                        {car.monthly}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}