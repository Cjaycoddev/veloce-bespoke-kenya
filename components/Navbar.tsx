'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Phone, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/data';
import MobileMenu from './MobileMenu';

// Primary links always visible on desktop
const PRIMARY_HREFS = ['/', '/inventory', '/financing', '/contact'];

// Everything else collapses into the "More" dropdown
const MORE_HREFS = [
  '/import-duty',
  '/after-sales',
  '/sell',
  '/about',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close "More" on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [moreOpen]);

  const primaryLinks = NAV_LINKS.filter((l) => PRIMARY_HREFS.includes(l.href));
  const moreLinks = NAV_LINKS.filter((l) => MORE_HREFS.includes(l.href));

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-bg/80 py-3 backdrop-blur-xl border-b border-border/60'
            : 'bg-transparent py-5'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-[0.2em] text-ink md:text-xl">
              VELOCE
            </span>
            <span className="font-display text-[9px] font-light tracking-[0.45em] text-accent md:text-[10px]">
              BESPOKE KENYA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[13px] font-medium tracking-wide text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className="group relative flex items-center gap-1 text-[13px] font-medium tracking-wide text-ink-muted transition-colors hover:text-ink"
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  className={cn(
                    'transition-transform duration-300',
                    moreOpen && 'rotate-180'
                  )}
                />
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-4 w-56 overflow-hidden rounded-2xl border border-border/80 bg-bg/95 p-2 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  >
                    {moreLinks.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.25 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMoreOpen(false)}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-[13px] text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                        >
                          {link.label}
                          <span className="h-1 w-1 rounded-full bg-accent/0 transition-colors group-hover:bg-accent" />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+254729836734"
              className="hidden items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-xs font-medium tracking-wide text-ink transition-colors hover:border-accent hover:text-accent lg:flex"
            >
              <Phone size={13} strokeWidth={1.8} />
              +254 729 836 734
            </a>
            <Link
              href="/inventory"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-xs font-semibold tracking-wide text-bg transition-transform hover:scale-[1.03] md:inline-block"
            >
              Browse Inventory
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}