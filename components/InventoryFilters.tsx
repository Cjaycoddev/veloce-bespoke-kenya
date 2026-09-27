'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, RotateCcw } from 'lucide-react';
import { MAKES, BODY_TYPES, FUELS, PRICE_BRACKETS } from '@/lib/vehicles';

export interface FilterState {
  q: string;
  make: string;
  bodyType: string;
  fuel: string;
  priceBracket: string;
  monthlyMax: number;
  sort: string;
}

export const DEFAULT_FILTERS: FilterState = {
  q: '',
  make: '',
  bodyType: '',
  fuel: '',
  priceBracket: 'All Prices',
  monthlyMax: 300000,
  sort: 'newest',
};

export const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'mileage-asc', label: 'Mileage: Low to High' },
];

export function countActiveFilters(f: FilterState): number {
  let n = 0;
  if (f.q) n++;
  if (f.make) n++;
  if (f.bodyType) n++;
  if (f.fuel) n++;
  if (f.priceBracket !== 'All Prices') n++;
  if (f.monthlyMax < 300000) n++;
  return n;
}

// ============================================================
//  Panel  the filter content (used in desktop sidebar
//  and inside the mobile drawer)
// ============================================================

export function FilterPanel({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
}) {
  const reset = () => onChange(DEFAULT_FILTERS);

  return (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-ink-dim">
          Search
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-bg px-3.5 py-2.5 focus-within:border-accent">
          <Search size={14} className="text-ink-dim" strokeWidth={1.8} />
          <input
            value={filters.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Model or make"
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-dim focus:outline-none"
          />
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-ink-dim">
          Make
        </label>
        <select
          value={filters.make}
          onChange={(e) => onChange({ make: e.target.value })}
          className="w-full appearance-none rounded-xl border border-border/80 bg-bg px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
        >
          <option value="">All makes</option>
          {MAKES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Body type */}
      <div>
        <label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-ink-dim">
          Body Type
        </label>
        <div className="flex flex-wrap gap-2">
          <Pill
            active={filters.bodyType === ''}
            onClick={() => onChange({ bodyType: '' })}
          >
            All
          </Pill>
          {BODY_TYPES.map((b) => (
            <Pill
              key={b}
              active={filters.bodyType === b}
              onClick={() => onChange({ bodyType: b })}
            >
              {b}
            </Pill>
          ))}
        </div>
      </div>

      {/* Fuel */}
      <div>
        <label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-ink-dim">
          Fuel
        </label>
        <div className="flex flex-wrap gap-2">
          <Pill
            active={filters.fuel === ''}
            onClick={() => onChange({ fuel: '' })}
          >
            All
          </Pill>
          {FUELS.map((f) => (
            <Pill
              key={f}
              active={filters.fuel === f}
              onClick={() => onChange({ fuel: f })}
            >
              {f}
            </Pill>
          ))}
        </div>
      </div>

      {/* Price bracket */}
      <div>
        <label className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-ink-dim">
          Price Range
        </label>
        <div className="space-y-1.5">
          {PRICE_BRACKETS.map((b) => (
            <button
              key={b.label}
              onClick={() => onChange({ priceBracket: b.label })}
              className={
                'flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-xs transition-colors ' +
                (filters.priceBracket === b.label
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border/60 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')
              }
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Monthly max slider */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-[10px] uppercase tracking-[0.3em] text-ink-dim">
            Max Monthly
          </label>
          <span className="font-display text-xs font-medium text-accent">
            {filters.monthlyMax >= 300000
              ? 'No limit'
              : 'KES ' + filters.monthlyMax.toLocaleString('en-KE')}
          </span>
        </div>
        <input
          type="range"
          min={50000}
          max={300000}
          step={10000}
          value={filters.monthlyMax}
          onChange={(e) => onChange({ monthlyMax: Number(e.target.value) })}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
        />
        <div className="mt-2 flex justify-between text-[10px] text-ink-dim">
          <span>KES 50k</span>
          <span>No limit</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-border/80 py-2.5 text-xs font-medium tracking-wide text-ink-muted transition-colors hover:border-accent hover:text-accent"
      >
        <RotateCcw size={12} strokeWidth={1.8} />
        Reset filters
      </button>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full border px-3.5 py-1.5 text-[11px] font-medium transition-colors ' +
        (active
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border/70 bg-bg text-ink-muted hover:border-accent/60 hover:text-ink')
      }
    >
      {children}
    </button>
  );
}

// ============================================================
//  Drawer  mobile-only wrapper
// ============================================================

export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl border-t border-border/80 bg-bg"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-bg/95 px-5 py-4 backdrop-blur-xl">
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.35em] text-accent">
                  Filters
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {countActiveFilters(filters)} active
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="px-5 py-6">
              <FilterPanel filters={filters} onChange={onChange} />
            </div>

            <div className="sticky bottom-0 border-t border-border/60 bg-bg/95 px-5 py-4 backdrop-blur-xl">
              <button
                onClick={onClose}
                className="w-full rounded-full bg-accent py-3.5 text-sm font-semibold tracking-wide text-bg"
              >
                Show results
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}