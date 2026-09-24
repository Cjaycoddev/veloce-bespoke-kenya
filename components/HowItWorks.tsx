'use client';

import { motion } from 'framer-motion';

const STEPS = [
  { n: '01', title: 'Browse', body: 'Explore verified vehicles with transparent pricing and mileage you can trust.' },
  { n: '02', title: 'Verify', body: 'Every car is NTSA & TIMS checked, with documented service and accident history.' },
  { n: '03', title: 'Finance', body: 'Get pre-approved in minutes through our partner banks  from 10% deposit.' },
  { n: '04', title: 'Drive', body: 'We handle paperwork, transfer, and delivery to your door. Nationwide.' },
];

export default function HowItWorks() {
  return (
    <section className="relative border-t border-border/60 bg-surface/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
              How It Works
            </span>
            <span className="h-px w-8 bg-accent" />
          </div>
          <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-ink md:text-5xl">
            From Browsing to Driving,
            <br className="hidden md:block" /> in Four Steps.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-4 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="font-display text-3xl font-light text-accent/70 md:text-4xl">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mb-3 font-display text-xl font-medium text-ink">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}