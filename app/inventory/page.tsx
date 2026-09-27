'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PageHero from '@/components/PageHero';
import VehicleCard from '@/components/VehicleCard';
import {
  FilterPanel,
  FilterDrawer,
  DEFAULT_FILTERS,
  SORTS,
  countActiveFilters,
  type FilterState,
} from '@/components/InventoryFilters';
import { VEHICLES, PRICE_BRACKETS } from '@/lib/vehicles';

export default function InventoryPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onChange = (next: Partial<FilterState>) =>
    setFilters((prev) => ({ ...prev, ...next }));

  const activeCount = countActiveFilters(filters);

  const results = useMemo(() => {
    const bracket =
      PRICE_BRACKETS.find((b) => b.label === filters.priceBracket) ||
      PRICE_BRACKETS[0];

    const filtered = VEHICLES.filter((v) => {
      if (filters.q) {
        const q = filters.q.toLowerCase();
        if (
          !v.name.toLowerCase().includes(q) &&
          !v.make.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.make && v.make !== filters.make) return false;
      if (filters.bodyType && v.bodyType !== filters.bodyType) return false;
      if (filters.fuel && v.fuel !== filters.fuel) return false;
      if (v.price < bracket.min || v.price > bracket.max) return false;
      if (filters.monthlyMax < 300000 && v.monthly > filters.monthlyMax)
        return false;
      return true;
    });

    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'mileage-asc':
          return a.mileageKm - b.mileageKm;
        case 'newest':
        default:
          return b.year - a.year;
      }
    });

    return filtered;
  }, [filters]);

  return (
    <main className="relative">
      <Navbar />

            <PageHero
        eyebrow="The Collection"
        title={
          <>
            Every car,
            <br />
            <span className="italic text-accent">verified</span>.
          </>
        }
        description={`${VEHICLES.length} vehicles available. Filter by budget, body type, fuel, or your ideal monthly payment.`}
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Luxury vehicle lineup"
        height="sm"
      />

      <section className="sticky top-[64px] z-30 border-b border-border/60 bg-bg/85 backdrop-blur-xl md:top-[68px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border/80 px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <SlidersHorizontal size={13} strokeWidth={1.8} />
              Filters
              {activeCount > 0 && (
                <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-semibold text-bg">
                  {activeCount}
                </span>
              )}
            </button>
            <span className="hidden text-xs text-ink-muted lg:inline">
              {results.length} of {VEHICLES.length} vehicles
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="hidden text-[10px] uppercase tracking-wider text-ink-dim sm:block">
              Sort
            </label>
            <select
              value={filters.sort}
              onChange={(e) => onChange({ sort: e.target.value })}
              className="appearance-none rounded-full border border-border/80 bg-bg px-4 py-2 text-xs text-ink transition-colors hover:border-accent focus:border-accent focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-bg py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
            <aside className="hidden lg:block">
              <div className="sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
                <FilterPanel filters={filters} onChange={onChange} />
              </div>
            </aside>

            <div>
              {results.length === 0 ? (
                <div className="rounded-2xl border border-border/60 bg-surface/40 px-6 py-20 text-center">
                  <h3 className="font-display text-2xl font-light text-ink">
                    No matches.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm text-ink-muted">
                    Try widening your filters, or reset them to see the full
                    collection.
                  </p>
                  <button
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="mt-6 rounded-full border border-accent/60 bg-accent/5 px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {results.map((v, i) => (
                    <VehicleCard key={v.id} vehicle={v} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={onChange}
      />
    </main>
  );
}