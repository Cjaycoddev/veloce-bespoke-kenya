'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import type { Vehicle } from '@/lib/vehicles';

export default function VehicleCard({
  vehicle,
  index = 0,
}: {
  vehicle: Vehicle;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: 'easeOut' }}
    >
      <Link
        href={`/inventory/${vehicle.id}`}
        className="group block overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all duration-500 hover:border-accent/60"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {vehicle.badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-bg/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-accent backdrop-blur-sm"
              >
                <ShieldCheck size={9} strokeWidth={2} />
                {b}
              </span>
            ))}
          </div>

          <span className="absolute right-4 top-4 rounded-full border border-border/80 bg-bg/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-ink-muted backdrop-blur-sm">
            {vehicle.fuel}
          </span>
        </div>

        <div className="p-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-ink-dim">
            {vehicle.year}  {vehicle.mileageLabel}  {vehicle.bodyType}
          </span>
          <h3 className="mt-1 font-display text-lg font-medium leading-tight text-ink transition-colors group-hover:text-accent">
            {vehicle.name}
          </h3>

          <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ink-dim">
                From
              </p>
              <p className="font-display text-base font-medium text-ink">
                {vehicle.priceLabel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-ink-dim">
                Est. Monthly
              </p>
              <p className="font-display text-sm font-medium text-accent">
                {vehicle.monthlyLabel}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}