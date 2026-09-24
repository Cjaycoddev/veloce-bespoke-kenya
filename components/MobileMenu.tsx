'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { X, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' as const } },
};

const panel = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const list = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
};

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={overlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
      onClick={onClose}
    >
      <motion.aside
        variants={panel}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="grain relative ml-auto h-full w-full max-w-[420px] overflow-y-auto bg-bg"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-[0.2em] text-ink">
              VELOCE
            </span>
            <span className="font-display text-[9px] font-light tracking-[0.45em] text-accent">
              BESPOKE KENYA
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <motion.nav
          variants={list}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col px-6 pt-8"
        >
          {NAV_LINKS.map((link, i) => (
            <motion.div key={link.href} variants={item} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                className="group flex items-baseline justify-between border-b border-border/40 py-5"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-accent/60">
                    0{i + 1}
                  </span>
                  <span className="font-display text-2xl font-light tracking-wide text-ink transition-colors group-hover:text-accent">
                    {link.label}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="translate-y-1 text-ink-dim transition-all duration-300 group-hover:-translate-y-0 group-hover:translate-x-1 group-hover:text-accent"
                />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
          className="mt-10 space-y-3 px-6 pb-10"
        >
          <a
            href="https://wa.me/254700000000"
            className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-5 py-4 transition-colors hover:border-accent"
          >
            <span className="flex items-center gap-3">
              <MessageCircle size={16} className="text-accent" strokeWidth={1.8} />
              <span className="text-sm text-ink">Chat on WhatsApp</span>
            </span>
            <ArrowUpRight size={16} className="text-ink-dim" />
          </a>
          <a
            href="tel:+254700000000"
            className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-5 py-4 transition-colors hover:border-accent"
          >
            <span className="flex items-center gap-3">
              <Phone size={16} className="text-accent" strokeWidth={1.8} />
              <span className="text-sm text-ink">+254 700 000 000</span>
            </span>
            <ArrowUpRight size={16} className="text-ink-dim" />
          </a>
        </motion.div>

        <div className="px-6 pb-8">
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ink-dim">
            Nairobi  Kenya
          </p>
        </div>
      </motion.aside>
    </motion.div>
  );
}