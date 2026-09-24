import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-display text-[10px] uppercase tracking-[0.4em] text-accent">
        404
      </span>
      <h1 className="mt-4 font-display text-4xl font-light text-ink md:text-6xl">
        Off the map.
      </h1>
      <p className="mt-4 max-w-md text-sm text-ink-muted">
        This page does not exist. Let us get you back on the road.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg"
      >
        Back to Home
      </Link>
    </main>
  );
}