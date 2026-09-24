import Link from 'next/link';
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import { NAV_LINKS } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-1">
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-[0.2em] text-ink">
                VELOCE
              </span>
              <span className="font-display text-[10px] font-light tracking-[0.45em] text-accent">
                BESPOKE KENYA
              </span>
            </div>
            <p className="mt-5 max-w-xs text-xs leading-relaxed text-ink-muted">
              Kenya&apos;s curated destination for luxury and performance
              vehicles  verified, financed, and delivered with care.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={14} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
              Company
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(5).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[10px] uppercase tracking-[0.35em] text-accent">
              Visit
            </h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                <span>Kiambu Road, Nairobi, Kenya</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                <a href="tel:+254700000000" className="transition-colors hover:text-ink">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.8} />
                <a
                  href="mailto:hello@velocebespoke.co.ke"
                  className="transition-colors hover:text-ink"
                >
                  hello@velocebespoke.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 md:flex-row md:items-center">
          <p className="text-[11px] text-ink-dim">
             {year} Veloce Bespoke Kenya. All rights reserved.
          </p>
          <p className="text-[11px] text-ink-dim">
            NTSA Registered  TIMS Verified  Licensed Dealer
          </p>
        </div>
      </div>
    </footer>
  );
}