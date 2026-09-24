'use client';

import { motion } from 'framer-motion';
import { TRUST_BADGES } from '@/lib/data';

export default function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-14">
          {TRUST_BADGES.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="whitespace-nowrap font-display text-[10px] uppercase tracking-[0.3em] text-ink-dim md:text-[11px]"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}