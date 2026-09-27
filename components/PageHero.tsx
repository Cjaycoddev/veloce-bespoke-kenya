'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image: string;
  imageAlt?: string;
  height?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

const HEIGHTS = {
  sm: 'pt-32 pb-12 md:pt-40 md:pb-16',
  md: 'pt-32 pb-16 md:pt-40 md:pb-20',
  lg: 'pt-36 pb-20 md:pt-44 md:pb-28',
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  height = 'md',
  priority = true,
}: PageHeroProps) {
  return (
    <section
      className={
        'relative overflow-hidden border-b border-border/60 bg-bg ' +
        HEIGHTS[height]
      }
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover opacity-35"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/75 via-bg/55 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/50 to-transparent" />

      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/6 blur-[140px]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
              {eyebrow}
            </span>
          </div>

          <h1 className="font-display text-[40px] font-light leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[76px]">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted md:text-base">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}