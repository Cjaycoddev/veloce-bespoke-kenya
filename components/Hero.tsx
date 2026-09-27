'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Play } from 'lucide-react';

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.3 + i * 0.12, ease: 'easeOut' as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/heroes/home.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/40 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />
      <div className="grain absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div custom={0} variants={fadeUp} className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
              Curated  Verified  Delivered
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-display text-[40px] font-light leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[88px]"
          >
            The Extraordinary,
            <br />
            <span className="italic text-accent">Delivered</span> to Kenya.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted md:mt-8 md:text-base"
          >
            Hand-picked luxury and performance vehicles  each with verified
            mileage, transparent pricing, and financing built for Kenya. No
            surprises. Just the drive.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10"
          >
            <Link
              href="/inventory"
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-sm font-semibold tracking-wide text-bg transition-all hover:gap-4 sm:py-3.5"
            >
              Explore Inventory
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/financing"
              className="group inline-flex items-center justify-between gap-3 rounded-full border border-border bg-bg/40 px-6 py-4 text-sm font-medium tracking-wide text-ink backdrop-blur-md transition-colors hover:border-accent hover:text-accent sm:py-3.5"
            >
              Get Pre-Approved
              <Play size={14} strokeWidth={2} className="fill-current" />
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border/40 pt-6 md:mt-14"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-accent" strokeWidth={1.8} />
              <span className="text-[11px] tracking-wide text-ink-muted">
                Mileage Guaranteed
              </span>
            </div>
            <span className="hidden h-3 w-px bg-border md:inline-block" />
            <span className="text-[11px] tracking-wide text-ink-muted">
              NTSA &amp; TIMS Verified
            </span>
            <span className="hidden h-3 w-px bg-border md:inline-block" />
            <span className="text-[11px] tracking-wide text-ink-muted">
              Financing from 10% Deposit
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-display text-[9px] uppercase tracking-[0.4em] text-ink-dim">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}